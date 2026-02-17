/**
 * 文字預處理模組
 * Text Preprocessing Module
 *
 * 將輸入文字轉換為標準化格式。
 * Converts input text to a normalized format.
 */
/**
 * 取得標準化的文字內容
 * Get Normalized Text Content
 *
 * 將 Buffer 或字串轉換為純文字字串，並統一換行符為 LF。
 * Converts Buffer or string to plain text string and normalizes line endings to LF.
 *
 * @param {string | Buffer} text - 輸入文字或 Buffer / Input text or Buffer
 * @returns {string} 標準化後的文字字串 / Normalized text string
 * @throws {TypeError} 當輸入既非字串也非 Buffer 時拋出錯誤 / Throws error when input is neither string nor Buffer
 */
export declare function _get_text(text: string | Buffer): string;
