/**
 * 人名優化模組
 * Chinese Name Optimizer Module
 *
 * 此模組負責識別與合併中文人名，採用兩遍掃描策略：
 * 第一遍處理複雜的人名組合（如三字名、帶前綴的稱呼）；
 * 第二遍處理簡單的「姓 + 名」組合。
 *
 * This module is responsible for identifying and merging Chinese names,
 * using a two-pass scanning strategy:
 * First pass handles complex name combinations (e.g., three-character names, prefixed titles);
 * Second pass handles simple "surname + given name" combinations.
 *
 * @author 老雷<leizongmin@gmail.com>
 * @version 0.1
 */
import { SubSModuleOptimizer } from '../mod';
import { IDICT, IWord } from '../Segment';
/**
 * 中文人名優化器
 * Chinese Name Optimizer
 *
 * @todo 支援 XX氏 / Support "XX氏" format (e.g., 陳氏、李氏)
 */
export declare class ChsNameOptimizer extends SubSModuleOptimizer {
    /**
     * 分詞字典表
     * Segmentation Dictionary Table
     *
     * 儲存所有已知的詞語及其詞性標記，用於驗證合併後的詞是否已存在。
     * Stores all known words and their POS tags, used to verify
     * if merged words already exist.
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
     * 初始化模組所需的字典快取，包括主字典與黑名單字典。
     * 黑名單用於防止錯誤的人名合併（如「於是」不應被識別為人名）。
     *
     * Initializes the dictionary caches required by the module,
     * including the main dictionary and blacklist dictionary.
     * The blacklist prevents incorrect name merging
     * (e.g., "於是" should not be recognized as a name).
     *
     * @override
     * @protected
     */
    _cache(): void;
    /**
     * 檢查是否在黑名單中
     * Check if in Blacklist
     *
     * 判斷給定的詞是否存在於優化器黑名單中。
     * 黑名單中的詞不會被合併為人名。
     *
     * Determines if the given word exists in the optimizer blacklist.
     * Words in the blacklist will not be merged as names.
     *
     * @param {string} nw - 待檢查的詞 / Word to check
     * @returns {boolean} 是否在黑名單中 / Whether in blacklist
     */
    isBlackList(nw: string): boolean;
    /**
     * 檢查多詞是否可合併
     * Check if Multiple Words are Mergeable
     *
     * 檢查多個詞合併後是否不在黑名單中，即可進行合併。
     *
     * Checks if multiple words can be merged by verifying
     * the combined result is not in the blacklist.
     *
     * @param {...string[]} words - 待合併的詞 / Words to merge
     * @returns {true | null} 可合併返回 true，否則返回 null / Returns true if mergeable, null otherwise
     */
    isMergeable2(...words: string[]): boolean;
    /**
     * 檢查兩詞是否可合併
     * Check if Two Words are Mergeable
     *
     * 檢查兩個相鄰詞是否可以合併，需滿足：
     * 1. 兩詞都存在
     * 2. 合併後的詞不在黑名單中
     *
     * Checks if two adjacent words can be merged, requiring:
     * 1. Both words exist
     * 2. The merged word is not in the blacklist
     *
     * @param {IWord} word - 當前詞 / Current word
     * @param {IWord} nextword - 下一個詞 / Next word
     * @returns {true | null} 可合併返回 true，否則返回 null / Returns true if mergeable, null otherwise
     */
    isMergeable(word: IWord, nextword: IWord): boolean;
    /**
     * 驗證未知新詞是否可作為人名
     * Validate Unknown New Word as Name
     *
     * 只有新詞屬於人名或未知詞時才會合併。
     * 此方法用於過濾掉已有明確詞性且非人名的詞組。
     *
     * Only merges when the new word is a name or unknown word.
     * This method filters out phrases that already have
     * a clear POS tag and are not names.
     *
     * @template W - 詞的類型，可以是字串或字串陣列 / Word type, can be string or string array
     * @param {W} ws - 詞或詞陣列 / Word or word array
     * @param {Function} [cb] - 回調函數，可自訂處理邏輯 / Callback function for custom processing
     * @returns {IWord | boolean | void} 驗證結果 / Validation result
     */
    validUnknownNewWord<W extends string | string[]>(ws: W, cb?: (nw: string, ew: IWord, ws: W) => IWord | boolean | void): true | IWord;
    /**
     * 判斷是否為姓氏
     * Check if Surname
     *
     * 檢查給定的字是否為中文姓氏。
     * 包含單字姓氏（如：王、李）和複姓（如：歐陽、司馬）。
     *
     * Checks if the given character is a Chinese surname.
     * Includes single-character surnames (e.g., 王, 李) and
     * compound surnames (e.g., 歐陽, 司馬).
     *
     * @param {string} w - 待檢查的字 / Character to check
     * @returns {boolean} 是否為姓氏 / Whether it's a surname
     */
    isFamilyName(w: string): boolean;
    /**
     * 判斷是否為雙字名
     * Check if Double-Character Given Name
     *
     * 檢查兩個字是否構成有效的雙字名。
     * 使用預定義的雙字名首字和次字對照表進行驗證。
     *
     * Checks if two characters form a valid double-character given name.
     * Uses predefined lookup tables for first and second characters.
     *
     * @param {string} w1 - 名的第一個字 / First character of given name
     * @param {string} w2 - 名的第二個字 / Second character of given name
     * @returns {boolean} 是否為雙字名 / Whether it's a double-character name
     */
    isDoubleName(w1: string, w2: string): boolean;
    /**
     * 檢查是否為可重複的單字名疊字
     * Check if Repeatable Single-Character Name
     *
     * 判斷是否為可重複的單字名疊字形式（如「明明」、「麗麗」）。
     * 某些單字名可以疊字使用，某些則不行。
     *
     * Determines if it's a repeatable single-character name in reduplicated form
     * (e.g., "明明", "麗麗").
     * Some single-character names can be reduplicated, others cannot.
     *
     * @param {string} w1 - 第一個字 / First character
     * @param {string} w2 - 第二個字 / Second character
     * @returns {boolean} 是否為可重複的單字名疊字 / Whether it's a repeatable single-character name
     */
    isSingleNameRepeat(w1: string, w2: string): boolean;
    /**
     * 判斷是否為單字名
     * Check if Single-Character Given Name
     *
     * 檢查給定的字是否可作為單字名使用。
     *
     * Checks if the given character can be used as a single-character given name.
     *
     * @param {string} w1 - 待檢查的字 / Character to check
     * @returns {boolean} 是否為單字名 / Whether it's a single-character name
     */
    isSingleName(w1: string): boolean;
    /**
     * 判斷是否為不可重複的單字名
     * Check if Non-Repeatable Single-Character Name
     *
     * 檢查給定的字是否為不可重複的單字名。
     * 這些字作為名字時不能以疊字形式出現。
     *
     * Checks if the given character is a non-repeatable single-character name.
     * These characters cannot appear in reduplicated form when used as names.
     *
     * @param {string} w1 - 待檢查的字 / Character to check
     * @returns {boolean} 是否為不可重複的單字名 / Whether it's a non-repeatable single-character name
     */
    isSingleNameNoRepeat(w1: string): boolean;
    /**
     * 判斷是否為有效的名字組合
     * Check if Valid Given Name Combination
     *
     * 檢查兩個字是否構成有效的名字（單字名疊字或雙字名）。
     *
     * Checks if two characters form a valid given name
     * (reduplicated single-character name or double-character name).
     *
     * @param {string} w1 - 第一個字 / First character
     * @param {string} w2 - 第二個字 / Second character
     * @returns {boolean} 是否為有效的名字組合 / Whether it's a valid given name combination
     */
    isFirstName(w1: string, w2: string): boolean;
    /**
     * 對可能是人名的單詞進行優化
     * Optimize Potential Name Words
     *
     * 使用兩遍掃描策略識別與合併中文人名：
     *
     * **第一遍掃描**：處理複雜情況
     * - 三字人名（姓 + 雙字名）
     * - 帶前綴的稱呼（小王、老李）
     * - 姓 + 已識別人名
     * - 未識別詞的名組合
     * - 無歧義的姓 + 名組合
     *
     * **第二遍掃描**：處理簡單情況
     * - 姓 + 單字名
     *
     * Uses a two-pass scanning strategy to identify and merge Chinese names:
     *
     * **First Pass**: Handles complex cases
     * - Three-character names (surname + double-character given name)
     * - Prefixed titles (小王, 老李)
     * - Surname + already identified name
     * - Unrecognized name combinations
     * - Unambiguous surname + given name combinations
     *
     * **Second Pass**: Handles simple cases
     * - Surname + single-character given name
     *
     * @override
     * @param {IWord[]} words - 詞語陣列 / Word array
     * @returns {IWord[]} 優化後的詞語陣列 / Optimized word array
     */
    doOptimize(words: IWord[]): IWord[];
}
/**
 * 模組初始化函數
 * Module Initialization Function
 *
 * 綁定至 ChsNameOptimizer 類別的靜態 init 方法。
 * Binds to the static init method of ChsNameOptimizer class.
 */
export declare const init: typeof ChsNameOptimizer.init;
/**
 * 模組類型
 * Module Type
 *
 * 繼承自 SubSModuleOptimizer，值為 'optimizer'。
 * Inherited from SubSModuleOptimizer, value is 'optimizer'.
 */
export declare const type = "optimizer";
export default ChsNameOptimizer;
