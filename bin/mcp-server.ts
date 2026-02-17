#!/usr/bin/env node
/**
 * MCP Server - Model Context Protocol 伺服器
 * MCP Server - Model Context Protocol Server
 *
 * 提供 MCP 協議介面供 AI 助手呼叫分詞測試功能。
 * Provides MCP protocol interface for AI assistants to call segmentation test functions.
 *
 * @module dev-segment-cli/mcp-server
 */

// =============================================================================
// 模組匯入區 / Module Imports Section
// =============================================================================

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
	CallToolRequestSchema,
	ListToolsRequestSchema,
	ErrorCode,
	McpError,
} from '@modelcontextprotocol/sdk/types.js';
import { demoSegmentTestCore, ICliOptions } from './cli.core';

// =============================================================================
// MCP Server 設定 / MCP Server Configuration
// =============================================================================

/**
 * MCP Server 實例
 * MCP Server instance
 */
const server = new Server(
	{
		name: 'dev-segment-cli',
		version: '2.7.121',
	},
	{
		capabilities: {
			tools: {},
		},
	}
);

// =============================================================================
// 工具定義 / Tool Definitions
// =============================================================================

/**
 * 可用的 MCP 工具列表
 * Available MCP tools list
 */
const TOOLS = [
	{
		name: 'segment_text',
		description: '對文字進行分詞測試 / Perform segmentation test on text',
		inputSchema: {
			type: 'object' as const,
			properties: {
				text: {
					type: 'string',
					description: '待分詞的文字內容 / Text content to segment',
				},
				expectedFull: {
					type: 'string',
					description: '預期的完整分詞結果 / Expected full segmentation result',
				},
				expectedContains: {
					type: 'array',
					items: {
						oneOf: [
							{ type: 'string' },
							{ type: 'array', items: { type: 'string' } },
						],
					},
					description: '預期應該包含的詞彙（有序匹配）/ Expected words to contain (ordered match)',
				},
				expectedContainsNot: {
					type: 'array',
					items: {
						oneOf: [
							{ type: 'string' },
							{ type: 'array', items: { type: 'string' } },
						],
					},
					description: '預期不應該包含的詞彙 / Words that should NOT be contained',
				},
				expectedIndexOf: {
					type: 'array',
					items: {
						oneOf: [
							{ type: 'string' },
							{ type: 'array', items: { type: 'string' } },
						],
					},
					description: '預期轉換後應該包含的字詞（同義詞匹配）/ Expected words after synonym transformation',
				},
				expectedIndexOfNot: {
					type: 'array',
					items: {
						oneOf: [
							{ type: 'string' },
							{ type: 'array', items: { type: 'string' } },
						],
					},
					description: '預期轉換後不應該包含的字詞 / Words that should NOT exist after transformation',
				},
				dictEntries: {
					type: 'array',
					items: { type: 'array' },
					description: '額外的字典項目 / Additional dictionary entries',
				},
				synonymEntries: {
					type: 'array',
					items: { type: 'array' },
					description: '額外的同義詞項目 / Additional synonym entries',
				},
				blacklistWords: {
					type: 'array',
					items: { type: 'string' },
					description: '黑名單詞彙 / Blacklist words',
				},
				debugEach: {
					type: 'boolean',
					default: false,
					description: '逐行除錯模式 / Line-by-line debug mode',
				},
			},
			required: ['text'],
		},
	},
	{
		name: 'segment_file',
		description: '從檔案讀取文字進行分詞測試 / Read text from file for segmentation test',
		inputSchema: {
			type: 'object' as const,
			properties: {
				file: {
					type: 'string',
					description: '要讀取文字的檔案路徑 / File path to read text from',
				},
				expectedFullFile: {
					type: 'string',
					description: '要讀取預期結果的檔案路徑 / File path to read expected result from',
				},
				outputFile: {
					type: 'string',
					description: '輸出 JSON 結果的檔案路徑 / File path to write JSON result',
				},
				outputFormat: {
					type: 'string',
					enum: ['json', 'text'],
					default: 'json',
					description: '輸出格式 / Output format',
				},
			},
			required: ['file'],
		},
	},
];

// =============================================================================
// 請求處理 / Request Handlers
// =============================================================================

/**
 * 處理工具列表請求
 * Handle tools list request
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
	return { tools: TOOLS };
});

/**
 * 處理工具呼叫請求
 * Handle tool call request
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
	const { name, arguments: args } = request.params;

	try
	{
		let options: ICliOptions;

		switch (name)
		{
			case 'segment_text':
				options = {
					text: args.text as string,
					expectedFull: args.expectedFull as string | undefined,
					expectedContains: args.expectedContains as (string | string[])[] | undefined,
					expectedContainsNot: args.expectedContainsNot as (string | string[])[] | undefined,
					expectedIndexOf: args.expectedIndexOf as (string | string[])[] | undefined,
					expectedIndexOfNot: args.expectedIndexOfNot as (string | string[])[] | undefined,
					dictEntries: args.dictEntries as Parameters<import('@novel-segment/table-dict').TableDict['add']>[] | undefined,
					synonymEntries: args.synonymEntries as Parameters<import('@novel-segment/table-synonym').TableDictSynonym['add']>[] | undefined,
					blacklistWords: args.blacklistWords as string[] | undefined,
					debugEach: args.debugEach as boolean | undefined,
					outputFormat: 'json',
				};
				break;

			case 'segment_file':
				options = {
					file: args.file as string,
					expectedFullFile: args.expectedFullFile as string | undefined,
					outputFile: args.outputFile as string | undefined,
					outputFormat: (args.outputFormat as 'json' | 'text') || 'json',
				};
				break;

			default:
				throw new McpError(ErrorCode.MethodNotFound, `未知的工具 / Unknown tool: ${name}`);
		}

		// 執行分詞測試
		// Execute segmentation test
		const result = await demoSegmentTestCore(options);

		return {
			content: [
				{
					type: 'text',
					text: JSON.stringify(result, null, 2),
				},
			],
		};
	}
	catch (error)
	{
		if (error instanceof McpError)
		{
			throw error;
		}

		throw new McpError(
			ErrorCode.InternalError,
			`執行錯誤 / Execution error: ${error instanceof Error ? error.message : String(error)}`
		);
	}
});

// =============================================================================
// 啟動伺服器 / Start Server
// =============================================================================

/**
 * 啟動 MCP Server
 * Start MCP Server
 */
async function main(): Promise<void>
{
	const transport = new StdioServerTransport();
	await server.connect(transport);
	console.error('dev-segment-cli MCP Server 已啟動 / dev-segment-cli MCP Server started');
}

main().catch((error) => {
	console.error('MCP Server 啟動失敗 / MCP Server failed to start:', error);
	process.exit(1);
});
