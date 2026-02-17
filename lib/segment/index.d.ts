/**
 * 分詞器基礎類別模組
 * Segmenter Base Class Module
 *
 * 匯出 SegmentBase 類別作為分詞器的基礎實作。
 * Exports the SegmentBase class as the base implementation for segmenters.
 */
import { SegmentCore } from './core';
/**
 * 分詞器基礎類別
 * Segmenter Base Class
 *
 * 繼承自 SegmentCore，提供分詞器的基礎功能。
 * 可在此類別中擴充額外的功能或覆寫現有方法。
 *
 * Inherits from SegmentCore, providing base functionality for segmenters.
 * Additional features can be extended or existing methods can be overridden in this class.
 *
 * @example
 * ```typescript
 * import SegmentBase from './index';
 *
 * const segment = new SegmentBase();
 * segment.useDefault();
 *
 * const result = segment.doSegment('這是一個測試句子');
 * console.log(result);
 * ```
 */
export declare class SegmentBase extends SegmentCore {
}
export default SegmentBase;
