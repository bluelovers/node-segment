'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.type = exports.init = exports.ZhuyinTokenizer = void 0;
const mod_1 = require("../mod");
/**
 * 注音符號分詞器
 * Zhuyin (Bopomofo) Tokenizer
 *
 * 用於識別和處理文本中的注音符號（ㄅㄆㄇㄈ）。
 * 注音符號是台灣使用的中文注音系統，又稱為 Bopomofo。
 *
 * Used to identify and process Zhuyin symbols (ㄅㄆㄇㄈ) in text.
 * Zhuyin is the Chinese phonetic system used in Taiwan, also known as Bopomofo.
 *
 * Unicode 範圍 / Unicode Ranges:
 * - U+3105-U+312E: 注音符號（基本區）/ Zhuyin symbols (basic)
 * - U+31A0-U+31BA: 注音擴展符號 / Zhuyin extension symbols
 */
class ZhuyinTokenizer extends mod_1.SubSModuleTokenizer {
    constructor() {
        super(...arguments);
        /**
         * 模組名稱
         * Module Name
         *
         * @override
         */
        this.name = 'ZhuyinTokenizer';
    }
    /**
     * 初始化快取
     * Initialize Cache
     *
     * @override
     * @param {...any[]} argv - 參數 / Arguments
     */
    _cache(...argv) {
        super._cache(...argv);
    }
    /**
     * 對單詞進行分詞
     * Split Words
     *
     * 使用注音符號切分方法處理詞語。
     * Processes words using Zhuyin splitting method.
     *
     * @param {IWord[]} words - 單詞陣列 / Word array
     * @returns {IWord[]} 分詞後的單詞陣列 / Tokenized word array
     */
    split(words) {
        return this._splitUnset(words, this.splitZhuyin);
    }
    /**
     * 注音符號切分
     * Split Zhuyin Symbols
     *
     * 識別並切分文本中的注音符號。
     * 匹配範圍：
     * - U+3105-U+312E: 基本注音符號（ㄅ-ㄦ）
     * - U+31A0-U+31BA: 擴展注音符號（ㆠ-ㆺ）
     *
     * Identifies and splits Zhuyin symbols in text.
     * Matching ranges:
     * - U+3105-U+312E: Basic Zhuyin symbols (ㄅ-ㄦ)
     * - U+31A0-U+31BA: Extended Zhuyin symbols (ㆠ-ㆺ)
     *
     * @param {string} text - 要切分的文本 / Text to split
     * @param {number} [cur] - 開始位置 / Start position
     * @returns {IWord[] | null} 切分後的詞語陣列，若無匹配則返回 null / Split word array, or null if no match
     */
    splitZhuyin(text, cur) {
        let ret = [];
        let self = this;
        // 匹配注音符號的正則表達式
        // Regular expression for matching Zhuyin symbols
        // U+3105-U+312E: 基本注音符號 / Basic Zhuyin symbols
        // U+31A0-U+31BA: 擴展注音符號（用於台語等方言）/ Extended Zhuyin symbols (for Taiwanese, etc.)
        let _r = /[\u31A0-\u31BA\u3105-\u312E]/u;
        // 如果沒有匹配的注音符號，返回 null
        // If no matching Zhuyin symbols, return null
        if (!_r.test(text)) {
            return null;
        }
        // 按注音符號分割文本
        // Split text by Zhuyin symbols
        text
            .split(/([\u31A0-\u31BA\u3105-\u312E]+)/u)
            .forEach(function (w, i) {
            if (w !== '') {
                if (_r.test(w)) {
                    // 注音符號，添加除錯標記
                    // Zhuyin symbol, add debug tag
                    ret.push(self.debugToken({
                        w,
                    }, {
                        [self.name]: true,
                    }, true));
                }
                else {
                    // 非注音符號，保持原樣
                    // Non-Zhuyin symbol, keep as is
                    ret.push({
                        w,
                    });
                }
            }
        });
        return ret.length ? ret : null;
    }
}
exports.ZhuyinTokenizer = ZhuyinTokenizer;
exports.init = ZhuyinTokenizer.init.bind(ZhuyinTokenizer);
exports.type = ZhuyinTokenizer.type;
exports.default = ZhuyinTokenizer;
//# sourceMappingURL=ZhuyinTokenizer.js.map