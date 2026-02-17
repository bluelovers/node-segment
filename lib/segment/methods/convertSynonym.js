"use strict";
/**
 * 同義詞轉換模組
 * Synonym Conversion Module
 *
 * 將分詞結果中的詞語轉換為其標準同義詞。
 * Converts words in segmentation results to their standard synonyms.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertSynonym = convertSynonym;
const tslib_1 = require("tslib");
const core_1 = tslib_1.__importDefault(require("deepmerge-plus/core"));
const debug_1 = require("../../util/debug");
function convertSynonym(ret, options) {
    const { showcount, POSTAG, DICT_SYNONYM, DICT_TABLE } = options;
    let total_count = 0;
    //const RAW = Symbol.for('RAW');
    /**
     * 內部同義詞轉換函式
     * Internal Synonym Conversion Function
     *
     * 執行單輪同義詞轉換，返回轉換計數與結果列表。
     * Performs a single round of synonym conversion, returns conversion count and result list.
     *
     * @param {IWordDebug[]} list - 待轉換的詞語列表 / Word list to convert
     * @returns {IConvertSynonymWithShowcount} 轉換結果 / Conversion result
     */
    function _convertSynonym(list) {
        let count = 0;
        list = list.reduce(function (a, item) {
            let bool;
            let w = item.w;
            let nw;
            let debug = (0, debug_1.debugToken)(item);
            // 檢查詞語是否在同義詞字典中 / Check if word is in synonym dictionary
            if (w in DICT_SYNONYM) {
                bool = true;
                nw = DICT_SYNONYM[w];
            }
            // 處理自動建立的複合詞 / Handle auto-created compound words
            else if (debug.autoCreate && !debug.convertSynonym && !item.ow && item.m && item.m.length) {
                nw = item.m.reduce(function (a, b) {
                    if (typeof b === 'string') {
                        a.push(b);
                    }
                    else if (b.w in DICT_SYNONYM) {
                        a.push(DICT_SYNONYM[b.w]);
                        bool = true;
                    }
                    else {
                        a.push(b.w);
                    }
                    return a;
                }, []).join('');
            }
            // 若需要轉換 / If conversion is needed
            if (bool) {
                count++;
                total_count++;
                //return { w: DICT_SYNONYM[item.w], p: item.p };
                let p = item.p;
                // 從主字典取得詞性 / Get part of speech from main dictionary
                if (w in DICT_TABLE) {
                    p = DICT_TABLE[w].p || p;
                }
                // 移除 BAD 標記 / Remove BAD tag
                if (p & POSTAG.BAD) {
                    p = p ^ POSTAG.BAD;
                }
                // 建立新的詞語物件 / Create new word object
                let item_new = (0, debug_1.debugToken)({
                    ...item,
                    w: nw,
                    ow: w,
                    p,
                    op: item.p,
                    //[RAW]: item,
                    //source: item,
                }, {
                    convertSynonym: true,
                    //_source: item,
                    /**
                     * JSON.stringify
                     * avoid TypeError: Converting circular structure to JSON
                     *
                     * 避免 TypeError: Converting circular structure to JSON
                     */
                    _source: (0, core_1.default)({}, item),
                }, true);
                a.push(item_new);
            }
            else {
                a.push(item);
            }
            debug = undefined;
            return a;
        }, []);
        return { count: count, list: list };
    }
    let result;
    // 持續轉換直到沒有更多轉換 / Keep converting until no more conversions
    do {
        result = _convertSynonym(ret);
        ret = result.list;
        result.list = undefined;
    } while (result.count > 0);
    result = undefined;
    // 若啟用計數，返回計數與列表 / If counting enabled, return count and list
    if (showcount) {
        return { count: total_count, list: ret };
    }
    return ret;
}
//# sourceMappingURL=convertSynonym.js.map