/**
 * 同義詞轉換模組
 * Synonym Conversion Module
 *
 * 將分詞結果中的詞語轉換為其標準同義詞。
 * Converts words in segmentation results to their standard synonyms.
 */

import deepmerge from 'deepmerge-plus/core';
import { debugToken, IWordDebug } from '../../util/debug';
import { IDICT, IDICT_SYNONYM } from '../types';
import { ITSOverwrite } from 'ts-type';
import { POSTAG } from '@novel-segment/postag/lib/postag/ids';
import { IWord } from '@novel-segment/types';

/**
 * 同義詞轉換選項介面
 * Synonym Conversion Options Interface
 */
interface IOptions
{
	/**
	 * 是否顯示轉換計數（用於除錯）
	 * Whether to show conversion count (for debugging)
	 */
	showcount?: boolean,

	/**
	 * 同義詞字典
	 * Synonym Dictionary
	 */
	DICT_SYNONYM: IDICT_SYNONYM,

	/**
	 * 主字典表格
	 * Main Dictionary Table
	 */
	DICT_TABLE: IDICT<IWord>,

	/**
	 * 詞性標記
	 * Part of Speech Tags
	 */
	POSTAG: typeof POSTAG,
}

/**
 * 帶計數的同義詞轉換結果介面
 * Synonym Conversion Result with Count Interface
 */
export interface IConvertSynonymWithShowcount
{
	/**
	 * 轉換次數
	 * Conversion count
	 */
	count: number,

	/**
	 * 轉換後的詞語列表
	 * Converted word list
	 */
	list: IWordDebug[],
}

/**
 * 轉換同義詞（帶計數）
 * Convert Synonyms (with Count)
 *
 * 將分詞結果中的詞語轉換為其標準同義詞，並返回轉換計數。
 * Converts words in segmentation results to their standard synonyms and returns conversion count.
 *
 * @param {IWordDebug[]} ret - 分詞結果陣列 / Segmentation result array
 * @param {Object} options - 轉換選項 / Conversion options
 * @param {true} options.showcount - 必須為 true 以啟用計數 / Must be true to enable counting
 * @returns {Object} 包含計數與列表的物件 / Object containing count and list
 */
export function convertSynonym(ret: IWordDebug[], options: ITSOverwrite<IOptions, {
	showcount: true,
}>): {
	count: number,
	list: IWordDebug[],
}

/**
 * 轉換同義詞
 * Convert Synonyms
 *
 * 將分詞結果中的詞語轉換為其標準同義詞。
 * Converts words in segmentation results to their standard synonyms.
 *
 * @param {IWordDebug[]} ret - 分詞結果陣列 / Segmentation result array
 * @param {IOptions} [options] - 轉換選項 / Conversion options
 * @returns {IWordDebug[]} 轉換後的分詞結果 / Converted segmentation results
 */
export function convertSynonym(ret: IWordDebug[], options?: IOptions): IWordDebug[]

export function convertSynonym(ret: IWordDebug[], options: IOptions)
{
	const { showcount, POSTAG, DICT_SYNONYM, DICT_TABLE } = options;

	let total_count = 0;

	//const RAW = Symbol.for('RAW');

	/**
	 * 內部同義詞轉換函式
	 * Internal Synonym Conversion Function
	 *
	 * 執行單輪同義詞轉換，返回轉換計數與結果列表。
	 * Performs a single round of synonym conversion, returns conversion count and result list.
	 *
	 * @param {IWordDebug[]} list - 待轉換的詞語列表 / Word list to convert
	 * @returns {IConvertSynonymWithShowcount} 轉換結果 / Conversion result
	 */
	function _convertSynonym(list: IWordDebug[])
	{
		let count = 0;
		list = list.reduce(function (a, item: IWordDebug)
		{
			let bool: boolean;
			let w = item.w;
			let nw: string;

			let debug = debugToken(item);

			// 檢查詞語是否在同義詞字典中 / Check if word is in synonym dictionary
			if (w in DICT_SYNONYM)
			{
				bool = true;
				nw = DICT_SYNONYM[w];
			}
			// 處理自動建立的複合詞 / Handle auto-created compound words
			else if (debug.autoCreate && !debug.convertSynonym && !item.ow && item.m && item.m.length)
			{
				nw = item.m.reduce(function (a: string[], b)
				{
					if (typeof b === 'string')
					{
						a.push(b);
					}
					else if (b.w in DICT_SYNONYM)
					{
						a.push(DICT_SYNONYM[b.w]);
						bool = true;
					}
					else
					{
						a.push(b.w);
					}

					return a;
				}, []).join('');
			}

			// 若需要轉換 / If conversion is needed
			if (bool)
			{
				count++;
				total_count++;
				//return { w: DICT_SYNONYM[item.w], p: item.p };

				let p = item.p;

				// 從主字典取得詞性 / Get part of speech from main dictionary
				if (w in DICT_TABLE)
				{
					p = DICT_TABLE[w].p || p;
				}

				// 移除 BAD 標記 / Remove BAD tag
				if (p & POSTAG.BAD)
				{
					p = p ^ POSTAG.BAD;
				}

				// 建立新的詞語物件 / Create new word object
				let item_new = debugToken({
					...item,

					w: nw,
					ow: w,
					p,
					op: item.p,

					//[RAW]: item,

					//source: item,
				}, {
					convertSynonym: true,
					//_source: item,

					/**
					 * JSON.stringify
					 * avoid TypeError: Converting circular structure to JSON
					 *
					 * 避免 TypeError: Converting circular structure to JSON
					 */
					_source: deepmerge({}, item) as IWordDebug,

				}, true);

				a.push(item_new);
			}
			else
			{
				a.push(item);
			}

			debug = undefined;

			return a;
		}, [] as IWordDebug[]);
		return { count: count, list: list } as IConvertSynonymWithShowcount;
	}

	let result: IConvertSynonymWithShowcount;

	// 持續轉換直到沒有更多轉換 / Keep converting until no more conversions
	do
	{
		result = _convertSynonym(ret);
		ret = result.list;

		result.list = undefined;
	}
	while (result.count > 0);

	result = undefined;

	// 若啟用計數，返回計數與列表 / If counting enabled, return count and list
	if (showcount)
	{
		return { count: total_count, list: ret };
	}

	return ret;
}
