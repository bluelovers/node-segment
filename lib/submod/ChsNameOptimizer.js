/**
 * 人名優化模組
 * Chinese Name Optimizer Module
 *
 * 此模組負責識別與合併中文人名，採用兩遍掃描策略：
 * 第一遍處理複雜的人名組合（如三字名、帶前綴的稱呼）；
 * 第二遍處理簡單的「姓 + 名」組合。
 *
 * This module is responsible for identifying and merging Chinese names,
 * using a two-pass scanning strategy:
 * First pass handles complex name combinations (e.g., three-character names, prefixed titles);
 * Second pass handles simple "surname + given name" combinations.
 *
 * @author 老雷<leizongmin@gmail.com>
 * @version 0.1
 */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.type = exports.init = exports.ChsNameOptimizer = void 0;
const mod_1 = require("../mod");
const CHS_NAMES_1 = require("../mod/CHS_NAMES");
/**
 * 中文人名優化器
 * Chinese Name Optimizer
 *
 * @todo 支援 XX氏 / Support "XX氏" format (e.g., 陳氏、李氏)
 */
class ChsNameOptimizer extends mod_1.SubSModuleOptimizer {
    constructor() {
        super(...arguments);
        /**
         * 模組名稱
         * Module Name
         *
         * @override
         */
        this.name = 'ChsNameOptimizer';
    }
    /**
     * 快取初始化
     * Cache Initialization
     *
     * 初始化模組所需的字典快取，包括主字典與黑名單字典。
     * 黑名單用於防止錯誤的人名合併（如「於是」不應被識別為人名）。
     *
     * Initializes the dictionary caches required by the module,
     * including the main dictionary and blacklist dictionary.
     * The blacklist prevents incorrect name merging
     * (e.g., "於是" should not be recognized as a name).
     *
     * @override
     * @protected
     */
    _cache() {
        super._cache();
        this._TABLE = this.segment.getDict('TABLE');
        // 黑名單：防止將非人名詞組錯誤合併為人名
        // Blacklist: prevents non-name phrases from being incorrectly merged as names
        this._BLACKLIST = this.segment.getDict("BLACKLIST_FOR_OPTIMIZER" /* EnumDictDatabase.BLACKLIST_FOR_OPTIMIZER */) || {};
    }
    /**
     * 檢查是否在黑名單中
     * Check if in Blacklist
     *
     * 判斷給定的詞是否存在於優化器黑名單中。
     * 黑名單中的詞不會被合併為人名。
     *
     * Determines if the given word exists in the optimizer blacklist.
     * Words in the blacklist will not be merged as names.
     *
     * @param {string} nw - 待檢查的詞 / Word to check
     * @returns {boolean} 是否在黑名單中 / Whether in blacklist
     */
    isBlackList(nw) {
        return nw in this._BLACKLIST;
    }
    /**
     * 檢查多詞是否可合併
     * Check if Multiple Words are Mergeable
     *
     * 檢查多個詞合併後是否不在黑名單中，即可進行合併。
     *
     * Checks if multiple words can be merged by verifying
     * the combined result is not in the blacklist.
     *
     * @param {...string[]} words - 待合併的詞 / Words to merge
     * @returns {true | null} 可合併返回 true，否則返回 null / Returns true if mergeable, null otherwise
     */
    isMergeable2(...words) {
        let nw = words.join('');
        if (!this.isBlackList(nw)) {
            return true;
        }
        return null;
    }
    /**
     * 檢查兩詞是否可合併
     * Check if Two Words are Mergeable
     *
     * 檢查兩個相鄰詞是否可以合併，需滿足：
     * 1. 兩詞都存在
     * 2. 合併後的詞不在黑名單中
     *
     * Checks if two adjacent words can be merged, requiring:
     * 1. Both words exist
     * 2. The merged word is not in the blacklist
     *
     * @param {IWord} word - 當前詞 / Current word
     * @param {IWord} nextword - 下一個詞 / Next word
     * @returns {true | null} 可合併返回 true，否則返回 null / Returns true if mergeable, null otherwise
     */
    isMergeable(word, nextword) {
        if (word && nextword) {
            let nw = word.w + nextword.w;
            /**
             * 不合併存在於 BLACKLIST 內的字詞
             * Do not merge words that exist in BLACKLIST
             */
            if (!this.isBlackList(nw)) {
                return true;
                /*
                return {
                    word,
                    nextword,
                    nw,
                    bool: true,
                }
                */
            }
        }
        return null;
    }
    /**
     * 驗證未知新詞是否可作為人名
     * Validate Unknown New Word as Name
     *
     * 只有新詞屬於人名或未知詞時才會合併。
     * 此方法用於過濾掉已有明確詞性且非人名的詞組。
     *
     * Only merges when the new word is a name or unknown word.
     * This method filters out phrases that already have
     * a clear POS tag and are not names.
     *
     * @template W - 詞的類型，可以是字串或字串陣列 / Word type, can be string or string array
     * @param {W} ws - 詞或詞陣列 / Word or word array
     * @param {Function} [cb] - 回調函數，可自訂處理邏輯 / Callback function for custom processing
     * @returns {IWord | boolean | void} 驗證結果 / Validation result
     */
    validUnknownNewWord(ws, cb) {
        var _a;
        let nw = typeof ws === 'string' ? ws : ws.join('');
        let ew = this._TABLE[nw];
        if (!(ew === null || ew === void 0 ? void 0 : ew.p) || ew.p & this._POSTAG.A_NR) {
            let ret = (_a = cb === null || cb === void 0 ? void 0 : cb(nw, ew, ws)) !== null && _a !== void 0 ? _a : true;
            if (ret) {
                return typeof ret === 'object' ? ret : (ew !== null && ew !== void 0 ? ew : true);
            }
        }
    }
    /**
     * 判斷是否為姓氏
     * Check if Surname
     *
     * 檢查給定的字是否為中文姓氏。
     * 包含單字姓氏（如：王、李）和複姓（如：歐陽、司馬）。
     *
     * Checks if the given character is a Chinese surname.
     * Includes single-character surnames (e.g., 王, 李) and
     * compound surnames (e.g., 歐陽, 司馬).
     *
     * @param {string} w - 待檢查的字 / Character to check
     * @returns {boolean} 是否為姓氏 / Whether it's a surname
     */
    isFamilyName(w) {
        return w in CHS_NAMES_1.FAMILY_NAME_1 || w in CHS_NAMES_1.FAMILY_NAME_2;
    }
    /**
     * 判斷是否為雙字名
     * Check if Double-Character Given Name
     *
     * 檢查兩個字是否構成有效的雙字名。
     * 使用預定義的雙字名首字和次字對照表進行驗證。
     *
     * Checks if two characters form a valid double-character given name.
     * Uses predefined lookup tables for first and second characters.
     *
     * @param {string} w1 - 名的第一個字 / First character of given name
     * @param {string} w2 - 名的第二個字 / Second character of given name
     * @returns {boolean} 是否為雙字名 / Whether it's a double-character name
     */
    isDoubleName(w1, w2) {
        return w1 in CHS_NAMES_1.DOUBLE_NAME_1 && w2 in CHS_NAMES_1.DOUBLE_NAME_2;
    }
    /**
     * 檢查是否為可重複的單字名疊字
     * Check if Repeatable Single-Character Name
     *
     * 判斷是否為可重複的單字名疊字形式（如「明明」、「麗麗」）。
     * 某些單字名可以疊字使用，某些則不行。
     *
     * Determines if it's a repeatable single-character name in reduplicated form
     * (e.g., "明明", "麗麗").
     * Some single-character names can be reduplicated, others cannot.
     *
     * @param {string} w1 - 第一個字 / First character
     * @param {string} w2 - 第二個字 / Second character
     * @returns {boolean} 是否為可重複的單字名疊字 / Whether it's a repeatable single-character name
     */
    isSingleNameRepeat(w1, w2) {
        return this.isSingleNameNoRepeat(w1) && this.isSingleName(w1) && w2 === w1;
    }
    /**
     * 判斷是否為單字名
     * Check if Single-Character Given Name
     *
     * 檢查給定的字是否可作為單字名使用。
     *
     * Checks if the given character can be used as a single-character given name.
     *
     * @param {string} w1 - 待檢查的字 / Character to check
     * @returns {boolean} 是否為單字名 / Whether it's a single-character name
     */
    isSingleName(w1) {
        return w1 in CHS_NAMES_1.SINGLE_NAME;
    }
    /**
     * 判斷是否為不可重複的單字名
     * Check if Non-Repeatable Single-Character Name
     *
     * 檢查給定的字是否為不可重複的單字名。
     * 這些字作為名字時不能以疊字形式出現。
     *
     * Checks if the given character is a non-repeatable single-character name.
     * These characters cannot appear in reduplicated form when used as names.
     *
     * @param {string} w1 - 待檢查的字 / Character to check
     * @returns {boolean} 是否為不可重複的單字名 / Whether it's a non-repeatable single-character name
     */
    isSingleNameNoRepeat(w1) {
        return w1 in CHS_NAMES_1.SINGLE_NAME_NO_REPEAT;
    }
    /**
     * 判斷是否為有效的名字組合
     * Check if Valid Given Name Combination
     *
     * 檢查兩個字是否構成有效的名字（單字名疊字或雙字名）。
     *
     * Checks if two characters form a valid given name
     * (reduplicated single-character name or double-character name).
     *
     * @param {string} w1 - 第一個字 / First character
     * @param {string} w2 - 第二個字 / Second character
     * @returns {boolean} 是否為有效的名字組合 / Whether it's a valid given name combination
     */
    isFirstName(w1, w2) {
        return this.isSingleNameRepeat(w1, w2)
            || this.isDoubleName(w1, w2);
    }
    /**
     * 對可能是人名的單詞進行優化
     * Optimize Potential Name Words
     *
     * 使用兩遍掃描策略識別與合併中文人名：
     *
     * **第一遍掃描**：處理複雜情況
     * - 三字人名（姓 + 雙字名）
     * - 帶前綴的稱呼（小王、老李）
     * - 姓 + 已識別人名
     * - 未識別詞的名組合
     * - 無歧義的姓 + 名組合
     *
     * **第二遍掃描**：處理簡單情況
     * - 姓 + 單字名
     *
     * Uses a two-pass scanning strategy to identify and merge Chinese names:
     *
     * **First Pass**: Handles complex cases
     * - Three-character names (surname + double-character given name)
     * - Prefixed titles (小王, 老李)
     * - Surname + already identified name
     * - Unrecognized name combinations
     * - Unambiguous surname + given name combinations
     *
     * **Second Pass**: Handles simple cases
     * - Surname + single-character given name
     *
     * @override
     * @param {IWord[]} words - 詞語陣列 / Word array
     * @returns {IWord[]} 優化後的詞語陣列 / Optimized word array
     */
    doOptimize(words) {
        var _a, _b;
        //debug(words);
        const POSTAG = this._POSTAG;
        let i = 0;
        /* 第一遍掃描 / First pass scan */
        while (i < words.length) {
            let word = words[i];
            let nextword = words[i + 1];
            // 檢查是否可合併且為有效的新詞
            // Check if mergeable and valid new word
            if (this.isMergeable(word, nextword) && this.validUnknownNewWord(word.w + nextword.w)) {
                let nw = word.w + nextword.w;
                let nextword2 = words[i + 2];
                // 三字人名：姓 + 雙字名（如：王小明）
                // Three-character name: surname + double-character given name (e.g., 王小明)
                if (((_a = nextword2 === null || nextword2 === void 0 ? void 0 : nextword2.w) === null || _a === void 0 ? void 0 : _a.length) <= 2 && word.w !== '于' && !(nextword2.p & this._POSTAG.D_P) && this.isFamilyName(word.w) && this.isFirstName(nextword.w, nextword2.w) && !this.isBlackList(nw + nextword2.w)) {
                    this.sliceToken(words, i, 3, {
                        w: nw + nextword2.w,
                        p: POSTAG.A_NR,
                        m: [word, nextword, nextword2],
                    }, undefined, {
                        [this.name]: 7,
                    });
                    i += 2;
                    continue;
                }
                //debug(nextword);
                // 如果為 "小|老" + 姓
                // If pattern is "小|老" + surname
                if ((word.w === '小' || word.w === '老')
                    && this.isFamilyName(nextword.w)) {
                    /*
                    words.splice(i, 2, {
                        w: word.w + nextword.w,
                        p: POSTAG.A_NR,
                        m: [word, nextword],
                    });
                    */
                    this.sliceToken(words, i, 2, {
                        w: nw,
                        p: POSTAG.A_NR,
                        m: [word, nextword],
                    }, undefined, {
                        [this.name]: 1,
                    });
                    i++;
                    continue;
                }
                // 如果是 姓 + 名（2字以內）
                // If pattern is surname + given name (2 characters or less)
                if (this.isFamilyName(word.w)
                    && ((nextword.p & POSTAG.A_NR) > 0 && nextword.w.length <= 2)) {
                    /*
                    words.splice(i, 2, {
                        w: word.w + nextword.w,
                        p: POSTAG.A_NR,
                        m: [word, nextword],
                    });
                    */
                    this.sliceToken(words, i, 2, {
                        w: nw,
                        p: POSTAG.A_NR,
                        m: [word, nextword],
                    }, undefined, {
                        [this.name]: 2,
                    });
                    i++;
                    continue;
                }
                // 如果相鄰兩個均為單字且至少有一個字是未識別的，則嘗試判斷其是否為人名
                // If both adjacent words are single characters and at least one is unrecognized,
                // try to determine if they form a name
                if (!word.p || !nextword.p) {
                    if (this.isFirstName(word.w, nextword.w)) {
                        /*
                        words.splice(i, 2, {
                            w: word.w + nextword.w,
                            p: POSTAG.A_NR,
                            m: [word, nextword],
                        });
                        */
                        this.sliceToken(words, i, 2, {
                            w: nw,
                            p: POSTAG.A_NR,
                            m: [word, nextword],
                        }, undefined, {
                            [this.name]: 3,
                        });
                        // 如果上一個單詞可能是一個姓，則合併
                        // If the previous word might be a surname, merge it
                        let preword = words[i - 1];
                        if (((_b = preword === null || preword === void 0 ? void 0 : preword.w) === null || _b === void 0 ? void 0 : _b.length)
                            && this.isFamilyName(preword.w)
                            && this.isMergeable2(preword.w, word.w, nextword.w)) {
                            let nw = preword.w + word.w + nextword.w;
                            /*
                            words.splice(i - 1, 2, {
                                w: preword.w + word.w + nextword.w,
                                p: POSTAG.A_NR,
                                m: [preword, word, nextword],
                            });
                            */
                            this.sliceToken(words, i - 1, 2, {
                                w: nw,
                                p: POSTAG.A_NR,
                                m: [preword, word, nextword],
                            }, undefined, {
                                [this.name]: 4,
                            });
                        }
                        else {
                            i++;
                        }
                        continue;
                    }
                }
                // 如果為無歧義的姓 + 名（2字以內）且其中一個為未識別詞
                // If unambiguous surname + given name (2 chars or less) and one is unrecognized
                if (this.isFamilyName(word.w)
                    && (!word.p || !nextword.p)
                    /**
                     * 防止將標點符號當作名字的 BUG
                     * Prevents bug where punctuation is treated as name
                     */
                    && !(word.p & POSTAG.D_W || nextword.p & POSTAG.D_W)) {
                    //debug(word, nextword);
                    /*
                    words.splice(i, 2, {
                        w: word.w + nextword.w,
                        p: POSTAG.A_NR,
                        m: [word, nextword],
                    });
                    */
                    this.sliceToken(words, i, 2, {
                        w: nw,
                        p: POSTAG.A_NR,
                        m: [word, nextword],
                    }, undefined, {
                        [this.name]: 5,
                    });
                }
            }
            // 移到下一個單詞
            // Move to next word
            i++;
        }
        /* 第二遍掃描 / Second pass scan */
        i = 0;
        while (i < words.length) {
            let word = words[i];
            let nextword = words[i + 1];
            if (this.isMergeable(word, nextword)) {
                // 如果為 姓 + 單字名
                // If pattern is surname + single-character given name
                if (this.isFamilyName(word.w) && this.isSingleName(nextword.w)) {
                    /*
                    words.splice(i, 2, {
                        w: word.w + nextword.w,
                        p: POSTAG.A_NR,
                        m: [word, nextword],
                    });
                    */
                    let nw = word.w + nextword.w;
                    let ew = this._TABLE[nw];
                    /**
                     * 更改為只有新詞屬於人名或未知詞時才會合併
                     * Changed to only merge when new word is a name or unknown word
                     */
                    if (!(ew === null || ew === void 0 ? void 0 : ew.p) || ew.p & POSTAG.A_NR) {
                        this.sliceToken(words, i, 2, {
                            w: nw,
                            p: POSTAG.A_NR,
                            m: [word, nextword],
                        }, undefined, {
                            [this.name]: 6,
                            exists_word: ew,
                        });
                        i++;
                        continue;
                    }
                }
            }
            // 移到下一個單詞
            // Move to next word
            i++;
        }
        return words;
    }
}
exports.ChsNameOptimizer = ChsNameOptimizer;
/**
 * 模組初始化函數
 * Module Initialization Function
 *
 * 綁定至 ChsNameOptimizer 類別的靜態 init 方法。
 * Binds to the static init method of ChsNameOptimizer class.
 */
exports.init = ChsNameOptimizer.init.bind(ChsNameOptimizer);
/**
 * 模組類型
 * Module Type
 *
 * 繼承自 SubSModuleOptimizer，值為 'optimizer'。
 * Inherited from SubSModuleOptimizer, value is 'optimizer'.
 */
exports.type = ChsNameOptimizer.type;
exports.default = ChsNameOptimizer;
//# sourceMappingURL=ChsNameOptimizer.js.map