import { ISubTokenizerCreate, SubSModuleTokenizer } from '../mod';
import { IDICT, IDICT2, IWord } from '../Segment';
/**
 * 中文字部分詞器
 * Chinese Radical Tokenizer
 *
 * 此模組目前無任何用處與效果。
 * This module currently has no use or effect.
 *
 * @todo 部首處理 / Radical processing
 */
export declare class ZhRadicalTokenizer extends SubSModuleTokenizer {
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
     * 使用中文部首切分方法處理詞語。
     * Processes words using Chinese radical splitting method.
     *
     * @param {IWord[]} words - 單詞陣列 / Word array
     * @returns {IWord[]} 分詞後的單詞陣列 / Tokenized word array
     */
    split(words: IWord[]): IWord[];
    /**
     * 中文部首切分
     * Split Chinese Radical
     *
     * 識別並切分文本中的中文部首字元。
     * 目標字元：U+4136（㐶）、U+4137（㐷）
     *
     * Identifies and splits Chinese radical characters in text.
     * Target characters: U+4136 (㐶), U+4137 (㐷)
     *
     * @param {string} text - 要切分的文本 / Text to split
     * @param {number} [cur] - 開始位置 / Start position
     * @returns {IWord[] | null} 切分後的詞語陣列，若無匹配則返回 null / Split word array, or null if no match
     */
    splitZhRadical(text: string, cur?: number): IWord[];
}
export declare const init: ISubTokenizerCreate<ZhRadicalTokenizer>;
export declare const type = "tokenizer";
export default ZhRadicalTokenizer;
