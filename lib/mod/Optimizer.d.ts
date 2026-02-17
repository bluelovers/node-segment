import { IWord, Segment } from '../Segment';
import { ISubSModule, SModule, SubSModule } from './mod';
/**
 * 子优化器接口
 *
 * 用于优化分词结果的优化器子模块接口。
 */
export type ISubOptimizer = ISubSModule & {
    type: 'optimizer';
    doOptimize(words: IWord[], ...argv: any[]): IWord[];
};
/**
 * 子优化器工厂接口
 *
 * 用于创建优化器子模块实例的工厂函数类型。
 */
export type ISubOptimizerCreate<T extends SubSModuleOptimizer, R extends SubSModuleOptimizer = SubSModuleOptimizer> = {
    (segment: Segment, ...argv: any[]): T & R;
};
/**
 * 抽象优化器子模块基类
 *
 * 所有优化器子模块的基类。
 * 提供优化分词结果的通用方法。
 *
 * @abstract
 */
export declare class SubSModuleOptimizer extends SubSModule implements ISubOptimizer {
    static readonly type = "optimizer";
    readonly type = "optimizer";
    /**
     * 优化词数组
     *
     * 子类必须实现此方法以定义特定的优化逻辑。
     *
     * @param {IWord[]} words - 要优化的词数组
     * @param {...any} argv - 额外参数
     * @returns {IWord[]} 优化后的词数组
     * @throws {Error} 如果子类未实现此方法
     */
    doOptimize(words: IWord[], ...argv: any[]): IWord[];
    /**
     * 初始化优化器子模块
     *
     * @param {Segment} segment - 分词接口实例
     * @param {...any} argv - 额外的初始化参数
     * @returns {this} 返回实例以进行方法链式调用
     */
    init(segment: Segment, ...argv: any[]): this;
    /**
     * 静态初始化方法
     *
     * @template T - 优化器子模块类型
     * @param {Segment} segment - 分词接口实例
     * @param {...any} argv - 额外的初始化参数
     * @returns {T} 初始化的优化器子模块实例
     */
    static init<T extends SubSModuleOptimizer = SubSModuleOptimizer>(segment: Segment, ...argv: any[]): T;
}
/**
 * 分词模块管理器
 *
 * 协调所有优化器子模块的主优化器类。
 * 在分词后运行以精炼和改进分词结果。
 */
export declare class Optimizer extends SModule {
    type: string;
    /**
     * 对一段文本进行分词 优化词数组
     *
     * 按顺序将所有优化器模块应用于词数组。
     * 每个模块可以根据需要修改、合并或拆分词。
     *
     * @param {IWord[]} words - 单词数组
     * @param {ISubOptimizer[]} mods - 分词模块数组
     * @param {...any} argv - 要传递给模块的额外参数
     * @returns {IWord[]} 优化后的词数组
     */
    doOptimize(words: IWord[], mods: ISubOptimizer[], ...argv: any[]): IWord[];
}
export default Optimizer;
