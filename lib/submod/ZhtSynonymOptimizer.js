"use strict";
/**
 * Created by user on 2018/4/16/016.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.type = exports.init = exports.ZhtSynonymOptimizer = void 0;
const tslib_1 = require("tslib");
const mod_1 = require("../mod");
const index_1 = require("../util/index");
const COLORS_1 = require("../mod/COLORS");
const uni_string_1 = tslib_1.__importDefault(require("uni-string"));
const isUnset_1 = require("../util/isUnset");
/**
 * 繁體中文同義詞優化器
 * Traditional Chinese Synonym Optimizer
 *
 * 以詞意來自動轉換 而不需要手動加入字典於 synonym.txt
 * 適用於比較容易需要人工處理的轉換
 *
 * 自動處理 `里|后`
 *
 * 建議在字典內追加人名地名等等名字 來增加準確性
 * 防止轉換錯誤
 *
 * Automatically converts words based on semantic meaning without manually adding them to synonym.txt
 * Suitable for conversions that typically require manual processing
 *
 * Automatically handles `里|后` (Li/Hou) conversions
 *
 * It is recommended to add names of people and places to the dictionary to increase accuracy
 * To prevent conversion errors
 *
 * @todo 發于余干松冲准呆只范舍涂
 */
class ZhtSynonymOptimizer extends mod_1.SubSModuleOptimizer {
    constructor() {
        super(...arguments);
        /**
         * 優化器名稱
         * Optimizer name
         */
        this.name = 'ZhtSynonymOptimizer';
    }
    /**
     * 初始化並快取字典資料
     * Initialize and cache dictionary data
     *
     * 從分段器 (Segment) 中取得各類字典資料並快取至實例屬性，
     * 以避免重複查詢造成的效能損耗。
     * Retrieves various dictionary data from the Segment and caches them
     * to instance properties to avoid performance overhead from repeated queries.
     *
     * @override
     * @protected
     */
    _cache() {
        super._cache();
        // 取得主詞彙表 / Get the main vocabulary table
        this._TABLE = this.segment.getDict('TABLE');
        // 取得詞性標註常數 / Get part-of-speech tagging constants
        this._POSTAG = this.segment.POSTAG;
        // 取得同義詞字典 / Get the synonym dictionary
        this._SYNONYM = this.segment.getDict('SYNONYM') || {};
        // 取得同義詞轉換黑名單 / Get the blacklist for synonym conversion
        this._BLACKLIST = this.segment.getDict("BLACKLIST_FOR_SYNONYM" /* EnumDictDatabase.BLACKLIST_FOR_SYNONYM */) || {};
    }
    /**
     * 檢查詞彙是否在同義詞轉換黑名單中
     * Check if a word is in the synonym conversion blacklist
     *
     * 黑名單中的詞彙將不會被自動轉換，用於保護特定詞彙不被錯誤轉換。
     * Words in the blacklist will not be automatically converted,
     * used to protect specific words from incorrect conversion.
     *
     * @param {string} w - 要檢查的詞彙 / The word to check
     * @returns {boolean | null} 若在黑名單中返回 true，否則返回 null
     *                           Returns true if in blacklist, null otherwise
     */
    isSynonymBlacklist(w) {
        if (this._BLACKLIST[w]) {
            return true;
        }
        return null;
    }
    /**
     * 取得詞彙的同義詞
     * Get the synonym of a word
     *
     * 優先從同義詞字典中查找原始詞彙的對應詞，
     * 若找到的結果本身也有同義詞對應，則繼續遞迴查找。
     * First looks up the corresponding word for the original word in the synonym dictionary,
     * if the found result itself has a synonym mapping, continues to look up recursively.
     *
     * @protected
     * @param {string} w - 原始詞彙 / Original word
     * @param {string} nw - 預設的新詞彙 / Default new word
     * @returns {string} 最終的同義詞結果 / Final synonym result
     */
    _getSynonym(w, nw) {
        const SYNONYM = this._SYNONYM;
        // 檢查原始詞彙是否有同義詞對應 / Check if original word has synonym mapping
        if (w in SYNONYM) {
            nw = SYNONYM[w];
        }
        // 檢查新詞彙是否也有同義詞對應（雙層查找）/ Check if new word also has synonym mapping (two-level lookup)
        if (nw in SYNONYM) {
            //let w = nw;
            nw = SYNONYM[nw];
        }
        return nw;
    }
    /**
     * 執行繁簡轉換優化
     * Execute Traditional-Simplified conversion optimization
     *
     * 此方法為核心優化邏輯，遍歷所有詞彙並根據上下文進行智能轉換。
     * This method is the core optimization logic, iterating through all words
     * and performing intelligent conversion based on context.
     *
     * 主要處理的轉換規則：
     * Main conversion rules handled:
     * - 「里」→「裡」：根據前後文判斷是否為方位詞
     * - 「后」→「後」：根據前後文判斷是否為時間/方位詞
     * - 「发/發」→「髮」：根據前文判斷是否與頭髮相關
     * - 「于」→「於」：根據前後文判斷是否為介詞
     * - 「么」→「麼」：句末語氣詞轉換
     *
     * @override
     * @template T - 詞彙類型，需繼承 IWordDebug / Word type, must extend IWordDebug
     * @param {T[]} words - 待優化的詞彙陣列 / Array of words to optimize
     * @returns {T[]} 優化後的詞彙陣列 / Optimized array of words
     */
    doOptimize(words) {
        var _a, _b, _c;
        const self = this;
        const POSTAG = this._POSTAG;
        const TABLE = this._TABLE;
        const SYNONYM = this._SYNONYM;
        let i = 0;
        // 右標點符號列表，用於判斷句子結構 / Right punctuation list for sentence structure detection
        let CLOSE_P = ['】', '」', '》', '』', '］', '’', '”', '〉'];
        // 分隔符號列表 / Separator punctuation list
        let SEP_P = ['、', ',', '…'];
        while (i < words.length) {
            // w0: 前一個詞彙, w1: 當前詞彙, w2: 後一個詞彙
            // w0: previous word, w1: current word, w2: next word
            let w0 = words[i - 1] || null;
            let w1 = words[i];
            let w2 = words[i + 1] || null;
            // 跳過黑名單中的詞彙 / Skip words in the blacklist
            if (this.isSynonymBlacklist(w1.w)) {
                i++;
                continue;
            }
            let bool;
            // 取得當前詞彙的字元長度 / Get the character length of current word
            let w1_len = uni_string_1.default.size(w1.w);
            // 新的詞性標註 / New part-of-speech tag
            let new_p;
            // 處理單字詞彙 / Handle single-character words
            if (w1_len === 1) {
                //console.log(w1);
                // ==================== 「里」轉換邏輯 ====================
                // 「里」可為：1. 長度單位(公里) 2. 方位詞(裡面)
                // "里" can be: 1. Length unit (kilometer) 2. Location word (inside)
                if (w1.w === '里') {
                    // 若前詞以「的」結尾或為「和」，則不轉換（可能是人名地名）
                    // If previous word ends with "的" or is "和", don't convert (might be name/place)
                    if (w0 && (w0.w.slice(-1) === '的'
                        || w0.w === '和')) {
                    }
                    // 若前詞為右標點，轉換為「裡」（表示方位）
                    // If previous word is right punctuation, convert to "裡" (indicates location)
                    else if (w0 && CLOSE_P.includes(w0.w)) {
                        w1.ow = w1.w;
                        w1.w = '裡';
                        bool = true;
                    }
                    // 若前詞為名詞、處所、方位、時間或動詞，轉換為「裡」
                    // If previous word is noun, location, direction, time or verb, convert to "裡"
                    else if (w0 && (0, index_1.hexAndAny)(w0.p, 
                    // 名詞 / Noun
                    POSTAG.D_N, 
                    // 處所 / Location
                    POSTAG.D_S, 
                    // 方位 / Direction
                    POSTAG.D_F, 
                    // 时间词 / Time word
                    POSTAG.D_T, 
                    // 动词 训练 / Verb (training)
                    POSTAG.D_V)) {
                        w1.ow = w1.w;
                        w1.w = '裡';
                        bool = true;
                    }
                }
                // ==================== 「后」轉換邏輯 ====================
                // 「后」可為：1. 皇后 2. 方位/時間詞(後面、之後)
                // "后" can be: 1. Queen/Empress 2. Location/Time word (behind, after)
                else if (w1.w === '后') {
                    // 若前詞為「和」，不轉換（可能是人名如「和后」）
                    // If previous word is "和", don't convert (might be name like "和后")
                    if (w0 && (w0.w === '和')) {
                    }
                    // 若前詞為右標點，轉換為「後」（表示時間/方位）
                    // If previous word is right punctuation, convert to "後" (indicates time/location)
                    else if (w0 && CLOSE_P.includes(w0.w)) {
                        w1.ow = w1.w;
                        w1.w = '後';
                        bool = true;
                    }
                    // 特殊詞彙處理：「腰后」→「腰後」
                    // Special word handling: "腰后" → "腰後"
                    else if (w0 && ['腰'].includes(w0.w)) {
                        w1.ow = w1.w;
                        w1.w = '後';
                        bool = true;
                    }
                    // 根據前詞詞性判斷：若為動詞、處所、時間、名詞、數量詞、方位詞、副詞等，轉換為「後」
                    // Judge by previous word's POS: if verb, location, time, noun, quantifier, direction, adverb, etc., convert to "後"
                    // 如果前一個項目為
                    else if (((w0 === null || w0 === void 0 ? void 0 : w0.p) && (0, index_1.hexAndAny)(w0.p, 
                    // 动词 離開 / Verb (leave)
                    POSTAG.D_V, 
                    // 处所词 / Location word
                    POSTAG.D_S, 
                    // 时间词 / Time word
                    POSTAG.D_T, 
                    // 名词 名语素 / Noun
                    POSTAG.D_N, 
                    // 数量词 - 几次后 / Quantifier - "几次后"
                    POSTAG.D_MQ, POSTAG.A_M, 
                    // 方位词 方位语素 / Direction word
                    POSTAG.D_F, 
                    // 副词 / Adverb
                    POSTAG.D_D, POSTAG.D_R))) {
                        w1.ow = w1.w;
                        w1.w = '後';
                        bool = true;
                    }
                    // 若後詞為動詞，轉換為「後」（如「后來」）
                    // If next word is verb, convert to "後" (like "后來")
                    else if (((w2 === null || w2 === void 0 ? void 0 : w2.p) && (0, index_1.hexAndAny)(w2.p, POSTAG.D_V))) {
                        w1.ow = w1.w;
                        w1.w = '後';
                        bool = true;
                    }
                    // 複雜條件：前詞存在但無詞性，後詞為副詞
                    // Complex condition: previous word exists but has no POS, next word is adverb
                    else if (w2 && (((0, isUnset_1.isSet)(w0) && !w0.p) && (w2.p && (0, index_1.hexAndAny)(w2.p, 
                    // 副词 / Adverb
                    POSTAG.D_D)))) {
                        w1.ow = w1.w;
                        w1.w = '後';
                        bool = true;
                    }
                    // 若前詞無詞性且後詞為分隔符，轉換為「後」
                    // If previous word has no POS and next word is separator, convert to "後"
                    else if (w2 && ((!(w0 === null || w0 === void 0 ? void 0 : w0.p)) && SEP_P.includes(w2.w))) {
                        w1.ow = w1.w;
                        w1.w = '後';
                        bool = true;
                    }
                }
                // ==================== 「发/發」轉換邏輯 ====================
                // 「发/發」可為：1. 發送(動詞) 2. 頭髮(名詞)
                // "发/發" can be: 1. Send/emit (verb) 2. Hair (noun)
                else if (w1.w === '发' || w1.w === '發') {
                    let c;
                    // 取得前詞的最後一個字 / Get the last character of previous word
                    if (w0) {
                        c = w0.w;
                    }
                    // 若前詞為顏色詞（如「黑」、「金」等），轉換為「髮」
                    // If previous word is a color word (like "黑", "金"), convert to "髮"
                    if (c && COLORS_1.COLOR_HAIR[c]) {
                        let nw = '髮';
                        nw = this._getSynonym(w1.w, nw);
                        if (nw !== w1.w) {
                            w1.ow = w1.w;
                            w1.w = nw;
                            // 設為名詞詞性 / Set to noun POS
                            new_p = POSTAG.D_N;
                            bool = true;
                        }
                    }
                    // 若後詞為「的」，轉換為「發」（動詞用法，如「發的」）
                    // If next word is "的", convert to "發" (verb usage, like "發的")
                    if (!bool && w1.w === '发' && (w2 === null || w2 === void 0 ? void 0 : w2.w) === '的') {
                        w1.ow = w1.w;
                        w1.w = '發';
                        bool = true;
                    }
                    // 若前後詞皆為代詞，轉換為「發」（如「有人发這個」）
                    // If both previous and next words are pronouns, convert to "發"
                    if (!bool && w1.w === '发' && (w0 === null || w0 === void 0 ? void 0 : w0.p) & POSTAG.D_R && (w2 === null || w2 === void 0 ? void 0 : w2.p) & POSTAG.D_R) {
                        // ,進來之前有人发這個給我們,
                        w1.ow = w1.w;
                        w1.w = '發';
                        bool = true;
                    }
                    // 若後詞為「那麼/那么」，轉換為「發」（如「发那麼大火」）
                    // If next word is "那麼/那么", convert to "發"
                    if (!bool && w1.w === '发' && ((w2 === null || w2 === void 0 ? void 0 : w2.w) === '那麼' || (w2 === null || w2 === void 0 ? void 0 : w2.w) === '那么')) {
                        // 啊啦,发那麼大火,
                        w1.ow = w1.w;
                        w1.w = '發';
                        bool = true;
                    }
                }
                // ==================== 「于」轉換邏輯 ====================
                // 「于」可為：1. 姓氏 2. 介詞(於)
                // "于" can be: 1. Surname 2. Preposition (於)
                else if (w1.w === '于') {
                    // 條件1：句子開頭且後詞為名詞/動詞等，轉換為「於」
                    // Condition 1: At sentence start and next word is noun/verb, convert to "於"
                    if (((0, isUnset_1.isUnset)(w0) || w0.p & POSTAG.D_W) && ((w2 === null || w2 === void 0 ? void 0 : w2.p) && (w2.p & POSTAG.D_N
                        || w2.p & POSTAG.D_V
                        || w2.p & POSTAG.D_R
                        || w2.p & POSTAG.D_D
                        || w2.p & POSTAG.D_T
                        || w2.p & POSTAG.A_NR
                        || w2.p & POSTAG.D_S
                        || w2.p & POSTAG.D_F))) {
                        /**
                         * 當 於 在句子開頭並且後面是名詞或動詞時
                         * When "於" is at sentence start and followed by noun or verb
                         */
                        w1.ow = w1.w;
                        w1.w = '於';
                        // 設為介詞詞性 / Set to preposition POS
                        new_p = POSTAG.D_P;
                        w1.p = new_p;
                        bool = true;
                    }
                    // 條件2：前後詞皆存在，根據詞性組合判斷
                    // Condition 2: Both previous and next words exist, judge by POS combination
                    else if (w0 && w2) {
                        let w3;
                        // 多種詞性組合條件判斷 / Multiple POS combination conditions
                        if (
                        // 前詞為動詞/代詞/形容詞/時間/方位，後詞為名詞/動詞/代詞/處所/方位等
                        // Previous: verb/pronoun/adjective/time/direction, Next: noun/verb/pronoun/location/direction
                        ((0, index_1.hexAndAny)(w0.p, POSTAG.D_V, POSTAG.D_R, POSTAG.D_A, POSTAG.D_T, POSTAG.D_F) && (0, index_1.hexAndAny)(w2.p, POSTAG.D_N, POSTAG.D_V, POSTAG.D_R, POSTAG.D_S, POSTAG.A_NX, POSTAG.D_F, POSTAG.D_W))
                            ||
                                // 前後皆為名詞 / Both are nouns
                                ((0, index_1.hexAndAny)(w0.p, POSTAG.D_N) && (0, index_1.hexAndAny)(w2.p, POSTAG.D_N))
                            ||
                                // 前詞為動詞/名詞，後詞為方位/時間/人名/代詞/處所
                                // Previous: verb/noun, Next: direction/time/person name/pronoun/location
                                ((0, index_1.hexAndAny)(w0.p, POSTAG.D_V, POSTAG.D_N) && (0, index_1.hexAndAny)(w2.p, POSTAG.D_F, POSTAG.D_T, POSTAG.A_NR, POSTAG.D_R, POSTAG.D_S, POSTAG.D_W))
                            ||
                                // 前後皆為地名/時間 / Both are place names/time
                                ((0, index_1.hexAndAny)(w0.p, POSTAG.A_NS, POSTAG.D_T, POSTAG.D_C) && (0, index_1.hexAndAny)(w2.p, POSTAG.A_NS, POSTAG.D_T))
                            ||
                                // 前詞為副詞，後詞為名詞 / Previous: adverb, Next: noun
                                ((0, index_1.hexAndAny)(w0.p, POSTAG.D_D) && (0, index_1.hexAndAny)(w2.p, POSTAG.D_N))
                            /*
                            ||
                            (hexAndAny(w0.p,
                                POSTAG.D_V,
                            ) && hexAndAny(w2.p,
                                POSTAG.D_D,
                            ))
                            */
                            ||
                                // 前詞為人名，後詞為地名/機構名/處所/名詞/動詞
                                // Previous: person name, Next: place name/org name/location/noun/verb
                                ((0, index_1.hexAndAny)(w0.p, POSTAG.A_NR) && (0, index_1.hexAndAny)(w2.p, POSTAG.A_NS, POSTAG.A_NT, POSTAG.D_S, POSTAG.D_N, POSTAG.D_V))
                            ||
                                // 前詞為動詞，後詞為標點 / Previous: verb, Next: punctuation
                                ((0, index_1.hexAndAny)(w0.p, POSTAG.D_V) && (0, index_1.hexAndAny)(w2.p, POSTAG.D_W))
                            ||
                                // 前詞為副詞，後詞為動詞 / Previous: adverb, Next: verb
                                ((0, index_1.hexAndAny)(w0.p, POSTAG.D_D) && (0, index_1.hexAndAny)(w2.p, POSTAG.D_V))
                            ||
                                // 前詞為動詞，後詞為副詞 / Previous: verb, Next: adverb
                                ((0, index_1.hexAndAny)(w0.p, POSTAG.D_V) && (0, index_1.hexAndAny)(w2.p, POSTAG.D_D))
                            ||
                                // 前詞為名詞，後詞為動詞 / Previous: noun, Next: verb
                                ((0, index_1.hexAndAny)(w0.p, POSTAG.D_N) && (0, index_1.hexAndAny)(w2.p, POSTAG.D_V))
                            ||
                                // 原先于北方大地偷偷撰寫網絡小說的平鳥，
                                // 前詞為副詞，後詞為方位詞 / Previous: adverb, Next: direction word
                                ((0, index_1.hexAndAny)(w0.p, POSTAG.D_D) && (0, index_1.hexAndAny)(w2.p, POSTAG.D_F))) {
                            w1.ow = w1.w;
                            w1.w = '於';
                            new_p = POSTAG.D_P;
                            w1.p = new_p;
                            bool = true;
                        }
                        // 三詞組合判斷：動詞 + 于 + 副詞 + 動詞
                        // Three-word combination: verb + 于 + adverb + verb
                        else if (!(0, isUnset_1.isUnset)(w3 = words[i + 2])) {
                            if (w0.p & POSTAG.D_V
                                && w2.p & POSTAG.D_D
                                && w3.p & POSTAG.D_V) {
                                w1.ow = w1.w;
                                w1.w = '於';
                                new_p = POSTAG.D_P;
                                w1.p = new_p;
                                bool = true;
                            }
                        }
                    }
                    // 條件3：後詞為時間詞，轉換為「於」（如「于日后」）
                    // Condition 3: Next word is time word, convert to "於"
                    if (!bool && ((w2 === null || w2 === void 0 ? void 0 : w2.p) & POSTAG.D_T)) {
                        /**
                         * 迫使法妮雅得于日后和杰弥尼成婚……
                         * Forces Fanniya to marry Jiemini later...
                         */
                        w1.ow = w1.w;
                        w1.w = '於';
                        new_p = POSTAG.D_P;
                        w1.p = new_p;
                        bool = true;
                    }
                }
                // ==================== 「么」轉換邏輯 ====================
                // 「么」可為：1. 數詞後綴(一么) 2. 語氣詞(麼)
                // "么" can be: 1. Numeral suffix 2. Modal particle (麼)
                else if (w1.w === '么') {
                    // 若後詞不存在或為標點，轉換為「麼」（句末語氣詞）
                    // If next word doesn't exist or is punctuation, convert to "麼" (sentence-final particle)
                    if ((0, isUnset_1.isUnset)(w2) || w2.p & POSTAG.D_W) {
                        w1.ow = w1.w;
                        w1.w = '麼';
                        bool = true;
                    }
                }
                // ==================== 「余」轉換邏輯 ====================
                // 「余」可為：1. 姓氏 2. 代詞(我) 3. 剩餘(餘)
                // "余" can be: 1. Surname 2. Pronoun (I/me) 3. Remainder (餘)
                else if (w1.w === '余') {
                    // 特殊詞組處理：「余力」→「餘力」
                    // Special phrase handling: "余力" → "餘力"
                    if ((w2 === null || w2 === void 0 ? void 0 : w2.w) === '力' && ((_a = words[i + 2]) === null || _a === void 0 ? void 0 : _a.p) & POSTAG.D_W) {
                        let nw = w1.w + w2.w;
                        let ow = this._TABLE[nw];
                        // 合併兩詞為一詞 / Merge two words into one
                        this.sliceToken(words, i, 2, {
                            w: nw,
                            p: (_b = ow.p) !== null && _b !== void 0 ? _b : 0x101000,
                            f: ow.f,
                            m: [w1, w2],
                        }, undefined, {
                            [this.name]: true,
                        });
                        bool = true;
                        continue;
                    }
                }
            }
            // ==================== 多字詞彙處理 ====================
            // Handle multi-character words
            else if (w1_len > 1) {
                // 處理以「发/發」結尾的詞彙（如「黑发」、「金發」）
                // Handle words ending with "发/發" (like "黑发", "金發")
                if (w1.w.match(/^(.+)[发發]$/)) {
                    let c = RegExp.$1;
                    // 若前綴為顏色詞，轉換為「髮」
                    // If prefix is a color word, convert to "髮"
                    if (COLORS_1.COLOR_HAIR[c]) {
                        let nw = c + '髮';
                        nw = this._getSynonym(w1.w, nw);
                        if (nw !== w1.w) {
                            w1.ow = w1.w;
                            w1.w = nw;
                            bool = true;
                        }
                    }
                    // 若為數量詞（如「一发」、「兩发」），轉換為「發」
                    // If it's a quantifier (like "一发", "兩发"), convert to "發"
                    else if (w1.w === (c + '发')
                        && (w1.p & POSTAG.D_MQ)) {
                        // 　一发、兩发、三发、四发、五发、六发——
                        let nw = c + '發';
                        w1.ow = w1.w;
                        w1.w = nw;
                        bool = true;
                    }
                    // 若前詞不存在或為標點，且字典中有對應的「髮」詞彙
                    // If previous word doesn't exist or is punctuation, and dictionary has corresponding "髮" word
                    else if (
                    // 不修正繁體的 發 / Don't modify Traditional "發"
                    w1.w === (c + '发')
                        && ((0, isUnset_1.isUnset)(w0)
                            || (w0.p === POSTAG.D_W
                            //|| COLOR_HAIR[w0.w]
                            ))) {
                        let nw = c + '髮';
                        let ow = TABLE[nw];
                        // 檢查字典中是否有此詞彙且有標註 / Check if dictionary has this word with annotation
                        if (ow === null || ow === void 0 ? void 0 : ow.s) {
                            w1.ow = w1.w;
                            w1.w = nw;
                            new_p = ow.p;
                            bool = true;
                        }
                    }
                }
                // 處理以「余」結尾的數量詞（如「十余」→「十餘」）
                // Handle quantifiers ending with "余" (like "十余" → "十餘")
                else if ((0, index_1.hexAndAny)(w1.p, POSTAG.D_MQ) && /^(.+)余$/.test(w1.w)) {
                    let nw = RegExp.$1 + '餘';
                    w1.ow = w1.w;
                    w1.w = nw;
                    bool = true;
                }
                // 如果項目為 量词
                // If the item is a quantifier
                else if ((0, index_1.hexAndAny)(w1.p, 
                //POSTAG.A_Q,
                POSTAG.D_MQ)) {
                    // 處理以「几」開頭的量詞（如「几次」→「幾次」）
                    // Handle quantifiers starting with "几" (like "几次" → "幾次")
                    if (/^几/.test(w1.w) && ((_c = w1.m) === null || _c === void 0 ? void 0 : _c.length) > 1) {
                        /*
                        let m = w1.m as IWord[];
                        if (m[0].p & POSTAG.D_MQ)
                        {

                        }
                         */
                        let nw = w1.w.replace(/^几/, '幾');
                        w1.ow = w1.w;
                        w1.w = nw;
                        bool = true;
                    }
                }
                // 【已停用】處理「干」相關詞彙轉換
                // [DISABLED] Handle "干" related word conversion
                else if (0 && w1.p & POSTAG.D_V && /^干(.)$/.test(w1.w)) {
                    /**
                     * @todo 需要更嚴謹的判斷方式
                     * @todo Need more rigorous judgment method
                     */
                    let c = RegExp.$1;
                    let nw = '幹' + c;
                    let ow = TABLE[nw];
                    if (ow && (0, index_1.hexAndAny)(ow.p, POSTAG.D_V)) {
                        if (w2 && (0, index_1.hexAndAny)(w2.p, POSTAG.D_R)) {
                            w1.ow = w1.w;
                            w1.w = nw;
                            bool = true;
                        }
                    }
                }
                // 如果項目為 錯字
                // If the item is marked as a bad/unknown word
                else if (w1.p & POSTAG.BAD) {
                    let nw;
                    // 嘗試修正常見錯字 / Try to fix common typos
                    nw = w1.w
                        .replace(/(.)里|里(.)/, '$1裡$2')
                        .replace(/(.)后|后(.)/, '$1後$2')
                        .replace(/蔘(.)/, '參$1');
                    nw = this._getSynonym(w1.w, nw);
                    //console.log(w1, nw);
                    if (nw !== w1.w) {
                        w1.ow = w1.w;
                        w1.w = nw;
                        bool = true;
                    }
                }
                // 如果項目為 方位
                // If the item is a direction word
                else if (w1.p & POSTAG.D_F) {
                    let nw = w1.w
                        .replace(/(.)里|里(.)/, '$1裡$2')
                        .replace(/(.)后|后(.)/, '$1後$2');
                    nw = this._getSynonym(w1.w, nw);
                    if (nw !== w1.w) {
                        w1.ow = w1.w;
                        w1.w = nw;
                        bool = true;
                    }
                }
                // 如果項目為 處所
                // If the item is a location word
                else if (w1.p & POSTAG.D_S) {
                    let nw = w1.w
                        .replace(/(.)里$/, '$1裡');
                    nw = this._getSynonym(w1.w, nw);
                    if (nw !== w1.w) {
                        w1.ow = w1.w;
                        w1.w = nw;
                        bool = true;
                    }
                }
                // 如果項目為 时间
                // If the item is a time word
                else if (w1.p & POSTAG.D_T || w1.p & POSTAG.D_V) {
                    let nw = w1.w
                        .replace(/(.)后|后(.)/, '$1後$2');
                    nw = this._getSynonym(w1.w, nw);
                    if (nw !== w1.w) {
                        w1.op = w1.op || w1.p;
                        w1.ow = w1.w;
                        w1.w = nw;
                        bool = true;
                    }
                }
            }
            // ==================== 更新詞彙資訊 ====================
            // 若成功轉換，更新詞彙的詞性與相關資訊
            // If conversion is successful, update the word's POS and related information
            if (bool && w1.ow && w1.ow !== w1.w) {
                // 從字典中取得新詞彙的資訊 / Get new word's information from dictionary
                if (w1.w in TABLE) {
                    let ow = TABLE[w1.w];
                    // 更新詞性標註 / Update part-of-speech tag
                    if (typeof new_p !== 'undefined') {
                        w1.op = w1.op || ow.p;
                        w1.p = new_p;
                    }
                    else if (ow.p !== w1.p) {
                        w1.op = w1.op || w1.p;
                        w1.p = ow.p;
                        //console.log(TABLE[w1.w]);
                    }
                    // 更新詞頻資訊 / Update frequency information
                    if (ow.s !== w1.s) {
                        w1.os = ('os' in w1) ? w1.os : (w1.s || false);
                        w1.s = ow.s;
                    }
                }
                // 記錄除錯資訊 / Record debug information
                this.debugToken(w1, {
                    [this.name]: true,
                });
            }
            i++;
        }
        return words;
    }
}
exports.ZhtSynonymOptimizer = ZhtSynonymOptimizer;
/**
 * 初始化函數
 * Initialization function
 *
 * 綁定類別的靜態 init 方法，用於建立優化器實例。
 * Binds the class's static init method for creating optimizer instances.
 */
exports.init = ZhtSynonymOptimizer.init.bind(ZhtSynonymOptimizer);
/**
 * 類型標識
 * Type identifier
 *
 * 用於識別此模組的類型。
 * Used to identify the type of this module.
 */
exports.type = ZhtSynonymOptimizer.type;
exports.default = ZhtSynonymOptimizer;
//# sourceMappingURL=ZhtSynonymOptimizer.js.map