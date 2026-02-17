/**
 * 中文姓氏模組
 * Chinese Surname Module
 *
 * 提供中文姓氏、名字相關的詞典資料，用於中文分詞系統的人名識別。
 * Provides Chinese surname and name dictionary data for Chinese word segmentation and name recognition.
 */
import { IDICT } from '../Segment';
/**
 * 中文姓名詞典命名空間
 * Chinese Name Dictionary Namespace
 *
 * 包含單姓、複姓、雙字姓名各部分及單字姓名的詞典資料。
 * Contains dictionary data for single surnames, compound surnames, parts of two-character names, and single-character names.
 */
export declare namespace _CHS_NAMES {
    /**
     * 單姓列表
     * Single Surname List
     *
     * 包含常見的單字姓氏，分為有明顯歧義和無明顯歧義兩類。
     * Includes common single-character surnames, divided into those with obvious ambiguity and those without.
     */
    const FAMILY_NAME_1: string[];
    /**
     * 複姓列表
     * Compound Surname List
     *
     * 包含常見的雙字姓氏，如司馬、上官等。
     * Includes common two-character surnames such as 司馬, 上官, etc.
     */
    const FAMILY_NAME_2: string[];
    /**
     * 雙字姓名第一個字列表
     * First Character of Two-Character Names List
     *
     * 用於構成雙字姓名的第一個字，如「建國」中的「建」。
     * Used as the first character in two-character names, such as '建' in '建國'.
     */
    const DOUBLE_NAME_1: string[];
    /**
     * 雙字姓名第二個字列表
     * Second Character of Two-Character Names List
     *
     * 用於構成雙字姓名的第二個字，如「建國」中的「國」。
     * Used as the second character in two-character names, such as '國' in '建國'.
     */
    const DOUBLE_NAME_2: string[];
    /**
     * 單字姓名列表
     * Single-Character Name List
     *
     * 用於構成單字姓名的字，如「偉」、「芳」等。
     * Used for single-character names, such as '偉', '芳', etc.
     */
    const SINGLE_NAME: string[];
    /**
     * 不重複單字姓名列表
     * Non-Repeating Single-Character Name List
     *
     * 包含不應重複使用的單字姓名，用於避免姓名重複。
     * Contains single-character names that should not be repeated to avoid name duplication.
     */
    const SINGLE_NAME_NO_REPEAT: string[];
    /**
     * 共享姓名字列表
     * Shared Name Character List
     *
     * 包含可在姓氏和名字中共享使用的字，如「濟」。
     * Contains characters that can be shared between surnames and given names, such as '濟'.
     */
    const SHARE_NAME: string[];
    /**
     * 將字串陣列轉換為字典格式
     * Convert String Array to Dictionary Format
     *
     * 將輸入的字串陣列轉換為 IDICT<number> 格式的字典，
     * 其中鍵為字串，值為字串長度。
     *
     * Converts the input string array into an IDICT<number> format dictionary,
     * where the key is the string and the value is the string length.
     *
     * @param {string[]} a - 輸入的字串陣列 / Input string array
     * @param {number} n - 字串長度值 / String length value
     * @returns {IDICT<number>} 轉換後的字典 / Converted dictionary
     */
    function p(a: string[], n: number): IDICT<number>;
}
/**
 * 單姓字典
 * Single Surname Dictionary
 *
 * 將單姓列表轉換為字典格式，用於快速查找。
 * Converts the single surname list into dictionary format for quick lookup.
 */
export declare const FAMILY_NAME_1: IDICT<number>;
/**
 * 複姓字典
 * Compound Surname Dictionary
 *
 * 將複姓列表轉換為字典格式，用於快速查找。
 * Converts the compound surname list into dictionary format for quick lookup.
 */
export declare const FAMILY_NAME_2: IDICT<number>;
/**
 * 雙字姓名第一個字字典
 * First Character of Two-Character Names Dictionary
 *
 * 將雙字姓名第一個字列表與共享姓名字合併後轉換為字典格式。
 * Merges the first character list with shared name characters and converts to dictionary format.
 */
export declare const DOUBLE_NAME_1: IDICT<number>;
/**
 * 雙字姓名第二個字字典
 * Second Character of Two-Character Names Dictionary
 *
 * 將雙字姓名第二個字列表與共享姓名字合併後轉換為字典格式。
 * Merges the second character list with shared name characters and converts to dictionary format.
 */
export declare const DOUBLE_NAME_2: IDICT<number>;
/**
 * 單字姓名字典
 * Single-Character Name Dictionary
 *
 * 將單字姓名列表與共享姓名字合併後轉換為字典格式。
 * Merges the single-character name list with shared name characters and converts to dictionary format.
 */
export declare const SINGLE_NAME: IDICT<number>;
/**
 * 不重複單字姓名字典
 * Non-Repeating Single-Character Name Dictionary
 *
 * 將不重複單字姓名列表轉換為字典格式。
 * Converts the non-repeating single-character name list into dictionary format.
 */
export declare const SINGLE_NAME_NO_REPEAT: IDICT<number>;
declare const _default: typeof import("./CHS_NAMES");
export default _default;
