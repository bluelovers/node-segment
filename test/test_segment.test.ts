import { createSegment } from './lib';
import { IOptionsDoSegment, Segment } from '../lib/Segment';
import { mochaSetup, toStringArray } from './lib/util';
import { ENUM_SUBMODS } from '../lib/mod/index';
import { tests_old } from './res/default';
import { console } from 'debug-color2';
import { chai, relative, expect, path, assert, util, mochaAsync } from './_local-dev';

describe(relative(__filename), function ()
{

	let segment: Segment = null;

	before(function ()
	{
		mochaSetup(this);

		segment = createSegment(false, {
			disableModules: [
				//ENUM_SUBMODS.ZhtSynonymOptimizer,
			]
		});
	});

	function doSegment(a: string, options?: IOptionsDoSegment)
	{
		return segment.doSegment(a, {
			convertSynonym: false,
			disableModules: [
				ENUM_SUBMODS.ZhtSynonymOptimizer,
			],
			...options,
		})
	}

	it('init', function ()
	{

	});

	describe('default test', function ()
	{

		let equal = function (a, b)
		{
			//console.info(a);

			let c = toStringArray(doSegment(a));
			console.debug(c.join('/'));
			//assert.equal(c.toString('\t'), b.toString('\t'));

			expect(c).to.deep.equal(b)
		};

		//console.info('分词测试');

		tests_old.forEach(function (args)
		{
			it(args[0], function ()
			{
				// @ts-ignore
				equal(...args);
			});
		});

	});

	it('options: simple=true', function ()
	{
		assert.equal(doSegment('永和服装饰品有限公司', { simple: true }).join('\t'),
			['永和', '服装', '饰品', '有限公司'].join('\t'),
		);
	});

	it('options: stripPunctuation=true', function ()
	{
		assert.equal(doSegment('王五和张三丰、李强是谁', { simple: true, stripPunctuation: true }).join('').includes('丰李'),
			true,
		);
	});

	/*
	it('options: convertSynonym=true', function ()
	{
		assert.equal(doSegment('何时入睡', { simple: true, convertSynonym: true }).join('\t'),
			['什么时候', '入眠'].join('\t'),
		);
	});
	*/

	it('options: stripStopword=true', function ()
	{
		assert.equal(doSegment('因为李三买了一张三角桌子', { simple: true, stripStopword: true }).join('\t'),
			['李三', '买', '一张', '三角', '桌子'].join('\t'),
		);
	});

});
