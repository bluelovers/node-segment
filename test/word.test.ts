/**
 * 斷詞測試
 * Word Segmentation Tests
 *
 * 使用 lazyMatch 函數測試斷詞結果的準確性。
 * 驗證斷詞結果是否包含預期的詞彙組合。
 *
 * Tests word segmentation accuracy using lazyMatch functions.
 * Verifies if segmentation results contain expected word combinations.
 *
 * @created 2019/4/9
 * @see lazyMatch
 * @see lazyMatch002
 * @see lazyMatchNot
 * @see lazyMatchSynonym001
 * @see lazyMatchSynonym001Not
 */

/// <reference types="mocha" />
/// <reference types="benchmark" />
/// <reference types="chai" />
/// <reference types="node" />

import { chai, relative, expect, path, assert, util, mochaAsync } from './_local-dev';

// @ts-ignore
import { ITest } from 'mocha';

/**
 * 導入測試數據 / Import test data
 */
import {
	tests_lazy_indexof,
	tests_lazy_array,
	tests_lazy_base,
	tests_lazy_base_not,
	tests_lazy_indexof_not,
} from './res/lazy.index';
import { Segment } from '../lib/Segment';
import { createSegment } from './lib';
import { IOptionsDoSegment } from '../lib/Segment';
import {
	lazyMatch,
	lazyMatch002,
	lazyMatchNot,
	lazyMatchSynonym001,
	mochaSetup,
	toStringArray,
	lazyMatchSynonym001Not,
} from './lib/util';
import { console } from 'debug-color2';

console.setOptions({
	label: true,
});

// @ts-ignore
/**
 * 斷詞測試套件 / Word Segmentation Test Suite
 */
describe(relative(__filename), () =>
{
	/** 當前測試 / Current test */
	let currentTest: ITest;

	/** 斷詞器實例 / Segmenter instance */
	let segment: Segment = null;

	/**
	 * 測試前設置 / Test setup
	 */
	before(function ()
	{
		mochaSetup(this);

		segment = createSegment(true, {
			disableModules: [
				//ENUM_SUBMODS.ZhtSynonymOptimizer,
			]
		});
	});

	 /**
	 * 每個測試前 / Before each test
	 */
	beforeEach(function ()
	{
	 	// @ts-ignore
		currentTest = this.currentTest as ITest;

		//console.log('it:before', currentTest.title);
		//console.log('it:before', currentTest.fullTitle());
	});

	 /**
	 * 有序匹配測試 / Ordered match tests
	 * @see tests_lazy_base
	 */
	describe(`tests_lazy_base`, () =>
	{
		tests_lazy_base.forEach(function (args)
		{
			it(args[0], function ()
			{
				let actual = toStringArray(doSegment(args[0]));

				let expected = args[1];

				console.debug(actual.join('/'));

				lazyMatch(actual, expected, args[2]);
			});
		});
	});

	 /**
	 * 多選匹配測試 / Multi-choice match tests
	 * @see tests_lazy_array
	 */
	describe(`tests_lazy_array`, () =>
	{
		tests_lazy_array.forEach(function (args)
		{
			it(args[0], function ()
			{
				let actual = toStringArray(doSegment(args[0]));

				let expected = args[1];

				console.debug(actual.join('/'));

				lazyMatch002(actual, expected, args[2]);
			});
		});
	});

	 /**
	 * 同義詞匹配測試 / Synonym match tests
	 * @see tests_lazy_indexof
	 */
	describe(`tests_lazy_indexof`, () =>
	{
		tests_lazy_indexof.forEach(function (args)
		{
			it(args[0], function ()
			{
				let actual = Segment.stringify(doSegment(args[0]));

				let expected = args[1];

				console.debug(actual);

				lazyMatchSynonym001(actual, expected, args[2]);
			});
		});

	});

	 /**
	 * 同義詞反向匹配測試 / Synonym negative match tests
	 * @see tests_lazy_indexof_not
	 */
	describe(`tests_lazy_indexof_not`, () =>
	{
		tests_lazy_indexof_not.forEach(function (args)
		{
			it(args[0], function ()
			{
				let actual = Segment.stringify(doSegment(args[0]));

				let expected = args[1];

				console.debug(actual);

				lazyMatchSynonym001Not(actual, expected, args[2]);
			});
		});

	});

	 /**
	 * 反向匹配測試 / Negative match tests
	 * @see tests_lazy_base_not
	 */
	describe(`tests_lazy_base_not`, () =>
	{
		tests_lazy_base_not.forEach(function (args)
		{
			it(args[0], function ()
			{
				let actual = toStringArray(doSegment(args[0]));

				let expected = args[1];

				console.debug(actual.join('/'));

				lazyMatchNot(actual, expected, args[2]);
			});
		});
	});

	/**
	 * 斷詞處理函數 / Segmentation handler function
	 * @param a - 待斷詞字串 / String to segment
	 * @param options - 斷詞選項 / Segmentation options
	 * @returns 斷詞結果 / Segmentation result
	 */
	function doSegment(a: string, options?: IOptionsDoSegment)
	{
		return segment.doSegment(a, {
			...options,
		})
	}
});

