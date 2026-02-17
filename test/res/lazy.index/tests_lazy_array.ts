/**
 * Created by user on 2020/1/17.
 */

import { lazyMatch002 } from '@novel-segment/assert';

/**
 * 多選匹配測試數據
 * Multiple Choice Match Test Data
 *
 * 用於測試斷詞結果是否符合多個可能結果中的任意一個。
 * 用於 lazyMatch002 函數的測試資料。
 *
 * Test data for verifying if segmentation results match any of multiple possible results.
 * Used for lazyMatch002 function testing.
 *
 * 測試資料結構 / Test Data Structure
 * [原始句子, 多個預期詞彙陣列, 選項?]
 *
 * @see lazyMatch002
 */
export const tests_lazy_array: [string, Parameters<typeof lazyMatch002>['1'], Parameters<typeof lazyMatch002>['2']?][] = [

	[
		'胡锦涛出席APEC领导人会议后回京',
		[
			[
				'会议',
				'回京',
			],
		],
	],

	[
		'在這裡有兩具自動人偶隨侍在側的烏列爾',
		[
			[
				'兩具',
				'自動',
				'人偶',
				'隨侍',
			],
			[
				'兩具',
				'自動人偶',
				'隨侍',
			],
		],
	],

	[
		'我摀住嘴',
		[
			[
				'我',
				'摀住',
				'嘴',
			],
			[
				'我',
				'摀住嘴',
			],
		],
	],

	[
		'世間萬物終歸于虛無',
		[
			[
				'世間',
				'萬物',
				'終歸',
				'於',
				'虛無',
			],
			[
				'世間',
				'萬物',
				'終歸於',
				'虛無',
			],
		],
	],

];

export default tests_lazy_array
