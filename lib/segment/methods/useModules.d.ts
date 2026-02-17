/**
 * 模組載入模組
 * Module Loading Module
 *
 * 提供分詞模組的載入與註冊功能。
 * Provides loading and registration functionality for segmentation modules.
 */
import SegmentCore from '../core';
import { ISubOptimizer } from '../../mod/Optimizer';
import { ISubTokenizer } from '../../mod/Tokenizer';
/**
 * 檢查模組是否應被忽略
 * Check if Module Should Be Ignored
 *
 * 判斷模組是否在停用列表中。
 * Determines if the module is in the disabled list.
 *
 * @template T - 分詞器類型 / Segmenter type
 * @param {T} me - 分詞器實例 / Segmenter instance
 * @param {ISubOptimizer | ISubTokenizer | any} mod - 模組實例 / Module instance
 * @param {...any} argv - 其他參數 / Additional arguments
 * @returns {boolean} 是否應忽略 / Whether should be ignored
 */
export declare function _isIgnoreModules<T extends SegmentCore>(me: T, mod: ISubOptimizer | ISubTokenizer | any, ...argv: any[]): boolean;
/**
 * 輸出模組忽略警告
 * Output Module Ignore Warning
 *
 * 當嘗試載入已停用的模組時輸出警告訊息。
 * Outputs a warning message when attempting to load a disabled module.
 *
 * @param {any} mod - 被忽略的模組 / Ignored module
 */
export declare function _warnIgnoreModules(mod: any): void;
/**
 * 載入模組
 * Load Module
 *
 * 初始化並註冊分詞模組到分詞器中。
 * Initializes and registers a segmentation module to the segmenter.
 *
 * @template T - 分詞器類型 / Segmenter type
 * @param {T} me - 分詞器實例 / Segmenter instance
 * @param {ISubOptimizer | ISubTokenizer | any} mod - 模組實例 / Module instance
 * @param {...any} argv - 其他參數 / Additional arguments
 * @returns {T} 分詞器實例 / Segmenter instance
 * @throws {TypeError} 當模組類型無效時拋出錯誤 / Throws error when module type is invalid
 */
export declare function useModules<T>(me: T, mod: ISubOptimizer | ISubTokenizer | any, ...argv: any[]): T;
