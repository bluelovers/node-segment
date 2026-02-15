/**
 * 詞語分割模組
 * Word Split Module
 *
 * 根據指定詞語或詞性分割詞語陣列。
 * Splits word array based on specified word or part of speech.
 */

import { IWord } from '@novel-segment/types';

/**
 * 根據某個單詞或詞性來分割單詞陣列
 * Split Word Array by Word or Part of Speech
 *
 * 將分詞結果根據指定的單詞或詞性進行分割。
 * 若傳入字串，則按詞語內容分割；若傳入數字，則按詞性標記分割。
 *
 * Splits segmentation results by the specified word or part of speech.
 * If a string is passed, splits by word content; if a number is passed, splits by part of speech tag.
 *
 * @param {IWord[]} words - 單詞陣列 / Word array
 * @param {string | number} s - 用於分割的單詞或詞性 / Word or part of speech to split by
 * @param {...any} argv - 其他參數 / Additional arguments
 * @returns {IWord[]} 分割後的單詞陣列（二維陣列）/ Split word array (two-dimensional array)
 *
 * @example
 * ```typescript
 * const words = [
 *   { w: '我', p: 0 },
 *   { w: '，', p: 0 },
 *   { w: '愛', p: 0 },
 *   { w: '你', p: 0 }
 * ];
 *
 * // 按逗號分割 / Split by comma
 * const result = split(words, '，');
 * // 返回: [[{w:'我',p:0}], [{w:'，',p:0}], [{w:'愛',p:0},{w:'你',p:0}]]
 * ```
 */
export function split(words: IWord[], s: string | number, ...argv): IWord[]
{
	let ret = [];
	let lasti = 0;
	let i = 0;

	// 判斷搜尋欄位：字串搜尋 'w'，數字搜尋 'p'
	// Determine search field: string searches 'w', number searches 'p'
	let f = typeof s === 'string' ? 'w' : 'p';

	// 遍歷詞語陣列 / Iterate through word array
	while (i < words.length)
	{
		if (words[i][f] === s)
		{
			// 將分割點之前的詞語加入結果 / Add words before split point to result
			if (lasti < i) ret.push(words.slice(lasti, i));
			// 將分割點本身加入結果 / Add the split point itself to result
			ret.push(words.slice(i, i + 1));
			i++;
			lasti = i;
		}
		else
		{
			i++;
		}
	}

	// 將剩餘的詞語加入結果 / Add remaining words to result
	if (lasti < words.length - 1)
	{
		ret.push(words.slice(lasti, words.length));
	}

	words = undefined;

	return ret;
}
