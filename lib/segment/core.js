"use strict";
/**
 * 分詞器核心類別模組
 * Segmenter Core Class Module
 *
 * 提供中文分詞的核心功能實作。
 * Provides core functionality implementation for Chinese word segmentation.
 *
 * @author 老雷<leizongmin@gmail.com>
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SegmentCore = void 0;
const index_1 = require("../mod/index");
const split_1 = require("./methods/split");
const indexOf_1 = require("./methods/indexOf");
const convertSynonym_1 = require("./methods/convertSynonym");
const listModules_1 = require("./methods/listModules");
const _get_text_1 = require("./methods/_get_text");
const getOptionsDoSegment_1 = require("./methods/getOptionsDoSegment");
const useModules_1 = require("./methods/useModules");
const doSegment_1 = require("./methods/doSegment");
const ids_1 = require("@novel-segment/postag/lib/postag/ids");
const stringify_1 = require("@novel-segment/stringify");
/**
 * 分詞器核心類別
 * Segmenter Core Class
 *
 * 建立分詞器介面，提供中文分詞的核心功能。
 * 包含字典管理、分詞模組載入、分詞執行等功能。
 *
 * Creates a segmenter interface, providing core functionality for Chinese word segmentation.
 * Includes dictionary management, segmentation module loading, and segmentation execution.
 */
class SegmentCore {
    /**
     * 建構函式
     * Constructor
     *
     * 初始化分詞器實例。
     * Initializes a segmenter instance.
     *
     * @param {IOptionsSegment} [options={}] - 分詞器選項 / Segmenter options
     */
    constructor(options = {}) {
        /**
         * 分段正則表達式
         * Segment Splitter Regular Expression
         *
         * 由於 segment 是利用對內容的前後文分析來進行分詞，
         * 所以如何切割段落對於結果就會產生不同影響。
         *
         * Since segment uses context analysis for word segmentation,
         * how paragraphs are split affects the results.
         *
         * 支援類型：
         * - `RegExp` 正則表達式
         * - 具有 `.[Symbol.split](input: string, limit?: number) => string[]` 的物件
         *
         * @type {Segment.ISPLIT}
         */
        this.SPLIT = /([\r\n]+|^[　\s]+|[　\s]+$|[　\s]{2,})/gm;
        /**
         * 分段過濾器
         * Segment Filter
         *
         * 分段之後，如果符合以下條件，則直接忽略分析。
         * 支援 `RegExp` 或具有 `.test(input: string) => boolean` 的物件。
         *
         * After segmentation, if the segment matches the following conditions,
         * it will be directly ignored for analysis.
         * Supports `RegExp` or objects with `.test(input: string) => boolean`.
         *
         * @type {Segment.ISPLIT_FILTER}
         */
        this.SPLIT_FILTER = /^([\r\n]+)$/g;
        /**
         * 詞性標記
         * Part of Speech Tags
         *
         * 詞性常數定義，用於標記分詞結果的詞性。
         * Part of speech constants for tagging segmentation results.
         *
         * @type {POSTAG}
         */
        this.POSTAG = ids_1.POSTAG;
        /**
         * 字典表
         * Dictionary Tables
         *
         * 儲存各類字典資料，包括分隔詞、同義詞等。
         * Stores various dictionary data, including stopwords (separators), synonyms, etc.
         *
         * @type {Object}
         */
        this.DICT = {};
        /**
         * 模組集合
         * Modules Collection
         *
         * 儲存已載入的分詞模組與優化模組。
         * Stores loaded tokenizer and optimizer modules.
         */
        this.modules = {
            /**
             * 分詞模組列表
             * Tokenizer Modules List
             */
            tokenizer: [],
            /**
             * 優化模組列表
             * Optimizer Modules List
             */
            optimizer: [],
        };
        /**
         * 字典資料庫實例
         * Dictionary Database Instances
         *
         * 以類型為鍵儲存字典表格實例。
         * Stores dictionary table instances keyed by type.
         */
        this.db = {};
        /**
         * 分詞器選項
         * Segmenter Options
         */
        this.options = {};
        const self = this;
        this.options = Object.assign({}, this.options, options);
        this.tokenizer = new index_1.Tokenizer(this);
        this.optimizer = new index_1.Optimizer(this);
        // 載入字典資料庫 / Load dictionary databases
        if (this.options.db) {
            this.options.db.forEach(function (data) {
                self.db[data.type] = data;
            });
        }
        delete this.options.db;
    }
    getDictDatabase(type, autocreate, libTableDict) {
        // @ts-ignore
        return this.db[type];
    }
    use(mod, ...argv) {
        (0, useModules_1.useModules)(this, mod, ...argv);
        return this;
    }
    getDict(type) {
        return this.DICT[type];
    }
    /**
     * 取得分詞操作選項
     * Get Segmentation Operation Options
     *
     * 合併傳入選項與預設選項。
     * Merges passed options with default options.
     *
     * @template T - 選項類型 / Options type
     * @param {T} [options] - 傳入的選項 / Passed options
     * @returns {T} 合併後的選項 / Merged options
     */
    getOptionsDoSegment(options) {
        return (0, getOptionsDoSegment_1.getOptionsDoSegment)(options, this.options.optionsDoSegment);
    }
    /**
     * 內部方法：取得文字內容
     * Internal Method: Get Text Content
     *
     * 將 Buffer 或字串轉換為純文字字串。
     * Converts Buffer or string to plain text string.
     *
     * @protected
     * @param {string | Buffer} text - 輸入文字 / Input text
     * @returns {string} 純文字字串 / Plain text string
     */
    _get_text(text) {
        return (0, _get_text_1._get_text)(text);
    }
    /**
     * 新增黑名單詞語
     * Add Blacklist Word
     *
     * 將詞語加入黑名單，並從主字典中移除。
     * Adds a word to the blacklist and removes it from the main dictionary.
     *
     * @param {string} word - 要加入黑名單的詞語 / Word to add to blacklist
     * @param {boolean} [remove] - 是否為移除操作（若為 true 則從黑名單移除）/ Whether this is a remove operation (if true, removes from blacklist)
     * @returns {this} 返回實例以支援鏈式呼叫 / Returns instance for method chaining
     */
    addBlacklist(word, remove) {
        let me = this;
        const BLACKLIST = me.getDictDatabase("BLACKLIST" /* EnumDictDatabase.BLACKLIST */);
        const TABLE = me.getDictDatabase("TABLE" /* EnumDictDatabase.TABLE */);
        let bool = !remove;
        if (bool) {
            // 加入黑名單並從主字典移除 / Add to blacklist and remove from main dictionary
            BLACKLIST.add(word);
            TABLE.remove(word);
        }
        else {
            // 從黑名單移除 / Remove from blacklist
            BLACKLIST.remove(word);
        }
        return this;
    }
    /**
     * 執行黑名單過濾
     * Execute Blacklist Filtering
     *
     * 根據黑名單移除主字典中的詞語。
     * Removes words from the main dictionary based on the blacklist.
     *
     * @returns {this} 返回實例以支援鏈式呼叫 / Returns instance for method chaining
     */
    doBlacklist() {
        let me = this;
        const BLACKLIST = me.getDict("BLACKLIST" /* EnumDictDatabase.BLACKLIST */);
        const TABLE = me.getDictDatabase("TABLE" /* EnumDictDatabase.TABLE */);
        // 遍歷黑名單並移除對應詞語 / Iterate blacklist and remove corresponding words
        Object.entries(BLACKLIST)
            .forEach(function ([key, bool]) {
            bool && TABLE.remove(key);
        });
        return this;
    }
    /**
     * 列出可用模組
     * List Available Modules
     *
     * 列出已載入的啟用與停用模組。
     * Lists loaded enabled and disabled modules.
     *
     * @param {IOptionsDoSegment} [options={}] - 分詞選項 / Segmentation options
     * @returns {Object} 模組列表物件 / Module list object
     */
    listModules(options = {}) {
        options = this.getOptionsDoSegment(options);
        return (0, listModules_1.listModules)(this.modules, options);
    }
    doSegment(text, options = {}) {
        const me = this;
        options = me.getOptionsDoSegment(options);
        //console.dir(options);
        // 將文字按分段規則分割 / Split text by segment rules
        let text_list = me._get_text(text)
            // @ts-ignore
            .split(this.SPLIT);
        text = undefined;
        const mods = me.listModules(options).enable;
        // 將文本按照換行符分割成多段，並逐一分詞
        // Split text into multiple segments by line breaks and segment each one
        let ret = text_list.reduce(function (ret, section) {
            //console.dir(section);
            // 檢查是否應忽略此段落 / Check if this segment should be ignored
            if (me.SPLIT_FILTER.test(section)) {
                ret = ret.concat({ w: section });
                // @ts-ignore
                section = [];
            }
            //section = section.trim();
            if (section.length > 0) {
                // 分詞 / Tokenize
                let sret = me.tokenizer.split(section, mods.tokenizer);
                // 優化 / Optimize
                sret = me.optimizer.doOptimize(sret, mods.optimizer);
                // 連接分詞結果 / Concatenate segmentation results
                if (sret.length > 0) {
                    ret = ret.concat(sret);
                }
            }
            return ret;
        }, []);
        // 去除標點符號 / Remove punctuation
        if (options.stripPunctuation) {
            ret = (0, doSegment_1._doSegmentStripPOSTAG)(ret, ids_1.POSTAG.D_W);
        }
        // 轉換同義詞 / Convert synonyms
        if (options.convertSynonym) {
            ret = this.convertSynonym(ret);
        }
        // 去除分隔詞 / Remove stopwords (separators)
        if (options.stripStopword) {
            ret = (0, doSegment_1._doSegmentStripStopword)(ret, me.getDict('STOPWORD'));
        }
        // 去除空白 / Remove spaces
        if (options.stripSpace) {
            ret = (0, doSegment_1._doSegmentStripSpace)(ret);
        }
        // 僅返回單詞內容 / Only return word content
        if (options.simple) {
            ret = (0, doSegment_1._doSegmentSimple)(ret);
        }
        return ret;
    }
    convertSynonym(ret, showcount) {
        return (0, convertSynonym_1.convertSynonym)(ret, {
            showcount,
            DICT_SYNONYM: this.getDict("SYNONYM" /* EnumDictDatabase.SYNONYM */),
            DICT_TABLE: this.getDict("TABLE" /* EnumDictDatabase.TABLE */),
            POSTAG: this.POSTAG,
        });
    }
    /**
     * 將單詞陣列連接成字串
     * Join Word Array into String
     *
     * 將分詞結果陣列連接成一個字串。
     * Joins the segmentation result array into a single string.
     *
     * @param {Array<IWord | string>} words - 單詞陣列 / Word array
     * @param {...any} argv - 其他參數 / Additional arguments
     * @returns {string} 連接後的字串 / Joined string
     */
    stringify(words, ...argv) {
        return (0, stringify_1.stringify)(words, ...argv);
    }
    /**
     * 將單詞陣列連接成字串（靜態方法）
     * Join Word Array into String (Static Method)
     *
     * 靜態方法版本的 stringify。
     * Static method version of stringify.
     *
     * @param {Array<IWord | string>} words - 單詞陣列 / Word array
     * @param {...any} argv - 其他參數 / Additional arguments
     * @returns {string} 連接後的字串 / Joined string
     */
    static stringify(words, ...argv) {
        return (0, stringify_1.stringify)(words, ...argv);
    }
    /**
     * 根據某個單詞或詞性來分割單詞陣列
     * Split Word Array by Word or Part of Speech
     *
     * 將分詞結果根據指定的單詞或詞性進行分割。
     * Splits segmentation results by the specified word or part of speech.
     *
     * @param {IWord[]} words - 單詞陣列 / Word array
     * @param {string | number} s - 用於分割的單詞或詞性 / Word or part of speech to split by
     * @param {...any} argv - 其他參數 / Additional arguments
     * @returns {IWord[]} 分割後的單詞陣列 / Split word array
     */
    split(words, s, ...argv) {
        return (0, split_1.split)(words, s, ...argv);
    }
    /**
     * 在單詞陣列中查找某個單詞或詞性所在的位置
     * Find Position of Word or Part of Speech in Word Array
     *
     * 搜尋分詞結果中指定單詞或詞性的位置。
     * Searches for the position of a specified word or part of speech in segmentation results.
     *
     * @param {IWord[]} words - 單詞陣列 / Word array
     * @param {string | number} s - 要查找的單詞或詞性 / Word or part of speech to find
     * @param {number} [cur] - 開始位置 / Starting position
     * @param {...any} argv - 其他參數 / Additional arguments
     * @returns {number} 找到的索引位置，找不到則返回 -1 / Found index position, returns -1 if not found
     */
    indexOf(words, s, cur, ...argv) {
        return (0, indexOf_1.indexOf)(words, cur, ...argv);
    }
}
exports.SegmentCore = SegmentCore;
exports.default = SegmentCore;
//# sourceMappingURL=core.js.map