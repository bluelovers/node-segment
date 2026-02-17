/**
 * 标点符号识别模块
 *
 * @author 老雷<leizongmin@gmail.com>
 */
import { SubSModuleTokenizer } from '../mod';
import { IWord } from '../Segment';
/**
 * 標點符號分詞器
 * Punctuation Tokenizer
 *
 * 專門用於識別和處理文本中的標點符號，將其從普通文字中分離出來。
 * 支援多種標點符號的匹配，並將其標記為特殊詞性（D_W）。
 *
 * Specialized for identifying and processing punctuation marks in text,
 * separating them from regular text. Supports various punctuation matching
 * and marks them as special part-of-speech (D_W).
 */
export declare class PunctuationTokenizer extends SubSModuleTokenizer {
    /**
     * 分詞器名稱
     * Tokenizer Name
     *
     * 標識此分詞器模組的名稱，用於調試和日誌記錄。
     * Identifies this tokenizer module name, used for debugging and logging.
     */
    name: string;
    /**
     * 停用詞數組
     * Stopword Array
     *
     * 包含基本停用詞的數組，用於快速匹配常見標點符號。
     * Contains basic stopword array for fast matching of common punctuation marks.
     */
    _STOPWORD: string[];
    /**
     * 停用詞映射表
     * Stopword Mapping Table
     *
     * 一維映射表，將停用詞映射到其出現頻率或權重。
     * One-dimensional mapping table that maps stopwords to their frequency or weight.
     */
    STOPWORD: {
        [key: string]: number;
    };
    /**
     * 二維停用詞映射表
     * Two-dimensional Stopword Mapping Table
     *
     * 根據長度分類的停用詞映射表，優化標點符號匹配效能。
     * Length-classified stopword mapping table for optimized punctuation matching performance.
     */
    STOPWORD2: {
        [key: number]: {
            [key: string]: number;
        };
    };
    /**
     * 對未識別的單詞進行分詞
     * Segment unrecognized words
     *
     * 對於尚未被識別的單詞（word.p <= 0），嘗試識別其中的標點符號並進行分離。
     * 將標點符號標記為 D_W 詞性，保留普通文字部分。
     *
     * For unrecognized words (word.p <= 0), attempts to identify and separate
     * punctuation marks. Marks punctuation as D_W part-of-speech while
     * preserving regular text parts.
     *
     * @param {IWord[]} words - 待分詞的單詞陣列 / Array of words to segment
     * @returns {IWord[]} 分詞後的單詞陣列 / Array of segmented words
     */
    split(words: IWord[]): IWord[];
    /**
     * 匹配包含的標點符號，返回相關資訊
     * Match contained punctuation marks, return related information
     *
     * 從指定位置開始掃描文本，識別並返回所有標點符號及其位置。
     * 使用長度優先策略，先嘗試匹配較長的標點符號，再嘗試較短的。
     *
     * Scans text from specified position, identifies and returns all punctuation
     * marks with their positions. Uses length-first strategy, attempting to
     * match longer punctuation marks first, then shorter ones.
     *
     * @param {string} text - 要掃描的文本 / Text to scan
     * @param {number} [cur] - 開始掃描的位置，預設為 0 / Starting scan position, defaults to 0
     * @returns {IWord[]} 標點符號陣列，格式為 {w: '標點符號', c: 開始位置} / Array of punctuation marks in format {w: 'punctuation', c: start position}
     */
    matchStopword(text: string, cur?: number): IWord[];
}
/**
 * 初始化函式
 * Initialization Function
 *
 * 綁定 PunctuationTokenizer 的初始化方法，用於建立新的實例。
 * Binds the initialization method of PunctuationTokenizer for creating new instances.
 */
export declare const init: typeof PunctuationTokenizer.init;
/**
 * 模組類型
 * Module Type
 *
 * 標識此模組的類型為分詞器 (tokenizer)。
 * Identifies this module type as tokenizer.
 */
export declare const type = "tokenizer";
/**
 * 預設導出
 * Default Export
 *
 * 導出 PunctuationTokenizer 類別，作為此模組的主要實現。
 * Exports the PunctuationTokenizer class as the main implementation of this module.
 */
export default PunctuationTokenizer;
