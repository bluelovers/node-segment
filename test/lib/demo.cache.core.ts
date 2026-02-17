/**
 * Created by user on 2018/4/15/015.
 */

// =============================================================================
// 模組匯入區 / Module Imports Section
// =============================================================================

import Segment, { POSTAG } from '../../index';
import { IWordDebug } from '../../lib/util/debug';
import { debug_token } from '../../lib/util'
import { createSegment, getDictMain } from './index';
import { console } from 'debug-color2';
import { EnumDictDatabase } from '@novel-segment/types';
import prettyuse = require('prettyuse');
import { printPrettyDiff } from '@novel-segment/pretty-diff';
import { outputFileSync, readFileSync } from 'fs-extra';
import { __root } from '../__root';
import { join } from 'upath2';
import { TableDict } from '@novel-segment/table-dict';
import { TableDictSynonym } from '@novel-segment/table-synonym';
import { Segment as SegmentBase } from '../../lib/Segment';
import { toStringArray } from './util';

// =============================================================================
// 被註解的測試變數 / Commented Test Variables
// =============================================================================

// let file: string;
// let DEBUG_EACH: boolean;

//DEBUG_EACH = true;

//file = 'C:/Home/link/dist_novel/h/在喪屍橫行的世界裡唯獨我不被襲擊/00020_第三章　市役所/00380_038　【晚宴】.txt';

/**
 * 臨時目錄路徑
 * Temporary directory path
 */
export const _temp_dir = join(__root, 'test', 'temp');

/**
 * 臨時文字檔案路徑
 * Temporary text file path
 */
export const _temp_file_text = join(_temp_dir, 'c1.txt');

/**
 * 臨時 JSON 檔案路徑
 * Temporary JSON file path
 */
export const _temp_file_json = join(_temp_dir, 'c1.json');

/**
 * 中文分詞快取核心示範函式
 * Core demo function for Chinese word segmentation with caching
 *
 * 此函式建立分詞器實例、設定字典與同義詞庫，並對輸入文字進行分詞處理。
 * 處理結果會輸出至臨時檔案以供檢視與除錯。
 * This function creates a segmenter instance, configures dictionaries and synonyms,
 * and performs word segmentation on the input text.
 * The results are output to temporary files for inspection and debugging.
 *
 * @param {string} file - 輸入檔案路徑（若提供則從檔案讀取文字） / Input file path (if provided, text will be read from file)
 * @param {string} text - 待分詞的文字內容 / Text content to be segmented
 * @param {boolean} DEBUG_EACH - 是否逐行除錯模式（會將文字按標點符號分割後逐段處理） / Whether to enable line-by-line debug mode (splits text by punctuation and processes each segment)
 * @param hook - 可選的鉤子 (Hook) 設定 / Optional hook configuration
 * @param hook.hookData - 額外的字典、同義詞與黑名單資料 / Additional dictionary, synonym, and blacklist data
 * @param hook.hookData.list_dict - 字典項目陣列 / Dictionary entries array
 * @param hook.hookData.list_synonym - 同義詞項目陣列 / Synonym entries array
 * @param hook.hookData.list_blacklist - 黑名單詞彙陣列 / Blacklist words array
 * @param hook.hookFn - 自訂鉤子函式，可在分詞前進行額外設定 / Custom hook function for additional configuration before segmentation
 * @returns 包含分詞結果、輸出文字與變更狀態的物件 / Object containing segmentation results, output text, and change status
 */
export function demoSegmentCacheCore(file: string, text: string, DEBUG_EACH: boolean, hook?: {
	hookData?: {
		/**
		 * 字典項目陣列 / Dictionary entries array
		 */
		list_dict?: Parameters<TableDict['add']>[],
		/**
		 * 同義詞項目陣列 / Synonym entries array
		 */
		list_synonym?: Parameters<TableDictSynonym['add']>[],
		/**
		 * 黑名單詞彙陣列 / Blacklist words array
		 */
		list_blacklist?: string[],
	},
	hookFn?: (segment: SegmentBase, db_dict: TableDict, db_synonym: TableDictSynonym) => void
})
{

console.log(Segment.versions);

// 建立分詞器實例，啟用快取並開啟小說模式
// Create segmenter instance with caching enabled and novel mode activated
const segment = createSegment(true, {
	nodeNovelMode: true,
});

// 取得主要字典與同義詞資料庫
// Retrieve main dictionary and synonym database
const db_dict = getDictMain(segment);
const db_synonym = segment.getDictDatabase(EnumDictDatabase.SYNONYM);

/**
 * 最後一個參數的數字是代表權重 數字越高 越優先
 */
db_dict
	//.add(['在這裡', POSTAG.D_F, 0])
	//.add(['人名', POSTAG.A_NR, 0])
	//.add(['地名', POSTAG.A_NS, 0])
	//.add(['机构团体', POSTAG.A_NT, 0])
	//.add(['名词', POSTAG.D_N, 0])
	//.add(['錯字', POSTAG.BAD, 0])
	//.add(['l10n', POSTAG.A_NX, 0])
	//.add(['i18n', POSTAG.A_NX, 0])
	//.add(['像', 0x141000, 20000])
	//.add(['建筑', 0x000000, 0])
	//.add(['發现', 0x1000, 10000])

	//.add(['身影', 0x100000, 10000])

	//.add(['黑發', 0x100000, 1000])
	//	.add(['超',0x08001000,1760])
	//	.add(['公主抱',0x1000,0])
	//	.add(['是以',0x8000000,0])
	//	.add(['壓制',0x1000,1000])
	//	.add(['在干的',0x18801000,500])
	//	.add(['面包',0x100000, 800])
	//	.add(['之间',0x2100000, 1000])
	//	.add(['干吗',0x802000, 0])
	//	.add(['聖域',0x108000, 2000])
	//	.add(['全',0x48101000, 159])
	//	.add(['全體表示',0x001000, 10000])
	//	.add(['范',0x40100080, 5000])
	//	.add(['七人',0x100000, 500])
	//	.add(['意外',0x101000, 3000])
	//	.add(['民兵團',0x0100000, 2000])
	//	.add(['團團',0x8000000, 0])
	//	.add(['重要',0x001000, 2000])
	//	.add(['长剑',0x100000,2100])
	//	.add(['仿製品',0x100000,11000])
	//	.add(['中长发',0x100000,2000])
	//	.add(['內臟',0x100000,500])
	//	.add(['進发',0x1000,1000])
	//	.add(['发直',0x1000,4000])
	//.add(['否',0x101000,1000])
	//	.add(['目的',0x108000,2000])
	//	.add(['刻划',0x1000,4500])
	//	.add(['故事',0x100000,1000])
	//	.add(['刻划',0x1000,9500])
	//	.add(['將死之時',0x104000,8000])
	//	.add(['干着急',0x801000,100])
//.add(['形參',0x100000,0])
//.add(['反方',0x100000,0])
	//.add(['流', 0x0, 0])
;



db_synonym
//	.add(['頁籤', '選項卡', '標籤頁', '標簽頁'])
;

segment
//	.addBlacklist('領民間')
;

// 處理鉤子 (Hook) 設定：載入額外的字典、同義詞與黑名單
// Process hook configuration: load additional dictionaries, synonyms, and blacklist
if (hook)
{
	if (hook.hookData)
	{
		// 批次新增字典項目
		// Batch add dictionary entries
		if (hook.hookData.list_dict?.length)
		{
			hook.hookData.list_dict.forEach(args => db_dict.add(...args));
		}

		// 批次新增同義詞項目
		// Batch add synonym entries
		if (hook.hookData.list_synonym?.length)
		{
			hook.hookData.list_synonym.forEach(args => db_synonym.add(...args));
		}

		// 批次新增黑名單詞彙
		// Batch add blacklist words
		if (hook.hookData.list_blacklist?.length)
		{
			hook.hookData.list_blacklist.forEach(word => segment.addBlacklist(word));
		}
	}

	// 執行自訂鉤子函式
	// Execute custom hook function
	hook.hookFn?.(segment, db_dict, db_synonym);
}

console.time(`doSegment`);

// let text = `

// 不仅能够撤退，亦可用于奇袭。111
// 奇袭。111
// 亦可用于
// 用于奇袭
// 确认周围没有人影后，

// `;

// 若提供檔案路徑，則從檔案讀取文字內容
// If file path is provided, read text content from file
if (file)
{
	text = readFileSync(file).toString()
}

// 移除文字前後的空白字元
// Remove leading and trailing whitespace from text
text = text.replace(/^\s+|\s+$/g, '');

let ret: IWordDebug[];

// 根據除錯模式選擇不同的分詞策略
// Choose different segmentation strategy based on debug mode
if (DEBUG_EACH)
{
	// 除錯模式：將文字按換行與標點符號分割，逐段處理並輸出
	// Debug mode: split text by newlines and punctuation, process and output each segment
	ret = text
		.split(/([\n\p{Punctuation}])/u)
		.reduce(function (a, line)
		{
			console.dir(line);

			let r = segment.doSegment(line);

			a.push(...r);

			return a;
		}, [])
	;
}
else
{
	// 一般模式：直接對整段文字進行分詞
	// Normal mode: segment the entire text directly
	ret = segment.doSegment(text);
}

//console.log(ret);

// 輸出分詞結果的除錯資訊
// Output debug information for segmentation results
debug_token(ret);

// 比較原始文字與分詞後重組的文字，檢查是否有差異
// Compare original text with reassembled segmented text to check for differences
const {
	text_new: output_text,
	text_new2: output_text2,
	changed,
} = printPrettyDiff(text.toString(), segment.stringify(ret));

console.log(toStringArray(ret).join('/'));

console.gray("------------------");

// 若文字有變更，以紅色輸出警告
// If text has changed, output warning in red
if (changed)
{
	console.red(`changed: ${changed}`);
}

// 將分詞結果與變更狀態輸出至 JSON 檔案
// Output segmentation results and change status to JSON file
outputFileSync(_temp_file_json, JSON.stringify({

	changed,

	ret,
}, null, "\t"));

// 將處理後的文字輸出至文字檔案
// Output processed text to text file
outputFileSync(_temp_file_text, output_text);

console.timeEnd(`doSegment`);

// 輸出記憶體使用情況
// Output memory usage information
console.debug(prettyuse());

return {
	ret,
	output_text,
	changed,
}
}
