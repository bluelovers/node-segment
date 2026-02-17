/**
 * 分词器模块管理器
 *
 * 管理所有分词器子模块并提供文本分词功能。
 *
 * @author 老雷<leizongmin@gmail.com>
 */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tokenizer = exports.SubSModuleTokenizer = void 0;
const tslib_1 = require("tslib");
const core_decorators_1 = require("core-decorators");
const mod_1 = require("./mod");
const isUnset_1 = tslib_1.__importDefault(require("../util/isUnset"));
/**
 * 抽象分词器子模块基类
 *
 * 所有分词器子模块的基类。
 * 提供基于不同规则分割词的通用方法。
 *
 * @abstract
 */
let SubSModuleTokenizer = class SubSModuleTokenizer extends mod_1.SubSModule {
    constructor() {
        super(...arguments);
        this.type = 'tokenizer';
    }
    /**
     * 初始化分词器子模块
     *
     * @param {Segment} segment - 分词接口实例
     * @param {...any} argv - 额外的初始化参数
     * @returns {this} 返回实例以进行方法链式调用
     */
    init(segment, ...argv) {
        super.init(segment, ...argv);
        return this;
    }
    /**
     * 静态初始化方法
     *
     * @template T - 分词器子模块类型
     * @param {Segment} segment - 分词接口实例
     * @param {...any} argv - 额外的初始化参数
     * @returns {T} 初始化的分词器子模块实例
     */
    static init(segment, ...argv) {
        // @ts-ignore
        return super.init(segment, ...argv);
    }
    /**
     * 仅分割未识别的词（严格模式）
     *
     * 仅处理没有词性标签的词（p 为 undefined）。
     * p = 0 的词不包括在处理中。
     *
     * @template T - 输入词类型
     * @template U - 输出词类型
     * @param {T[]} words - 要处理的词数组
     * @param {Function} fn - 处理函数，接收文本并返回词数组
     * @returns {U[]} 处理后的词数组
     *
     * @protected
     */
    _splitUnset(words, fn) {
        //const POSTAG = this.segment.POSTAG;
        fn = fn.bind(this);
        let ret = [];
        for (let i = 0, word; word = words[i]; i++) {
            if (typeof word.p === 'number') {
                ret.push(word);
            }
            else {
                let words_new = fn(word.w);
                if ((0, isUnset_1.default)(words_new)) {
                    ret.push(word);
                }
                else {
                    ret = ret.concat(words_new);
                }
            }
        }
        return ret;
    }
    /**
     * 仅分割未识别的词（宽松模式）
     *
     * 仅处理没有词性标签或 p = 0 的词。
     * p = 0 的词包括在处理中。
     *
     * @template T - 输入词类型
     * @template U - 输出词类型
     * @param {T[]} words - 要处理的词数组
     * @param {Function} fn - 处理函数，接收文本并返回词数组
     * @returns {U[]} 处理后的词数组
     *
     * @protected
     */
    _splitUnknow(words, fn) {
        //const POSTAG = this.segment.POSTAG;
        fn = fn.bind(this);
        let ret = [];
        for (let i = 0, word; word = words[i]; i++) {
            if (word.p) {
                ret.push(word);
            }
            else {
                //let words_new = fn.call(this, word.w);
                let words_new = fn(word.w);
                if ((0, isUnset_1.default)(words_new)) {
                    ret.push(word);
                }
                else {
                    ret = ret.concat(words_new);
                }
            }
        }
        return ret;
    }
};
exports.SubSModuleTokenizer = SubSModuleTokenizer;
SubSModuleTokenizer.type = 'tokenizer';
exports.SubSModuleTokenizer = SubSModuleTokenizer = tslib_1.__decorate([
    core_decorators_1.autobind
    // @ts-ignore
], SubSModuleTokenizer);
/**
 * 分词器模块管理器
 *
 * 协调所有分词器子模块的主分词器类。
 */
class Tokenizer extends mod_1.SModule {
    constructor() {
        super(...arguments);
        this.type = 'tokenizer';
    }
    /**
     * 将文本分割为词
     *
     * 使用提供的分词器模块对输入文本进行分词。
     * 每个模块按顺序处理文本，构建词数组。
     *
     * @param {string} text - 要分词的文本
     * @param {ISubTokenizer[]} mods - 要使用的分词器模块数组
     * @param {...any} argv - 要传递给模块的额外参数
     * @returns {IWord[]} 分词后的词数组
     * @throws {Error} 如果未提供分词器模块
     */
    split(text, mods, ...argv) {
        if (mods.length < 1) {
            throw Error('No tokenizer module!');
        }
        else {
            let ret = [{ w: text }];
            return this._doMethod('split', ret, mods, ...argv);
            /*
            // 按顺序分别调用各个module来进行分词 ： 各个module仅对没有识别类型的单词进行分词
            mods.forEach(function (mod)
            {
                // @ts-ignore
                if (typeof mod._cache == 'function')
                {
                    // @ts-ignore
                    mod._cache();
                }

                ret = mod.split(ret, ...argv);
            });
            return ret;
            */
        }
    }
}
exports.Tokenizer = Tokenizer;
exports.default = Tokenizer;
//# sourceMappingURL=Tokenizer.js.map