/**
 * Created by user on 2018/4/15/015.
 */

import Segment, { POSTAG } from '../index';
import { useDefault, getDefaultModList } from '../lib';
import * as fs from "fs";
import { createSegment } from './lib';
import { debug_token } from '../lib/util'
import { getDictMain } from './lib/index';

const segment = createSegment();

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
;

console.time(`doSegment`);

let text = `新疆克拉玛依2015-2016学年新疆乌鲁木齐九十八中七年级
（上）期中数学试卷`;

let ret = segment.doSegment(text);

debug_token(ret);

fs.writeFileSync('./temp/c1.json', JSON.stringify({
	ret,
}, null, "\t"));

fs.writeFileSync('./temp/c1.txt', segment.stringify(ret));

console.timeEnd(`doSegment`);
