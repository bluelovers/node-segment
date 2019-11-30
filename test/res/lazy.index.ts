/**
 * Created by user on 2019/4/12.
 *
 * 測試段落 每次發布版本時 會保證以下分析轉換是符合預期
 */

import {
	lazyMatch,
	lazyMatch002,
	lazyMatchNot,
	lazyMatchSynonym001,
	sortTests,
	lazyMatchSynonym001Not,
} from '../lib/util';

/**
 * 分析後應該要符合以下結果
 */
export const tests_lazy_base: [string, Parameters<typeof lazyMatch>['1'], Parameters<typeof lazyMatch>['2']?][] = [

	[
		'胡锦涛出席APEC领导人会议后回京',
		[
			'会议',
			'回京',
		],
	],

	[
		'两个中国',
		[
			'两个',
			'中国',
		],
	],

	[
		'贾庆林会见厄瓜多尔客人',
		[
			'会见',
			'客人',
		],
	],

	[
		'全部都有',
		[
			'全部',
			'都有',
		],
	],

	[
		'從位在下方的湖面',
		[
			'位在',
			'下方',
		],
	],

	[
		'將那叫燕麥茶的玩意兒一口氣倒入口中。',
		[
			'一口氣',
			'倒入',
			'口中',
		],
	],

	[
		'我就順便在你臉上涂鴉吧',
		[
			'塗鴉',
		],
	],

	[
		'手指著岩地',
		[
			'手',
			'指著',
		],
	],

	[
		'疲憊不堪的強尼癱坐在岩石上',
		[
			'癱坐',
		],
	],

	[
		'「这是什么啊？是特別好的樹木的樹干吗？」',
		[
			'樹幹',
		],
	],

	[
		'由於領民間產生不小的騷動',
		[
			['領民', '領民間'],
			'產生',
		],
	],

	[
		'爲了收集有能力對術文獻上祈禱的人',
		[
			'收集',
			'獻上',
			'祈禱',
		],
	],

	[
		'賽拉正站在馬車的貨台上',
		[
			'馬車',
			'貨台',
		],
	],

	[
		'平均比重為一點七',
		[
			'一點七',
		],
	],

	[
		'正因為不知道明天會是如何',
		[
			'不知道',
			'明天',
		],
	],

	[
		'坐在倒塌樹幹上的安格斯站起了身子',
		[
			'倒塌',
			['樹幹', '樹幹上'],
		],
	],

	[
		'在操縱席的彼得開啟動力之後',
		[
			'操縱席',
			'彼得',
			'開啟',
			'動力',
		],
	],

	[
		'風壓擠機體',
		[
			'風',
			'壓擠',
			'機體',
		],
	],

	[
		'因此需要分成數趟往返搬運',
		[
			'因此',
			'需要',
			'分成',
			'數趟',
			'往返',
			'搬運',
		],
	],

	[
		'我打發了不少時間',
		[
			['打發', '打發了'],
		],
	],

	[
		'在農地外面則有大片可牧養牛羊的牧草地',
		[
			'牧養',
		],
	],

	[
		'就連個人影都找不著',
		[
			'人影',
		],
	],

	[
		'我发自內心表示感謝',
		[
			['發自', '發自內心'],
			'表示',
			'感謝',
		],
	],

	[
		'她把荷包蛋擺在像是印度烤餅的面包上',
		[
			'麵包',
		],
	],

	[
		'米爾琪特將嘴放在面包上',
		[
			'麵包',
		],
	],

	[
		'这并不是要吞并卡拉萨斯领的计划吗',
		[
			'並不是',
			'吞併',
		],
	],

	[
		'世间独一无二的标志才行',
		[
			'标誌',
		],
	],

	[
		'而是縷了一下前发',
		[
			'前髮',
		],
	],

	[
		'但是明天會在利得亞港上岸然后從陸路向王都瑪露提那前進',
		[
			'然後',
		],
	],

	[
		'把靈魂轉移到其他容器後就會完全切斷與原本身體的联系',
		[
			'联繫',
		],
	],

	[
		'作為父親后妻的女人是和親生母親不變的存在',
		[
			'後妻',
			['親生母親', '親生'],
		],
	],

	[
		'女性的雇傭兵中她那樣強的人還有沒有艾蓮娜不知道',
		[
			['雇傭兵', '僱傭兵'],
		],
	],

	[
		'在倫巴達確認自己的貨船裝滿貨物和完成出航手續后預定馬上趕到萊斯沃斯',
		[
			['手續', '出航手續',],
		],
	],

	[
		'但是果然世間對同性愛侶的看法一般都不怎麼友好',
		[
			['同性', '同性愛侶',],
		],
	],

	[
		'眼前的建筑物像教堂一样',
		[
			'建筑物',
		],
	],

	[
		'職業上也相當的平衡是非常理想的隊伍',
		[
			'非常',
			'理想',
		],
	],

	[
		'該如何反制',
		[
			'如何',
			'反制',
		],
	],

	[
		'從重要的血管到各種肌腱',
		[
			['重要', '重要的',]
		],
	],

	[
		'於名于實都成為勝負服的巫女服包裹全身',
		[
			'於名於實',
		],
	],

	[
		'把沙利叶強奸了',
		[
			['強奸', '強姦',]
		],
	],

	[
		'用人和怪物的血混合而成製作的專用墨水繪制法陣',
		[
			['繪製',]
		],
	],

	[
		'而且也希望先生產加工木材的木材加工機或加工金屬的鍛造機」',
		[
			['生產',]
		],
	],

	[
		'亦為神的仿製品',
		[
			['仿製品','仿制品']
		],
	],

	[
		'已知『？擁有意志之武器』的第一刀銘為『叢云』',
		[
			['刀銘']
		],
	],

	[
		'拿出舞蹈衣服上藏著的曲奇餅。',
		[
			['曲奇','曲奇餅']
		],
	],

	[
		'接受過英才教育',
		[
			['接受']
		],
	],

	[
		'「我來回答你的問題吧。',
		[
			['回答']
		],
	],

	[
		'但反而覺得有點危險呢',
		[
			['覺得']
		],
	],

	[
		'當下雖然把答覆含混過去了',
		[
			['答覆']
		],
	],

	[
		'但莉莉好象也一樣。',
		[
			['好象', '好像']
		],
	],

	[
		'　然而意外的是，百合並沒有責怪我。',
		[
			['百合'],
		],
	],

	[
		'劍與盾的接觸點发生了一股純粹而且龐大的能量',
		[
			['接觸點'],
		],
	],

	[
		'这就导致一些不太常见的人名无法被分出来',
		[
			['导致'],
			['人名'],
			['无法'],
		],
	],

	[
		'最多容納59,000個人,或5.9萬人,再多就不行了.這是環評的結論.',
		[
			['59,000個人'],
			['5.9萬人'],
		],
	],

];

/**
 * 分析後不應該存在符合以下結果
 */
export const tests_lazy_base_not: [string, Parameters<typeof lazyMatchNot>['1'], Parameters<typeof lazyMatchNot>['2']?][] = [

	[
		'這份毫不守舊的率直',
		[
			'份毫',
		],
	],

	[
		'在外面放哨的大概有十來人',
		[
			'在外',
		]
	],

	[
		'正是這份工作的不二人選',
		[
			'份工',
		],
	],


	[
		'好像是有商人為了攬客正大聲吆喝著',
		[
			'正大',
		],
	],

	[
		'比起《水月迷宮》中出現的哥布林身體能力有若干的提高',
		[
			'體能',
			['干的', '幹的', '乾的'],
		],
	],

	[
		'所以来办一场上梁仪式吧',
		[
			'以来',
		],
	],

	[
		'莉法娜发出沒力的聲音',
		[
			'出沒',
		],
	],

	[
		'伯納士坐在馬車的御馬台上緊緊攥著繮繩',
		[
			'上緊',
		],
	],

	[
		'每個桌子邊都有數名手拿酒翁的女性等候在一旁',
		[
			'名手',
		],
	],

	[
		'舌头互相交缠的淫秽声响静静地传了出来',
		[
			'相交',
		],
	],

	[
		'《寂靜領域》的發動和操作最好不要依賴聲音',
		[
			'好不',
		],
	],

	[
		'卻奇怪的很講義氣',
		[
			'講義',
		],
	],

	[
		'N在抵達異世界的數天后',
		[
			'天后',
		],
	],


	[
		'只要用對方法說不定就能無人犧牲',
		[
			'對方',
		],
	],

	[
		'在學院潛心于古今魔術的研究',
		[
			'在學',
		],
	],

	[
		'如果說卡麗婭各處所營造出的舉止和氛圍是高貴的話',
		[
			'處所',
		],
	],

	[
		'被占領了',
		[
			['被占', '被佔'],
		],
	],

	[
		'兩個人像浮屍一樣浮上了水面時競技也已經結束了',
		[
			['人像'],
		],
	],

	[
		'我用手里長劍與哥布林交手',
		[
			['里長'],
		],
	],

	[
		'魚如果干巴巴的',
		[
			['果干','果乾'],
		],
	],

	[
		'馬虎的发起兵糧飼草的採購及武器的護理等，也會產生各種各樣麻煩的費用。',
		[
			'起兵',
		],
	],

	[
		'在我把買來的炒面面包吞下去的時候',
		[
			'面面',
		],
	],

	[
		'她准備齊全地待在起居室等待──早起的理由則被她含糊帶過，說什麼也不肯告訴我。',
		[
			['備齊']
		],
	],

	[
		'柔荑掩嘴這一舉止的優雅應該值得世間所有的淑女學習吧。',
		[
			['一舉',],
		],
	],

	[
		'迪亚困倦地揉着眼睛走了过来。',
		[
			['着眼',],
		],
	],

	[
		'「啊，那可糟了。圖書室根本不通融。即使遲到一秒，別人就會佔掉座位了。」',
		[
			['不通',],
		],
	],

	[
		'在那個領域裡，魔族的核實體化了，肉體的分解·再構成變得不能。」',
		[
			['核實',],
		],
	],

	[
		'一邊看著熟睡在沙发上的夏緹亞',
		[
			['发上','發上']
		],
	],

	[
		'百合繪的異常性就浮現出來了',
		[
			['浮現出',],
		],
	],

	[
		'言簡而意賅，媽媽的意圖我已了然於心。',
		[
			['然於']
		],
	],

	[
		'所以並不想合作到這種地步。',
		[
			['種地']
		],
	],

	[
		'廣瀨的下一個對象是我嗎？很遺憾，對男人沒有興趣。',
		[
			['象是']
		],
	],

	[
		'　墮入絕望的深淵的她，最後抓住的對象是――',
		[
			['象是']
		],
	],

	[
		'「唔⋯⋯于南天邊境尋光⋯⋯發行・輝石龕燈！」',
		[
			'天邊',
		],
	],

	[
		'「⋯⋯唉，汝那胡來的惡習還是一如以往吶。若是引起『變異性休克』而死，那可怎麼辦？大蠢材。」',
		[
			'異性',
		],
	],

	[
		'我們也該做出发的準備了嗎？',
		[
			'做出',
		],
	],

	[
		'一整天做出发的準備、隔天早上、一行人從迷宮都市出發了。',
		[
			'做出',
		],
	],

	[
		'他將身體靠在稍遠處的粗大樹干上',
		[
			'大樹',
		],
	],

	[
		'對于越過巴特拉姆攻來的灰衣人們',
		[
			'于越',
		],
	],

	[
		'阿一並沒有回答',
		[
			['一並', '一併'],
		],
	],

];

/**
 * 分析後應該要符合以下其中一個結果
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

/**
 * 分析轉換後應該要具有以下字詞
 */
export const tests_lazy_indexof: [string, Parameters<typeof lazyMatchSynonym001>['1'], Parameters<typeof lazyMatchSynonym001>['2']?][] = [

	[
		'大家干的好',
		[
			'幹',
		],
	],

	[
		'至今為止他對自己所干的事',
		[
			'幹',
		],
	],

	[
		'反正會被拼命干的吧',
		[
			'幹',
		],
	],

	[
		'雖然要干的事也增加了',
		[
			'幹',
		],
	],

	[
		'你好好干的話',
		[
			'幹',
		],
	],

	[
		'奧莉薇婭率領的騎兵聯隊將作為第二批部隊于一周後出發',
		[
			'於',
		],
	],

	[
		'完全沒有注意的我們都因為這下冲擊摔倒在地',
		[
			'衝',
		],
	],

	[
		'而且我希望能一直就這麼干下去',
		[
			'幹',
		],
	],

	[
		'從旁邊看來肯定是一副相當恶心的畫面',
		[
			'噁',
		],
	],

	[
		'這票干成之後我們就要發財了',
		[
			'幹',
		],
	],

	[
		'但是想要干一番能改變世界的大事',
		[
			'幹',
		],
	],

	[
		'看來真有把臉捏丑一點的必要了',
		[
			'醜',
		],
	],

	[
		'除了里長烏拉諾斯之外',
		[
			'里',
		],
	],

	[
		'少女的右手如云霧般消失',
		[
			'雲',
		],
	],

	[
		'緊貼著濕发的前額',
		[
			'髮',
		],
	],

	[
		'不遜色于阿尼艾絲的美麗女人',
		[
			'於',
		],
	],

	[
		'毀于蟻穴',
		[
			'於',
		],
	],

	[
		'放心后男人們發呆地凝視著',
		[
			'後',
		],
	],

	[
		'這個書信是在早上发放到所有公會的',
		[
			'發',
		],
	],

	[
		'任何國家都對騎士和士兵的征用表現積極態度',
		[
			'徵',
		],
	],

	[
		'而這些是起因于強烈的嫉妒心',
		[
			'於',
		],
	],

	[
		'就這樣真正的為余效力如何',
		[
			'余',
		],
	],

	[
		'為什麼要拒絶余的邀請',
		[
			'余',
		],
	],

	[
		'我終于成為了魔法使',
		[
			'於',
		],
	],

	[
		'嗯，余滿足了。',
		[
			'余',
		],
	],

	[
		'我也正想要放開手腳大干一場',
		[
			'幹',
		],
	],

	[
		'反正也是沒事干',
		[
			'幹',
		],
	],

	[
		'对方提出单方面于己方有利的交易',
		[
			'於',
		],
	],

	[
		'血什么的一滴都沒喝',
		[
			'麼',
		],
	],

	[
		'以奧蘭多王国為例子的話就是准騎士團',
		[
			'準',
		],
	],

	[
		'但什麼都不需要就能好好干事是不可能的',
		[
			'幹',
		],
	],

	[
		'這個時間點雷里歐和伊莉娜一樣',
		[
			'里',
		],
	],


	[
		'他拿起几粒稻谷进行鉴定后',
		[
			'穀',
		],
	],

	[
		'居然敢干出这种勾当',
		[
			'幹',
		],
	],

	[
		'可是加上兽人王后难度便大幅向上提升',
		[
			'后',
		],
	],

	[
		'乌尔娜将魔法术式刻划在潜意识内后',
		[
			'後',
		],
	],

	[
		'而且超恶心',
		[
			'噁',
		],
	],

	[
		'「那個，叫什麼來著⋯⋯烏賊干嗎？」',
		[
			'乾',
		],
	],

	[
		'「烏賊干嗎？沾上蛋黃醬可是十分美味啊」',
		[
			'乾',
		],
	],

	[
		'到头来，连衣服都自己缝制了',
		[
			'製',
		],
	],

	[
		'然後把干蘑菇和湯汁混合',
		[
			'乾',
		],
	],

	[
		'野兽的脂肪与锅炒用的干货一同在锅里交融',
		[
			'乾',
		],
	],

	[
		'喂我要實現你的願望讓你實體化咯',
		[
			'喂',
		],
	],

	[
		'當叫做里卡多先生的他與她說話的時候',
		[
			'里',
		],
	],

	[
		'而她却被对黒乃桑抱有的不纯想法冲昏了脑袋',
		[
			'沖',
		],
	],

	[
		'雖然還有著只是發射便有著讓人昏倒程度的后座力問題',
		[
			'後',
		],
	],

	[
		'本來蛇王禁縛是和莉莉合體后',
		[
			'後',
		],
	],

	[
		'艾梅莉亞將軍的第二隊【暴風】作為后備役待機',
		[
			'後',
		],
	],

	[
		'這麼一聲響街道的石板與血沫一起四濺后觸手斷裂了',
		[
			'後',
		],
	],

	[
		'最後對方感到無趣后自行退場了',
		[
			'後',
		],
	],

	[
		'然后又不知從哪裡掏出了一個',
		[
			'後',
		],
	],

	[
		'就這樣約好后',
		[
			'後',
		],
	],

	[
		'明明是友情關係雨過天晴后的可喜可賀的瞬間',
		[
			'後',
		],
	],

	[
		'穿過像藝術品一樣的雪白正門后',
		[
			'後',
		],
	],

	[
		'在打了個帶有血液腥臭味的嗝后',
		[
			'後',
		],
	],

	[
		'從前代惡政后踏踏實實重建國家的實績',
		[
			'後',
		],
	],

	[
		'僅僅一上午就干完了所有事情',
		[
			'幹',
		],
	],

	[
		'这位少女的银发被粗暴地抓起',
		[
			'髮',
		],
	],

	[
		'從背後伸來的血手拉扯著少女美麗的銀髮',
		[
			'髮',
		],
	],

	[
		'壽命長的精靈從在外表上看可能差了十几二十年',
		[
			'幾',
		],
	],

	[
		'小柩意外的干的很好',
		[
			'幹',
		],
	],

	[
		'被帶過來的是流淌著墨黑光亮的艷发加上雪白無瑕肌膚的人類女性',
		[
			'髮',
		],
	],

	[
		'多是偏于某原色魔力',
		[
			'於',
		],
	],

	[
		'有長于謀策的人在統管',
		[
			'於',
		],
	],

	[
		'外觀也破爛的連一片白色涂飾也沒留下',
		[
			'塗',
		],
	],

	[
		'對家里人也要保密哦',
		[
			'裡',
		],
	],

	[
		'還有缺什么的話不用客氣直接說出來就行了',
		[
			'麼',
		],
	],

	[
		'對于平日在大圖書室搜集書籍看書',
		[
			'於',
		],
	],

	[
		'以前是被歸為准男爵的騎士家的家族',
		[
			'準',
		],
	],

	[
		'但是與氣流相反的方向准沒錯',
		[
			'準',
		],
	],

	[
		'「干吧」',
		[
			'幹',
		],
	],

	[
		'快干趴那種傢伙',
		[
			'幹',
		],
	],

	[
		'雖然大概沒機會再干一次了」',
		[
			'幹',
		],
	],

	[
		'反正在船上什麼也干不了吧',
		[
			'幹',
		],
	],

	[
		'她不會干那種下流的事',
		[
			'幹',
		],
	],

	[
		'為你們擦屁股的活會由我來干',
		[
			'幹',
		],
	],

	[
		'“鬼知道啊!你去干呀!”',
		[
			'幹',
		],
	],

	[
		'自己上就不干',
		[
			'幹',
		],
	],

	[
		'媽媽和伯父不是都想干就幹嗎',
		[
			'幹',
		],
	],

	[
		'一定會跟我說「再落力地去干」',
		[
			'幹',
		],
	],

	[
		'就算是我都不會這樣干',
		[
			'幹',
		],
	],

	[
		'黑頭发的女性和那兩位也想一起去',
		[
			'髮',
		],
	],

	[
		'克萊曼濯发畢',
		[
			'髮',
		],
	],

	[
		'我在故鄉有发小在',
		[
			'髮',
		],
	],

	[
		'帶刺的紅色中長发很獨特',
		[
			'髮',
		],
	],

	[
		'帶刺的紅色中長发是其特徵',
		[
			'髮',
		],
	],

	[
		'明明還會給我发些安潔的內衣照',
		[
			'發',
		],
	],

	[
		'科林发著牢騷',
		[
			'發',
		],
	],

	[
		'里昂靠賭博发橫財時的照片',
		[
			'發',
		],
	],

	[
		'島上的港口擠滿了來送出发去留學的我的人',
		[
			'發',
		],
	],

	[
		'跳上茶几跨過手槍打了埃里克一巴掌',
		[
			'几',
		],
	],

	[
		'防範叛亂于未然',
		[
			'於',
		],
	],

	[
		'有发自真心的笑容',
		[
			'發',
		],
	],

	[
		'啊~！你们的选手重复了！好好的听人说话！',
		[
			'複',
		],
	],

	[
		'第一天就从轻松地跑3千公尺的地方开始吧！',
		[
			'鬆',
		],
	],

	[
		'第一天就從輕松地跑3千公尺的地方開始吧！',
		[
			'鬆',
		],
	],

	[
		'前世自从上了中学后身高就停止长高了，',
		[
			'後',
		],
	],

	[
		'回头一看，呆头鹅桂木和一个中长发的梦幻般的女孩子站在那里裡。',
		[
			'髮',
		],
	],

	[
		'天鹅绒的盒子打开后，银色的心型珍珠项链像泪水一样从里裡溢出了。',
		[
			'後',
		],
	],

	[
		'那是米拉沉迷于安心呼吸面罩不能自拔的時候',
		[
			'於',
		],
	],

	[
		'還是想有空余走走',
		[
			'餘',
		],
	],

	[
		'原來如此啊。曾于救世之旅中同行的',
		[
			'於',
		],
	],

	[
		'于這個陰險者而言',
		[
			'於',
		],
	],

	[
		'勾划著軌跡再度襲來',
		[
			'劃',
		],
	],

	[
		'將某種傳令或指示傳達給科里登堡的命令書',
		[
			'里',
		],
	],

	[
		'不這麼做就無法向其他人起到示范作用',
		[
			'範',
		],
	],

	[
		'頭盔男拿起被紅色涂染的信',
		[
			'塗',
		],
	],

	[
		'以西北部的鄉村都市西弗魯・特里克薩為中心',
		[
			'里',
		],
	],

	[
		'現在雖然甘于騎士階級',
		[
			'於',
		],
	],

	[
		'于帕多利克家而言',
		[
			'於',
		],
	],

	[
		'艷麗的黑髮攏于腦後',
		[
			'於',
		],
	],

	[
		'在學院潛心于古今魔術的研究',
		[
			'於',
		],
	],

	[
		'這個世界上有為了一片面包出賣尊嚴的人',
		[
			'麵',
		],
	],

	[
		'所有的感情，就像要把脏腑翻過來一樣瘋狂著。',
		[
			'臟',
		],
	],

	[
		'這麼說著，青年指向了機庫里擺放著的',
		[
			'裡',
		],
	],

	[
		'莫希干的平泽',
		[
			'干',
		],
	],

	[
		'姐妹倆充分地理解了亮真发惱騷的理由。',
		[
			'發',
		],
	],

	[
		'一边吸着面条,一边偷偷互相使眼色的五人组。',
		[
			'麵',
		],
	],

	[
		'“就交给我吧。一发胜负!”',
		[
			'發',
		],
	],

	[
		'所以取出事先「收納」好的固體肥皂，在溫水里弄出泡沫',
		[
			'裡',
		],
	],

	[
		'嗅著鋪滿干稻草的地面四腳著地到處爬來爬去的少女',
		[
			'乾',
		],
	],

	[
		'他朝我遞出了一把傘和一片面包。',
		[
			'麵',
		],
	],

	[
		'啊啊，脏死了。',
		[
			'髒',
		],
	],

	[
		'如果在這裡因為猶豫而什麼都沒干的話',
		[
			'幹',
		],
	],

	[
		'娜莎在胸前用手比划著大致的大小',
		[
			'劃',
		],
	],

	[
		'要想出发的話需要等待十五天',
		[
			'發',
		],
	],

	[
		'這個老爺子，不管怎麼樣，老爺子的國家那邊關于【魔帝】【勇者】【大賢者】這些稱號出現的事毫無疑問是已經暴露了的樣子',
		[
			'於',
		],
	],

	[
		'精靈是存在于自然的生物',
		[
			'於',
		],
	],

	[
		'這讓貝魯发自內心笑了出來',
		[
			'發',
		],
	],

	[
		'「澤斯大人，關于剛才“回憶雙轉移”的條件，請用我的記憶交換吧」',
		[
			'於',
		],
	],

	[
		'所以最需要擔心的是每個村莊都儲存著的干木柴',
		[
			'乾',
		],
	],

	[
		'他有著長而美麗的披肩发',
		[
			'髮',
		],
	],

	[
		'都是发源自阿蒙諾爾黑山脈的融雪水',
		[
			'發',
		],
	],

	[
		'鞋里的泥很滑，我半摔的抓住了槍柄。',
		[
			'裡',
		],
	],

	[
		'這是今天的第二发，也就是最後一發了。',
		[
			'發',
		],
	],


	[
		'我也不會吝于給予幫助',
		[
			'於',
		],
	],

	[
		'只有鐵制小刀和布衣',
		[
			'製',
		],
	],

	[
		'而且食材都是新鮮現采',
		[
			'採',
		],
	],

	[
		'我們走了一小段后',
		[
			'後',
		],
	],

	[
		'我也非常喜欢纤细但不干瘪的双脚',
		[
			'乾',
		],
	],

	[
		'不知道這聲嘆息是為誰而发',
		[
			'發',
		],
	],

	[
		'必須用這過于強大的力量打倒魔神',
		[
			'於',
		],
	],

	[
		'但于討伐魔神之際',
		[
			'於',
		],
	],

	[
		'雖然我認為後者應該占多數',
		[
			'佔',
		],
	],

	[
		'魔物經過物競天擇后',
		[
			'後',
		],
	],

	[
		'但似乎亦適用于伊姆內几亞大陸。',
		[
			'於',
		],
	],

	[
		'消逝於夕陽余照空中的嘆息',
		[
			'餘',
		],
	],

	[
		'我發現那裡的人數遠多于其他集團',
		[
			'於',
		],
	],

	[
		'彌生身后的女孩也紛紛向芙蘭榭絲卡行禮。',
		[
			'後',
		],
	],

	[
		'每天都曝露于與死亡比鄰的危險之中',
		[
			'於',
		],
	],

	[
		'过于强劲的外挂能力也不是那么好用呢',
		[
			'於',
		],
	],

	[
		'而且魔族又因魔神被討伐而隠蔽于阿貝艾爾姆大陸',
		[
			'於',
		],
	],

	[
		'沉重的氣氛與空氣彷佛黏附于肌膚之上',
		[
			'於',
		],
	],

	[
		'她怀中抱着两个皮制水袋',
		[
			'製',
		],
	],

	[
		'向芙蘭榭絲卡謝過后',
		[
			'後',
		],
	],

	[
		'雖然略矮于周圍樹木',
		[
			'於',
		],
	],

	[
		'就像當年他佇足于緋色月夜中',
		[
			'於',
		],
	],

	[
		'倘若一對一戰斗',
		[
			'鬥',
		],
	],

	[
		'立刻就開始用手拍掉頭发或衣服上的泥',
		[
			'髮',
		],
	],

	[
		'在夢幻世界裡蹭得累什么的不要說啊',
		[
			'麼',
		],
	],

	[
		'臨近于持有『死之平原』名號的同魔神眷屬戰鬥的決戰場',
		[
			'於',
		],
	],

	[
		'由於訓練身體发漲',
		[
			'發',
		],
	],


	[
		'一边久久无法平复呼吸的凉音',
		[
			'復',
		],
	],

	[
		'平時都是買面包之類的在教室裡吃，但今天卻不能待在教室裡。',
		[
			'麵',
		],
	],

	[
		'「２８號，有里牡丹拒絕了！」',
		[
			'里',
		],
	],

	[
		'「沒准是那樣也說不定',
		[
			'準',
		],
	],

	[
		'腳上穿著系鞋帶的長靴。',
		[
			'繫',
		],
	],

	[
		'万一会突然变成敌人也说不准呢',
		[
			'準',
		],
	],

	[
		'鎮座著一個紅白涂裝的機械',
		[
			'塗',
		],
	],

	[
		'應該是被完全封印在保管庫里的',
		[
			'裡',
		],
	],

	[
		'魚如果干巴巴的',
		[
			'乾',
		],
	],

	[
		'密境中的魔物也還要看是什麼種類',
		[
			'秘',
		],
	],

	[
		'就像是嘗几滴水',
		[
			'幾',
		],
	],

	[
		'我不是會特意干那種事情的人',
		[
			'幹',
		],
	],

	[
		'而是聽命于艾登',
		[
			'於',
		],
	],

	[
		'可以給你发工資哦',
		[
			'發',
		],
	],

	[
		'「……都干到這種程度了，還是沒出現嗎」',
		[
			'幹',
		],
	],

	[
		'但也不必特別干涉',
		[
			'干',
		],
	],

	[
		'「但是，那只是一般的情況，其它殺死吸血鬼的辦法，也不是沒有」',
		[
			'只',
		],
	],

	[
		'那只會浪費時間吧',
		[
			'只',
		],
	],

	[
		'「不是碰脏了，而是弄壞了啊',
		[
			'髒',
		],
	],

	[
		'今天到傍晚为止都要在谷仓地带设置水车',
		[
			'穀',
		],
	],

	[
		'艾菈從沒聽人說過什麼關于一良身家背景的八卦。',
		[
			'於',
		],
	],

	[
		'沒有親人死于四年前為止的那場戰爭裡。',
		[
			'於',
		],
	],

	[
		'對于一良「為什麼你會想從軍呢？」的問題，哈伯的回答是「我有想保護的對象。」而那對象，指的一定是瑪麗吧。',
		[
			'於',
		],
	],

	[
		'「就算加入軍隊，也不等于能向攻擊你村子的那些人報仇哦？」',
		[
			'於',
		],
	],

	[
		'嘴里長著幾個牙，從邊上垂著口水。',
		[
			'裡',
		],
	],

	[
		'克莱伊・安德里希是一个奇才',
		[
			'里',
		],
	],

	[
		'是從葛利夏村的雜木林里面的另一個世界而來',
		[
			'裡',
		],
	],

	[
		'可注意不要采踏或者弄壊了',
		[
			'採',
		],
	],

	[
		'一邊觀察著烏里波的動作',
		[
			'里',
		],
	],

	[
		'抓住瑪麗后替她取下了釣鈎。',
		[
			'後',
		],
	],

	[
		'原本陆地的部分被冲刷后而溃决了',
		[
			'沖',
		],
	],

	[
		'請您于今後也務必給予多加關照',
		[
			'於',
		],
	],

	[
		'等到了早上燒些干木頭來製造個狼煙好了',
		[
			'乾',
		],
	],

	[
		'就有了尼貝爾閣下傾心于莉婕大人傳聞',
		[
			'於',
		],
	],

	[
		'薇蕾塔一個人的生命，對比几十萬几百萬的巴貝爾的人的性命的話',
		[
			'幾',
		],
	],

	[
		'就发明了製鐵的技術',
		[
			'發',
		],
	],

	[
		'之後將總結內容的筆記紙張交給了采礦工們的隊長',
		[
			'採',
		],
	],

	[
		'「没有能聊天的对象的话',
		[
			'象',
		],
	],

	[
		'「納爾森先生把王后和騎士吃了」',
		[
			'后',
		],
	],

	[
		'那是擁有幾倍于巴貝爾軍所使大型投石器破壊力與射程的恐怖兵器。',
		[
			'於',
		],
	],

	[
		'身著武具的市民們一臉慌張地從各個被征招的家舍跑出。',
		[
			'徵',
		],
	],

	[
		'由我來分发就行了。」',
		[
			'發',
		],
	],

	[
		'后尾的騎兵們也跟倒下的自軍衝撞，一個接一個地摔倒。',
		[
			'後',
		],
	],

	[
		'和她們聊過天后、心情好像稍微輕鬆些了。',
		[
			'後',
		],
	],

	[
		'「就是呢。明明諾爾桑那么可愛真是浪費呢」',
		[
			'麼',
		],
	],

	[
		'將一切托付于指尖。',
		[
			'於',
		],
	],

	[
		'可以吧這個涂在我的背上嗎？」',
		[
			'塗',
		],
	],

	[
		'「那麼就涂上去了哦」',
		[
			'塗',
		],
	],

	[
		'只有艾絲蒂爾還沒涂。',
		[
			'塗',
		],
	],

	[
		'往艾絲蒂爾的後背涂了上去。',
		[
			'塗',
		],
	],

	[
		'仿彿什麼都能製造出來......艾斯蒂爾連這樣的事也干了呢。。',
		[
			'幹',
		],
	],

	[
		'「你猜的很准啊，不愧是露娜老師！」',
		[
			'準',
		],
	],

	[
		'「就這樣讓他干看著，也說不去啊。大倉先生，這樣怎麼樣？」',
		[
			'乾',
		],
	],

	[
		'「光是鼓足干勁的話果然還是出不來啊」',
		[
			'幹',
		],
	],

	[
		'這次白干一場，總感覺好沒勁。',
		[
			'幹',
		],
	],

	[
		'突然間抬頭臉发白地看著我顫抖',
		[
			'發',
		],
	],

	[
		'跟本斯先生報告的時候',
		[
			'跟',
		],
	],

	[
		'在這一陣子里',
		[
			'裡',
		],
	],

	[
		'吃了這麼多发單发超過5000攻擊的攻擊的話',
		[
			'發',
		],
	],

	[
		'「關于利用御神體的任務，你們真的不知道嗎？」',
		[
			'於',
		],
	],

	[
		'“啊啊，是關于露娜她們的事吶”',
		[
			'於',
		],
	],

	[
		'已經見不到用土制作出的靶子的踪影了。',
		[
			'製',
		],
	],

	[
		'往後轉動頭部並割斷背後的人的頸部，然後進一步扎進來到旁邊的一名士兵',
		[
			'扎',
		],
	],

	[
		'“啊，我現在終于明白了，為何妮露公主會如此的害怕她。”',
		[
			'於',
		],
	],

	[
		'其象征，就是那個紅黑色的蝴蝶翅膀。',
		[
			'徵',
		],
	],

	[
		'完全是賽利斯專用的特制品了',
		[
			'製',
		],
	],

	[
		'认准了就绝不动摇，每天都满脑子希德的事情。',
		[
			'準',
		],
	],

	[
		'不仅那些经手咒物和禁制品等表面上不准交易的物品的暗之商人们无人不知',
		[
			'制',
		],
	],

	[
		'而僅僅只是模仿類似人的情感的仿制品',
		[
			'製',
		],
	],

	[
		'托里乌兹',
		[
			'里',
		],
	],

	[
		'父親給我发了嗎',
		[
			'發',
		],
	],

	[
		'喂不起的孩子被遣出去賣',
		[
			'餵',
		],
	],

	[
		'馬虎的发起兵糧飼草的採購及武器的護理等，也會產生各種各樣麻煩的費用。',
		[
			'發',
		],
	],

	[
		'會變成在本來就多的敵人里再加上宗教的困境',
		[
			'裡',
		],
	],

	[
		'「只要涂點唾液就能治療」這句話來反駁。',
		[
			'塗',
		],
	],

	[
		'要是一不小心把他們燒干的話',
		[
			'乾',
		],
	],

	[
		'莱纳斯只能干瞪着弟弟',
		[
			'乾',
		],
	],

	[
		'這個對國家屬于剛好達到平均線的地方都市',
		[
			'於',
		],
	],

	[
		'在突击的余势下',
		[
			'餘',
		],
	],

	[
		'「淡路，快回來！別在意，如果准心對了就是個好球！」',
		[
			'準',
		],
	],

	[
		'「這個數據庫里就連死亡和失踪的人都會記錄在內的',
		[
			'裡',
		],
	],

	[
		'說起來現在大概几點了',
		[
			'幾',
		],
	],

	[
		'而且连发型都恰好一样',
		[
			'髮',
		],
	],

	[
		'如果有定期往返于伊斯提利亞的運輸隊的話就好了」',
		[
			'於',
		],
	],

	[
		'柯爾茲與一良他們分別後，來到了作為集合場所的軍事區划內的訓練場。',
		[
			'劃',
		],
	],

	[
		'【嗯……叫干酵母、是嗎？原來有這麼方便的東西啊】',
		[
			'乾',
		],
	],

	[
		'哈維爾對于力保健的味道，看起來也感到意外。',
		[
			'於',
		],
	],

	[
		'一良打开布袋一看，里面是用附有银扣子的蓝布制作的手炼似的东西。',
		[
			'鍊',
		],
	],

	[
		'，想著這個就只能干著急',
		[
			'乾',
		],
	],

	[
		'，想着这个就只能干着急',
		[
			'乾',
		],
	],

	[
		'「请好好地系紧。如果这个掉到头上的话可不是开玩笑的」',
		[
			'繫',
		],
	],

	[
		'写完之后把纸贴在计划书的相应部分上影印复本，就是重复着这样的作业。',
		[
			'複',
		],
	],

	[
		'從剛才開始莉特就一邊发著火，一邊用胸部頂著我的後背。',
		[
			'發',
		],
	],

	[
		'「難道又是老樣子藏在了大自然的險要之地里？如果是這樣的話那就是南洋的海底或者是世界盡頭之壁了啊」',
		[
			'裡',
		],
	],

	[
		'只是抖动身体便把身上的水给甩干了',
		[
			'乾',
		],
	],

	[
		'紫色的及肩長髮似乎是真发',
		[
			'髮',
		],
	],

	[
		'她留著一頭染成亮色的中長卷发',
		[
			'髮',
		],
	],

	[
		'不過美咲丟出的骰子還真是神准呢。」',
		[
			'準',
		],
	],

	[
		'感覺就像是卡通里經常出現的雷射光呢',
		[
			'裡',
		],
	],

	[
		'──等到她們開始為我冲身體時',
		[
			'沖',
		],
	],

	[
		'附身于『珠洲菜』的『阿里阿德涅』恢復魔力',
		[
			'於',
		],
	],

	[
		'多菈米娜后脚跟深深地踏入地面',
		[
			'後',
		],
	],

	[
		'應該也有空余時間去觀賞賽莉娜想要看的眾花之海',
		[
			'餘',
		],
	],

	[
		'因我之思于古之同胞相比是為他物吶',
		[
			'於',
		],
	],

	[
		'于虛空之中扭動著巨體猛撲向己敵。',
		[
			'於',
		],
	],

	[
		'而于眨眼之間徹底腐化掉，松松垮垮地漸漸崩潰。',
		[
			'於',
		],
	],

	[
		'在一間于凝聚奢侈的城池之中也是屬於豪奢的',
		[
			'於',
		],
	],

	[
		'于悠久的歷史之中，斷然地阻止了入侵者通過的城門敞開',
		[
			'於',
		],
	],

	[
		'最后撒入大海之中让海水将之冲散',
		[
			'沖',
		],
	],

	[
		'「于夏季取涼是為不錯的技量吶」',
		[
			'於',
		],
	],

	[
		'若是于始祖六王之中最為心善的瓦爾丘里歐斯大人的血統的話',
		[
			'於',
		],
	],

	[
		'大小遠超標准馬車',
		[
			'準',
		],
	],

	[
		'此後有著余不死之生中最為盛大最為愉快之戰',
		[
			'余',
		],
	],

	[
		'在此戰之前就以爾之血潤余之喉',
		[
			'余',
		],
	],

	[
		'養余之精吧',
		[
			'余',
		],
	],

	[
		'汝似乎于如此年紀便以步入此域之中。太美妙了」',
		[
			'於',
		],
	],

	[
		'得于統合六家血脈，得到與始祖同等之血後才可以為我所用吶」',
		[
			'於',
		],
	],

	[
		'隨後便將那人類亦送于彼世。汝則先行於冥界候之即可！」',
		[
			'於',
		],
	],

	[
		'妾身也不會葬于爾手之中',
		[
			'於',
		],
	],

	[
		'只有被多蘭喂下了血液',
		[
			'餵',
		],
	],

	[
		'皇后伊莉莎白布殊离开后宫',
		[
			'后',
		],
	],

	[
		'准备颁布新政令。',
		[
			'佈',
		],
	],

	[
		'依依墟里烟',
		[
			'里',
		],
	],

	[
		'與平時不同的我，塔爾特顯出若干的膽怯。',
		[
			'干',
		],
	],

	[
		'如果迪亚能发动的话，可以专注于攻击。',
		[
			'於',
		],
	],

	[
		'我会专注于保护和培育。」',
		[
			'於',
		],
	],

	[
		'你好像在干很過分的事情啊',
		[
			'幹',
		],
	],

	[
		'一邊看著熟睡在沙发上的夏緹亞',
		[
			'發',
		],
	],

	[
		'的體格要塞進終極伊亞里面有點不太現實',
		[
			'裡',
		],
	],

	[
		'「双方准备好了吗？一那么，决赛开始〜！」',
		[
			'準',
		],
	],

	[
		'「哐当」，巨大物体相互碰撞的声音响震了背后',
		[
			'噹',
		],
	],

	[
		'──兰的技能的副作用是『困睡感』',
		[
			'睏',
		],
	],

	[
		'铃城惊讶的回复道',
		[
			'覆',
		],
	],

	[
		'万里无云的美丽晴空。',
		[
			'雲',
		],
	],

	[
		'不占優勢才比較奇怪。',
		[
			'佔',
		],
	],

	[
		'根據天照所制定的對神的約束中',
		[
			'制',
		],
	],

	[
		'小聲喃喃后，雪野像是沉思一樣',
		[
			'後',
		],
	],

	[
		'對冬野的話一笑置之后，鶫像是要轉換心情一樣，再次開口道',
		[
			'後',
		],
	],

	[
		'露比和亞澤麗雅瞧准時機跳上去。',
		[
			'準',
		],
	],

	[
		'「再次見面，我是王立格蘭菲爾特特級魔法學院院長，特蕾西亞．蒙佩里耶。',
		[
			'里',
		],
	],

	[
		'卡拉面帶平靜的笑容說著。',
		[
			'面',
		],
	],

	[
		'「难道是『斗气功』？不会吧，它在那瞬间强化了身体来保护自己吗！」',
		[
			'鬪',
		],
	],

	[
		'迪歐发自靈魂深處的吶喊。',
		[
			'發',
		],
	],

	[
		'庫洛伊薩斯變成了金色直发、眼睛細長冷艷的知性美女',
		[
			'髮',
		],
	],

	[
		'，我要成功干下這一票，買可愛的衣服給她。」',
		[
			'幹',
		],
	],

	[
		'「現，現在是，哪年哪月幾點几分⋯⋯！？」',
		[
			'幾分',
		],
	],

	[
		'我向度過了十几億年的場所道別。',
		[
			'幾',
		],
	],

	[
		'「喂。咋了，你這反抗的眼神？想和我干一架嗎？」',
		[
			'幹',
		],
	],

	[
		'发不出聲',
		[
			'發',
		],
	],

	[
		'但我還是集中精力于做自己該做的事',
		[
			'於',
		],
	],

	[
		'我姑且擦干了她们的身子',
		[
			'乾',
		],
	],

	[
		'不過琳卻是一臉自己成功蒙混過去了的，劫后余生的表情，想認真愚蠢。拜託你了，別再說話了。',
		[
			'後餘',
		],
	],

	[
		'在我向他表達了我那深深的感謝之情后',
		[
			'後',
		],
	],

	[
		'「拉絲緹婭拉！那個是涂了毒的，小心應付！」',
		[
			'塗',
		],
	],

	[
		'拉古涅才會將那些問題投諸于我。',
		[
			'於',
		],
	],

	[
		'，而是應當存在于更加更加遙遠的地方的，他的聲音。',
		[
			'於',
		],
	],

	[
		'因為于曾經的海莉而言',
		[
			'於',
		],
	],

	[
		'「這、這個⋯⋯我經常注視、經常考慮里埃爾少爺的事情⋯⋯只是如此。」',
		[
			'里',
		],
	],

	[
		'几年來的修練賦予了他這麼做的實力和自負。無論這周邊出現了怎樣的怪物，他都可以自行解決。',
		[
			'幾',
		],
	],

	[
		'可是，立于當今世界頂點的『元老院』卻對他感・到・了・恐・懼。',
		[
			'於',
		],
	],

	[
		'我惜敗于『舞闘大會』的準決賽。',
		[
			'於',
		],
	],

	[
		'紋章教徒的軍勢，絕不遜色于衛兵團半分',
		[
			'於',
		],
	],

	[
		'嘴干了，连唾液都不再产生，身体像被冻住了一样动弹不得。',
		[
			'乾',
		],
	],

	[
		'就算你不想卷进来',
		[
			'捲',
		],
	],

	[
		'真不愧是我干出來的事。',
		[
			'幹',
		],
	],

	[
		'发出問題的精靈',
		[
			'發',
		],
	],

	[
		'把這句話直截了當地說出來。那對于瑪蒂婭來說也是意外的話。',
		[
			'於',
		],
	],

	[
		'座于芬之寶座之人',
		[
			'於',
		],
	],

	[
		'決不能讓路易斯止步于鉛',
		[
			'於',
		],
	],

	[
		'需要護衛的商人全都投身于貝爾菲因。',
		[
			'於',
		],
	],

	[
		'牙齒要被咬碎了，心臟像被扎了好几針似地疼痛著。',
		[
			'幾',
		],
	],

	[
		'那對于阿琉珥娜來說是救贖的象徵。',
		[
			'於',
		],
	],

	[
		'塵土飛揚于薇斯塔莉努和劍士之間。',
		[
			'於',
		],
	],

	[
		'鼻子发酸了。',
		[
			'發',
		],
	],

	[
		'聖女瑪蒂婭的頭髮因汗水貼在臉頰上。一邊嘆氣，一邊喝了几口水。',
		[
			'幾',
		],
	],

	[
		'嗓子太干了。',
		[
			'乾',
		],
	],

	[
		'向敵人陣地发起急襲，不需要與本軍步調一致。”',
		[
			'發',
		],
	],

	[
		'現在已經不滿足于僅僅的展露獠牙',
		[
			'於',
		],
	],

	[
		'几瞬間，布璐妲終於恢復了思考，潤濕了嘴唇。',
		[
			'幾',
		],
	],

	[
		'在烙印于焦躁的心中',
		[
			'於',
		],
	],

	[
		'“发火花了很長時間呢。你的身體有什麼在守護著呢？”',
		[
			'發',
		],
	],

	[
		'　然而意外的是，百合並沒有責怪我。',
		[
			'並',
		],
	],

	[
		'于迪恩那多王国邊境的某地，一名虎背熊腰的男人正獨自一人地踱步著。',
		[
			'於',
		],
	],

	[
		'某些大商人還會將其剝制成標本用於裝飾，因此價格相當地高昂。',
		[
			'製',
		],
	],

	[
		'那令人毛骨悚然的插圖感覺就像是亂涂出來的',
		[
			'塗',
		],
	],

	[
		'收集家打开被绷带复盖的嘴',
		[
			'覆',
		],
	],

	[
		'說著，他向我空虛地拍了几下手。',
		[
			'幾',
		],
	],

	[
		'有黑色的光缐卷绕着吧',
		[
			'捲',
		],

	],

	[
		'以及兩发亞貝魯球的互角',
		[
			'發',
		],

	],

	[
		'五條具象為龍的土塊從海底里飛出，襲向庫多爾。',
		[
			'裡',
		],
	],

	[
		'把你剛才解析的結果用『記憶轉寫』发送給我吧」',
		[
			'發',
		],
	],

	[
		'大邪神庫多爾為阻止余之復活，必然會挑起戰爭』',
		[
			'余',
		],
	],

	[
		'雖然余有所關照並給予魔力',
		[
			'余',
		],
	],

	[
		'汝可別給余難看』',
		[
			'余',
		],
	],

	[
		'要消滅庫多爾的不單是余',
		[
			'余',
		],
	],

	[
		'多姆族发紅眼地追尋被趕出村落的梅婭的理由我無從得知。',
		[
			'發',
		],
	],

	[
		'還有就是給在余面前裝模作樣的伯爵施予顏色，和讓沉眠的凶神庫多爾永遠沉眠』',
		[
			'余',
		],
	],

	[
		'那傢伙奪走了余的一隻手',
		[
			'余',
		],
	],

	[
		'但是，請容屬下斗膽一言',
		[
			'斗',
		],
	],

	[
		'「這個男人⋯⋯馬里維爾！？怎麼會，那傢伙應該是其他危險教派的頭領才對。難不成，那個男人依附了薩戴利亞的教派⋯⋯」',
		[
			'里',
		],
	],

	[
		'多給了店主一筆小費后，我們離開了酒館',
		[
			'後',
		],
	],

	[
		'「唔⋯⋯于南天邊境尋光⋯⋯發行・輝石龕燈！」',
		[
			'於',
		],
	],

	[
		'好處就在于只要咏唱一次就可以不必再次咏唱；但要維持機能，就必須持續對魔力回路灌注魔素。',
		[
			'於',
		],
	],

	[
		'沒有了《書》這種魔法发唱體的輔助，就無法使用咏唱魔法！你是無法貫穿我的障壁的！」',
		[
			'發',
		],
	],

	[
		'把我的胰脏还给我！」',
		[
			'臟',
		],
	],

	[
		'沒錯，你發過誓。對于五年前的十月十六日，親眼見到父親受傷卻無能為力的自己，你立下了誓言。',
		[
			'於',
		],
	],

	[
		'「豈料偉大博士亦或吸血鬼真祖會于奧月綜嗣心中刻劃記憶，',
		[
			'於',
		],
	],

	[
		'以筆墨涂改書頁，一張一張撕裂成碎紙，葬送於黑暗迷宮中！那虛假真祖的記憶已然從本魔王心中徹底清除！」',
		[
			'塗',
		],
	],

	[
		'「還想繼續追逐妾身嗎！那麼准備受死吧，奧月綜嗣！▓▓▓▓▓▓▓▓！」',
		[
			'準',
		],
	],

	[
		'攻击的质量明明是我占上风，却因为吸血鬼的纯粹能力差距而僵持不下。',
		[
			'佔',
		],
	],

	[
		'〈呵呵呵呵，與亞人為伍的人類有几兆死傷都不足惜',
		[
			'幾',
		],
	],

	[
		'五年前，偉大博士在將死之時刻划在我心中的──',
		[
			'劃',
		],
	],

	[
		'就是由現在委身于春雪右臂的楓子，為他開啟了第一扇門。',
		[
			'於',
		],
	],

	[
		'红之王同意合并军团',
		[
			'併',
		],
	],

	[
		'震蕩宇宙的團員名單发下來之後',
		[
			'發',
		],
	],

	[
		'昨天為了因應領土戰爭而緊急发下來的震蕩宇宙所有團員名單上',
		[
			'發',
		],
	],

	[
		'莟把視線從不发一語的春雪移回黑雪公主身上，繼續剛才的說明：',
		[
			'發',
		],
	],

	[
		'——的確，惠經常從學生會室的沙发椅上望著中庭',
		[
			'發',
		],
	],

	[
		'「呃……那，我发個郵件看看。」',
		[
			'發',
		],
	],

	[
		'「嗯……在這之前，我可以先洗個頭发嗎？謝謝你幫我洗背，你回去浴盆泡暖點吧。」',
		[
			'髮',
		],
	],

	[
		'因為食用櫻桃的種子发芽率很差……',
		[
			'發',
		],
	],

	[
		'她雙手理了理一頭長直发',
		[
			'髮',
		],
	],

	[
		'春雪歪了歪頭，但拓武與Lead同時发喊。',
		[
			'發',
		],
	],

	[
		'同樣搖晃著臉色发綠的臉孔',
		[
			'發',
		],
	],

	[
		'他以右手劍把第一发彈向上空。',
		[
			'發',
		],
	],

	[
		'隨即給正在社團活動的倉島千百合发去『我先去探望拓武了』的郵件',
		[
			'發',
		],
	],

	[
		'是发自黑雪公主之口。',
		[
			'發',
		],
	],

	[
		'他右手的黑色長劍发出血紅光芒。',
		[
			'發',
		],
	],

	[
		'就只有圓形的发泡微粒坐墊',
		[
			'發',
		],
	],

	[
		'如果能美发射雷射',
		[
			'發',
		],
	],

	[
		'Current一點頭，從頭部後側像兩條发辮般流動的水就跟著搖動。',
		[
			'髮',
		],
	],

	[
		'如果能美发射雷射',
		[
			'發',
		],
	],

	[
		'極富空氣感的卷俏頭发在朝陽照耀下透出咖啡色的光輝。',
		[
			'髮',
		],
	],

	[
		'一對鏡頭眼发出清透的粉紅色。',
		[
			'發',
		],
	],

	[
		'但由於昨天发回來的期末考考卷',
		[
			'發',
		],
	],

	[
		'再不然就是兩只眼睛发個金光吧。',
		[
			'發',
		],
	],

	[
		'以大件毛巾披在及肩頭发上走出來的倉嶋千百合',
		[
			'髮',
		],
	],

	[
		'，更是透過跳動頻率來決定思考驅動速度的基礎時脈发生器。」',
		[
			'發',
		],
	],

	[
		'，它在可穿戴式虛擬實境器材发展史上只存在過一段短暫的時間，',
		[
			'發',
		],
	],

	[
		'一頭長直发緊貼的雪白臉孔美得無可挑剔',
		[
			'髮',
		],
	],

	[
		'，發泄今天一整天無處可发的郁悶。',
		[
			'發',
		],
	],

	[
		'发郵件聯絡Griphite Edge',
		[
			'發',
		],
	],

	[
		'比賽由敵人從底線发球開始',
		[
			'發',
		],
	],

	[
		'戴因发一聲喊',
		[
			'發',
		],
	],

	[
		'「今天导师时间发的学年行事历档案里头不就有写吗',
		[
			'曆',
		],
	],

	[
		'挨了多少发虛擬槍彈',
		[
			'發',
		],
	],



	[
		'既然這樣，家人對于惠二十四小時以上都不醒的理由',
		[
			'於',
		],
	],

	[
		'现在春雪知道这段发书包着一层多么巨大的欺瞒',
		[
			'發',
		],
	],

	[
		'由于六发光束的軌道自始至終沒有任何一瞬間重迭',
		[
			'於',
			'發',
		],
	],

	[
		'一名女性作遊戲人物打扮在发投影傳單',
		[
			'發',
		],
	],

	[
		'這似乎是发動用的關鍵字',
		[
			'發',
		],
	],

	[
		'是发自自己的內在',
		[
			'發',
		],
	],

	[
		'從追踪不能的发信源獲得客戶端軟件包的孩子約有百人',
		[
			'發',
		],
	],

	[
		'非得迅速查出发布者不可……」',
		[
			'發',
		],
	],

	[
		'小幸二話不說就核发了來賓用的一日通行證給我。」',
		[
			'發',
		],
	],

	[
		'接著他戰戰兢兢地发問',
		[
			'發',
		],
	],

	[
		'“系統有发觀戰用的輸送卡。”',
		[
			'發',
		],
	],

	[
		'代替发不出聲的春雪',
		[
			'發',
		],
	],

	[
		'搭配发出清涼水藍色光芒的鏡頭眼',
		[
			'發',
		],
	],

	[
		'劍與盾的接觸點发生了一股純粹而且龐大的能量',
		[
			'發',
		],
	],

	[
		'看來是劈頭就被大招六連发打得體力計量表整整被削掉一大段',
		[
			'發',
		],
	],

	[
		'第一發命中第一校舍，另一发則命中第二校舍的牆壁。',
		[
			'另一發',
		],
	],

	[
		'春雪才發現叫聲是发自站在他身旁的黑雪公主。',
		[
			'發',
		],
	],

	[
		'一整天做出发的準備、隔天早上、一行人從迷宮都市出發了。',
		[
			'發',
		],
	],

	[
		'「今天导师时间发的学年行事历档案里头不就有写吗',
		[
			'發',
		]
	],

	[
		'則在接到春雪发的郵件後給出了這樣的回答——「我在屋頂」',
		[
			'發',
		]
	],

	[
		'拓武一接到隊友发的界外球',
		[
			'發',
		]
	],

	[
		'既然不是老師发的',
		[
			'發',
		],
	],

	[
		'儘管如此，在車庫里出現地下城，機率都跟中頭彩差不多了吧⋯⋯⋯',
		[
			'裡',
		],
	],

	[
		'武器防具也很齊全。也有像秘銀和奧里哈魯根那樣難得一見的東西啊。」',
		[
			'里',
		],
	],

	[
		'無人不知一菱製作所的『壹』『壱』『一』系列。',
		[
			'壹',
			'壱',
			'一',
		],
	],

	[
		'（拜其所賜，晴輝為了发電板不被偷走，只能強化安全設施）',
		[
			'發',
		],
	],

	[
		'但是发彈超過４０時，是沒子彈了嗎',
		[
			'發',
		],
	],

	[
		'麻里子在恰到好处的温度时一口气就喝干了',
		[
			'乾',
		],
	],

	[
		'她一口氣喝干了整杯',
		[
			'乾',
		],
	],

	[
		'看到米兰达后睁大了眼睛',
		[
			'後',
		],
	],

	[
		'說道這里伊莉閉上了嘴。',
		[
			'裡',
		],
	],

	[
		'說到這里伊莉閉上了嘴。',
		[
			'裡',
		],
	],

	[
		'之後在麻里子殿的金錢富餘后再去重新尋找會比較好」',
		[
			'後',
		],
	],

	[
		'麻里子腦海中浮現出的正是之前聯想到的牛肉干的製作方法',
		[
			'乾',
		],
	],

	[
		'要凃掉。',
		[
			'塗',
		],
	],

	[
		'每天往返于傑克所在的監獄之間。',
		[
			'於',
		],
	],

	[
		'至于奈茲，沒有人誤會他與密雷迪的關係……',
		[
			'於',
		],
	],

	[
		'黑衣人用脚往米凯拉的腹部一踢，借势避开大剑的一击。米凯拉冲撞在墙上，口吐鲜血，似乎伤到内脏了。',
		[
			'臟',
		],
	],

	[
		'他將身體靠在稍遠處的粗大樹干上',
		[
			'幹',
		],
	],

	[
		'對于越過巴特拉姆攻來的灰衣人們',
		[
			'於',
		],
	],

	[
		'心醉于莉莉斯的第二軍軍團長史特拉斯•馬其力昂雙眉憤怒地往上吊起。',
		[
			'於',
		],
	],

	[
		'或許他的行為就像在愧于自己的信仰不足',
		[
			'於',
		],
	],

	[
		'接下來的几年間',
		[
			'幾',
		],
	],

	[
		'把一部分頭发綁成辮子',
		[
			'髮',
		],
	],

	[
		'不對，自己是在那一瞬間失去了意識──于半空中飛舞的她理解到了這一點。',
		[
			'於',
		],
	],

	[
		'一切都歸功于梅兒女王',
		[
			'於',
		],
	],

	[
		'阿一並沒有回答',
		[
			'並',
		],
	],

	[
		'身體的線條非常富于起伏',
		[
			'於',
		],
	],

	[
		'但是和外表的虛幻相反的這個叫做高雅什么的超越次元的傲慢',
		[
			'麼',
		],
	],

	[
		'「夏烏菈！ 趁余不注意又找男人碴兒啊！？你這個蠢貨！ 真不害臊！」',
		[
			'余',
		],
	],

	[
		'「欸誒給余分開，你這個痴女！！」',
		[
			'余',
		],
	],

	[
		'「但是，請看在余的面子上原諒她」',
		[
			'余',
		],
	],

	[
		'「咳……余的部下太失禮了。」',
		[
			'余',
		],
	],

	[
		'「呋姆，是嗎？ 余不覺得這是在余玩弄夏烏菈的時候愉快地眺望著的男人會說的話」',
		[
			'余',
		],
	],

	[
		'我一邊耽于感慨',
		[
			'於',
		],
	],

	[
		'即使坐在王座上也無事可干。',
		[
			'幹',
		],
	],

	[
		'儘管如此還是不放棄地斬上各部分后',
		[
			'後',
		],
	],

	[
		'還不失年輕的那張臉近于無表情',
		[
			'於',
		],
	],

	[
		'那是Ａ級同時也持有二名的冒険者，冰帝克麗絲塔・尼潔・布蘭里赫特的隊伍。',
		[
			'里',
		],
	],

	[
		'那樣发聲道。',
		[
			'發',
		],
	],

];

/**
 * 分析轉換後不應該具有以下字詞
 */
export const tests_lazy_indexof_not: [string, Parameters<typeof lazyMatchSynonym001Not>['1'], Parameters<typeof lazyMatchSynonym001Not>['2']?][] = [

	[
		'那是里靈魂的世界。',
		[
			'裡',
		],
	],

];

sortTests(tests_lazy_base);
sortTests(tests_lazy_base_not);
sortTests(tests_lazy_array);
sortTests(tests_lazy_indexof);
sortTests(tests_lazy_indexof_not);

export default exports as typeof import('./lazy.index');
