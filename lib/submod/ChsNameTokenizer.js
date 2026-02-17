'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.type = exports.init = exports.ChsNameTokenizer = void 0;
/**
 * 中文人名識別模組
 * Chinese Name Recognition Module
 *
 * 此模組負責在未識別的詞語中尋找並標記中文人名。
 * 支援單姓、複姓、單字名、雙字名及疊字名等多種人名格式。
 *
 * This module is responsible for finding and tagging Chinese names
 * in unrecognized words. Supports various name formats including
 * single/compound surnames, single/double-character given names,
 * and reduplicated given names.
 *
 * @author 老雷<leizongmin@gmail.com>
 */
const CHS_NAMES_1 = require("../mod/CHS_NAMES");
const mod_1 = require("../mod");
/**
 * 中文人名分詞器
 * Chinese Name Tokenizer
 *
 * 繼承自 SubSModuleTokenizer，專門處理中文人名的識別與分詞。
 * 使用預定義的姓氏與名字對照表進行匹配。
 *
 * Extends SubSModuleTokenizer, specialized in Chinese name recognition
 * and tokenization. Uses predefined surname and given name lookup tables
 * for matching.
 */
class ChsNameTokenizer extends mod_1.SubSModuleTokenizer {
    constructor() {
        super(...arguments);
        /**
         * 模組名稱
         * Module Name
         *
         * @override
         */
        this.name = 'ChsNameTokenizer';
    }
    /**
     * 快取初始化
     * Cache Initialization
     *
     * 初始化模組所需的字典快取與詞性標記。
     * Initializes the dictionary cache and POS tags required by the module.
     *
     * @override
     * @protected
     */
    _cache() {
        super._cache();
        this._TABLE = this.segment.getDict('TABLE');
        this._POSTAG = this.segment.POSTAG;
    }
    /**
     * 對未識別的單詞進行分詞
     * Split Unrecognized Words
     *
     * 遍歷詞語陣列，對未識別的詞（詞性為空）進行人名匹配。
     * 若匹配成功，將詞拆分為人名與非人名部分。
     *
     * Iterates through the word array and performs name matching
     * on unrecognized words (empty POS). If matched successfully,
     * splits the word into name and non-name parts.
     *
     * @param {IWord[]} words - 詞語陣列 / Word array
     * @returns {IWord[]} 分詞後的詞語陣列 / Tokenized word array
     */
    split(words) {
        const POSTAG = this._POSTAG;
        let ret = [];
        for (let i = 0, word; word = words[i]; i++) {
            // 僅對未識別的詞進行匹配
            // Only match unrecognized words
            if (word.p) {
                ret.push(word);
                continue;
            }
            // 嘗試匹配人名
            // Try to match names
            let nameinfo = this.matchName(word.w);
            if (nameinfo.length < 1) {
                ret.push(word);
                continue;
            }
            // 分離出人名
            // Extract names
            let lastc = 0;
            for (let ui = 0, url; url = nameinfo[ui]; ui++) {
                // 處理人名前的非人名部分
                // Handle non-name part before the name
                if (url.c > lastc) {
                    ret.push(this.debugToken({
                        w: word.w.substr(lastc, url.c - lastc),
                    }, {
                        [this.name]: false,
                    }, true));
                }
                // 添加識別出的人名
                // Add recognized name
                ret.push(this.debugToken({
                    w: url.w,
                    p: POSTAG.A_NR
                }, {
                    [this.name]: true,
                }, true));
                lastc = url.c + url.w.length;
            }
            // 處理最後一個人名後的非人名部分
            // Handle non-name part after the last name
            let lastn = nameinfo[nameinfo.length - 1];
            if (lastn.c + lastn.w.length < word.w.length) {
                ret.push(this.debugToken({
                    w: word.w.substr(lastn.c + lastn.w.length),
                }, {
                    [this.name]: false,
                }, true));
            }
        }
        return ret;
    }
    /**
     * 匹配包含的人名，並返回相關資訊
     * Match Names and Return Information
     *
     * 掃描文本中所有可能的人名，返回人名列表及其位置資訊。
     * 匹配順序：優先匹配複姓，再匹配單姓。
     *
     * 人名格式支援：
     * - 複姓 + 雙字名（如：司馬相如、歐陽菲菲）
     * - 複姓 + 單字名（如：司馬光、歐陽修）
     * - 複姓 + 疊字名（如：上官暖暖）
     * - 單姓 + 雙字名（如：王小明、李美麗）
     * - 單姓 + 單字名（如：王剛、李明）
     * - 單姓 + 疊字名（如：李明明、王麗麗）
     *
     * Scans text for all possible names and returns a list of names
     * with their position information.
     * Matching order: compound surnames first, then single surnames.
     *
     * Supported name formats:
     * - Compound surname + double-character given name (e.g., 司馬相如, 歐陽菲菲)
     * - Compound surname + single-character given name (e.g., 司馬光, 歐陽修)
     * - Compound surname + reduplicated given name (e.g., 上官暖暖)
     * - Single surname + double-character given name (e.g., 王小明, 李美麗)
     * - Single surname + single-character given name (e.g., 王剛, 李明)
     * - Single surname + reduplicated given name (e.g., 李明明, 王麗麗)
     *
     * @param {string} text - 待匹配的文本 / Text to match
     * @param {number} [cur=0] - 開始位置 / Start position
     * @returns {IWord[]} 人名資訊陣列，格式為 {w: '人名', c: 開始位置} / Name info array, format: {w: 'name', c: start position}
     */
    matchName(text, cur = 0) {
        if (isNaN(cur))
            cur = 0;
        let ret = [];
        while (cur < text.length) {
            //debug('cur=' + cur + ', ' + text.charAt(cur));
            let name = null;
            // 複姓（如：歐陽、司馬、上官）
            // Compound surname (e.g., 歐陽, 司馬, 上官)
            let f2 = text.substr(cur, 2);
            if (f2 in CHS_NAMES_1.FAMILY_NAME_2) {
                let n1 = text.charAt(cur + 2);
                let n2 = text.charAt(cur + 3);
                // 複姓 + 雙字名（如：司馬相如）
                // Compound surname + double-character given name (e.g., 司馬相如)
                if (n1 in CHS_NAMES_1.DOUBLE_NAME_1 && n2 in CHS_NAMES_1.DOUBLE_NAME_2) {
                    name = f2 + n1 + n2;
                }
                // 複姓 + 單字名或疊字名（如：司馬光、上官暖暖）
                // Compound surname + single-character or reduplicated given name
                else if (n1 in CHS_NAMES_1.SINGLE_NAME) {
                    name = f2 + n1 + (n1 === n2 ? n2 : '');
                }
            }
            // 單姓（如：王、李、張）
            // Single surname (e.g., 王, 李, 張)
            let f1 = text.charAt(cur);
            if (name === null && f1 in CHS_NAMES_1.FAMILY_NAME_1) {
                let n1 = text.charAt(cur + 1);
                let n2 = text.charAt(cur + 2);
                // 單姓 + 雙字名（如：王小明）
                // Single surname + double-character given name (e.g., 王小明)
                if (n1 in CHS_NAMES_1.DOUBLE_NAME_1 && n2 in CHS_NAMES_1.DOUBLE_NAME_2) {
                    name = f1 + n1 + n2;
                }
                // 單姓 + 單字名或疊字名（如：李明、李明明）
                // Single surname + single-character or reduplicated given name
                else if (n1 in CHS_NAMES_1.SINGLE_NAME) {
                    name = f1 + n1 + (n1 === n2 ? n2 : '');
                }
            }
            // 檢查是否匹配成功
            // Check if matching succeeded
            if (name === null) {
                cur++;
            }
            else {
                ret.push({ w: name, c: cur });
                cur += name.length;
            }
        }
        return ret;
    }
}
exports.ChsNameTokenizer = ChsNameTokenizer;
// ======================================================================
// debug(matchName('刘德华和李娜娜、司马光、上官飞飞'));
// debug(matchName('李克'));
/**
 * 模組初始化函數
 * Module Initialization Function
 *
 * 綁定至 ChsNameTokenizer 類別的靜態 init 方法。
 * Binds to the static init method of ChsNameTokenizer class.
 */
exports.init = ChsNameTokenizer.init.bind(ChsNameTokenizer);
/**
 * 模組類型
 * Module Type
 *
 * 繼承自 SubSModuleTokenizer，值為 'tokenizer'。
 * Inherited from SubSModuleTokenizer, value is 'tokenizer'.
 */
exports.type = ChsNameTokenizer.type;
exports.default = ChsNameTokenizer;
//# sourceMappingURL=ChsNameTokenizer.js.map