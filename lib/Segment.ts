/**
 * 分词器接口
 *
 * @author 老雷<leizongmin@gmail.com>
 */

import path from 'path';
import { searchFirstSync, searchGlobSync } from './fs/get';
import { TableDictBlacklist } from '@novel-segment/table-blacklist';
import { AbstractTableDictCore } from '@novel-segment/table-core-abstract';
import { TableDict } from '@novel-segment/table-dict';

import Loader from './loader';
import { TableDictStopword } from '@novel-segment/table-stopword';
import { TableDictSynonym } from '@novel-segment/table-synonym';
import SegmentDict from 'segment-dict';
import { ISubOptimizer, ISubTokenizer } from './mod';
import { ITSTypeAndStringLiteral } from 'ts-type/lib/helper/string';

import ProjectConfig from '../project.config';

import {
	IDICT,
	IDICT2,
	IDICT_BLACKLIST,
	IDICT_STOPWORD,
	IDICT_SYNONYM,
	IOptionsDoSegment,
	IOptionsSegment,
	ISPLIT,
	ISPLIT_FILTER,
} from './segment/types';
import { ArrayTwoOrMore, EnumDictDatabase, IWord } from '@novel-segment/types';
import { SegmentCore } from './segment/core';
import { ITSOverwrite } from 'ts-type';
import { defaultOptionsDoSegment } from './segment/defaults';
import { IUseDefaultOptions, useDefault } from './defaults/index';
import { useModules } from './segment/methods/useModules2';

/**
 * 创建分词器接口
 */
export class Segment extends SegmentCore
{

	static defaultOptionsDoSegment: IOptionsDoSegment = defaultOptionsDoSegment;

	override getDictDatabase<R extends TableDictSynonym>(type: ITSTypeAndStringLiteral<EnumDictDatabase.SYNONYM>,
		autocreate?: boolean,
		libTableDict?: { new(...argv): R },
	): R
	override getDictDatabase<R extends TableDict>(type: ITSTypeAndStringLiteral<EnumDictDatabase.TABLE>,
		autocreate?: boolean,
		libTableDict?: { new(...argv): R },
	): R
	override getDictDatabase<R extends TableDictStopword>(type: ITSTypeAndStringLiteral<EnumDictDatabase.STOPWORD>,
		autocreate?: boolean,
		libTableDict?: { new(...argv): R },
	): R
	override getDictDatabase<R extends TableDictBlacklist>(type: ITSTypeAndStringLiteral<EnumDictDatabase.BLACKLIST>,
		autocreate?: boolean,
		libTableDict?: { new(...argv): R },
	): R
	override getDictDatabase<R extends TableDictBlacklist>(type: ITSTypeAndStringLiteral<EnumDictDatabase.BLACKLIST_FOR_OPTIMIZER>,
		autocreate?: boolean,
		libTableDict?: { new(...argv): R },
	): R
	override getDictDatabase<R extends TableDictBlacklist>(type: ITSTypeAndStringLiteral<EnumDictDatabase.BLACKLIST_FOR_SYNONYM>,
		autocreate?: boolean,
		libTableDict?: { new(...argv): R },
	): R
	override getDictDatabase<R extends AbstractTableDictCore<any>>(type: string | ITSTypeAndStringLiteral<EnumDictDatabase>,
		autocreate?: boolean,
		libTableDict?: { new(...argv): R },
	): R
	override getDictDatabase(type: string, autocreate?: boolean, libTableDict?)
	{
		if ((autocreate || this.inited) && !this.db[type])
		{
			if (type === TableDictSynonym.type)
			{
				libTableDict = libTableDict || TableDictSynonym;
			}
			else if (type === TableDictStopword.type)
			{
				libTableDict = libTableDict || TableDictStopword;
			}
			else if (type === TableDictBlacklist.type || type === EnumDictDatabase.BLACKLIST_FOR_OPTIMIZER || type === EnumDictDatabase.BLACKLIST_FOR_SYNONYM)
			{
				libTableDict = libTableDict || TableDictBlacklist;
			}
			else
			{
				libTableDict = libTableDict || TableDict;
			}

			this.db[type] = new libTableDict(type, this.options, {
				TABLE: this.DICT[type],
			});
		}

		return this.db[type];
	}

	/**
	 * 载入分词模块
	 *
	 * @param {String|Array|Object} module 模块名称(数组)或模块对象
	 * @return {Segment}
	 */
	override use(mod: ISubOptimizer, ...argv)
	override use(mod: ISubTokenizer, ...argv)
	override use(mod: Array<ISubTokenizer | ISubOptimizer | string>, ...argv)
	override use(mod: string, ...argv)
	override use(mod, ...argv)
	override use(mod, ...argv)
	{
		useModules(this, mod, ...argv);

		this.inited = true;

		return this;
	}

	_resolveDictFilename(name: string, pathPlus: string[] = [], extPlus: string[] = []): string | string[]
	{
		let options = {
			paths: [
				'',
				ProjectConfig.dict_root,

				...pathPlus,
				path.resolve(SegmentDict.DICT_ROOT, 'segment'),
			],
			extensions: [
				'',
				...extPlus,
				'.utf8',
				'.txt',
			],

			onlyFile: true,

			ignore: [
				// 防止讀取 README.md
				'**.md',
			],
		};

		if (name.indexOf('*') !== -1)
		{
			let ls = searchGlobSync(name, options);

			if (!ls?.length)
			{
				throw Error(`Cannot find dict glob file "${name}".`);
			}

			return ls;
		}

		let filename = searchFirstSync(name, options);

		if (!filename?.length)
		{
			//console.log(name, pathPlus, extPlus);

			throw Error(`Cannot find dict file "${name}".`);
		}

		return filename;
	}

	/**
	 * 载入字典文件
	 *
	 * @param {String} name 字典文件名
	 * @param {String} type 类型
	 * @param {Boolean} convert_to_lower 是否全部转换为小写
	 * @return {Segment}
	 */
	loadDict(name: string, type?: string | ITSTypeAndStringLiteral<EnumDictDatabase>, convert_to_lower?: boolean, skipExists?: boolean)
	{
		let filename = this._resolveDictFilename(name);

		if (Array.isArray(filename))
		{
			let self = this;

			filename.forEach(v => this.loadDict(v, type, convert_to_lower, skipExists));

			//console.log(filename);

			return this;
		}

		if (!type) type = EnumDictDatabase.TABLE;     // 默认为TABLE

		const db = this.getDictDatabase(type, true);

		const TABLE = this.DICT[type] = db.TABLE;
		const TABLE2 = this.DICT[type + '2'] = db.TABLE2;

		/*
		// 初始化词典
		if (!this.DICT[type]) this.DICT[type] = {};
		if (!this.DICT[type + '2']) this.DICT[type + '2'] = {};
		let TABLE = this.DICT[type];        // 词典表  '词' => {属性}
		let TABLE2 = this.DICT[type + '2']; // 词典表  '长度' => '词' => 属性
		*/
		// 导入数据
		const POSTAG = this.POSTAG;

		let data = Loader.SegmentDictLoader.loadSync(filename);

		data.forEach(function (data)
		{
			if (convert_to_lower)
			{
				data[0] = data[0].toLowerCase();
			}

			db.add(data, skipExists);

			/*
			let [w, p, f] = data;

			if (w.length == 0)
			{
				throw new Error()
			}

			TABLE[w] = { p, f, };
			if (!TABLE2[w.length]) TABLE2[w.length] = {};
			TABLE2[w.length][w] = TABLE[w];
			*/
		});

		data = undefined;

		this.inited = true;

		return this;
	}

	/**
	 * 载入同义词词典
	 *
	 * @param {String} name 字典文件名
	 */
	loadSynonymDict(name: string, skipExists?: boolean)
	{
		let filename = this._resolveDictFilename(name, [
			path.resolve(SegmentDict.DICT_ROOT, 'synonym'),
		]);

		if (Array.isArray(filename))
		{
			let self = this;

			filename.forEach(v => this.loadSynonymDict(v, skipExists));

			return this;
		}

		const type: EnumDictDatabase.SYNONYM = EnumDictDatabase.SYNONYM;

		const db = this.getDictDatabase(type, true);

		const TABLE = this.DICT[type] = db.TABLE;

		/*
		// 初始化词典
		if (!this.DICT[type]) this.DICT[type] = {};
		// 词典表  '同义词' => '标准词'
		let TABLE = this.DICT[type] as IDICT_SYNONYM;
		// 导入数据
		*/

		let data = Loader.SegmentSynonymLoader.loadSync(filename);

		data.forEach(function (blocks: ArrayTwoOrMore<string>)
		{
			db.add(blocks, skipExists);

			/*
			let [n1, n2] = blocks;

			TABLE[n1] = n2;
			if (TABLE[n2] === n1)
			{
				delete TABLE[n2];
			}
			*/
		});

		//console.log(TABLE);

		data = undefined;

		this.inited = true;

		return this;
	}

	protected _loadBlacklistDict(name: string, type: EnumDictDatabase)
	{
		let filename = this._resolveDictFilename(name, [
			path.resolve(SegmentDict.DICT_ROOT, 'blacklist'),
		]);

		if (Array.isArray(filename))
		{
			let self = this;

			filename.forEach(v => this._loadBlacklistDict(v, type));

			return this;
		}

		const db = this.getDictDatabase(type, true);

		const TABLE = this.DICT[type] = db.TABLE;

		let data = Loader.SegmentDict
			.requireLoaderModule('line')
			.loadSync(filename, {
				filter(line: string)
				{
					return line.trim();
				},
			})
		;

		data.forEach(v => db.add(v));

		data = undefined;

		this.inited = true;

		return this;
	}

	/**
	 * 字典黑名單 在主字典內刪除此字典內有的條目
	 */
	loadBlacklistDict(name: string)
	{
		return this._loadBlacklistDict(name, EnumDictDatabase.BLACKLIST)
	}

	/**
	 * 優化器黑名單 會防止部分優化器去組合此字典內的詞
	 * 例如 人名 自動組合之類
	 */
	loadBlacklistOptimizerDict(name: string)
	{
		return this._loadBlacklistDict(name, EnumDictDatabase.BLACKLIST_FOR_OPTIMIZER)
	}

	/**
	 * 轉換黑名單 動態轉換字詞時會忽略此字典內的詞
	 */
	loadBlacklistSynonymDict(name: string)
	{
		return this._loadBlacklistDict(name, EnumDictDatabase.BLACKLIST_FOR_SYNONYM)
	}

	/**
	 * 载入停止符词典
	 *
	 * @param {String} name 字典文件名
	 */
	loadStopwordDict(name: string)
	{
		let filename = this._resolveDictFilename(name, [
			path.resolve(SegmentDict.DICT_ROOT, 'stopword'),
		]);

		if (Array.isArray(filename))
		{
			let self = this;

			filename.forEach(v => this.loadStopwordDict(v));

			return this;
		}

		const type = EnumDictDatabase.STOPWORD;

		const db = this.getDictDatabase(type, true);

		const TABLE = this.DICT[type] = db.TABLE;

		let data = Loader.SegmentDict
			.requireLoaderModule('line')
			.loadSync(filename, {
				filter(line: string)
				{
					return line.trim();
				},
			})
		;

		data.forEach(v => db.add(v));

		data = undefined;

		this.inited = true;

		return this;
	}

	/**
	 * 使用默认的识别模块和字典文件
	 * 在使用預設值的情況下，不需要主動呼叫此函數
	 *
	 * @return {Segment}
	 */
	useDefault(options?: IUseDefaultOptions, ...argv)
	useDefault(...argv)
	{
		useDefault(this, ...argv);

		this.inited = true;

		return this;
	}

	/**
	 * 此函數只需執行一次，並且一般狀況下不需要手動呼叫
	 */
	autoInit(options?: IUseDefaultOptions)
	{
		if (!this.inited)
		{
			this.inited = true;

			if (!this.modules.tokenizer.length)
			{
				this.useDefault(options);
			}
		}

		return this;
	}

	override addBlacklist(word: string, remove?: boolean)
	{
		let me = this;

		this.autoInit(this.options);

		const BLACKLIST = me.getDictDatabase(EnumDictDatabase.BLACKLIST);
		const TABLE = me.getDictDatabase(EnumDictDatabase.TABLE);

		let bool = !remove;

		if (bool)
		{
			BLACKLIST.add(word);
			TABLE.remove(word);
		}
		else
		{
			BLACKLIST.remove(word)
		}

		return this
	}

	/**
	 * remove key in TABLE by BLACKLIST
	 */
	override doBlacklist()
	{
		let me = this;

		this.autoInit(this.options);

		const BLACKLIST = me.getDict(EnumDictDatabase.BLACKLIST);
		const TABLE = me.getDictDatabase(EnumDictDatabase.TABLE);

		Object.entries(BLACKLIST)
			.forEach(function ([key, bool])
			{
				bool && TABLE.remove(key)
			})
		;

		return this
	}

	/**
	 * 开始分词
	 *
	 * @param {String} text 文本
	 * @param {Object} options 选项
	 *   - {Boolean} simple 是否仅返回单词内容
	 *   - {Boolean} stripPunctuation 去除标点符号
	 *   - {Boolean} convertSynonym 转换同义词
	 *   - {Boolean} stripStopword 去除停止符
	 * @return {Array}
	 */
	override doSegment(text: string | Buffer, options: ITSOverwrite<IOptionsDoSegment, {
		simple: true,
	}>): string[]
	override doSegment(text: string | Buffer, options?: IOptionsDoSegment): IWord[]
	override doSegment(text, options: IOptionsDoSegment = {})
	{
		this.autoInit(this.options);

		return super.doSegment(text, options) as any
	}

}

export declare namespace Segment
{
	export {
		// @ts-ignore
		IDICT,
		// @ts-ignore
		IDICT2,
		// @ts-ignore
		IDICT_BLACKLIST,
		// @ts-ignore
		IDICT_STOPWORD,
		// @ts-ignore
		IDICT_SYNONYM,
		// @ts-ignore
		IOptionsDoSegment,
		// @ts-ignore
		IOptionsSegment,
		// @ts-ignore
		ISPLIT,
		// @ts-ignore
		ISPLIT_FILTER,
		// @ts-ignore
		IWord,
	}
}

export {
	IDICT,
	IDICT2,
	IDICT_BLACKLIST,
	IDICT_STOPWORD,
	IDICT_SYNONYM,
	IOptionsDoSegment,
	IOptionsSegment,
	ISPLIT,
	ISPLIT_FILTER,
	IWord,
}

export default Segment;
