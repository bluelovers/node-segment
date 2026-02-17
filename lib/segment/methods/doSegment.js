"use strict";
/**
 * 分詞結果處理模組
 * Segmentation Result Processing Module
 *
 * 提供分詞結果的後處理功能，包括過濾標點、停用詞、空白等。
 * Provides post-processing functions for segmentation results, including filtering punctuation, stopwords, spaces, etc.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports._doSegmentStripPOSTAG = _doSegmentStripPOSTAG;
exports._doSegmentStripStopword = _doSegmentStripStopword;
exports._doSegmentStripSpace = _doSegmentStripSpace;
exports._doSegmentSimple = _doSegmentSimple;
/**
 * 移除指定詞性的詞語
 * Remove Words with Specified Part of Speech
 *
 * 從分詞結果中過濾掉具有指定詞性標記的詞語。
 * Filters out words with the specified part of speech tag from segmentation results.
 *
 * @param {IWordDebug[]} ret - 分詞結果陣列 / Segmentation result array
 * @param {POSTAG} postag - 要移除的詞性標記 / Part of speech tag to remove
 * @returns {IWordDebug[]} 過濾後的結果 / Filtered results
 */
function _doSegmentStripPOSTAG(ret, postag) {
    return ret.filter(function (item) {
        return item.p !== postag;
    });
}
/**
 * 移除停用詞
 * Remove Stopwords
 *
 * 從分詞結果中過濾掉停用詞。
 * Filters out stopwords from segmentation results.
 *
 * @param {IWordDebug[]} ret - 分詞結果陣列 / Segmentation result array
 * @param {Object} STOPWORD - 停用詞字典 / Stopword dictionary
 * @returns {IWordDebug[]} 過濾後的結果 / Filtered results
 */
function _doSegmentStripStopword(ret, STOPWORD) {
    return ret.filter(function (item) {
        return !(item.w in STOPWORD);
    });
}
/**
 * 移除空白字元
 * Remove Space Characters
 *
 * 從分詞結果中過濾掉純空白的詞語。
 * Filters out pure space words from segmentation results.
 *
 * @param {IWordDebug[]} ret - 分詞結果陣列 / Segmentation result array
 * @returns {IWordDebug[]} 過濾後的結果 / Filtered results
 */
function _doSegmentStripSpace(ret) {
    return ret.filter(function (item) {
        return !/^\s+$/g.test(item.w);
    });
}
/**
 * 簡化輸出格式
 * Simplify Output Format
 *
 * 將分詞結果轉換為僅包含詞語內容的字串陣列。
 * Converts segmentation results to a string array containing only word content.
 *
 * @param {IWordDebug[]} ret - 分詞結果陣列 / Segmentation result array
 * @returns {string[]} 僅包含詞語的字串陣列 / String array containing only words
 */
function _doSegmentSimple(ret) {
    return ret.map(function (item) {
        return item.w;
    });
}
//# sourceMappingURL=doSegment.js.map