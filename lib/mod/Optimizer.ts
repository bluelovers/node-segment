/**
 * 优化器模块管理器
 *
 * 管理所有优化器子模块并提供词优化功能。
 * 优化器在分词器之后运行，用于精炼和改进分词结果。
 *
 * @author 老雷<leizongmin@gmail.com>
 */
'use strict';

import { autobind } from 'core-decorators';
import { IWord, Segment } from '../Segment';
import { ISubSModule, SModule, SubSModule } from './mod';

/**
 * 子优化器接口
 *
 * 用于优化分词结果的优化器子模块接口。
 */
export type ISubOptimizer = ISubSModule & {
	type: 'optimizer',
	doOptimize(words: IWord[], ...argv): IWord[],
}

/**
 * 子优化器工厂接口
 *
 * 用于创建优化器子模块实例的工厂函数类型。
 */
export type ISubOptimizerCreate<T extends SubSModuleOptimizer, R extends SubSModuleOptimizer = SubSModuleOptimizer> = {
	(segment: Segment, ...argv): T & R,
};

/**
 * 抽象优化器子模块基类
 *
 * 所有优化器子模块的基类。
 * 提供优化分词结果的通用方法。
 *
 * @abstract
 */
@autobind
// @ts-ignore
export class SubSModuleOptimizer extends SubSModule implements ISubOptimizer
{
	public static override readonly type = 'optimizer';
	public override readonly type = 'optimizer';

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
	public doOptimize(words: IWord[], ...argv): IWord[]
	{
		throw new Error();
	}

	/**
	 * 初始化优化器子模块
	 *
	 * @param {Segment} segment - 分词接口实例
	 * @param {...any} argv - 额外的初始化参数
	 * @returns {this} 返回实例以进行方法链式调用
	 */
	public override init(segment: Segment, ...argv)
	{
		super.init(segment, ...argv);

		return this;
	}

	/**
	 * 静态初始化方法
	 *
	 * @template T - 优化器子模块类型
	 * @param {Segment} segment - 分词接口实例
	 * @param {...any} argv - 额外的初始化参数
	 * @returns {T} 初始化的优化器子模块实例
	 */
	public static override init<T extends SubSModuleOptimizer = SubSModuleOptimizer>(segment: Segment, ...argv): T
	{
		// @ts-ignore
		return super.init<T>(segment, ...argv);
	}
}

/**
 * 分词模块管理器
 *
 * 协调所有优化器子模块的主优化器类。
 * 在分词后运行以精炼和改进分词结果。
 */
export class Optimizer extends SModule
{
	override type = 'optimizer';

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
	doOptimize(words: IWord[], mods: ISubOptimizer[], ...argv): IWord[]
	{
		return this._doMethod('doOptimize', words, mods, ...argv);
	}
}

export default Optimizer;
