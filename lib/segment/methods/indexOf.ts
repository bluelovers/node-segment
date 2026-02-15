/**
 * 詞語索引搜尋模組
 * Word Index Search Module
 *
 * 在分詞結果中搜尋指定詞語或詞性的位置。
 * Searches for the position of a specified word or part of speech in segmentation results.
 */

import { IWord } from '@novel-segment/types';

/**
 * 在單詞陣列中查找某個單詞或詞性所在的位置
 * Find Position of Word or Part of Speech in Word Array
 *
 * 搜尋分詞結果中指定單詞或詞性的位置。
 * 若傳入字串，則搜尋詞語內容；若傳入數字，則搜尋詞性標記。
 *
 * Searches for the position of a specified word or part of speech in segmentation results.
 * If a string is passed, searches for word content; if a number is passed, searches for part of speech tag.
 *
 * @param {IWord[]} words - 單詞陣列 / Word array
 * @param {string | number} s - 要查找的單詞或詞性 / Word or part of speech to find
 * @param {number} [cur] - 開始位置 / Starting position
 * @param {...any} argv - 其他參數 / Additional arguments
 * @returns {number} 找到的索引位置，找不到則返回 -1 / Found index position, returns -1 if not found
 *
 * @example
 * ```typescript
 * const words = [{ w: '我', p: 0 }, { w: '愛', p: 0 }, { w: '你', p: 0 }];
 *
 * // 搜尋詞語 / Search for word
 * indexOf(words, '愛'); // 返回 1 / Returns 1
 *
 * // 搜尋詞性 / Search for part of speech
 * indexOf(words, 0x400000); // 返回 -1（若無此詞性）/ Returns -1 (if no such POS)
 * ```
 */
export function indexOf(words: IWord[], s: string | number, cur?: number, ...argv)
{
	// 處理無效的開始位置 / Handle invalid starting position
	cur = isNaN(cur) ? 0 : cur;

	// 判斷搜尋欄位：字串搜尋 'w'，數字搜尋 'p'
	// Determine search field: string searches 'w', number searches 'p'
	let f = typeof s === 'string' ? 'w' : 'p';

	// 線性搜尋 / Linear search
	while (cur < words.length)
	{
		if (words[cur][f] === s) return cur;
		cur++;
	}

	return -1;
}
