/**
 * 通配符識別模組
 * Wildcard Tokenizer Module
 *
 * 用於識別和處理文本中的通配符詞彙。
 * 通配符詞彙是指具有特殊模式或格式的詞，如縮寫、特殊符號組合等。
 *
 * Used to identify and process wildcard vocabulary in text.
 * Wildcard vocabulary refers to words with special patterns or formats,
 * such as abbreviations, special symbol combinations, etc.
 *
 * @author 老雷<leizongmin@gmail.com>
 */
import { ISubTokenizerCreate, SubSModuleTokenizer } from '../mod';
import { IDICT, IDICT2, IWord } from '../Segment';
import { IWordDebugInfo } from '../util/index';
/**
 * 通配符分詞器
 * Wildcard Tokenizer
 *
 * 繼承自 SubSModuleTokenizer，實現通配符詞彙的識別和分詞。
 * Extends SubSModuleTokenizer to implement wildcard vocabulary recognition and tokenization.
 */
export declare class WildcardTokenizer extends SubSModuleTokenizer {
    /**
     * 模組名稱
     * Module Name
     *
     * @override
     */
    name: string;
    /**
     * 通配符字典表
     * Wildcard Dictionary Table
     *
     * 儲存通配符詞彙及其詞性標記。
     * Stores wildcard vocabulary and their POS tags.
     *
     * @override
     */
    protected _TABLE: IDICT<IWord>;
    /**
     * 二級通配符字典表
     * Secondary Wildcard Dictionary Table
     *
     * 按長度分組的通配符詞彙查找表，用於優化匹配效率。
     * Wildcard vocabulary lookup table grouped by length for optimized matching.
     */
    protected _TABLE2: IDICT2<IWord>;
    /**
     * 初始化快取
     * Initialize Cache
     *
     * 載入通配符字典表。
     * Loads wildcard dictionary tables.
     *
     * @override
     */
    _cache(): void;
    /**
     * 對未識別的單詞進行分詞
     * Split Unrecognized Words
     *
     * 使用通配符匹配方法處理未識別的詞語。
     * Processes unrecognized words using wildcard matching method.
     *
     * @param {IWord[]} words - 單詞陣列 / Word array
     * @returns {IWord[]} 分詞後的單詞陣列 / Tokenized word array
     */
    split(words: IWord[]): IWord[];
    /**
     * 建立通配符詞語標記
     * Create Wildcard Token
     *
     * 為匹配到的通配符詞彙建立詞語物件。
     * Creates word object for matched wildcard vocabulary.
     *
     * @param {IWord} word - 詞語資訊 / Word information
     * @param {number} [lasttype] - 上一個詞的類型 / Previous word type
     * @param {IWordDebugInfo} [attr] - 除錯資訊 / Debug information
     * @returns {IWord} 詞語標記物件 / Word token object
     */
    createWildcardToken(word: IWord, lasttype?: number, attr?: IWordDebugInfo): IWord;
    /**
     * 通配符切分
     * Split Wildcard
     *
     * 將文本切分為通配符詞彙和其他部分。
     * 匹配到的通配符詞彙會被標記詞性，其他部分保持未識別狀態。
     *
     * Splits text into wildcard vocabulary and other parts.
     * Matched wildcard vocabulary will be tagged with POS, other parts remain unrecognized.
     *
     * @param {string} text - 要切分的文本 / Text to split
     * @param {number} [cur] - 開始位置 / Start position
     * @returns {IWord[] | undefined} 切分後的詞語陣列，若無匹配則返回 undefined / Split word array, or undefined if no match
     */
    splitWildcard(text: string, cur?: number): IWord[];
    /**
     * 匹配單詞，返回相關資訊
     * Match Words and Return Information
     *
     * 掃描文本中的通配符詞彙，返回所有匹配的詞及其位置資訊。
     * 使用二級字典優化匹配效率，按長度分組查找。
     *
     * Scans text for wildcard vocabulary and returns all matched words with their position info.
     * Uses secondary dictionary for optimized matching efficiency, grouped by length.
     *
     * @param {string} text - 文本 / Text
     * @param {number} [cur] - 開始位置 / Start position
     * @returns {IWord[]} 返回格式 {w: '單詞', c: 開始位置} / Format: {w: 'word', c: start position}
     */
    matchWord(text: string, cur?: number): IWord[];
}
export declare const init: ISubTokenizerCreate<WildcardTokenizer>;
export declare const type = "tokenizer";
export default WildcardTokenizer;
