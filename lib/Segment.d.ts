/// <reference types="node" />
import POSTAG from './POSTAG';
import Tokenizer, { ISubTokenizer } from './Tokenizer';
import Optimizer, { ISubOptimizer } from './Optimizer';
/**
 * 创建分词器接口
 */
export declare class Segment {
    static defaultOptionsDoSegment: IOptionsDoSegment;
    /**
     * 词性
     * @type {POSTAG}
     */
    POSTAG: typeof POSTAG;
    /**
     * 词典表
     * @type {{}}
     */
    DICT: {
        STOPWORD?: IDICT_STOPWORD;
        SYNONYM?: IDICT_SYNONYM;
        [key: string]: IDICT;
    };
    modules: {
        tokenizer: ISubTokenizer[];
        optimizer: ISubOptimizer[];
    };
    tokenizer: Tokenizer;
    optimizer: Optimizer;
    inited?: boolean;
    constructor();
    /**
     * 载入分词模块
     *
     * @param {String|Array|Object} module 模块名称(数组)或模块对象
     * @return {Segment}
     */
    use(module: any): this;
    _resolveDictFilename(name: string): string;
    /**
     * 载入字典文件
     *
     * @param {String} name 字典文件名
     * @param {String} type 类型
     * @param {Boolean} convert_to_lower 是否全部转换为小写
     * @return {Segment}
     */
    loadDict(name: string, type?: string, convert_to_lower?: boolean): this;
    /**
     * 取词典表
     *
     * @param {String} type 类型
     * @return {object}
     */
    getDict(type: 'STOPWORD'): IDICT_STOPWORD;
    getDict(type: 'SYNONYM'): IDICT_SYNONYM;
    getDict(type: any): IDICT;
    /**
     * 载入同义词词典
     *
     * @param {String} name 字典文件名
     */
    loadSynonymDict(name: string): this;
    /**
     * 载入停止符词典
     *
     * @param {String} name 字典文件名
     */
    loadStopwordDict(name: string): this;
    /**
     * 使用默认的识别模块和字典文件
     *
     * @return {Segment}
     */
    useDefault(): this;
    autoInit(): this;
    /**
     * 开始分词
     *
     * @param {String} text 文本
     * @param {Object} options 选项
     *   - {Boolean} simple 是否仅返回单词内容
     *   - {Boolean} stripPunctuation 去除标点符号
     *   - {Boolean} convertSynonym 转换同义词
     *   - {Boolean} stripStopword 去除停止符
     * @return {Array}
     */
    doSegment(text: string | Buffer, options: IOptionsDoSegment & {
        simple: true;
    }): string[];
    doSegment(text: string | Buffer, options?: IOptionsDoSegment): IWord[];
    /**
     * 将单词数组连接成字符串
     *
     * @param {Array} words 单词数组
     * @return {String}
     */
    toString(words: IWord[]): string;
    /**
     * 根据某个单词或词性来分割单词数组
     *
     * @param {Array} words 单词数组
     * @param {Number|String} s 用于分割的单词或词性
     * @return {Array}
     */
    split(words: IWord[], s?: string | number): IWord[];
    /**
     * 在单词数组中查找某一个单词或词性所在的位置
     *
     * @param {Array} words 单词数组
     * @param {Number|String} s 要查找的单词或词性
     * @param {Number} cur 开始位置
     * @return {Number} 找不到，返回-1
     */
    indexOf(words: IWord[], s: string | number, cur?: number): number;
}
export declare namespace Segment {
    interface IDICT<T = any> {
        [key: string]: T;
    }
    type IDICT_SYNONYM = IDICT<string>;
    type IDICT_STOPWORD = IDICT<boolean>;
    interface IWord {
        w: string;
        p?: number;
        ps?: string;
    }
    interface IOptionsDoSegment {
        /**
         * 不返回词性
         */
        simple?: boolean;
        /**
         * 去除标点符号
         */
        stripPunctuation?: boolean;
        /**
         * 转换同义词
         */
        convertSynonym?: boolean;
        /**
         * 去除停止符
         */
        stripStopword?: boolean;
    }
}
export declare type IWord = Segment.IWord;
export declare type IOptionsDoSegment = Segment.IOptionsDoSegment;
export declare type IDICT_SYNONYM = Segment.IDICT_SYNONYM;
export declare type IDICT_STOPWORD = Segment.IDICT_STOPWORD;
export interface IDICT<T = any> {
    [key: string]: T;
}
export default Segment;
