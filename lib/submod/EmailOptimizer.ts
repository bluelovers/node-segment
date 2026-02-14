'use strict';

import { ISubOptimizerCreate, SubSModuleOptimizer } from '../mod';
import { IDICT, IWord } from '../Segment';

/**
 * 郵箱地址中允許出現的字元
 * Characters Allowed in Email Addresses
 *
 * 參考 / Reference: http://www.cs.tut.fi/~jkorpela/rfc/822addr.html
 */
export const _EMAILCHAR = '!"#$%&\'*+-/0123456789=?@ABCDEFGHIJKLMNOPQRSTUVWXYZ^_`abcdefghijklmnopqrstuvwxyz{|}~.'.split('');

/**
 * 郵箱地址字元查找表
 * Email Address Character Lookup Table
 *
 * 用於快速判斷某個字元是否為郵箱地址允許的字元。
 * Used to quickly determine if a character is allowed in email addresses.
 */
export const EMAILCHAR: IDICT<number> = {};
for (let i in _EMAILCHAR) EMAILCHAR[_EMAILCHAR[i]] = 1;

/**
 * 郵箱地址識別優化模組
 * Email Address Recognition Optimizer Module
 *
 * 掃描分詞結果，將分散的郵箱地址片段合併為完整的郵箱地址。
 * 主要處理流程：
 * 1. 尋找郵箱地址的起始位置（外文字元或數字）
 * 2. 尋找 @ 符號
 * 3. 尋找郵箱地址的結束位置
 * 4. 將片段合併並標記為 URL 類型
 *
 * Scans segmentation results and merges scattered email address fragments
 * into complete email addresses.
 * Main processing flow:
 * 1. Find email address start position (foreign characters or numbers)
 * 2. Find @ symbol
 * 3. Find email address end position
 * 4. Merge fragments and mark as URL type
 *
 * @author 老雷<leizongmin@gmail.com>
 */
export class EmailOptimizer extends SubSModuleOptimizer
{
	/**
	 * 對可能是郵箱地址的單詞進行優化
	 * Optimize Words That May Be Email Addresses
	 *
	 * 掃描單詞陣列，識別並合併郵箱地址片段。
	 * 郵箱地址格式：local-part@domain
	 *
	 * Scans word array to identify and merge email address fragments.
	 * Email address format: local-part@domain
	 *
	 * @param {IWord[]} words - 單詞陣列 / Word array
	 * @returns {IWord[]} 優化後的單詞陣列 / Optimized word array
	 */
	override doOptimize(words: IWord[]): IWord[]
	{
		const POSTAG = this.segment.POSTAG;
		//debug(words);

		let i = 0;
		let ie = words.length - 1;
		// 郵箱地址起始位置 / Email address start position
		let addr_start: boolean | number = false;
		// 是否已遇到 @ 符號 / Whether @ symbol has been encountered
		let has_at = false;

		while (i < ie)
		{
			let word = words[i];
			// 判斷是否為 ASCII 字元（外文字元或數字）
			// Check if it's an ASCII character (foreign character or number)
			let is_ascii = ((word.p === POSTAG.A_NX) ||
				(word.p === POSTAG.A_M && word.w.charCodeAt(0) < 128))
				? true : false;

			// 如果是外文字元或者數字，符合電子郵件地址開頭的條件
			// If it's a foreign character or number, it meets email address start condition
			// @ts-ignore
			if (addr_start === false && is_ascii)
			{
				addr_start = i;
				i++;
				continue;
			}
			else
			{
				// 如果遇到@符號，符合第二個條件
				// If @ symbol is encountered, it meets the second condition
				if (has_at === false && word.w === '@')
				{
					has_at = true;
					i++;
					continue;
				}

			// 如果已經遇到過@符號，且出現了其他字元，則截取郵箱地址
			// If @ has been encountered and other characters appear, extract email address
			if (has_at !== false && words[i - 1].w !== '@' && is_ascii === false && !(word.w in EMAILCHAR))
			{
				let mailws = words.slice(addr_start as number, i);
				//debug(toEmailAddress(mailws));
				words.splice(addr_start as number, mailws.length, {
					w: this.toEmailAddress(mailws),
					p: POSTAG.URL
				});
				i = (addr_start as number) + 1;
				ie -= mailws.length - 1;
				addr_start = false;
				has_at = false;
				continue;
			}

				// 如果已經開頭
				// If already started
				if (addr_start !== false && (is_ascii || word.w in EMAILCHAR))
				{
					i++;
					continue;
				}
			}

			// 移到下一個詞
			// Move to next word
			addr_start = false;
			has_at = false;
			i++;
		}

		// 檢查剩餘部分
		// Check remaining part
		if (addr_start && has_at && words[ie])
		{
			let word = words[ie];
			let is_ascii = ((word.p === POSTAG.A_NX) ||
				(word.p === POSTAG.A_M && word.w in EMAILCHAR))
				? true : false;
			if (is_ascii)
			{
				let mailws = words.slice(addr_start as number, words.length);
				//debug(toEmailAddress(mailws));
				words.splice(addr_start as number, mailws.length, {
					w: this.toEmailAddress(mailws),
					p: POSTAG.URL
				});
			}
		}

		return words;
	}

	/**
	 * 根據一組單詞生成郵箱地址
	 * Generate Email Address from Word Array
	 *
	 * 將單詞陣列連接成完整的郵箱地址字串。
	 * Concatenates word array into a complete email address string.
	 *
	 * @param {IWord[]} words - 單詞陣列 / Word array
	 * @returns {string} 郵箱地址 / Email address
	 */
	toEmailAddress(words: IWord[]): string
	{
		let ret = words[0].w;
		for (let i = 1, word; word = words[i]; i++)
		{
			ret += word.w;
		}
		return ret;
	}

}

export const init = EmailOptimizer.init.bind(EmailOptimizer) as ISubOptimizerCreate<EmailOptimizer>;

export const type = EmailOptimizer.type;

export default EmailOptimizer;
