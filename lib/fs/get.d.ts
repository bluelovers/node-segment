/**
 * 檔案搜尋工具模組
 * File Search Utility Module
 *
 * 提供檔案系統搜尋功能，支援 glob 模式匹配與多路徑搜尋。
 * Provides file system search functionality with glob pattern matching and multi-path search.
 *
 * Created by user on 2018/4/13/013.
 */
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
    extensions?: string[];
    /**
     * 搜尋路徑列表
     * Search Paths List
     *
     * 要搜尋的目錄路徑陣列。
     * Array of directory paths to search.
     */
    paths: string[];
    /**
     * 僅搜尋目錄
     * Search Directories Only
     *
     * 若為 true，僅返回目錄結果。
     * If true, only return directory results.
     */
    onlyDir?: boolean;
    /**
     * 僅搜尋檔案
     * Search Files Only
     *
     * 若為 true，僅返回檔案結果。
     * If true, only return file results.
     */
    onlyFile?: boolean;
    /**
     * 忽略模式列表
     * Ignore Patterns List
     *
     * 要忽略的檔案模式，例如 ['*.bak', '*.old']。
     * File patterns to ignore, e.g., ['*.bak', '*.old'].
     */
    ignore?: string[];
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
export declare function searchGlobSync(file: string, options: IOptions): string[];
export declare function searchGlobSync(file: string, paths?: string[]): string[];
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
export declare function _searchGlobSync(file: any, options: IOptions, cwd?: string): string[];
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
export declare function searchFirstSync(file: string, options: IOptions): string;
export declare function searchFirstSync(file: string, paths?: string[]): string;
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
export declare function existsSync(path: string, options?: {
    onlyDir?: boolean;
    onlyFile?: boolean;
}): boolean;
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
export declare function getOptions<T extends IOptions>(options: T & IOptions): T & IOptions;
/**
 * 取得標準化的搜尋選項
 * Get Normalized Search Options
 *
 * @param {string[]} paths - 搜尋路徑陣列 / Array of search paths
 * @returns {IOptions} 標準化的選項物件 / Normalized options object
 */
export declare function getOptions(paths: string[]): IOptions;
export declare function getOptions(options: IOptions | string[]): options is IOptions;
export default searchFirstSync;
