// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Web extends APIResource {
  /**
   * Scrape font information from a website including font families, usage
   * statistics, fallbacks, and element/word counts.
   */
  extractFonts(
    query: WebExtractFontsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WebExtractFontsResponse> {
    return this._client.get('/web/fonts', { query, ...options });
  }

  /**
   * Performs a crawl starting from a given URL, extracts page content as Markdown,
   * and returns results for all crawled pages.
   */
  webCrawlMd(body: WebWebCrawlMdParams, options?: RequestOptions): APIPromise<WebWebCrawlMdResponse> {
    return this._client.post('/web/crawl', { body, ...options });
  }

  /**
   * Scrapes the given URL and returns the raw HTML content of the page.
   */
  webScrapeHTML(
    query: WebWebScrapeHTMLParams,
    options?: RequestOptions,
  ): APIPromise<WebWebScrapeHTMLResponse> {
    return this._client.get('/web/scrape/html', { query, ...options });
  }

  /**
   * Scrapes all images from the given URL. Extracts images from img, svg,
   * picture/source, link, and video elements including inline SVGs, base64 data
   * URIs, and standard URLs.
   */
  webScrapeImages(
    query: WebWebScrapeImagesParams,
    options?: RequestOptions,
  ): APIPromise<WebWebScrapeImagesResponse> {
    return this._client.get('/web/scrape/images', { query, ...options });
  }

  /**
   * Scrapes the given URL into LLM usable Markdown.
   */
  webScrapeMd(query: WebWebScrapeMdParams, options?: RequestOptions): APIPromise<WebWebScrapeMdResponse> {
    return this._client.get('/web/scrape/markdown', { query, ...options });
  }

  /**
   * Crawl an entire website's sitemap and return all discovered page URLs
   */
  webScrapeSitemap(
    query: WebWebScrapeSitemapParams,
    options?: RequestOptions,
  ): APIPromise<WebWebScrapeSitemapResponse> {
    return this._client.get('/web/scrape/sitemap', { query, ...options });
  }
}

export interface WebExtractFontsResponse {
  /**
   * HTTP status code, e.g., 200
   */
  code: number;

  /**
   * The normalized domain that was processed
   */
  domain: string;

  /**
   * Array of font usage information
   */
  fonts: Array<WebExtractFontsResponse.Font>;

  /**
   * Status of the response, e.g., 'ok'
   */
  status: string;
}

export namespace WebExtractFontsResponse {
  export interface Font {
    /**
     * Array of fallback font families
     */
    fallbacks: Array<string>;

    /**
     * Font family name
     */
    font: string;

    /**
     * Number of elements using this font
     */
    num_elements: number;

    /**
     * Number of words using this font
     */
    num_words: number;

    /**
     * Percentage of elements using this font
     */
    percent_elements: number;

    /**
     * Percentage of words using this font
     */
    percent_words: number;

    /**
     * Array of CSS selectors or element types where this font is used
     */
    uses: Array<string>;
  }
}

export interface WebWebCrawlMdResponse {
  metadata: WebWebCrawlMdResponse.Metadata;

  results: Array<WebWebCrawlMdResponse.Result>;
}

export namespace WebWebCrawlMdResponse {
  export interface Metadata {
    /**
     * Maximum crawl depth reached during the crawl
     */
    maxCrawlDepth: number;

    /**
     * Number of pages that failed to crawl
     */
    numFailed: number;

    /**
     * Number of pages successfully crawled
     */
    numSucceeded: number;

    /**
     * Total number of URLs crawled
     */
    numUrls: number;
  }

  export interface Result {
    /**
     * Extracted page content as Markdown (empty string on failure)
     */
    markdown: string;

    metadata: Result.Metadata;
  }

  export namespace Result {
    export interface Metadata {
      /**
       * Depth relative to the start URL. 0 = start URL, 1 = one link away.
       */
      crawlDepth: number;

      /**
       * HTTP status code of the response
       */
      statusCode: number;

      /**
       * true if the page was fetched and parsed successfully
       */
      success: boolean;

      /**
       * The page's <title> content (empty string if unavailable)
       */
      title: string;

      /**
       * The URL that was fetched
       */
      url: string;
    }
  }
}

export interface WebWebScrapeHTMLResponse {
  /**
   * Raw HTML content of the page
   */
  html: string;

  /**
   * Indicates success
   */
  success: true;

  /**
   * The URL that was scraped
   */
  url: string;
}

export interface WebWebScrapeImagesResponse {
  /**
   * Array of scraped images
   */
  images: Array<WebWebScrapeImagesResponse.Image>;

  /**
   * Indicates success
   */
  success: true;

  /**
   * The URL that was scraped
   */
  url: string;
}

export namespace WebWebScrapeImagesResponse {
  export interface Image {
    /**
     * Alt text of the image, or null if not present
     */
    alt: string | null;

    /**
     * The HTML element the image was found in
     */
    element: 'img' | 'svg' | 'link' | 'source' | 'video' | 'css' | 'object' | 'meta' | 'background';

    /**
     * The image source - can be a URL, inline HTML (for SVGs), or a base64 data URI
     */
    src: string;

    /**
     * The type/format of the src value
     */
    type: 'url' | 'html' | 'base64';
  }
}

export interface WebWebScrapeMdResponse {
  /**
   * Page content converted to GitHub Flavored Markdown
   */
  markdown: string;

  /**
   * Indicates success
   */
  success: true;

  /**
   * The URL that was scraped
   */
  url: string;
}

export interface WebWebScrapeSitemapResponse {
  /**
   * The normalized domain that was crawled
   */
  domain: string;

  /**
   * Metadata about the sitemap crawl operation
   */
  meta: WebWebScrapeSitemapResponse.Meta;

  /**
   * Indicates success
   */
  success: true;

  /**
   * Array of discovered page URLs from the sitemap (max 500)
   */
  urls: Array<string>;
}

export namespace WebWebScrapeSitemapResponse {
  /**
   * Metadata about the sitemap crawl operation
   */
  export interface Meta {
    /**
     * Number of errors encountered during crawling
     */
    errors: number;

    /**
     * Total number of sitemap files discovered
     */
    sitemapsDiscovered: number;

    /**
     * Number of sitemap files successfully fetched and parsed
     */
    sitemapsFetched: number;

    /**
     * Number of sitemap files skipped (due to errors, timeouts, or limits)
     */
    sitemapsSkipped: number;
  }
}

export interface WebExtractFontsParams {
  /**
   * A specific URL to fetch fonts from directly, bypassing domain resolution (e.g.,
   * 'https://example.com/design-system').
   */
  directUrl?: string;

  /**
   * Domain name to extract fonts from (e.g., 'example.com', 'google.com'). The
   * domain will be automatically normalized and validated.
   */
  domain?: string;

  /**
   * Optional timeout in milliseconds for the request. If the request takes longer
   * than this value, it will be aborted with a 408 status code. Maximum allowed
   * value is 300000ms (5 minutes).
   */
  timeoutMS?: number;
}

export interface WebWebCrawlMdParams {
  /**
   * The starting URL for the crawl (must include http:// or https:// protocol)
   */
  url: string;

  /**
   * When true, follow links on subdomains of the starting URL's domain (e.g.
   * docs.example.com when starting from example.com). www and apex are always
   * treated as equivalent.
   */
  followSubdomains?: boolean;

  /**
   * Include image references in the Markdown output
   */
  includeImages?: boolean;

  /**
   * Preserve hyperlinks in the Markdown output
   */
  includeLinks?: boolean;

  /**
   * Maximum link depth from the starting URL (0 = only the starting page)
   */
  maxDepth?: number;

  /**
   * Maximum number of pages to crawl. Hard cap: 500.
   */
  maxPages?: number;

  /**
   * Truncate base64-encoded image data in the Markdown output
   */
  shortenBase64Images?: boolean;

  /**
   * Regex pattern. Only URLs matching this pattern will be followed and scraped.
   */
  urlRegex?: string;

  /**
   * Extract only the main content, stripping headers, footers, sidebars, and
   * navigation
   */
  useMainContentOnly?: boolean;
}

export interface WebWebScrapeHTMLParams {
  /**
   * Full URL to scrape (must include http:// or https:// protocol)
   */
  url: string;

  /**
   * Return a cached result if a prior scrape for the same parameters exists and is
   * younger than this many milliseconds. Defaults to 1 day (86400000 ms) when
   * omitted. Max is 30 days (2592000000 ms). Set to 0 to always scrape fresh.
   */
  maxAgeMs?: number;
}

export interface WebWebScrapeImagesParams {
  /**
   * Full URL to scrape images from (must include http:// or https:// protocol)
   */
  url: string;
}

export interface WebWebScrapeMdParams {
  /**
   * Full URL to scrape into LLM usable Markdown (must include http:// or https://
   * protocol)
   */
  url: string;

  /**
   * Include image references in Markdown output
   */
  includeImages?: boolean;

  /**
   * Preserve hyperlinks in Markdown output
   */
  includeLinks?: boolean;

  /**
   * Return a cached result if a prior scrape for the same parameters exists and is
   * younger than this many milliseconds. Defaults to 1 day (86400000 ms) when
   * omitted. Max is 30 days (2592000000 ms). Set to 0 to always scrape fresh.
   */
  maxAgeMs?: number;

  /**
   * Shorten base64-encoded image data in the Markdown output
   */
  shortenBase64Images?: boolean;

  /**
   * Extract only the main content of the page, excluding headers, footers, sidebars,
   * and navigation
   */
  useMainContentOnly?: boolean;
}

export interface WebWebScrapeSitemapParams {
  /**
   * Domain to build a sitemap for
   */
  domain: string;

  /**
   * Maximum number of links to return from the sitemap crawl. Defaults to 10,000.
   * Minimum is 1, maximum is 100,000.
   */
  maxLinks?: number;
}

export declare namespace Web {
  export {
    type WebExtractFontsResponse as WebExtractFontsResponse,
    type WebWebCrawlMdResponse as WebWebCrawlMdResponse,
    type WebWebScrapeHTMLResponse as WebWebScrapeHTMLResponse,
    type WebWebScrapeImagesResponse as WebWebScrapeImagesResponse,
    type WebWebScrapeMdResponse as WebWebScrapeMdResponse,
    type WebWebScrapeSitemapResponse as WebWebScrapeSitemapResponse,
    type WebExtractFontsParams as WebExtractFontsParams,
    type WebWebCrawlMdParams as WebWebCrawlMdParams,
    type WebWebScrapeHTMLParams as WebWebScrapeHTMLParams,
    type WebWebScrapeImagesParams as WebWebScrapeImagesParams,
    type WebWebScrapeMdParams as WebWebScrapeMdParams,
    type WebWebScrapeSitemapParams as WebWebScrapeSitemapParams,
  };
}
