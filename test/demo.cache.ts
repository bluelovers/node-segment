/**
 * Created by user on 2018/4/15/015.
 */

import { demoSegmentCacheCore } from './lib/demo.cache.core';

/**
 * 輸入檔案路徑
 * Input file path
 *
 * 若設定此變數，將從指定檔案讀取待分詞的文字內容。
 * If this variable is set, the text to be segmented will be read from the specified file.
 */
let file: string;

/**
 * 逐行除錯模式開關
 * Line-by-line debug mode switch
 *
 * 若設為 true，將文字按標點符號分割後逐段處理，便於除錯。
 * If set to true, the text will be split by punctuation and processed segment by segment for easier debugging.
 */
let DEBUG_EACH: boolean;

//DEBUG_EACH = true;

//file = 'C:/Home/link/dist_novel/h/在喪屍橫行的世界裡唯獨我不被襲擊/00020_第三章　市役所/00380_038　【晚宴】.txt';

/**
 * 待分詞的測試文字內容
 * Test text content to be segmented
 *
 * 此為示範用的中文文字，用於測試分詞器的功能。
 * This is Chinese text for demonstration purposes, used to test the segmenter's functionality.
 */
let text = `

不仅能够撤退，亦可用于奇袭。111
奇袭。111
亦可用于
用于奇袭
确认周围没有人影后，

`;

/**
 * 分詞快取示範模組入口
 * Entry point for segmentation cache demo module
 *
 * 呼叫核心分詞函式，傳入測試文字與鉤子 (Hook) 設定。
 * Calls the core segmentation function with test text and hook configuration.
 *
 * @returns 分詞結果物件，包含結果陣列、輸出文字與變更狀態 / Segmentation result object containing result array, output text, and change status
 */
export default demoSegmentCacheCore(file, text, DEBUG_EACH, {
	/**
	 * 鉤子資料設定
	 * Hook data configuration
	 *
	 * 用於傳入額外的字典、同義詞與黑名單資料。
	 * Used to pass additional dictionary, synonym, and blacklist data.
	 */
	hookData: {
		/*
		list_dict: [
			[['形參', 0x100000, 0]],
		],
		list_synonym: [
			[['頁籤', '選項卡', '標籤頁', '標簽頁']],
		],
		list_blacklist: [
			'領民間',
		]
		*/
	},
	/**
	 * 自訂鉤子函式
	 * Custom hook function
	 *
	 * 在分詞前執行額外的設定，可新增字典項目、同義詞或黑名單。
	 * Executes additional configuration before segmentation, can add dictionary entries, synonyms, or blacklist items.
	 *
	 * @param segment - 分詞器實例 / Segmenter instance
	 * @param db_dict - 字典資料表 / Dictionary table
	 * @param db_synonym - 同義詞資料表 / Synonym table
	 */
	hookFn(segment, db_dict, db_synonym)
	{
		// 新增自訂字典項目（目前為註解狀態）
		// Add custom dictionary entries (currently commented out)
		db_dict
			// .add(['形參', 0x100000, 0])
		;

		// 新增自訂同義詞項目（目前為註解狀態）
		// Add custom synonym entries (currently commented out)
		db_synonym
			// .add(['頁籤', '選項卡', '標籤頁', '標簽頁'])
		;

		// 新增黑名單詞彙（目前為註解狀態）
		// Add blacklist words (currently commented out)
		segment
			// .addBlacklist('領民間')
		;
	}
});
