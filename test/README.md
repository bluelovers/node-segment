# Test Directory - test / 測試目錄

## Overview / 概述

This directory contains test files and demo scripts for the Chinese word segmentation module.

本目錄包含中文分詞模組的測試檔案與演示腳本。

## Demo Files / 演示檔案

### demo.cache.ts (requires ts-node / 需要 ts-node)

**Important: This file cannot be executed with `tsx`, must use `ts-node`.**

**重要：此檔案無法使用 `tsx` 執行，必須使用 `ts-node`。**

```bash
# Correct execution method / 正確執行方式
ts-node demo.cache.ts

# The following will NOT work / 以下方式無法執行
# tsx demo.cache.ts  # This will fail! / 這會失敗！
```

#### Output Files / 輸出檔案

After executing [`demo.cache.ts`](demo.cache.ts), the results will be saved to:

執行 [`demo.cache.ts`](demo.cache.ts) 後，結果將儲存至：

| File / 檔案 | Description / 說明 |
|------|-------------|
| [`temp/c1.json`](./temp/c1.json) | JSON format segmentation results, containing detailed word analysis, POS tags, and debug information / JSON 格式分詞結果，包含詳細詞語分析、詞性標記與除錯資訊 |
| [`temp/c1.txt`](./temp/c1.txt) | Processed text output after segmentation / 分詞處理後的文字輸出 |

#### Output Example / 輸出範例

**c1.json** contains / 包含：
- `changed`: Whether the text was modified during segmentation / 文字在分詞過程中是否被修改
- `ret`: Array of segmented words with the following properties / 分詞結果陣列，包含以下屬性：
  - `w`: Word text / 詞語文字
  - `p`: POS tag (numeric) / 詞性標記（數值格式）
  - `ps`: POS tag name (Chinese) / 詞性標記名稱（中文）
  - `pp`: POS tag (hex format) / 詞性標記（十六進位格式）
  - `f`: Word frequency / 詞語頻率
  - `m`: Morphological breakdown for compound words / 複合詞的形態分解

**c1.txt** contains the reassembled text after segmentation processing. / 包含分詞處理後重新組合的文字。

## Directory Structure / 目錄結構

```
test/
  demo.cache.ts          # Cache demo (requires ts-node) / 快取演示（需要 ts-node）
  res/                   # Test resources and data / 測試資源與資料
    default.ts           # Default test data / 預設測試資料
    fixme.data.ts        # FIXME test data / FIXME 測試資料
    gc.data.ts           # GC test data / 垃圾回收測試資料（用於檢測 OOM 時的自動 GC 機制）
    lazy.index.ts        # Lazy index data / 懶惰隨興索引資料
    lazy.novel.ts        # Lazy novel data / 懶惰隨興小說資料
    gc.not/              # GC negative test data / 垃圾回收負面測試資料
    lazy.index/          # Lazy index test data / 懶惰隨興索引測試資料
    res/                 # Test resources and data / 測試資源與資料
  temp/                  # Output directory for demo results / 演示結果輸出目錄
    c1.json              # Segmentation results (JSON) / 分詞結果（JSON）
    c1.txt               # Processed text output / 處理後的文字輸出
  __snapshots__/         # Test snapshots / 測試快照
```

## res/ Directory / res/ 目錄

The `res/` directory contains test resources and data files:

`res/` 目錄包含測試資源與資料檔案：

| Path / 路徑 | Description / 說明 |
|------|-------------|
| `default.ts` | Default test data for segmentation / 分詞預設測試資料 |
| `fixme.data.ts` | Data for FIXME-related tests / FIXME 相關測試資料 |
| `gc.data.ts` | Garbage collection test data / 垃圾回收測試資料（用於檢測 OOM 時的自動 GC 機制） |
| `lazy.index.ts` | Lazy index test data / 懶惰索引測試資料 |
| `lazy.novel.ts` | Lazy novel processing test data / 懶惰小說處理測試資料 |
| `gc.not/` | Negative test cases for GC / 垃圾回收負面測試案例 |
| `lazy.index/` | Lazy index test cases / 懶惰索引測試案例 |
| `res/` | Additional test resources / 其他測試資源 |

## Related Documentation / 相關文件

- Main package README: [../../README.md](../../README.md)
- Demo documentation: [../demo/README.md](../demo/README.md)