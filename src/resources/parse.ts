// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { type Uploadable } from '../core/uploads';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class Parse extends APIResource {
  /**
   * Converts raw text, source code, web/data, PDF, Microsoft Office, and image bytes
   * into LLM-usable Markdown. The base request costs 1 credit. When OCR runs
   * (requires ocr=true), the entire call costs 5 credits; ocr=true requests where no
   * OCR ends up running still cost 1 credit.
   */
  handle(
    body: Uploadable,
    params: ParseHandleParams,
    options?: RequestOptions,
  ): APIPromise<ParseHandleResponse> {
    const {
      extension,
      includeImages,
      includeLinks,
      ocr,
      pdf,
      shortenBase64Images,
      tags,
      useMainContentOnly,
    } = params;
    return this._client.post('/parse', {
      body: body,
      query: {
        extension,
        includeImages,
        includeLinks,
        ocr,
        pdf,
        shortenBase64Images,
        tags,
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
   * Query param: Optional file extension hint. Case-insensitive; a leading dot is
   * accepted (e.g. ".pdf").
   */
  extension?:
    | 'txt'
    | 'text'
    | 'md'
    | 'markdown'
    | 'html'
    | 'htm'
    | 'xhtml'
    | 'xml'
    | 'rss'
    | 'atom'
    | 'csv'
    | 'tsv'
    | 'yaml'
    | 'yml'
    | 'py'
    | 'java'
    | 'js'
    | 'jsx'
    | 'mjs'
    | 'cjs'
    | 'json'
    | 'jsonl'
    | 'ndjson'
    | 'php'
    | 'sh'
    | 'bash'
    | 'zsh'
    | 'fish'
    | 'rb'
    | 'ts'
    | 'tsx'
    | 'rtf'
    | 'srt'
    | 'css'
    | 'scss'
    | 'less'
    | 'styl'
    | 'sass'
    | 'svg'
    | 'pdf'
    | 'docx'
    | 'doc'
    | 'xlsx'
    | 'xlsm'
    | 'xlsb'
    | 'xltx'
    | 'xltm'
    | 'xls'
    | 'pptx'
    | 'pptm'
    | 'ppsx'
    | 'ppsm'
    | 'potx'
    | 'potm'
    | 'ppt'
    | 'pps'
    | 'pot'
    | 'jpg'
    | 'jpeg'
    | 'jpe'
    | 'png'
    | 'gif'
    | 'bmp'
    | 'tiff'
    | 'tif'
    | 'webp'
    | 'ppm'
    | 'pbm'
    | 'pgm'
    | 'pnm';

  /**
   * Query param: Include image references in Markdown output
   */
  includeImages?: boolean;

  /**
   * Query param: Preserve hyperlinks in Markdown output
   */
  includeLinks?: boolean;

  /**
   * Query param: Gates all OCR. When true, PDFs get embedded-image OCR (recognized
   * text inserted at each image's position in page reading order, preserving the
   * text layer; pdf.start/pdf.end limit the page range), scanned PDFs with no text
   * layer get full-document OCR, and raster images get their visible text
   * transcribed. When false, no OCR runs: scanned PDFs may yield no content and
   * images return only format/dimension metadata. Calls where OCR actually runs cost
   * 5 credits instead of 1.
   */
  ocr?: boolean;

  /**
   * Query param: PDF page-range controls. Use start/end to limit parsing (and OCR
   * when ocr=true) to an inclusive 1-based page range.
   */
  pdf?: ParseHandleParams.Pdf;

  /**
   * Query param: Shorten base64-encoded image data in the Markdown output
   */
  shortenBase64Images?: boolean;

  /**
   * Query param: Optional comma-separated caller-defined tags for tracking this
   * request. Tags are recorded on the request's usage log and can be used to filter
   * usage on the dashboard usage page. Up to 20 tags, each 1-50 characters.
   */
  tags?: Array<string>;

  /**
   * Query param: Extract only the main content from HTML-like inputs
   */
  useMainContentOnly?: boolean;
}

export namespace ParseHandleParams {
  /**
   * PDF page-range controls. Use start/end to limit parsing (and OCR when ocr=true)
   * to an inclusive 1-based page range.
   */
  export interface Pdf {
    /**
     * Last 1-based PDF page to parse. When omitted, parsing ends at the last page.
     * Must be greater than or equal to start when both are provided.
     */
    end?: number;

    /**
     * First 1-based PDF page to parse. When omitted, parsing starts at the first page.
     */
    start?: number;
  }
}

export declare namespace Parse {
  export { type ParseHandleResponse as ParseHandleResponse, type ParseHandleParams as ParseHandleParams };
}
