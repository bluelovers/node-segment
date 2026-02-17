/**
 * 分詞器核心類別模組
 * Segmenter Core Class Module
 *
 * 提供中文分詞的核心功能實作。
 * Provides core functionality implementation for Chinese word segmentation.
 *
 * @author 老雷<leizongmin@gmail.com>
 */
import { TableDictBlacklist } from '@novel-segment/table-blacklist';
import { AbstractTableDictCore } from '@novel-segment/table-core-abstract';
import { TableDict } from '@novel-segment/table-dict';
import { TableDictStopword } from '@novel-segment/table-stopword';
import { TableDictSynonym } from '@novel-segment/table-synonym';
import { ISubOptimizer, ISubTokenizer, Optimizer, Tokenizer } from '../mod/index';
import { IWordDebug } from '../util/index';
import { IDICT, IDICT2, IDICT_BLACKLIST, IDICT_STOPWORD, IDICT_SYNONYM, IOptionsDoSegment, IOptionsSegment, ISPLIT, ISPLIT_FILTER } from './types';
import { ITSTypeAndStringLiteral } from 'ts-type/lib/helper/string';
import { ITSOverwrite, ITSPartialRecord } from 'ts-type/lib/type/record';
import { POSTAG } from '@novel-segment/postag/lib/postag/ids';
import { EnumDictDatabase, IWord } from '@novel-segment/types';
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
export declare class SegmentCore {
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
    SPLIT: ISPLIT;
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
    SPLIT_FILTER: ISPLIT_FILTER;
    /**
     * 詞性標記
     * Part of Speech Tags
     *
     * 詞性常數定義，用於標記分詞結果的詞性。
     * Part of speech constants for tagging segmentation results.
     *
     * @type {POSTAG}
     */
    POSTAG: typeof POSTAG;
    /**
     * 字典表
     * Dictionary Tables
     *
     * 儲存各類字典資料，包括分隔詞、同義詞等。
     * Stores various dictionary data, including stopwords (separators), synonyms, etc.
     *
     * @type {Object}
     */
    DICT: {
        STOPWORD?: IDICT_STOPWORD;
        SYNONYM?: IDICT_SYNONYM;
        [key: string]: IDICT;
    } & ITSPartialRecord<ITSTypeAndStringLiteral<EnumDictDatabase.SYNONYM>, IDICT_SYNONYM> & ITSPartialRecord<ITSTypeAndStringLiteral<EnumDictDatabase.STOPWORD>, IDICT_STOPWORD>;
    /**
     * 模組集合
     * Modules Collection
     *
     * 儲存已載入的分詞模組與優化模組。
     * Stores loaded tokenizer and optimizer modules.
     */
    modules: {
        tokenizer: ISubTokenizer[];
        optimizer: ISubOptimizer[];
    };
    /**
     * 分詞器實例
     * Tokenizer Instance
     */
    tokenizer: Tokenizer;
    /**
     * 優化器實例
     * Optimizer Instance
     */
    optimizer: Optimizer;
    /**
     * 字典資料庫實例
     * Dictionary Database Instances
     *
     * 以類型為鍵儲存字典表格實例。
     * Stores dictionary table instances keyed by type.
     */
    db: {
        [key: string]: TableDict;
    };
    /**
     * 分詞器選項
     * Segmenter Options
     */
    options: IOptionsSegment;
    /**
     * 初始化狀態標記
     * Initialization Status Flag
     */
    inited?: boolean;
    /**
     * 建構函式
     * Constructor
     *
     * 初始化分詞器實例。
     * Initializes a segmenter instance.
     *
     * @param {IOptionsSegment} [options={}] - 分詞器選項 / Segmenter options
     */
    constructor(options?: IOptionsSegment);
    /**
     * 取得字典資料庫實例
     * Get Dictionary Database Instance
     *
     * 根據類型取得對應的字典表格實例。
     * Gets the dictionary table instance corresponding to the type.
     *
     * @template R - 字典表格類型 / Dictionary table type
     * @param {EnumDictDatabase.SYNONYM} type - 同義詞字典類型 / Synonym dictionary type
     * @param {boolean} [autocreate] - 是否自動建立 / Whether to auto-create
     * @param {Function} [libTableDict] - 字典表格建構函式 / Dictionary table constructor
     * @returns {R} 字典表格實例 / Dictionary table instance
     */
    getDictDatabase<R extends TableDictSynonym>(type: EnumDictDatabase.SYNONYM, autocreate?: boolean, libTableDict?: {
        new (...argv: any[]): R;
    }): R;
    /**
     * 取得字典資料庫實例
     * Get Dictionary Database Instance
     */
    getDictDatabase<R extends TableDict>(type: EnumDictDatabase.TABLE, autocreate?: boolean, libTableDict?: {
        new (...argv: any[]): R;
    }): R;
    /**
     * 取得字典資料庫實例
     * Get Dictionary Database Instance
     */
    getDictDatabase<R extends TableDictStopword>(type: EnumDictDatabase.STOPWORD, autocreate?: boolean, libTableDict?: {
        new (...argv: any[]): R;
    }): R;
    /**
     * 取得字典資料庫實例
     * Get Dictionary Database Instance
     */
    getDictDatabase<R extends TableDictBlacklist>(type: EnumDictDatabase.BLACKLIST, autocreate?: boolean, libTableDict?: {
        new (...argv: any[]): R;
    }): R;
    /**
     * 取得字典資料庫實例
     * Get Dictionary Database Instance
     */
    getDictDatabase<R extends TableDictBlacklist>(type: EnumDictDatabase.BLACKLIST_FOR_OPTIMIZER, autocreate?: boolean, libTableDict?: {
        new (...argv: any[]): R;
    }): R;
    /**
     * 取得字典資料庫實例
     * Get Dictionary Database Instance
     */
    getDictDatabase<R extends AbstractTableDictCore<any>>(type: string | EnumDictDatabase, autocreate?: boolean, libTableDict?: {
        new (...argv: any[]): R;
    }): R;
    /**
     * 載入分詞模組
     * Load Segmentation Module
     *
     * 載入分詞或優化模組到分詞器中。
     * Loads tokenizer or optimizer modules into the segmenter.
     *
     * @param {ISubOptimizer | ISubTokenizer} mod - 模組實例 / Module instance
     * @param {...any} argv - 其他參數 / Additional arguments
     * @returns {this} 返回實例以支援鏈式呼叫 / Returns instance for method chaining
     */
    use(mod: ISubOptimizer, ...argv: any[]): this;
    use(mod: ISubTokenizer, ...argv: any[]): this;
    use(mod: any, ...argv: any[]): this;
    /**
     * 取得字典資料
     * Get Dictionary Data
     *
     * 根據類型取得對應的字典資料。
     * Gets dictionary data corresponding to the type.
     *
     * @param {string} type - 字典類型 / Dictionary type
     * @returns {IDICT} 字典資料 / Dictionary data
     */
    getDict(type: ITSTypeAndStringLiteral<EnumDictDatabase.STOPWORD>): IDICT_STOPWORD;
    getDict(type: ITSTypeAndStringLiteral<EnumDictDatabase.SYNONYM>): IDICT_SYNONYM;
    getDict(type: ITSTypeAndStringLiteral<EnumDictDatabase.TABLE>): IDICT<IWord>;
    getDict(type: ITSTypeAndStringLiteral<EnumDictDatabase.BLACKLIST>): IDICT_BLACKLIST;
    getDict(type: ITSTypeAndStringLiteral<EnumDictDatabase.BLACKLIST_FOR_OPTIMIZER>): IDICT_BLACKLIST;
    getDict(type: 'TABLE2'): IDICT2<IWord>;
    getDict(type: ITSTypeAndStringLiteral<EnumDictDatabase>): IDICT;
    getDict(type: unknown): IDICT;
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
    getOptionsDoSegment<T extends IOptionsDoSegment>(options?: T): T;
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
    protected _get_text(text: string | Buffer): string;
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
    addBlacklist(word: string, remove?: boolean): this;
    /**
     * 執行黑名單過濾
     * Execute Blacklist Filtering
     *
     * 根據黑名單移除主字典中的詞語。
     * Removes words from the main dictionary based on the blacklist.
     *
     * @returns {this} 返回實例以支援鏈式呼叫 / Returns instance for method chaining
     */
    doBlacklist(): this;
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
    listModules(options?: IOptionsDoSegment): {
        enable: {
            tokenizer: ISubTokenizer[];
            optimizer: ISubOptimizer[];
        };
        disable: {
            tokenizer: ISubTokenizer[];
            optimizer: ISubOptimizer[];
        };
    };
    /**
     * 執行分詞
     * Execute Segmentation
     *
     * 對輸入文字進行分詞處理。
     * Performs segmentation on the input text.
     *
     * @param {string | Buffer} text - 要分詞的文字 / Text to segment
     * @param {Object} options - 分詞選項 / Segmentation options
     *   - {Boolean} simple - 是否僅返回單詞內容 / Whether to only return word content
     *   - {Boolean} stripPunctuation - 去除標點符號 / Remove punctuation
     *   - {Boolean} convertSynonym - 轉換同義詞 / Convert synonyms
     *   - {Boolean} stripStopword - 去除分隔詞 / Remove stopwords (separators)
     * @returns {Array} 分詞結果陣列 / Segmentation result array
     */
    doSegment(text: string | Buffer, options: ITSOverwrite<IOptionsDoSegment, {
        simple: true;
    }>): string[];
    doSegment(text: string | Buffer, options?: IOptionsDoSegment): IWord[];
    /**
     * 轉換同義詞（帶計數）
     * Convert Synonyms (with Count)
     *
     * 將分詞結果中的詞語轉換為其標準同義詞，並返回轉換計數。
     * Converts words in segmentation results to their standard synonyms and returns conversion count.
     *
     * @param {IWordDebug[]} ret - 分詞結果陣列 / Segmentation result array
     * @param {true} showcount - 是否顯示計數 / Whether to show count
     * @returns {Object} 包含計數與列表的物件 / Object containing count and list
     */
    convertSynonym(ret: IWordDebug[], showcount: true): {
        count: number;
        list: IWordDebug[];
    };
    /**
     * 轉換同義詞
     * Convert Synonyms
     *
     * 將分詞結果中的詞語轉換為其標準同義詞。
     * Converts words in segmentation results to their standard synonyms.
     *
     * @param {IWordDebug[]} ret - 分詞結果陣列 / Segmentation result array
     * @param {boolean} [showcount] - 是否顯示計數 / Whether to show count
     * @returns {IWordDebug[]} 轉換後的分詞結果 / Converted segmentation results
     */
    convertSynonym(ret: IWordDebug[], showcount?: boolean): IWordDebug[];
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
    stringify(words: Array<IWord | string>, ...argv: any[]): string;
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
    static stringify(words: Array<IWord | string>, ...argv: any[]): string;
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
    split(words: IWord[], s: string | number, ...argv: any[]): IWord[];
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
    indexOf(words: IWord[], s: string | number, cur?: number, ...argv: any[]): number;
}
export { IDICT, IDICT2, IDICT_BLACKLIST, IDICT_STOPWORD, IDICT_SYNONYM, IOptionsDoSegment, IOptionsSegment, ISPLIT, ISPLIT_FILTER, IWord };
export default SegmentCore;
