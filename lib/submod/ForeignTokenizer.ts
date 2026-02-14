'use strict';

/**
 * 外文字符、数字识别模块
 *
 * @author 老雷<leizongmin@gmail.com>
 */
import { ISubTokenizerCreate, SubSModuleTokenizer } from '../mod';
import { IWord } from '../Segment';
import { debugToken } from '../util/debug';
import { IWordDebugInfo } from '../util/index';

/**
 * 外文字元識別分詞器
 * Foreign Character Tokenizer
 *
 * 專門用於識別和處理文本中的外文字元（如英文、數字、阿拉伯文、俄文、希臘文等），
 * 將其從中文文本中分離出來並進行適當的詞性標註。
 * 支援全形與半形字元的轉換，以及字典查詢匹配。
 *
 * Specialized for identifying and processing foreign characters in text
 * (such as English, numbers, Arabic, Russian, Greek, etc.),
 * separating them from Chinese text and performing appropriate part-of-speech tagging.
 * Supports full-width and half-width character conversion, as well as dictionary lookup matching.
 */
export class ForeignTokenizer extends SubSModuleTokenizer
{
	/**
	 * 分詞器名稱
	 * Tokenizer Name
	 *
	 * 標識此分詞器模組的名稱，用於調試和日誌記錄。
	 * Identifies this tokenizer module name, used for debugging and logging.
	 */
	override name = 'ForeignTokenizer';

	/**
	 * 分詞用正則表達式（包含中文）
	 * Segmentation Regular Expression (Including Chinese)
	 *
	 * 用於將文本分割為中文和外文部分，包含中文字元的匹配模式。
	 * Used to split text into Chinese and foreign parts, including Chinese character matching patterns.
	 */
	_REGEXP_SPLIT_1: RegExp;

	/**
	 * 分詞用正則表達式（不包含中文的全詞符合）
	 * Segmentation Regular Expression (Full Word Match Without Chinese)
	 *
	 * 用於檢測文本中是否符合外文字元模式，不包含中文字元的匹配。
	 * Used to detect if text matches foreign character patterns, without Chinese character matching.
	 */
	_REGEXP_SPLIT_2: RegExp;

	/**
	 * 快取初始化方法
	 * Cache Initialization Method
	 *
	 * 初始化分詞器所需的正則表達式和字典引用。
	 * 構建用於匹配各種外文字元的正則表達式，包括：
	 * - 數字（含全形數字）
	 * - 英文字母（含全形字母）
	 * - 阿拉伯文
	 * - 俄文（西里爾字母）
	 * - 希臘文
	 *
	 * Initializes the regular expressions and dictionary references required by the tokenizer.
	 * Builds regular expressions for matching various foreign characters, including:
	 * - Numbers (including full-width numbers)
	 * - English letters (including full-width letters)
	 * - Arabic
	 * - Russian (Cyrillic)
	 * - Greek
	 */
	override _cache()
	{
		super._cache();
		this._TABLE = this.segment.getDict('TABLE');

		// 定義各種外文字元的匹配模式
		// Define matching patterns for various foreign characters
		let arr = [
			// 數字 / Numbers
			/[\d０-９]+(?:,[\d０-９]+)?(?:\.[\d０-９]+)?/,
			// 英文及擴展拉丁字母 / English and extended Latin
			/[\w０-９Ａ-Ｚａ-ｚ\u0100-\u017F\u00A1-\u00FF]+/,
			// 阿拉伯文 / Arabic
			/[\u0600-\u06FF\u0750-\u077F]+/,
			// 俄文（西里爾字母）/ Russian (Cyrillic)
			/[\u0400-\u04FF]+/,
			// 希臘文 / Greek
			// https://unicode-table.com/cn/blocks/greek-coptic/
			/[\u0370-\u03FF]+/,
		];

		// 構建包含中文的分詞正則表達式
		// Build segmentation regex including Chinese
		this._REGEXP_SPLIT_1 = new RegExp('(' +_join([
			// 中文字元 / Chinese characters
			/[\u4E00-\u9FFF]+/,
		].concat(arr)) + ')', 'iu');

		// 構建不包含中文的分詞正則表達式
		// Build segmentation regex without Chinese
		this._REGEXP_SPLIT_2 = new RegExp('(' +_join(arr) + ')', 'iu');

		/**
		 * 將正則表達式陣列轉換為字串並以 | 連接
		 * Convert regex array to string and join with |
		 *
		 * @param arr - 正則表達式或字串陣列 / Array of regex or strings
		 * @returns 合併後的字串 / Merged string
		 */
		function _join(arr: Array<string | RegExp>)
		{
			return arr.reduce(function (a, b)
			{
				if (b instanceof RegExp)
				{
					a.push(b.source);
				}
				else
				{
					a.push(b);
				}

				return a;
			}, []).join('|')
		}
	}

	/**
	 * 對未識別的單詞進行分詞
	 * Segment unrecognized words
	 *
	 * 對於尚未被識別的單詞，使用外文分詞方法進行處理。
	 * 目前預設使用 splitForeign2 方法，提供更精確的外文識別。
	 *
	 * For unrecognized words, processes them using foreign text segmentation method.
	 * Currently defaults to splitForeign2 method for more accurate foreign text recognition.
	 *
	 * @param {IWord[]} words - 待分詞的單詞陣列 / Array of words to segment
	 * @returns {IWord[]} 分詞後的單詞陣列 / Array of segmented words
	 */
	split(words: IWord[]): IWord[]
	{
		//return this._splitUnknow(words, this.splitForeign);
		return this._splitUnknow(words, this.splitForeign2);

		/*
		const POSTAG = this.segment.POSTAG;

		let ret = [];
		for (let i = 0, word; word = words[i]; i++)
		{
			if (word.p)
			{
				ret.push(word);
			}
			else
			{
				// 仅对未识别的词进行匹配
				ret = ret.concat(this.splitForeign(word.w));
			}
		}
		return ret;
		*/
	}

	/**
	 * 支援更多外文判定（但可能會降低效率）
	 * Support more foreign text recognition (may reduce efficiency)
	 *
	 * 使用正則表達式將文本分割為多個片段，然後對每個片段進行詞性標註。
	 * 避免誤切割包含變音符號的外文，例如 latīna、Русский。
	 *
	 * Uses regular expressions to split text into multiple segments,
	 * then performs part-of-speech tagging on each segment.
	 * Avoids incorrect splitting of foreign text with diacritics, e.g., latīna, Русский.
	 *
	 * @param {string} text - 要分詞的文本 / Text to segment
	 * @param {number} [cur] - 開始位置（未使用）/ Starting position (unused)
	 * @returns {IWord[] | undefined} 分詞後的單詞陣列，若無結果則返回 undefined / Array of segmented words, or undefined if no results
	 */
	splitForeign2(text: string, cur?: number): IWord[]
	{
		const POSTAG = this.segment.POSTAG;
		const TABLE = this._TABLE;

		//console.time('splitForeign2');

		let ret: IWord[] = [];
		let self = this;

		// 使用正則表達式分割文本
		// Split text using regular expression
		let ls = text
			.split(this._REGEXP_SPLIT_1)
		;

		// 迭代處理每個分割片段
		// Iterate through each split segment
		for (let w of ls)
		{
			if (w !== '')
			{
				// 檢查是否為外文字元
				// Check if it's a foreign character
				if (this._REGEXP_SPLIT_2.test(w))
				{
					// 嘗試從字典中查找
					// Try to find in dictionary
					let cw = TABLE[w];

					if (cw)
					{
						// 字典中存在，使用字典資訊建立詞元
						// Found in dictionary, create token using dictionary info
						let nw = this.createRawToken({
							w,
						}, cw, {
							[self.name]: 1,
						});

						ret.push(nw);
						continue;
					}

					/**
					 * 當分詞不存在於字典中時
					 * 則再度分詞一次
					 *
					 * When the word is not in dictionary,
					 * perform segmentation again
					 */
					let ls2 = w
						.split(/([\d+０-９]+)/)
					;

					// 處理子片段
					// Process sub-segments
					for (let w of ls2)
					{
						if (w === '')
						{
							continue;
						}

						let lasttype = 0;

						// 取得第一個字元的 Unicode 編碼
						// Get Unicode code of first character
						let c = w.charCodeAt(0);
						// 全形數字或字母轉換為半形
						// Convert full-width numbers or letters to half-width
						if (c >= 65296 && c <= 65370) c -= 65248;

						// 判斷字元類型
						// Determine character type
						if (c >= 48 && c <= 57)
						{
							// 數字 / Number
							lasttype = POSTAG.A_M;
						}// 字母 lasttype = POSTAG.A_NX
						else if ((c >= 65 && c <= 90) || (c >= 97 && c <= 122))
						{
							// 英文字母 / English letter
							lasttype = POSTAG.A_NX;
						}
						else
						{
							// 未知類型 / Unknown type
							lasttype = POSTAG.UNK;
						}

						// 如果是英文字母，嘗試從字典查找
						// If English letter, try to find in dictionary
						if (lasttype === POSTAG.A_NX)
						{
							let cw = TABLE[w];

							if (cw)
							{
								let nw = this.createRawToken({
									w,
								}, cw, {
									[self.name]: 2,
								});

								ret.push(nw);
								continue;
							}
						}

						// 建立詞元並加入結果
						// Create token and add to result
						ret.push(self.debugToken({
							w: w,
							p: lasttype || undefined,
						}, {
							[self.name]: 3,
						}, true));
					}
				}
				else
				{
					// 非外文字元，直接加入結果
					// Non-foreign character, add directly to result
					ret.push({
						w,
					});
				}
			}
		}

		//console.timeEnd('splitForeign2');

		//console.log(ret);

		return ret.length ? ret : undefined;
	}

	/**
	 * 匹配包含的英文字元和數字，並分割
	 * Match contained English characters and numbers, then split
	 *
	 * 使用字元類型掃描方法，逐字判斷字元類型（數字、字母、其他），
	 * 將連續相同類型的字元組合成單詞。
	 * 支援全形字元到半形字元的轉換。
	 *
	 * Uses character type scanning method, determining character type (number, letter, other)
	 * character by character, combining consecutive characters of the same type into words.
	 * Supports full-width to half-width character conversion.
	 *
	 * @param {string} text - 要分詞的文本 / Text to segment
	 * @param {number} [cur] - 開始位置，預設為 0 / Starting position, defaults to 0
	 * @returns {IWord[]} 分詞後的單詞陣列 / Array of segmented words
	 */
	splitForeign(text: string, cur?: number): IWord[]
	{
		const POSTAG = this.segment.POSTAG;
		const TABLE = this._TABLE;

		//console.time('splitForeign');

		if (isNaN(cur)) cur = 0;
		let ret = [];

		// 取第一个字符的ASCII码
		let lastcur = 0;
		let lasttype = 0;
		let c = text.charCodeAt(0);
		// 全角数字或字母
		if (c >= 65296 && c <= 65370) c -= 65248;
		// 数字  lasttype = POSTAG.A_M
		if (c >= 48 && c <= 57)
		{
			lasttype = POSTAG.A_M;
		}// 字母 lasttype = POSTAG.A_NX
		else if ((c >= 65 && c <= 90) || (c >= 97 && c <= 122))
		{
			lasttype = POSTAG.A_NX;
		}
		else
		{
			lasttype = POSTAG.UNK;
		}

		let i: number;

		for (i = 1; i < text.length; i++)
		{
			let c = text.charCodeAt(i);
			// 全角数字或字母
			if (c >= 65296 && c <= 65370) c -= 65248;
			// 数字  lasttype = POSTAG.A_M
			if (c >= 48 && c <= 57)
			{
				if (lasttype !== POSTAG.A_M)
				{
					let nw = this.createForeignToken({
						w: text.substr(lastcur, i - lastcur),
					}, lasttype, {
						[this.name]: 1,
					});
					//let nw = { w: text.substr(lastcur, i - lastcur) } as IWord;

					//if (lasttype !== POSTAG.UNK) nw.p = lasttype;
					ret.push(nw);
					lastcur = i;
				}
				lasttype = POSTAG.A_M;
			}
			else if ((c >= 65 && c <= 90) || (c >= 97 && c <= 122))
			{
				// 字母 lasttype = POSTAG.A_NX
				if (lasttype !== POSTAG.A_NX)
				{
					//let nw = { w: text.substr(lastcur, i - lastcur) } as IWord;

					let nw = this.createRawToken({
						w: text.substr(lastcur, i - lastcur),
					}, {
						p: lasttype
					}, {
						[this.name]: 2,
					});

					//if (lasttype !== POSTAG.UNK) nw.p = lasttype;
					ret.push(nw);
					lastcur = i;
				}
				lasttype = POSTAG.A_NX;
			}
			else
			{
				// 其他
				if (lasttype !== POSTAG.UNK)
				{
					let nw = this.createForeignToken({
						w: text.substr(lastcur, i - lastcur),
						p: lasttype
					}, undefined, {
						[this.name]: 3,
					});

					ret.push(nw);
					lastcur = i;
				}
				lasttype = POSTAG.UNK;
			}
		}
		// 剩余部分
		//let nw = { w: text.substr(lastcur, i - lastcur) } as IWord;

		let nw = this.createRawToken<IWord>({
			w: text.substr(lastcur, i - lastcur),
		});

		if (lasttype !== POSTAG.UNK) nw.p = lasttype;
		ret.push(nw);

		//console.timeEnd('splitForeign');

		//debug(ret);
		return ret;
	}

	/**
	 * 建立外文詞元
	 * Create Foreign Token
	 *
	 * 建立外文單詞的詞元物件，並嘗試從字典中查找對應資訊。
	 * 如果字典中存在該單詞，則合併其詞性標註。
	 *
	 * Creates a token object for foreign words and attempts to find corresponding info in dictionary.
	 * If the word exists in dictionary, merges its part-of-speech tagging.
	 *
	 * @param {IWord} word - 基礎詞元物件 / Base token object
	 * @param {number} [lasttype] - 前一個字元類型 / Previous character type
	 * @param {IWordDebugInfo} [attr] - 除錯屬性 / Debug attributes
	 * @returns {IWord} 建立的詞元物件 / Created token object
	 */
	createForeignToken(word: IWord, lasttype?: number, attr?: IWordDebugInfo)
	{
		let nw = this.createToken<IWord>(word, true, attr);

		// 嘗試從字典中查找
		// Try to find in dictionary
		let ow = this._TABLE[nw.w];

		if (ow)
		{
			// 記錄來源資訊用於除錯
			// Record source info for debugging
			debugToken(nw, {
				_source: ow,
			});

			// 合併詞性標註
			// Merge part-of-speech tagging
			nw.p = nw.p | ow.p;
		}

		// 如果有指定類型且不是未知類型，則合併詞性
		// If type is specified and not unknown, merge part-of-speech
		if (lasttype && lasttype !== this._POSTAG.UNK)
		{
			nw.p = lasttype | nw.p;
		}

		return nw;
	}
}

/**
 * 初始化函式
 * Initialization Function
 *
 * 綁定 ForeignTokenizer 的初始化方法，用於建立新的實例。
 * Binds the initialization method of ForeignTokenizer for creating new instances.
 */
export const init = ForeignTokenizer.init.bind(ForeignTokenizer) as ISubTokenizerCreate<ForeignTokenizer>;

/**
 * 模組類型
 * Module Type
 *
 * 標識此模組的類型為分詞器 (tokenizer)。
 * Identifies this module type as tokenizer.
 */
export const type = ForeignTokenizer.type;

/**
 * 預設導出
 * Default Export
 *
 * 導出 ForeignTokenizer 類別，作為此模組的主要實現。
 * Exports the ForeignTokenizer class as the main implementation of this module.
 */
export default ForeignTokenizer;

//debug(splitForeign('ad222经济核算123非'));
