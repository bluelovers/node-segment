/**
 * 模組載入模組
 * Module Loading Module
 *
 * 提供分詞模組的載入與註冊功能。
 * Provides loading and registration functionality for segmentation modules.
 */

import SegmentCore from '../core';
import { ISubOptimizer } from '../../mod/Optimizer';
import { ISubTokenizer } from '../../mod/Tokenizer';

/**
 * 檢查模組是否應被忽略
 * Check if Module Should Be Ignored
 *
 * 判斷模組是否在停用列表中。
 * Determines if the module is in the disabled list.
 *
 * @template T - 分詞器類型 / Segmenter type
 * @param {T} me - 分詞器實例 / Segmenter instance
 * @param {ISubOptimizer | ISubTokenizer | any} mod - 模組實例 / Module instance
 * @param {...any} argv - 其他參數 / Additional arguments
 * @returns {boolean} 是否應忽略 / Whether should be ignored
 */
export function _isIgnoreModules<T extends SegmentCore>(me: T, mod: ISubOptimizer | ISubTokenizer | any, ...argv)
{
	return (me.options?.disableModules?.includes(mod))
}

/**
 * 輸出模組忽略警告
 * Output Module Ignore Warning
 *
 * 當嘗試載入已停用的模組時輸出警告訊息。
 * Outputs a warning message when attempting to load a disabled module.
 *
 * @param {any} mod - 被忽略的模組 / Ignored module
 */
export function _warnIgnoreModules(mod)
{
	console.warn(`can't use this mod, because it got disable: ${mod}`)
}

/**
 * 載入模組
 * Load Module
 *
 * 初始化並註冊分詞模組到分詞器中。
 * Initializes and registers a segmentation module to the segmenter.
 *
 * @template T - 分詞器類型 / Segmenter type
 * @param {T} me - 分詞器實例 / Segmenter instance
 * @param {ISubOptimizer | ISubTokenizer | any} mod - 模組實例 / Module instance
 * @param {...any} argv - 其他參數 / Additional arguments
 * @returns {T} 分詞器實例 / Segmenter instance
 * @throws {TypeError} 當模組類型無效時拋出錯誤 / Throws error when module type is invalid
 */
export function useModules<T>(me: T, mod: ISubOptimizer | ISubTokenizer | any, ...argv)
{
	// 檢查是否應忽略此模組 / Check if this module should be ignored
	if (_isIgnoreModules(me as any, mod, ...argv))
	{
		_warnIgnoreModules(mod)
	}
	else
	{
		// 初始化並註冊模組 / Initialize and register module
		let c = mod.init(me, ...argv);

		if (typeof c !== 'undefined')
		{
			mod = c;
		}

		// 驗證模組類型 / Validate module type
		if (!['tokenizer', 'optimizer'].includes(mod.type))
		{
			throw new TypeError(`not a valid module, ${mod}`)
		}

		// 將模組加入對應列表 / Add module to corresponding list
		// @ts-ignore
		me.modules[mod.type].push(mod);
	}

	return me;
}
