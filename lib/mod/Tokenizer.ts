/**
 * 分词器模块管理器
 *
 * 管理所有分词器子模块并提供文本分词功能。
 *
 * @author 老雷<leizongmin@gmail.com>
 */

'use strict';

import { autobind } from 'core-decorators';
import { IWord, Segment } from '../Segment';
import { ISubSModule, SModule, SubSModule } from './mod';
import isUnset from '../util/isUnset';

/**
 * 子分词器接口
 *
 * 用于执行实际文本分割的分词器子模块接口。
 */
export type ISubTokenizer = ISubSModule & {
	type: 'tokenizer',
	split(words: IWord[], ...argv): IWord[],
}

/**
 * 子分词器工厂接口
 *
 * 用于创建分词器子模块实例的工厂函数类型。
 */
export type ISubTokenizerCreate<T extends SubSModuleTokenizer, R extends SubSModuleTokenizer = SubSModuleTokenizer> = {
	(...argv: Parameters<T["init"]>): T & R,
	(segment: Segment, ...argv): T & R,
};

/**
 * 抽象分词器子模块基类
 *
 * 所有分词器子模块的基类。
 * 提供基于不同规则分割词的通用方法。
 *
 * @abstract
 */
@autobind
// @ts-ignore
export abstract class SubSModuleTokenizer extends SubSModule implements ISubTokenizer
{
	public static override readonly type = 'tokenizer';
	public override readonly type = 'tokenizer';

	/**
	 * 抽象分割方法
	 *
	 * 子类必须实现此方法以定义特定的分词逻辑。
	 *
	 * @abstract
	 * @param {IWord[]} words - 要处理的词数组
	 * @param {...any} argv - 额外参数
	 * @returns {IWord[]} 处理后的词数组
	 */
	public abstract split(words: IWord[], ...argv): IWord[]

	/**
	 * 初始化分词器子模块
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
	 * @template T - 分词器子模块类型
	 * @param {Segment} segment - 分词接口实例
	 * @param {...any} argv - 额外的初始化参数
	 * @returns {T} 初始化的分词器子模块实例
	 */
	public static override init<T extends SubSModuleTokenizer = SubSModuleTokenizer>(segment: Segment, ...argv): T
	{
		// @ts-ignore
		return super.init<T>(segment, ...argv);
	}

	/**
	 * 仅分割未识别的词（严格模式）
	 *
	 * 仅处理没有词性标签的词（p 为 undefined）。
	 * p = 0 的词不包括在处理中。
	 *
	 * @template T - 输入词类型
	 * @template U - 输出词类型
	 * @param {T[]} words - 要处理的词数组
	 * @param {Function} fn - 处理函数，接收文本并返回词数组
	 * @returns {U[]} 处理后的词数组
	 *
	 * @protected
	 */
	protected _splitUnset<T extends IWord, U extends IWord = T>(words: T[], fn: (text: string, ...argv) => U[]): U[]
	{
		//const POSTAG = this.segment.POSTAG;

		fn = fn.bind(this);

		let ret = [];
		for (let i = 0, word; word = words[i]; i++)
		{
			if (typeof word.p === 'number')
			{
				ret.push(word);
			}
			else
			{
				let words_new = fn(word.w);

				if (isUnset(words_new))
				{
					ret.push(word);
				}
				else
				{
					ret = ret.concat(words_new);
				}
			}
		}

		return ret;
	}

	/**
	 * 仅分割未识别的词（宽松模式）
	 *
	 * 仅处理没有词性标签或 p = 0 的词。
	 * p = 0 的词包括在处理中。
	 *
	 * @template T - 输入词类型
	 * @template U - 输出词类型
	 * @param {T[]} words - 要处理的词数组
	 * @param {Function} fn - 处理函数，接收文本并返回词数组
	 * @returns {U[]} 处理后的词数组
	 *
	 * @protected
	 */
	protected _splitUnknow<T extends IWord, U extends IWord = T>(words: T[], fn: (text: string, ...argv) => U[]): U[]
	{
		//const POSTAG = this.segment.POSTAG;

		fn = fn.bind(this);

		let ret = [];
		for (let i = 0, word; word = words[i]; i++)
		{
			if (word.p)
			{
				ret.push(word);
			}
			else
			{
				//let words_new = fn.call(this, word.w);
				let words_new = fn(word.w);

				if (isUnset(words_new))
				{
					ret.push(word);
				}
				else
				{
					ret = ret.concat(words_new);
				}

			}
		}

		return ret;
	}
}

/**
 * 分词器模块管理器
 *
 * 协调所有分词器子模块的主分词器类。
 */
export class Tokenizer extends SModule
{
	override type = 'tokenizer';

	/**
	 * 将文本分割为词
	 *
	 * 使用提供的分词器模块对输入文本进行分词。
	 * 每个模块按顺序处理文本，构建词数组。
	 *
	 * @param {string} text - 要分词的文本
	 * @param {ISubTokenizer[]} mods - 要使用的分词器模块数组
	 * @param {...any} argv - 要传递给模块的额外参数
	 * @returns {IWord[]} 分词后的词数组
	 * @throws {Error} 如果未提供分词器模块
	 */
	split(text: string, mods: ISubTokenizer[], ...argv)
	{
		if (mods.length < 1)
		{
			throw Error('No tokenizer module!');
		}
		else
		{
			let ret: IWord[] = [{ w: text }];

			return this._doMethod('split', ret, mods, ...argv);

			/*
			// 按顺序分别调用各个module来进行分词 ： 各个module仅对没有识别类型的单词进行分词
			mods.forEach(function (mod)
			{
				// @ts-ignore
				if (typeof mod._cache == 'function')
				{
					// @ts-ignore
					mod._cache();
				}

				ret = mod.split(ret, ...argv);
			});
			return ret;
			*/
		}
	}
}

export default Tokenizer;
