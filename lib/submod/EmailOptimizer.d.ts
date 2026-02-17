import { ISubOptimizerCreate, SubSModuleOptimizer } from '../mod';
import { IDICT, IWord } from '../Segment';
/**
 * 郵箱地址中允許出現的字元
 * Characters Allowed in Email Addresses
 *
 * 參考 / Reference: http://www.cs.tut.fi/~jkorpela/rfc/822addr.html
 */
export declare const _EMAILCHAR: string[];
/**
 * 郵箱地址字元查找表
 * Email Address Character Lookup Table
 *
 * 用於快速判斷某個字元是否為郵箱地址允許的字元。
 * Used to quickly determine if a character is allowed in email addresses.
 */
export declare const EMAILCHAR: IDICT<number>;
/**
 * 郵箱地址識別優化模組
 * Email Address Recognition Optimizer Module
 *
 * 掃描分詞結果，將分散的郵箱地址片段合併為完整的郵箱地址。
 * 主要處理流程：
 * 1. 尋找郵箱地址的起始位置（外文字元或數字）
 * 2. 尋找 @ 符號
 * 3. 尋找郵箱地址的結束位置
 * 4. 將片段合併並標記為 URL 類型
 *
 * Scans segmentation results and merges scattered email address fragments
 * into complete email addresses.
 * Main processing flow:
 * 1. Find email address start position (foreign characters or numbers)
 * 2. Find @ symbol
 * 3. Find email address end position
 * 4. Merge fragments and mark as URL type
 *
 * @author 老雷<leizongmin@gmail.com>
 */
export declare class EmailOptimizer extends SubSModuleOptimizer {
    /**
     * 對可能是郵箱地址的單詞進行優化
     * Optimize Words That May Be Email Addresses
     *
     * 掃描單詞陣列，識別並合併郵箱地址片段。
     * 郵箱地址格式：local-part@domain
     *
     * Scans word array to identify and merge email address fragments.
     * Email address format: local-part@domain
     *
     * @param {IWord[]} words - 單詞陣列 / Word array
     * @returns {IWord[]} 優化後的單詞陣列 / Optimized word array
     */
    doOptimize(words: IWord[]): IWord[];
    /**
     * 根據一組單詞生成郵箱地址
     * Generate Email Address from Word Array
     *
     * 將單詞陣列連接成完整的郵箱地址字串。
     * Concatenates word array into a complete email address string.
     *
     * @param {IWord[]} words - 單詞陣列 / Word array
     * @returns {string} 郵箱地址 / Email address
     */
    toEmailAddress(words: IWord[]): string;
}
export declare const init: ISubOptimizerCreate<EmailOptimizer>;
export declare const type = "optimizer";
export default EmailOptimizer;
