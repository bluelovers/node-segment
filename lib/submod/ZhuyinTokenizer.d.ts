import { ISubTokenizerCreate, SubSModuleTokenizer } from '../mod';
import { IDICT, IDICT2, IWord } from '../Segment';
/**
 * 注音符號分詞器
 * Zhuyin (Bopomofo) Tokenizer
 *
 * 用於識別和處理文本中的注音符號（ㄅㄆㄇㄈ）。
 * 注音符號是台灣使用的中文注音系統，又稱為 Bopomofo。
 *
 * Used to identify and process Zhuyin symbols (ㄅㄆㄇㄈ) in text.
 * Zhuyin is the Chinese phonetic system used in Taiwan, also known as Bopomofo.
 *
 * Unicode 範圍 / Unicode Ranges:
 * - U+3105-U+312E: 注音符號（基本區）/ Zhuyin symbols (basic)
 * - U+31A0-U+31BA: 注音擴展符號 / Zhuyin extension symbols
 */
export declare class ZhuyinTokenizer extends SubSModuleTokenizer {
    /**
     * 模組名稱
     * Module Name
     *
     * @override
     */
    name: string;
    /**
     * 字典表
     * Dictionary Table
     *
     * @override
     */
    protected _TABLE: IDICT<IWord>;
    /**
     * 二級字典表
     * Secondary Dictionary Table
     *
     * 按長度分組的詞彙查找表。
     * Vocabulary lookup table grouped by length.
     */
    protected _TABLE2: IDICT2<IWord>;
    /**
     * 初始化快取
     * Initialize Cache
     *
     * @override
     * @param {...any[]} argv - 參數 / Arguments
     */
    protected _cache(...argv: any[]): void;
    /**
     * 對單詞進行分詞
     * Split Words
     *
     * 使用注音符號切分方法處理詞語。
     * Processes words using Zhuyin splitting method.
     *
     * @param {IWord[]} words - 單詞陣列 / Word array
     * @returns {IWord[]} 分詞後的單詞陣列 / Tokenized word array
     */
    split(words: IWord[]): IWord[];
    /**
     * 注音符號切分
     * Split Zhuyin Symbols
     *
     * 識別並切分文本中的注音符號。
     * 匹配範圍：
     * - U+3105-U+312E: 基本注音符號（ㄅ-ㄦ）
     * - U+31A0-U+31BA: 擴展注音符號（ㆠ-ㆺ）
     *
     * Identifies and splits Zhuyin symbols in text.
     * Matching ranges:
     * - U+3105-U+312E: Basic Zhuyin symbols (ㄅ-ㄦ)
     * - U+31A0-U+31BA: Extended Zhuyin symbols (ㆠ-ㆺ)
     *
     * @param {string} text - 要切分的文本 / Text to split
     * @param {number} [cur] - 開始位置 / Start position
     * @returns {IWord[] | null} 切分後的詞語陣列，若無匹配則返回 null / Split word array, or null if no match
     */
    splitZhuyin(text: string, cur?: number): IWord[];
}
export declare const init: ISubTokenizerCreate<ZhuyinTokenizer>;
export declare const type = "tokenizer";
export default ZhuyinTokenizer;
