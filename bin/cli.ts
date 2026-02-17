#!/usr/bin/env node
/**
 * CLI 工具入口點
 * CLI Tool Entry Point
 *
 * 提供命令列介面進行分詞測試，供 AI agent 自動化呼叫使用。
 * Provides command-line interface for segmentation testing, designed for AI agent automation.
 *
 * @module dev-segment-cli
 */

// =============================================================================
// 模組匯入區 / Module Imports Section
// =============================================================================

import { existsSync, readFileSync } from 'fs-extra';
import { extname, resolve } from 'upath2';
import { demoSegmentTestCore, ICliOptions, ITestResult } from './cli.core';

// =============================================================================
// 命令列參數解析 / Command Line Arguments Parsing
// =============================================================================

/**
 * 解析 JSON 字串參數
 * Parse JSON string argument
 *
 * @param value - 字串值或 JSON 陣列字串 / String value or JSON array string
 * @returns 解析後的陣列或包裝後的字串 / Parsed array or wrapped string
 */
function parseArrayArg(value: string): (string | string[])[]
{
	try
	{
		// 嘗試解析為 JSON 陣列
		// Try to parse as JSON array
		const parsed = JSON.parse(value);
		if (Array.isArray(parsed))
		{
			return parsed;
		}
	}
	catch
	{
		// 不是有效的 JSON，視為單一字串
		// Not valid JSON, treat as single string
	}

	// 將單一字串包裝為陣列
	// Wrap single string in array
	return [value];
}

/**
 * 從 JSON 或 JS 檔案載入設定
 * Load configuration from JSON or JS file
 *
 * @param configPath - 設定檔路徑 / Configuration file path
 * @returns CLI 選項物件 / CLI options object
 */
function loadConfigFile(configPath: string): Partial<ICliOptions>
{
	const absolutePath = resolve(configPath);

	if (!existsSync(absolutePath))
	{
		console.error(`錯誤: 設定檔不存在 / Error: Config file does not exist: ${absolutePath}`);
		process.exit(1);
	}

	const ext = extname(absolutePath).toLowerCase();

	try
	{
		if (ext === '.json')
		{
			// 讀取 JSON 檔案
			// Read JSON file
			const content = readFileSync(absolutePath, 'utf8');
			return JSON.parse(content);
		}
		else if (ext === '.js' || ext === '.cjs' || ext === '.mjs' || ext === '.ts' || ext === '.cts' || ext === '.mts')
		{
			// 使用 require 載入 JS 檔案
			// Load JS file using require
			// eslint-disable-next-line @typescript-eslint/no-var-requires
			const config = require(absolutePath);
			// 處理 ES module default export
			// Handle ES module default export
			return config.default || config;
		}
		else
		{
			console.error(`錯誤: 不支援的設定檔格式 / Error: Unsupported config file format: ${ext}`);
			console.error('支援的格式 / Supported formats: .json, .js, .cjs, .mjs, .ts, .cts, .mts');
			process.exit(1);
		}
	}
	catch (error)
	{
		console.error(`錯誤: 無法載入設定檔 / Error: Failed to load config file: ${error.message}`);
		process.exit(1);
	}
}

/**
 * 合併設定選項（命令列優先於設定檔）
 * Merge configuration options (command line takes precedence over config file)
 *
 * @param fileOptions - 從設定檔載入的選項 / Options from config file
 * @param cliOptions - 從命令列解析的選項 / Options from command line
 * @returns 合併後的選項 / Merged options
 */
function mergeOptions(
	fileOptions: Partial<ICliOptions>,
	cliOptions: Partial<ICliOptions>
): ICliOptions
{
	// 命令列參數優先於設定檔
	// Command line arguments take precedence over config file
	const merged: ICliOptions = {
		...fileOptions,
		...cliOptions,
	};

	// 對於陣列類型的選項，如果兩邊都有則合併
	// For array-type options, merge if both exist
	if (fileOptions.expectedContains && cliOptions.expectedContains)
	{
		merged.expectedContains = [...fileOptions.expectedContains, ...cliOptions.expectedContains];
	}

	if (fileOptions.expectedContainsNot && cliOptions.expectedContainsNot)
	{
		merged.expectedContainsNot = [...fileOptions.expectedContainsNot, ...cliOptions.expectedContainsNot];
	}

	if (fileOptions.expectedIndexOf && cliOptions.expectedIndexOf)
	{
		merged.expectedIndexOf = [...fileOptions.expectedIndexOf, ...cliOptions.expectedIndexOf];
	}

	if (fileOptions.expectedIndexOfNot && cliOptions.expectedIndexOfNot)
	{
		merged.expectedIndexOfNot = [...fileOptions.expectedIndexOfNot, ...cliOptions.expectedIndexOfNot];
	}

	if (fileOptions.dictEntries && cliOptions.dictEntries)
	{
		merged.dictEntries = [...fileOptions.dictEntries, ...cliOptions.dictEntries];
	}

	if (fileOptions.synonymEntries && cliOptions.synonymEntries)
	{
		merged.synonymEntries = [...fileOptions.synonymEntries, ...cliOptions.synonymEntries];
	}

	if (fileOptions.blacklistWords && cliOptions.blacklistWords)
	{
		merged.blacklistWords = [...fileOptions.blacklistWords, ...cliOptions.blacklistWords];
	}

	return merged;
}

/**
 * 解析命令列參數
 * Parse command line arguments
 *
 * @returns 包含選項和設定檔路徑的物件 / Object containing options and config file path
 */
function parseArgs(): { options: ICliOptions; configFile?: string }
{
	const args = process.argv.slice(2);
	const options: ICliOptions = {
		text: undefined,
		file: undefined,
		expectedFull: undefined,
		expectedFullFile: undefined,
		expectedContains: undefined,
		expectedContainsNot: undefined,
		expectedIndexOf: undefined,
		expectedIndexOfNot: undefined,
		outputFormat: 'json',
		quiet: false,
		debugEach: false,
	};
	let configFile: string | undefined;

	let i = 0;
	while (i < args.length)
	{
		const arg = args[i];

		switch (arg)
		{
			case '--text':
			case '-t':
				options.text = args[++i];
				break;

			case '--file':
			case '-f':
				options.file = args[++i];
				break;

			case '--expected-full':
			case '--expectedFull':
			case '-efull':
				options.expectedFull = args[++i];
				break;

			case '--expected-full-file':
			case '--expectedFullFile':
			case '-efullfile':
				options.expectedFullFile = args[++i];
				break;

			case '--expected-contains':
			case '--expectedContains':
			case '-ec':
				options.expectedContains = parseArrayArg(args[++i]);
				break;

			case '--expected-contains-not':
			case '--expectedContainsNot':
			case '-ecn':
				options.expectedContainsNot = parseArrayArg(args[++i]);
				break;

			case '--expected-index-of':
			case '--expectedIndexOf':
			case '-eio':
				options.expectedIndexOf = parseArrayArg(args[++i]);
				break;

			case '--expected-index-of-not':
			case '--expectedIndexOfNot':
			case '-eion':
				options.expectedIndexOfNot = parseArrayArg(args[++i]);
				break;

			case '--config':
			case '-c':
				configFile = args[++i];
				break;

			case '--output':
			case '-o':
				options.outputFormat = args[++i] as 'json' | 'text';
				break;

			case '--output-file':
			case '--outputFile':
				options.outputFile = args[++i];
				break;

			case '--quiet':
			case '-q':
				options.quiet = true;
				break;

			case '--debug-each':
			case '--debugEach':
				options.debugEach = true;
				break;

			case '--help':
			case '-h':
				printHelp();
				process.exit(0);
				break;

			default:
				// 如果第一個參數不是選項，視為文字輸入
				// If the first argument is not an option, treat it as text input
				if (!arg.startsWith('-') && !options.text)
				{
					options.text = arg;
				}
				break;
		}

		i++;
	}

	return { options, configFile };
}

/**
 * 顯示說明訊息
 * Display help message
 */
function printHelp(): void
{
	console.log(`
dev-segment-cli - 中文分詞測試 CLI 工具
dev-segment-cli - Chinese Word Segmentation Test CLI Tool

用法 (Usage):
  dev-segment-cli [選項] [文字]
  dev-segment-cli [options] [text]

選項 (Options):
  -t, --text <text>              待分詞的文字內容 / Text content to segment
  -f, --file <path>              從檔案讀取待分詞文字 / Read text from file

  匹配選項 (Matching Options):
  --expected-full, -efull <text>          預期的完整結果 / Expected full result for comparison
  --expected-full-file, -efullfile <path> 從檔案讀取預期完整結果 / Read expected full result from file
  --expected-contains, -ec <json>         預期應該包含的詞彙（有序匹配）/ Expected words to contain (ordered match)
                                           範例 / Example: '["word1", "word2"]' or 'word1'
  --expected-contains-not, -ecn <json>    預期不應該包含的詞彙 / Words that should NOT be contained
  --expected-index-of, -eio <json>        預期轉換後應該包含的字詞 / Expected words after synonym transformation
  --expected-index-of-not, -eion <json>   預期轉換後不應該包含的字詞 / Words that should NOT exist after transformation

  設定 (Configuration):
  -c, --config <path>            從 JSON/JS 檔案載入設定 / Load config from JSON/JS file

  輸出 (Output):
  -o, --output <format>          輸出格式: json | text (預設: json) / Output format (default: json)
  --output-file <path>           輸出 JSON 結果到檔案 / Write JSON result to file
  -q, --quiet                    安靜模式，僅輸出結果 / Quiet mode, output result only
  --debug-each                   逐行除錯模式 / Line-by-line debug mode
  -h, --help                     顯示說明訊息 / Show help message

設定檔格式 (Config File Format):
  支援 JSON 和 JS 檔案格式 / Supports JSON and JS file formats:

  {
    "text": "待分詞文字 / Text to segment",
    "file": "input.txt",
    "expectedFull": "預期結果 / Expected result",
    "expectedFullFile": "expected.txt",
    "expectedContains": ["詞彙1 / word1", "詞彙2 / word2"],
    "expectedContainsNot": ["不應出現的詞 / word-not-allowed"],
    "expectedIndexOf": ["同義詞詞彙 / synonym-word"],
    "expectedIndexOfNot": ["不應出現的同義詞 / synonym-not-allowed"],
    "dictEntries": [["詞彙 / word", 1, 1000]],
    "synonymEntries": [["原詞 / original", "同義詞 / synonym"]],
    "blacklistWords": ["黑名單詞 / blacklist-word"],
    "outputFormat": "json",
    "outputFile": "result.json",
    "quiet": false,
    "debugEach": false
  }

範例 (Examples):
  # 直接輸入文字進行分詞測試 / Direct text input
  dev-segment-cli --text "這是一個測試句子 / This is a test sentence"

  # 完全匹配驗證 / Full match validation
  dev-segment-cli --text "測試文字 / Test text" --expected-full "預期結果 / Expected result"

  # 包含匹配驗證 / Contains match validation
  dev-segment-cli --text "測試文字 / Test text" --expected-contains '["詞彙1 / word1", "詞彙2 / word2"]'

  # 多種驗證類型 / Multiple validation types
  dev-segment-cli --text "測試 / Test" \\
    --expected-contains '["詞彙1 / word1"]' \\
    --expected-contains-not '["不良詞 / bad-word"]' \\
    --expected-index-of '["同義詞 / synonym"]'

  # 使用設定檔 / Using config file
  dev-segment-cli --config test-config.json

  # 設定檔與命令列覆蓋 / Config file with CLI override
  dev-segment-cli --config test-config.json --text "覆蓋文字 / Override text"

  # 輸出到檔案 / Output to file
  dev-segment-cli --text "測試 / Test" --output-file result.json

AI Agent 使用說明 (AI Agent Usage):
  此工具專為 AI agent 自動化測試設計，JSON 輸出包含：
  This tool is designed for AI agent automation testing, JSON output includes:

  - success: 測試是否通過 / Whether the test passed
  - changed: 文字是否有變更 / Whether the text was changed
  - matchResults: 各種匹配結果 / Various match results
    - matchExpectedFull: 完全匹配結果 / Full match result
    - matchExpectedContains: 有序包含匹配 / Ordered contains match
    - matchExpectedContainsNot: 反向匹配 / Negative match
    - matchExpectedIndexOf: 同義詞匹配 / Synonym match
    - matchExpectedIndexOfNot: 同義詞反向匹配 / Synonym negative match
  - result: 分詞結果陣列 / Segmentation result array
  - outputText: 分詞後的文字 / Segmented text
  - outputWords: 分詞結果的文字陣列 / Segmentation result as string array
  - message: 狀態訊息 / Status message
  - diff: 差異詳情（若有差異）/ Diff details (if any)
  - matchFailures: 匹配失敗詳情 / Match failure details
`);
}

// =============================================================================
// 主程式進入點 / Main Program Entry Point
// =============================================================================

/**
 * 主程式
 * Main program
 */
async function main(): Promise<void>
{
	const { options: cliOptions, configFile } = parseArgs();

	// 如果有設定檔，載入並合併選項
	// If config file exists, load and merge options
	let options: ICliOptions;
	if (configFile)
	{
		const fileOptions = loadConfigFile(configFile);
		options = mergeOptions(fileOptions, cliOptions);
	}
	else
	{
		options = cliOptions;
	}

	// 驗證必要參數
	// Validate required parameters
	if (!options.text && !options.file)
	{
		console.error('錯誤: 必須提供 --text 或 --file 參數 / Error: Must provide --text or --file parameter');
		printHelp();
		process.exit(1);
	}

	try
	{
		// 執行分詞測試
		// Execute segmentation test
		const result = await demoSegmentTestCore(options);

		// 輸出結果
		// Output result
		if (options.outputFormat === 'json')
		{
			console.log(JSON.stringify(result, null, options.quiet ? 0 : 2));
		}
		else
		{
			console.log(result.outputText);
		}

		// 根據測試結果設定結束碼
		// Set exit code based on test result
		if (!result.success)
		{
			process.exit(1);
		}
	}
	catch (error)
	{
		const errorResult: ITestResult = {
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
			message: `執行錯誤 / Execution error: ${error.message}`,
			error: error.message,
		};

		console.error(JSON.stringify(errorResult, null, options.quiet ? 0 : 2));
		process.exit(1);
	}
}

// 執行主程式
// Execute main program
main();
