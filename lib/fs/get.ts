/**
 * Created by user on 2018/4/13/013.
 */

import * as FastGlob from '@bluelovers/fast-glob';
import * as path from 'path';
import * as fs from 'fs';

export type IOptions = {
	extensions?: string[],
	paths: string[],

	onlyDir?: boolean,
	onlyFile?: boolean,

	ignore?: string[],
};

export function searchGlobSync(file: string, options: IOptions): string[]
// @ts-ignore
export function searchGlobSync(file: string, paths?: string[]): string[]
// @ts-ignore
export function searchGlobSync(file: string, options: IOptions): string[]
{
	options = getOptions(options);

	let ls: string[] = [];

	options.extensions = options.extensions || [''];

	options.paths.some(function (cwd)
	{
		let bool = options.extensions
			.some(function (ext)
			{
				let ret = _searchGlobSync(file + ext, options, cwd) as string[];

				if (ret.length)
				{
					ls = ret;

					return true;
				}
			})
		;

		if (bool || ls.length)
		{
			return true;
		}
	});

	return ls;
}

export function _searchGlobSync(file, options: IOptions, cwd?: string): string[]
{
	let glob_options: FastGlob.Options = {
		markDirectories: true,
		unique: true,

		onlyDirectories: options.onlyDir,
		onlyFiles: !options.onlyDir,

		ignore: [
			'.*',
			'*.bak',
			'*.old',
			...options.ignore,
		],

		deep: 0,

		absolute: true,
	};

	if (cwd)
	{
		glob_options.cwd = cwd;
	}

	return FastGlob.sync(file, glob_options) as string[];
}

export function searchFirstSync(file: string, options: IOptions): string
// @ts-ignore
export function searchFirstSync(file: string, paths?: string[]): string
// @ts-ignore
export function searchFirstSync(file: string, options: IOptions = {}): string
{
	if (typeof file !== 'string' || file === '')
	{
		throw new TypeError();
	}

	let fp: string;

	options = getOptions(options);

	let bool = options.paths.some(function (dir)
	{
		fp = path.join(dir, file);

		let bool: boolean;

		// typescript don't know what type about options
		if ((options as IOptions).extensions)
		{
			for (let ext of (options as IOptions).extensions)
			{
				let file = fp + ext;
				bool = existsSync(file, options as IOptions);
				if (bool)
				{
					fp = file;
					break;
				}
			}
		}
		else
		{
			bool = existsSync(fp, options as IOptions);
		}

		return bool;
	});

	if (bool)
	{
		return path.resolve(fp);
	}

	return null;
}

export function existsSync(path: string, options: {
	onlyDir?: boolean,
	onlyFile?: boolean,
} = {}): boolean
{
	let bool = fs.existsSync(path);

	if (bool && (options.onlyDir || options.onlyFile))
	{
		let stat = fs.statSync(path);

		if (options.onlyDir && !stat.isDirectory())
		{
			bool = false;
		}
		else if (options.onlyFile && !stat.isFile())
		{
			bool = false;
		}
	}

	// @ts-ignore
	delete options.cwd;

	return bool;
}

export function getOptions<T extends IOptions>(options: T & IOptions): T & IOptions
export function getOptions(paths: string[]): IOptions
// @ts-ignore
export function getOptions(options: IOptions | string[]): options is IOptions
// @ts-ignore
export function getOptions(options: IOptions | string[] = {})
{
	if (Array.isArray(options))
	{
		let paths: string[];
		[paths, options] = [options, {} as IOptions];

		options.paths = paths;
	}

	options = Object.assign({}, options) as IOptions;

	// typescript know options is IOptions
	if (options.onlyDir || options.extensions && !options.extensions.length)
	{
		delete options.extensions;
	}

	return options;
}

/*
let k = searchFirstSync('index', {
	paths: [
		'.',
		'..',
		'../..',
	],
	extensions: [
		'.ts',
	],
});

console.log(k);
*/

/*
console.log(searchGlobSync('fs/*', {
	paths: [
		'..',
	],

	extensions: [
		'.js',
	]
}));
*/

export default searchFirstSync;
