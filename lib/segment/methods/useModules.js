"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._isIgnoreModules = _isIgnoreModules;
exports._warnIgnoreModules = _warnIgnoreModules;
exports.useModules = useModules;
function _isIgnoreModules(me, mod, ...argv) {
    var _a, _b;
    return ((_b = (_a = me.options) === null || _a === void 0 ? void 0 : _a.disableModules) === null || _b === void 0 ? void 0 : _b.includes(mod));
}
function _warnIgnoreModules(mod) {
    console.warn(`can't use this mod, because it got disable: ${mod}`);
}
function useModules(me, mod, ...argv) {
    if (_isIgnoreModules(me, mod, ...argv)) {
        _warnIgnoreModules(mod);
    }
    else {
        // 初始化并注册模块
        let c = mod.init(me, ...argv);
        if (typeof c !== 'undefined') {
            mod = c;
        }
        if (!['tokenizer', 'optimizer'].includes(mod.type)) {
            throw new TypeError(`not a valid module, ${mod}`);
        }
        // @ts-ignore
        me.modules[mod.type].push(mod);
    }
    return me;
}
//# sourceMappingURL=useModules.js.map