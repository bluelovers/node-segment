/**
 * 測試工具函式
 * Test Utility Functions
 *
 * 提供用於包裝 lazyMatch 函數的測試輔助工具。
 * 包含用於測試斷詞結果的匹配驗證功能。
 *
 * Provides test helper functions for wrapping lazyMatch functions.
 * Includes matching verification functionality for testing segmentation results.
 *
 * @created 2019/4/9
 */

import { IWord } from '../../lib/Segment';
import tests_lazy_index from '../res/lazy.index';
import { zhDictCompare } from '@novel-segment/util';
import { assert, chai } from '../_local-dev';
import * as  _ from '@novel-segment/assert';

/**
 * 包裝 lazyMatch 函數
 * Wrap LazyMatch Function
 *
 * 為 lazyMatch 系列函數添加自訂檢視函式，
 * 確保測試輸出使用 chai.util.inspect 進行格式化。
 *
 * Wraps lazyMatch series functions with custom inspect function,
 * ensuring test output is formatted using chai.util.inspect.
 *
 * @template T - lazyMatch 函數類型 / lazyMatch function type
 * @param {T} fn - 要包裝的函數 / Function to wrap
 * @returns {T} 包裝後的函數 / Wrapped function
 */
function _wrapFn<T extends typeof _.lazyMatch | typeof _.lazyMatch002 | typeof _.lazyMatchNot | typeof _.lazyMatchSynonym001>(fn: T): T
{
	return ((...argv: Parameters<T>) => {
		argv[2] = {
			...(argv[2] ?? {}),
		};
		argv[2].inspectFn ??= chai.util.inspect;
		// @ts-ignore
		return fn(...argv)
	}) as T
}

/**
 * 有序匹配驗證 / Ordered Match Verification
 * @see lazyMatch
 */
export const lazyMatch = _wrapFn(_.lazyMatch);

/**
 * 多選匹配驗證 / Multi-Choice Match Verification
 * @see lazyMatch002
 */
export const lazyMatch002 = _wrapFn(_.lazyMatch002);

/**
 * 反向匹配驗證 / Negative Match Verification
 * @see lazyMatchNot
 */
export const lazyMatchNot = _wrapFn(_.lazyMatchNot);

/**
 * 同義詞匹配驗證 / Synonym Match Verification
 * @see lazyMatchSynonym001
 */
export const lazyMatchSynonym001 = _wrapFn(_.lazyMatchSynonym001);

/**
 * 同義詞反向匹配驗證 / Synonym Negative Match Verification
 * @see lazyMatchSynonym001Not
 */
export const lazyMatchSynonym001Not = _wrapFn(_.lazyMatchSynonym001Not);

/**
 * Mocha 測試環境設置
 * Mocha Test Environment Setup
 *
 * 設定 Mocha 測試逾時時間為 30 秒。
 * Sets Mocha test timeout to 30 seconds.
 *
 * @param {Mocha.Context} mocha - Mocha 上下文 / Mocha context
 * @returns {Mocha.Context} 設定後的 Mocha 上下文 / Configured Mocha context
 */
export function mochaSetup(mocha: Mocha.Context)
{
	mocha.timeout(30000);

	return mocha;
}

/**
 * 轉換為字串陣列
 * Convert to String Array
 *
 * 將 IWord 陣列轉換為僅包含詞彙的 字串陣列。
 * Converts IWord array to string array containing only words.
 *
 * @template T - IWord 陣列類型 / IWord array type
 * @param {T} arr - IWord 陣列 / IWord array
 * @returns {string[]} 字串陣列 / String array
 */
export function toStringArray<T extends IWord[]>(arr: T)
{
	return arr.map(function (w)
	{
		return w.w;
	});
}

export default exports as typeof import('./util');

/**
 * 測試排序
 * Test Sorting
 *
 * 根據詞彙和斷詞結果對測試資料進行排序。
 * Sorts test data based on vocabulary and segmentation results.
 *
 * 使用字典順序和中文筆劃進行排序。
 * Uses dictionary order and Chinese stroke order for sorting.
 *
 * @template T - 測試資料類型 / Test data type
 * @param {T} list - 要排序的測試列表 / Test list to sort
 */
export function sortTests<T extends typeof tests_lazy_index['tests_lazy_base'] | typeof tests_lazy_index['tests_lazy_base_not'] | typeof tests_lazy_index['tests_lazy_array'] | typeof tests_lazy_index['tests_lazy_indexof']>(list: T)
{
	list.sort(function (a, b)
	{
		return zhDictCompare(String(a[1]), String(b[1]))
			|| zhDictCompare(a[0], b[0])
	})
}
