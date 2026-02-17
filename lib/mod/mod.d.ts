/**
 * Created by user on 2018/2/21/021.
 *
 * 基础模块
 * 为所有分词子模块提供基础类。
 */
import { IDICT_BLACKLIST, IWord, Segment } from '../Segment';
import { IWordDebug, IWordDebugInfo } from '../util/index';
import { ENUM_SUBMODS_NAME } from './index';
import { POSTAG } from '@novel-segment/postag/lib/postag/ids';
/**
 * 模块类型定义
 *
 * 定义子模块的类型：优化器（Optimizer）或分词器（Tokenizer）。
 * /  optimizer (Optimizer)  tokenizer (Tokenizer)
 */
export type ISModuleType = 'optimizer' | 'tokenizer' | string;
/**
 * 主模块基类
 *
 * 管理子模块并提供通用功能的主模块类。
 */
export declare class SModule implements ISModule {
    type?: ISModuleType;
    segment: Segment;
    /**
     * 构造函数
     *
     * @param {Segment} segment - / 分词接口实例
     */
    constructor(segment: Segment);
    /**
     * 在所有子模块上执行方法
     *
     * 遍历所有子模块并执行指定的方法。
     * 如果可用，自动在每个方法执行前调用 _cache()。
     *
     * @template S - 扩展 IWord 的词类型
     * @template T - 扩展 ISubSModule 的子模块类型
     * @param {string} fn - 要执行的方法名
     * @param {S[]} target - 要处理的目标词数组
     * @param {T[]} mods - 要执行的子模块数组
     * @param {...any} argv - 要传递给方法的额外参数
     * @returns {S[]} 处理后的词数组
     *
     * @protected
     */
    protected _doMethod<S extends IWord, T extends ISubSModule>(fn: string, target: S[], mods: T[], ...argv: any[]): S[];
}
/**
 * 子模块基类
 *
 * 所有子模块（Tokenizer 和 Optimizer）的基类。
 * 提供通用的初始化、词元创建和调试功能。
 */
export declare class SubSModule implements ISubSModule {
    static type: ISModuleType;
    type: ISModuleType;
    segment: Segment;
    priority?: number;
    inited?: boolean;
    static NAME: string;
    name: string;
    /**
     * 内部字典表
     *
     * 存储用于词查找的字典数据。
     *
     * @protected
     */
    protected _TABLE?: any;
    /**
     * 词性标签引用
     *
     * 引用来自 segment 实例的 POSTAG 枚举。
     *
     * @protected
     */
    protected _POSTAG?: typeof POSTAG;
    /**
     * 黑名单字典
     *
     * 存储应从处理中排除的词。
     *
     * @protected
     */
    protected _BLACKLIST?: IDICT_BLACKLIST;
    /**
     * 构造函数
     *
     * 创建新的子模块实例。如果提供了 segment，自动初始化模块。
     *
     * @param {ISModuleType} type - 模块类型（'optimizer' 或 'tokenizer'）
     * @param {Segment} segment - 分词接口实例
     * @param {...any} argv - 额外的初始化参数
     */
    constructor(type?: ISModuleType, segment?: Segment, ...argv: any[]);
    /**
     * 静态初始化方法
     *
     * 创建并初始化新的子模块实例。
     *
     * @template T - 模块类型
     * @param {Segment} segment - 分词接口实例
     * @param {...any} argv - 额外的初始化参数
     * @returns {T} 初始化的子模块实例
     */
    static init<T extends SubSModule = SubSModule>(segment: Segment, ...argv: any[]): T;
    /**
     * 内部静态初始化方法
     *
     * 处理实际模块实例化和初始化的内部方法。
     *
     * @template T - 模块类型
     * @param {IModuleStatic<T>} libThis - 模块构造函数引用
     * @param {Segment} segment - 分词接口实例
     * @param {...any} argv - 额外的初始化参数
     * @returns {T} 初始化的子模块实例
     *
     * @protected
     */
    protected static _init<T extends SubSModule>(libThis: IModuleStatic<T>, segment: Segment, ...argv: any[]): T;
    /**
     * 实例初始化方法
     *
     * 使用 segment 实例初始化子模块。
     *
     * @param {Segment} segment - 分词接口实例
     * @param {...any} argv - 额外的初始化参数
     * @returns {this} 返回实例以进行方法链式调用
     */
    init(segment: Segment, ...argv: any[]): this;
    /**
     * 缓存方法
     *
     * 缓存来自 segment 实例的频繁使用的数据。
     * 在处理前自动调用以提高性能。
     *
     * @param {...any} argv - 额外的缓存参数
     *
     * @protected
     */
    protected _cache(...argv: any[]): void;
    /**
     * 创建原始词元
     *
     * 创建仅包含基本属性的最小 IWord 对象：{ w, p, f, s }。
     *
     * @template T - 扩展 IWord 的词类型
     * @template U - 调试信息类型
     * @param {T} data - 源词数据
     * @param {Partial<T & IWord>} ow - 缺失属性的回退值
     * @param {U & IWordDebugInfo} attr - 要附加的调试属性
     * @returns {T} 创建的原始词元
     *
     * @protected
     */
    protected createRawToken<T extends IWord, U extends IWordDebugInfo = IWordDebugInfo>(data: T, ow?: Partial<T & IWord>, attr?: U & IWordDebugInfo): T;
    /**
     * 创建带验证的词元
     *
     * 创建词元并根据字典表验证它。
     * 自动将模块名称添加到调试信息中。
     *
     * @template T - 扩展 IWord 的词类型
     * @template U - 调试信息类型
     * @param {T} data - 源词数据
     * @param {boolean} skipCheck - 是否跳过字典验证
     * @param {U & IWordDebugInfo} attr - 要附加的调试属性
     * @returns {T} 创建的词元
     *
     * @protected
     */
    protected createToken<T extends IWord, U extends IWordDebugInfo = IWordDebugInfo>(data: T, skipCheck?: boolean, attr?: U & IWordDebugInfo): T;
    /**
     * 切片和替换词元
     *
     * 用新词元替换数组中的词元范围。
     *
     * @template T - 扩展 IWord 的词类型
     * @template U - 调试信息类型
     * @param {T[]} words - 要修改的词数组
     * @param {number} pos - 替换的起始位置
     * @param {number} len - 要替换的词元数量
     * @param {T} data - 新词元数据
     * @param {boolean} skipCheck - 是否跳过字典验证
     * @param {U & IWordDebugInfo} attr - 要附加的调试属性
     * @returns {T[]} 修改后的词数组
     *
     * @protected
     */
    protected sliceToken<T extends IWord, U extends IWordDebugInfo>(words: T[], pos: number, len: number, data: T, skipCheck?: boolean, attr?: U & IWordDebugInfo): T[];
    /**
     * 调试词元辅助方法
     *
     * 为词元添加调试信息以进行故障排除。
     *
     * @template T - 词调试类型
     * @template U - 调试信息类型
     * @param {T} data - 要添加调试信息的词元
     * @param {U & IWordDebugInfo} attr - 调试属性
     * @param {true} returnToken - 是否返回词元
     * @param {...any} argv - 额外的调试参数
     * @returns {T} 带调试信息的词元
     *
     * @protected
     */
    protected debugToken<T extends IWordDebug, U extends IWordDebugInfo>(data: T, attr?: U & IWordDebugInfo, returnToken?: true, ...argv: any[]): T;
}
/**
 * 子模块方法接口
 *
 * 定义子模块处理方法的签名。
 */
export interface ISubSModuleMethod<T extends IWord, U extends IWord = T> {
    (words: T[], ...argv: any[]): U[];
}
/**
 * 子模块工厂接口
 *
 * 创建子模块实例的工厂函数类型。
 */
export interface ISubSModuleCreate<T extends SubSModule, R extends SubSModule = SubSModule> {
    (segment: Segment, ...argv: any[]): T & R;
}
/**
 * 主模块接口
 *
 * 主模块类的基础接口。
 */
export interface ISModule {
    type?: ISModuleType;
    segment: Segment;
}
/**
 * 模块静态接口
 *
 * 定义模块构造函数的静态接口。
 */
export interface IModuleStatic<T extends ISModule | SubSModule> {
    type: ISModuleType;
    new (type?: ISModuleType, segment?: Segment, ...argv: any[]): T;
    init(segment: Segment, ...argv: any[]): T;
}
/**
 * 子模块接口
 *
 * 所有子模块的基础接口。
 */
export interface ISubSModule {
    type: ISModuleType;
    segment: Segment;
    name?: ENUM_SUBMODS_NAME | string;
    priority?: number;
    init(segment: Segment, ...argv: any[]): ISubSModule;
}
declare const _default: typeof import("./mod");
export default _default;
