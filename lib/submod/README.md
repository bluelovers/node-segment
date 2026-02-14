# Sub-module Index / 子模組索引

此目錄包含 `novel-segment` 分詞系統的所有子模組，分為 **Optimizer（優化器）** 和 **Tokenizer（分詞器）** 兩大類。

This directory contains all sub-modules of the `novel-segment` segmentation system,
categorized into **Optimizers** and **Tokenizers**.

---

## 目錄 / Table of Contents

- [Optimizers 優化器](#optimizers-優化器)
- [Tokenizers 分詞器](#tokenizers-分詞器)
- [模組類型說明](#模組類型說明)

---

## Optimizers 優化器

優化器用於對分詞結果進行後處理，合併相鄰詞彙或調整詞性標記。

Optimizers are used for post-processing segmentation results,
merging adjacent words or adjusting part-of-speech tags.

| 模組名稱 / Module Name | 檔案 / File | 說明 / Description |
|------------------------|-------------|-------------------|
| **AdjectiveOptimizer** | [`AdjectiveOptimizer.ts`](./AdjectiveOptimizer.ts) | 形容詞優化模組，處理顏色詞的形容詞轉換 / Adjective optimizer for color word conversion |
| **ChsNameOptimizer** | [`ChsNameOptimizer.ts`](./ChsNameOptimizer.ts) | 中文人名優化模組，識別與合併中文人名 / Chinese name optimizer for identifying and merging Chinese names |
| **DatetimeOptimizer** | [`DatetimeOptimizer.ts`](./DatetimeOptimizer.ts) | 日期時間優化模組，合併數字與日期單位 / Datetime optimizer for merging numbers with date units |
| **DictOptimizer** | [`DictOptimizer.ts`](./DictOptimizer.ts) | 字典優化模組，合併相鄰詞彙以提升準確度 / Dictionary optimizer for merging adjacent words |
| **EmailOptimizer** | [`EmailOptimizer.ts`](./EmailOptimizer.ts) | 郵箱地址識別優化模組 / Email address recognition optimizer |
| **ForeignOptimizer** | [`ForeignOptimizer.ts`](./ForeignOptimizer.ts) | 外文字元優化模組，合併連續的外文字元 / Foreign character optimizer for merging consecutive foreign characters |
| **ZhtSynonymOptimizer** | [`ZhtSynonymOptimizer.ts`](./ZhtSynonymOptimizer.ts) | 繁體中文同義詞優化模組，處理繁簡轉換 / Traditional Chinese synonym optimizer for Traditional-Simplified conversion |

---

## Tokenizers 分詞器

分詞器用於識別和分割特定類型的文字模式。

Tokenizers are used to identify and split specific text patterns.

| 模組名稱 / Module Name | 檔案 / File | 說明 / Description |
|------------------------|-------------|-------------------|
| **ChsNameTokenizer** | [`ChsNameTokenizer.ts`](./ChsNameTokenizer.ts) | 中文人名分詞器，識別中文人名格式 / Chinese name tokenizer for recognizing Chinese name formats |
| **DictTokenizer** | [`DictTokenizer.ts`](./DictTokenizer.ts) | 字典分詞器，核心分詞模組，使用 MMSG 演算法 / Dictionary tokenizer, core module using MMSG algorithm |
| **ForeignTokenizer** | [`ForeignTokenizer.ts`](./ForeignTokenizer.ts) | 外文字元分詞器，識別英文、數字、阿拉伯文、俄文等 / Foreign character tokenizer for English, numbers, Arabic, Russian, etc. |
| **JpSimpleTokenizer** | [`JpSimpleTokenizer.ts`](./JpSimpleTokenizer.ts) | 日文簡易分詞器，識別平假名與片假名 / Japanese simple tokenizer for Hiragana and Katakana |
| **PunctuationTokenizer** | [`PunctuationTokenizer.ts`](./PunctuationTokenizer.ts) | 標點符號分詞器，識別並分離標點符號 / Punctuation tokenizer for identifying and separating punctuation |
| **SingleTokenizer** | [`SingleTokenizer.ts`](./SingleTokenizer.ts) | 單字切分模組，將未識別詞切分為單字 / Single character tokenizer for splitting unrecognized words |
| **URLTokenizer** | [`URLTokenizer.ts`](./URLTokenizer.ts) | URL 識別模組，識別 http/https/ftp 等網址 / URL tokenizer for recognizing http/https/ftp URLs |
| **WildcardTokenizer** | [`WildcardTokenizer.ts`](./WildcardTokenizer.ts) | 通配符分詞器，識別特殊模式詞彙 / Wildcard tokenizer for recognizing special pattern words |
| **ZhRadicalTokenizer** | [`ZhRadicalTokenizer.ts`](./ZhRadicalTokenizer.ts) | 中文部首分詞器（目前無實際效果）/ Chinese radical tokenizer (currently inactive) |
| **ZhuyinTokenizer** | [`ZhuyinTokenizer.ts`](./ZhuyinTokenizer.ts) | 注音符號分詞器，識別ㄅㄆㄇㄈ等注音符號 / Zhuyin (Bopomofo) tokenizer for recognizing phonetic symbols |

---

## 模組類型說明

### Optimizer 優化器

優化器繼承自 `SubSModuleOptimizer` 基類，主要功能：

- **執行時機**：在分詞器處理完成後執行
- **主要方法**：`doOptimize(words: IWord[]): IWord[]`
- **用途**：
  - 合併相鄰的詞彙（如數字 + 日期單位）
  - 調整詞性標記（如將顏色名詞轉為形容詞）
  - 識別特殊模式（如郵箱地址、人名）

### Tokenizer 分詞器

分詞器繼承自 `SubSModuleTokenizer` 基類，主要功能：

- **執行時機**：在初始分詞階段執行
- **主要方法**：`split(words: IWord[]): IWord[]`
- **用途**：
  - 識別特定類型的文字模式
  - 將未識別的文字進行細分
  - 標記詞性（POS tags）

---

## 使用範例 / Usage Example

```typescript
import Segment from 'novel-segment';

// 建立分詞器實例
const segment = new Segment();

// 使用預設模組（包含所有優化器和分詞器）
segment.useDefault();

// 執行分詞
const result = segment.doSegment('這是一個測試句子');
console.log(result);
```

---

## 相關文件 / Related Documentation

- [主模組文檔 / Main Module Documentation](../README.md)
- [詞性標記定義 / POS Tag Definitions](../POSTAG.ts)
- [Segment 類別 / Segment Class](../Segment.ts)

---

## 作者 / Author

- 老雷 <leizongmin@gmail.com>
- bluelovers

## 授權 / License

MIT License
