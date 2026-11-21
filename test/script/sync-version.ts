"use strict";
/**
 * 將 package.json 的 version 同步寫入 ../version.js 的 VERSION 常數，
 * 使 version.js 於運行期無需讀取 package.json。
 *
 * 與 segment-dict 之差異：novel-segment 另須保留 version_dict / versions
 * 等執行期動態導出（依賴其他套件的 version.js），不得一併固化。
 */
import fs from 'fs';
import path from 'path';
import { __root } from '../__root';

const pkg = JSON.parse(fs.readFileSync(path.join(__root, 'package.json'), 'utf8'));
const versionPath = path.join(__root, 'version.js');

const output = `"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const VERSION = "${pkg.version}";

exports.version = VERSION;
exports.default = VERSION;
Object.defineProperty(exports, "version_dict", {
    get() {
        return require('segment-dict/version').version;
    }
});
Object.defineProperty(exports, "versions", {
    get() {
        return {
            'novel-segment': VERSION,
            'segment-dict': exports.version_dict,
            'regexp-cjk': require('regexp-cjk/version').version,
            'cjk-conv': require('cjk-conv/version').version,
        };
    }
});
`

fs.writeFileSync(versionPath, output);
console.log(`version.js -> ${pkg.version}`);
