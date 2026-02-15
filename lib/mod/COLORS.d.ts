import { IDICT } from '../Segment';
/**
 * 颜色识别模块
 *
 * 提供中文颜色词汇的识别功能，包括头发颜色、常见颜色等。
 * 用于中文分词系统中的颜色词汇识别和处理。
 */
export declare namespace _COLORS {
    /**
     * 中文颜色字
     *
     * 用于标识颜色的基本汉字。
     */
    const ZH = "\u8272";
    /**
     * 头发颜色词汇列表
     *
     * 包含常见的头发颜色描述词汇，如黑色、白色、红色等。
     * 用于人名识别和颜色词汇处理。
     */
    const COLOR_HAIR: string[];
    /**
     * 所有颜色词汇列表
     *
     * 包含所有颜色词汇，包括头发颜色和从RGB数据中提取的颜色名称。
     */
    const COLOR_ALL: string[];
    /**
     * 将颜色数组转换为字典格式
     *
     * 将输入的颜色词汇数组转换为 IDICT<number> 格式的字典，
     * 其中键为颜色词汇，值为词汇长度。
     *
     * @param {string[]} a - 颜色词汇数组
     * @returns {IDICT<number>} 转换后的字典格式
     */
    function p(a: string[]): IDICT<number>;
}
/**
 * 头发颜色字典
 *
 * 将头发颜色词汇列表转换为字典格式，用于快速查找。
 */
export declare const COLOR_HAIR: IDICT<number>;
/**
 * 所有颜色字典
 *
 * 将所有颜色词汇列表转换为字典格式，用于快速查找。
 */
export declare const COLOR_ALL: IDICT<number>;
declare const _default: typeof import("./COLORS");
export default _default;
