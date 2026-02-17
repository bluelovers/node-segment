import Segment, { IWord } from '../Segment';
/**
 * URL 識別模組
 * URL Recognition Module
 *
 * 掃描文本中的 URL 網址並進行分詞標記。
 * 支援的協議包括：http、https、ftp、news、telnet
 *
 * Scans URLs in text and performs tokenization tagging.
 * Supported protocols include: http, https, ftp, news, telnet
 *
 * @author 老雷<leizongmin@gmail.com>
 */
/**
 * 模組類型
 * Module Type
 */
export declare const type = "tokenizer";
/**
 * 分詞器實例引用
 * Segment Instance Reference
 *
 * 用於存取詞性標記定義等資源。
 * Used to access resources like POS tag definitions.
 */
export declare let segment: Segment;
/**
 * 模組初始化
 * Module Initialization
 *
 * 設定分詞器實例引用。
 * Sets up the segment instance reference.
 *
 * @param {Segment} _segment - 分詞接口 / Segment interface
 */
export declare function init(_segment: Segment): void;
/**
 * 對未識別的單詞進行分詞
 * Split Unrecognized Words
 *
 * 遍歷單詞陣列，識別並標記其中的 URL 網址。
 * 僅對未識別的詞（詞性為 0 或負數）進行處理。
 *
 * Iterates through word array and identifies/tags URLs.
 * Only processes unrecognized words (POS is 0 or negative).
 *
 * @param {IWord[]} words - 單詞陣列 / Word array
 * @returns {IWord[]} 分詞後的單詞陣列 / Tokenized word array
 */
export declare function split(words: IWord[]): IWord[];
/**
 * URL 匹配結果介面
 * URL Match Result Interface
 */
interface IUrlMatch {
    /** URL 文字 / URL text */
    w: string;
    /** 開始位置 / Start position */
    c: number;
}
/**
 * 匹配包含的網址，返回相關資訊
 * Match URLs in Text and Return Information
 *
 * 掃描文本中的 URL，返回所有匹配的 URL 及其位置資訊。
 * 匹配規則：以協議頭（如 http://）開始，遇到非 URL 字元結束。
 *
 * Scans text for URLs and returns all matched URLs with their position info.
 * Matching rule: starts with protocol prefix (like http://), ends at non-URL character.
 *
 * @param {string} text - 文本 / Text
 * @param {number} [cur] - 開始位置 / Start position
 * @returns {IUrlMatch[]} 返回格式 {w: '網址', c: 開始位置} / Format: {w: 'URL', c: start position}
 */
export declare function matchURL(text: string, cur?: number): IUrlMatch[];
export {};
