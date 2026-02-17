/**
 * 同義詞轉換模組
 * Synonym Conversion Module
 *
 * 將分詞結果中的詞語轉換為其標準同義詞。
 * Converts words in segmentation results to their standard synonyms.
 */
import { IWordDebug } from '../../util/debug';
import { IDICT, IDICT_SYNONYM } from '../types';
import { ITSOverwrite } from 'ts-type';
import { POSTAG } from '@novel-segment/postag/lib/postag/ids';
import { IWord } from '@novel-segment/types';
/**
 * 同義詞轉換選項介面
 * Synonym Conversion Options Interface
 */
interface IOptions {
    /**
     * 是否顯示轉換計數（用於除錯）
     * Whether to show conversion count (for debugging)
     */
    showcount?: boolean;
    /**
     * 同義詞字典
     * Synonym Dictionary
     */
    DICT_SYNONYM: IDICT_SYNONYM;
    /**
     * 主字典表格
     * Main Dictionary Table
     */
    DICT_TABLE: IDICT<IWord>;
    /**
     * 詞性標記
     * Part of Speech Tags
     */
    POSTAG: typeof POSTAG;
}
/**
 * 帶計數的同義詞轉換結果介面
 * Synonym Conversion Result with Count Interface
 */
export interface IConvertSynonymWithShowcount {
    /**
     * 轉換次數
     * Conversion count
     */
    count: number;
    /**
     * 轉換後的詞語列表
     * Converted word list
     */
    list: IWordDebug[];
}
/**
 * 轉換同義詞（帶計數）
 * Convert Synonyms (with Count)
 *
 * 將分詞結果中的詞語轉換為其標準同義詞，並返回轉換計數。
 * Converts words in segmentation results to their standard synonyms and returns conversion count.
 *
 * @param {IWordDebug[]} ret - 分詞結果陣列 / Segmentation result array
 * @param {Object} options - 轉換選項 / Conversion options
 * @param {true} options.showcount - 必須為 true 以啟用計數 / Must be true to enable counting
 * @returns {Object} 包含計數與列表的物件 / Object containing count and list
 */
export declare function convertSynonym(ret: IWordDebug[], options: ITSOverwrite<IOptions, {
    showcount: true;
}>): {
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
 * @param {IOptions} [options] - 轉換選項 / Conversion options
 * @returns {IWordDebug[]} 轉換後的分詞結果 / Converted segmentation results
 */
export declare function convertSynonym(ret: IWordDebug[], options?: IOptions): IWordDebug[];
export {};
