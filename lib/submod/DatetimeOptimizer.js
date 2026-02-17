'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.segment = exports.type = void 0;
exports.init = init;
exports.doOptimize = doOptimize;
const const_1 = require("../mod/const");
/**
 * 模組類型
 * Module Type
 *
 * 標識此模組為優化器類型，用於分詞系統的模組識別與調度。
 * Identifies this module as an optimizer type, used for module
 * identification and dispatching in the segmentation system.
 */
exports.type = 'optimizer';
/**
 * 模組初始化
 * Module Initialization
 *
 * 初始化日期時間優化模組，設定分詞器實例引用。
 * 此函數由分詞系統在載入模組時自動調用。
 *
 * Initializes the datetime optimizer module and sets the segmenter instance reference.
 * This function is automatically called by the segmentation system when loading the module.
 *
 * @param {Segment} _segment - 分詞器實例 / Segmenter instance
 */
function init(_segment) {
    exports.segment = _segment;
}
/**
 * 日期時間優化
 * Datetime Optimization
 *
 * 掃描詞語陣列，將相鄰的「數字 + 日期單位」組合合併為單一日期時間詞。
 * 採用貪婪匹配策略，盡可能合併連續的日期時間描述。
 *
 * Scans the word array and merges adjacent "number + date unit" combinations
 * into single datetime words. Uses greedy matching strategy to merge
 * as many consecutive datetime descriptions as possible.
 *
 * @param {IWord[]} words - 詞語陣列 / Word array
 * @param {boolean} [is_not_first] - 是否由管理器調用 / Whether called by manager
 * @returns {IWord[]} 優化後的詞語陣列 / Optimized word array
 */
function doOptimize(words, is_not_first) {
    if (typeof is_not_first === 'undefined') {
        is_not_first = false;
    }
    // 合併相鄰的能組成一個單詞的兩個詞
    // Merge adjacent words that can form a single word
    const TABLE = exports.segment.getDict('TABLE');
    const POSTAG = exports.segment.POSTAG;
    let i = 0;
    let ie = words.length - 1;
    // 迭代處理所有詞語
    // Iterate through all words
    while (i < ie) {
        let w1 = words[i];
        let w2 = words[i + 1];
        //debug(w1.w + ', ' + w2.w);
        // 檢查當前詞是否為數詞（數字類型）
        // Check if current word is a numeral (number type)
        if ((w1.p & POSTAG.A_M) > 0) {
            // =========================================
            // 日期時間組合：數字 + 日期單位，如 "2005年"
            // Datetime combination: number + date unit, e.g., "2005年"
            if (w2.w in const_1.DATETIME) {
                // 合併後的新詞
                // Merged new word
                let nw = w1.w + w2.w;
                let len = 2;
                // 儲存被合併的原始詞語
                // Store the original words being merged
                let ma = [w1, w2];
                // 繼續搜尋後面連續的日期時間描述，必須符合「數字 + 日期單位」模式
                // Continue searching for consecutive datetime descriptions,
                // must match "number + date unit" pattern
                while (true) {
                    let w11 = words[i + len];
                    let w22 = words[i + len + 1];
                    // 檢查是否符合繼續合併的條件
                    // Check if conditions for continued merging are met
                    if (w11 && w22 && (w11.p & POSTAG.A_M) > 0 && w22.w in const_1.DATETIME) {
                        len += 2;
                        nw += w11.w + w22.w;
                        ma.push(w11);
                        ma.push(w22);
                    }
                    else {
                        break;
                    }
                }
                // 將合併後的詞替換原始詞語序列
                // Replace original word sequence with merged word
                words.splice(i, len, {
                    w: nw,
                    p: POSTAG.D_T,
                    m: ma,
                });
                // 調整結束索引，因為詞語數量減少了
                // Adjust end index since word count decreased
                ie -= len - 1;
                continue;
            }
            // =========================================
        }
        // 移到下一個詞
        // Move to next word
        i++;
    }
    return words;
}
//# sourceMappingURL=DatetimeOptimizer.js.map