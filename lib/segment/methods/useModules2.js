"use strict";
/**
 * 模組載入模組（擴充版）
 * Module Loading Module (Extended Version)
 *
 * 提供分詞模組的載入功能，支援字串名稱與陣列格式。
 * Provides loading functionality for segmentation modules, supporting string names and array formats.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useModules = useModules;
const tslib_1 = require("tslib");
const useModules_1 = require("./useModules");
const BuildInSubMod = tslib_1.__importStar(require("../../submod"));
/**
 * 載入模組（擴充版）
 * Load Module (Extended Version)
 *
 * 支援多種輸入格式的模組載入：
 * - 模組實例物件
 * - 模組名稱字串（從內建模組中查找）
 * - 模組陣列（批次載入）
 *
 * Supports multiple input formats for module loading:
 * - Module instance object
 * - Module name string (looked up from built-in modules)
 * - Module array (batch loading)
 *
 * @template T - 分詞器類型 / Segmenter type
 * @param {T} me - 分詞器實例 / Segmenter instance
 * @param {ISubOptimizer | ISubTokenizer | string | any[]} mod - 模組實例、名稱或陣列 / Module instance, name, or array
 * @param {...any} argv - 其他參數 / Additional arguments
 * @returns {T} 分詞器實例 / Segmenter instance
 *
 * @example
 * ```typescript
 * // 載入單一模組 / Load single module
 * useModules(segment, 'DatetimeOptimizer');
 *
 * // 載入模組陣列 / Load module array
 * useModules(segment, ['DatetimeOptimizer', 'EmailOptimizer']);
 *
 * // 載入模組實例 / Load module instance
 * useModules(segment, new DatetimeOptimizer());
 * ```
 */
function useModules(me, mod, ...argv) {
    // 處理陣列格式的模組列表 / Handle array format module list
    if (Array.isArray(mod)) {
        mod.forEach(function (m) {
            useModules(me, m, ...argv);
        });
    }
    else {
        // 處理字串格式的模組名稱 / Handle string format module name
        if (typeof mod === 'string' && !(0, useModules_1._isIgnoreModules)(me, mod, ...argv)) {
            // 從內建模組中取得對應模組 / Get corresponding module from built-in modules
            //mod = require(path.join(__dirname, '../..', 'submod', mod));
            //mod = require(`../../submod/${mod}`);
            mod = BuildInSubMod[mod];
        }
        // 呼叫基礎載入函式 / Call base loading function
        (0, useModules_1.useModules)(me, mod, ...argv);
    }
    return me;
}
//# sourceMappingURL=useModules2.js.map