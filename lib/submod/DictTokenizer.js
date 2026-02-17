'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.type = exports.init = exports.DictTokenizer = exports.DEFAULT_MAX_CHUNK_COUNT_MIN = exports.DEFAULT_MAX_CHUNK_COUNT = void 0;
const tslib_1 = require("tslib");
const mod_1 = require("../mod");
const index_1 = require("../util/index");
const CHS_NAMES_1 = require("../mod/CHS_NAMES");
const const_1 = require("../mod/const");
const isUnset_1 = tslib_1.__importDefault(require("../util/isUnset"));
/**
 * 預設最大區塊數量
 * Default Maximum Chunk Count
 *
 * 防止因無分段導致分析過久甚至超過處理負荷的預設上限值。
 * Default upper limit to prevent analysis from taking too long or exceeding processing capacity due to lack of segmentation.
 */
exports.DEFAULT_MAX_CHUNK_COUNT = 40;
/**
 * 預設最大區塊數量最小值
 * Default Maximum Chunk Count Minimum
 *
 * 用於限制 MAX_CHUNK_COUNT 遞減時的最小值。
 * Used to limit the minimum value when MAX_CHUNK_COUNT decreases.
 */
exports.DEFAULT_MAX_CHUNK_COUNT_MIN = 30;
/**
 * 字典識別分詞器
 * Dictionary Tokenizer
 *
 * 使用字典匹配方式進行分詞的核心模組。
 * 採用類似 MMSG 的分詞演算法，找出所有分詞可能並進行評估排序。
 *
 * Core module for dictionary-based segmentation.
 * Uses MMSG-like segmentation algorithm to find all possible segmentations and evaluate them.
 *
 * @author 老雷<leizongmin@gmail.com>
 */
class DictTokenizer extends mod_1.SubSModuleTokenizer {
    constructor() {
        super(...arguments);
        /**
         * 最大區塊數量
         * Maximum Chunk Count
         *
         * 防止因無分段導致分析過久甚至超過處理負荷。
         * 越高越精準但是處理時間會加倍成長甚至超過記憶體能處理的程度。
         * 數字越小越快。
         *
         * Prevents analysis from taking too long or exceeding processing capacity due to lack of segmentation.
         * Higher values are more accurate but processing time grows exponentially and may exceed memory capacity.
         * Lower values are faster.
         *
         * FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory
         *
         * @type {number}
         */
        this.MAX_CHUNK_COUNT = exports.DEFAULT_MAX_CHUNK_COUNT;
        /**
         * 最大區塊數量最小值
         * Maximum Chunk Count Minimum
         *
         * 追加新模式使 MAX_CHUNK_COUNT 遞減來防止無分段長段落的總處理次數過高。
         * 由 DEFAULT_MAX_CHUNK_COUNT_MIN 來限制最小值。
         *
         * When adding new mode, MAX_CHUNK_COUNT decreases to prevent excessive total processing count for long unsegmented paragraphs.
         * Limited by DEFAULT_MAX_CHUNK_COUNT_MIN.
         */
        this.DEFAULT_MAX_CHUNK_COUNT_MIN = exports.DEFAULT_MAX_CHUNK_COUNT_MIN;
    }
    /**
     * 快取初始化
     * Cache Initialization
     *
     * 從 Segment 實例取得字典表與詞性標籤的快取引用。
     * 同時根據選項設定最大與最小區塊數量限制。
     *
     * Gets dictionary table and part-of-speech tag cache references from the Segment instance.
     * Also sets maximum and minimum chunk count limits based on options.
     *
     * @override
     * @protected
     */
    _cache() {
        super._cache();
        this._TABLE = this.segment.getDict('TABLE');
        this._TABLE2 = this.segment.getDict('TABLE2');
        this._POSTAG = this.segment.POSTAG;
        // 設定自訂最大區塊數量 / Set custom maximum chunk count
        if (typeof this.segment.options.maxChunkCount === 'number' && this.segment.options.maxChunkCount > exports.DEFAULT_MAX_CHUNK_COUNT_MIN) {
            this.MAX_CHUNK_COUNT = this.segment.options.maxChunkCount;
        }
        // 設定自訂最小區塊數量 / Set custom minimum chunk count
        if (typeof this.segment.options.minChunkCount === 'number' && this.segment.options.minChunkCount > exports.DEFAULT_MAX_CHUNK_COUNT_MIN) {
            this.DEFAULT_MAX_CHUNK_COUNT_MIN = this.segment.options.minChunkCount;
        }
    }
    /**
     * 對未識別的單詞進行分詞
     * Split Unrecognized Words
     *
     * 遍歷單詞陣列，對未識別的單詞（詞性 p = 0）進行字典匹配。
     * 將匹配結果與已識別的單詞合併返回。
     *
     * Iterates through the word array and performs dictionary matching for unrecognized words (part-of-speech p = 0).
     * Merges matching results with recognized words and returns them.
     *
     * @param {IWord[]} words - 單詞陣列 / Word array
     * @returns {IWord[]} 分詞後的單詞陣列 / Segmented word array
     */
    split(words) {
        //debug(words);
        const TABLE = this._TABLE;
        //const POSTAG = this._POSTAG;
        const self = this;
        let ret = [];
        for (let i = 0, word; word = words[i]; i++) {
            // 已識別的單詞直接加入結果 / Add recognized words directly to result
            if (word.p > 0) {
                ret.push(word);
                continue;
            }
            // 仅对未识别的词进行匹配
            let wordinfo = this.matchWord(word.w, 0, words[i - 1]);
            if (wordinfo.length < 1) {
                ret.push(word);
                continue;
            }
            // 分离出已识别的单词
            let lastc = 0;
            wordinfo.forEach(function (bw, ui) {
                // 處理匹配詞之間的未識別文字片段 / Process unrecognized text fragments between matched words
                if (bw.c > lastc) {
                    ret.push({
                        w: word.w.substr(lastc, bw.c - lastc),
                    });
                }
                // 建立帶有字典資訊的詞元 / Create token with dictionary information
                let cw = self.createRawToken({
                    w: bw.w,
                    f: bw.f,
                }, TABLE[bw.w]);
                ret.push(cw);
                /*
                ret.push({
                    w: bw.w,
                    p: ww.p,
                    f: bw.f,
                    s: ww.s,
                });
                */
                lastc = bw.c + bw.w.length;
            });
            // 處理最後一段未識別的文字 / Process the last unrecognized text fragment
            let lastword = wordinfo[wordinfo.length - 1];
            if (lastword.c + lastword.w.length < word.w.length) {
                let cw = self.createRawToken({
                    w: word.w.substr(lastword.c + lastword.w.length),
                });
                ret.push(cw);
            }
        }
        // 釋放參考以協助垃圾回收 / Release references to assist garbage collection
        words = undefined;
        return ret;
    }
    // =================================================================
    /**
     * 匹配單詞，返回相關資訊
     * Match Words and Return Related Information
     *
     * 從指定位置開始掃描文本，在二維字典表中查找所有可能的單詞匹配。
     * 返回匹配到的單詞資訊陣列，包含單詞內容、位置和頻率。
     *
     * Scans text from the specified position, searching for all possible word matches in the two-dimensional dictionary table.
     * Returns an array of matched word information, including word content, position, and frequency.
     *
     * @protected
     * @param {string} text - 待匹配的文本 / Text to match
     * @param {number} cur - 開始位置 / Starting position
     * @param {IWord} preword - 上一個單詞 / Previous word
     * @returns {IWord[]} 匹配結果陣列，格式為 {w: '單詞', c: 開始位置} / Matched result array, format {w: 'word', c: start position}
     */
    matchWord(text, cur, preword) {
        if (isNaN(cur))
            cur = 0;
        let ret = [];
        let s = false;
        const TABLE2 = this._TABLE2;
        // 匹配可能出现的单词
        while (cur < text.length) {
            // 遍歷所有詞長的字典表 / Iterate through dictionary tables of all word lengths
            for (let i in TABLE2) {
                let w = text.substr(cur, i);
                if (w in TABLE2[i]) {
                    ret.push({
                        w: w,
                        c: cur,
                        f: TABLE2[i][w].f,
                    });
                }
            }
            cur++;
        }
        return this.filterWord(ret, preword, text);
    }
    /**
     * 選擇最有可能匹配的單詞
     * Select Most Likely Matched Words
     *
     * 使用類似 MMSG 的分詞演算法評估所有可能的分詞組合。
     * 根據以下幾項指標綜合評估排名：
     * - x：詞數量最少
     * - a：詞平均頻率最大
     * - b：每個詞長度標準差最小
     * - c：未識別詞最少
     * - d：符合語法結構程度（如數詞後跟量詞加分）
     *
     * Uses MMSG-like segmentation algorithm to evaluate all possible segmentation combinations.
     * Comprehensive ranking based on the following indicators:
     * - x: Minimum word count
     * - a: Maximum average word frequency
     * - b: Minimum word length standard deviation
     * - c: Minimum unrecognized words
     * - d: Grammatical structure compliance (e.g., bonus for numeral followed by quantifier)
     *
     * @protected
     * @param {IWord[]} words - 單詞資訊陣列 / Word information array
     * @param {IWord} preword - 上一個單詞 / Previous word
     * @param {string} text - 本節要分詞的文本 / Text to segment in this section
     * @returns {IWord[]} 最佳匹配結果 / Best matched result
     */
    filterWord(words, preword, text) {
        const TABLE = this._TABLE;
        const POSTAG = this._POSTAG;
        let ret = [];
        // 将单词按位置分组
        let wordpos = this.getPosInfo(words, text);
        //debug(wordpos);
        /**
         * 使用类似于MMSG的分词算法
         * 找出所有分词可能，主要根据一下几项来评价：
         * x、词数量最少；
         * a、词平均频率最大；
         * b、每个词长度标准差最小；
         * c、未识别词最少；
         * d、符合语法结构项：如两个连续的动词减分，数词后面跟量词加分；
         * 取以上几项综合排名最最好的
         */
        // 取得所有可能的分詞組合 / Get all possible segmentation combinations
        let chunks = this.getChunks(wordpos, 0, text);
        //debug(chunks);
        let assess = []; // 评价表
        //console.log(chunks);
        // 对各个分支就行评估
        for (let i = 0, chunk; chunk = chunks[i]; i++) {
            assess[i] = {
                x: chunk.length,
                a: 0,
                b: 0,
                c: 0,
                d: 0,
                index: i,
            };
            // 词平均长度
            let sp = text.length / chunk.length;
            // 句子经常包含的语法结构
            let has_D_V = false; // 是否包含动词
            // 遍历各个词
            let prew;
            if (preword) {
                /*
                prew = {
                    w: preword.w,
                    p: preword.p,
                    f: preword.f,
                    s: preword.s,
    }
                */
                prew = this.createRawToken(preword);
            }
            else {
                prew = null;
            }
            for (let j = 0, w; w = chunk[j]; j++) {
                if (w.w in TABLE) {
                    w.p = TABLE[w.w].p;
                    assess[i].a += w.f; // 总词频
                    if (j === 0 && (0, isUnset_1.default)(preword) && (w.p & POSTAG.D_V)) {
                        /**
                         * 將第一個字也計算進去是否包含動詞
                         */
                        has_D_V = true;
                    }
                    // ================ 检查语法结构 ===================
                    if (prew) {
                        if (prew.w === '年' && (w.w === '历史'
                            || w.w === '歷史'
                            || w.w === '歴史')) {
                            assess[i].d += 0.5;
                        }
                        // 如果上一个词是数词且当前词是量词（单位），则加分
                        if ((prew.p & POSTAG.A_M)
                            &&
                                ((w.p & POSTAG.A_Q)
                                    || w.w in const_1.DATETIME)) {
                            assess[i].d++;
                        }
                        // 如果当前词是动词
                        if (w.p & POSTAG.D_V) {
                            has_D_V = true;
                            // 如果是连续的两个动词，则减分
                            //if ((prew.p & POSTAG.D_V) > 0)
                            //assess[i].d--;
                            /*
                            // 如果是 形容词 + 动词，则加分
                            if ((prew.p & POSTAG.D_A))
                            {
                                assess[i].d++;
                            }
                            */
                            // 如果是 副词 + 动词，则加分
                            if (prew.p & POSTAG.D_D) {
                                assess[i].d++;
                            }
                        }
                        // 如果是地区名、机构名或形容词，后面跟地区、机构、代词、名词等，则加分
                        if (((prew.p & POSTAG.A_NS)
                            || (prew.p & POSTAG.A_NT)
                            || (prew.p & POSTAG.D_A)) &&
                            ((w.p & POSTAG.D_N)
                                || (w.p & POSTAG.A_NR)
                                || (w.p & POSTAG.A_NS)
                                || (w.p & POSTAG.A_NZ)
                                || (w.p & POSTAG.A_NT))) {
                            assess[i].d++;
                        }
                        // 如果是 方位词 + 数量词，则加分
                        if ((prew.p & POSTAG.D_F)
                            &&
                                ((w.p & POSTAG.A_M)
                                    || (w.p & POSTAG.D_MQ))) {
                            //debug(prew, w);
                            assess[i].d++;
                        }
                        // 如果是 姓 + 名词，则加分
                        if ((prew.w in CHS_NAMES_1.FAMILY_NAME_1
                            || prew.w in CHS_NAMES_1.FAMILY_NAME_2) &&
                            ((w.p & POSTAG.D_N)
                                || (w.p & POSTAG.A_NZ))) {
                            //debug(prew, w);
                            assess[i].d++;
                        }
                        /**
                         * 地名/处所 + 方位
                         */
                        if ((0, index_1.hexAndAny)(prew.p, POSTAG.D_S, POSTAG.A_NS) && (0, index_1.hexAndAny)(w.p, POSTAG.D_F)) {
                            assess[i].d += 0.5;
                        }
                        // 探测下一个词
                        let nextw = chunk[j + 1];
                        if (nextw) {
                            if (nextw.w in TABLE) {
                                nextw.p = TABLE[nextw.w].p;
                            }
                            let _temp_ok = true;
                            /**
                             * 如果当前是“的”+ 名词，则加分
                             */
                            if ((w.w === '的' || w.w === '之')
                                && nextw.p && ((nextw.p & POSTAG.D_N)
                                || (nextw.p & POSTAG.D_V)
                                || (nextw.p & POSTAG.A_NR)
                                || (nextw.p & POSTAG.A_NS)
                                || (nextw.p & POSTAG.A_NZ)
                                || (nextw.p & POSTAG.A_NT))) {
                                assess[i].d += 1.5;
                                _temp_ok = false;
                            }
                            /**
                             * 如果是连词，前后两个词词性相同则加分
                             */
                            else if (prew.p && (w.p & POSTAG.D_C)) {
                                let p = prew.p & nextw.p;
                                if (prew.p === nextw.p) {
                                    assess[i].d++;
                                    _temp_ok = false;
                                }
                                else if (p) {
                                    assess[i].d += 0.25;
                                    _temp_ok = false;
                                    if (p & POSTAG.D_N) {
                                        assess[i].d += 0.75;
                                    }
                                }
                            }
                            /**
                             * 在感動的重逢中有余在的話就太過閃耀
                             */
                            if (_temp_ok && (w.p & POSTAG.D_R) && (nextw.p & POSTAG.D_P)) {
                                assess[i].d += 1;
                                _temp_ok = false;
                            }
                            if (_temp_ok && nextw.p && (w.p & POSTAG.D_P)) {
                                if (nextw.p & POSTAG.A_NR && (nextw.w.length > 1)) {
                                    assess[i].d++;
                                    if (prew.w === '的') {
                                        /**
                                         * 的 + 介詞 + 人名
                                         */
                                        assess[i].d += 1;
                                        _temp_ok = false;
                                    }
                                }
                            }
                            if (_temp_ok && w.p & POSTAG.D_P) {
                                if ((0, index_1.hexAndAny)(prew.p, POSTAG.D_N) && (0, index_1.hexAndAny)(nextw.p, POSTAG.D_N, POSTAG.D_V)) {
                                    assess[i].d++;
                                    _temp_ok = false;
                                }
                                else if ((0, index_1.hexAndAny)(prew.p, POSTAG.D_R) && (0, index_1.hexAndAny)(nextw.p, POSTAG.D_R)) {
                                    assess[i].d += 0.5;
                                    _temp_ok = false;
                                }
                            }
                            // @FIXME 暴力解決 三天后 的問題
                            if (nextw.w === '后' && w.p & POSTAG.D_T && (0, index_1.hexAndAny)(prew.p, POSTAG.D_MQ, POSTAG.A_M)) {
                                assess[i].d++;
                            }
                            // @FIXME 到湖中間后手終於能休息了
                            else if ((nextw.w === '后'
                                || nextw.w === '後')
                                && (0, index_1.hexAndAny)(w.p, POSTAG.D_F)) {
                                assess[i].d++;
                            }
                            else if ((w.w === '后'
                                || w.w === '後')
                                && (0, index_1.hexAndAny)(prew.p, POSTAG.D_F)
                                && (0, index_1.hexAndAny)(nextw.p, POSTAG.D_N)) {
                                assess[i].d++;
                            }
                        }
                        else {
                            let _temp_ok = true;
                            /**
                             * 她把荷包蛋摆在像是印度烤饼的面包上
                             */
                            if (_temp_ok && (w.p & POSTAG.D_F) && (0, index_1.hexAndAny)(prew.p, POSTAG.D_N)) {
                                assess[i].d += 1;
                                _temp_ok = false;
                            }
                        }
                    }
                    // ===========================================
                }
                else {
                    // 未识别的词数量
                    assess[i].c++;
                }
                // 标准差
                assess[i].b += Math.pow(sp - w.w.length, 2);
                prew = chunk[j];
            }
            // 如果句子中包含了至少一个动词
            if (has_D_V === false)
                assess[i].d -= 0.5;
            assess[i].a = assess[i].a / chunk.length;
            assess[i].b = assess[i].b / chunk.length;
        }
        //console.dir(assess);
        // 计算排名
        let top = this.getTops(assess);
        let currchunk = chunks[top];
        if (false) {
            //console.log(assess);
            //console.log(Object.entries(chunks));
            console.dir(Object.entries(chunks)
                .map(([i, chunk]) => { return { i, asses: assess[i], chunk }; }), { depth: 5 });
            console.dir({ i: top, asses: assess[top], currchunk });
            //console.log(top);
            //console.log(currchunk);
        }
        // 剔除不能识别的词
        for (let i = 0, word; word = currchunk[i]; i++) {
            if (!(word.w in TABLE)) {
                currchunk.splice(i--, 1);
            }
        }
        ret = currchunk;
        // 試圖主動清除記憶體
        assess = undefined;
        chunks = undefined;
        currchunk = undefined;
        top = undefined;
        wordpos = undefined;
        //debug(ret);
        return ret;
    }
    /**
     * 評價排名
     * Evaluation Ranking
     *
     * 根據評估指標計算各分詞組合的綜合得分並排名。
     * 選取得分最高的分詞組合作為最佳結果。
     *
     * Calculates comprehensive scores for each segmentation combination based on evaluation indicators and ranks them.
     * Selects the highest-scoring segmentation combination as the best result.
     *
     * @param {Array<IAssessRow>} assess - 評估資料陣列 / Assessment data array
     * @returns {number} 最佳分詞組合的索引 / Index of the best segmentation combination
     */
    getTops(assess) {
        //debug(assess);
        // 取各项最大值
        let top = {
            x: assess[0].x,
            a: assess[0].a,
            b: assess[0].b,
            c: assess[0].c,
            d: assess[0].d,
        };
        // 取得各項指標的極值 / Get extreme values for each indicator
        for (let i = 1, ass; ass = assess[i]; i++) {
            if (ass.a > top.a)
                top.a = ass.a; // 取最大平均词频
            if (ass.b < top.b)
                top.b = ass.b; // 取最小标准差
            if (ass.c > top.c)
                top.c = ass.c; // 取最大未识别词
            if (ass.d < top.d)
                top.d = ass.d; // 取最小语法分数
            if (ass.x > top.x)
                top.x = ass.x; // 取最大单词数量
        }
        //debug(top);
        // 评估排名
        let tops = [];
        for (let i = 0, ass; ass = assess[i]; i++) {
            tops[i] = 0;
            // 词数量，越小越好
            tops[i] += (top.x - ass.x) * 1.5;
            // 词总频率，越大越好
            if (ass.a >= top.a)
                tops[i] += 1;
            // 词标准差，越小越好
            if (ass.b <= top.b)
                tops[i] += 1;
            // 未识别词，越小越好
            tops[i] += (top.c - ass.c); //debug(tops[i]);
            // 符合语法结构程度，越大越好
            tops[i] += (ass.d < 0 ? top.d + ass.d : ass.d - top.d) * 1;
            ass.score = tops[i];
            //debug(tops[i]);debug('---');
        }
        //debug(tops.join('  '));
        //console.log(tops);
        //console.log(assess);
        //const old_method = true;
        const old_method = false;
        // 取分数最高的
        let curri = 0;
        let maxs = tops[0];
        for (let i in tops) {
            let s = tops[i];
            if (s > maxs) {
                curri = i;
                maxs = s;
            }
            else if (s === maxs) {
                /**
                 * 如果分数相同，则根据词长度、未识别词个数和平均频率来选择
                 *
                 * 如果依然同分，則保持不變
                 */
                let a = 0;
                let b = 0;
                // 比較未識別詞數量（越少越好）/ Compare unrecognized word count (fewer is better)
                if (assess[i].c < assess[curri].c) {
                    a++;
                }
                else if (assess[i].c !== assess[curri].c) {
                    b++;
                }
                // 比較詞平均頻率（越高越好）/ Compare average word frequency (higher is better)
                if (assess[i].a > assess[curri].a) {
                    a++;
                }
                else if (assess[i].a !== assess[curri].a) {
                    b++;
                }
                // 比較詞數量（越少越好）/ Compare word count (fewer is better)
                if (assess[i].x < assess[curri].x) {
                    a++;
                }
                else if (assess[i].x !== assess[curri].x) {
                    b++;
                }
                // 根據比較結果決定是否更新 / Decide whether to update based on comparison results
                if (a > b) {
                    curri = i;
                    maxs = s;
                }
            }
            //debug({ i, s, maxs, curri });
        }
        //debug('max: i=' + curri + ', s=' + tops[curri]);
        // 釋放參考以協助垃圾回收 / Release references to assist garbage collection
        assess = undefined;
        top = undefined;
        return curri;
    }
    /**
     * 將單詞按照位置排列
     * Arrange Words by Position
     *
     * 將匹配到的單詞依據其起始位置分組。
     * 對於沒有匹配單詞的位置，填補單字詞元以確保所有位置都有對應的詞。
     *
     * Groups matched words by their starting position.
     * For positions without matched words, fills with single-character tokens to ensure all positions have corresponding words.
     *
     * @param {IWord[]} words - 單詞陣列 / Word array
     * @param {string} text - 原始文本 / Original text
     * @returns {{[index: number]: IWord[]}} 按位置分組的單詞表 / Word table grouped by position
     */
    getPosInfo(words, text) {
        var _a;
        let wordpos = {};
        // 将单词按位置分组
        for (let word of words) {
            wordpos[word.c] = (_a = wordpos[word.c]) !== null && _a !== void 0 ? _a : [];
            wordpos[word.c].push(word);
        }
        // 按单字分割文本，填补空缺的位置
        for (let i = 0; i < text.length; i++) {
            if (!wordpos[i]) {
                // 以單字作為後備詞元 / Use single character as fallback token
                wordpos[i] = [{ w: text.charAt(i), c: i, f: 0 }];
            }
        }
        return wordpos;
    }
    /**
     * 取所有分支
     * Get All Branches
     *
     * 遞迴生成所有可能的分詞組合（分支）。
     * 使用 MAX_CHUNK_COUNT 限制遞迴深度以防止效能問題。
     * 特殊處理連字（如「啊啊啊...」）以避免組合爆炸。
     *
     * Recursively generates all possible segmentation combinations (branches).
     * Uses MAX_CHUNK_COUNT to limit recursion depth and prevent performance issues.
     * Special handling for repeated characters (e.g., "啊啊啊...") to avoid combinatorial explosion.
     *
     * @param {{[index: number]: IWord[]}} wordpos - 按位置分組的單詞表 / Word table grouped by position
     * @param {number} pos - 當前位置 / Current position
     * @param {string} text - 本節要分詞的文本 / Text to segment in this section
     * @param {number} total_count - 累計處理次數 / Cumulative processing count
     * @param {number} MAX_CHUNK_COUNT - 最大區塊數量限制 / Maximum chunk count limit
     * @returns {IWord[][]} 所有可能的分詞組合 / All possible segmentation combinations
     */
    getChunks(wordpos, pos, text, total_count = 0, MAX_CHUNK_COUNT) {
        var _a;
        /**
         *
         * 追加新模式使 MAX_CHUNK_COUNT 遞減來防止無分段長段落的總處理次數過高 由 DEFAULT_MAX_CHUNK_COUNT_MIN 來限制最小值
         */
        // 首次呼叫時初始化 MAX_CHUNK_COUNT / Initialize MAX_CHUNK_COUNT on first call
        if (total_count === 0) {
            MAX_CHUNK_COUNT = this.MAX_CHUNK_COUNT;
            /**
             * 只有當目前文字長度大於 MAX_CHUNK_COUNT 時才遞減
             */
            if (text.length < MAX_CHUNK_COUNT) {
                MAX_CHUNK_COUNT += 1;
            }
        }
        // 遞迴時逐步減少 MAX_CHUNK_COUNT 以控制複雜度 / Gradually reduce MAX_CHUNK_COUNT during recursion to control complexity
        else if (MAX_CHUNK_COUNT <= this.MAX_CHUNK_COUNT) {
            MAX_CHUNK_COUNT = Math.max(MAX_CHUNK_COUNT - 1, this.DEFAULT_MAX_CHUNK_COUNT_MIN, exports.DEFAULT_MAX_CHUNK_COUNT_MIN);
        }
        else {
            //MAX_CHUNK_COUNT = Math.max(MAX_CHUNK_COUNT, this.DEFAULT_MAX_CHUNK_COUNT_MIN, DEFAULT_MAX_CHUNK_COUNT_MIN)
        }
        /**
         * 忽略連字
         *
         * 例如: 啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
         */
        // 偵測連字模式 / Detect repeated character pattern
        let m;
        if (!(0, isUnset_1.default)(m = text.match(/^((.+)\2{5,})/))) {
            let s1 = text.slice(0, m[1].length);
            let s2 = text.slice(m[1].length);
            let word = {
                w: s1,
                c: pos,
                f: 0,
            };
            let _ret = [];
            if (s2 !== '') {
                // 遞迴處理剩餘文字 / Recursively process remaining text
                let chunks = this.getChunks(wordpos, pos + s1.length, s2, total_count, MAX_CHUNK_COUNT);
                for (let ws of chunks) {
                    _ret.push([word].concat(ws));
                }
            }
            else {
                _ret.push([word]);
            }
            //			console.dir(wordpos);
            //
            //			console.dir(ret);
            //
            //			console.dir([pos, text, total_count]);
            return _ret;
        }
        total_count++;
        let words = (_a = wordpos[pos]) !== null && _a !== void 0 ? _a : [];
        //debug(total_count, MAX_CHUNK_COUNT);
        //		debug({
        //			total_count,
        //			MAX_CHUNK_COUNT: this.MAX_CHUNK_COUNT,
        //			text,
        //			words,
        //		});
        // debug('getChunks: ');
        // debug(words);
        //throw new Error();
        let ret = [];
        for (let word of words) {
            //debug(word);
            let nextcur = word.c + word.w.length;
            /**
             * @FIXME
             */
            // 如果下一個位置沒有詞，表示到達終點 / If no word at next position, reached the end
            if (!wordpos[nextcur]) {
                ret.push([word]);
            }
            // 如果超過處理上限，提前終止遞迴 / If exceeding processing limit, terminate recursion early
            else if (total_count > MAX_CHUNK_COUNT) {
                // do something
                //				console.log(444, words.slice(i));
                //				console.log(333, word);
                let w1 = [word];
                // 直接串接剩餘的詞 / Directly concatenate remaining words
                let j = nextcur;
                while (j in wordpos) {
                    let w2 = wordpos[j][0];
                    if (!(0, isUnset_1.default)(w2)) {
                        w1.push(w2);
                        j += w2.w.length;
                    }
                    else {
                        break;
                    }
                }
                ret.push(w1);
            }
            else {
                // 遞迴取得後續分詞組合 / Recursively get subsequent segmentation combinations
                let t = text.slice(word.w.length);
                let chunks = this.getChunks(wordpos, nextcur, t, total_count, MAX_CHUNK_COUNT);
                for (let ws of chunks) {
                    ret.push([word].concat(ws));
                }
                chunks = null;
            }
        }
        // 釋放參考以協助垃圾回收 / Release references to assist garbage collection
        words = undefined;
        wordpos = undefined;
        m = undefined;
        return ret;
    }
}
exports.DictTokenizer = DictTokenizer;
exports.init = DictTokenizer.init.bind(DictTokenizer);
exports.type = DictTokenizer.type;
exports.default = DictTokenizer;
//# sourceMappingURL=DictTokenizer.js.map