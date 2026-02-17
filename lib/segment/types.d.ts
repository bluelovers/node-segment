/**
 * 分詞器類型定義模組
 * Segmenter Type Definitions Module
 *
 * 定義分詞器所需的各種介面與類型。
 * Defines various interfaces and types required for the segmenter.
 *
 * Created by user on 2019/6/26.
 */
import { IOptions as IOptionsTableDict } from '@novel-segment/table-core-abstract';
import { TableDict } from '@novel-segment/table-dict';
import { ENUM_SUBMODS_NAME } from '../mod/index';
import { IUseDefaultOptions } from '../defaults/index';
export { IWord } from '@novel-segment/types';
/**
 * 分段器類型
 * Splitter Type
 *
 * 用於將文本分割成多個段落的物件。
 * 可以是 RegExp、字串或實作 Symbol.split 介面的物件。
 *
 * Object used to split text into multiple segments.
 * Can be a RegExp, string, or object implementing the Symbol.split interface.
 */
export type ISPLIT = RegExp | string | {
    [Symbol.split](input: string, limit?: number): string[];
};
/**
 * 分段過濾器類型
 * Split Filter Type
 *
 * 用於判斷段落是否應被忽略的物件。
 * 可以是 RegExp 或實作 test 介面的物件。
 *
 * Object used to determine if a segment should be ignored.
 * Can be a RegExp or object implementing the test interface.
 */
export type ISPLIT_FILTER = RegExp | {
    test(input: string): boolean;
};
/**
 * 字典介面
 * Dictionary Interface
 *
 * 以字串為鍵的通用字典結構。
 * Generic dictionary structure with string keys.
 *
 * @template T - 值的類型 / Type of values
 */
export interface IDICT<T = any> {
    [key: string]: T;
}
/**
 * 二維字典介面
 * Two-dimensional Dictionary Interface
 *
 * 以數字為鍵的第一層字典，值為另一個字典結構。
 * 用於按長度分組儲存詞條。
 *
 * First-level dictionary with numeric keys, where values are another dictionary structure.
 * Used to group entries by length.
 *
 * @template T - 內層字典值的類型 / Type of inner dictionary values
 */
export interface IDICT2<T = any> {
    [key: number]: IDICT<T>;
}
/**
 * 分詞器選項介面
 * Segmenter Options Interface
 *
 * 定義分詞器的配置選項。
 * Defines configuration options for the segmenter.
 */
export interface IOptionsSegment extends IOptionsTableDict, IUseDefaultOptions {
    /**
     * 字典資料庫陣列
     * Dictionary Database Array
     *
     * 用於初始化分詞器的字典表格實例。
     * Dictionary table instances for initializing the segmenter.
     */
    db?: TableDict[];
    /**
     * 分詞操作的預設選項
     * Default Options for Segmentation
     *
     * 執行 doSegment 時的預設選項。
     * Default options when executing doSegment.
     */
    optionsDoSegment?: IOptionsDoSegment;
    /**
     * 最大區塊數量
     * Maximum Chunk Count
     *
     * 限制分詞處理的最大區塊數。
     * Limits the maximum number of chunks for segmentation processing.
     */
    maxChunkCount?: number;
    /**
     * 最小區塊數量
     * Minimum Chunk Count
     *
     * 限制分詞處理的最小區塊數。
     * Limits the minimum number of chunks for segmentation processing.
     */
    minChunkCount?: number;
    /**
     * 停用的模組列表
     * Disabled Modules List
     *
     * 要停用的分詞或優化模組名稱。
     * Names of tokenizer or optimizer modules to disable.
     */
    disableModules?: (ENUM_SUBMODS_NAME | unknown)[];
}
/**
 * 同義詞字典類型
 * Synonym Dictionary Type
 *
 * 儲存詞語對應到其同義詞的對應關係。
 * Stores mappings from words to their synonyms.
 */
export type IDICT_SYNONYM = IDICT<string>;
/**
 * 分隔詞字典類型
 * Stopword (Separator) Dictionary Type
 *
 * 儲存分隔詞及其存在狀態。
 * Stores stopwords (separators) and their existence status.
 */
export type IDICT_STOPWORD = IDICT<boolean>;
/**
 * 黑名單字典類型
 * Blacklist Dictionary Type
 *
 * 儲存黑名單詞語及其存在狀態。
 * Stores blacklist words and their existence status.
 */
export type IDICT_BLACKLIST = IDICT<boolean>;
/**
 * 分詞操作選項介面
 * Segmentation Operation Options Interface
 *
 * 定義執行分詞操作時可設定的選項。
 * Defines options that can be set when performing segmentation operations.
 */
export interface IOptionsDoSegment {
    /**
     * 簡化輸出模式
     * Simple Output Mode
     *
     * 若為 true，僅返回詞語內容而不包含詞性等額外資訊。
     * If true, only returns word content without additional info like part of speech.
     */
    simple?: boolean;
    /**
     * 移除標點符號
     * Remove Punctuation
     *
     * 若為 true，從結果中移除標點符號。
     * If true, removes punctuation from results.
     */
    stripPunctuation?: boolean;
    /**
     * 轉換同義詞
     * Convert Synonyms
     *
     * 若為 true，將詞語轉換為其標準同義詞。
     * If true, converts words to their standard synonyms.
     */
    convertSynonym?: boolean;
    /**
     * 移除分隔詞
     * Remove Stopwords (Separators)
     *
     * 若為 true，從結果中移除分隔詞。
     * If true, removes stopwords (separators) from results.
     */
    stripStopword?: boolean;
    /**
     * 移除空白
     * Remove Spaces
     *
     * 若為 true，從結果中移除空白字元。
     * If true, removes space characters from results.
     */
    stripSpace?: boolean;
    /**
     * 停用的模組列表
     * Disabled Modules List
     *
     * 本次操作要停用的模組名稱。
     * Module names to disable for this operation.
     */
    disableModules?: (ENUM_SUBMODS_NAME | unknown)[];
}
