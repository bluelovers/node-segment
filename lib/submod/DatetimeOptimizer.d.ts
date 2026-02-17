/**
 * 日期時間優化模組
 * Datetime Optimizer Module
 *
 * 此模組負責將相鄰的數字與日期單位合併為完整的日期時間詞組。
 * 例如：「2005年」、「12月25日」、「10時30分」等。
 *
 * This module is responsible for merging adjacent numbers and date units
 * into complete datetime phrases.
 * For example: "2005年", "12月25日", "10時30分", etc.
 *
 * @author 老雷<leizongmin@gmail.com>
 */
import Segment, { IWord } from '../Segment';
/**
 * 模組類型
 * Module Type
 *
 * 標識此模組為優化器類型，用於分詞系統的模組識別與調度。
 * Identifies this module as an optimizer type, used for module
 * identification and dispatching in the segmentation system.
 */
export declare const type = "optimizer";
/**
 * 分詞器實例
 * Segmenter Instance
 *
 * 儲存分詞器實例的引用，用於獲取字典和詞性標記等資源。
 * Stores a reference to the segmenter instance for accessing
 * dictionaries and POS (Part-of-Speech) tags.
 */
export declare let segment: Segment;
/**
 * 模組初始化
 * Module Initialization
 *
 * 初始化日期時間優化模組，設定分詞器實例引用。
 * 此函數由分詞系統在載入模組時自動調用。
 *
 * Initializes the datetime optimizer module and sets the segmenter instance reference.
 * This function is automatically called by the segmentation system when loading the module.
 *
 * @param {Segment} _segment - 分詞器實例 / Segmenter instance
 */
export declare function init(_segment: any): void;
/**
 * 日期時間優化
 * Datetime Optimization
 *
 * 掃描詞語陣列，將相鄰的「數字 + 日期單位」組合合併為單一日期時間詞。
 * 採用貪婪匹配策略，盡可能合併連續的日期時間描述。
 *
 * Scans the word array and merges adjacent "number + date unit" combinations
 * into single datetime words. Uses greedy matching strategy to merge
 * as many consecutive datetime descriptions as possible.
 *
 * @param {IWord[]} words - 詞語陣列 / Word array
 * @param {boolean} [is_not_first] - 是否由管理器調用 / Whether called by manager
 * @returns {IWord[]} 優化後的詞語陣列 / Optimized word array
 */
export declare function doOptimize(words: IWord[], is_not_first?: boolean): Segment.IWord[];
