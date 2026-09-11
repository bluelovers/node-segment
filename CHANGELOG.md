# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.7.123](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.122...novel-segment@2.7.123) (2026-09-11)



### 🐛　Bug Fixes

* **dict:** 更新詞典數據與新增測試案例 ([8382ba3](https://github.com/bluelovers/ws-segment/commit/8382ba3e64e20d83e181b7a77a0340bdc48d827b))
* **dict:** 更新詞典數據與新增測試案例 ([31eaeb4](https://github.com/bluelovers/ws-segment/commit/31eaeb4cdaf32ae9b3a17fc8c89a4b5cf3786cb7))


### 📦　Code Refactoring

* **novel-segment:** 優化程式碼結構與類型定義 ([d49c44c](https://github.com/bluelovers/ws-segment/commit/d49c44c965afaf2fc908fd1055f0a1f418c14753))


### ♻️　Chores

* save repo before new version ([4fedc94](https://github.com/bluelovers/ws-segment/commit/4fedc9459db5cd201a8e01ef53bc521563022373))
* save repo before new version ([8f7e8fc](https://github.com/bluelovers/ws-segment/commit/8f7e8fcd8daf3309183a88f773635db8b6021841))



## [2.7.122](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.121...novel-segment@2.7.122) (2026-09-08)


### FIXME

* **dict:** 新增測試案例涵蓋「假使于蕾亞」、「由于韋恩」、「誕生于里伯」等情境



### 🐛　Bug Fixes

* **dict:** 修正「于」字在特定語境下的斷詞問題 ([7b81623](https://github.com/bluelovers/ws-segment/commit/7b816237f4a3b4a097b1af5fbbafb9105d059a19))
* **dict:** fix `管子里塞了像是布片的東西` ([aa52dd4](https://github.com/bluelovers/ws-segment/commit/aa52dd4e755ac2eef2cbe084f783e10e379c3717))
* **novel-segment:** 修正 MCP Server 配置使用 ts-node 執行 ([c00ccc9](https://github.com/bluelovers/ws-segment/commit/c00ccc9667efbf18779ba6d9597ce7a312aec41c))
* **novel-segment:** 添加「采」字同義詞字典與測試案例 ([57b8a0b](https://github.com/bluelovers/ws-segment/commit/57b8a0bcc8fdd134f265d2812e06e6dc2fa21908))
* **novel-segment:** 添加自定义忽略模式选项 & 防止读取 README.md ([a580dd2](https://github.com/bluelovers/ws-segment/commit/a580dd20a43f45b420dd9bd8dd608c031ca2f912))
* **segment-dict:** 新增「填彈」「荷蘭」「里茨」「澈底」詞條與對應測試案例 ([899a6bd](https://github.com/bluelovers/ws-segment/commit/899a6bdba7c00bd0b63263aeefe46bac6a33447d))
* **segment-dict:** 新增「里夫」名稱詞條與對應測試案例 ([48b63ea](https://github.com/bluelovers/ws-segment/commit/48b63ea9629d64bab3533d9c37bc45f16d179e0e))
* **segment-dict:** 新增「攻佔了」同義詞對應與測試案例 ([36cfceb](https://github.com/bluelovers/ws-segment/commit/36cfceb21f7180e7a344e9d4f0f1009d0077ba59))
* **segment-dict:** fix `我要擊发比較大的魔法`, `讓她處于天然` ([d158a86](https://github.com/bluelovers/ws-segment/commit/d158a8620967567641bf3f9c36642d0c854914c3))
* **segment-dict:** 添加“佔有的”词条及同义词映射 ([fd9c786](https://github.com/bluelovers/ws-segment/commit/fd9c7866f6a7631473140a3efa6aa45fcc83624a))


### ✨　Features

* **@novel-segment/assert:** 新增 notThrowError 選項支援回傳匹配結果 ([4b2f826](https://github.com/bluelovers/ws-segment/commit/4b2f826b02383de4c25f9ab532db0728632777e7))
* **novel-segment:** 新增 MCP Server 支援 AI 助手呼叫分詞功能 ([5808dec](https://github.com/bluelovers/ws-segment/commit/5808dec2cffce0edb2fa5d933dd18cee0355615f))
* **novel-segment:** 擴充 CLI 工具支援多種匹配模式與設定檔載入 ([5b999d6](https://github.com/bluelovers/ws-segment/commit/5b999d61a804e8ae478ab34550b5252df4c247e4))
* **novel-segment:** 新增 CLI 工具供 AI agent 自動化分詞測試使用 ([66a9ed8](https://github.com/bluelovers/ws-segment/commit/66a9ed87840614b3609428dc003c4f4b1a04bbab))


### 📦　Code Refactoring

* **core:** 優化 TypeScript 類型宣告與模組導入方式 ([f1ef911](https://github.com/bluelovers/ws-segment/commit/f1ef911e1e0de1faecbb3d7604f8942cc476584a))
* **novel-segment:** 重构缓存测试模块并新增钩子系统 ([114f2b3](https://github.com/bluelovers/ws-segment/commit/114f2b3dc2895effee8a3a9517a4399bab0a7e0c))


### 📚　Documentation

* 將「停用詞」術語統一更新為「分隔詞」並新增專案規範文件 ([63f285d](https://github.com/bluelovers/ws-segment/commit/63f285dc5399afbfbb417c43b7404bd58da3de6b))
* **novel-segment:** 為 Segment 主類別添加完整的中英雙語 JSDoc 文檔註釋 ([3f7b7ea](https://github.com/bluelovers/ws-segment/commit/3f7b7eaf1331a0833de38d90d696ca6bb04d547c))
* **novel-segment:** 為 novel-segment 套件的核心模組添加完整的中英雙語 JSDoc 文檔註釋 ([d1bef67](https://github.com/bluelovers/ws-segment/commit/d1bef67759d95f2db9a00fdf714740446a54300c))
* **novel-segment:** 添加子模块索引文档 ([9029e7b](https://github.com/bluelovers/ws-segment/commit/9029e7b4c32ed42520ecb82513bd5d407745c4b2))
* **novel-segment:** 为多个分词器模块添加完整的 JSDoc 文档 ([9d2b7ea](https://github.com/bluelovers/ws-segment/commit/9d2b7ea7250dc48550f52650e397cf6aa85ae655))
* **novel-segment:** 为 ChsNameTokenizer 添加完整的 JSDoc 文档 ([4527f8a](https://github.com/bluelovers/ws-segment/commit/4527f8ac55611ef76de9dfa652d4c1d0c2a8ef5d))
* **novel-segment:** 为 ChsNameOptimizer 添加完整的 JSDoc 文档 ([32f5d4c](https://github.com/bluelovers/ws-segment/commit/32f5d4c6e8d9e25b2c57694e081312f234ad4006))
* **novel-segment:** 为 DatetimeOptimizer 添加完整的 JSDoc 文档 ([0c16fae](https://github.com/bluelovers/ws-segment/commit/0c16faed67d87f49dd9f5b93d7b61bc285dbebe1))
* **novel-segment:** 为 DictOptimizer 和 DictTokenizer 添加完整的 JSDoc 文档 ([19253d5](https://github.com/bluelovers/ws-segment/commit/19253d53f8f7bf1863fcc5209028963db818a25e))
* **novel-segment:** 为 JpSimpleTokenizer 添加完整的 JSDoc 文档 ([e515571](https://github.com/bluelovers/ws-segment/commit/e5155717323114e9aeae38e795cf00090dfb8586))
* **novel-segment:** 为 ForeignTokenizer 添加完整的 JSDoc 文档 ([dda6575](https://github.com/bluelovers/ws-segment/commit/dda6575fc891ced34a21fafdc034e2e9a370a4ce))
* **novel-segment:** 为 PunctuationTokenizer 添加完整的 JSDoc 文档 ([8dcac8b](https://github.com/bluelovers/ws-segment/commit/8dcac8ba53fccc2ff018f44d5b09a4124aa33b16))
* **novel-segment:** 为 ZhtSynonymOptimizer 添加完整的 JSDoc 文档 ([288595a](https://github.com/bluelovers/ws-segment/commit/288595adae2caa81e2484bcd9e5af0f5e3d5b35e))
* **novel-segment:** 为模块文件添加 JSDoc 文档 ([421ab03](https://github.com/bluelovers/ws-segment/commit/421ab0346bcf4169f85790d028ab7353ab28a7b1))
* **novel-segment:** 添加测试目录 README 文档 ([574085b](https://github.com/bluelovers/ws-segment/commit/574085bbd1e1fd559f7314e5869545629090b57b))


### 🚨　Tests

* **mocha:** 鎖定 mocha 版本 ([9c35f75](https://github.com/bluelovers/ws-segment/commit/9c35f75013412635386d34212b2dd7daa59aff4e))
* **novel-segment:** 註解 .mocharc.yml 中的 require 設定 ([51cbeee](https://github.com/bluelovers/ws-segment/commit/51cbeeeb918b470133cf41b24fee06e51a520dc9))
* **novel-segment:** 改善測試檔案的 JSDoc 文檔 ([ca918e2](https://github.com/bluelovers/ws-segment/commit/ca918e27a295b88a711ee5f8f2ecf15936da125a))
* **novel-segment:** 新增測試檔案類型與執行方式說明 ([1c70f80](https://github.com/bluelovers/ws-segment/commit/1c70f8059a4389f1d0bba5b32ee3b0e30bc9647b))
* **novel-segment:** 添加“發配”分词测试用例及分词字典 ([f3aadb2](https://github.com/bluelovers/ws-segment/commit/f3aadb27596e7c11fdc9515d252856cd39a7addb))
* **novel-segment:** 重构缓存测试文件结构 ([3b5a3db](https://github.com/bluelovers/ws-segment/commit/3b5a3db3835ecd2c6c572c85929a5803aeb29941))


### 🛠　Build System

* **@novel-segment/assert:** refactor lazyMatch and add Chinese char conversions ([4d95315](https://github.com/bluelovers/ws-segment/commit/4d95315ddbe73c82306010b08c6cb3aecfc0f845))
* **novel-segment:** 為 Segment 主類別與 fs/get 模組新增 ignore 選項。 ([f0cacdd](https://github.com/bluelovers/ws-segment/commit/f0cacddd29fbfec5c31d2fad4561eb74ffa555a7))
* **novel-segment:** 提取颜色数据至独立模块并添加 JSDoc 文档 ([cbcfdaf](https://github.com/bluelovers/ws-segment/commit/cbcfdafbacce9c3300890fdeb54a6839f9f53d3c))
* **test:** 全域更新 Jest 配置與測試環境支援 ([1d67399](https://github.com/bluelovers/ws-segment/commit/1d67399deb009b9ca9a8e394112e95c41752c1a4))


### ♻️　Chores

* save repo before new version ([ea6e52b](https://github.com/bluelovers/ws-segment/commit/ea6e52bbe0c06aaf5d943cfb890c6da3c59eb004))
* **config:** 優化 monorepo 工作區配置與 pnpm 管理設定 ([fc3745f](https://github.com/bluelovers/ws-segment/commit/fc3745f10bc7b8da55261ca4e3bcf37ad5ceb89f))
* **deps:** 升級多個依賴套件版本並改善測試文檔 ([a144f12](https://github.com/bluelovers/ws-segment/commit/a144f128ca9a229053287e3aa1d2a3b600531fd4))
* **dict:** 新增「滑膛槍」詞彙至懶加載字典 ([0d4713e](https://github.com/bluelovers/ws-segment/commit/0d4713e0c8168ec561e3750be878585862b2c3b6))



## [2.7.121](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.120...novel-segment@2.7.121) (2024-11-09)



### 🔖　Miscellaneous

* . ([778368f](https://github.com/bluelovers/ws-segment/commit/778368fddef72fe43b0434d003e3a9b52bb3cf5f))



## [2.7.120](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.119...novel-segment@2.7.120) (2024-11-09)



### 🐛　Bug Fixes

* avoid bug ([56dec82](https://github.com/bluelovers/ws-segment/commit/56dec823c94de958e26b29d3564db553984984b0))


### 📌　Dependencies

* update deps ([8d057a4](https://github.com/bluelovers/ws-segment/commit/8d057a434616e34a9b2f04a5898618b860e10bf9))



## [2.7.119](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.118...novel-segment@2.7.119) (2024-07-07)



### 🐛　Bug Fixes

* **dict:** 使用合並拉入 {0} ([84e1ad8](https://github.com/bluelovers/ws-segment/commit/84e1ad8536feeb6b9c30b97956ab0df79c4e53fa))


### 🚨　Tests

* update test ([26ce6fc](https://github.com/bluelovers/ws-segment/commit/26ce6fcaa50394aa19d76141eaa4bd12fa8660b7))



## [2.7.118](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.117...novel-segment@2.7.118) (2024-05-03)



### ♻️　Chores

* save repo before new version ([e1b2fc7](https://github.com/bluelovers/ws-segment/commit/e1b2fc77201469037d92678533e2fadfc5930cdd))



## [2.7.117](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.116...novel-segment@2.7.117) (2024-05-03)



### 🛠　Build System

* update typescript ([d3518d1](https://github.com/bluelovers/ws-segment/commit/d3518d12f74b1087316052b1d904585883c966c7))


### 📌　Dependencies

* update deps ([981cd61](https://github.com/bluelovers/ws-segment/commit/981cd61436c85252da318197150de79dd78b0d43))


### 🔖　Miscellaneous

* . ([8da1fc8](https://github.com/bluelovers/ws-segment/commit/8da1fc857e9ca7beb3c0becf4128ed5dac48a2be))
* . ([1302f5c](https://github.com/bluelovers/ws-segment/commit/1302f5c16ef9b0a5f68c59bde38506896144f962))



## [2.7.116](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.115...novel-segment@2.7.116) (2024-01-03)



### 📦　Code Refactoring

* cjk-conv ([ab64f1b](https://github.com/bluelovers/ws-segment/commit/ab64f1b84e78cadf2c9db41ed5c2792754a85ef9))


### 🔖　Miscellaneous

* . ([50a88e1](https://github.com/bluelovers/ws-segment/commit/50a88e14a5151bd0aa6486e95a452142dcbfdf6c))



## [2.7.115](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.114...novel-segment@2.7.115) (2023-12-25)



### 🔖　Miscellaneous

* . ([9c3ebc7](https://github.com/bluelovers/ws-segment/commit/9c3ebc7a905086e87e89f7fa5e9dda60b7bb1b24))



## [2.7.114](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.113...novel-segment@2.7.114) (2023-11-23)



### 🐛　Bug Fixes

* **deps:** update deps ([74e9e7e](https://github.com/bluelovers/ws-segment/commit/74e9e7e67c9958042d83f136c374df508a955fab))


### 🚨　Tests

* update test ([c617973](https://github.com/bluelovers/ws-segment/commit/c6179737fe3fc57acbae7faf6b7fa169fabce122))


### ♻️　Chores

* save repo before new version ([8903e21](https://github.com/bluelovers/ws-segment/commit/8903e210914d3b68360d97b13d9a8e451788fef2))



## [2.7.113](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.112...novel-segment@2.7.113) (2023-10-07)



### 🔖　Miscellaneous

* . ([a689f96](https://github.com/bluelovers/ws-segment/commit/a689f96c112131de4e61e6aba4a590884fc4b547))



## [2.7.112](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.111...novel-segment@2.7.112) (2023-10-06)



### 🔖　Miscellaneous

* . ([dbff0a5](https://github.com/bluelovers/ws-segment/commit/dbff0a57fa8c30afd54c1193b888cbbb4a397aa2))
* . ([df2eded](https://github.com/bluelovers/ws-segment/commit/df2eded168a5c0ddb0c16f7bad605ef8fb746e0d))



## [2.7.111](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.110...novel-segment@2.7.111) (2023-09-30)

**Note:** Version bump only for package novel-segment





## [2.7.110](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.109...novel-segment@2.7.110) (2023-09-30)



### 🔖　Miscellaneous

* . ([6d0b91f](https://github.com/bluelovers/ws-segment/commit/6d0b91fdcf81d891e6f9d109ac19a6ba8057f79c))



## [2.7.109](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.108...novel-segment@2.7.109) (2023-09-29)



### 🔖　Miscellaneous

* . ([549725a](https://github.com/bluelovers/ws-segment/commit/549725afde89e8f91cabe6e95e17da276f69fdc5))



## [2.7.108](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.107...novel-segment@2.7.108) (2023-08-28)

**Note:** Version bump only for package novel-segment





## [2.7.107](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.106...novel-segment@2.7.107) (2023-08-28)

**Note:** Version bump only for package novel-segment





## [2.7.106](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.105...novel-segment@2.7.106) (2023-08-27)

**Note:** Version bump only for package novel-segment





## [2.7.105](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.104...novel-segment@2.7.105) (2023-08-09)

**Note:** Version bump only for package novel-segment





## [2.7.104](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.103...novel-segment@2.7.104) (2023-08-08)



### 🛠　Build System

* update build ([8bd3608](https://github.com/bluelovers/ws-segment/commit/8bd360826239515d606f706097a540990d757875))


### 📌　Dependencies

* update deps ([82f614e](https://github.com/bluelovers/ws-segment/commit/82f614ea5c2acc9cddb53ddd5fcbd7786bbe8259))



## [2.7.103](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.102...novel-segment@2.7.103) (2023-03-01)



### 🔖　Miscellaneous

* . ([2c6726a](https://github.com/bluelovers/ws-segment/commit/2c6726a5008fe6362b079df33dec36389959e34b))



## [2.7.102](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.101...novel-segment@2.7.102) (2022-12-31)

**Note:** Version bump only for package novel-segment





## [2.7.101](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.100...novel-segment@2.7.101) (2022-11-21)



### 🔖　Miscellaneous

* . ([5a3765c](https://github.com/bluelovers/ws-segment/commit/5a3765c4213a7de841329239ed631f9d3211ce84))



## [2.7.100](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.99...novel-segment@2.7.100) (2022-11-21)



### 🐛　Bug Fixes

* gitroot is not a function ([2d3120a](https://github.com/bluelovers/ws-segment/commit/2d3120a491b99a059b26985865e28c0edf93a3a3))


### 📌　Dependencies

* update deps ([ef6774c](https://github.com/bluelovers/ws-segment/commit/ef6774cec7a8826c389afa65ac15fb832e61d18f))



## [2.7.99](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.98...novel-segment@2.7.99) (2022-10-29)



### 🚨　Tests

* update jest config ([cbce9a2](https://github.com/bluelovers/ws-segment/commit/cbce9a2868e5a0a95fd8f026530c34c9f3930ba0))


### 📌　Dependencies

* update deps ([95a7d58](https://github.com/bluelovers/ws-segment/commit/95a7d583596b6cb0ecd1c0322258205b9a12af51))
* update deps ([c1ca140](https://github.com/bluelovers/ws-segment/commit/c1ca140395f246f9c3f10823daed634fb09857cb))


### 🔖　Miscellaneous

* . ([d078e0e](https://github.com/bluelovers/ws-segment/commit/d078e0ec7e17cee79115db055e7b145d7b48f400))



## [2.7.98](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.97...novel-segment@2.7.98) (2022-09-13)



### 📌　Dependencies

* update deps ([87dfb1e](https://github.com/bluelovers/ws-segment/commit/87dfb1e8c4e0ef55b975639bc94e113442cb1af7))


### 🔖　Miscellaneous

* . ([9dceb59](https://github.com/bluelovers/ws-segment/commit/9dceb59f2ed1a0c5e8f37f2d78e4b186991c3f73))



## [2.7.97](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.96...novel-segment@2.7.97) (2022-07-30)


### 🐛　Bug Fixes

* TypeError: Cannot read properties of undefined (reading 'p') ([8a55a9b](https://github.com/bluelovers/ws-segment/commit/8a55a9b5d7c490504f1da619cfa9286e71841480))


### 🚨　Tests

* **jest:** update jest.config.js ([1f0af34](https://github.com/bluelovers/ws-segment/commit/1f0af346eff06d402e3b3bd692fd223f2b7c0479))
* **jest:** update jest.config.js ([7b3900f](https://github.com/bluelovers/ws-segment/commit/7b3900fd6b638fb8774b306b6435b8082b5a275b))


### 📌　Dependencies

* update deps ([7d87dcd](https://github.com/bluelovers/ws-segment/commit/7d87dcd5e09103380b46b625fd0c2b9b69705307))


### 🔖　Miscellaneous

* . ([2af6f05](https://github.com/bluelovers/ws-segment/commit/2af6f05d19b27f55c654bc8b8b502635d5930252))





## [2.7.96](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.95...novel-segment@2.7.96) (2022-05-30)

**Note:** Version bump only for package novel-segment





## [2.7.95](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.94...novel-segment@2.7.95) (2022-05-21)

**Note:** Version bump only for package novel-segment





## [2.7.94](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.93...novel-segment@2.7.94) (2022-05-21)


### ♻️　Chores

* **deps:** update deps ([6eaf7f0](https://github.com/bluelovers/ws-segment/commit/6eaf7f0fb6e8d803b5eb8dbb3e2cd7a1d6b19f52))





## [2.7.93](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.92...novel-segment@2.7.93) (2022-04-15)

**Note:** Version bump only for package novel-segment





## [2.7.92](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.91...novel-segment@2.7.92) (2022-03-28)


### ♻️　Chores

* **deps:** update deps ([53537a5](https://github.com/bluelovers/ws-segment/commit/53537a5c3ddbdc567ab5ac9a74510b16b16b0b9a))





## [2.7.91](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.90...novel-segment@2.7.91) (2022-02-21)


### 📦　Code Refactoring

* 優化 import ([5fe691e](https://github.com/bluelovers/ws-segment/commit/5fe691e536e17b4f55c85ee3dcb390f8a6cda98c))
* **table:** code splitting ([6fba6f1](https://github.com/bluelovers/ws-segment/commit/6fba6f13dcb75dc2f57c0c905740d487ee38884a))





## [2.7.90](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.89...novel-segment@2.7.90) (2022-02-20)


### 🐛　Bug Fixes

* 防止 work 等於 `constructor` 時的 BUG ([5ae738f](https://github.com/bluelovers/ws-segment/commit/5ae738f4ca6aa1739b5d09395f2dc5e89d5e9ffb))





## [2.7.89](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.88...novel-segment@2.7.89) (2022-02-19)

**Note:** Version bump only for package novel-segment





## [2.7.88](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.87...novel-segment@2.7.88) (2022-02-19)


### ♻️　Chores

* save repo before new version ([ad0a53f](https://github.com/bluelovers/ws-segment/commit/ad0a53fad0a0404b0b71ecdd3b3b9a78dddb2590))





## [2.7.87](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.86...novel-segment@2.7.87) (2022-02-05)


### ♻️　Chores

* save repo before new version ([6775236](https://github.com/bluelovers/ws-segment/commit/677523676b2d121574d95609615a581fcb50c2b6))


### 🔖　Miscellaneous

* . ([71dd7f0](https://github.com/bluelovers/ws-segment/commit/71dd7f0a5fe3c0f4940708834171a8b5680b49fd))





## [2.7.86](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.85...novel-segment@2.7.86) (2022-01-24)


### 📦　Code Refactoring

* @novel-segment/assert ([6bacae3](https://github.com/bluelovers/ws-segment/commit/6bacae36c9dd419648d8ee36d60d2e478f967ee1))
* @novel-segment/stringify , @novel-segment/pretty-diff ([f9e7a4e](https://github.com/bluelovers/ws-segment/commit/f9e7a4e804e8a6e3d22391a3711f2c90330a91e7))


### ♻️　Chores

* **deps:** update deps ([c49d116](https://github.com/bluelovers/ws-segment/commit/c49d116e8fa60ef6583937afc9df9b1513ef780e))


### 🔖　Miscellaneous

* . ([21f0882](https://github.com/bluelovers/ws-segment/commit/21f0882f5cd062bf25f266db808edb0cee116f7d))





## [2.7.85](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.84...novel-segment@2.7.85) (2022-01-19)


### 📦　Code Refactoring

* 分離 排序字典相關函數 ([1e23895](https://github.com/bluelovers/ws-segment/commit/1e238959be1bc399189cf41183ef2e9f5132821d))





## [2.7.84](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.83...novel-segment@2.7.84) (2022-01-14)


### ✨　Features

* allow force overwrite synonym ([82e13a0](https://github.com/bluelovers/ws-segment/commit/82e13a0607d33180af6313502eab9d61fe7644f1))





## [2.7.83](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.82...novel-segment@2.7.83) (2022-01-13)


### 📦　Code Refactoring

* update deps and allow set segment ([f697794](https://github.com/bluelovers/ws-segment/commit/f697794a35ff446698e11077b4f954c4c9d3c0e5))


### 🔖　Miscellaneous

* . ([e4f7358](https://github.com/bluelovers/ws-segment/commit/e4f73587afb9f48e1f194a7ea0be0c273fd72982))





## [2.7.82](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.81...novel-segment@2.7.82) (2021-12-28)


### 🔖　Miscellaneous

* . ([465d1f5](https://github.com/bluelovers/ws-segment/commit/465d1f5c51c2898093f2d7a1449548ca66bfa94e))





## [2.7.81](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.80...novel-segment@2.7.81) (2021-12-23)


### 🔖　Miscellaneous

* . ([4926331](https://github.com/bluelovers/ws-segment/commit/4926331e84633b9e5317abe63771f49da3f6d41e))
* . ([9ffc0f6](https://github.com/bluelovers/ws-segment/commit/9ffc0f69dba4a711c30d37a59e35d78e509f67e3))





## [2.7.80](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.79...novel-segment@2.7.80) (2021-12-08)


### 🔖　Miscellaneous

* . ([ee7e2c4](https://github.com/bluelovers/ws-segment/commit/ee7e2c4760f99ff1b84855ce344fb01daf587069))





## [2.7.79](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.78...novel-segment@2.7.79) (2021-12-02)


### ♻️　Chores

* **deps:** update deps ([56e96b1](https://github.com/bluelovers/ws-segment/commit/56e96b1c29b83b7f547e4e6e68d239c3bab31810))





## [2.7.78](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.77...novel-segment@2.7.78) (2021-11-19)


### ♻️　Chores

* save repo before new version ([2e814ad](https://github.com/bluelovers/ws-segment/commit/2e814ad9c8ebb5d77309ed5c4dca71e3cd25f3bc))





## [2.7.77](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.76...novel-segment@2.7.77) (2021-11-19)


### ♻️　Chores

* save repo before new version ([ce2caf9](https://github.com/bluelovers/ws-segment/commit/ce2caf918132cfc5b301f5eda25ddc0a55f06beb))





## [2.7.76](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.75...novel-segment@2.7.76) (2021-11-14)


### ♻️　Chores

* **deps:** update deps ([d20e15d](https://github.com/bluelovers/ws-segment/commit/d20e15d75d42afe6ca4a49c9acaa0c628b9bb584))


### 🔖　Miscellaneous

* . ([797f948](https://github.com/bluelovers/ws-segment/commit/797f94871db89598fba438875f2b7e340bdad515))





## [2.7.75](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.74...novel-segment@2.7.75) (2021-11-07)


### 🚨　Tests

* update test ([28042bd](https://github.com/bluelovers/ws-segment/commit/28042bd43a776270b9179820d119528b8a791d4e))





## [2.7.74](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.73...novel-segment@2.7.74) (2021-11-02)


### ♻️　Chores

* **deps:** update deps ([b0fdfb0](https://github.com/bluelovers/ws-segment/commit/b0fdfb08ea4be2652b043b0f2a00b8c106bf2aa4))


### 🔖　Miscellaneous

* . ([2342ded](https://github.com/bluelovers/ws-segment/commit/2342ded20a86c0172c470f9a600b96a6ffd4fe6a))





## [2.7.73](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.72...novel-segment@2.7.73) (2021-10-26)


### ♻️　Chores

* **deps:** update deps ([291a018](https://github.com/bluelovers/ws-segment/commit/291a01825915b16fbc8c0cdf16b9eddbf68b3c1c))





## [2.7.72](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.71...novel-segment@2.7.72) (2021-08-31)


### ♻️　Chores

* update package.json ([ba2a7c7](https://github.com/bluelovers/ws-segment/commit/ba2a7c71f3c205f43bdb8530f3fd983776fc0511))
* save repo before new version ([3e825ad](https://github.com/bluelovers/ws-segment/commit/3e825ad59301afe66cf1708537bc2789424e3c0e))





## [2.7.71](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.70...novel-segment@2.7.71) (2021-08-21)


### ♻️　Chores

* **deps:** update deps ([0f5ae81](https://github.com/bluelovers/ws-segment/commit/0f5ae8193fd26493a8fa3c6d6327c0c7ea0e08c5))





## [2.7.70](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.69...novel-segment@2.7.70) (2021-08-10)

**Note:** Version bump only for package novel-segment





## [2.7.69](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.68...novel-segment@2.7.69) (2021-08-06)


### 🐛　Bug Fixes

* 啊啦,发那麼大火, ([993109d](https://github.com/bluelovers/ws-segment/commit/993109d3ab0c4d05de68c3d518a8461751daa77b))
* ,進來之前有人发這個給我們, ([ffa066d](https://github.com/bluelovers/ws-segment/commit/ffa066d5513cdc8851d4275bd80e146a2d30c043))
* 純 + 色 ([cad17e9](https://github.com/bluelovers/ws-segment/commit/cad17e9aab629d1159efc22a002f9e588f1a9a48))
* 余 + 力 + 標點符號 ([174bf19](https://github.com/bluelovers/ws-segment/commit/174bf19ea8a5525e93f7eaff49791b2588475529))


### 🚨　Tests

* **jest:** update jest.config.js ([5bf1892](https://github.com/bluelovers/ws-segment/commit/5bf18924f0434d1c12e3e095c67ba7b935e094e5))


### ♻️　Chores

* save repo before new version ([8450394](https://github.com/bluelovers/ws-segment/commit/8450394ec2e25fb3aa4ff3c3c271658e3bbdc2df))


### 🔖　Miscellaneous

* . ([d06e8de](https://github.com/bluelovers/ws-segment/commit/d06e8de08bea3f1432591e3fd516518b87389210))





## [2.7.68](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.67...novel-segment@2.7.68) (2021-07-25)


### ♻️　Chores

* save repo before new version ([e067e55](https://github.com/bluelovers/ws-segment/commit/e067e55522876511656ba161dd892ccf7a36eb5c))





## [2.7.67](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.66...novel-segment@2.7.67) (2021-07-25)


### ♻️　Chores

* save repo before new version ([60cc561](https://github.com/bluelovers/ws-segment/commit/60cc561f032a50367aa0484362dce3781ba7683c))





## [2.7.66](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.65...novel-segment@2.7.66) (2021-07-23)


### ♻️　Chores

* save repo before new version ([8ed43db](https://github.com/bluelovers/ws-segment/commit/8ed43db8fd89d300f1f4f5a6350d8387bb3d9d6e))





## [2.7.65](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.64...novel-segment@2.7.65) (2021-07-23)


### ♻️　Chores

* save repo before new version ([6c35ab8](https://github.com/bluelovers/ws-segment/commit/6c35ab86c0c22865dfacfe0bbf1ac4407c27c97a))
* **deps:** update deps ([0550b12](https://github.com/bluelovers/ws-segment/commit/0550b1273740743a79b75a3b370c4a5443ce9875))





## [2.7.64](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.63...novel-segment@2.7.64) (2021-07-13)


### ♻️　Chores

* save repo before new version ([d0bbf0b](https://github.com/bluelovers/ws-segment/commit/d0bbf0b39fe1219360b2d53b14310a592e9626eb))





## [2.7.63](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.62...novel-segment@2.7.63) (2021-07-09)


### ♻️　Chores

* save repo before new version ([3fbd9c3](https://github.com/bluelovers/ws-segment/commit/3fbd9c30952c1fccc8a61b41ee0177f7f052b70f))
* **deps:** update deps ([30eb559](https://github.com/bluelovers/ws-segment/commit/30eb559d8c6ee1295e4e9945676089edf6cf43f5))





## [2.7.62](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.61...novel-segment@2.7.62) (2021-07-09)


### 🛠　Build System

* update .js ([91e3576](https://github.com/bluelovers/ws-segment/commit/91e35766208e6ebfefb8c866bd3ebc32c2230b3b))


### ♻️　Chores

* save repo before new version ([dcb6e9a](https://github.com/bluelovers/ws-segment/commit/dcb6e9a08f3a22b349fd7789f58d7c1b84ecbebd))
* **deps:** update deps ([fa653c1](https://github.com/bluelovers/ws-segment/commit/fa653c1c9e2c31852cf3c19b79ff3f8e38e9c8b1))





## [2.7.61](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.60...novel-segment@2.7.61) (2021-07-08)


### 🛠　Build System

* update .js ([2b3e07e](https://github.com/bluelovers/ws-segment/commit/2b3e07e9ecf40646ae4266b9e4ccdb71c9327514))


### ♻️　Chores

* save repo before new version ([1678dc0](https://github.com/bluelovers/ws-segment/commit/1678dc0865acad4474eb76f8086fb9e4d07de6cf))





## [2.7.60](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.59...novel-segment@2.7.60) (2021-06-22)


### 🐛　Bug Fixes

* **typescript:** override ([c42b59a](https://github.com/bluelovers/ws-segment/commit/c42b59a69cf43198b0e1d8818ee6d7f6a252f857))
* **typescript:** This member must have an 'override' modifier because it overrides a member in the base class 'SModule'. ([abffe8c](https://github.com/bluelovers/ws-segment/commit/abffe8c7217272bf65182736d45fa89fccf1e51f))


### 📦　Code Refactoring

* use tslib ([343d4b2](https://github.com/bluelovers/ws-segment/commit/343d4b23a23e222b6a4aba1b8e2a196fc7c70073))


### 🚨　Tests

* Test functions cannot both take a 'done' callback and return something. Either use a 'done' callback, or return a promise. ([350d7c7](https://github.com/bluelovers/ws-segment/commit/350d7c7d8d60086eb4c5f3173749018d2f7b9705))


### 🛠　Build System

* tslib ([a557a67](https://github.com/bluelovers/ws-segment/commit/a557a6772ce4f083e30a4ec9286d87bba1c21672))





## [2.7.59](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.58...novel-segment@2.7.59) (2021-05-17)


### ♻️　Chores

* update deps ([affd25e](https://github.com/bluelovers/ws-segment/commit/affd25eba81eddfc8f5405da7facba2be5ef4fdf))





## [2.7.58](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.57...novel-segment@2.7.58) (2021-02-12)


### ♻️　Chores

* save repo before new version ([2ca569d](https://github.com/bluelovers/ws-segment/commit/2ca569d4ca97b0a31f4c850c6393ac8f36601686))





## [2.7.57](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.56...novel-segment@2.7.57) (2021-02-04)


### ♻️　Chores

* **deps:** update deps ([0bfd505](https://github.com/bluelovers/ws-segment/commit/0bfd50598e513ae11c2648da971fbfa7a1cc19ae))


### 🔖　Miscellaneous

* . ([1664c81](https://github.com/bluelovers/ws-segment/commit/1664c81be69438aac572737d53569582a3db1cf7))





## [2.7.56](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.55...novel-segment@2.7.56) (2020-12-07)


### ♻️　Chores

* **deps:** update deps ([3b0039f](https://github.com/bluelovers/ws-segment/commit/3b0039f204b4b2e212501d6de439bb46bae97418))





## [2.7.55](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.54...novel-segment@2.7.55) (2020-11-10)


### ♻️　Chores

* **deps:** update deps ([bfe45ab](https://github.com/bluelovers/ws-segment/commit/bfe45ab7ef2fba99269917b2e2bbb6c88226ce00))





## [2.7.54](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.53...novel-segment@2.7.54) (2020-09-01)


### ♻️　Chores

* save repo before new version ([b4aa2c0](https://github.com/bluelovers/ws-segment/commit/b4aa2c0dea7ad080b9c90990e7274be16200df55))
* **deps:** update deps ([3228d82](https://github.com/bluelovers/ws-segment/commit/3228d82fe39efc0f403f5eeb09d905b915db533f))
* **deps:** update deps ([c0fcc44](https://github.com/bluelovers/ws-segment/commit/c0fcc44fe0cbea53ab99bcddd421b3b1e8275f68))





## [2.7.53](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.52...novel-segment@2.7.53) (2020-08-26)


### ♻️　Chores

* save repo before new version ([b0d0ddc](https://github.com/bluelovers/ws-segment/commit/b0d0ddc484c405fa44f274f21177872b477c2670))
* **deps:** update deps ([b5a5ef0](https://github.com/bluelovers/ws-segment/commit/b5a5ef0703eb8f51f8edbd3d4aaae5b5e5d0e22a))





## [2.7.52](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.51...novel-segment@2.7.52) (2020-08-18)


### ♻️　Chores

* save repo before new version ([d8c851c](https://github.com/bluelovers/ws-segment/commit/d8c851cc7265d53905a643de60683378b1626c12))
* **deps:** update deps ([c37e89f](https://github.com/bluelovers/ws-segment/commit/c37e89f31358282382cd49c4dcf37fd1dd516d1c))





## [2.7.51](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.50...novel-segment@2.7.51) (2020-08-13)


### ♻️　Chores

* update deps ([b4d2a5e](https://github.com/bluelovers/ws-segment/commit/b4d2a5efb8a9284483f5bf500d50f974b530eba7))





## [2.7.50](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.49...novel-segment@2.7.50) (2020-08-05)


### ♻️　Chores

* save repo before new version ([19406e0](https://github.com/bluelovers/ws-segment/commit/19406e06f850b9b536784c89d3ce880568e822f0))





## [2.7.49](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.48...novel-segment@2.7.49) (2020-08-04)


### ♻️　Chores

* save repo before new version ([a46425d](https://github.com/bluelovers/ws-segment/commit/a46425d438f713e2ccdf5a9101376095eed28e92))
* update deps ([565b462](https://github.com/bluelovers/ws-segment/commit/565b46208545542174e24c3e5899c3745173ab32))





## [2.7.48](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.47...novel-segment@2.7.48) (2020-08-02)


### ♻️　Chores

* update deps ([75d1dcd](https://github.com/bluelovers/ws-segment/commit/75d1dcdf7bb368df1689e3cc0a628a24b2027170))





## [2.7.47](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.46...novel-segment@2.7.47) (2020-08-02)


### ♻️　Chores

* save repo before new version ([757985b](https://github.com/bluelovers/ws-segment/commit/757985b93fc92baef262523d12f07b39b5254a3b))





## [2.7.46](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.45...novel-segment@2.7.46) (2020-08-02)


### 🐛　Bug Fixes

* 拥有 116 年历史 , 年历史 ([e83b213](https://github.com/bluelovers/ws-segment/commit/e83b2139a581f004c05b4bfb9c5155636a7f5099))


### 🚨　Tests

* check not gc ([79e1b68](https://github.com/bluelovers/ws-segment/commit/79e1b68856719fff695c0c56d0b1fcb1775dd3cb))


### ♻️　Chores

* save repo before new version ([6bdb8a2](https://github.com/bluelovers/ws-segment/commit/6bdb8a26a8bd9ca9dcbd8941d0cd8c50a11ed0c2))
* update deps ([aefce99](https://github.com/bluelovers/ws-segment/commit/aefce993e56acce65742abc6768acbdd52e3a1dd))





## [2.7.45](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.44...novel-segment@2.7.45) (2020-07-27)


### ♻️　Chores

* save repo before new version ([bd61385](https://github.com/bluelovers/ws-segment/commit/bd61385fef4348b1153fdd67a97d556b7fc49c5e))





## [2.7.44](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.43...novel-segment@2.7.44) (2020-07-27)


### 🐛　Bug Fixes

* **ZhtSynonymOptimizer:** 原先于北方大地偷偷撰寫網絡小說的平鳥， ([9bb6339](https://github.com/bluelovers/ws-segment/commit/9bb6339d9b19d974b50c0ef9ea982bd053580cd0))


### ♻️　Chores

* save repo before new version ([8809fc7](https://github.com/bluelovers/ws-segment/commit/8809fc7f57ca3aea82a38c2eab1667e634196d5d))
* update deps ([2938176](https://github.com/bluelovers/ws-segment/commit/293817670b666da29b13d80291d0e33ca2f36bf8))





## [2.7.43](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.42...novel-segment@2.7.43) (2020-07-24)


### ♻️　Chores

* save repo before new version ([8dd36f4](https://github.com/bluelovers/ws-segment/commit/8dd36f489b7c481cc59bffa68e195a660686721f))
* **deps:** update deps ([23d9571](https://github.com/bluelovers/ws-segment/commit/23d9571aacc18d7eb602f9d7a889476de6c7c761))





## [2.7.42](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.41...novel-segment@2.7.42) (2020-07-23)


### ♻️　Chores

* **deps:** update deps ([a71079a](https://github.com/bluelovers/ws-segment/commit/a71079a58b311092d03913113cd8ab34311cad52))





## [2.7.41](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.40...novel-segment@2.7.41) (2020-07-23)


### 🐛　Bug Fixes

* 王五和张三丰、李强是谁 ([113181c](https://github.com/bluelovers/ws-segment/commit/113181c488888773da2931b6b7af102353559101))
* 不允許 部分單字姓名 被判定為 可重覆姓名 ([190e425](https://github.com/bluelovers/ws-segment/commit/190e425e7d25c7356c35ffbfff31f7602ee33ea7))
* 姓氏列表去除 `於` ([a04f143](https://github.com/bluelovers/ws-segment/commit/a04f143ee3bcaa7e1516f9dd93120c2da5d591ec))


### ✨　Features

* 支援在名字具有可識別詞時 進行姓名合併 例如 李成桂 ([35c0a91](https://github.com/bluelovers/ws-segment/commit/35c0a914433016c995cc50187be87f2bf20307ac))


### 🚨　Tests

* move test ([a2368e0](https://github.com/bluelovers/ws-segment/commit/a2368e06f32d3ce64cb3e22ae1d7f2fd686aa3dc))
* move test ([40972c1](https://github.com/bluelovers/ws-segment/commit/40972c129e3c7d7eadfb59a3ae9c4ca5ac86c4e9))





## [2.7.40](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.39...novel-segment@2.7.40) (2020-07-19)


### 🐛　Bug Fixes

* 所以其王位繼承人也被稱為世子 ([eac4f21](https://github.com/bluelovers/ws-segment/commit/eac4f21fd69711dfdcc16c64c018d4156302aff4))


### ♻️　Chores

* save repo before new version ([7a8e541](https://github.com/bluelovers/ws-segment/commit/7a8e541ddfcd9764d52df1145df25cd7199331ec))


### 🔖　Miscellaneous

* . ([f386ef6](https://github.com/bluelovers/ws-segment/commit/f386ef6a6cc23838fe7c67f5e5e9871206e1ea9c))





## [2.7.39](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.38...novel-segment@2.7.39) (2020-07-19)


### ♻️　Chores

* save repo before new version ([a473abf](https://github.com/bluelovers/ws-segment/commit/a473abf9c85e3aa5efa3425a7dcc7987637c5fb8))
* update deps ([048cf76](https://github.com/bluelovers/ws-segment/commit/048cf769cb4cfabd6dafa02477f9a4c8d940f679))
* update deps ([b44f0f2](https://github.com/bluelovers/ws-segment/commit/b44f0f2763cb9282577ca137640ce1f9ec1cfe51))





## [2.7.38](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.37...novel-segment@2.7.38) (2020-07-18)


### 📦　Code Refactoring

* @novel-segment/postag ([f9a0838](https://github.com/bluelovers/ws-segment/commit/f9a0838f7d2eef33180331ec600184029c44fccf))


### ♻️　Chores

* update deps ([60936c1](https://github.com/bluelovers/ws-segment/commit/60936c1444f833db9c50f638eca0aac062b41fb3))





## [2.7.37](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.36...novel-segment@2.7.37) (2020-07-17)


### 🐛　Bug Fixes

* **test:** lazyMatchSynonym001 ([92b9570](https://github.com/bluelovers/ws-segment/commit/92b95709de4057ef4b4142edc3261673541f9226))


### 🛠　Build System

* update typescript build ([91fb859](https://github.com/bluelovers/ws-segment/commit/91fb859e55140ce665ad2fde14724259b9414250))


### ♻️　Chores

* save repo before new version ([7979498](https://github.com/bluelovers/ws-segment/commit/79794989297c2d2db9ca328af0a744152f426ee8))





## [2.7.36](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.35...novel-segment@2.7.36) (2020-07-12)


### ♻️　Chores

* save repo before new version ([6bd2cb4](https://github.com/bluelovers/ws-segment/commit/6bd2cb4bb66d6a37ec6ac84e53c42456ed1603f0))





## [2.7.35](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.34...novel-segment@2.7.35) (2020-07-11)


### ✨　Features

* 姓氏 增加 `朴` ([1c05e12](https://github.com/bluelovers/ws-segment/commit/1c05e1287eabe45c4adae982993c9f23101ee9f8))


### ♻️　Chores

* save repo before new version ([d1e96f7](https://github.com/bluelovers/ws-segment/commit/d1e96f7306a0e89343b02ee859817ca47932dbac))





## [2.7.34](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.33...novel-segment@2.7.34) (2020-07-09)


### ♻️　Chores

* save repo before new version ([0fc84ba](https://github.com/bluelovers/ws-segment/commit/0fc84ba7570a1d6c1865615375d7ed2410727100))





## [2.7.33](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.32...novel-segment@2.7.33) (2020-07-09)


### ♻️　Chores

* save repo before new version ([905f2e4](https://github.com/bluelovers/ws-segment/commit/905f2e4b6feb0e96dd66ca0cd6e20febf655953b))





## [2.7.32](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.31...novel-segment@2.7.32) (2020-07-08)


### ♻️　Chores

* save repo before new version ([e2d4e44](https://github.com/bluelovers/ws-segment/commit/e2d4e44fb10b7aa1ee25ffde9af54ec1b7091f6c))





## [2.7.31](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.30...novel-segment@2.7.31) (2020-07-07)


### ♻️　Chores

* save repo before new version ([ef12eb3](https://github.com/bluelovers/ws-segment/commit/ef12eb32505687e7e48804fe19b71615af89c1a9))
* **deps:** update deps ([7e17ebe](https://github.com/bluelovers/ws-segment/commit/7e17ebebccf4f95b3be1c8c46c6e4f469b0aaf74))





## [2.7.30](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.29...novel-segment@2.7.30) (2020-07-06)


### 🐛　Bug Fixes

* **dict:** 但是他卻不知道/因為什麼/不能大幅度動彈 ([896241a](https://github.com/bluelovers/ws-segment/commit/896241a10f611ab706e8f71d56d25ded85a6feab))


### ♻️　Chores

* save repo before new version ([885ac7c](https://github.com/bluelovers/ws-segment/commit/885ac7c7d2c9a74ca3c0add0db0d1d5b11543193))
* **deps:** update deps ([1926507](https://github.com/bluelovers/ws-segment/commit/1926507815dbbc023362546f6f5ca950c6edc417))





## [2.7.29](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.28...novel-segment@2.7.29) (2020-07-04)


### ♻️　Chores

* save repo before new version ([5fd7f03](https://github.com/bluelovers/ws-segment/commit/5fd7f03ad9e26a12764fb600f1df88998073552a))





## [2.7.28](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.27...novel-segment@2.7.28) (2020-07-04)

**Note:** Version bump only for package novel-segment





## [2.7.27](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.26...novel-segment@2.7.27) (2020-07-04)


### 🐛　Bug Fixes

* ENOENT: no such file or directory, open './temp/c1.json' ([b52caee](https://github.com/bluelovers/ws-segment/commit/b52caee2bfdf3ab13db6d79202df27fe3c29a1d1))


### ♻️　Chores

* **deps:** update deps ([9de9994](https://github.com/bluelovers/ws-segment/commit/9de9994dc96f9aae857cba00c5a4859e04935d80))
* **dict:** save dict ([954b56b](https://github.com/bluelovers/ws-segment/commit/954b56b494b7bc303c7596a1b0d3638c2f644088))





## [2.7.26](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.24...novel-segment@2.7.26) (2020-07-03)


### 🔖　Miscellaneous

* . ([d009746](https://github.com/bluelovers/ws-segment/commit/d0097463f1750f22357c679bd0e7be011dc367a4))





## [2.7.24](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.23...novel-segment@2.7.24) (2020-07-03)


### 🔖　Miscellaneous

* . ([5b28c64](https://github.com/bluelovers/ws-segment/commit/5b28c647b407d1ddf24ac90e26d7ead3b0c422cf))
* . ([1426416](https://github.com/bluelovers/ws-segment/commit/1426416d7930967d5c43bd0a11585912793c8f0e))
* . ([66676e6](https://github.com/bluelovers/ws-segment/commit/66676e668050351f1dba5d0d147b18e66859c206))





## [2.7.23](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.22...novel-segment@2.7.23) (2020-07-02)


### ✨　Features

* 毎 + 量詞 ([98375e4](https://github.com/bluelovers/ws-segment/commit/98375e4085a54631cb6ca77d57867922742d578b))


### 📦　Code Refactoring

* **dict:** 冥|瞑 ([a47684f](https://github.com/bluelovers/ws-segment/commit/a47684f3571367be3615867dd6e83ba1f13f9c61))





## [2.7.22](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.21...novel-segment@2.7.22) (2020-07-01)

**Note:** Version bump only for package novel-segment





## [2.7.21](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.20...novel-segment@2.7.21) (2020-07-01)


### 🔖　Miscellaneous

* . ([ddd45f0](https://github.com/bluelovers/ws-segment/commit/ddd45f074b34b948accd61a9b5377b864292a8f1))





## [2.7.20](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.19...novel-segment@2.7.20) (2020-07-01)


### 🔖　Miscellaneous

* . ([b0820f0](https://github.com/bluelovers/ws-segment/commit/b0820f0dc253a0857354bb8774eda397fa959e0e))





## [2.7.19](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.18...novel-segment@2.7.19) (2020-07-01)


### ✨　Features

* build submod index ([be6bf36](https://github.com/bluelovers/ws-segment/commit/be6bf36f2ee2ffcbaf89343c3d4dd2187e46f6eb))


### 📦　Code Refactoring

* update source to esm ([97e3195](https://github.com/bluelovers/ws-segment/commit/97e319511795ba1dbf10adc9cab3705d793c05df))
* update source to esm ([e5fe85a](https://github.com/bluelovers/ws-segment/commit/e5fe85a92bf00ce744aec79e6cdac7a78e0a06b1))
* 模組規範化 ([ea1cfad](https://github.com/bluelovers/ws-segment/commit/ea1cfad529cf0f0a3beb7efd3f2af3cd48bd93fd))
* update URLTokenizer ([32b601d](https://github.com/bluelovers/ws-segment/commit/32b601d9cfa5a767d329f304dccf136ae751b98a))
* use strict check ([293bc13](https://github.com/bluelovers/ws-segment/commit/293bc1364e84ff26f45abb877618474c0d449a04))
* use strict check ([32628f7](https://github.com/bluelovers/ws-segment/commit/32628f73ade348ec4315654e6796554358f88818))


### ♻️　Chores

* add __root ([2b44b88](https://github.com/bluelovers/ws-segment/commit/2b44b882b0149ad23b7ac9a534da126a4d0e6218))


### 🔖　Miscellaneous

* . ([f37cd99](https://github.com/bluelovers/ws-segment/commit/f37cd9947186292566304918e9bc3f95b97bbea3))





## [2.7.18](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.17...novel-segment@2.7.18) (2020-06-30)


### ✨　Features

* load `lazy/*` ([f5eaf21](https://github.com/bluelovers/ws-segment/commit/f5eaf217d5d7b00a46b30dcf51cd70b68c77ff15))


### ♻️　Chores

* **deps:** update deps ([0c38ca8](https://github.com/bluelovers/ws-segment/commit/0c38ca89a2998a25a46c675caa9cb2e668dc361b))





## [2.7.17](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.16...novel-segment@2.7.17) (2020-06-29)


### 🐛　Bug Fixes

* **dict:** update dict ([f9e71c6](https://github.com/bluelovers/ws-segment/commit/f9e71c67eb3ffc4b6d6d2ed9b4785e4c5e155171))


### ✨　Features

* update chs names ([ff58a9f](https://github.com/bluelovers/ws-segment/commit/ff58a9fe3f73663c3917e74a0021118db5616b3d))


### 🔖　Miscellaneous

* . ([8430596](https://github.com/bluelovers/ws-segment/commit/8430596adc003a53e6770ad05805739aec38d81a))
* novel-segment@2.7.16, segment-dict@2.3.100, cjk-conv@1.2.89, regexp-cjk@3.3.55 ([4434212](https://github.com/bluelovers/ws-segment/commit/44342129350e2a1605e8b775cffcc6a311427d57))





## [2.7.16](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.15...novel-segment@2.7.16) (2020-06-27)


### 🔖　Miscellaneous

* novel-segment@2.7.15, segment-dict@2.3.99, cjk-conv@1.2.89, regexp-cjk@3.3.55 ([92b81ca](https://github.com/bluelovers/ws-segment/commit/92b81cad127a061a785f5f54e7739830048ce5c1))





## [2.7.15](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.14...novel-segment@2.7.15) (2020-06-26)


### 🔖　Miscellaneous

* . ([53c7adf](https://github.com/bluelovers/ws-segment/commit/53c7adf780041a0b53823eeb54e04313b9a402df))
* . ([a9f13b5](https://github.com/bluelovers/ws-segment/commit/a9f13b5c61c2b7e832977beae352fe07de6f1239))
* novel-segment@2.7.14, segment-dict@2.3.98, cjk-conv@1.2.88, regexp-cjk@3.3.54 ([f47ec34](https://github.com/bluelovers/ws-segment/commit/f47ec3408237c68f08de9a6fcc61c6c63bd1d4ac))





## [2.7.14](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.13...novel-segment@2.7.14) (2020-06-24)


### 🐛　Bug Fixes

* **dict:** 扎营 ([271d57b](https://github.com/bluelovers/ws-segment/commit/271d57b60847a79fe8a055596bfca4681b86d1c4))


### ♻️　Chores

* **deps:** update deps ([3a5e2c1](https://github.com/bluelovers/ws-segment/commit/3a5e2c195a7db0e6c99eee6790c71b6f48975947))
* **dict:** save dict ([63600c8](https://github.com/bluelovers/ws-segment/commit/63600c85f576c3c86f21181e14066778634a9645))


### 🔖　Miscellaneous

* novel-segment@2.7.13, segment-dict@2.3.97, cjk-conv@1.2.87, regexp-cjk@3.3.53 ([e803199](https://github.com/bluelovers/ws-segment/commit/e803199bc50584e5d778ebfbfb78d0aacdb5a6dc))





## [2.7.13](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.12...novel-segment@2.7.13) (2020-06-20)


### ♻️　Chores

* **deps:** update deps ([e675bcb](https://github.com/bluelovers/ws-segment/commit/e675bcb6f84ec27caabc22b2b12e7f2cb4fb3096))


### 🔖　Miscellaneous

* novel-segment@2.7.12, segment-dict@2.3.96, cjk-conv@1.2.85, regexp-cjk@3.3.51 ([d25b7d3](https://github.com/bluelovers/ws-segment/commit/d25b7d33dc7396cda79aebe9fd05ef644640adcc))





## [2.7.12](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.11...novel-segment@2.7.12) (2020-06-11)

**Note:** Version bump only for package novel-segment





## [2.7.11](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.10...novel-segment@2.7.11) (2020-06-10)

**Note:** Version bump only for package novel-segment





## [2.7.10](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.9...novel-segment@2.7.10) (2020-06-09)

**Note:** Version bump only for package novel-segment





## [2.7.9](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.8...novel-segment@2.7.9) (2020-06-09)

**Note:** Version bump only for package novel-segment





## [2.7.8](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.7...novel-segment@2.7.8) (2020-06-07)


### Features

* support 第 ([f1a3fdc](https://github.com/bluelovers/ws-segment/commit/f1a3fdc9eb88e58d20c58524e014342e6b7016ae))





## [2.7.7](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.6...novel-segment@2.7.7) (2020-06-07)

**Note:** Version bump only for package novel-segment





## [2.7.6](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.5...novel-segment@2.7.6) (2020-06-07)


### Features

* import { cloneDeep } from 'lodash'; ([00e1bd8](https://github.com/bluelovers/ws-segment/commit/00e1bd8ea63f1369fa9a0e44bfc3f6093988931f))





## [2.7.5](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.4...novel-segment@2.7.5) (2020-06-06)


### Features

* use @lazy-cjk/zh-table-list ([d8b0efa](https://github.com/bluelovers/ws-segment/commit/d8b0efac26d3c00b5f4372d0aa82c59cc3599974))





## [2.7.4](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.3...novel-segment@2.7.4) (2020-06-06)

**Note:** Version bump only for package novel-segment





## [2.7.3](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.2...novel-segment@2.7.3) (2020-06-03)

**Note:** Version bump only for package novel-segment





## [2.7.2](https://github.com/bluelovers/ws-segment/compare/novel-segment@2.7.1...novel-segment@2.7.2) (2020-06-03)

**Note:** Version bump only for package novel-segment





## [2.7.1](https://github.com/bluelovers/node-segment/compare/novel-segment@2.6.1...novel-segment@2.7.1) (2020-06-03)


### Features

* 優化 修正 几百遍 => 幾百遍 ([bf4aa7c](https://github.com/bluelovers/node-segment/commit/bf4aa7cdbc24b513889175312c6218783b392029))
* 優化 數百遍 几百遍 這類詞的合併 ([b644483](https://github.com/bluelovers/node-segment/commit/b6444831c1b2bd5c1f063f773fa1968185937296))





## [2.6.1](https://github.com/bluelovers/node-segment/compare/novel-segment@2.5.23...novel-segment@2.6.1) (2020-06-02)


### Bug Fixes

* 多給了店主一筆小費后，我們離開了酒館 ([9673082](https://github.com/bluelovers/node-segment/commit/9673082652ae2624f9381b743f84b5d0a24b31ed))
* 多給了店主一筆小費后，我們離開了酒館 ([17a3c03](https://github.com/bluelovers/node-segment/commit/17a3c03bee37468d20248dc5f93ce44be283177c))


### BREAKING CHANGES

* 只有新詞屬於人名或未知詞時才會合併
* 只有新詞屬於人名或未知詞時才會合併





## [2.5.23](https://github.com/bluelovers/node-segment/compare/novel-segment@2.5.22...novel-segment@2.5.23) (2020-06-02)

**Note:** Version bump only for package novel-segment





## [2.5.22](https://github.com/bluelovers/node-segment/compare/novel-segment@2.5.21...novel-segment@2.5.22) (2020-06-01)

**Note:** Version bump only for package novel-segment





## [2.5.21](https://github.com/bluelovers/node-segment/compare/novel-segment@2.5.20...novel-segment@2.5.21) (2020-05-31)


### Bug Fixes

* 透过后制隐瞒当事人的真实身分之后 ([bba3294](https://github.com/bluelovers/node-segment/commit/bba329422fdc8cade395d47e6a630018e6943c0a))





## [2.5.20](https://github.com/bluelovers/node-segment/compare/novel-segment@2.5.19...novel-segment@2.5.20) (2020-05-31)

**Note:** Version bump only for package novel-segment





## [2.5.19](https://github.com/bluelovers/node-segment/compare/novel-segment@2.5.18...novel-segment@2.5.19) (2020-05-28)

**Note:** Version bump only for package novel-segment





## [2.5.18](https://github.com/bluelovers/node-segment/compare/novel-segment@2.5.17...novel-segment@2.5.18) (2020-05-23)

**Note:** Version bump only for package novel-segment





## [2.5.17](https://github.com/bluelovers/node-segment/compare/novel-segment@2.5.16...novel-segment@2.5.17) (2020-05-14)


### Bug Fixes

* support check git in ws ([93d9046](https://github.com/bluelovers/node-segment/commit/93d904629b42fd63db20f174391bb0ce618055aa))





## [2.5.16](https://github.com/bluelovers/node-segment/compare/novel-segment@2.5.15...novel-segment@2.5.16) (2020-05-13)


### Bug Fixes

* 我喜欢的男孩，其实也是女孩 簡介 ([e648a2e](https://github.com/bluelovers/node-segment/commit/e648a2ecc2b6dc6eebbe743bf249d7e94e581dbf))





## [2.5.15](https://github.com/bluelovers/node-segment/compare/novel-segment@2.5.14...novel-segment@2.5.15) (2020-05-10)

**Note:** Version bump only for package novel-segment





## [2.5.14](https://github.com/bluelovers/node-segment/compare/novel-segment@2.5.13...novel-segment@2.5.14) (2020-05-10)


### Features

* postpublish:segment ([f2114bd](https://github.com/bluelovers/node-segment/commit/f2114bdab8493b8af3419b31becdcbfdb26f4361))





## [2.5.13](https://github.com/bluelovers/node-segment/compare/novel-segment@2.5.12...novel-segment@2.5.13) (2020-05-10)

**Note:** Version bump only for package novel-segment





## [2.5.12](https://github.com/bluelovers/node-segment/compare/novel-segment@2.5.11...novel-segment@2.5.12) (2020-05-10)

**Note:** Version bump only for package novel-segment





## 2.5.11 (2020-05-10)


### Features

* update deps ([ed91d1e](https://github.com/bluelovers/node-segment/commit/ed91d1e81b74370f81938cb163a3a6ccac39c3f2))
