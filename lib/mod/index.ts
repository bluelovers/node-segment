/**
 * Created by user on 2018/4/16/016.
 */

import { $enum } from "ts-enum-util";
import { ISubOptimizer, ISubOptimizerCreate, Optimizer, SubSModuleOptimizer } from './Optimizer';
import { ISubTokenizer, ISubTokenizerCreate, SubSModuleTokenizer, Tokenizer } from './Tokenizer';
import { ISubSModule, ISubSModuleCreate, ISubSModuleMethod, SubSModule } from './mod';

export { Optimizer, SubSModuleOptimizer, ISubOptimizer, ISubOptimizerCreate }
export { Tokenizer, SubSModuleTokenizer, ISubTokenizer, ISubTokenizerCreate }
export { SubSModule, ISubSModule, ISubSModuleCreate, ISubSModuleMethod }

/**
 * 识别模块
 * 强制分割类单词识别
 */
export enum ENUM_SUBMODS
{
	/**
	 * URL识别
	 */
	URLTokenizer = 'URLTokenizer',
	/**
	 * 通配符，必须在标点符号识别之前
	 */
	WildcardTokenizer = 'WildcardTokenizer',
	/**
	 * 标点符号识别
	 */
	PunctuationTokenizer = 'PunctuationTokenizer',
	/**
	 * 外文字符、数字识别，必须在标点符号识别之后
	 */
	ForeignTokenizer = 'ForeignTokenizer',

	// 中文单词识别

	/**
	 * 词典识别
	 */
	DictTokenizer = 'DictTokenizer',
	/**
	 * 人名识别，建议在词典识别之后
	 */
	ChsNameTokenizer = 'ChsNameTokenizer',

	JpSimpleTokenizer = 'JpSimpleTokenizer',

	/**
	 * 注音
	 */
	ZhuyinTokenizer = 'ZhuyinTokenizer',

	/**
	 * 部首
	 */
	//ZhRadicalTokenizer = 'ZhRadicalTokenizer',

	// @todo 优化模块

	/**
	 * 邮箱地址识别
	 */
	EmailOptimizer = 'EmailOptimizer',
	/**
	 * 人名识别优化
	 */
	ChsNameOptimizer = 'ChsNameOptimizer',
	/**
	 * 词典识别优化
	 */
	DictOptimizer = 'DictOptimizer',
	/**
	 * 日期时间识别优化
	 */
	DatetimeOptimizer = 'DatetimeOptimizer',

	/**
	 * 合併外文與中文的詞
	 * 例如 Ｔ恤
	 */
	ForeignOptimizer = 'ForeignOptimizer',

	/**
	 * 自動處理 `里|裏|后`
	 */
	ZhtSynonymOptimizer = 'ZhtSynonymOptimizer',

	AdjectiveOptimizer = 'AdjectiveOptimizer',
}

/**
 * 不包含在預設模組列表內 需要手動指定
 */
export enum ENUM_SUBMODS_OTHER
{
	/**
	 * 单字切分模块
	 */
	SingleTokenizer = 'SingleTokenizer',
}

export type ENUM_SUBMODS_NAME = ENUM_SUBMODS | ENUM_SUBMODS_OTHER;

export const LIST_SUBMODS_NOT_DEF = [
	ENUM_SUBMODS.ZhtSynonymOptimizer,
];

export const SUBMODS_LIST = $enum(ENUM_SUBMODS);
export const SUBMODS_OTHER_LIST = $enum(ENUM_SUBMODS_OTHER);

/**
 * 取得列表並且保持 ENUM 順序
 * @param {boolean} all
 * @returns {ENUM_SUBMODS[]}
 */
export function getDefault(all?: boolean): ENUM_SUBMODS[]
{
	let list = SUBMODS_LIST.getKeys();

	return Object.keys(ENUM_SUBMODS)
		.reduce(function (a, m)
		{
			if (!a.includes(m) && list.includes(m as any))
			{
				if (all || !LIST_SUBMODS_NOT_DEF.includes(m as any))
				{
					a.push(m);
				}
			}

			return a;
		}, [])
		;
}

//console.log(getDefault(true));

export default getDefault;
