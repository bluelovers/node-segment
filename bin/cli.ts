#!/usr/bin/env node
/**
 * CLI 工具入口點
 * CLI Tool Entry Point
 *
 * 提供命令列介面進行分詞測試，供 AI agent 自動化呼叫使用。
 * Provides command-line interface for segmentation testing, designed for AI agent automation.
 *
 * @module novel-segment-cli
 */

// =============================================================================
// 模組匯入區 / Module Imports Section
// =============================================================================

import { demoSegmentTestCore, ICliOptions, ITestResult } from './cli.core';

// =============================================================================
// 命令列參數解析 / Command Line Arguments Parsing
// =============================================================================

/**
 * 解析命令列參數
 * Parse command line arguments
 *
 * @returns CLI 選項物件 / CLI options object
 */
function parseArgs(): ICliOptions
{
	const args = process.argv.slice(2);
	const options: ICliOptions = {
		text: undefined,
		file: undefined,
		expected: undefined,
		expectedFile: undefined,
		outputFormat: 'json',
		quiet: false,
		debugEach: false,
	};

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

			case '--expected':
			case '-e':
				options.expected = args[++i];
				break;

			case '--expected-file':
			case '-ef':
				options.expectedFile = args[++i];
				break;

			case '--output':
			case '-o':
				options.outputFormat = args[++i] as 'json' | 'text';
				break;

			case '--quiet':
			case '-q':
				options.quiet = true;
				break;

			case '--debug-each':
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

	return options;
}

/**
 * 顯示說明訊息
 * Display help message
 */
function printHelp(): void
{
	console.log(`
novel-segment-cli - 中文分詞測試 CLI 工具
Chinese Word Segmentation Test CLI Tool

用法 (Usage):
  novel-segment-cli [選項] [文字]
  novel-segment-cli [options] [text]

選項 (Options):
  -t, --text <text>           待分詞的文字內容 / Text content to segment
  -f, --file <path>           從檔案讀取待分詞文字 / Read text from file
  -e, --expected <text>       預期的分詞結果 / Expected segmentation result
  -ef, --expected-file <path> 從檔案讀取預期結果 / Read expected result from file
  -o, --output <format>       輸出格式: json | text (預設: json) / Output format (default: json)
  -q, --quiet                 安靜模式，僅輸出結果 / Quiet mode, output result only
  --debug-each                逐行除錯模式 / Line-by-line debug mode
  -h, --help                  顯示說明訊息 / Show help message

範例 (Examples):
  # 直接輸入文字進行分詞測試
  novel-segment-cli --text "這是一個測試句子"

  # 從檔案讀取並驗證預期結果
  novel-segment-cli --file input.txt --expected-file expected.txt

  # 安靜模式輸出 JSON 格式
  novel-segment-cli --text "測試文字" --quiet

AI Agent 使用說明 (AI Agent Usage):
  此工具專為 AI agent 自動化測試設計，輸出 JSON 格式包含：
  - success: 測試是否成功
  - changed: 文字是否有變更
  - matchExpected: 是否符合預期結果（如有提供預期）
  - result: 分詞結果陣列
  - outputText: 分詞後的文字
  - message: 狀態訊息

  This tool is designed for AI agent automation testing, JSON output includes:
  - success: Whether the test passed
  - changed: Whether the text was changed
  - matchExpected: Whether result matches expected (if expected provided)
  - result: Segmentation result array
  - outputText: Segmented text
  - message: Status message
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
	const options = parseArgs();

	// 驗證必要參數
	// Validate required parameters
	if (!options.text && !options.file)
	{
		console.error('錯誤: 必須提供 --text 或 --file 參數');
		console.error('Error: Must provide --text or --file parameter');
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
			matchExpected: null,
			result: [],
			outputText: '',
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
