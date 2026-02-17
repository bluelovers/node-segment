'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.type = exports.init = exports.DictOptimizer = void 0;
const mod_1 = require("../mod");
// 方向詞正則表達式，用於匹配東西南北等方向詞 / Direction word regex for matching directions like East, West, South, North
const DIRECTIONS_REGEXP = /^[東西南北东]+$/;
/**
 * 詞典優化模組
 * Dictionary Optimizer Module
 *
 * 負責對分詞結果進行優化處理，合併相鄰的詞彙以提升分詞準確度。
 * 主要功能包括：
 * - 合併相鄰且能組成新詞的詞彙
 * - 處理形容詞 + 助詞的組合
 * - 處理數詞與量詞的組合
 * - 處理方向詞的合併
 *
 * Responsible for optimizing segmentation results by merging adjacent words to improve accuracy.
 * Main features include:
 * - Merging adjacent words that can form new words
 * - Handling adjective + particle combinations
 * - Handling numeral + quantifier combinations
 * - Handling direction word merging
 *
 * @author 老雷<leizongmin@gmail.com>
 */
class DictOptimizer extends mod_1.SubSModuleOptimizer {
    constructor() {
        super(...arguments);
        /**
         * 模組名稱
         * Module Name
         *
         * 用於識別此優化模組的名稱，在除錯時會顯示於詞彙的處理記錄中。
         *
         * The name used to identify this optimization module.
         * Displayed in word processing records during debugging.
         */
        this.name = 'DictOptimizer';
    }
    /**
     * 快取初始化
     * Cache Initialization
     *
     * 覆寫父類別的快取方法，初始化詞典對照表與詞性標籤。
     * 必須在執行優化前呼叫，以確保必要資源已載入。
     *
     * Overrides parent class cache method to initialize dictionary table and POS tags.
     * Must be called before optimization to ensure required resources are loaded.
     *
     * @override
     */
    _cache() {
        super._cache();
        this._TABLE = this.segment.getDict('TABLE');
        this._POSTAG = this.segment.POSTAG;
    }
    /**
     * 判斷兩詞是否可合併
     * Determine if Two Words Can Be Merged
     *
     * 根據詞性判斷兩個相鄰詞彙是否可以合併為一個新詞。
     * 合併條件包括：
     * - 兩詞詞性相同
     * - 兩詞詞性有交集（位元運算 AND 不為零）
     * - 第一詞有詞性且第二詞無詞性
     * - 副詞 + 動詞組合，且合併後詞存在於詞典中
     *
     * Determines if two adjacent words can be merged into a new word based on their part-of-speech.
     * Merge conditions include:
     * - Both words have the same POS
     * - Both words have overlapping POS (bitwise AND is non-zero)
     * - First word has POS and second word has no POS
     * - Adverb + Verb combination, where merged word exists in dictionary
     *
     * @param {IWord} w1 - 第一個詞 / First word
     * @param {IWord} w2 - 第二個詞 / Second word
     * @param {Object} options - 選項物件 / Options object
     * @param {typeof IPOSTAG} options.POSTAG - 詞性標籤定義 / POS tag definitions
     * @param {IDICT} options.TABLE - 詞典對照表 / Dictionary lookup table
     * @param {string} options.nw - 合併後的新詞 / New merged word
     * @param {number} options.i - 當前索引 / Current index
     * @param {IWord} options.nw_cache - 詞彙快取 / Word cache
     * @param {boolean} options.nw_cache_exists - 快取是否存在 / Cache exists flag
     * @returns {boolean} 是否可合併 / Whether the words can be merged
     */
    isMergeable(w1, w2, { POSTAG, TABLE, nw, i, nw_cache, nw_cache_exists, }) {
        let bool;
        let m;
        // 原始判斷模式：兩詞詞性完全相同 / Original condition: both words have identical POS
        if (w1.p === w2.p) {
            bool = true;
        }
        /**
         * 不確定沒有 BUG 但原始模式已經不合需求，因為單一項目可能有多個詞性
         * Uncertain if bug-free, but original pattern no longer meets requirements due to multiple POS per item
         */
        else if (m = (w1.p & w2.p)) {
            if (1 || m & POSTAG.D_N) {
                bool = true;
            }
        }
        // 允許例如「幾 + ％」的組合 / Allow combinations like "幾 + ％"
        else if (w1.p && typeof w2.p === 'undefined') {
            bool = true;
        }
        // 副詞 + 動詞組合 / Adverb + Verb combination
        else if (w1.p & POSTAG.D_D && w2.p & POSTAG.D_V) {
            ({
                nw_cache,
                nw_cache_exists,
            } = this._getWordCache(nw, nw_cache, nw_cache_exists));
            let mw = nw_cache;
            if (mw && (mw.p & POSTAG.D_D || mw.p & POSTAG.D_V)) {
                bool = true;
            }
        }
        return bool
            && this._getWordCache(nw, nw_cache, nw_cache_exists).nw_cache_exists;
    }
    /**
     * 取得詞彙快取
     * Get Word Cache
     *
     * 從詞典中查詢指定詞彙，並快取查詢結果以避免重複查詢。
     * 若快取狀態已存在，則直接返回現有結果。
     *
     * Queries the dictionary for a specified word and caches the result to avoid repeated lookups.
     * If the cache state already exists, returns the existing result directly.
     *
     * @protected
     * @param {string} nw - 要查詢的新詞 / New word to query
     * @param {IWord} nw_cache - 現有的詞彙快取 / Existing word cache
     * @param {boolean} nw_cache_exists - 快取是否存在標記 / Cache exists flag
     * @returns {{ nw: string, nw_cache: IWord, nw_cache_exists: boolean }} 查詢結果物件 / Query result object
     */
    _getWordCache(nw, nw_cache, nw_cache_exists) {
        // 若快取狀態尚未計算，則從詞典查詢 / If cache state not yet computed, query from dictionary
        if (typeof nw_cache_exists === 'undefined') {
            const TABLE = this._TABLE;
            // 取得詞彙資料，優先使用傳入的快取值 / Get word data, prefer passed cache value
            nw_cache = nw_cache || TABLE[nw];
            // 轉換為布林值表示詞彙是否存在 / Convert to boolean indicating if word exists
            nw_cache_exists = !!nw_cache;
        }
        return {
            nw,
            nw_cache,
            nw_cache_exists,
        };
    }
    /**
     * 執行詞典優化
     * Perform Dictionary Optimization
     *
     * 對分詞結果進行優化處理，合併相鄰詞彙以提升分詞準確度。
     * 主要處理邏輯包括：
     * - 形容詞 + 助詞組合（如：不同 + 的 = 不同的）
     * - 形容詞 + 名詞組合
     * - 相同詞性或可合併詞性的相鄰詞
     * - 數詞組合（百分比、小數、千分位）
     * - 數詞 + 量詞組合
     * - 方向詞合併
     *
     * 由於合併後可能產生新的可合併組合，會遞迴執行兩次以確保完整處理。
     *
     * Performs optimization on segmentation results by merging adjacent words to improve accuracy.
     * Main processing logic includes:
     * - Adjective + Particle combinations (e.g., 不同 + 的 = 不同的)
     * - Adjective + Noun combinations
     * - Adjacent words with same or mergeable POS
     * - Numeral combinations (percentage, decimal, thousand separator)
     * - Numeral + Quantifier combinations
     * - Direction word merging
     *
     * Since merging may create new mergeable combinations, runs twice recursively to ensure complete processing.
     *
     * @override
     * @param {IWord[]} words - 待優化的詞彙陣列 / Word array to optimize
     * @param {boolean} is_not_first - 是否為遞迴呼叫 / Whether this is a recursive call
     * @returns {IWord[]} 優化後的詞彙陣列 / Optimized word array
     */
    doOptimize(words, is_not_first) {
        var _a;
        // 初始化遞迴標記，預設為首次執行 / Initialize recursive flag, default to first run
        if (typeof is_not_first === 'undefined') {
            is_not_first = false;
        }
        // 取得詞典對照表與詞性標籤 / Get dictionary table and POS tags
        const TABLE = this._TABLE;
        const POSTAG = this._POSTAG;
        const self = this;
        let i = 0;
        let ie = words.length - 1;
        while (i < ie) {
            let w1 = words[i];
            let w2 = words[i + 1];
            //debug(w1.w + ', ' + w2.w);
            // 合併後的新詞 / New merged word
            let nw = w1.w + w2.w;
            // 詞彙快取變數 / Word cache variables
            let nw_cache;
            let nw_cache_exists;
            /**
             * 形容詞 + 助詞 = 形容詞，如：不同 + 的 = 不同的
             * Adjective + Particle = Adjective, e.g., 不同 + 的 = 不同的
             */
            if (w1.w !== '了'
                && (w1.p & POSTAG.D_A)
                && (w2.p & POSTAG.D_U)) {
                let p = POSTAG.D_A;
                let f;
                ({
                    nw_cache,
                    nw_cache_exists,
                } = self._getWordCache(nw, nw_cache, nw_cache_exists));
                let mw = nw_cache;
                // 若詞典無此詞或詞典中為形容詞，則合併 / Merge if not in dictionary or is adjective in dictionary
                if (!mw || (mw.p & POSTAG.D_A)) {
                    if (((mw === null || mw === void 0 ? void 0 : mw.p) & POSTAG.D_A)) {
                        p = mw.p;
                        f = mw.f;
                    }
                    else if (w1.p & POSTAG.BAD) {
                        p = POSTAG.D_A + POSTAG.BAD;
                    }
                    this.sliceToken(words, i, 2, {
                        w: nw,
                        //p: ((nw in TABLE && TABLE[nw].p & POSTAG.D_A) ? TABLE[nw].p : POSTAG.D_A),
                        p,
                        f,
                        m: [w1, w2],
                    }, undefined, {
                        [this.name]: 1,
                    });
                    ie--;
                    continue;
                }
            }
            /**
             * 形容詞 + 名詞 = 名詞
             * Adjective + Noun = Noun
             */
            if ((w1.p & POSTAG.D_A)
                && (w2.p & POSTAG.D_N)) {
                ({
                    nw_cache,
                    nw_cache_exists,
                } = self._getWordCache(nw, nw_cache, nw_cache_exists));
                if (nw_cache_exists) {
                    let mw = nw_cache;
                    // 若合併後詞在詞典中為名詞，則合併 / Merge if combined word is noun in dictionary
                    if (mw.p & POSTAG.D_N) {
                        this.sliceToken(words, i, 2, {
                            w: nw,
                            p: mw.p,
                            f: mw.f,
                            m: [w1, w2],
                        }, undefined, {
                            [this.name]: 7,
                        });
                        ie--;
                        continue;
                    }
                }
            }
            // 能組成一個新詞的（詞性必須相同
            // Words that can form a new word (must have same POS)
            if (this.isMergeable(w1, w2, {
                nw,
                POSTAG,
                TABLE,
                i,
                nw_cache,
                nw_cache_exists,
            })) 
            //if (w1.p == w2.p && nw in TABLE)
            {
                ({
                    nw_cache,
                    nw_cache_exists,
                } = self._getWordCache(nw, nw_cache, nw_cache_exists));
                let mw = nw_cache;
                this.sliceToken(words, i, 2, {
                    w: nw,
                    p: mw.p,
                    f: mw.f,
                    m: [w1, w2],
                }, undefined, {
                    [this.name]: 2,
                });
                ie--;
                continue;
            }
            // ============================================
            // 數詞組合 / Numeral combinations
            if ((w1.p & POSTAG.A_M)) {
                //debug(w2.w + ' ' + (w2.p & POSTAG.A_M));
                // 百分比數字 如 10%，或者下一個詞也是數詞，則合併
                // Percentage numbers like 10%, or merge if next word is also numeral
                if ((w2.p & POSTAG.A_M
                    && !/^第/.test(w2.w)) || w2.w === '%' || w2.w === '％') {
                    this.sliceToken(words, i, 2, {
                        w: w1.w + w2.w,
                        p: POSTAG.A_M,
                        m: [w1, w2],
                    }, undefined, {
                        [this.name]: 3,
                    });
                    ie--;
                    continue;
                }
                // 數詞 + 量詞，合併。如：100個 / Numeral + Quantifier, merge. E.g., 100個
                if ((w2.p & POSTAG.A_Q)) {
                    // 數量詞 / Numeral-quantifier
                    let p = POSTAG.D_MQ;
                    let nw = w1.w + w2.w;
                    ({
                        nw_cache,
                        nw_cache_exists,
                    } = self._getWordCache(nw, nw_cache, nw_cache_exists));
                    p = this._mergeWordHowManyProp(p, w2.p, nw_cache === null || nw_cache === void 0 ? void 0 : nw_cache.p);
                    /*
                    if (nw_cache)
                    {
                        p = nw_cache.p | POSTAG.D_MQ;
                    }
                    else
                    {
                        if (w2.p & POSTAG.D_T)
                        {
                            p = p | POSTAG.D_T;
                        }
                        if (w2.p & POSTAG.D_N)
                        {
                            p = p | POSTAG.D_N;
                        }
                        if (w2.p & POSTAG.D_V)
                        {
                            p = p | POSTAG.D_V;
                        }
                    }
                     */
                    this.sliceToken(words, i, 2, {
                        w: nw,
                        p,
                        m: [w1, w2],
                    }, undefined, {
                        [this.name]: 4,
                    });
                    ie--;
                    continue;
                }
                // 帶小數點的數字，如 "3 . 14"，或者 "十五點三" / Decimal numbers like "3 . 14" or "十五點三"
                // 數詞 + "分之" + 數詞，如"五十分之一" / Numeral + "分之" + Numeral, e.g., "五十分之一"
                let w3 = words[i + 2];
                if (((w3 === null || w3 === void 0 ? void 0 : w3.p) & POSTAG.A_M)) {
                    if (w2.w === '.'
                        || w2.w === '点'
                        || w2.w === '點'
                        || w2.w === '分之') {
                        this.sliceToken(words, i, 3, {
                            w: w1.w + w2.w + w3.w,
                            p: POSTAG.A_M,
                            m: [w1, w2, w3],
                        }, undefined, {
                            [this.name]: 5,
                        });
                        ie -= 2;
                        continue;
                    }
                    /**
                     * 支援 `最多容納59,000個人,或5.9萬人,再多就不行了.這是環評的結論.`
                     */
                    if (w2.w === ',') {
                        // 純數字正則 / Pure digit regex
                        let _r1 = /^[\d０-９]+$/;
                        // 數字（含小數）正則 / Digit (with decimal) regex
                        let _r2 = /^(?:(?:[\d０-９]+)?(?:\.[\d０-９]+)|(?:[\d０-９]+))$/;
                        if (_r1.test(w1.w) && _r2.test(w3.w)) {
                            this.sliceToken(words, i, 3, {
                                w: w1.w + w2.w + w3.w,
                                p: POSTAG.A_M,
                                m: [w1, w2, w3],
                            }, undefined, {
                                [this.name]: 6,
                            });
                            ie -= 2;
                            continue;
                        }
                    }
                }
            }
            // 數百、數千、數萬等 + 量詞，如：數百個 / 數百, 數千, 數萬 etc. + Quantifier, e.g., 數百個
            if (/^(?:[數数幾几][百千萬十億兆万亿]|毎)$/.test(w1.w) && w2.p & POSTAG.A_Q) {
                // 原始詞與新詞（目前未使用）/ Original word and new word (currently unused)
                let ow = w1.w + w2.w;
                let nw = w1.w + w2.w;
                if (0 && /^几/.test(nw)) {
                    nw = nw.replace(/^几/, '幾');
                }
                ({
                    nw_cache,
                    nw_cache_exists,
                } = self._getWordCache(nw, nw_cache, nw_cache_exists));
                let p = this._mergeWordHowManyProp(POSTAG.D_MQ, w2.p, nw_cache === null || nw_cache === void 0 ? void 0 : nw_cache.p);
                this.sliceToken(words, i, 2, {
                    w: nw,
                    p,
                    m: [w1, w2],
                }, undefined, {
                    [this.name]: 9,
                });
                ie--;
                continue;
            }
            // 數/幾/第 + 數詞 + 量詞，如：幾百個 / 數/幾/第 + Numeral + Quantifier, e.g., 幾百個
            if (/^[數数幾几第]$/.test(w1.w) && w2.p & POSTAG.A_M && ((_a = words[i + 2]) === null || _a === void 0 ? void 0 : _a.p) & POSTAG.A_Q) {
                let w3 = words[i + 2];
                let nw;
                if (0 && w1.w === '几') {
                    nw = '幾' + w2.w + w3.w;
                }
                else {
                    nw = w1.w + w2.w + w3.w;
                }
                let nw_cache = this._TABLE[nw];
                // 若詞典中無此詞，則建立新的數量詞組合 / If word not in dictionary, create new numeral-quantifier combination
                if (!(nw_cache === null || nw_cache === void 0 ? void 0 : nw_cache.p)) {
                    let p = this._mergeWordHowManyProp(POSTAG.D_MQ, w3.p, nw_cache === null || nw_cache === void 0 ? void 0 : nw_cache.p);
                    this.sliceToken(words, i, 3, {
                        w: nw,
                        p,
                        m: [w1, w2, w3],
                    }, undefined, {
                        [this.name]: 9,
                    });
                    ie -= 2;
                    continue;
                }
            }
            // 修正 “十五点五八”问题
            if ((w1.p & POSTAG.D_MQ) && ['點', '点'].includes(w1.w.substr(-1)) && w2.p & POSTAG.A_M) {
                //debug(w1, w2);
                let i2 = 2;
                let w4w = '';
                // 收集後續所有數詞 / Collect all subsequent numerals
                for (let j = i + i2; j < ie; j++) {
                    let w3 = words[j];
                    if ((w3.p & POSTAG.A_M) > 0) {
                        w4w += w3.w;
                        i2++;
                    }
                    else {
                        break;
                    }
                }
                this.sliceToken(words, i, i2, {
                    w: w1.w + w2.w + w4w,
                    p: POSTAG.D_MQ, // 數量詞 / Numeral-quantifier
                    m: [w1, w2, w4w],
                }, undefined, {
                    [this.name]: 6,
                });
                ie -= i2 - 1;
                continue;
            }
            // 合併東南西北方向詞 / Merge direction words (東南西北)
            if (DIRECTIONS_REGEXP.test(w1.w)) {
                if (DIRECTIONS_REGEXP.test(w2.w)) {
                    ({
                        nw_cache,
                        nw_cache_exists,
                    } = self._getWordCache(nw, nw_cache, nw_cache_exists));
                    let mw = this.createToken({
                        p: POSTAG.D_F,
                        ...nw_cache,
                        w: nw,
                        m: [w1, w2],
                    });
                    // 確保詞性包含方向詞標籤 / Ensure POS includes direction tag
                    mw.p = mw.p | POSTAG.D_F;
                    this.sliceToken(words, i, 2, mw, true, {
                        [this.name]: 8,
                    });
                    ie--;
                    continue;
                }
            }
            // 移到下一個詞 / Move to next word
            i++;
        }
        // 針對組合數字後無法識別新組合的數字問題，需要重新掃描一次 / Re-scan to handle new numeric words created by combinations
        return is_not_first === true ? words : this.doOptimize(words, true);
    }
    /**
     * 合併數詞與量詞的詞性
     * Merge Numeral and Quantifier POS
     *
     * 根據量詞和詞典中詞彙的詞性，決定數量詞的最終詞性。
     * 若詞典中已有該詞，則保留其詞性並加上數量詞標籤。
     * 否則根據量詞的詞性添加對應標籤（時間、名詞、動詞）。
     *
     * Determines the final POS of numeral-quantifier based on quantifier and dictionary word POS.
     * If the word exists in dictionary, preserves its POS and adds numeral-quantifier tag.
     * Otherwise, adds corresponding tags based on quantifier POS (time, noun, verb).
     *
     * @private
     * @param {number} p - 基礎詞性 / Base POS
     * @param {number} p2 - 量詞詞性 / Quantifier POS
     * @param {number} [p3] - 詞典中詞彙的詞性 / Dictionary word POS
     * @returns {number} 合併後的詞性 / Merged POS
     */
    _mergeWordHowManyProp(p, p2, p3) {
        // 若詞典中有該詞，保留其詞性並加上數量詞標籤 / If word in dictionary, preserve its POS and add numeral-quantifier tag
        if (p3) {
            p = p3 | this._POSTAG.D_MQ;
        }
        else {
            // 若量詞包含時間詞性，則添加時間標籤 / Add time tag if quantifier has time POS
            if (p2 & this._POSTAG.D_T) {
                p = p | this._POSTAG.D_T;
            }
            // 若量詞包含名詞詞性，則添加名詞標籤 / Add noun tag if quantifier has noun POS
            if (p2 & this._POSTAG.D_N) {
                p = p | this._POSTAG.D_N;
            }
            // 若量詞包含動詞詞性，則添加動詞標籤 / Add verb tag if quantifier has verb POS
            if (p2 & this._POSTAG.D_V) {
                p = p | this._POSTAG.D_V;
            }
        }
        return p;
    }
}
exports.DictOptimizer = DictOptimizer;
exports.init = DictOptimizer.init.bind(DictOptimizer);
exports.type = DictOptimizer.type;
exports.default = DictOptimizer;
//# sourceMappingURL=DictOptimizer.js.map