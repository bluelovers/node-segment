"use strict";
/**
 * 模組列表處理模組
 * Module List Processing Module
 *
 * 根據選項將模組分類為啟用與停用兩組。
 * Categorizes modules into enabled and disabled groups based on options.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.listModules = listModules;
/**
 * 列出啟用與停用的模組
 * List Enabled and Disabled Modules
 *
 * 根據 disableModules 選項將已載入的模組分類為啟用與停用兩組。
 * Categorizes loaded modules into enabled and disabled groups based on the disableModules option.
 *
 * @param {Segment["modules"]} modules - 模組集合 / Module collection
 * @param {IOptionsDoSegment} options - 分詞選項 / Segmentation options
 * @returns {Object} 包含 enable 和 disable 屬性的物件 / Object with enable and disable properties
 *
 * @example
 * ```typescript
 * const result = listModules(segment.modules, {
 *   disableModules: ['DatetimeOptimizer']
 * });
 *
 * console.log(result.enable.tokenizer);  // 啟用的分詞模組
 * console.log(result.disable.optimizer); // 停用的優化模組
 * ```
 */
function listModules(modules, options) {
    // 初始化結果結構 / Initialize result structure
    let ret = {
        enable: {
            tokenizer: [],
            optimizer: [],
        },
        disable: {
            tokenizer: [],
            optimizer: [],
        },
    };
    // 若有停用模組設定 / If there are disabled module settings
    if (options === null || options === void 0 ? void 0 : options.disableModules) {
        // 處理分詞模組 / Process tokenizer modules
        modules.tokenizer
            .forEach(function (mod) {
            let bool;
            // 檢查模組名稱是否在停用列表中 / Check if module name is in disable list
            if (mod.name) {
                if (options.disableModules.includes(mod.name)) {
                    bool = true;
                }
            }
            else {
                if (options.disableModules.includes(mod)) {
                    bool = true;
                }
            }
            // 根據狀態加入對應列表 / Add to corresponding list based on status
            ret[bool ? 'disable' : 'enable'].tokenizer.push(mod);
        });
        // 處理優化模組 / Process optimizer modules
        modules.optimizer
            .forEach(function (mod) {
            let bool;
            // 檢查模組名稱是否在停用列表中 / Check if module name is in disable list
            if (mod.name) {
                if (options.disableModules.includes(mod.name)) {
                    bool = true;
                }
            }
            else {
                if (options.disableModules.includes(mod)) {
                    bool = true;
                }
            }
            // 根據狀態加入對應列表 / Add to corresponding list based on status
            ret[bool ? 'disable' : 'enable'].optimizer.push(mod);
        });
    }
    else {
        // 無停用設定時，所有模組皆為啟用 / When no disable settings, all modules are enabled
        ret.enable.tokenizer = modules.tokenizer.slice();
        ret.enable.optimizer = modules.optimizer.slice();
    }
    return ret;
}
//# sourceMappingURL=listModules.js.map