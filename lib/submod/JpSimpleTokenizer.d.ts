/**
 * 日文簡易分詞器模組
 * Japanese Simple Tokenizer Module
 *
 * Created by user on 2018/4/19/019.
 */
import { SubSModuleTokenizer } from '../mod';
import { IWord } from '../Segment';
import { IWordDebug } from '../util';
/**
 * 日文簡易分詞器類型枚舉
 * Japanese Simple Tokenizer Type Enum
 *
 * 定義日文字元的分類類型，用於識別平假名和片假名。
 * Defines classification types for Japanese characters, used to identify Hiragana and Katakana.
 */
export declare const enum EnumJpSimpleTokenizerType {
    /**
     * 平假名
     * Hiragana
     *
     * 日文平假名字元，Unicode 範圍：ぁ-ん
     * 用於表示日語本土詞彙和語法標記。
     *
     * Japanese Hiragana characters, Unicode range: ぁ-ん
     * Used to represent native Japanese words and grammatical markers.
     *
     * https://en.wikipedia.org/wiki/Hiragana
     */
    HIRAGANA = 1,
    /**
     * 片假名
     * Katakana
     *
     * 日文片假名字元，Unicode 範圍：ァ-ヴーｱ-ﾝﾞｰ
     * 用於表示外來語、擬聲詞和強調。
     *
     * Japanese Katakana characters, Unicode range: ァ-ヴーｱ-ﾝﾞｰ
     * Used to represent loanwords, onomatopoeia, and emphasis.
     *
     * https://en.wikipedia.org/wiki/Katakana
     */
    KATAKANA = 2
}
/**
 * 日文簡易分詞器
 * Japanese Simple Tokenizer
 *
 * 專門用於識別和分割日文文本中的平假名和片假名。
 * 能夠將混合的日文文本按照假名類型進行分割。
 *
 * Specialized for identifying and splitting Hiragana and Katakana in Japanese text.
 * Capable of splitting mixed Japanese text by Kana type.
 */
export declare class JpSimpleTokenizer extends SubSModuleTokenizer {
    /**
     * 分詞器靜態名稱
     * Tokenizer Static Name
     *
     * 用於類別層級的名稱標識。
     * Used for class-level name identification.
     */
    static NAME: "JpSimpleTokenizer";
    /**
     * 分詞器實例名稱
     * Tokenizer Instance Name
     *
     * 標識此分詞器模組的名稱，用於調試和日誌記錄。
     * Identifies this tokenizer module name, used for debugging and logging.
     */
    name: "JpSimpleTokenizer";
    /**
     * 對未設定的單詞進行分詞
     * Segment unset words
     *
     * 對於尚未設定詞性的單詞，使用日文分割方法進行處理。
     * For words without set part-of-speech, processes them using Japanese splitting method.
     *
     * @param {IWord[]} words - 待分詞的單詞陣列 / Array of words to segment
     * @param {...any[]} argv - 額外參數 / Additional arguments
     * @returns {IWord[]} 分詞後的單詞陣列 / Array of segmented words
     */
    split(words: IWord[], ...argv: any[]): IWord[];
    /**
     * 建立日文簡易詞元
     * Create Japanese Simple Token
     *
     * 建立帶有日文類型標記的詞元物件。
     * Creates a token object with Japanese type marking.
     *
     * @protected
     * @template T - 詞元除錯類型 / Token debug type
     * @param {T} data - 詞元資料 / Token data
     * @param {EnumJpSimpleTokenizerType} type - 日文類型 / Japanese type
     * @returns {IWord} 建立的詞元物件 / Created token object
     */
    protected createJpSimpleToken<T extends IWordDebug>(data: T, type: EnumJpSimpleTokenizerType): T;
    /**
     * 分割日文文本
     * Split Japanese Text
     *
     * 根據平假名和片假名的分佈情況，將文本分割為對應的片段。
     * 如果文本只包含單一類型的假名，則直接返回整個文本作為一個詞元。
     * 如果文本包含混合假名，則按照假名類型進行分割。
     *
     * Splits text into corresponding segments based on the distribution of Hiragana and Katakana.
     * If text contains only one type of Kana, returns the entire text as a single token.
     * If text contains mixed Kana, splits by Kana type.
     *
     * @protected
     * @param {string} text - 要分割的日文文本 / Japanese text to split
     * @returns {IWord[] | null} 分割後的詞元陣列，若無法識別則返回 null / Array of segmented tokens, or null if unrecognizable
     */
    protected _splitText(text: string): IWord[];
}
/**
 * 初始化函式
 * Initialization Function
 *
 * 綁定 JpSimpleTokenizer 的初始化方法，用於建立新的實例。
 * Binds the initialization method of JpSimpleTokenizer for creating new instances.
 */
export declare const init: typeof JpSimpleTokenizer.init;
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
 * 導出 JpSimpleTokenizer 類別，作為此模組的主要實現。
 * Exports the JpSimpleTokenizer class as the main implementation of this module.
 */
export default JpSimpleTokenizer;
