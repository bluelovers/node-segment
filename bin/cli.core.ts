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

import { readFileSync, writeFileSync } from 'fs-extra';
import { join } from 'upath2';
import { IWordDebug } from '../lib/util/debug';
import { demoSegmentCacheCore } from '../test/lib/demo.cache.core';
import { TableDict } from '@novel-segment/table-dict';
import { TableDictSynonym } from '@novel-segment/table-synonym';
import { Segment as SegmentBase } from '../lib/Segment';
import {
	lazyMatch,
	lazyMatchNot,
	lazyMatchSynonym001,
	lazyMatchSynonym001Not,
} from '@novel-segment/assert';

// =============================================================================
// Type Definitions
// =============================================================================

/**
 * 匹配結果介面
 * Match result interface
 */
export interface IMatchResults
{
	/**
	 * 完全匹配預期結果（若無預期值則為 null）
	 * Full match with expected result (null if no expected provided)
	 */
	matchExpectedFull: boolean | null;

	/**
	 * 有序包含匹配（若無預期詞彙則為 null）
	 * Ordered contains match (null if no expected words provided)
	 */
	matchExpectedContains: boolean | null;

	/**
	 * 反向匹配 - 不應包含（若無預期詞彙則為 null）
	 * Negative match - should not contain (null if no expected words provided)
	 */
	matchExpectedContainsNot: boolean | null;

	/**
	 * 同義詞匹配 - 應包含字詞（若無預期詞彙則為 null）
	 * Synonym match - should contain words (null if no expected words provided)
	 */
	matchExpectedIndexOf: boolean | null;

	/**
	 * 同義詞反向匹配 - 不應包含字詞（若無預期詞彙則為 null）
	 * Synonym negative match - should not contain words (null if no expected words provided)
	 */
	matchExpectedIndexOfNot: boolean | null;
}

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
	 * 預期的分詞結果，用於完全比對
	 * Expected segmentation result for full comparison
	 */
	expectedFull?: string;

	/**
	 * 要讀取預期結果的檔案路徑
	 * File path to read expected result from
	 */
	expectedFullFile?: string;

	/**
	 * 預期應該包含的詞彙陣列（有序匹配）
	 * Expected words array for ordered contains match
	 * 
	 * @example
	 * // 簡單字串陣列
	 * ['會議', '回京']
	 * 
	 * @example
	 * // 支援多選一的陣列
	 * ['會議', ['回京', '回去']]
	 */
	expectedContains?: (string | string[])[];

	/**
	 * 預期不應該包含的詞彙陣列（反向匹配）
	 * Expected words array that should NOT be contained
	 */
	expectedContainsNot?: (string | string[])[];

	/**
	 * 預期轉換後應該包含的字詞（同義詞匹配）
	 * Expected words that should exist after synonym transformation
	 */
	expectedIndexOf?: (string | string[])[];

	/**
	 * 預期轉換後不應該包含的字詞（同義詞反向匹配）
	 * Expected words that should NOT exist after synonym transformation
	 */
	expectedIndexOfNot?: (string | string[])[];

	/**
	 * 輸出格式：'json' 或 'text'
	 * Output format: 'json' or 'text'
	 */
	outputFormat?: 'json' | 'text';

	/**
	 * 輸出 JSON 結果的檔案路徑
	 * File path to write JSON result
	 */
	outputFile?: string;

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
	 * 各種匹配結果
	 * Various match results
	 */
	matchResults: IMatchResults;

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
	 * 分詞結果的文字陣列
	 * Segmentation result as string array
	 */
	outputWords: string[];

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

	/**
	 * 匹配失敗詳情
	 * Match failure details
	 */
	matchFailures?: {
		/**
		 * 有序包含匹配失敗的詞彙
		 * Words that failed ordered contains match
		 */
		contains?: string[];

		/**
		 * 反向匹配失敗的詞彙（不應出現但出現了）
		 * Words that failed negative match (should not appear but did)
		 */
		containsNot?: string[];

		/**
		 * 同義詞匹配失敗的詞彙
		 * Words that failed synonym match
		 */
		indexOf?: string[];

		/**
		 * 同義詞反向匹配失敗的詞彙
		 * Words that failed synonym negative match
		 */
		indexOfNot?: string[];
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
			return createErrorResult(`Failed to read input file: ${error.message}`, error.message);
		}
	}

	// 若有提供檔案則從檔案讀取預期結果
	// Read expected result from file if provided
	let expected = options.expectedFull;
	if (options.expectedFullFile)
	{
		try
		{
			expected = readFileSync(options.expectedFullFile).toString();
		}
		catch (error)
		{
			return createErrorResult(`Failed to read expected file: ${error.message}`, error.message);
		}
	}

	// 驗證文字輸入
	// Validate text input
	if (!text || text.trim().length === 0)
	{
		return createErrorResult('No text provided for segmentation', 'No text provided for segmentation');
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
		const outputWords = ret.map(w => w.w);

		// 初始化匹配結果
		// Initialize match results
		const matchResults: IMatchResults = {
			matchExpectedFull: null,
			matchExpectedContains: null,
			matchExpectedContainsNot: null,
			matchExpectedIndexOf: null,
			matchExpectedIndexOfNot: null,
		};

		const matchFailures: ITestResult['matchFailures'] = {};

		// 完全匹配比較
		// Full match comparison
		let diff: ITestResult['diff'] = undefined;
		if (expected !== undefined && expected !== null)
		{
			const normalizedExpected = normalizeText(expected);
			const normalizedActual = normalizeText(output_text);

			matchResults.matchExpectedFull = normalizedExpected === normalizedActual;

			if (!matchResults.matchExpectedFull)
			{
				diff = {
					expected: normalizedExpected,
					actual: normalizedActual,
					positions: findDiffPositions(normalizedExpected, normalizedActual),
				};
			}
		}

		// 有序包含匹配
		// Ordered contains match
		if (options.expectedContains && options.expectedContains.length > 0)
		{
			const result = checkOrderedContains(outputWords, options.expectedContains);
			matchResults.matchExpectedContains = result.matched;
			if (!result.matched)
			{
				matchFailures.contains = result.failedWords;
			}
		}

		// 反向匹配（不應包含）
		// Negative match (should not contain)
		if (options.expectedContainsNot && options.expectedContainsNot.length > 0)
		{
			const result = checkOrderedContainsNot(outputWords, options.expectedContainsNot);
			matchResults.matchExpectedContainsNot = result.matched;
			if (!result.matched)
			{
				matchFailures.containsNot = result.failedWords;
			}
		}

		// 同義詞匹配（字串包含）
		// Synonym match (string contains)
		if (options.expectedIndexOf && options.expectedIndexOf.length > 0)
		{
			const result = checkIndexOf(output_text, options.expectedIndexOf);
			matchResults.matchExpectedIndexOf = result.matched;
			if (!result.matched)
			{
				matchFailures.indexOf = result.failedWords;
			}
		}

		// 同義詞反向匹配（字串不應包含）
		// Synonym negative match (string should not contain)
		if (options.expectedIndexOfNot && options.expectedIndexOfNot.length > 0)
		{
			const result = checkIndexOfNot(output_text, options.expectedIndexOfNot);
			matchResults.matchExpectedIndexOfNot = result.matched;
			if (!result.matched)
			{
				matchFailures.indexOfNot = result.failedWords;
			}
		}

		// 判定是否成功
		// Determine success
		const success = calculateSuccess(matchResults, changed);

		// 建立訊息
		// Build message
		const message = buildMessage(matchResults, changed);

		const result: ITestResult = {
			success,
			changed,
			matchResults,
			result: ret,
			outputText: output_text,
			outputWords,
			message,
			diff,
			matchFailures: Object.keys(matchFailures).length > 0 ? matchFailures : undefined,
		};

		// 若有指定輸出檔案，寫入 JSON 結果
		// Write JSON result to file if specified
		if (options.outputFile)
		{
			try
			{
				writeFileSync(options.outputFile, JSON.stringify(result, null, 2), 'utf8');
			}
			catch (error)
			{
				result.error = `Failed to write output file: ${error.message}`;
			}
		}

		return result;
	}
	catch (error)
	{
		return createErrorResult(`Segmentation error: ${error.message}`, error.message);
	}
}

/**
 * 建立錯誤結果
 * Create error result
 */
function createErrorResult(message: string, error: string): ITestResult
{
	return {
		success: false,
		changed: false,
		matchResults: {
			matchExpectedFull: null,
			matchExpectedContains: null,
			matchExpectedContainsNot: null,
			matchExpectedIndexOf: null,
			matchExpectedIndexOfNot: null,
		},
		result: [],
		outputText: '',
		outputWords: [],
		message,
		error,
	};
}

/**
 * 有序包含匹配檢查
 * Check ordered contains match
 * 
 * 驗證斷詞結果是否按順序包含指定的詞彙。
 * Verifies if segmentation results contain specified words in order.
 */
function checkOrderedContains(
	actual: string[],
	expected: (string | string[])[]
): { matched: boolean; failedWords: string[] }
{
	try
	{
		const result = lazyMatch(actual, expected);
		return { matched: result, failedWords: [] };
	}
	catch (error)
	{
		// 匹配失敗，計算失敗的詞彙
		// Match failed, calculate failed words
		const failedWords = findFailedWords(actual, expected);
		return { matched: false, failedWords };
	}
}

/**
 * 找出匹配失敗的詞彙
 * Find failed words in match
 */
function findFailedWords(
	actual: string[],
	expected: (string | string[])[]
): string[]
{
	let currentIndex = -1;
	const failedWords: string[] = [];

	for (const exp of expected)
	{
		let found = false;
		let foundIndex = -1;

		if (Array.isArray(exp))
		{
			// 多選一：找最接近的匹配
			// Multiple choices: find the closest match
			for (const word of exp)
			{
				const idx = actual.indexOf(word, currentIndex + 1);
				if (idx > currentIndex && (foundIndex === -1 || idx < foundIndex))
				{
					foundIndex = idx;
					found = true;
				}
			}
		}
		else
		{
			// 單一字串
			// Single string
			foundIndex = actual.indexOf(exp, currentIndex + 1);
			found = foundIndex > currentIndex;
		}

		if (found)
		{
			currentIndex = foundIndex;
		}
		else
		{
			failedWords.push(Array.isArray(exp) ? exp.join('/') : exp);
		}
	}

	return failedWords;
}

/**
 * 反向匹配檢查（不應包含）
 * Check negative match (should not contain)
 * 
 * 驗證斷詞結果不應按順序包含指定的詞彙組合。
 * Verifies that segmentation results should not contain specified word combinations in order.
 */
function checkOrderedContainsNot(
	actual: string[],
	expected: (string | string[])[]
): { matched: boolean; failedWords: string[] }
{
	try
	{
		const result = lazyMatchNot(actual, expected);
		return { matched: result, failedWords: [] };
	}
	catch (error)
	{
		// 匹配失敗（找到了不應該存在的組合）
		// Match failed (found combination that should not exist)
		const failedWords = findFailedWordsNot(actual, expected);
		return { matched: false, failedWords };
	}
}

/**
 * 找出反向匹配失敗的詞彙（不應出現但出現了）
 * Find failed words in negative match (should not appear but did)
 */
function findFailedWordsNot(
	actual: string[],
	expected: (string | string[])[]
): string[]
{
	let currentIndex = -1;
	const failedWords: string[] = [];

	for (const exp of expected)
	{
		let found = false;
		let foundIndex = -1;

		if (Array.isArray(exp))
		{
			// 多選一：找最接近的匹配
			// Multiple choices: find the closest match
			for (const word of exp)
			{
				const idx = actual.indexOf(word, currentIndex + 1);
				if (idx > currentIndex && (foundIndex === -1 || idx < foundIndex))
				{
					foundIndex = idx;
					found = true;
				}
			}
		}
		else
		{
			// 單一字串
			// Single string
			foundIndex = actual.indexOf(exp, currentIndex + 1);
			found = foundIndex > currentIndex;
		}

		if (found)
		{
			currentIndex = foundIndex;
			failedWords.push(Array.isArray(exp) ? exp.join('/') : exp);
		}
	}

	return failedWords;
}

/**
 * 同義詞匹配檢查（字串包含）
 * Check synonym match (string contains)
 * 
 * 驗證轉換後的字串是否包含預期的詞彙。
 * Verifies if the string after transformation contains expected words.
 */
function checkIndexOf(
	actual: string,
	expected: (string | string[])[]
): { matched: boolean; failedWords: string[] }
{
	try
	{
		lazyMatchSynonym001(actual, expected);
		return { matched: true, failedWords: [] };
	}
	catch (error)
	{
		// 匹配失敗，計算失敗的詞彙
		// Match failed, calculate failed words
		const failedWords = findFailedIndexOf(actual, expected);
		return { matched: false, failedWords };
	}
}

/**
 * 找出同義詞匹配失敗的詞彙
 * Find failed words in synonym match
 */
function findFailedIndexOf(
	actual: string,
	expected: (string | string[])[]
): string[]
{
	let currentPosition = 0;
	const failedWords: string[] = [];

	for (const exp of expected)
	{
		let found = false;
		let foundPosition = -1;

		if (Array.isArray(exp))
		{
			// 多選一
			// Multiple choices
			for (const word of exp)
			{
				const idx = actual.indexOf(word, currentPosition);
				if (idx >= currentPosition && (foundPosition === -1 || idx < foundPosition))
				{
					foundPosition = idx;
					found = true;
				}
			}
		}
		else
		{
			// 單一字串
			// Single string
			foundPosition = actual.indexOf(exp, currentPosition);
			found = foundPosition >= currentPosition;
		}

		if (found)
		{
			// 更新位置，跳過已匹配的詞彙長度
			// Update position, skip matched word length
			const matchedWord = Array.isArray(exp) 
				? exp.find(w => actual.indexOf(w, currentPosition) === foundPosition) 
				: exp;
			currentPosition = foundPosition + (matchedWord?.length || 0);
		}
		else
		{
			failedWords.push(Array.isArray(exp) ? exp.join('/') : exp);
		}
	}

	return failedWords;
}

/**
 * 同義詞反向匹配檢查（字串不應包含）
 * Check synonym negative match (string should not contain)
 * 
 * 驗證轉換後的字串不應包含特定的詞彙。
 * Verifies that the string after transformation does not contain specific words.
 */
function checkIndexOfNot(
	actual: string,
	expected: (string | string[])[]
): { matched: boolean; failedWords: string[] }
{
	try
	{
		lazyMatchSynonym001Not(actual, expected);
		return { matched: true, failedWords: [] };
	}
	catch (error)
	{
		// 匹配失敗（找到了不應該存在的詞彙）
		// Match failed (found words that should not exist)
		const failedWords = findFailedIndexOfNot(actual, expected);
		return { matched: false, failedWords };
	}
}

/**
 * 找出同義詞反向匹配失敗的詞彙（不應出現但出現了）
 * Find failed words in synonym negative match (should not appear but did)
 */
function findFailedIndexOfNot(
	actual: string,
	expected: (string | string[])[]
): string[]
{
	const failedWords: string[] = [];

	for (const exp of expected)
	{
		if (Array.isArray(exp))
		{
			// 多選一：任何一個找到都算失敗
			// Multiple choices: any match is a failure
			for (const word of exp)
			{
				if (actual.includes(word))
				{
					failedWords.push(exp.join('/'));
					break;
				}
			}
		}
		else
		{
			// 單一字串
			// Single string
			if (actual.includes(exp))
			{
				failedWords.push(exp);
			}
		}
	}

	return failedWords;
}

/**
 * 計算整體成功狀態
 * Calculate overall success status
 */
function calculateSuccess(matchResults: IMatchResults, changed: boolean): boolean
{
	// 如果有任何匹配測試失敗，則整體失敗
	// If any match test fails, overall fails
	if (matchResults.matchExpectedFull === false) return false;
	if (matchResults.matchExpectedContains === false) return false;
	if (matchResults.matchExpectedContainsNot === false) return false;
	if (matchResults.matchExpectedIndexOf === false) return false;
	if (matchResults.matchExpectedIndexOfNot === false) return false;

	// 如果沒有任何匹配測試，則根據是否變更來判定
	// If no match tests, determine by whether changed
	if (matchResults.matchExpectedFull === null &&
		matchResults.matchExpectedContains === null &&
		matchResults.matchExpectedContainsNot === null &&
		matchResults.matchExpectedIndexOf === null &&
		matchResults.matchExpectedIndexOfNot === null)
	{
		return !changed;
	}

	// 所有執行的匹配測試都通過
	// All executed match tests passed
	return true;
}

/**
 * 建立狀態訊息
 * Build status message
 */
function buildMessage(matchResults: IMatchResults, changed: boolean): string
{
	const messages: string[] = [];

	if (matchResults.matchExpectedFull !== null)
	{
		messages.push(matchResults.matchExpectedFull 
			? 'Full match: PASSED' 
			: 'Full match: FAILED');
	}

	if (matchResults.matchExpectedContains !== null)
	{
		messages.push(matchResults.matchExpectedContains 
			? 'Contains match: PASSED' 
			: 'Contains match: FAILED');
	}

	if (matchResults.matchExpectedContainsNot !== null)
	{
		messages.push(matchResults.matchExpectedContainsNot 
			? 'Contains-not match: PASSED' 
			: 'Contains-not match: FAILED');
	}

	if (matchResults.matchExpectedIndexOf !== null)
	{
		messages.push(matchResults.matchExpectedIndexOf 
			? 'Index-of match: PASSED' 
			: 'Index-of match: FAILED');
	}

	if (matchResults.matchExpectedIndexOfNot !== null)
	{
		messages.push(matchResults.matchExpectedIndexOfNot 
			? 'Index-of-not match: PASSED' 
			: 'Index-of-not match: FAILED');
	}

	if (messages.length === 0)
	{
		return changed 
			? 'Text was changed during segmentation (no validation tests provided)' 
			: 'Text was not changed during segmentation';
	}

	return messages.join('; ');
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
 * @param expectedFull - 預期結果（選填）/ Expected result (optional)
 * @param options - 其他選項 / Additional options
 * @returns 測試結果 / Test result
 */
export async function testSegmentation(
	text: string,
	expectedFull?: string,
	options?: Omit<ICliOptions, 'text' | 'expectedFull'>
): Promise<ITestResult>
{
	return demoSegmentTestCore({
		...options,
		text,
		expectedFull,
	});
}

export default {
	demoSegmentTestCore,
	testSegmentation,
	normalizeText,
	findDiffPositions,
};
