"use strict";
/**
 * 檔案搜尋工具模組
 * File Search Utility Module
 *
 * 提供檔案系統搜尋功能，支援 glob 模式匹配與多路徑搜尋。
 * Provides file system search functionality with glob pattern matching and multi-path search.
 *
 * Created by user on 2018/4/13/013.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchGlobSync = searchGlobSync;
exports._searchGlobSync = _searchGlobSync;
exports.searchFirstSync = searchFirstSync;
exports.existsSync = existsSync;
exports.getOptions = getOptions;
const tslib_1 = require("tslib");
const FastGlob = tslib_1.__importStar(require("@bluelovers/fast-glob"));
const path = tslib_1.__importStar(require("path"));
const fs = tslib_1.__importStar(require("fs"));
// @ts-ignore
function searchGlobSync(file, options) {
    options = getOptions(options);
    let ls = [];
    // 若未指定副檔名，則使用空字串 / Use empty string if no extensions specified
    options.extensions = options.extensions || [''];
    options.paths.some(function (cwd) {
        let bool = options.extensions
            .some(function (ext) {
            // 嘗試每個副檔名組合 / Try each extension combination
            let ret = _searchGlobSync(file + ext, options, cwd);
            if (ret.length) {
                ls = ret;
                return true;
            }
        });
        if (bool || ls.length) {
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
function _searchGlobSync(file, options, cwd) {
    // 設定 FastGlob 選項 / Configure FastGlob options
    let glob_options = {
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
    if (cwd) {
        glob_options.cwd = cwd;
    }
    return FastGlob.sync(file, glob_options);
}
// @ts-ignore
function searchFirstSync(file, options = {}) {
    // 驗證輸入參數 / Validate input parameter
    if (typeof file !== 'string' || file === '') {
        throw new TypeError();
    }
    let fp;
    options = getOptions(options);
    let bool = options.paths.some(function (dir) {
        fp = path.join(dir, file);
        let bool;
        // typescript don't know what type about options
        // TypeScript 不知道 options 的確切類型
        if (options.extensions) {
            // 嘗試每個副檔名 / Try each extension
            for (let ext of options.extensions) {
                let file = fp + ext;
                bool = existsSync(file, options);
                if (bool) {
                    fp = file;
                    break;
                }
            }
        }
        else {
            bool = existsSync(fp, options);
        }
        return bool;
    });
    if (bool) {
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
function existsSync(path, options = {}) {
    let bool = fs.existsSync(path);
    // 若需要進一步檢查類型 / If further type checking is needed
    if (bool && (options.onlyDir || options.onlyFile)) {
        let stat = fs.statSync(path);
        if (options.onlyDir && !stat.isDirectory()) {
            bool = false;
        }
        else if (options.onlyFile && !stat.isFile()) {
            bool = false;
        }
    }
    // @ts-ignore
    delete options.cwd;
    return bool;
}
// @ts-ignore
function getOptions(options = {}) {
    // 若輸入為陣列，轉換為選項物件 / If input is array, convert to options object
    if (Array.isArray(options)) {
        let paths;
        [paths, options] = [options, {}];
        options.paths = paths;
    }
    options = Object.assign({}, options);
    // typescript know options is IOptions
    // 若僅搜尋目錄或無副檔名，則移除副檔名設定 / Remove extensions if directory-only or no extensions
    if (options.onlyDir || options.extensions && !options.extensions.length) {
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
exports.default = searchFirstSync;
//# sourceMappingURL=get.js.map