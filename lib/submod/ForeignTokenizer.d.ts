/**
 * 外文字符、数字识别模块
 *
 * @author 老雷<leizongmin@gmail.com>
 */
import { ISubTokenizerCreate, SubSModuleTokenizer } from '../mod';
import { IWord } from '../Segment';
import { IWordDebugInfo } from '../util/index';
/**
 * 外文字元識別分詞器
 * Foreign Character Tokenizer
 *
 * 專門用於識別和處理文本中的外文字元（如英文、數字、阿拉伯文、俄文、希臘文等），
 * 將其從中文文本中分離出來並進行適當的詞性標註。
 * 支援全形與半形字元的轉換，以及字典查詢匹配。
 *
 * Specialized for identifying and processing foreign characters in text
 * (such as English, numbers, Arabic, Russian, Greek, etc.),
 * separating them from Chinese text and performing appropriate part-of-speech tagging.
 * Supports full-width and half-width character conversion, as well as dictionary lookup matching.
 */
export declare class ForeignTokenizer extends SubSModuleTokenizer {
    /**
     * 分詞器名稱
     * Tokenizer Name
     *
     * 標識此分詞器模組的名稱，用於調試和日誌記錄。
     * Identifies this tokenizer module name, used for debugging and logging.
     */
    name: string;
    /**
     * 分詞用正則表達式（包含中文）
     * Segmentation Regular Expression (Including Chinese)
     *
     * 用於將文本分割為中文和外文部分，包含中文字元的匹配模式。
     * Used to split text into Chinese and foreign parts, including Chinese character matching patterns.
     */
    _REGEXP_SPLIT_1: RegExp;
    /**
     * 分詞用正則表達式（不包含中文的全詞符合）
     * Segmentation Regular Expression (Full Word Match Without Chinese)
     *
     * 用於檢測文本中是否符合外文字元模式，不包含中文字元的匹配。
     * Used to detect if text matches foreign character patterns, without Chinese character matching.
     */
    _REGEXP_SPLIT_2: RegExp;
    /**
     * 快取初始化方法
     * Cache Initialization Method
     *
     * 初始化分詞器所需的正則表達式和字典引用。
     * 構建用於匹配各種外文字元的正則表達式，包括：
     * - 數字（含全形數字）
     * - 英文字母（含全形字母）
     * - 阿拉伯文
     * - 俄文（西里爾字母）
     * - 希臘文
     *
     * Initializes the regular expressions and dictionary references required by the tokenizer.
     * Builds regular expressions for matching various foreign characters, including:
     * - Numbers (including full-width numbers)
     * - English letters (including full-width letters)
     * - Arabic
     * - Russian (Cyrillic)
     * - Greek
     */
    _cache(): void;
    /**
     * 對未識別的單詞進行分詞
     * Segment unrecognized words
     *
     * 對於尚未被識別的單詞，使用外文分詞方法進行處理。
     * 目前預設使用 splitForeign2 方法，提供更精確的外文識別。
     *
     * For unrecognized words, processes them using foreign text segmentation method.
     * Currently defaults to splitForeign2 method for more accurate foreign text recognition.
     *
     * @param {IWord[]} words - 待分詞的單詞陣列 / Array of words to segment
     * @returns {IWord[]} 分詞後的單詞陣列 / Array of segmented words
     */
    split(words: IWord[]): IWord[];
    /**
     * 支援更多外文判定（但可能會降低效率）
     * Support more foreign text recognition (may reduce efficiency)
     *
     * 使用正則表達式將文本分割為多個片段，然後對每個片段進行詞性標註。
     * 避免誤切割包含變音符號的外文，例如 latīna、Русский。
     *
     * Uses regular expressions to split text into multiple segments,
     * then performs part-of-speech tagging on each segment.
     * Avoids incorrect splitting of foreign text with diacritics, e.g., latīna, Русский.
     *
     * @param {string} text - 要分詞的文本 / Text to segment
     * @param {number} [cur] - 開始位置（未使用）/ Starting position (unused)
     * @returns {IWord[] | undefined} 分詞後的單詞陣列，若無結果則返回 undefined / Array of segmented words, or undefined if no results
     */
    splitForeign2(text: string, cur?: number): IWord[];
    /**
     * 匹配包含的英文字元和數字，並分割
     * Match contained English characters and numbers, then split
     *
     * 使用字元類型掃描方法，逐字判斷字元類型（數字、字母、其他），
     * 將連續相同類型的字元組合成單詞。
     * 支援全形字元到半形字元的轉換。
     *
     * Uses character type scanning method, determining character type (number, letter, other)
     * character by character, combining consecutive characters of the same type into words.
     * Supports full-width to half-width character conversion.
     *
     * @param {string} text - 要分詞的文本 / Text to segment
     * @param {number} [cur] - 開始位置，預設為 0 / Starting position, defaults to 0
     * @returns {IWord[]} 分詞後的單詞陣列 / Array of segmented words
     */
    splitForeign(text: string, cur?: number): IWord[];
    /**
     * 建立外文詞元
     * Create Foreign Token
     *
     * 建立外文單詞的詞元物件，並嘗試從字典中查找對應資訊。
     * 如果字典中存在該單詞，則合併其詞性標註。
     *
     * Creates a token object for foreign words and attempts to find corresponding info in dictionary.
     * If the word exists in dictionary, merges its part-of-speech tagging.
     *
     * @param {IWord} word - 基礎詞元物件 / Base token object
     * @param {number} [lasttype] - 前一個字元類型 / Previous character type
     * @param {IWordDebugInfo} [attr] - 除錯屬性 / Debug attributes
     * @returns {IWord} 建立的詞元物件 / Created token object
     */
    createForeignToken(word: IWord, lasttype?: number, attr?: IWordDebugInfo): IWord;
}
/**
 * 初始化函式
 * Initialization Function
 *
 * 綁定 ForeignTokenizer 的初始化方法，用於建立新的實例。
 * Binds the initialization method of ForeignTokenizer for creating new instances.
 */
export declare const init: ISubTokenizerCreate<ForeignTokenizer>;
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
 * 導出 ForeignTokenizer 類別，作為此模組的主要實現。
 * Exports the ForeignTokenizer class as the main implementation of this module.
 */
export default ForeignTokenizer;
