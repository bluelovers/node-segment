/**
 * 模組列表處理模組
 * Module List Processing Module
 *
 * 根據選項將模組分類為啟用與停用兩組。
 * Categorizes modules into enabled and disabled groups based on options.
 */
import { IOptionsDoSegment } from '../types';
import { ISubTokenizer } from '../../mod/Tokenizer';
import { ISubOptimizer } from '../../mod/Optimizer';
import { Segment } from '../../Segment';
/**
 * 列出啟用與停用的模組
 * List Enabled and Disabled Modules
 *
 * 根據 disableModules 選項將已載入的模組分類為啟用與停用兩組。
 * Categorizes loaded modules into enabled and disabled groups based on the disableModules option.
 *
 * @param {Segment["modules"]} modules - 模組集合 / Module collection
 * @param {IOptionsDoSegment} options - 分詞選項 / Segmentation options
 * @returns {Object} 包含 enable 和 disable 屬性的物件 / Object with enable and disable properties
 *
 * @example
 * ```typescript
 * const result = listModules(segment.modules, {
 *   disableModules: ['DatetimeOptimizer']
 * });
 *
 * console.log(result.enable.tokenizer);  // 啟用的分詞模組
 * console.log(result.disable.optimizer); // 停用的優化模組
 * ```
 */
export declare function listModules(modules: Segment["modules"], options: IOptionsDoSegment): {
    enable: {
        tokenizer: ISubTokenizer[];
        optimizer: ISubOptimizer[];
    };
    disable: {
        tokenizer: ISubTokenizer[];
        optimizer: ISubOptimizer[];
    };
};
