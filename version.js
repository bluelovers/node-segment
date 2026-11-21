"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const VERSION = "2.7.125";

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
