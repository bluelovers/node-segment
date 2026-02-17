import { ISubOptimizerCreate, SubSModuleOptimizer } from '../mod';
import { IDICT, IWord } from '../Segment';
import { POSTAG as IPOSTAG } from '@novel-segment/postag/lib/postag/ids';
/**
 * 詞典優化模組
 * Dictionary Optimizer Module
 *
 * 負責對分詞結果進行優化處理，合併相鄰的詞彙以提升分詞準確度。
 * 主要功能包括：
 * - 合併相鄰且能組成新詞的詞彙
 * - 處理形容詞 + 助詞的組合
 * - 處理數詞與量詞的組合
 * - 處理方向詞的合併
 *
 * Responsible for optimizing segmentation results by merging adjacent words to improve accuracy.
 * Main features include:
 * - Merging adjacent words that can form new words
 * - Handling adjective + particle combinations
 * - Handling numeral + quantifier combinations
 * - Handling direction word merging
 *
 * @author 老雷<leizongmin@gmail.com>
 */
export declare class DictOptimizer extends SubSModuleOptimizer {
    /**
     * 詞典對照表
     * Dictionary Lookup Table
     *
     * 儲存詞彙與其對應詞性的對照表，用於判斷詞彙是否可合併。
     * 繼承自父類別的屬性，並在此類別中指定具體的泛型類型。
     *
     * Stores the mapping between words and their corresponding part-of-speech tags.
     * Used to determine if words can be merged.
     * Inherited from parent class with specific generic type.
     *
     * @protected
     */
    protected _TABLE: IDICT<IWord>;
    /**
     * 模組名稱
     * Module Name
     *
     * 用於識別此優化模組的名稱，在除錯時會顯示於詞彙的處理記錄中。
     *
     * The name used to identify this optimization module.
     * Displayed in word processing records during debugging.
     */
    name: string;
    /**
     * 快取初始化
     * Cache Initialization
     *
     * 覆寫父類別的快取方法，初始化詞典對照表與詞性標籤。
     * 必須在執行優化前呼叫，以確保必要資源已載入。
     *
     * Overrides parent class cache method to initialize dictionary table and POS tags.
     * Must be called before optimization to ensure required resources are loaded.
     *
     * @override
     */
    _cache(): void;
    /**
     * 判斷兩詞是否可合併
     * Determine if Two Words Can Be Merged
     *
     * 根據詞性判斷兩個相鄰詞彙是否可以合併為一個新詞。
     * 合併條件包括：
     * - 兩詞詞性相同
     * - 兩詞詞性有交集（位元運算 AND 不為零）
     * - 第一詞有詞性且第二詞無詞性
     * - 副詞 + 動詞組合，且合併後詞存在於詞典中
     *
     * Determines if two adjacent words can be merged into a new word based on their part-of-speech.
     * Merge conditions include:
     * - Both words have the same POS
     * - Both words have overlapping POS (bitwise AND is non-zero)
     * - First word has POS and second word has no POS
     * - Adverb + Verb combination, where merged word exists in dictionary
     *
     * @param {IWord} w1 - 第一個詞 / First word
     * @param {IWord} w2 - 第二個詞 / Second word
     * @param {Object} options - 選項物件 / Options object
     * @param {typeof IPOSTAG} options.POSTAG - 詞性標籤定義 / POS tag definitions
     * @param {IDICT} options.TABLE - 詞典對照表 / Dictionary lookup table
     * @param {string} options.nw - 合併後的新詞 / New merged word
     * @param {number} options.i - 當前索引 / Current index
     * @param {IWord} options.nw_cache - 詞彙快取 / Word cache
     * @param {boolean} options.nw_cache_exists - 快取是否存在 / Cache exists flag
     * @returns {boolean} 是否可合併 / Whether the words can be merged
     */
    isMergeable(w1: IWord, w2: IWord, { POSTAG, TABLE, nw, i, nw_cache, nw_cache_exists, }: {
        POSTAG: typeof IPOSTAG;
        TABLE: IDICT;
        nw: string;
        i: number;
        nw_cache: IWord;
        nw_cache_exists: boolean;
    }): boolean;
    /**
     * 取得詞彙快取
     * Get Word Cache
     *
     * 從詞典中查詢指定詞彙，並快取查詢結果以避免重複查詢。
     * 若快取狀態已存在，則直接返回現有結果。
     *
     * Queries the dictionary for a specified word and caches the result to avoid repeated lookups.
     * If the cache state already exists, returns the existing result directly.
     *
     * @protected
     * @param {string} nw - 要查詢的新詞 / New word to query
     * @param {IWord} nw_cache - 現有的詞彙快取 / Existing word cache
     * @param {boolean} nw_cache_exists - 快取是否存在標記 / Cache exists flag
     * @returns {{ nw: string, nw_cache: IWord, nw_cache_exists: boolean }} 查詢結果物件 / Query result object
     */
    _getWordCache(nw: string, nw_cache: IWord, nw_cache_exists: boolean): {
        nw: string;
        nw_cache: IWord;
        nw_cache_exists: boolean;
    };
    /**
     * 執行詞典優化
     * Perform Dictionary Optimization
     *
     * 對分詞結果進行優化處理，合併相鄰詞彙以提升分詞準確度。
     * 主要處理邏輯包括：
     * - 形容詞 + 助詞組合（如：不同 + 的 = 不同的）
     * - 形容詞 + 名詞組合
     * - 相同詞性或可合併詞性的相鄰詞
     * - 數詞組合（百分比、小數、千分位）
     * - 數詞 + 量詞組合
     * - 方向詞合併
     *
     * 由於合併後可能產生新的可合併組合，會遞迴執行兩次以確保完整處理。
     *
     * Performs optimization on segmentation results by merging adjacent words to improve accuracy.
     * Main processing logic includes:
     * - Adjective + Particle combinations (e.g., 不同 + 的 = 不同的)
     * - Adjective + Noun combinations
     * - Adjacent words with same or mergeable POS
     * - Numeral combinations (percentage, decimal, thousand separator)
     * - Numeral + Quantifier combinations
     * - Direction word merging
     *
     * Since merging may create new mergeable combinations, runs twice recursively to ensure complete processing.
     *
     * @override
     * @param {IWord[]} words - 待優化的詞彙陣列 / Word array to optimize
     * @param {boolean} is_not_first - 是否為遞迴呼叫 / Whether this is a recursive call
     * @returns {IWord[]} 優化後的詞彙陣列 / Optimized word array
     */
    doOptimize(words: IWord[], is_not_first: boolean): IWord[];
    /**
     * 合併數詞與量詞的詞性
     * Merge Numeral and Quantifier POS
     *
     * 根據量詞和詞典中詞彙的詞性，決定數量詞的最終詞性。
     * 若詞典中已有該詞，則保留其詞性並加上數量詞標籤。
     * 否則根據量詞的詞性添加對應標籤（時間、名詞、動詞）。
     *
     * Determines the final POS of numeral-quantifier based on quantifier and dictionary word POS.
     * If the word exists in dictionary, preserves its POS and adds numeral-quantifier tag.
     * Otherwise, adds corresponding tags based on quantifier POS (time, noun, verb).
     *
     * @private
     * @param {number} p - 基礎詞性 / Base POS
     * @param {number} p2 - 量詞詞性 / Quantifier POS
     * @param {number} [p3] - 詞典中詞彙的詞性 / Dictionary word POS
     * @returns {number} 合併後的詞性 / Merged POS
     */
    _mergeWordHowManyProp(p: number, p2: number, p3?: number): number;
}
export declare const init: ISubOptimizerCreate<DictOptimizer>;
export declare const type = "optimizer";
export default DictOptimizer;
