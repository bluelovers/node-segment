import { SubSModuleOptimizer } from '../mod';

import { COLOR_ALL, COLOR_HAIR } from '../mod/COLORS';
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
export class AdjectiveOptimizer extends SubSModuleOptimizer
{
	/**
	 * 模組名稱
	 * Module Name
	 *
	 * @override
	 */
	override name = 'AdjectiveOptimizer';

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
	override doOptimize(words: IWordDebug[]): IWordDebug[]
	{
		const POSTAG = this._POSTAG;
		let index = 0;

		while (index < words.length)
		{
			const word = words[index];
			const nextword = words[index + 1];

			if (nextword)
			{
				// 對於<顏色>+<的>，直接判斷顏色是形容詞（字典裡顏色都是名詞）
				// For <color> + <的>, directly mark color as adjective (colors are nouns in dictionary)
				if (nextword.p & POSTAG.D_U && COLOR_ALL[word.w])
				{
					// 保存原始詞性 / Save original POS
					word.op = word.op || word.p;
					// 添加形容詞標記 / Add adjective tag
					word.p |= POSTAG.D_A;

					this.debugToken(word, {
						[this.name]: true,
					});
				}

				// 如果是連續的兩個名詞，前一個是顏色，那這個顏色也是形容詞
				// If two consecutive nouns and the first is a color, mark the color as adjective too
				if (word.p & POSTAG.D_N && this.isNominal(nextword.p) && COLOR_ALL[word.w])
				{
					// 保存原始詞性 / Save original POS
					word.op = word.op || word.p;
					// 添加形容詞標記 / Add adjective tag
					word.p |= POSTAG.D_A;
					// 保留名詞標記 / Keep noun tag
					word.p |= POSTAG.D_N;

					this.debugToken(word, {
						[this.name]: true,
					});
				}

				// 處理「純」+ 髮色詞的情況，如「純金」、「純黑」
				// Handle "純/纯" + hair color word cases, like "純金", "純黑"
				if ((word.w === '純' || word.w === '纯') && COLOR_HAIR[nextword.w])
				{
					// 保存原始詞性 / Save original POS
					word.op = word.op || word.p;
					// 添加形容詞標記 / Add adjective tag
					word.p |= POSTAG.D_A;

					this.debugToken(word, {
						[this.name]: true,
					});
				}
			}

			// 移到下一個單詞
			// Move to next word
			index += 1;
		}

		return words;
	}

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
	isNominal(pos: number | number[]): boolean
	{
		/*
		if (Array.isArray(pos))
		{
			return this.isNominal(pos[0]);
		}
		*/

		const POSTAG = this._POSTAG;

		return (
			// 普通名詞 / Common noun
			pos === POSTAG.D_N ||
			// 時間詞 / Time word
			pos === POSTAG.A_NT ||
			// 外文字、西文字母 / Foreign word, Western letter
			pos === POSTAG.A_NX ||
			// 其他專名 / Other proper noun
			pos === POSTAG.A_NZ ||
			// 人名 / Person name
			pos === POSTAG.A_NR ||
			// 地名 / Place name
			pos === POSTAG.A_NS ||
			// URL 網址 / URL
			pos === POSTAG.URL
		);
	}
}

export const init = AdjectiveOptimizer.init.bind(AdjectiveOptimizer) as typeof AdjectiveOptimizer.init;

export const type = AdjectiveOptimizer.type;

export default AdjectiveOptimizer
