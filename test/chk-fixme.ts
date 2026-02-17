/**
 * 已知問題測試檢查工具
 * Known Issues Test Checker
 *
 * 運行已知問題（fixme）測試的 Mocha 命令列工具。
 * 用於執行在 fixme.data.ts 中定義的測試案例。
 *
 * Command line tool to run known issues (fixme) tests using Mocha.
 * Executes test cases defined in fixme.data.ts.
 *
 * @created 2019/4/12
 * @see fixme.data.ts
 * @see lazyMatch
 */

import Mocha = require('mocha');
import fs = require('fs');
import path = require('path');
import yargs = require('yargs');

/** 命令列參數 / Command line arguments */
let cli = yargs
	.argv
;

// @ts-ignore
/** Mocha 測試執行器 / Mocha test runner */
const mocha = new Mocha(cli);

/** 加載已知問題測試檔案 / Load known issues test file */
mocha.addFile(
	path.join(__dirname, 'lazy.fixme')
);

/** 運行測試並處理失敗結果 / Run tests and handle failures */
mocha.run(function(failures) {

	failures && console.warn(`Tests failed: ${failures}`);

	process.exitCode = 0;
});

try
{
	mocha.allowUncaught()
}
catch (e)
{

}

process.exitCode = 0;
