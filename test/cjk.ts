import { crlf } from 'crlf-normalize';
import * as fs from "fs";
import * as path from "path";
import { debug } from '../lib/util';

/**
 * Created by user on 2018/4/15/015.
 */
import { text_list } from '../lib/util/cjk';
import CjkConv, { zhTable } from 'cjk-conv';

[
	`这只会 這只會
这只能 這只能`,
	//`最后岁理所当儅當然|0x1000000|10864`,
	//"轉換最後鉴个|0x20000|8定|0x100000|2918"
].forEach(function (s)
{
	let a = text_list(s);

	debug(s);
	debug(a);
});

let text: string;
/**
 * 如果設定了 file , text 會被覆寫為 file 內容
 */
let file: string;
let change = false;

text = `李三买一张三角桌子`;

file = './res/ウォルテニア戦記/第11話【西へ】其2.txt';
//file = './res/ウォルテニア戦記/第11話【西へ】其2_out.txt';
//file = './res/ウォルテニア戦記/第11話【西へ】其2_opencc.txt';

if (file)
{
	text = fs.readFileSync(file).toString();
	text = crlf(text);
}

let text_new = CjkConv.cn2tw(text);
let text_new2 = CjkConv.cjk2zht(text);
let text_new3 = CjkConv.zh2jp(text);

let cf = file ? path.basename(file, path.extname(file)) : 'test.cjk';

fs.writeFileSync(`./temp/${cf}_cn2tw.txt`, text_new);
fs.writeFileSync(`./temp/${cf}_cjk2zht.txt`, text_new2);
fs.writeFileSync(`./temp/${cf}_zh2jp.txt`, text_new3);