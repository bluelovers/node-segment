'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.type = exports.init = exports.SingleTokenizer = void 0;
const tslib_1 = require("tslib");
const mod_1 = require("../mod");
const uni_string_1 = tslib_1.__importDefault(require("uni-string"));
/**
 * 單字切分模組
 * Single Character Tokenizer Module
 *
 * 此模組不包含在模組列表內，需要手動指定。
 * 用於將未識別的詞語切分為單個字元。
 *
 * This module is not included in the module list and needs to be manually specified.
 * Used to split unrecognized words into individual characters.
 *
 * @author 老雷<leizongmin@gmail.com>
 */
class SingleTokenizer extends mod_1.SubSModuleTokenizer {
    /**
     * 對未識別的單詞進行分詞
     * Split Unrecognized Words
     *
     * 遍歷單詞陣列，將未識別的詞語（詞性為空或 0）切分為單字。
     * 已識別的詞語保持不變。
     *
     * Iterates through word array and splits unrecognized words (POS is empty or 0) into single characters.
     * Recognized words remain unchanged.
     *
     * @param {IWord[]} words - 單詞陣列 / Word array
     * @returns {IWord[]} 切分後的單詞陣列 / Split word array
     */
    split(words) {
        const POSTAG = this.segment.POSTAG;
        let ret = [];
        for (let i = 0, word; word = words[i]; i++) {
            // 如果詞性已定義且不為 0，保留原詞
            // If POS is defined and not 0, keep original word
            if (typeof word.p === 'undefined' || word.p) {
                ret.push(word);
            }
            else {
                // 僅對未識別的詞進行匹配
                // Only split unrecognized words
                ret = ret.concat(this.splitSingle(word.w));
            }
        }
        return ret;
    }
    /**
     * 單字切分
     * Split into Single Characters
     *
     * 將文本切分為單個字元，每個字元標記為未知詞性（UNK）。
     * 使用 uni-string 庫處理 Unicode 字元邊界。
     *
     * Splits text into individual characters, each marked with unknown POS (UNK).
     * Uses uni-string library to handle Unicode character boundaries.
     *
     * @param {string} text - 要切分的文本 / Text to split
     * @param {number} [cur] - 開始位置 / Start position
     * @returns {IWord[]} 單字陣列 / Single character array
     */
    splitSingle(text, cur) {
        const POSTAG = this.segment.POSTAG;
        // 處理起始位置參數 / Handle start position parameter
        if (isNaN(cur))
            cur = 0;
        if (cur > 0) {
            text = text.slice(cur);
        }
        let ret = [];
        // 使用 uni-string 正確處理 Unicode 字元分割
        // Use uni-string to correctly handle Unicode character splitting
        uni_string_1.default
            .split(text, '')
            .forEach(function (w, i) {
            ret.push({
                // 單字 / Single character
                w,
                // 標記為未知詞性 / Mark as unknown POS
                p: POSTAG.UNK,
            });
        });
        return ret;
    }
}
exports.SingleTokenizer = SingleTokenizer;
exports.init = SingleTokenizer.init.bind(SingleTokenizer);
exports.type = SingleTokenizer.type;
exports.default = SingleTokenizer;
//# sourceMappingURL=SingleTokenizer.js.map