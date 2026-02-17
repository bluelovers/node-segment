"use strict";
/**
 * Created by user on 2018/4/16/016.
 *
 * 模块索引和枚举
 *
 * 导出所有子模块类并定义可用模块的枚举。
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUBMODS_OTHER_LIST = exports.SUBMODS_LIST = exports.LIST_SUBMODS_NOT_DEF = exports.ENUM_SUBMODS_OTHER = exports.ENUM_SUBMODS = exports.SubSModule = exports.SubSModuleTokenizer = exports.Tokenizer = exports.SubSModuleOptimizer = exports.Optimizer = void 0;
exports.getDefault = getDefault;
const ts_enum_util_1 = require("ts-enum-util");
const Optimizer_1 = require("./Optimizer");
Object.defineProperty(exports, "Optimizer", { enumerable: true, get: function () { return Optimizer_1.Optimizer; } });
Object.defineProperty(exports, "SubSModuleOptimizer", { enumerable: true, get: function () { return Optimizer_1.SubSModuleOptimizer; } });
const Tokenizer_1 = require("./Tokenizer");
Object.defineProperty(exports, "SubSModuleTokenizer", { enumerable: true, get: function () { return Tokenizer_1.SubSModuleTokenizer; } });
Object.defineProperty(exports, "Tokenizer", { enumerable: true, get: function () { return Tokenizer_1.Tokenizer; } });
const mod_1 = require("./mod");
Object.defineProperty(exports, "SubSModule", { enumerable: true, get: function () { return mod_1.SubSModule; } });
/**
 * 识别模块
 * 强制分割类单词识别
 */
var ENUM_SUBMODS;
(function (ENUM_SUBMODS) {
    /**
     * URL识别
     */
    ENUM_SUBMODS["URLTokenizer"] = "URLTokenizer";
    /**
     * 通配符，必须在标点符号识别之前
     */
    ENUM_SUBMODS["WildcardTokenizer"] = "WildcardTokenizer";
    /**
     * 标点符号识别
     */
    ENUM_SUBMODS["PunctuationTokenizer"] = "PunctuationTokenizer";
    /**
     * 外文字符、数字识别，必须在标点符号识别之后
     */
    ENUM_SUBMODS["ForeignTokenizer"] = "ForeignTokenizer";
    // 中文单词识别
    /**
     * 词典识别
     */
    ENUM_SUBMODS["DictTokenizer"] = "DictTokenizer";
    /**
     * 人名识别，建议在词典识别之后
     */
    ENUM_SUBMODS["ChsNameTokenizer"] = "ChsNameTokenizer";
    ENUM_SUBMODS["JpSimpleTokenizer"] = "JpSimpleTokenizer";
    /**
     * 注音（注音符号）识别
     */
    ENUM_SUBMODS["ZhuyinTokenizer"] = "ZhuyinTokenizer";
    /**
     * 部首识别（已禁用）
     */
    //ZhRadicalTokenizer = 'ZhRadicalTokenizer',
    // @todo 优化模块
    /**
     * 邮箱地址识别
     */
    ENUM_SUBMODS["EmailOptimizer"] = "EmailOptimizer";
    /**
     * 人名识别优化
     */
    ENUM_SUBMODS["ChsNameOptimizer"] = "ChsNameOptimizer";
    /**
     * 词典识别优化
     */
    ENUM_SUBMODS["DictOptimizer"] = "DictOptimizer";
    /**
     * 日期时间识别优化
     */
    ENUM_SUBMODS["DatetimeOptimizer"] = "DatetimeOptimizer";
    /**
     * 合併外文與中文的詞
     * 例如 Ｔ恤
     */
    ENUM_SUBMODS["ForeignOptimizer"] = "ForeignOptimizer";
    /**
     * 自動處理 `里|裏|后`
     */
    ENUM_SUBMODS["ZhtSynonymOptimizer"] = "ZhtSynonymOptimizer";
    ENUM_SUBMODS["AdjectiveOptimizer"] = "AdjectiveOptimizer";
})(ENUM_SUBMODS || (exports.ENUM_SUBMODS = ENUM_SUBMODS = {}));
/**
 * 不包含在預設模組列表內 需要手動指定
 */
var ENUM_SUBMODS_OTHER;
(function (ENUM_SUBMODS_OTHER) {
    /**
     * 单字切分模块
     */
    ENUM_SUBMODS_OTHER["SingleTokenizer"] = "SingleTokenizer";
})(ENUM_SUBMODS_OTHER || (exports.ENUM_SUBMODS_OTHER = ENUM_SUBMODS_OTHER = {}));
/**
 * 非默认模块列表
 *
 * 未包含在默认模块列表中的模块。
 */
exports.LIST_SUBMODS_NOT_DEF = [
    ENUM_SUBMODS.ZhtSynonymOptimizer,
];
/**
 * 子模块枚举包装器
 *
 * 用于更方便迭代和查找的包装枚举。
 */
exports.SUBMODS_LIST = (0, ts_enum_util_1.$enum)(ENUM_SUBMODS);
/**
 * 额外子模块枚举包装器
 *
 * 用于额外模块的包装枚举。
 */
exports.SUBMODS_OTHER_LIST = (0, ts_enum_util_1.$enum)(ENUM_SUBMODS_OTHER);
/**
 * 取得列表並且保持 ENUM 順序
 * @param {boolean} all
 * @returns {ENUM_SUBMODS[]}
 */
function getDefault(all) {
    let list = exports.SUBMODS_LIST.getKeys();
    return Object.keys(ENUM_SUBMODS)
        .reduce(function (a, m) {
        if (!a.includes(m) && list.includes(m)) {
            if (all || !exports.LIST_SUBMODS_NOT_DEF.includes(m)) {
                a.push(m);
            }
        }
        return a;
    }, []);
}
//console.log(getDefault(true));
exports.default = getDefault;
//# sourceMappingURL=index.js.map