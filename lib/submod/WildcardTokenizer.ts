'use strict';

/**
 * 通配符識別模組
 * Wildcard Tokenizer Module
 *
 * 用於識別和處理文本中的通配符詞彙。
 * 通配符詞彙是指具有特殊模式或格式的詞，如縮寫、特殊符號組合等。
 *
 * Used to identify and process wildcard vocabulary in text.
 * Wildcard vocabulary refers to words with special patterns or formats,
 * such as abbreviations, special symbol combinations, etc.
 *
 * @author 老雷<leizongmin@gmail.com>
 */
import { ISubTokenizerCreate, SubSModuleTokenizer } from '../mod';
import { IDICT, IDICT2, IWord } from '../Segment';
import { IWordDebugInfo } from '../util/index';

/**
 * 通配符分詞器
 * Wildcard Tokenizer
 *
 * 繼承自 SubSModuleTokenizer，實現通配符詞彙的識別和分詞。
 * Extends SubSModuleTokenizer to implement wildcard vocabulary recognition and tokenization.
 */
export class WildcardTokenizer extends SubSModuleTokenizer
{
	/**
	 * 模組名稱
	 * Module Name
	 *
	 * @override
	 */
	override name = 'WildcardTokenizer';

	/**
	 * 通配符字典表
	 * Wildcard Dictionary Table
	 *
	 * 儲存通配符詞彙及其詞性標記。
	 * Stores wildcard vocabulary and their POS tags.
	 *
	 * @override
	 */
	protected override _TABLE: IDICT<IWord>;

	/**
	 * 二級通配符字典表
	 * Secondary Wildcard Dictionary Table
	 *
	 * 按長度分組的通配符詞彙查找表，用於優化匹配效率。
	 * Wildcard vocabulary lookup table grouped by length for optimized matching.
	 */
	protected _TABLE2: IDICT2<IWord>;

	/**
	 * 初始化快取
	 * Initialize Cache
	 *
	 * 載入通配符字典表。
	 * Loads wildcard dictionary tables.
	 *
	 * @override
	 */
	override _cache(): void
	{
		super._cache();
		// 載入通配符字典 / Load wildcard dictionary
		this._TABLE = this.segment.getDict('WILDCARD');
		// 載入二級通配符字典 / Load secondary wildcard dictionary
		this._TABLE2 = this.segment.getDict('WILDCARD2');
	}

	/**
	 * 對未識別的單詞進行分詞
	 * Split Unrecognized Words
	 *
	 * 使用通配符匹配方法處理未識別的詞語。
	 * Processes unrecognized words using wildcard matching method.
	 *
	 * @param {IWord[]} words - 單詞陣列 / Word array
	 * @returns {IWord[]} 分詞後的單詞陣列 / Tokenized word array
	 */
	split(words: IWord[]): IWord[]
	{
		//return this._splitUnknow(words, this.splitForeign);
		return this._splitUnknow(words, this.splitWildcard);
	}

	/**
	 * 建立通配符詞語標記
	 * Create Wildcard Token
	 *
	 * 為匹配到的通配符詞彙建立詞語物件。
	 * Creates word object for matched wildcard vocabulary.
	 *
	 * @param {IWord} word - 詞語資訊 / Word information
	 * @param {number} [lasttype] - 上一個詞的類型 / Previous word type
	 * @param {IWordDebugInfo} [attr] - 除錯資訊 / Debug information
	 * @returns {IWord} 詞語標記物件 / Word token object
	 */
	createWildcardToken(word: IWord, lasttype?: number, attr?: IWordDebugInfo): IWord
	{
		let nw = this.createToken<IWord>(word, true, attr);

		return nw;
	}

	/**
	 * 通配符切分
	 * Split Wildcard
	 *
	 * 將文本切分為通配符詞彙和其他部分。
	 * 匹配到的通配符詞彙會被標記詞性，其他部分保持未識別狀態。
	 *
	 * Splits text into wildcard vocabulary and other parts.
	 * Matched wildcard vocabulary will be tagged with POS, other parts remain unrecognized.
	 *
	 * @param {string} text - 要切分的文本 / Text to split
	 * @param {number} [cur] - 開始位置 / Start position
	 * @returns {IWord[] | undefined} 切分後的詞語陣列，若無匹配則返回 undefined / Split word array, or undefined if no match
	 */
	splitWildcard(text: string, cur?: number): IWord[]
	{
		//const POSTAG = this._POSTAG;
		const TABLE = this._TABLE;

		let ret: IWord[] = [];
		let self = this;

		// 分離出已識別的單詞
		// Extract recognized words
		let wordinfo = self.matchWord(text);
		if (wordinfo.length)
		{
			let lastc = 0;
			for (let ui = 0, bw; bw = wordinfo[ui]; ui++)
			{
				// 添加匹配詞之前的未識別文字
				// Add unrecognized text before matched word
				if (bw.c > lastc)
				{
					ret.push({
						w: text.substr(lastc, bw.c - lastc),
					});
				}

				// 建立通配符詞語標記
				// Create wildcard token
				let nw = self.createWildcardToken({
					w: bw.w,
					// 從字典取得詞性標記（不區分大小寫）
					// Get POS tag from dictionary (case-insensitive)
					p: TABLE[bw.w.toLowerCase()]?.p,
				});

				ret.push(nw);

				lastc = bw.c + bw.w.length;
			}

			// 添加最後一個匹配詞之後的剩餘文字
			// Add remaining text after the last matched word
			let lastword = wordinfo[wordinfo.length - 1];
			if (lastword.c + lastword.w.length < text.length)
			{
				ret.push({
					w: text.substr(lastword.c + lastword.w.length),
				});
			}
		}

		return ret.length ? ret : undefined;
	}

	/**
	 * 匹配單詞，返回相關資訊
	 * Match Words and Return Information
	 *
	 * 掃描文本中的通配符詞彙，返回所有匹配的詞及其位置資訊。
	 * 使用二級字典優化匹配效率，按長度分組查找。
	 *
	 * Scans text for wildcard vocabulary and returns all matched words with their position info.
	 * Uses secondary dictionary for optimized matching efficiency, grouped by length.
	 *
	 * @param {string} text - 文本 / Text
	 * @param {number} [cur] - 開始位置 / Start position
	 * @returns {IWord[]} 返回格式 {w: '單詞', c: 開始位置} / Format: {w: 'word', c: start position}
	 */
	matchWord(text: string, cur?: number): IWord[]
	{
		//const POSTAG = this._POSTAG;
		const TABLE = this._TABLE2;

		// 處理起始位置參數 / Handle start position parameter
		if (isNaN(cur)) cur = 0;

		let ret: IWord[] = [];
		//let self = this;

		let s = false;

		// 匹配可能出現的單詞，取長度最大的那個
		// Match possible words, take the longest one
		// 轉換為小寫進行不區分大小寫的匹配
		// Convert to lowercase for case-insensitive matching
		let lowertext = text.toLowerCase();

		while (cur < text.length)
		{
			let stopword: IWord = null;
			// 遍歷不同長度的字典 / Iterate through dictionaries of different lengths
			for (let i in TABLE)
			{
				// 檢查當前位置是否有匹配 / Check if there's a match at current position
				if (lowertext.substr(cur, i as any) in TABLE[i])
				{
					stopword = {
						// 保留原始大小寫 / Preserve original case
						w: text.substr(cur, i as any),
						c: cur,
					};
				}
			}

			if (stopword !== null)
			{
				ret.push(stopword);
				cur += stopword.w.length;
			}
			else
			{
				cur++;
			}
		}

		return ret;
	}

}

export const init = WildcardTokenizer.init.bind(WildcardTokenizer) as ISubTokenizerCreate<WildcardTokenizer>;

export const type = WildcardTokenizer.type;

export default WildcardTokenizer;
