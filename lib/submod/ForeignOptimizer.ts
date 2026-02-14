/**
 * 外文字元優化模組
 * Foreign Character Optimizer Module
 *
 * Created by user on 2018/8/18/018.
 */

import { SubSModuleOptimizer } from '../mod';
import { IDICT, IWord } from '../Segment';
import { IWordDebug } from '../util';

/**
 * 外文字元優化器
 * Foreign Character Optimizer
 *
 * 掃描分詞結果，將連續的外文字元（如英文單詞）合併。
 * 主要功能：
 * - 檢查相鄰的外文字元是否在字典中存在組合詞
 * - 如果存在則合併為一個詞並更新詞性標記
 *
 * Scans segmentation results and merges consecutive foreign characters (like English words).
 * Main features:
 * - Check if adjacent foreign characters have combined words in dictionary
 * - If exists, merge into one word and update POS tag
 */
export class ForeignOptimizer extends SubSModuleOptimizer
{
	/**
	 * 模組名稱
	 * Module Name
	 *
	 * @override
	 */
	override name = 'ForeignOptimizer';

	/**
	 * 字典查找表
	 * Dictionary Lookup Table
	 *
	 * 用於查找組合詞的詞性和權重資訊。
	 * Used to lookup POS and weight information for combined words.
	 *
	 * @override
	 */
	protected override _TABLE: IDICT<IWord>;

	/**
	 * 初始化快取
	 * Initialize Cache
	 *
	 * 載入字典表和詞性標記定義。
	 * Loads dictionary table and POS tag definitions.
	 *
	 * @override
	 */
	override _cache(): void
	{
		super._cache();

		// 取得字典表 / Get dictionary table
		this._TABLE = this.segment.getDict('TABLE');
		// 取得詞性標記定義 / Get POS tag definitions
		this._POSTAG = this.segment.POSTAG;
	}

	/**
	 * 執行外文字元優化
	 * Perform Foreign Character Optimization
	 *
	 * 掃描詞語陣列，檢查相鄰的外文字元是否可以合併。
	 * 處理邏輯：
	 * - 找到外文字元（詞性為 A_NX）
	 * - 檢查與下一個詞的組合是否存在於字典中
	 * - 如果存在則合併並更新詞性
	 *
	 * Scans word array and checks if adjacent foreign characters can be merged.
	 * Processing logic:
	 * - Find foreign characters (POS is A_NX)
	 * - Check if combination with next word exists in dictionary
	 * - If exists, merge and update POS
	 *
	 * @override
	 * @template T - 詞語類型 / Word type
	 * @param {T[]} words - 詞語陣列 / Word array
	 * @returns {T[]} 優化後的詞語陣列 / Optimized word array
	 */
	override doOptimize<T extends IWordDebug>(words: T[]): T[]
	{
		const self = this;
		const POSTAG = this._POSTAG;
		const TABLE = this._TABLE;

		let i = 0;
		let len = words.length - 1;

		while (i < len)
		{
			// 前一個詞 / Previous word
			let w0: IWordDebug = words[i - 1];
			// 當前詞 / Current word
			let w1: IWordDebug = words[i];
			// 下一個詞 / Next word
			let w2: IWordDebug = words[i + 1];

			// 如果不是外文字元，跳過
			// If not a foreign character, skip
			if (!(w1.p === POSTAG.A_NX))
			{
				i++;
				continue;
			}

			if (w2)
			{
				// 組合當前詞和下一個詞 / Combine current word and next word
				let nw: string = w1.w + w2.w;
				// 在字典中查找組合詞 / Lookup combined word in dictionary
				let mw: IWordDebug = TABLE[nw];

				if (mw)
				{
					// 建立新的合併詞物件 / Create new merged word object
					let new_w: IWordDebug = self.debugToken({
						...mw,
						w: nw,
						// 記錄原始詞語組成 / Record original word composition
						m: [w1, w2],
					}, {
						[this.name]: 1,
					}, true);

					// 在陣列中替換為合併後的詞 / Replace with merged word in array
					this.sliceToken(words, i, 2, new_w);

					// 更新陣列長度 / Update array length
					len--;
					continue;
				}
			}

			i++;
		}

		return words;
	}
}

export const init = ForeignOptimizer.init.bind(ForeignOptimizer) as typeof ForeignOptimizer.init;

export const type = ForeignOptimizer.type;

export default ForeignOptimizer;
