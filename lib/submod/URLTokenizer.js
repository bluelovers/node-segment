"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.segment = exports.type = void 0;
exports.init = init;
exports.split = split;
exports.matchURL = matchURL;
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
exports.type = 'tokenizer';
/**
 * 模組初始化
 * Module Initialization
 *
 * 設定分詞器實例引用。
 * Sets up the segment instance reference.
 *
 * @param {Segment} _segment - 分詞接口 / Segment interface
 */
function init(_segment) {
    exports.segment = _segment;
}
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
function split(words) {
    const POSTAG = exports.segment.POSTAG;
    const ret = [];
    for (let word of words) {
        // 如果詞性已識別，保留原詞
        // If POS is already identified, keep original word
        if (word.p > 0) {
            ret.push(word);
            continue;
        }
        // 僅對未識別的詞進行匹配
        // Only match unrecognized words
        const urlinfo = matchURL(word.w);
        if (urlinfo.length < 1) {
            ret.push(word);
            continue;
        }
        // 分離出 URL
        // Extract URLs
        let lastc = 0;
        for (let url of urlinfo) {
            // 添加 URL 前的非 URL 文字
            // Add non-URL text before the URL
            if (url.c > lastc) {
                ret.push({ w: word.w.substr(lastc, url.c - lastc) });
            }
            // 添加 URL 並標記詞性
            // Add URL with POS tag
            ret.push({ w: url.w, p: POSTAG.URL });
            lastc = url.c + url.w.length;
        }
        // 添加最後一個 URL 後的剩餘文字
        // Add remaining text after the last URL
        const lasturl = urlinfo[urlinfo.length - 1];
        if (lasturl.c + lasturl.w.length < word.w.length) {
            ret.push({ w: word.w.substr(lasturl.c + lasturl.w.length) });
        }
    }
    // debug(ret);
    return ret;
}
/**
 * 協議 URL 頭
 * Protocol URL Prefixes
 *
 * 支援的 URL 協議前綴列表。
 * List of supported URL protocol prefixes.
 */
const PROTOTAL = ['http://', 'https://', 'ftp://', 'news://', 'telnet://'];
/**
 * 協議頭最小長度
 * Minimum Protocol Prefix Length
 *
 * 用於優化匹配過程，避免不必要的檢查。
 * Used to optimize matching process and avoid unnecessary checks.
 */
let MIN_PROTOTAL_LEN = 100;
for (let i in PROTOTAL) {
    if (PROTOTAL[i].length < MIN_PROTOTAL_LEN) {
        MIN_PROTOTAL_LEN = PROTOTAL[i].length;
    }
}
/**
 * 允許出現在 URL 中的字元
 * Characters Allowed in URLs
 *
 * 包含所有合法的 URL 字元，用於判斷 URL 邊界。
 * Contains all valid URL characters for determining URL boundaries.
 */
const URLCHAR = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '!',
    '#',
    '$',
    '%',
    '&',
    '‘',
    '(',
    ')',
    '*',
    '+',
    ',',
    '-',
    '.',
    '/',
    ':',
    ';',
    '=',
    '?',
    '@',
    '[',
    '\\',
    ']',
    '^',
    '_',
    '`',
    '|',
    '~',
].reduce((URLCHAR, c) => {
    URLCHAR[c] = true;
    return URLCHAR;
}, {});
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
function matchURL(text, cur) {
    // 處理起始位置參數 / Handle start position parameter
    if (isNaN(cur))
        cur = 0;
    const ret = [];
    // URL 起始位置 / URL start position
    let s = null;
    while (cur < text.length) {
        // 判斷是否為 http:// 之類的文本開頭
        // Check if it starts with http:// or similar
        if (s === null && cur < text.length - MIN_PROTOTAL_LEN) {
            for (let prot of PROTOTAL) {
                if (text.substr(cur, prot.length) === prot) {
                    s = cur;
                    cur += prot.length - 1;
                    break;
                }
            }
        }
        else if (s !== null && !(text.charAt(cur) in URLCHAR)) {
            // 如果以 http:// 之類開頭，遇到了非 URL 字元，則結束
            // If started with http:// and encountered non-URL character, end
            ret.push({
                w: text.substr(s, cur - s),
                c: s,
            });
            s = null;
        }
        cur++;
    }
    // 檢查剩餘部分
    // Check remaining part
    if (s !== null) {
        ret.push({
            w: text.substr(s, cur - s),
            c: s,
        });
    }
    return ret;
}
// debug(matchURL('http://www.baidu.com哈啊http://哇fdgggghttp://baidu.com/ss/'));
//# sourceMappingURL=URLTokenizer.js.map