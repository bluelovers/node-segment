/**
 * 中文姓氏模組
 * Chinese Surname Module
 *
 * 提供中文姓氏、名字相關的詞典資料，用於中文分詞系統的人名識別。
 * Provides Chinese surname and name dictionary data for Chinese word segmentation and name recognition.
 */

'use strict';

import { IDICT } from '../Segment';
import { arrCjk as arr_cjk } from '@lazy-cjk/zh-table-list/list';

/**
 * 中文姓名詞典命名空間
 * Chinese Name Dictionary Namespace
 *
 * 包含單姓、複姓、雙字姓名各部分及單字姓名的詞典資料。
 * Contains dictionary data for single surnames, compound surnames, parts of two-character names, and single-character names.
 */
export namespace _CHS_NAMES
{

	/**
	 * 單姓列表
	 * Single Surname List
	 *
	 * 包含常見的單字姓氏，分為有明顯歧義和無明顯歧義兩類。
	 * Includes common single-character surnames, divided into those with obvious ambiguity and those without.
	 */
	export const FAMILY_NAME_1 = [
		//有明显歧义的姓氏
		'王', '张', '黄', '周', '徐', '胡', '高', '林', '马', '于', '程', '傅', '曾', '叶', '余',
		'夏', '钟', '田', '任', '方', '石', '熊', '白', '毛', '江', '史', '候', '龙', '万', '段',
		'雷', '钱', '汤', '易', '常', '武', '赖', '文', '查',
		//没有明显歧义的姓氏
		'赵', '肖', '孙', '李', '吴', '郑', '冯', '陈', '褚', '卫', '蒋', '沈',
		'韩', '杨', '朱', '秦', '尤', '许', '何', '吕', '施', '桓', '孔', '曹',
		'严', '华', '金', '魏', '陶', '姜', '戚', '谢', '邹', '喻', '柏', '窦',
		'苏', '潘', '葛', '奚', '范', '彭', '鲁', '韦', '昌', '俞', '袁', '酆',
		'鲍', '唐', '费', '廉', '岑', '薛', '贺', '倪', '滕', '殷', '罗', '毕',
		'郝', '邬', '卞', '康', '卜', '顾', '孟', '穆', '萧', '尹', '姚', '邵',
		'湛', '汪', '祁', '禹', '狄', '贝', '臧', '伏', '戴', '宋', '茅', '庞',
		'纪', '舒', '屈', '祝', '董', '梁', '杜', '阮', '闵', '贾', '娄', '颜',
		'郭', '邱', '骆', '蔡', '樊', '凌', '霍', '虞', '柯', '昝', '卢', '柯',
		'缪', '宗', '丁', '贲', '邓', '郁', '杭', '洪', '崔', '龚', '嵇', '邢',
		'滑', '裴', '陆', '荣', '荀', '惠', '甄', '芮', '羿', '储', '靳', '汲',
		'邴', '糜', '隗', '侯', '宓', '蓬', '郗', '仲', '栾', '钭', '历', '戎',
		'刘', '詹', '幸', '韶', '郜', '黎', '蓟', '溥', '蒲', '邰', '鄂', '咸',
		'卓', '蔺', '屠', '乔', '郁', '胥', '苍', '莘', '翟', '谭', '贡', '劳',
		'冉', '郦', '雍', '璩', '桑', '桂', '濮', '扈', '冀', '浦', '庄', '晏',
		'瞿', '阎', '慕', '茹', '习', '宦', '艾', '容', '慎', '戈', '廖', '庾',
		'衡', '耿', '弘', '匡', '阙', '殳', '沃', '蔚', '夔', '隆', '巩', '聂',
		'晁', '敖', '融', '訾', '辛', '阚', '毋', '乜', '鞠', '丰', '蒯', '荆',
		'竺', '盍', '单', '欧',

		'朴',
	];

	/**
	 * 複姓列表
	 * Compound Surname List
	 *
	 * 包含常見的雙字姓氏，如司馬、上官等。
	 * Includes common two-character surnames such as 司馬, 上官, etc.
	 */
	export const FAMILY_NAME_2 = [
		'司马', '上官', '欧阳', '夏侯', '诸葛', '闻人', '东方', '赫连', '皇甫',
		'尉迟', '公羊', '澹台', '公冶', '宗政', '濮阳', '淳于', '单于', '太叔',
		'申屠', '公孙', '仲孙', '轩辕', '令狐', '徐离', '宇文', '长孙', '慕容',
		'司徒', '司空', '万俟',
	];

	/**
	 * 雙字姓名第一個字列表
	 * First Character of Two-Character Names List
	 *
	 * 用於構成雙字姓名的第一個字，如「建國」中的「建」。
	 * Used as the first character in two-character names, such as '建' in '建國'.
	 */
	export const DOUBLE_NAME_1 = [
		'阿', '建', '小', '晓', '文', '志', '国', '玉', '丽', '永', '海', '春', '金', '明',
		'新', '德', '秀', '红', '亚', '伟', '雪', '俊', '桂', '爱', '美', '世', '正', '庆',
		'学', '家', '立', '淑', '振', '云', '华', '光', '惠', '兴', '天', '长', '艳', '慧',
		'利', '宏', '佳', '瑞', '凤', '荣', '秋', '继', '嘉', '卫', '燕', '思', '维', '少',
		'福', '忠', '宝', '子', '成', '月', '洪', '东', '一', '泽', '林', '大', '素', '旭',
		'宇', '智', '锦', '冬', '玲', '雅', '伯', '翠', '传', '启', '剑', '安', '树', '良',
		'中', '梦', '广', '昌', '元', '万', '清', '静', '友', '宗', '兆', '丹', '克', '彩',
		'绍', '喜', '远', '朝', '敏', '培', '胜', '祖', '先', '菊', '士', '向', '有', '连',
		'军', '健', '巧', '耀', '莉', '英', '方', '和', '仁', '孝', '梅', '汉', '兰', '松',
		'水', '江', '益', '开', '景', '运', '贵', '祥', '青', '芳', '碧', '婷', '龙', '鹏',
		'自', '顺', '双', '书', '生', '义', '跃', '银', '佩', '雨', '保', '贤', '仲', '鸿',
		'浩', '加', '定', '炳', '飞', '锡', '柏', '发', '超', '道', '怀', '进', '其', '富',
		'平', '全', '阳', '吉', '茂', '彦', '诗', '洁', '润', '承', '治', '焕', '如', '君',
		'增', '善', '希', '根', '应', '勇', '宜', '守', '会', '凯', '育', '湘', '凌', '本',
		'敬', '博', '延', '乐', '三', '二', '四', '五', '六', '七', '八', '九', '十',

		'珪',
	];

	/**
	 * 雙字姓名第二個字列表
	 * Second Character of Two-Character Names List
	 *
	 * 用於構成雙字姓名的第二個字，如「建國」中的「國」。
	 * Used as the second character in two-character names, such as '國' in '建國'.
	 */
	export const DOUBLE_NAME_2 = [
		'华', '平', '明', '英', '军', '林', '萍', '芳', '玲', '红', '生', '霞', '梅', '文',
		'荣', '珍', '兰', '娟', '峰', '琴', '云', '辉', '东', '龙', '敏', '伟', '强', '丽',
		'春', '杰', '燕', '民', '君', '波', '国', '芬', '清', '祥', '斌', '婷', '飞', '良',
		'忠', '新', '凤', '锋', '成', '勇', '刚', '玉', '元', '宇', '海', '兵', '安', '庆',
		'涛', '鹏', '亮', '青', '阳', '艳', '松', '江', '莲', '娜', '兴', '光', '德', '武',
		'香', '俊', '秀', '慧', '雄', '才', '宏', '群', '琼', '胜', '超', '彬', '莉', '中',
		'山', '富', '花', '宁', '利', '贵', '福', '发', '义', '蓉', '喜', '娥', '昌', '仁',
		'志', '全', '宝', '权', '美', '琳', '建', '金', '贤', '星', '丹', '根', '和', '珠',
		'康', '菊', '琪', '坤', '泉', '秋', '静', '佳', '顺', '源', '珊', '达', '欣', '如',
		'莹', '章', '浩', '勤', '芹', '容', '友', '芝', '豪', '洁', '鑫', '惠', '洪', '旺',
		'虎', '远', '妮', '森', '妹', '南', '雯', '奇', '健', '卿', '虹', '娇', '媛', '怡',
		'铭', '川', '进', '博', '智', '来', '琦', '学', '聪', '洋', '乐', '年', '翔', '然',
		'栋', '凯', '颖', '鸣', '丰', '瑞', '奎', '立', '堂', '威', '雪', '鸿', '晶', '桂',
		'凡', '娣', '先', '洲', '毅', '雅', '月', '旭', '田', '晖', '方', '恒', '亚', '泽',
		'风', '银', '高', '贞', '九', '薇',

		'瑜', '瑛', '碩', '佑',
	];

	/**
	 * 單字姓名列表
	 * Single-Character Name List
	 *
	 * 用於構成單字姓名的字，如「偉」、「芳」等。
	 * Used for single-character names, such as '偉', '芳', etc.
	 */
	export const SINGLE_NAME = [
		'家', '民', '敏', '伟', '勇', '军', '斌', '静', '丽', '涛', '芳', '杰', '萍', '强',
		'俊', '明', '燕', '磊', '玲', '华', '平', '鹏', '健', '波', '红', '丹', '辉', '超',
		'艳', '莉', '刚', '娟', '峰', '婷', '亮', '洁', '颖', '琳', '英', '慧', '飞', '霞',
		'浩', '凯', '宇', '毅', '林', '佳', '云', '莹', '娜', '晶', '洋', '文', '鑫', '欣',
		'琴', '宁', '琼', '兵', '青', '琦', '翔', '彬', '锋', '阳', '璐', '旭', '蕾', '剑',
		'虹', '蓉', '建', '倩', '梅', '宏', '威', '博', '君', '力', '龙', '晨', '薇', '雪',
		'琪', '欢', '荣', '江', '炜', '成', '庆', '冰', '东', '帆', '雷', '楠', '锐', '进',
		'海', '凡', '巍', '维', '迪', '媛', '玮', '杨', '群', '瑛', '悦', '春', '瑶', '婧',
		'兰', '茜', '松', '爽', '立', '瑜', '睿', '晖', '聪', '帅', '瑾', '骏', '雯', '晓',
		'昊', '勤', '新', '瑞', '岩', '星', '忠', '志', '怡', '坤', '康', '航', '利', '畅',
		'坚', '雄', '智', '萌', '哲', '岚', '洪', '捷', '珊', '恒', '靖', '清', '扬', '昕',
		'乐', '武', '玉', '诚', '菲', '锦', '凤', '珍', '晔', '妍', '璇', '胜', '菁', '科',
		'芬', '露', '越', '彤', '曦', '义', '良', '鸣', '芸', '方', '月', '铭', '光', '震',
		'冬', '源', '政', '虎', '莎', '彪', '蓓', '钢', '凌', '奇', '卫', '彦', '烨', '可',
		'黎', '川', '淼', '惠', '祥', '然', '三', '二', '一', '四', '五', '六', '七',
		'八', '九', '十',

		'敖',
	];

	/**
	 * 不重複單字姓名列表
	 * Non-Repeating Single-Character Name List
	 *
	 * 包含不應重複使用的單字姓名，用於避免姓名重複。
	 * Contains single-character names that should not be repeated to avoid name duplication.
	 */
	export const SINGLE_NAME_NO_REPEAT = [
		'懃',
	];

	/**
	 * 共享姓名字列表
	 * Shared Name Character List
	 *
	 * 包含可在姓氏和名字中共享使用的字，如「濟」。
	 * Contains characters that can be shared between surnames and given names, such as '濟'.
	 */
	export const SHARE_NAME = [
		'濟',
	];

	/**
	 * 將字串陣列轉換為字典格式
	 * Convert String Array to Dictionary Format
	 *
	 * 將輸入的字串陣列轉換為 IDICT<number> 格式的字典，
	 * 其中鍵為字串，值為字串長度。
	 *
	 * Converts the input string array into an IDICT<number> format dictionary,
	 * where the key is the string and the value is the string length.
	 *
	 * @param {string[]} a - 輸入的字串陣列 / Input string array
	 * @param {number} n - 字串長度值 / String length value
	 * @returns {IDICT<number>} 轉換後的字典 / Converted dictionary
	 */
	export function p(a: string[], n: number): IDICT<number>
	{
		let data: IDICT<number> = arr_cjk(a)
			.reduce(function (data, v)
			{
				data[v] = n;

				return data;
			}, {})
		;

		return data;
	}

}

/**
 * 單姓字典
 * Single Surname Dictionary
 *
 * 將單姓列表轉換為字典格式，用於快速查找。
 * Converts the single surname list into dictionary format for quick lookup.
 */
export const FAMILY_NAME_1 = _CHS_NAMES.p(_CHS_NAMES.FAMILY_NAME_1, 1);

// 移除特殊姓氏「於」以避免衝突
// Remove special surname '於' to avoid conflicts
delete FAMILY_NAME_1['於'];

/**
 * 複姓字典
 * Compound Surname Dictionary
 *
 * 將複姓列表轉換為字典格式，用於快速查找。
 * Converts the compound surname list into dictionary format for quick lookup.
 */
export const FAMILY_NAME_2 = _CHS_NAMES.p(_CHS_NAMES.FAMILY_NAME_2, 2);

/**
 * 雙字姓名第一個字字典
 * First Character of Two-Character Names Dictionary
 *
 * 將雙字姓名第一個字列表與共享姓名字合併後轉換為字典格式。
 * Merges the first character list with shared name characters and converts to dictionary format.
 */
export const DOUBLE_NAME_1 = _CHS_NAMES.p(_CHS_NAMES.DOUBLE_NAME_1.concat(_CHS_NAMES.SHARE_NAME), 1);

/**
 * 雙字姓名第二個字字典
 * Second Character of Two-Character Names Dictionary
 *
 * 將雙字姓名第二個字列表與共享姓名字合併後轉換為字典格式。
 * Merges the second character list with shared name characters and converts to dictionary format.
 */
export const DOUBLE_NAME_2 = _CHS_NAMES.p(_CHS_NAMES.DOUBLE_NAME_2.concat(_CHS_NAMES.SHARE_NAME), 2);

/**
 * 單字姓名字典
 * Single-Character Name Dictionary
 *
 * 將單字姓名列表與共享姓名字合併後轉換為字典格式。
 * Merges the single-character name list with shared name characters and converts to dictionary format.
 */
export const SINGLE_NAME = _CHS_NAMES.p(_CHS_NAMES.SINGLE_NAME.concat(_CHS_NAMES.SHARE_NAME), 1);

/**
 * 不重複單字姓名字典
 * Non-Repeating Single-Character Name Dictionary
 *
 * 將不重複單字姓名列表轉換為字典格式。
 * Converts the non-repeating single-character name list into dictionary format.
 */
export const SINGLE_NAME_NO_REPEAT = _CHS_NAMES.p(_CHS_NAMES.SINGLE_NAME_NO_REPEAT, 1);

export default exports as typeof import('./CHS_NAMES');
