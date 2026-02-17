"use strict";
/**
 * CLI Core - CLI 核心邏輯，用於分詞測試
 * CLI Core - CLI core logic for segmentation testing
 *
 * Provides core functionality for CLI-based segmentation testing,
 * designed for AI agent automation.
 *
 * @module novel-segment-cli/core
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.demoSegmentTestCore = demoSegmentTestCore;
exports.normalizeText = normalizeText;
exports.findDiffPositions = findDiffPositions;
exports.testSegmentation = testSegmentation;
// =============================================================================
// Module Imports Section
// =============================================================================
const fs_extra_1 = require("fs-extra");
const demo_cache_core_1 = require("../test/lib/demo.cache.core");
const assert_1 = require("@novel-segment/assert");
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
async function demoSegmentTestCore(options) {
    // 若有提供檔案則從檔案讀取文字
    // Read text from file if provided
    let text = options.text;
    if (options.file) {
        try {
            text = (0, fs_extra_1.readFileSync)(options.file).toString();
        }
        catch (error) {
            return createErrorResult(`Failed to read input file: ${error.message}`, error.message);
        }
    }
    // 若有提供檔案則從檔案讀取預期結果
    // Read expected result from file if provided
    let expected = options.expectedFull;
    if (options.expectedFullFile) {
        try {
            expected = (0, fs_extra_1.readFileSync)(options.expectedFullFile).toString();
        }
        catch (error) {
            return createErrorResult(`Failed to read expected file: ${error.message}`, error.message);
        }
    }
    // 驗證文字輸入
    // Validate text input
    if (!text || text.trim().length === 0) {
        return createErrorResult('No text provided for segmentation', 'No text provided for segmentation');
    }
    try {
        // 執行分詞
        // Execute segmentation
        const coreResult = (0, demo_cache_core_1.demoSegmentCacheCore)(options.file, text, options.debugEach || false, {
            hookData: {
                list_dict: options.dictEntries || [],
                list_synonym: options.synonymEntries || [],
                list_blacklist: options.blacklistWords || [],
            },
        });
        const { ret, output_text, changed } = coreResult;
        const outputWords = ret.map(w => w.w);
        // 初始化匹配結果
        // Initialize match results
        const matchResults = {
            matchExpectedFull: null,
            matchExpectedContains: null,
            matchExpectedContainsNot: null,
            matchExpectedIndexOf: null,
            matchExpectedIndexOfNot: null,
        };
        const matchFailures = {};
        // 完全匹配比較
        // Full match comparison
        let diff = undefined;
        if (expected !== undefined && expected !== null) {
            const normalizedExpected = normalizeText(expected);
            const normalizedActual = normalizeText(output_text);
            matchResults.matchExpectedFull = normalizedExpected === normalizedActual;
            if (!matchResults.matchExpectedFull) {
                diff = {
                    expected: normalizedExpected,
                    actual: normalizedActual,
                    positions: findDiffPositions(normalizedExpected, normalizedActual),
                };
            }
        }
        // 有序包含匹配
        // Ordered contains match
        if (options.expectedContains && options.expectedContains.length > 0) {
            const result = checkOrderedContains(outputWords, options.expectedContains);
            matchResults.matchExpectedContains = result.matched;
            if (!result.matched) {
                matchFailures.contains = result.failedWords;
            }
        }
        // 反向匹配（不應包含）
        // Negative match (should not contain)
        if (options.expectedContainsNot && options.expectedContainsNot.length > 0) {
            const result = checkOrderedContainsNot(outputWords, options.expectedContainsNot);
            matchResults.matchExpectedContainsNot = result.matched;
            if (!result.matched) {
                matchFailures.containsNot = result.failedWords;
            }
        }
        // 同義詞匹配（字串包含）
        // Synonym match (string contains)
        if (options.expectedIndexOf && options.expectedIndexOf.length > 0) {
            const result = checkIndexOf(output_text, options.expectedIndexOf);
            matchResults.matchExpectedIndexOf = result.matched;
            if (!result.matched) {
                matchFailures.indexOf = result.failedWords;
            }
        }
        // 同義詞反向匹配（字串不應包含）
        // Synonym negative match (string should not contain)
        if (options.expectedIndexOfNot && options.expectedIndexOfNot.length > 0) {
            const result = checkIndexOfNot(output_text, options.expectedIndexOfNot);
            matchResults.matchExpectedIndexOfNot = result.matched;
            if (!result.matched) {
                matchFailures.indexOfNot = result.failedWords;
            }
        }
        // 判定是否成功
        // Determine success
        const success = calculateSuccess(matchResults, changed);
        // 建立訊息
        // Build message
        const message = buildMessage(matchResults, changed);
        const result = {
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
        if (options.outputFile) {
            try {
                (0, fs_extra_1.writeFileSync)(options.outputFile, JSON.stringify(result, null, 2), 'utf8');
            }
            catch (error) {
                result.error = `Failed to write output file: ${error.message}`;
            }
        }
        return result;
    }
    catch (error) {
        return createErrorResult(`Segmentation error: ${error.message}`, error.message);
    }
}
/**
 * 建立錯誤結果
 * Create error result
 */
function createErrorResult(message, error) {
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
function checkOrderedContains(actual, expected) {
    try {
        const result = (0, assert_1.lazyMatch)(actual, expected);
        return { matched: result, failedWords: [] };
    }
    catch (error) {
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
function findFailedWords(actual, expected) {
    let currentIndex = -1;
    const failedWords = [];
    for (const exp of expected) {
        let found = false;
        let foundIndex = -1;
        if (Array.isArray(exp)) {
            // 多選一：找最接近的匹配
            // Multiple choices: find the closest match
            for (const word of exp) {
                const idx = actual.indexOf(word, currentIndex + 1);
                if (idx > currentIndex && (foundIndex === -1 || idx < foundIndex)) {
                    foundIndex = idx;
                    found = true;
                }
            }
        }
        else {
            // 單一字串
            // Single string
            foundIndex = actual.indexOf(exp, currentIndex + 1);
            found = foundIndex > currentIndex;
        }
        if (found) {
            currentIndex = foundIndex;
        }
        else {
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
function checkOrderedContainsNot(actual, expected) {
    try {
        const result = (0, assert_1.lazyMatchNot)(actual, expected);
        return { matched: result, failedWords: [] };
    }
    catch (error) {
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
function findFailedWordsNot(actual, expected) {
    let currentIndex = -1;
    const failedWords = [];
    for (const exp of expected) {
        let found = false;
        let foundIndex = -1;
        if (Array.isArray(exp)) {
            // 多選一：找最接近的匹配
            // Multiple choices: find the closest match
            for (const word of exp) {
                const idx = actual.indexOf(word, currentIndex + 1);
                if (idx > currentIndex && (foundIndex === -1 || idx < foundIndex)) {
                    foundIndex = idx;
                    found = true;
                }
            }
        }
        else {
            // 單一字串
            // Single string
            foundIndex = actual.indexOf(exp, currentIndex + 1);
            found = foundIndex > currentIndex;
        }
        if (found) {
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
function checkIndexOf(actual, expected) {
    try {
        (0, assert_1.lazyMatchSynonym001)(actual, expected);
        return { matched: true, failedWords: [] };
    }
    catch (error) {
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
function findFailedIndexOf(actual, expected) {
    let currentPosition = 0;
    const failedWords = [];
    for (const exp of expected) {
        let found = false;
        let foundPosition = -1;
        if (Array.isArray(exp)) {
            // 多選一
            // Multiple choices
            for (const word of exp) {
                const idx = actual.indexOf(word, currentPosition);
                if (idx >= currentPosition && (foundPosition === -1 || idx < foundPosition)) {
                    foundPosition = idx;
                    found = true;
                }
            }
        }
        else {
            // 單一字串
            // Single string
            foundPosition = actual.indexOf(exp, currentPosition);
            found = foundPosition >= currentPosition;
        }
        if (found) {
            // 更新位置，跳過已匹配的詞彙長度
            // Update position, skip matched word length
            const matchedWord = Array.isArray(exp)
                ? exp.find(w => actual.indexOf(w, currentPosition) === foundPosition)
                : exp;
            currentPosition = foundPosition + ((matchedWord === null || matchedWord === void 0 ? void 0 : matchedWord.length) || 0);
        }
        else {
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
function checkIndexOfNot(actual, expected) {
    try {
        (0, assert_1.lazyMatchSynonym001Not)(actual, expected);
        return { matched: true, failedWords: [] };
    }
    catch (error) {
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
function findFailedIndexOfNot(actual, expected) {
    const failedWords = [];
    for (const exp of expected) {
        if (Array.isArray(exp)) {
            // 多選一：任何一個找到都算失敗
            // Multiple choices: any match is a failure
            for (const word of exp) {
                if (actual.includes(word)) {
                    failedWords.push(exp.join('/'));
                    break;
                }
            }
        }
        else {
            // 單一字串
            // Single string
            if (actual.includes(exp)) {
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
function calculateSuccess(matchResults, changed) {
    // 如果有任何匹配測試失敗，則整體失敗
    // If any match test fails, overall fails
    if (matchResults.matchExpectedFull === false)
        return false;
    if (matchResults.matchExpectedContains === false)
        return false;
    if (matchResults.matchExpectedContainsNot === false)
        return false;
    if (matchResults.matchExpectedIndexOf === false)
        return false;
    if (matchResults.matchExpectedIndexOfNot === false)
        return false;
    // 如果沒有任何匹配測試，則根據是否變更來判定
    // If no match tests, determine by whether changed
    if (matchResults.matchExpectedFull === null &&
        matchResults.matchExpectedContains === null &&
        matchResults.matchExpectedContainsNot === null &&
        matchResults.matchExpectedIndexOf === null &&
        matchResults.matchExpectedIndexOfNot === null) {
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
function buildMessage(matchResults, changed) {
    const messages = [];
    if (matchResults.matchExpectedFull !== null) {
        messages.push(matchResults.matchExpectedFull
            ? 'Full match: PASSED'
            : 'Full match: FAILED');
    }
    if (matchResults.matchExpectedContains !== null) {
        messages.push(matchResults.matchExpectedContains
            ? 'Contains match: PASSED'
            : 'Contains match: FAILED');
    }
    if (matchResults.matchExpectedContainsNot !== null) {
        messages.push(matchResults.matchExpectedContainsNot
            ? 'Contains-not match: PASSED'
            : 'Contains-not match: FAILED');
    }
    if (matchResults.matchExpectedIndexOf !== null) {
        messages.push(matchResults.matchExpectedIndexOf
            ? 'Index-of match: PASSED'
            : 'Index-of match: FAILED');
    }
    if (matchResults.matchExpectedIndexOfNot !== null) {
        messages.push(matchResults.matchExpectedIndexOfNot
            ? 'Index-of-not match: PASSED'
            : 'Index-of-not match: FAILED');
    }
    if (messages.length === 0) {
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
function normalizeText(text) {
    if (!text)
        return '';
    return text
        .replace(/^\s+|\s+$/g, '') // Remove leading/trailing whitespace
        .replace(/\r\n/g, '\n') // Normalize line endings
        .replace(/\r/g, '\n'); // Normalize remaining CR
}
/**
 * 找出兩個字串之間的差異位置
 * Find diff positions between two strings
 *
 * @param expected - 預期字串 / Expected string
 * @param actual - 實際字串 / Actual string
 * @returns 差異位置陣列 / Array of diff positions
 */
function findDiffPositions(expected, actual) {
    const positions = [];
    const maxLen = Math.max(expected.length, actual.length);
    let i = 0;
    while (i < maxLen) {
        const expChar = expected[i] || '';
        const actChar = actual[i] || '';
        if (expChar !== actChar) {
            // 找出差異的範圍
            // Find the extent of the difference
            let start = i;
            let expDiff = '';
            let actDiff = '';
            while (i < maxLen && (expected[i] || '') !== (actual[i] || '')) {
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
        else {
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
async function testSegmentation(text, expectedFull, options) {
    return demoSegmentTestCore({
        ...options,
        text,
        expectedFull,
    });
}
exports.default = {
    demoSegmentTestCore,
    testSegmentation,
    normalizeText,
    findDiffPositions,
};
//# sourceMappingURL=cli.core.js.map