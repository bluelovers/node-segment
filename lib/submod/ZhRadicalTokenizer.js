'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.type = exports.init = exports.ZhRadicalTokenizer = void 0;
const mod_1 = require("../mod");
/**
 * 中文字部分詞器
 * Chinese Radical Tokenizer
 *
 * 此模組目前無任何用處與效果。
 * This module currently has no use or effect.
 *
 * @todo 部首處理 / Radical processing
 */
class ZhRadicalTokenizer extends mod_1.SubSModuleTokenizer {
    constructor() {
        super(...arguments);
        /**
         * 模組名稱
         * Module Name
         *
         * @override
         */
        this.name = 'ZhRadicalTokenizer';
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
     * 使用中文部首切分方法處理詞語。
     * Processes words using Chinese radical splitting method.
     *
     * @param {IWord[]} words - 單詞陣列 / Word array
     * @returns {IWord[]} 分詞後的單詞陣列 / Tokenized word array
     */
    split(words) {
        return this._splitUnset(words, this.splitZhRadical);
    }
    /**
     * 中文部首切分
     * Split Chinese Radical
     *
     * 識別並切分文本中的中文部首字元。
     * 目標字元：U+4136（㐶）、U+4137（㐷）
     *
     * Identifies and splits Chinese radical characters in text.
     * Target characters: U+4136 (㐶), U+4137 (㐷)
     *
     * @param {string} text - 要切分的文本 / Text to split
     * @param {number} [cur] - 開始位置 / Start position
     * @returns {IWord[] | null} 切分後的詞語陣列，若無匹配則返回 null / Split word array, or null if no match
     */
    splitZhRadical(text, cur) {
        let ret = [];
        let self = this;
        // 匹配目標部首字元的正則表達式
        // Regular expression for matching target radical characters
        // U+4136（㐶）、U+4137（㐷）為康熙部首擴展字元
        // U+4136 (㐶), U+4137 (㐷) are Kangxi radical extension characters
        let _r = /[\u4136\u4137]/u;
        // 如果沒有匹配的部首字元，返回 null
        // If no matching radical characters, return null
        if (!_r.test(text)) {
            return null;
        }
        // 按部首字元分割文本
        // Split text by radical characters
        text
            .split(/([\u4136\u4137]+)/u)
            .forEach(function (w, i) {
            if (w !== '') {
                if (_r.test(w)) {
                    // 部首字元，添加除錯標記
                    // Radical character, add debug tag
                    ret.push(self.debugToken({
                        w,
                    }, {
                        [self.name]: true,
                    }, true));
                }
                else {
                    // 非部首字元，保持原樣
                    // Non-radical character, keep as is
                    ret.push({
                        w,
                    });
                }
            }
        });
        return ret.length ? ret : null;
    }
}
exports.ZhRadicalTokenizer = ZhRadicalTokenizer;
exports.init = ZhRadicalTokenizer.init.bind(ZhRadicalTokenizer);
exports.type = ZhRadicalTokenizer.type;
exports.default = ZhRadicalTokenizer;
//# sourceMappingURL=ZhRadicalTokenizer.js.map