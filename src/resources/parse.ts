// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { type Uploadable } from '../core/uploads';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class Parse extends APIResource {
  /**
   * Converts raw text, source code, web/data, PDF, Microsoft Office, and image bytes
   * into LLM-usable Markdown.
   */
  handle(
    body: Uploadable,
    params: ParseHandleParams,
    options?: RequestOptions,
  ): APIPromise<ParseHandleResponse> {
    const {
      baseUrl,
      extension,
      filename,
      includeImages,
      includeLinks,
      ocr,
      pdfEnd,
      pdfStart,
      shortenBase64Images,
      useMainContentOnly,
    } = params;
    return this._client.post('/parse', {
      body: body,
      query: {
        baseUrl,
        extension,
        filename,
        includeImages,
        includeLinks,
        ocr,
        pdfEnd,
        pdfStart,
        shortenBase64Images,
        useMainContentOnly,
      },
      ...options,
      headers: buildHeaders([{ 'Content-Type': 'application/octet-stream' }, options?.headers]),
    });
  }
}

export interface ParseHandleResponse {
  /**
   * Input bytes converted to GitHub Flavored Markdown
   */
  markdown: string;

  /**
   * Indicates success
   */
  success: true;

  /**
   * Detected content type used for parsing
   */
  type:
    | 'html'
    | 'xml'
    | 'json'
    | 'jsonl'
    | 'text'
    | 'csv'
    | 'tsv'
    | 'markdown'
    | 'yaml'
    | 'python'
    | 'java'
    | 'javascript'
    | 'php'
    | 'shell'
    | 'ruby'
    | 'typescript'
    | 'rtf'
    | 'srt'
    | 'css'
    | 'scss'
    | 'less'
    | 'stylus'
    | 'sass'
    | 'svg'
    | 'pdf'
    | 'docx'
    | 'doc'
    | 'xlsx'
    | 'xls'
    | 'pptx'
    | 'ppt'
    | 'jpg'
    | 'png'
    | 'gif'
    | 'bmp'
    | 'tiff'
    | 'webp'
    | 'ppm'
    | 'pbm'
    | 'pgm'
    | 'pnm';

  /**
   * Metadata about the API key used for the request. Included in every response
   * whenever a valid API key is provided, even when the response status is not 200.
   */
  key_metadata?: ParseHandleResponse.KeyMetadata;
}

export namespace ParseHandleResponse {
  /**
   * Metadata about the API key used for the request. Included in every response
   * whenever a valid API key is provided, even when the response status is not 200.
   */
  export interface KeyMetadata {
    /**
     * The number of credits consumed by this request.
     */
    credits_consumed: number;

    /**
     * The number of credits remaining for your organization after this request.
     */
    credits_remaining: number;
  }
}

export interface ParseHandleParams {
  /**
   * Query param: Optional HTTP(S) source document URL used to resolve relative links
   * and image references. Relative references remain relative when omitted.
   */
  baseUrl?: string;

  /**
   * Query param: Optional file extension hint, such as pdf, docx, xlsx, pptx, html,
   * json, csv, md, py, rtf, jpg, png, or txt.
   */
  extension?: string;

  /**
   * Query param: Optional filename hint used to infer the extension when extension
   * is omitted.
   */
  filename?: string;

  /**
   * Query param: Include image references in Markdown output
   */
  includeImages?: boolean;

  /**
   * Query param: Preserve hyperlinks in Markdown output
   */
  includeLinks?: boolean;

  /**
   * Query param: When true for PDF inputs, detect and OCR images embedded in the
   * selected pages, inserting recognized text at each image's position in page
   * reading order while preserving the PDF text layer. pdfStart/pdfEnd limit the
   * inclusive page range. This is separate from automatic scanned-PDF OCR fallback.
   */
  ocr?: boolean;

  /**
   * Query param: Last 1-based PDF page to parse. When omitted, parsing ends at the
   * last page. Must be greater than or equal to pdfStart when both are provided.
   */
  pdfEnd?: number;

  /**
   * Query param: First 1-based PDF page to parse. When omitted, parsing starts at
   * the first page.
   */
  pdfStart?: number;

  /**
   * Query param: Shorten base64-encoded image data in the Markdown output
   */
  shortenBase64Images?: boolean;

  /**
   * Query param: Extract only the main content from HTML-like inputs
   */
  useMainContentOnly?: boolean;
}

export declare namespace Parse {
  export { type ParseHandleResponse as ParseHandleResponse, type ParseHandleParams as ParseHandleParams };
}
