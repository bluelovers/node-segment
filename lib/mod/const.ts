/**
 * Created by user on 2018/4/19/019.
 *
 * 常量模块
 *
 * 定义用于日期/时间识别的常量数据。
 */

import { IDICT } from '../Segment';
import { arrCjk as arr_cjk } from '@lazy-cjk/zh-table-list/list';

/**
 * 日期时间常见组合
 *
 * 中文文本中常用的日期和时间单位词汇数组。
 */
export let _DATETIME = [
	'世纪', '年', '年份', '年度', '月', '月份', '月度', '日', '号',
	'时', '点', '点钟', '分', '分钟', '秒', '毫秒'
];

/**
 * 日期时间字典
 *
 * 将日期/时间词汇映射到其字符长度的字典。
 * 用于日期/时间识别优化。
 */
export const DATETIME: IDICT<number> = arr_cjk(_DATETIME)
	.reduce(function (data, v)
	{
		data[v] = v.length;

		return data;
	}, {})
;

export default exports as typeof import('./const');
