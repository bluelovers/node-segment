import { ISubTokenizerCreate, SubSModuleTokenizer } from '../mod';
import { IDICT, IDICT2, IWord } from '../Segment';
/**
 * 預設最大區塊數量
 * Default Maximum Chunk Count
 *
 * 防止因無分段導致分析過久甚至超過處理負荷的預設上限值。
 * Default upper limit to prevent analysis from taking too long or exceeding processing capacity due to lack of segmentation.
 */
export declare const DEFAULT_MAX_CHUNK_COUNT = 40;
/**
 * 預設最大區塊數量最小值
 * Default Maximum Chunk Count Minimum
 *
 * 用於限制 MAX_CHUNK_COUNT 遞減時的最小值。
 * Used to limit the minimum value when MAX_CHUNK_COUNT decreases.
 */
export declare const DEFAULT_MAX_CHUNK_COUNT_MIN = 30;
/**
 * 字典識別分詞器
 * Dictionary Tokenizer
 *
 * 使用字典匹配方式進行分詞的核心模組。
 * 採用類似 MMSG 的分詞演算法，找出所有分詞可能並進行評估排序。
 *
 * Core module for dictionary-based segmentation.
 * Uses MMSG-like segmentation algorithm to find all possible segmentations and evaluate them.
 *
 * @author 老雷<leizongmin@gmail.com>
 */
export declare class DictTokenizer extends SubSModuleTokenizer {
    /**
     * 最大區塊數量
     * Maximum Chunk Count
     *
     * 防止因無分段導致分析過久甚至超過處理負荷。
     * 越高越精準但是處理時間會加倍成長甚至超過記憶體能處理的程度。
     * 數字越小越快。
     *
     * Prevents analysis from taking too long or exceeding processing capacity due to lack of segmentation.
     * Higher values are more accurate but processing time grows exponentially and may exceed memory capacity.
     * Lower values are faster.
     *
     * FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory
     *
     * @type {number}
     */
    MAX_CHUNK_COUNT: number;
    /**
     * 最大區塊數量最小值
     * Maximum Chunk Count Minimum
     *
     * 追加新模式使 MAX_CHUNK_COUNT 遞減來防止無分段長段落的總處理次數過高。
     * 由 DEFAULT_MAX_CHUNK_COUNT_MIN 來限制最小值。
     *
     * When adding new mode, MAX_CHUNK_COUNT decreases to prevent excessive total processing count for long unsegmented paragraphs.
     * Limited by DEFAULT_MAX_CHUNK_COUNT_MIN.
     */
    DEFAULT_MAX_CHUNK_COUNT_MIN: number;
    /**
     * 字典表
     * Dictionary Table
     *
     * 儲存單詞及其詞性、頻率等資訊的字典。
     * Dictionary storing words and their part-of-speech, frequency, and other information.
     *
     * @protected
     */
    protected _TABLE: IDICT<IWord>;
    /**
     * 二維字典表
     * Two-dimensional Dictionary Table
     *
     * 根據詞長分類的字典表，用於優化匹配效能。
     * Dictionary table classified by word length for optimized matching performance.
     *
     * @protected
     */
    protected _TABLE2: IDICT2<IWord>;
    /**
     * 快取初始化
     * Cache Initialization
     *
     * 從 Segment 實例取得字典表與詞性標籤的快取引用。
     * 同時根據選項設定最大與最小區塊數量限制。
     *
     * Gets dictionary table and part-of-speech tag cache references from the Segment instance.
     * Also sets maximum and minimum chunk count limits based on options.
     *
     * @override
     * @protected
     */
    _cache(): void;
    /**
     * 對未識別的單詞進行分詞
     * Split Unrecognized Words
     *
     * 遍歷單詞陣列，對未識別的單詞（詞性 p = 0）進行字典匹配。
     * 將匹配結果與已識別的單詞合併返回。
     *
     * Iterates through the word array and performs dictionary matching for unrecognized words (part-of-speech p = 0).
     * Merges matching results with recognized words and returns them.
     *
     * @param {IWord[]} words - 單詞陣列 / Word array
     * @returns {IWord[]} 分詞後的單詞陣列 / Segmented word array
     */
    split(words: IWord[]): IWord[];
    /**
     * 匹配單詞，返回相關資訊
     * Match Words and Return Related Information
     *
     * 從指定位置開始掃描文本，在二維字典表中查找所有可能的單詞匹配。
     * 返回匹配到的單詞資訊陣列，包含單詞內容、位置和頻率。
     *
     * Scans text from the specified position, searching for all possible word matches in the two-dimensional dictionary table.
     * Returns an array of matched word information, including word content, position, and frequency.
     *
     * @protected
     * @param {string} text - 待匹配的文本 / Text to match
     * @param {number} cur - 開始位置 / Starting position
     * @param {IWord} preword - 上一個單詞 / Previous word
     * @returns {IWord[]} 匹配結果陣列，格式為 {w: '單詞', c: 開始位置} / Matched result array, format {w: 'word', c: start position}
     */
    protected matchWord(text: string, cur: number, preword: IWord): IWord[];
    /**
     * 選擇最有可能匹配的單詞
     * Select Most Likely Matched Words
     *
     * 使用類似 MMSG 的分詞演算法評估所有可能的分詞組合。
     * 根據以下幾項指標綜合評估排名：
     * - x：詞數量最少
     * - a：詞平均頻率最大
     * - b：每個詞長度標準差最小
     * - c：未識別詞最少
     * - d：符合語法結構程度（如數詞後跟量詞加分）
     *
     * Uses MMSG-like segmentation algorithm to evaluate all possible segmentation combinations.
     * Comprehensive ranking based on the following indicators:
     * - x: Minimum word count
     * - a: Maximum average word frequency
     * - b: Minimum word length standard deviation
     * - c: Minimum unrecognized words
     * - d: Grammatical structure compliance (e.g., bonus for numeral followed by quantifier)
     *
     * @protected
     * @param {IWord[]} words - 單詞資訊陣列 / Word information array
     * @param {IWord} preword - 上一個單詞 / Previous word
     * @param {string} text - 本節要分詞的文本 / Text to segment in this section
     * @returns {IWord[]} 最佳匹配結果 / Best matched result
     */
    protected filterWord(words: IWord[], preword: IWord, text: string): IWord[];
    /**
     * 評價排名
     * Evaluation Ranking
     *
     * 根據評估指標計算各分詞組合的綜合得分並排名。
     * 選取得分最高的分詞組合作為最佳結果。
     *
     * Calculates comprehensive scores for each segmentation combination based on evaluation indicators and ranks them.
     * Selects the highest-scoring segmentation combination as the best result.
     *
     * @param {Array<IAssessRow>} assess - 評估資料陣列 / Assessment data array
     * @returns {number} 最佳分詞組合的索引 / Index of the best segmentation combination
     */
    getTops(assess: Array<IAssessRow>): number;
    /**
     * 將單詞按照位置排列
     * Arrange Words by Position
     *
     * 將匹配到的單詞依據其起始位置分組。
     * 對於沒有匹配單詞的位置，填補單字詞元以確保所有位置都有對應的詞。
     *
     * Groups matched words by their starting position.
     * For positions without matched words, fills with single-character tokens to ensure all positions have corresponding words.
     *
     * @param {IWord[]} words - 單詞陣列 / Word array
     * @param {string} text - 原始文本 / Original text
     * @returns {{[index: number]: IWord[]}} 按位置分組的單詞表 / Word table grouped by position
     */
    getPosInfo(words: IWord[], text: string): {
        [index: number]: IWord[];
    };
    /**
     * 取所有分支
     * Get All Branches
     *
     * 遞迴生成所有可能的分詞組合（分支）。
     * 使用 MAX_CHUNK_COUNT 限制遞迴深度以防止效能問題。
     * 特殊處理連字（如「啊啊啊...」）以避免組合爆炸。
     *
     * Recursively generates all possible segmentation combinations (branches).
     * Uses MAX_CHUNK_COUNT to limit recursion depth and prevent performance issues.
     * Special handling for repeated characters (e.g., "啊啊啊...") to avoid combinatorial explosion.
     *
     * @param {{[index: number]: IWord[]}} wordpos - 按位置分組的單詞表 / Word table grouped by position
     * @param {number} pos - 當前位置 / Current position
     * @param {string} text - 本節要分詞的文本 / Text to segment in this section
     * @param {number} total_count - 累計處理次數 / Cumulative processing count
     * @param {number} MAX_CHUNK_COUNT - 最大區塊數量限制 / Maximum chunk count limit
     * @returns {IWord[][]} 所有可能的分詞組合 / All possible segmentation combinations
     */
    getChunks(wordpos: {
        [index: number]: IWord[];
    }, pos: number, text?: string, total_count?: number, MAX_CHUNK_COUNT?: number): IWord[][];
}
export declare namespace DictTokenizer {
    /**
     * 評估行資料結構
     * Assessment Row Data Structure
     *
     * 使用類似 MMSG 的分詞演算法，找出所有分詞可能，主要根據以下幾項來評價：
     * Uses MMSG-like segmentation algorithm to find all possible segmentations, mainly evaluated by:
     *
     * - x：詞數量最少 / Minimum word count
     * - a：詞平均頻率最大 / Maximum average word frequency
     * - b：每個詞長度標準差最小 / Minimum word length standard deviation
     * - c：未識別詞最少 / Minimum unrecognized words
     * - d：符合語法結構程度 / Grammatical structure compliance
     *
     * 取以上幾項綜合排名最好的
     * Selects the best comprehensive ranking from the above criteria
     */
    type IAssessRow = {
        /**
         * 詞數量
         * Word Count
         *
         * 詞數量，越小越好
         * Word count, fewer is better
         */
        x: number;
        /**
         * 詞總頻率
         * Total Word Frequency
         *
         * 詞總頻率，越大越好
         * Total word frequency, higher is better
         */
        a: number;
        /**
         * 詞標準差
         * Word Standard Deviation
         *
         * 詞標準差，越小越好。每個詞長度標準差最小。
         * Word standard deviation, smaller is better. Minimum word length standard deviation.
         */
        b: number;
        /**
         * 未識別詞數量
         * Unrecognized Word Count
         *
         * 未識別詞，越小越好
         * Unrecognized words, fewer is better
         */
        c: number;
        /**
         * 語法結構分數
         * Grammatical Structure Score
         *
         * 符合語法結構程度，越大越好。
         * 如兩個連續的動詞減分，數詞後面跟量詞加分。
         *
         * Grammatical structure compliance, higher is better.
         * E.g., penalty for consecutive verbs, bonus for numeral followed by quantifier.
         */
        d: number;
        /**
         * 結算評分（自動計算）
         * Final Score (Auto-calculated)
         *
         * 由 getTops() 方法自動計算的綜合評分
         * Comprehensive score automatically calculated by getTops() method
         */
        score?: number;
        /**
         * 索引位置
         * Index Position
         *
         * 在評估陣列中的索引位置
         * Index position in the assessment array
         */
        readonly index?: number;
    };
}
export import IAssessRow = DictTokenizer.IAssessRow;
export declare const init: ISubTokenizerCreate<DictTokenizer>;
export declare const type = "tokenizer";
export default DictTokenizer;
