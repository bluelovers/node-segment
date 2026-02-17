import { SubSModuleOptimizer } from '../mod';
import { IWordDebug } from '../util';
/**
 * 形容詞優化模組
 * Adjective Optimizer Module
 *
 * 把一些錯認為名詞的詞標註為形容詞，或者對名詞作定語的情況。
 * 主要處理顏色詞的形容詞轉換，例如：
 * - 「紅色的」中的「紅」應為形容詞
 * - 「黑色眼睛」中的「黑色」應為形容詞
 * - 「純金」中的「純」應為形容詞
 *
 * Marks some words mistakenly recognized as nouns as adjectives,
 * or handles cases where nouns function as attributives.
 * Mainly handles adjective conversion for color words, for example:
 * - "紅" in "紅色的" should be an adjective
 * - "黑色" in "黑色眼睛" should be an adjective
 * - "純" in "純金" should be an adjective
 */
export declare class AdjectiveOptimizer extends SubSModuleOptimizer {
    /**
     * 模組名稱
     * Module Name
     *
     * @override
     */
    name: string;
    /**
     * 執行形容詞優化
     * Perform Adjective Optimization
     *
     * 掃描詞語陣列，根據上下文將部分名詞轉換為形容詞。
     * 主要處理規則：
     * - 顏色詞 + 助詞「的」→ 顏色詞標記為形容詞
     * - 顏色詞 + 名詞性詞語 → 顏色詞標記為形容詞
     * - 「純/純」+ 髮色詞 → 「純」標記為形容詞
     *
     * Scans word array and converts some nouns to adjectives based on context.
     * Main processing rules:
     * - Color word + particle "的" → Mark color word as adjective
     * - Color word + nominal word → Mark color word as adjective
     * - "純/纯" + hair color word → Mark "純" as adjective
     *
     * @override
     * @param {IWordDebug[]} words - 詞語陣列 / Word array
     * @returns {IWordDebug[]} 優化後的詞語陣列 / Optimized word array
     */
    doOptimize(words: IWordDebug[]): IWordDebug[];
    /**
     * 判斷是否為名詞性詞語
     * Check if Nominal Word
     *
     * 檢查給定的詞性是否屬於名詞性詞語類別。
     * 包括：普通名詞、時間詞、外文字、其他專名、人名、地名、URL等。
     *
     * Checks if the given POS belongs to nominal word categories.
     * Includes: common noun, time word, foreign word, other proper noun,
     * person name, place name, URL, etc.
     *
     * @param {number | number[]} pos - 詞性標記 / POS tag
     * @returns {boolean} 是否為名詞性詞語 / Whether it's a nominal word
     */
    isNominal(pos: number | number[]): boolean;
}
export declare const init: typeof AdjectiveOptimizer.init;
export declare const type = "optimizer";
export default AdjectiveOptimizer;
