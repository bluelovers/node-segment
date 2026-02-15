/**
 * 分詞器主類別模組
 * Segmenter Main Class Module
 *
 * 提供完整的中文分詞功能，包含字典載入、模組管理與分詞執行。
 * Provides complete Chinese word segmentation functionality, including dictionary loading, module management, and segmentation execution.
 *
 * @author 老雷<leizongmin@gmail.com>
 */
import { TableDictBlacklist } from '@novel-segment/table-blacklist';
import { AbstractTableDictCore } from '@novel-segment/table-core-abstract';
import { TableDict } from '@novel-segment/table-dict';
import { TableDictStopword } from '@novel-segment/table-stopword';
import { TableDictSynonym } from '@novel-segment/table-synonym';
import { ISubOptimizer, ISubTokenizer } from './mod';
import { ITSTypeAndStringLiteral } from 'ts-type/lib/helper/string';
import { IDICT, IDICT2, IDICT_BLACKLIST, IDICT_STOPWORD, IDICT_SYNONYM, IOptionsDoSegment, IOptionsSegment, ISPLIT, ISPLIT_FILTER } from './segment/types';
import { EnumDictDatabase, IWord } from '@novel-segment/types';
import { SegmentCore } from './segment/core';
import { ITSOverwrite } from 'ts-type';
import { IUseDefaultOptions } from './defaults/index';
/**
 * 分詞器主類別
 * Segmenter Main Class
 *
 * 繼承自 SegmentCore，提供完整的中文分詞功能。
 * 包含字典載入、模組管理、分詞執行等功能。
 *
 * Inherits from SegmentCore, providing complete Chinese word segmentation functionality.
 * Includes dictionary loading, module management, segmentation execution, and more.
 *
 * @example
 * ```typescript
 * import { Segment } from 'novel-segment';
 *
 * const segment = new Segment();
 *
 * // 使用預設設定 / Use default settings
 * segment.useDefault();
 *
 * // 執行分詞 / Execute segmentation
 * const result = segment.doSegment('我愛台灣');
 * console.log(result);
 * // [{ w: '我', p: 0 }, { w: '愛', p: 0 }, { w: '台灣', p: 0 }]
 * ```
 */
export declare class Segment extends SegmentCore {
    /**
     * 分詞操作的預設選項
     * Default Options for Segmentation Operations
     */
    static defaultOptionsDoSegment: IOptionsDoSegment;
    /**
     * 取得字典資料庫實例
     * Get Dictionary Database Instance
     *
     * 根據類型取得對應的字典表格實例，若不存在則自動建立。
     * Gets the dictionary table instance corresponding to the type, creates one if not exists.
     *
     * @template R - 字典表格類型 / Dictionary table type
     * @param {string} type - 字典類型 / Dictionary type
     * @param {boolean} [autocreate] - 是否自動建立 / Whether to auto-create
     * @param {Function} [libTableDict] - 字典表格建構函式 / Dictionary table constructor
     * @returns {R} 字典表格實例 / Dictionary table instance
     */
    getDictDatabase<R extends TableDictSynonym>(type: ITSTypeAndStringLiteral<EnumDictDatabase.SYNONYM>, autocreate?: boolean, libTableDict?: {
        new (...argv: any[]): R;
    }): R;
    getDictDatabase<R extends TableDict>(type: ITSTypeAndStringLiteral<EnumDictDatabase.TABLE>, autocreate?: boolean, libTableDict?: {
        new (...argv: any[]): R;
    }): R;
    getDictDatabase<R extends TableDictStopword>(type: ITSTypeAndStringLiteral<EnumDictDatabase.STOPWORD>, autocreate?: boolean, libTableDict?: {
        new (...argv: any[]): R;
    }): R;
    getDictDatabase<R extends TableDictBlacklist>(type: ITSTypeAndStringLiteral<EnumDictDatabase.BLACKLIST>, autocreate?: boolean, libTableDict?: {
        new (...argv: any[]): R;
    }): R;
    getDictDatabase<R extends TableDictBlacklist>(type: ITSTypeAndStringLiteral<EnumDictDatabase.BLACKLIST_FOR_OPTIMIZER>, autocreate?: boolean, libTableDict?: {
        new (...argv: any[]): R;
    }): R;
    getDictDatabase<R extends TableDictBlacklist>(type: ITSTypeAndStringLiteral<EnumDictDatabase.BLACKLIST_FOR_SYNONYM>, autocreate?: boolean, libTableDict?: {
        new (...argv: any[]): R;
    }): R;
    getDictDatabase<R extends AbstractTableDictCore<any>>(type: string | ITSTypeAndStringLiteral<EnumDictDatabase>, autocreate?: boolean, libTableDict?: {
        new (...argv: any[]): R;
    }): R;
    /**
     * 載入分詞模組
     * Load Segmentation Module
     *
     * 載入分詞或優化模組到分詞器中。
     * 支援模組實例、模組名稱字串或模組陣列。
     *
     * Loads tokenizer or optimizer modules into the segmenter.
     * Supports module instances, module name strings, or module arrays.
     *
     * @param {ISubOptimizer | ISubTokenizer | string | Array} mod - 模組實例、名稱或陣列 / Module instance, name, or array
     * @param {...any} argv - 其他參數 / Additional arguments
     * @returns {this} 返回實例以支援鏈式呼叫 / Returns instance for method chaining
     */
    use(mod: ISubOptimizer, ...argv: any[]): any;
    use(mod: ISubTokenizer, ...argv: any[]): any;
    use(mod: Array<ISubTokenizer | ISubOptimizer | string>, ...argv: any[]): any;
    use(mod: string, ...argv: any[]): any;
    use(mod: any, ...argv: any[]): any;
    /**
     * 解析字典檔案路徑
     * Resolve Dictionary File Path
     *
     * 在多個預設路徑中搜尋指定的字典檔案。
     * 支援 glob 模式匹配。
     *
     * Searches for the specified dictionary file across multiple default paths.
     * Supports glob pattern matching.
     *
     * @protected
     * @param {string} name - 字典檔案名稱或 glob 模式 / Dictionary file name or glob pattern
     * @param {string[]} [pathPlus] - 額外的搜尋路徑 / Additional search paths
     * @param {string[]} [extPlus] - 額外的副檔名 / Additional file extensions
     * @returns {string | string[]} 找到的檔案路徑 / Found file path(s)
     * @throws {Error} 當找不到檔案時拋出錯誤 / Throws error when file not found
     */
    _resolveDictFilename(name: string, pathPlus?: string[], extPlus?: string[]): string | string[];
    /**
     * 載入字典檔案
     * Load Dictionary File
     *
     * 載入主字典檔案到分詞器中。
     * 字典格式為每行一個詞條：詞語 詞性 詞頻。
     *
     * Loads main dictionary file into the segmenter.
     * Dictionary format is one entry per line: word part_of_speech frequency.
     *
     * @param {string} name - 字典檔案名稱 / Dictionary file name
     * @param {string} [type] - 字典類型，預設為 TABLE / Dictionary type, defaults to TABLE
     * @param {boolean} [convert_to_lower] - 是否轉換為小寫 / Whether to convert to lowercase
     * @param {boolean} [skipExists] - 若詞語已存在則跳過 / Skip if word already exists
     * @returns {this} 返回實例以支援鏈式呼叫 / Returns instance for method chaining
     */
    loadDict(name: string, type?: string | ITSTypeAndStringLiteral<EnumDictDatabase>, convert_to_lower?: boolean, skipExists?: boolean): this;
    /**
     * 載入同義詞字典
     * Load Synonym Dictionary
     *
     * 載入同義詞字典檔案到分詞器中。
     * 字典格式為每行一組同義詞，以逗號分隔。
     *
     * Loads synonym dictionary file into the segmenter.
     * Dictionary format is one synonym group per line, separated by commas.
     *
     * @param {string} name - 字典檔案名稱 / Dictionary file name
     * @param {boolean} [skipExists] - 若詞語已存在則跳過 / Skip if word already exists
     * @returns {this} 返回實例以支援鏈式呼叫 / Returns instance for method chaining
     */
    loadSynonymDict(name: string, skipExists?: boolean): this;
    /**
     * 內部方法：載入黑名單字典
     * Internal Method: Load Blacklist Dictionary
     *
     * 載入黑名單字典檔案的通用實作。
     * Common implementation for loading blacklist dictionary files.
     *
     * @protected
     * @param {string} name - 字典檔案名稱 / Dictionary file name
     * @param {EnumDictDatabase} type - 黑名單類型 / Blacklist type
     * @returns {this} 返回實例以支援鏈式呼叫 / Returns instance for method chaining
     */
    protected _loadBlacklistDict(name: string, type: EnumDictDatabase): this;
    /**
     * 載入黑名單字典
     * Load Blacklist Dictionary
     *
     * 載入黑名單字典，黑名單中的詞語會從主字典中移除。
     * 用於過濾敏感詞或不當用語。
     *
     * Loads blacklist dictionary, words in the blacklist will be removed from the main dictionary.
     * Used for filtering sensitive words or inappropriate language.
     *
     * @param {string} name - 字典檔案名稱 / Dictionary file name
     * @returns {this} 返回實例以支援鏈式呼叫 / Returns instance for method chaining
     */
    loadBlacklistDict(name: string): this;
    /**
     * 載入優化器黑名單字典
     * Load Optimizer Blacklist Dictionary
     *
     * 載入優化器黑名單字典，防止部分優化器組合此字典中的詞語。
     * 例如防止人名自動組合等功能。
     *
     * Loads optimizer blacklist dictionary, prevents some optimizers from combining words in this dictionary.
     * For example, prevents automatic person name combination.
     *
     * @param {string} name - 字典檔案名稱 / Dictionary file name
     * @returns {this} 返回實例以支援鏈式呼叫 / Returns instance for method chaining
     */
    loadBlacklistOptimizerDict(name: string): this;
    /**
     * 載入同義詞轉換黑名單字典
     * Load Synonym Conversion Blacklist Dictionary
     *
     * 載入同義詞轉換黑名單字典，動態轉換字詞時會忽略此字典中的詞語。
     *
     * Loads synonym conversion blacklist dictionary, words in this dictionary will be ignored during dynamic synonym conversion.
     *
     * @param {string} name - 字典檔案名稱 / Dictionary file name
     * @returns {this} 返回實例以支援鏈式呼叫 / Returns instance for method chaining
     */
    loadBlacklistSynonymDict(name: string): this;
    /**
     * 載入停用詞字典
     * Load Stopword Dictionary
     *
     * 載入停用詞字典檔案到分詞器中。
     * 停用詞是在文字處理中需要被過濾掉的常見詞語。
     *
     * Loads stopword dictionary file into the segmenter.
     * Stopwords are common words that need to be filtered out during text processing.
     *
     * @param {string} name - 字典檔案名稱 / Dictionary file name
     * @returns {this} 返回實例以支援鏈式呼叫 / Returns instance for method chaining
     */
    loadStopwordDict(name: string): this;
    /**
     * 使用預設的識別模組和字典檔案
     * Use Default Recognition Modules and Dictionary Files
     *
     * 在使用預設值的情況下，不需要主動呼叫此函數。
     * 自動載入預設的分詞模組和字典。
     *
     * When using default settings, there is no need to manually call this function.
     * Automatically loads default segmentation modules and dictionaries.
     *
     * @param {IUseDefaultOptions} [options] - 預設設定選項 / Default setting options
     * @param {...any} argv - 其他參數 / Additional arguments
     * @returns {this} 返回實例以支援鏈式呼叫 / Returns instance for method chaining
     */
    useDefault(options?: IUseDefaultOptions, ...argv: any[]): any;
    /**
     * 自動初始化
     * Auto Initialization
     *
     * 此函數只需執行一次，並且一般狀況下不需要手動呼叫。
     * 若尚未初始化，會自動載入預設設定。
     *
     * This function only needs to be executed once, and generally does not need to be called manually.
     * If not initialized, it will automatically load default settings.
     */
    autoInit(options?: IUseDefaultOptions): this;
    /**
     * 新增黑名單詞語
     * Add Blacklist Word
     *
     * 將詞語加入黑名單，並從主字典中移除。
     * Adds a word to the blacklist and removes it from the main dictionary.
     *
     * @override
     * @param {string} word - 要加入黑名單的詞語 / Word to add to blacklist
     * @param {boolean} [remove] - 是否為移除操作 / Whether this is a remove operation
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
     * @override
     * @returns {this} 返回實例以支援鏈式呼叫 / Returns instance for method chaining
     */
    doBlacklist(): this;
    /**
     * 執行分詞
     * Execute Segmentation
     *
     * 對輸入文字進行分詞處理。
     * Performs segmentation on the input text.
     *
     * @override
     * @param {string | Buffer} text - 要分詞的文字 / Text to segment
     * @param {Object} options - 分詞選項 / Segmentation options
     *   - {Boolean} simple - 是否僅返回單詞內容 / Whether to only return word content
     *   - {Boolean} stripPunctuation - 去除標點符號 / Remove punctuation
     *   - {Boolean} convertSynonym - 轉換同義詞 / Convert synonyms
     *   - {Boolean} stripStopword - 去除停用詞 / Remove stopwords
     * @returns {Array} 分詞結果陣列 / Segmentation result array
     */
    doSegment(text: string | Buffer, options: ITSOverwrite<IOptionsDoSegment, {
        simple: true;
    }>): string[];
    doSegment(text: string | Buffer, options?: IOptionsDoSegment): IWord[];
}
/**
 * Segment 命名空間匯出
 * Segment Namespace Exports
 */
export declare namespace Segment {
    export { IDICT, IDICT2, IDICT_BLACKLIST, IDICT_STOPWORD, IDICT_SYNONYM, IOptionsDoSegment, IOptionsSegment, ISPLIT, ISPLIT_FILTER, IWord, };
}
export { IDICT, IDICT2, IDICT_BLACKLIST, IDICT_STOPWORD, IDICT_SYNONYM, IOptionsDoSegment, IOptionsSegment, ISPLIT, ISPLIT_FILTER, IWord, };
export default Segment;
