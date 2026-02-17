/**
 * Created by user on 2018/4/16/016.
 */
import { SubSModuleOptimizer } from '../mod';
import { IDICT, IDICT_SYNONYM, IWord } from '../Segment';
import { IWordDebug } from '../util';
/**
 * 繁體中文同義詞優化器
 * Traditional Chinese Synonym Optimizer
 *
 * 以詞意來自動轉換 而不需要手動加入字典於 synonym.txt
 * 適用於比較容易需要人工處理的轉換
 *
 * 自動處理 `里|后`
 *
 * 建議在字典內追加人名地名等等名字 來增加準確性
 * 防止轉換錯誤
 *
 * Automatically converts words based on semantic meaning without manually adding them to synonym.txt
 * Suitable for conversions that typically require manual processing
 *
 * Automatically handles `里|后` (Li/Hou) conversions
 *
 * It is recommended to add names of people and places to the dictionary to increase accuracy
 * To prevent conversion errors
 *
 * @todo 發于余干松冲准呆只范舍涂
 */
export declare class ZhtSynonymOptimizer extends SubSModuleOptimizer {
    /**
     * 優化器名稱
     * Optimizer name
     */
    name: string;
    /**
     * 同義詞字典快取
     * Synonym dictionary cache
     *
     * 儲存詞彙與其對應同義詞的對應表
     * Stores the mapping between words and their synonyms
     *
     * @protected
     */
    protected _SYNONYM?: IDICT_SYNONYM;
    /**
     * 主詞彙表快取
     * Main vocabulary table cache
     *
     * 用於查詢詞彙的詞性、頻率等資訊
     * Used to query part-of-speech, frequency, and other information of words
     *
     * @protected
     */
    protected _TABLE: IDICT<IWord>;
    /**
     * 初始化並快取字典資料
     * Initialize and cache dictionary data
     *
     * 從分段器 (Segment) 中取得各類字典資料並快取至實例屬性，
     * 以避免重複查詢造成的效能損耗。
     * Retrieves various dictionary data from the Segment and caches them
     * to instance properties to avoid performance overhead from repeated queries.
     *
     * @override
     * @protected
     */
    _cache(): void;
    /**
     * 檢查詞彙是否在同義詞轉換黑名單中
     * Check if a word is in the synonym conversion blacklist
     *
     * 黑名單中的詞彙將不會被自動轉換，用於保護特定詞彙不被錯誤轉換。
     * Words in the blacklist will not be automatically converted,
     * used to protect specific words from incorrect conversion.
     *
     * @param {string} w - 要檢查的詞彙 / The word to check
     * @returns {boolean | null} 若在黑名單中返回 true，否則返回 null
     *                           Returns true if in blacklist, null otherwise
     */
    isSynonymBlacklist(w: string): boolean;
    /**
     * 取得詞彙的同義詞
     * Get the synonym of a word
     *
     * 優先從同義詞字典中查找原始詞彙的對應詞，
     * 若找到的結果本身也有同義詞對應，則繼續遞迴查找。
     * First looks up the corresponding word for the original word in the synonym dictionary,
     * if the found result itself has a synonym mapping, continues to look up recursively.
     *
     * @protected
     * @param {string} w - 原始詞彙 / Original word
     * @param {string} nw - 預設的新詞彙 / Default new word
     * @returns {string} 最終的同義詞結果 / Final synonym result
     */
    protected _getSynonym(w: string, nw: string): string;
    /**
     * 執行繁簡轉換優化
     * Execute Traditional-Simplified conversion optimization
     *
     * 此方法為核心優化邏輯，遍歷所有詞彙並根據上下文進行智能轉換。
     * This method is the core optimization logic, iterating through all words
     * and performing intelligent conversion based on context.
     *
     * 主要處理的轉換規則：
     * Main conversion rules handled:
     * - 「里」→「裡」：根據前後文判斷是否為方位詞
     * - 「后」→「後」：根據前後文判斷是否為時間/方位詞
     * - 「发/發」→「髮」：根據前文判斷是否與頭髮相關
     * - 「于」→「於」：根據前後文判斷是否為介詞
     * - 「么」→「麼」：句末語氣詞轉換
     *
     * @override
     * @template T - 詞彙類型，需繼承 IWordDebug / Word type, must extend IWordDebug
     * @param {T[]} words - 待優化的詞彙陣列 / Array of words to optimize
     * @returns {T[]} 優化後的詞彙陣列 / Optimized array of words
     */
    doOptimize<T extends IWordDebug>(words: T[]): T[];
}
/**
 * 初始化函數
 * Initialization function
 *
 * 綁定類別的靜態 init 方法，用於建立優化器實例。
 * Binds the class's static init method for creating optimizer instances.
 */
export declare const init: typeof ZhtSynonymOptimizer.init;
/**
 * 類型標識
 * Type identifier
 *
 * 用於識別此模組的類型。
 * Used to identify the type of this module.
 */
export declare const type = "optimizer";
export default ZhtSynonymOptimizer;
