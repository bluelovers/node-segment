/**
 * Created by user on 2018/4/19/019.
 *
 * 常量模块
 *
 * 定义用于日期/时间识别的常量数据。
 */
import { IDICT } from '../Segment';
/**
 * 日期时间常见组合
 *
 * 中文文本中常用的日期和时间单位词汇数组。
 */
export declare let _DATETIME: string[];
/**
 * 日期时间字典
 *
 * 将日期/时间词汇映射到其字符长度的字典。
 * 用于日期/时间识别优化。
 */
export declare const DATETIME: IDICT<number>;
declare const _default: typeof import("./const");
export default _default;
