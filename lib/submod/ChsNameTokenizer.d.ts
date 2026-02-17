import { SubSModuleTokenizer } from '../mod';
import { IDICT, IWord } from '../Segment';
/**
 * 中文人名分詞器
 * Chinese Name Tokenizer
 *
 * 繼承自 SubSModuleTokenizer，專門處理中文人名的識別與分詞。
 * 使用預定義的姓氏與名字對照表進行匹配。
 *
 * Extends SubSModuleTokenizer, specialized in Chinese name recognition
 * and tokenization. Uses predefined surname and given name lookup tables
 * for matching.
 */
export declare class ChsNameTokenizer extends SubSModuleTokenizer {
    /**
     * 分詞字典表
     * Segmentation Dictionary Table
     *
     * 儲存所有已知的詞語及其詞性標記。
     * Stores all known words and their POS tags.
     *
     * @protected
     */
    protected _TABLE: IDICT<IWord>;
    /**
     * 模組名稱
     * Module Name
     *
     * @override
     */
    name: string;
    /**
     * 快取初始化
     * Cache Initialization
     *
     * 初始化模組所需的字典快取與詞性標記。
     * Initializes the dictionary cache and POS tags required by the module.
     *
     * @override
     * @protected
     */
    _cache(): void;
    /**
     * 對未識別的單詞進行分詞
     * Split Unrecognized Words
     *
     * 遍歷詞語陣列，對未識別的詞（詞性為空）進行人名匹配。
     * 若匹配成功，將詞拆分為人名與非人名部分。
     *
     * Iterates through the word array and performs name matching
     * on unrecognized words (empty POS). If matched successfully,
     * splits the word into name and non-name parts.
     *
     * @param {IWord[]} words - 詞語陣列 / Word array
     * @returns {IWord[]} 分詞後的詞語陣列 / Tokenized word array
     */
    split(words: IWord[]): IWord[];
    /**
     * 匹配包含的人名，並返回相關資訊
     * Match Names and Return Information
     *
     * 掃描文本中所有可能的人名，返回人名列表及其位置資訊。
     * 匹配順序：優先匹配複姓，再匹配單姓。
     *
     * 人名格式支援：
     * - 複姓 + 雙字名（如：司馬相如、歐陽菲菲）
     * - 複姓 + 單字名（如：司馬光、歐陽修）
     * - 複姓 + 疊字名（如：上官暖暖）
     * - 單姓 + 雙字名（如：王小明、李美麗）
     * - 單姓 + 單字名（如：王剛、李明）
     * - 單姓 + 疊字名（如：李明明、王麗麗）
     *
     * Scans text for all possible names and returns a list of names
     * with their position information.
     * Matching order: compound surnames first, then single surnames.
     *
     * Supported name formats:
     * - Compound surname + double-character given name (e.g., 司馬相如, 歐陽菲菲)
     * - Compound surname + single-character given name (e.g., 司馬光, 歐陽修)
     * - Compound surname + reduplicated given name (e.g., 上官暖暖)
     * - Single surname + double-character given name (e.g., 王小明, 李美麗)
     * - Single surname + single-character given name (e.g., 王剛, 李明)
     * - Single surname + reduplicated given name (e.g., 李明明, 王麗麗)
     *
     * @param {string} text - 待匹配的文本 / Text to match
     * @param {number} [cur=0] - 開始位置 / Start position
     * @returns {IWord[]} 人名資訊陣列，格式為 {w: '人名', c: 開始位置} / Name info array, format: {w: 'name', c: start position}
     */
    matchName(text: string, cur?: number): IWord[];
}
/**
 * 模組初始化函數
 * Module Initialization Function
 *
 * 綁定至 ChsNameTokenizer 類別的靜態 init 方法。
 * Binds to the static init method of ChsNameTokenizer class.
 */
export declare const init: typeof ChsNameTokenizer.init;
/**
 * 模組類型
 * Module Type
 *
 * 繼承自 SubSModuleTokenizer，值為 'tokenizer'。
 * Inherited from SubSModuleTokenizer, value is 'tokenizer'.
 */
export declare const type = "tokenizer";
export default ChsNameTokenizer;
