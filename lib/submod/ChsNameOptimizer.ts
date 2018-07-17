/**
 * 人名优化模块
 *
 * @author 老雷<leizongmin@gmail.com>
 * @version 0.1
 */

'use strict';

import { SubSModule, SubSModuleOptimizer, ISubOptimizer, SubSModuleTokenizer } from '../mod';
import CHS_NAMES, { FAMILY_NAME_1, FAMILY_NAME_2, SINGLE_NAME, DOUBLE_NAME_1, DOUBLE_NAME_2 } from '../mod/CHS_NAMES';
import Segment, { IWord } from '../Segment';
import { debug } from '../util';

export class ChsNameOptimizer extends SubSModuleOptimizer
{
	name = 'ChsNameOptimizer';

	/**
	 * 对可能是人名的单词进行优化
	 *
	 * @param {array} words 单词数组
	 * @return {array}
	 */
	doOptimize(words: IWord[]): IWord[]
	{
		//debug(words);
		const POSTAG = this._POSTAG;
		let i = 0;

		/* 第一遍扫描 */
		while (i < words.length)
		{
			let word = words[i];
			let nextword = words[i + 1];
			if (nextword)
			{
				//debug(nextword);
				// 如果为  "小|老" + 姓
				if (nextword && (word.w == '小' || word.w == '老') &&
					(nextword.w in CHS_NAMES.FAMILY_NAME_1 || nextword.w in CHS_NAMES.FAMILY_NAME_2))
				{
					/*
					words.splice(i, 2, {
						w: word.w + nextword.w,
						p: POSTAG.A_NR,
						m: [word, nextword],
					});
					*/

					this.sliceToken(words, i, 2, {
						w: word.w + nextword.w,
						p: POSTAG.A_NR,
						m: [word, nextword],
					}, undefined, {
						[this.name]: true,
					});

					i++;
					continue;
				}

				// 如果是 姓 + 名（2字以内）
				if ((word.w in CHS_NAMES.FAMILY_NAME_1 || word.w in CHS_NAMES.FAMILY_NAME_2) &&
					((nextword.p & POSTAG.A_NR) > 0 && nextword.w.length <= 2))
				{
					/*
					words.splice(i, 2, {
						w: word.w + nextword.w,
						p: POSTAG.A_NR,
						m: [word, nextword],
					});
					*/

					this.sliceToken(words, i, 2, {
						w: word.w + nextword.w,
						p: POSTAG.A_NR,
						m: [word, nextword],
					}, undefined, {
						[this.name]: true,
					});

					i++;
					continue;
				}

				// 如果相邻两个均为单字且至少有一个字是未识别的，则尝试判断其是否为人名
				if (!word.p || !nextword.p)
				{
					if ((word.w in CHS_NAMES.SINGLE_NAME && word.w == nextword.w) ||
						(word.w in CHS_NAMES.DOUBLE_NAME_1 && nextword.w in CHS_NAMES.DOUBLE_NAME_2))
					{
						/*
						words.splice(i, 2, {
							w: word.w + nextword.w,
							p: POSTAG.A_NR,
							m: [word, nextword],
						});
						*/

						this.sliceToken(words, i, 2, {
							w: word.w + nextword.w,
							p: POSTAG.A_NR,
							m: [word, nextword],
						}, undefined, {
							[this.name]: true,
						});

						// 如果上一个单词可能是一个姓，则合并
						let preword = words[i - 1];
						if (preword &&
							(preword.w in CHS_NAMES.FAMILY_NAME_1 || preword.w in CHS_NAMES.FAMILY_NAME_2))
						{

							/*
							words.splice(i - 1, 2, {
								w: preword.w + word.w + nextword.w,
								p: POSTAG.A_NR,
								m: [preword, word, nextword],
							});
							*/

							this.sliceToken(words, i - 1, 2, {
								w: preword.w + word.w + nextword.w,
								p: POSTAG.A_NR,
								m: [preword, word, nextword],
							}, undefined, {
								[this.name]: true,
							});

						}
						else
						{
							i++;
						}
						continue;
					}
				}

				// 如果为 无歧义的姓 + 名（2字以内） 且其中一个未未识别词
				if (
					(word.w in CHS_NAMES.FAMILY_NAME_1 || word.w in CHS_NAMES.FAMILY_NAME_2)
					&& (!word.p || !nextword.p)

					/**
					 * 防止將標點符號當作名字的BUG
					 */
					&& !(word.p & POSTAG.D_W || nextword.p & POSTAG.D_W)
				)
				{
					//debug(word, nextword);
					/*
					words.splice(i, 2, {
						w: word.w + nextword.w,
						p: POSTAG.A_NR,
						m: [word, nextword],
					});
					*/

					this.sliceToken(words, i, 2, {
						w: word.w + nextword.w,
						p: POSTAG.A_NR,
						m: [word, nextword],
					}, undefined, {
						[this.name]: true,
					});
				}
			}

			// 移到下一个单词
			i++;
		}

		/* 第二遍扫描 */
		i = 0;
		while (i < words.length)
		{
			let word = words[i];
			let nextword = words[i + 1];
			if (nextword)
			{
				// 如果为 姓 + 单字名
				if ((word.w in CHS_NAMES.FAMILY_NAME_1 || word.w in CHS_NAMES.FAMILY_NAME_2) &&
					nextword.w in CHS_NAMES.SINGLE_NAME)
				{
					/*
					words.splice(i, 2, {
						w: word.w + nextword.w,
						p: POSTAG.A_NR,
						m: [word, nextword],
					});
					*/

					this.sliceToken(words, i, 2, {
						w: word.w + nextword.w,
						p: POSTAG.A_NR,
						m: [word, nextword],
					}, undefined, {
						[this.name]: true,
					});

					i++;
					continue;
				}
			}

			// 移到下一个单词
			i++;
		}

		return words;
	}
}

export const init = ChsNameOptimizer.init.bind(ChsNameOptimizer) as typeof ChsNameOptimizer.init;

export default ChsNameOptimizer;

