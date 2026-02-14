'use strict';

/**
 * 标点符号识别模块
 *
 * @author 老雷<leizongmin@gmail.com>
 */

import { SubSModuleTokenizer } from '../mod';
import { IWord } from '../Segment';
import { _STOPWORD, STOPWORD, STOPWORD2 } from '../mod/data/STOPWORD';

/**
 * 標點符號分詞器
 * Punctuation Tokenizer
 *
 * 專門用於識別和處理文本中的標點符號，將其從普通文字中分離出來。
 * 支援多種標點符號的匹配，並將其標記為特殊詞性（D_W）。
 *
 * Specialized for identifying and processing punctuation marks in text,
 * separating them from regular text. Supports various punctuation matching
 * and marks them as special part-of-speech (D_W).
 */
export class PunctuationTokenizer extends SubSModuleTokenizer
{
	/**
	 * 分詞器名稱
	 * Tokenizer Name
	 *
	 * 標識此分詞器模組的名稱，用於調試和日誌記錄。
	 * Identifies this tokenizer module name, used for debugging and logging.
	 */
	override name = 'PunctuationTokenizer';

	/**
	 * 停用詞數組
	 * Stopword Array
	 *
	 * 包含基本停用詞的數組，用於快速匹配常見標點符號。
	 * Contains basic stopword array for fast matching of common punctuation marks.
	 */
	public _STOPWORD = _STOPWORD;

	/**
	 * 停用詞映射表
	 * Stopword Mapping Table
	 *
	 * 一維映射表，將停用詞映射到其出現頻率或權重。
	 * One-dimensional mapping table that maps stopwords to their frequency or weight.
	 */
	public STOPWORD = STOPWORD;

	/**
	 * 二維停用詞映射表
	 * Two-dimensional Stopword Mapping Table
	 *
	 * 根據長度分類的停用詞映射表，優化標點符號匹配效能。
	 * Length-classified stopword mapping table for optimized punctuation matching performance.
	 */
	public STOPWORD2 = STOPWORD2;

	/**
	 * 對未識別的單詞進行分詞
	 * Segment unrecognized words
	 *
	 * 對於尚未被識別的單詞（word.p <= 0），嘗試識別其中的標點符號並進行分離。
	 * 將標點符號標記為 D_W 詞性，保留普通文字部分。
	 *
	 * For unrecognized words (word.p <= 0), attempts to identify and separate
	 * punctuation marks. Marks punctuation as D_W part-of-speech while
	 * preserving regular text parts.
	 *
	 * @param {IWord[]} words - 待分詞的單詞陣列 / Array of words to segment
	 * @returns {IWord[]} 分詞後的單詞陣列 / Array of segmented words
	 */
	split(words: IWord[]): IWord[]
	{
		const POSTAG = this._POSTAG;
		const self = this;

		let ret = [];
		// 迭代處理每個單詞
		// Iterate through each word
		for (let i = 0, word; word = words[i]; i++)
		{
			// 如果單詞已被識別（p > 0），直接加入結果
			// If word is already recognized (p > 0), add directly to result
			if (word.p > 0)
			{
				ret.push(word);
				continue;
			}
			
			// 僅對未識別的詞進行標點符號匹配
			// Only match punctuation for unrecognized words
			let stopinfo = self.matchStopword(word.w);
			if (stopinfo.length < 1)
			{
				ret.push(word);
				continue;
			}
			
			// 分離出標點符號並處理文字片段
			// Separate punctuation marks and process text fragments
			let lastc = 0;
			for (let ui = 0, sw; sw = stopinfo[ui]; ui++)
			{
				// 如果兩個標點符號之間有文字片段，則加入結果
				// Add text fragment between two punctuation marks if exists
				if (sw.c > lastc)
				{
					ret.push({
						w: word.w.substr(lastc, sw.c - lastc)
					});
				}

				// 將標點符號標記為 D_W 詞性並加入結果
				// Mark punctuation as D_W part-of-speech and add to result
				ret.push(self.debugToken({
					w: sw.w,
					p: POSTAG.D_W
				}, {
					[self.name]: true,
				}, true));

				lastc = sw.c + sw.w.length;
			}
			
			// 處理最後一個標點符號後的文字片段
			// Process text fragment after the last punctuation mark
			let lastsw = stopinfo[stopinfo.length - 1];
			if (lastsw.c + lastsw.w.length < word.w.length)
			{
				ret.push({
					w: word.w.substr(lastsw.c + lastsw.w.length)
				});
			}
		}
		return ret;
	}

	/**
	 * 匹配包含的標點符號，返回相關資訊
	 * Match contained punctuation marks, return related information
	 *
	 * 從指定位置開始掃描文本，識別並返回所有標點符號及其位置。
	 * 使用長度優先策略，先嘗試匹配較長的標點符號，再嘗試較短的。
	 *
	 * Scans text from specified position, identifies and returns all punctuation
	 * marks with their positions. Uses length-first strategy, attempting to
	 * match longer punctuation marks first, then shorter ones.
	 *
	 * @param {string} text - 要掃描的文本 / Text to scan
	 * @param {number} [cur] - 開始掃描的位置，預設為 0 / Starting scan position, defaults to 0
	 * @returns {IWord[]} 標點符號陣列，格式為 {w: '標點符號', c: 開始位置} / Array of punctuation marks in format {w: 'punctuation', c: start position}
	 */
	matchStopword(text: string, cur?: number): IWord[]
	{
		const STOPWORD2 = this.STOPWORD2;

		// 初始化起始位置，若未指定則從 0 開始
		// Initialize start position, start from 0 if not specified
		if (isNaN(cur)) cur = 0;
		let ret = [];
		let isMatch = false;
		
		// 逐字掃描文本直到結尾
		// Scan text character by character until end
		while (cur < text.length)
		{
			let w;
			// 根據長度嘗試匹配標點符號
			// Attempt to match punctuation marks by length
			for (let i in STOPWORD2)
			{
				// 取得當前長度的子字串進行匹配
				// Get substring of current length for matching
				w = text.substr(cur, i as any as number);
				if (w in STOPWORD2[i])
				{
					// 找到匹配的標點符號，記錄其內容和位置
					// Found matching punctuation mark, record its content and position
					ret.push({ w: w, c: cur });
					isMatch = true;
					break;
				}
			}
			
			// 根據是否找到匹配來移動指針
			// Move pointer based on whether match was found
			cur += isMatch === false ? 1 : w.length;
			isMatch = false;
		}

		return ret;
	}
}

// debug(STOPWORD2);

/**
 * 初始化函式
 * Initialization Function
 *
 * 綁定 PunctuationTokenizer 的初始化方法，用於建立新的實例。
 * Binds the initialization method of PunctuationTokenizer for creating new instances.
 */
export const init = PunctuationTokenizer.init.bind(PunctuationTokenizer) as typeof PunctuationTokenizer.init;

/**
 * 模組類型
 * Module Type
 *
 * 標識此模組的類型為分詞器 (tokenizer)。
 * Identifies this module type as tokenizer.
 */
export const type = PunctuationTokenizer.type;

/**
 * 預設導出
 * Default Export
 *
 * 導出 PunctuationTokenizer 類別，作為此模組的主要實現。
 * Exports the PunctuationTokenizer class as the main implementation of this module.
 */
export default PunctuationTokenizer;
