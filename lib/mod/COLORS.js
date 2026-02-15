"use strict";
// @flow
Object.defineProperty(exports, "__esModule", { value: true });
exports.COLOR_ALL = exports.COLOR_HAIR = exports._COLORS = void 0;
const tslib_1 = require("tslib");
const list_1 = require("@lazy-cjk/zh-table-list/list");
const uni_string_1 = tslib_1.__importDefault(require("uni-string"));
const colors_with_rgb_1 = require("./data/colors/colors_with_rgb");
/**
 * 颜色识别模块
 *
 * 提供中文颜色词汇的识别功能，包括头发颜色、常见颜色等。
 * 用于中文分词系统中的颜色词汇识别和处理。
 */
var _COLORS;
(function (_COLORS) {
    /**
     * 中文颜色字
     *
     * 用于标识颜色的基本汉字。
     */
    _COLORS.ZH = '色';
    /**
     * 头发颜色词汇列表
     *
     * 包含常见的头发颜色描述词汇，如黑色、白色、红色等。
     * 用于人名识别和颜色词汇处理。
     */
    _COLORS.COLOR_HAIR = [
        '乌',
        '朱',
        '栗',
        '桃',
        '棕',
        '橘',
        '橙',
        '灰',
        '白',
        '碧',
        '紅',
        '紫',
        '綠',
        '红',
        '绯',
        '绿',
        '翠',
        '苍',
        '茜',
        '蓝',
        '藍',
        '褐',
        '赤',
        '金',
        '银',
        '青',
        '靛',
        '黃',
        '黄',
        '黑',
        '黒',
        '茶',
    ];
    /**
     * 所有颜色词汇列表
     *
     * 包含所有颜色词汇，包括头发颜色和从RGB数据中提取的颜色名称。
     */
    _COLORS.COLOR_ALL = [
        '丹',
        '彤',
        '绛',
        '纁',
        '赭',
        '驼',
        '赭',
        '曙',
        '墨',
        '米',
        '缃',
        '藕',
        '玄',
        '皂',
        '黛',
        '黝',
        '素',
        '杏',
        '缟',
        '鹤',
        '皓',
        '华',
        ..._COLORS.COLOR_HAIR,
        ...colors_with_rgb_1.COLOR_WITH_RGB.map(item => item[0]),
    ];
    /**
     * 将颜色数组转换为字典格式
     *
     * 将输入的颜色词汇数组转换为 IDICT<number> 格式的字典，
     * 其中键为颜色词汇，值为词汇长度。
     *
     * @param {string[]} a - 颜色词汇数组
     * @returns {IDICT<number>} 转换后的字典格式
     */
    function p(a) {
        let data = (0, list_1.arrCjk)(a)
            .sort(function (a, b) {
            let len = uni_string_1.default.size(a);
            let r = len - uni_string_1.default.size(b);
            return r;
        })
            .reduce(function (data, v) {
            data[v] = v.length;
            return data;
        }, {});
        return data;
    }
    _COLORS.p = p;
})(_COLORS || (exports._COLORS = _COLORS = {}));
/**
 * 头发颜色字典
 *
 * 将头发颜色词汇列表转换为字典格式，用于快速查找。
 */
exports.COLOR_HAIR = _COLORS.p(_COLORS.COLOR_HAIR);
/**
 * 所有颜色字典
 *
 * 将所有颜色词汇列表转换为字典格式，用于快速查找。
 */
exports.COLOR_ALL = _COLORS.p(_COLORS.COLOR_ALL);
exports.default = exports;
//# sourceMappingURL=COLORS.js.map