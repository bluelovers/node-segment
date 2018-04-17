"use strict";
/**
 * Created by user on 2018/4/16/016.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const mod_1 = require("./mod");
exports.getDefaultModList = mod_1.default;
const Segment_1 = require("./Segment");
exports.Segment = Segment_1.Segment;
function useDefault(segment, options = {}) {
    // 识别模块
    !options.nomod && segment.use(mod_1.default(options.all_mod));
    // 字典文件
    !options.nodict && segment
        //.loadDict('jieba') <=== bad file
        .loadDict('dict4')
        .loadDict('char')
        .loadDict('phrases')
        .loadDict('phrases2')
        .loadDict('dict') // 盘古词典
        .loadDict('dict2') // 扩展词典（用于调整原盘古词典）
        .loadDict('dict3') // 扩展词典（用于调整原盘古词典）
        .loadDict('names') // 常见名词、人名
        .loadDict('synonym/后')
        .loadDict('names/zh')
        .loadDict('wildcard', 'WILDCARD', true) // 通配符
        .loadSynonymDict('synonym') // 同义词
        .loadStopwordDict('stopword') // 停止符
        .loadDict('lazy/badword')
        .loadDict('lazy/dict_synonym')
        .loadDict('names/en')
        .loadDict('names/jp')
        .loadDict('lazy/index');
    return segment;
}
exports.useDefault = useDefault;
exports.default = Segment_1.Segment;