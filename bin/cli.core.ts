/**
 * CLI Core - CLI 核心邏輯，用於分詞測試
 * CLI Core - CLI core logic for segmentation testing
 *
 * Provides core functionality for CLI-based segmentation testing,
 * designed for AI agent automation.
 *
 * @module novel-segment-cli/core
 */

// =============================================================================
// Module Imports Section
// =============================================================================

import { readFileSync } from 'fs-extra';
import { join } from 'upath2';
import { IWordDebug } from '../lib/util/debug';
import { demoSegmentCacheCore } from '../test/lib/demo.cache.core';
import { TableDict } from '@novel-segment/table-dict';
import { TableDictSynonym } from '@novel-segment/table-synonym';
import { Segment as SegmentBase } from '../lib/Segment';

// =============================================================================
// Type Definitions
// =============================================================================

/**
 * CLI 選項介面
 * CLI options interface
 */
export interface ICliOptions
{
	/**
	 * 要分詞的文字內容
	 * Text content to segment
	 */
	text?: string;

	/**
	 * 要讀取文字的檔案路徑
	 * File path to read text from
	 */
	file?: string;

	/**
	 * 預期的分詞結果，用於比較
	 * Expected segmentation result for comparison
	 */
	expected?: string;

	/**
	 * 要讀取預期結果的檔案路徑
	 * File path to read expected result from
	 */
	expectedFile?: string;

	/**
	 * 輸出格式：'json' 或 'text'
	 * Output format: 'json' or 'text'
	 */
	outputFormat?: 'json' | 'text';

	/**
	 * 靜默模式 - 僅輸出結果
	 * Quiet mode - only output result
	 */
	quiet?: boolean;

	/**
	 * 逐行除錯模式
	 * Line-by-line debug mode
	 */
	debugEach?: boolean;

	/**
	 * 額外的字典項目
	 * Additional dictionary entries
	 */
	dictEntries?: Parameters<TableDict['add']>[];

	/**
	 * 額外的同義詞項目
	 * Additional synonym entries
	 */
	synonymEntries?: Parameters<TableDictSynonym['add']>[];

	/**
	 * 黑名單詞彙
	 * Blacklist words
	 */
	blacklistWords?: string[];
}

/**
 * 測試結果介面
 * Test result interface
 */
export interface ITestResult
{
	/**
	 * 測試是否通過
	 * Whether the test passed
	 */
	success: boolean;

	/**
	 * 分詞後文字是否變更
	 * Whether the text was changed after segmentation
	 */
	changed: boolean;

	/**
	 * 結果是否符合預期（若無預期值則為 null）
	 * Whether result matches expected (null if no expected provided)
	 */
	matchExpected: boolean | null;

	/**
	 * 分詞結果陣列
	 * Segmentation result array
	 */
	result: IWordDebug[];

	/**
	 * 分詞後的文字輸出
	 * Segmented text output
	 */
	outputText: string;

	/**
	 * 狀態訊息
	 * Status message
	 */
	message: string;

	/**
	 * 錯誤訊息（若有）
	 * Error message (if any)
	 */
	error?: string;

	/**
	 * 差異詳情（若有差異）
	 * Diff details (if there are differences)
	 */
	diff?: {
		/**
		 * 預期文字
		 * Expected text
		 */
		expected: string;

		/**
		 * 實際文字
		 * Actual text
		 */
		actual: string;

		/**
		 * 差異位置
		 * Diff positions
		 */
		positions?: IDiffPosition[];
	};
}

/**
 * 差異位置介面
 * Diff position interface
 */
export interface IDiffPosition
{
	/**
	 * 起始位置
	 * Start position
	 */
	start: number;

	/**
	 * 結束位置
	 * End position
	 */
	end: number;

	/**
	 * 預期的字元
	 * Expected character(s)
	 */
	expected: string;

	/**
	 * 實際的字元
	 * Actual character(s)
	 */
	actual: string;
}

// =============================================================================
// Core Functions
// =============================================================================

/**
 * 執行分詞測試
 * Execute segmentation test
 *
 * @param options - CLI 選項 / CLI options
 * @returns 測試結果 / Test result
 */
export async function demoSegmentTestCore(options: ICliOptions): Promise<ITestResult>
{
	// 若有提供檔案則從檔案讀取文字
	// Read text from file if provided
	let text = options.text;
	if (options.file)
	{
		try
		{
			text = readFileSync(options.file).toString();
		}
		catch (error)
		{
			return {
				success: false,
				changed: false,
				matchExpected: null,
				result: [],
				outputText: '',
				message: `Failed to read input file: ${error.message}`,
				error: error.message,
			};
		}
	}

	// 若有提供檔案則從檔案讀取預期結果
	// Read expected result from file if provided
	let expected = options.expected;
	if (options.expectedFile)
	{
		try
		{
			expected = readFileSync(options.expectedFile).toString();
		}
		catch (error)
		{
			return {
				success: false,
				changed: false,
				matchExpected: null,
				result: [],
				outputText: '',
				message: `Failed to read expected file: ${error.message}`,
				error: error.message,
			};
		}
	}

	// 驗證文字輸入
	// Validate text input
	if (!text || text.trim().length === 0)
	{
		return {
			success: false,
			changed: false,
			matchExpected: null,
			result: [],
			outputText: '',
			message: 'No text provided for segmentation',
			error: 'No text provided for segmentation',
		};
	}

	try
	{
		// 執行分詞
		// Execute segmentation
		const coreResult = demoSegmentCacheCore(
			options.file,
			text,
			options.debugEach || false,
			{
				hookData: {
					list_dict: options.dictEntries || [],
					list_synonym: options.synonymEntries || [],
					list_blacklist: options.blacklistWords || [],
				},
			}
		);

		const { ret, output_text, changed } = coreResult;

		// 若有提供預期結果則進行比較
		// Compare with expected result if provided
		let matchExpected: boolean | null = null;
		let diff: ITestResult['diff'] = undefined;

		if (expected !== undefined && expected !== null)
		{
			// 正規化兩段文字以進行比較
			// Normalize both texts for comparison
			const normalizedExpected = normalizeText(expected);
			const normalizedActual = normalizeText(output_text);

			matchExpected = normalizedExpected === normalizedActual;

			if (!matchExpected)
			{
				diff = {
					expected: normalizedExpected,
					actual: normalizedActual,
					positions: findDiffPositions(normalizedExpected, normalizedActual),
				};
			}
		}

		// 判定是否成功
		// Determine success
		// Success if:
		// 1. No expected provided and no changes (text is already correct)
		// 2. Expected provided and matches result
		const success = matchExpected === null ? !changed : matchExpected;

		// 建立訊息
		// Build message
		let message = '';
		if (matchExpected === null)
		{
			if (changed)
			{
				message = 'Text was changed during segmentation (no expected result provided for validation)';
			}
			else
			{
				message = 'Text was not changed during segmentation';
			}
		}
		else
		{
			if (matchExpected)
			{
				message = 'Segmentation result matches expected output';
			}
			else
			{
				message = 'Segmentation result does NOT match expected output';
			}
		}

		return {
			success,
			changed,
			matchExpected,
			result: ret,
			outputText: output_text,
			message,
			diff,
		};
	}
	catch (error)
	{
		return {
			success: false,
			changed: false,
			matchExpected: null,
			result: [],
			outputText: '',
			message: `Segmentation error: ${error.message}`,
			error: error.message,
		};
	}
}

/**
 * 正規化文字以進行比較
 * Normalize text for comparison
 *
 * Removes leading/trailing whitespace and normalizes line endings.
 *
 * @param text - 要正規化的文字 / Text to normalize
 * @returns 正規化後的文字 / Normalized text
 */
export function normalizeText(text: string): string
{
	if (!text) return '';

	return text
		.replace(/^\s+|\s+$/g, '')  // Remove leading/trailing whitespace
		.replace(/\r\n/g, '\n')      // Normalize line endings
		.replace(/\r/g, '\n');       // Normalize remaining CR
}

/**
 * 找出兩個字串之間的差異位置
 * Find diff positions between two strings
 *
 * @param expected - 預期字串 / Expected string
 * @param actual - 實際字串 / Actual string
 * @returns 差異位置陣列 / Array of diff positions
 */
export function findDiffPositions(expected: string, actual: string): IDiffPosition[]
{
	const positions: IDiffPosition[] = [];
	const maxLen = Math.max(expected.length, actual.length);

	let i = 0;
	while (i < maxLen)
	{
		const expChar = expected[i] || '';
		const actChar = actual[i] || '';

		if (expChar !== actChar)
		{
			// 找出差異的範圍
			// Find the extent of the difference
			let start = i;
			let expDiff = '';
			let actDiff = '';

			while (i < maxLen && (expected[i] || '') !== (actual[i] || ''))
			{
				expDiff += expected[i] || '';
				actDiff += actual[i] || '';
				i++;
			}

			positions.push({
				start,
				end: i,
				expected: expDiff,
				actual: actDiff,
			});
		}
		else
		{
			i++;
		}
	}

	return positions;
}

/**
 * 建立供 AI 代理使用的測試結果
 * Create test result for AI agent consumption
 *
 * This function provides a simplified interface for AI agents to test
 * segmentation and get structured results.
 *
 * @param text - 要分詞的文字 / Text to segment
 * @param expected - 預期結果（選填）/ Expected result (optional)
 * @param options - 其他選項 / Additional options
 * @returns 測試結果 / Test result
 */
export async function testSegmentation(
	text: string,
	expected?: string,
	options?: Omit<ICliOptions, 'text' | 'expected'>
): Promise<ITestResult>
{
	return demoSegmentTestCore({
		...options,
		text,
		expected,
	});
}

export default {
	demoSegmentTestCore,
	testSegmentation,
	normalizeText,
	findDiffPositions,
};