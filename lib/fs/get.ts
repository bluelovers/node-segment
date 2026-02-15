/**
 * 檔案搜尋工具模組
 * File Search Utility Module
 *
 * 提供檔案系統搜尋功能，支援 glob 模式匹配與多路徑搜尋。
 * Provides file system search functionality with glob pattern matching and multi-path search.
 *
 * Created by user on 2018/4/13/013.
 */

import * as FastGlob from '@bluelovers/fast-glob';
import * as path from 'path';
import * as fs from 'fs';

/**
 * 搜尋選項介面
 * Search Options Interface
 *
 * 定義檔案搜尋的配置選項。
 * Defines configuration options for file search.
 */
export type IOptions = {
	/**
	 * 副檔名列表
	 * File Extension List
	 *
	 * 要搜尋的副檔名，例如 ['.ts', '.js']。
	 * File extensions to search for, e.g., ['.ts', '.js'].
	 */
	extensions?: string[],

	/**
	 * 搜尋路徑列表
	 * Search Paths List
	 *
	 * 要搜尋的目錄路徑陣列。
	 * Array of directory paths to search.
	 */
	paths: string[],

	/**
	 * 僅搜尋目錄
	 * Search Directories Only
	 *
	 * 若為 true，僅返回目錄結果。
	 * If true, only return directory results.
	 */
	onlyDir?: boolean,

	/**
	 * 僅搜尋檔案
	 * Search Files Only
	 *
	 * 若為 true，僅返回檔案結果。
	 * If true, only return file results.
	 */
	onlyFile?: boolean,

	/**
	 * 忽略模式列表
	 * Ignore Patterns List
	 *
	 * 要忽略的檔案模式，例如 ['*.bak', '*.old']。
	 * File patterns to ignore, e.g., ['*.bak', '*.old'].
	 */
	ignore?: string[],
};

/**
 * 使用 Glob 模式同步搜尋檔案
 * Synchronously Search Files Using Glob Pattern
 *
 * 在多個路徑中搜尋符合指定模式的檔案。
 * 支援副檔名自動匹配，返回第一個找到的結果。
 *
 * Searches for files matching the specified pattern across multiple paths.
 * Supports automatic extension matching, returns the first found result.
 *
 * @param {string} file - 檔案名稱或 glob 模式 / File name or glob pattern
 * @param {IOptions | string[]} options - 搜尋選項或路徑陣列 / Search options or array of paths
 * @returns {string[]} 找到的檔案路徑陣列 / Array of found file paths
 */
export function searchGlobSync(file: string, options: IOptions): string[]
// @ts-ignore
export function searchGlobSync(file: string, paths?: string[]): string[]
// @ts-ignore
export function searchGlobSync(file: string, options: IOptions): string[]
{
	options = getOptions(options);

	let ls: string[] = [];

	// 若未指定副檔名，則使用空字串 / Use empty string if no extensions specified
	options.extensions = options.extensions || [''];

	options.paths.some(function (cwd)
	{
		let bool = options.extensions
			.some(function (ext)
			{
				// 嘗試每個副檔名組合 / Try each extension combination
				let ret = _searchGlobSync(file + ext, options, cwd) as string[];

				if (ret.length)
				{
					ls = ret;

					return true;
				}
			})
		;

		if (bool || ls.length)
		{
			return true;
		}
	});

	return ls;
}

/**
 * 內部 Glob 搜尋方法
 * Internal Glob Search Method
 *
 * 執行實際的 glob 搜尋操作。
 * Performs the actual glob search operation.
 *
 * @param {string} file - 檔案模式 / File pattern
 * @param {IOptions} options - 搜尋選項 / Search options
 * @param {string} [cwd] - 工作目錄 / Working directory
 * @returns {string[]} 找到的檔案路徑陣列 / Array of found file paths
 */
export function _searchGlobSync(file, options: IOptions, cwd?: string): string[]
{
	// 設定 FastGlob 選項 / Configure FastGlob options
	let glob_options: FastGlob.Options = {
		// 標記目錄 / Mark directories
		markDirectories: true,
		// 確保結果唯一 / Ensure unique results
		unique: true,

		// 僅搜尋目錄 / Search directories only
		onlyDirectories: options.onlyDir,
		// 僅搜尋檔案（若非僅目錄模式）/ Search files only (if not directory-only mode)
		onlyFiles: !options.onlyDir,

		// 忽略模式 / Ignore patterns
		ignore: [
			'.*',
			'*.bak',
			'*.old',
			...options.ignore,
		],

		// 搜尋深度（0 表示僅當前目錄）/ Search depth (0 means current directory only)
		deep: 0,

		// 返回絕對路徑 / Return absolute paths
		absolute: true,
	};

	if (cwd)
	{
		glob_options.cwd = cwd;
	}

	return FastGlob.sync(file, glob_options) as string[];
}

/**
 * 同步搜尋第一個匹配的檔案
 * Synchronously Search for First Matching File
 *
 * 在多個路徑中搜尋第一個匹配的檔案。
 * 支援副檔名自動匹配。
 *
 * Searches for the first matching file across multiple paths.
 * Supports automatic extension matching.
 *
 * @param {string} file - 檔案名稱 / File name
 * @param {IOptions | string[]} options - 搜尋選項或路徑陣列 / Search options or array of paths
 * @returns {string | null} 找到的檔案路徑，若未找到則返回 null / Found file path, or null if not found
 * @throws {TypeError} 當檔案名稱為空或非字串時拋出錯誤 / Throws error when file name is empty or not a string
 */
export function searchFirstSync(file: string, options: IOptions): string
// @ts-ignore
export function searchFirstSync(file: string, paths?: string[]): string
// @ts-ignore
export function searchFirstSync(file: string, options: IOptions = {}): string
{
	// 驗證輸入參數 / Validate input parameter
	if (typeof file !== 'string' || file === '')
	{
		throw new TypeError();
	}

	let fp: string;

	options = getOptions(options);

	let bool = options.paths.some(function (dir)
	{
		fp = path.join(dir, file);

		let bool: boolean;

		// typescript don't know what type about options
		// TypeScript 不知道 options 的確切類型
		if ((options as IOptions).extensions)
		{
			// 嘗試每個副檔名 / Try each extension
			for (let ext of (options as IOptions).extensions)
			{
				let file = fp + ext;
				bool = existsSync(file, options as IOptions);
				if (bool)
				{
					fp = file;
					break;
				}
			}
		}
		else
		{
			bool = existsSync(fp, options as IOptions);
		}

		return bool;
	});

	if (bool)
	{
		return path.resolve(fp);
	}

	return null;
}

/**
 * 同步檢查路徑是否存在
 * Synchronously Check if Path Exists
 *
 * 檢查指定路徑是否存在，可選擇僅檢查檔案或目錄。
 * Checks if the specified path exists, optionally filtering by file or directory.
 *
 * @param {string} path - 要檢查的路徑 / Path to check
 * @param {Object} options - 檢查選項 / Check options
 * @param {boolean} [options.onlyDir] - 僅檢查目錄 / Check directories only
 * @param {boolean} [options.onlyFile] - 僅檢查檔案 / Check files only
 * @returns {boolean} 路徑是否存在且符合條件 / Whether path exists and meets conditions
 */
export function existsSync(path: string, options: {
	onlyDir?: boolean,
	onlyFile?: boolean,
} = {}): boolean
{
	let bool = fs.existsSync(path);

	// 若需要進一步檢查類型 / If further type checking is needed
	if (bool && (options.onlyDir || options.onlyFile))
	{
		let stat = fs.statSync(path);

		if (options.onlyDir && !stat.isDirectory())
		{
			bool = false;
		}
		else if (options.onlyFile && !stat.isFile())
		{
			bool = false;
		}
	}

	// @ts-ignore
	delete options.cwd;

	return bool;
}

/**
 * 取得標準化的搜尋選項
 * Get Normalized Search Options
 *
 * 將各種格式的輸入轉換為標準的 IOptions 物件。
 * Converts various input formats to a standardized IOptions object.
 *
 * @template T - 擴充的選項類型 / Extended options type
 * @param {T & IOptions} options - 搜尋選項 / Search options
 * @returns {T & IOptions} 標準化的選項物件 / Normalized options object
 */
export function getOptions<T extends IOptions>(options: T & IOptions): T & IOptions

/**
 * 取得標準化的搜尋選項
 * Get Normalized Search Options
 *
 * @param {string[]} paths - 搜尋路徑陣列 / Array of search paths
 * @returns {IOptions} 標準化的選項物件 / Normalized options object
 */
export function getOptions(paths: string[]): IOptions

// @ts-ignore
export function getOptions(options: IOptions | string[]): options is IOptions
// @ts-ignore
export function getOptions(options: IOptions | string[] = {})
{
	// 若輸入為陣列，轉換為選項物件 / If input is array, convert to options object
	if (Array.isArray(options))
	{
		let paths: string[];
		[paths, options] = [options, {} as IOptions];

		options.paths = paths;
	}

	options = Object.assign({}, options) as IOptions;

	// typescript know options is IOptions
	// 若僅搜尋目錄或無副檔名，則移除副檔名設定 / Remove extensions if directory-only or no extensions
	if (options.onlyDir || options.extensions && !options.extensions.length)
	{
		delete options.extensions;
	}

	return options;
}

/*
 * 使用範例 / Usage Examples:

let k = searchFirstSync('index', {
	paths: [
		'.',
		'..',
		'../..',
	],
	extensions: [
		'.ts',
	],
});

console.log(k);
*/

/*
console.log(searchGlobSync('fs/*', {
	paths: [
		'..',
	],

	extensions: [
		'.js',
	]
}));
*/

export default searchFirstSync;
