/**
 * 外文字元優化模組
 * Foreign Character Optimizer Module
 *
 * Created by user on 2018/8/18/018.
 */
import { SubSModuleOptimizer } from '../mod';
import { IDICT, IWord } from '../Segment';
import { IWordDebug } from '../util';
/**
 * 外文字元優化器
 * Foreign Character Optimizer
 *
 * 掃描分詞結果，將連續的外文字元（如英文單詞）合併。
 * 主要功能：
 * - 檢查相鄰的外文字元是否在字典中存在組合詞
 * - 如果存在則合併為一個詞並更新詞性標記
 *
 * Scans segmentation results and merges consecutive foreign characters (like English words).
 * Main features:
 * - Check if adjacent foreign characters have combined words in dictionary
 * - If exists, merge into one word and update POS tag
 */
export declare class ForeignOptimizer extends SubSModuleOptimizer {
    /**
     * 模組名稱
     * Module Name
     *
     * @override
     */
    name: string;
    /**
     * 字典查找表
     * Dictionary Lookup Table
     *
     * 用於查找組合詞的詞性和權重資訊。
     * Used to lookup POS and weight information for combined words.
     *
     * @override
     */
    protected _TABLE: IDICT<IWord>;
    /**
     * 初始化快取
     * Initialize Cache
     *
     * 載入字典表和詞性標記定義。
     * Loads dictionary table and POS tag definitions.
     *
     * @override
     */
    _cache(): void;
    /**
     * 執行外文字元優化
     * Perform Foreign Character Optimization
     *
     * 掃描詞語陣列，檢查相鄰的外文字元是否可以合併。
     * 處理邏輯：
     * - 找到外文字元（詞性為 A_NX）
     * - 檢查與下一個詞的組合是否存在於字典中
     * - 如果存在則合併並更新詞性
     *
     * Scans word array and checks if adjacent foreign characters can be merged.
     * Processing logic:
     * - Find foreign characters (POS is A_NX)
     * - Check if combination with next word exists in dictionary
     * - If exists, merge and update POS
     *
     * @override
     * @template T - 詞語類型 / Word type
     * @param {T[]} words - 詞語陣列 / Word array
     * @returns {T[]} 優化後的詞語陣列 / Optimized word array
     */
    doOptimize<T extends IWordDebug>(words: T[]): T[];
}
export declare const init: typeof ForeignOptimizer.init;
export declare const type = "optimizer";
export default ForeignOptimizer;
