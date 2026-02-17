"use strict";
/**
 * 分詞器預設選項模組
 * Segmenter Default Options Module
 *
 * 定義分詞操作的預設配置。
 * Defines default configuration for segmentation operations.
 *
 * Created by user on 2019/6/26.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultOptionsDoSegment = void 0;
/**
 * 分詞操作的預設選項
 * Default Options for Segmentation Operations
 *
 * 此物件定義 doSegment 方法的預設行為。
 * 目前為空物件，表示所有選項預設為關閉。
 *
 * This object defines the default behavior for the doSegment method.
 * Currently an empty object, meaning all options are disabled by default.
 *
 * @example
 * ```typescript
 * // 預設選項可以透過以下方式覆寫
 * // Default options can be overridden as follows:
 * const options = {
 *   ...defaultOptionsDoSegment,
 *   stripPunctuation: true,
 *   stripStopword: true,
 * };
 * ```
 */
exports.defaultOptionsDoSegment = {};
//# sourceMappingURL=defaults.js.map