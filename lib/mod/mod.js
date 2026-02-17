"use strict";
/**
 * Created by user on 2018/2/21/021.
 *
 * 基础模块
 * 为所有分词子模块提供基础类。
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubSModule = exports.SModule = void 0;
const debug_1 = require("../util/debug");
/**
 * 主模块基类
 *
 * 管理子模块并提供通用功能的主模块类。
 */
class SModule {
    /**
     * 构造函数
     *
     * @param {Segment} segment - / 分词接口实例
     */
    constructor(segment) {
        this.segment = segment;
    }
    /**
     * 在所有子模块上执行方法
     *
     * 遍历所有子模块并执行指定的方法。
     * 如果可用，自动在每个方法执行前调用 _cache()。
     *
     * @template S - 扩展 IWord 的词类型
     * @template T - 扩展 ISubSModule 的子模块类型
     * @param {string} fn - 要执行的方法名
     * @param {S[]} target - 要处理的目标词数组
     * @param {T[]} mods - 要执行的子模块数组
     * @param {...any} argv - 要传递给方法的额外参数
     * @returns {S[]} 处理后的词数组
     *
     * @protected
     */
    _doMethod(fn, target, mods, ...argv) {
        mods.forEach(function (mod) {
            // @ts-ignore
            if (typeof mod._cache === 'function') {
                // @ts-ignore
                mod._cache();
            }
            target = mod[fn](target, ...argv);
        });
        return target;
    }
}
exports.SModule = SModule;
/**
 * 子模块基类
 *
 * 所有子模块（Tokenizer 和 Optimizer）的基类。
 * 提供通用的初始化、词元创建和调试功能。
 */
class SubSModule {
    /**
     * 构造函数
     *
     * 创建新的子模块实例。如果提供了 segment，自动初始化模块。
     *
     * @param {ISModuleType} type - 模块类型（'optimizer' 或 'tokenizer'）
     * @param {Segment} segment - 分词接口实例
     * @param {...any} argv - 额外的初始化参数
     */
    constructor(type, segment, ...argv) {
        if (type) {
            this.type = type;
        }
        if (!this.type) {
            throw new Error();
        }
        if (segment) {
            this.init(segment, ...argv);
            this.inited = true;
        }
    }
    /**
     * 静态初始化方法
     *
     * 创建并初始化新的子模块实例。
     *
     * @template T - 模块类型
     * @param {Segment} segment - 分词接口实例
     * @param {...any} argv - 额外的初始化参数
     * @returns {T} 初始化的子模块实例
     */
    static init(segment, ...argv) {
        // @ts-ignore
        return this._init(this, segment, ...argv);
    }
    /**
     * 内部静态初始化方法
     *
     * 处理实际模块实例化和初始化的内部方法。
     *
     * @template T - 模块类型
     * @param {IModuleStatic<T>} libThis - 模块构造函数引用
     * @param {Segment} segment - 分词接口实例
     * @param {...any} argv - 额外的初始化参数
     * @returns {T} 初始化的子模块实例
     *
     * @protected
     */
    static _init(libThis, segment, ...argv) {
        if (!libThis.type) {
            throw new Error();
        }
        let mod = new libThis(libThis.type, segment, ...argv);
        if (!mod.inited) {
            mod.init(segment, ...argv);
            mod.inited = true;
        }
        // @ts-ignore
        return mod;
    }
    /**
     * 实例初始化方法
     *
     * 使用 segment 实例初始化子模块。
     *
     * @param {Segment} segment - 分词接口实例
     * @param {...any} argv - 额外的初始化参数
     * @returns {this} 返回实例以进行方法链式调用
     */
    init(segment, ...argv) {
        this.segment = segment;
        this.inited = true;
        //this._cache();
        return this;
    }
    /**
     * 缓存方法
     *
     * 缓存来自 segment 实例的频繁使用的数据。
     * 在处理前自动调用以提高性能。
     *
     * @param {...any} argv - 额外的缓存参数
     *
     * @protected
     */
    _cache(...argv) {
        this._POSTAG = this.segment.POSTAG;
    }
    /**
     * 创建原始词元
     *
     * 创建仅包含基本属性的最小 IWord 对象：{ w, p, f, s }。
     *
     * @template T - 扩展 IWord 的词类型
     * @template U - 调试信息类型
     * @param {T} data - 源词数据
     * @param {Partial<T & IWord>} ow - 缺失属性的回退值
     * @param {U & IWordDebugInfo} attr - 要附加的调试属性
     * @returns {T} 创建的原始词元
     *
     * @protected
     */
    createRawToken(data, ow, attr) {
        var _a, _b, _c, _d;
        // @ts-ignore
        ow = ow || {};
        let nw = {
            w: (_a = data.w) !== null && _a !== void 0 ? _a : ow.w,
            p: (_b = data.p) !== null && _b !== void 0 ? _b : ow.p,
            f: (_c = data.f) !== null && _c !== void 0 ? _c : ow.f,
            s: (_d = data.s) !== null && _d !== void 0 ? _d : ow.s,
        };
        if (attr) {
            this.debugToken(nw, attr);
        }
        return nw;
    }
    /**
     * 创建带验证的词元
     *
     * 创建词元并根据字典表验证它。
     * 自动将模块名称添加到调试信息中。
     *
     * @template T - 扩展 IWord 的词类型
     * @template U - 调试信息类型
     * @param {T} data - 源词数据
     * @param {boolean} skipCheck - 是否跳过字典验证
     * @param {U & IWordDebugInfo} attr - 要附加的调试属性
     * @returns {T} 创建的词元
     *
     * @protected
     */
    createToken(data, skipCheck, attr) {
        let TABLE = this._TABLE;
        if (!skipCheck && TABLE && !(data.w in TABLE)) {
            this.debugToken(data, {
                autoCreate: true,
            });
        }
        // 自动将模块名称添加到调试信息中
        if (this.name) {
            attr = Object.assign(attr || {});
            if (!(this.name in attr)) {
                // @ts-ignore
                attr[this.name] = true;
            }
        }
        if (attr) {
            this.debugToken(data, attr);
        }
        return data;
    }
    /**
     * 切片和替换词元
     *
     * 用新词元替换数组中的词元范围。
     *
     * @template T - 扩展 IWord 的词类型
     * @template U - 调试信息类型
     * @param {T[]} words - 要修改的词数组
     * @param {number} pos - 替换的起始位置
     * @param {number} len - 要替换的词元数量
     * @param {T} data - 新词元数据
     * @param {boolean} skipCheck - 是否跳过字典验证
     * @param {U & IWordDebugInfo} attr - 要附加的调试属性
     * @returns {T[]} 修改后的词数组
     *
     * @protected
     */
    sliceToken(words, pos, len, data, skipCheck, attr) {
        words.splice(pos, len, this.createToken(data, skipCheck, attr));
        return words;
    }
    /**
     * 调试词元辅助方法
     *
     * 为词元添加调试信息以进行故障排除。
     *
     * @template T - 词调试类型
     * @template U - 调试信息类型
     * @param {T} data - 要添加调试信息的词元
     * @param {U & IWordDebugInfo} attr - 调试属性
     * @param {true} returnToken - 是否返回词元
     * @param {...any} argv - 额外的调试参数
     * @returns {T} 带调试信息的词元
     *
     * @protected
     */
    debugToken(data, attr, returnToken, ...argv) {
        return (0, debug_1.debugToken)(data, attr, returnToken, ...argv);
    }
}
exports.SubSModule = SubSModule;
exports.default = exports;
//# sourceMappingURL=mod.js.map