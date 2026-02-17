"use strict";
/**
 * 分詞選項處理模組
 * Segmentation Options Processing Module
 *
 * 合併分詞操作的選項與預設值。
 * Merges segmentation operation options with defaults.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptionsDoSegment = getOptionsDoSegment;
const defaults_1 = require("../defaults");
/**
 * 取得分詞操作的合併選項
 * Get Merged Options for Segmentation Operation
 *
 * 將傳入的選項與預設選項合併，優先順序為：
 * 1. 傳入的 options（最高優先權）
 * 2. 分詞器的 optionsDoSegment
 * 3. defaultOptionsDoSegment（最低優先權）
 *
 * Merges passed options with default options, priority order:
 * 1. Passed options (highest priority)
 * 2. Segmenter's optionsDoSegment
 * 3. defaultOptionsDoSegment (lowest priority)
 *
 * @template T - 選項類型 / Options type
 * @param {T} options - 傳入的選項 / Passed options
 * @param {any} optionsDoSegment - 分詞器的預設選項 / Segmenter's default options
 * @returns {T} 合併後的選項 / Merged options
 */
function getOptionsDoSegment(options, optionsDoSegment) {
    return Object.assign({}, defaults_1.defaultOptionsDoSegment, optionsDoSegment, options);
}
//# sourceMappingURL=getOptionsDoSegment.js.map