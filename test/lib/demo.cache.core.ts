/**
 * Created by user on 2018/4/15/015.
 */

import Segment, { POSTAG } from '../../index';
import { IWordDebug } from '../../lib/util/debug';
import { debug_token } from '../../lib/util'
import { createSegment, getDictMain } from './index';
import { chalkByConsole, console } from 'debug-color2';
import { EnumDictDatabase } from '@novel-segment/types';
import prettyuse = require('prettyuse');
import { printPrettyDiff } from '@novel-segment/pretty-diff';
import { outputFileSync, readFileSync } from 'fs-extra';
import { __root } from '../__root';
import { join } from 'upath2';

let file: string;
let DEBUG_EACH: boolean;

//DEBUG_EACH = true;

//file = 'C:/Home/link/dist_novel/h/在喪屍橫行的世界裡唯獨我不被襲擊/00020_第三章　市役所/00380_038　【晚宴】.txt';

console.log(Segment.versions);

const segment = createSegment(true, {
	nodeNovelMode: true,
});

let db_dict = getDictMain(segment);

/**
 * 最後一個參數的數字是代表權重 數字越高 越優先
 */
db_dict
	//.add(['在這裡', POSTAG.D_F, 0])
	//.add(['人名', POSTAG.A_NR, 0])
	//.add(['地名', POSTAG.A_NS, 0])
	//.add(['机构团体', POSTAG.A_NT, 0])
	//.add(['名词', POSTAG.D_N, 0])
	//.add(['錯字', POSTAG.BAD, 0])
	//.add(['l10n', POSTAG.A_NX, 0])
	//.add(['i18n', POSTAG.A_NX, 0])
	//.add(['像', 0x141000, 20000])
	//.add(['建筑', 0x000000, 0])
	//.add(['發现', 0x1000, 10000])

	//.add(['身影', 0x100000, 10000])

	//.add(['黑發', 0x100000, 1000])
	//	.add(['超',0x08001000,1760])
	//	.add(['公主抱',0x1000,0])
	//	.add(['是以',0x8000000,0])
	//	.add(['壓制',0x1000,1000])
	//	.add(['在干的',0x18801000,500])
	//	.add(['面包',0x100000, 800])
	//	.add(['之间',0x2100000, 1000])
	//	.add(['干吗',0x802000, 0])
	//	.add(['聖域',0x108000, 2000])
	//	.add(['全',0x48101000, 159])
	//	.add(['全體表示',0x001000, 10000])
	//	.add(['范',0x40100080, 5000])
	//	.add(['七人',0x100000, 500])
	//	.add(['意外',0x101000, 3000])
	//	.add(['民兵團',0x0100000, 2000])
	//	.add(['團團',0x8000000, 0])
	//	.add(['重要',0x001000, 2000])
	//	.add(['长剑',0x100000,2100])
	//	.add(['仿製品',0x100000,11000])
	//	.add(['中长发',0x100000,2000])
	//	.add(['內臟',0x100000,500])
	//	.add(['進发',0x1000,1000])
	//	.add(['发直',0x1000,4000])
	//.add(['否',0x101000,1000])
	//	.add(['目的',0x108000,2000])
	//	.add(['刻划',0x1000,4500])
	//	.add(['故事',0x100000,1000])
	//	.add(['刻划',0x1000,9500])
	//	.add(['將死之時',0x104000,8000])
	//	.add(['干着急',0x801000,100])
//.add(['形參',0x100000,0])
//.add(['反方',0x100000,0])
	//.add(['流', 0x0, 0])
;

let db_synonym = segment.getDictDatabase(EnumDictDatabase.SYNONYM);

db_synonym
//	.add(['頁籤', '選項卡', '標籤頁', '標簽頁'])
;

segment
//	.addBlacklist('領民間')
;

console.time(`doSegment`);

let text = `

不仅能够撤退，亦可用于奇袭。111
奇袭。111
亦可用于
用于奇袭
确认周围没有人影后，

`;

text = text.replace(/^\s+|\s+$/g, '');

if (file)
{
	text = readFileSync(file).toString()
}

let ret: IWordDebug[];

if (DEBUG_EACH)
{
	ret = text
		.split(/([\n\p{Punctuation}])/u)
		.reduce(function (a, line)
		{
			console.dir(line);

			let r = segment.doSegment(line);

			a.push(...r);

			return a;
		}, [])
	;
}
else
{
	ret = segment.doSegment(text);
}

//console.log(ret);

debug_token(ret);

const {
	text_new: output_text,
	text_new2: output_text2,
	changed,
} = printPrettyDiff(text.toString(), segment.stringify(ret));

if (changed)
{
	console.red(`changed: ${changed}`);
}

outputFileSync(join(__root, './test/temp/c1.json'), JSON.stringify({

	changed,

	ret,
}, null, "\t"));

outputFileSync(join(__root, './test/temp/c1.txt'), output_text);

console.timeEnd(`doSegment`);

console.debug(prettyuse());
