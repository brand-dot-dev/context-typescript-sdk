// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Web extends APIResource {
  /**
   * Crawl a website, use the provided JSON Schema and instructions to prioritize
   * relevant internal links, and extract structured data from the selected pages.
   *
   * @example
   * ```ts
   * const response = await client.web.extract({
   *   schema: {
   *     type: 'bar',
   *     properties: 'bar',
   *     required: 'bar',
   *     additionalProperties: 'bar',
   *   },
   *   url: 'https://example.com',
   * });
   * ```
   */
  extract(body: WebExtractParams, options?: RequestOptions): APIPromise<WebExtractResponse> {
    return this._client.post('/web/extract', { body, ...options });
  }

  /**
   * Analyze a company's landing page and web search evidence to return direct
   * competitors for the same product or market.
   *
   * @example
   * ```ts
   * const response = await client.web.extractCompetitors({
   *   domain: 'xxx',
   * });
   * ```
   */
  extractCompetitors(
    query: WebExtractCompetitorsParams,
    options?: RequestOptions,
  ): APIPromise<WebExtractCompetitorsResponse> {
    return this._client.get('/web/competitors', { query, ...options });
  }

  /**
   * Scrape font information from a website including font families, usage
   * statistics, fallbacks, and element/word counts.
   *
   * @example
   * ```ts
   * const response = await client.web.extractFonts();
   * ```
   */
  extractFonts(
    query: WebExtractFontsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WebExtractFontsResponse> {
    return this._client.get('/web/fonts', { query, ...options });
  }

  /**
   * Extract a comprehensive design system from a website including colors,
   * typography, spacing, shadows, and UI components.
   *
   * @example
   * ```ts
   * const response = await client.web.extractStyleguide();
   * ```
   */
  extractStyleguide(
    query: WebExtractStyleguideParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WebExtractStyleguideResponse> {
    return this._client.get('/web/styleguide', { query, ...options });
  }

  /**
   * Capture a screenshot of a website.
   *
   * @example
   * ```ts
   * const response = await client.web.screenshot();
   * ```
   */
  screenshot(
    query: WebScreenshotParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<WebScreenshotResponse> {
    return this._client.get('/web/screenshot', { query, ...options });
  }

  /**
   * Search the web and optionally scrape each result to Markdown in one round-trip.
   *
   * @example
   * ```ts
   * const response = await client.web.search({ query: 'x' });
   * ```
   */
  search(body: WebSearchParams, options?: RequestOptions): APIPromise<WebSearchResponse> {
    return this._client.post('/web/search', { body, ...options });
  }

  /**
   * Performs a crawl starting from a given URL, extracts page content as Markdown,
   * and returns results for all crawled pages.
   *
   * @example
   * ```ts
   * const response = await client.web.webCrawlMd({
   *   url: 'https://example.com',
   * });
   * ```
   */
  webCrawlMd(body: WebWebCrawlMdParams, options?: RequestOptions): APIPromise<WebWebCrawlMdResponse> {
    return this._client.post('/web/crawl', { body, ...options });
  }

  /**
   * Scrapes the given URL and returns the raw HTML content of the page.
   *
   * @example
   * ```ts
   * const response = await client.web.webScrapeHTML({
   *   url: 'https://example.com',
   * });
   * ```
   */
  webScrapeHTML(
    query: WebWebScrapeHTMLParams,
    options?: RequestOptions,
  ): APIPromise<WebWebScrapeHTMLResponse> {
    return this._client.get('/web/scrape/html', { query, ...options });
  }

  /**
   * Extract image assets from a web page, including standard URLs, inline SVGs, data
   * URIs, responsive image sources, metadata, CSS backgrounds, video posters, and
   * embeds. The base request costs 1 credit. When enrichment is enabled, the entire
   * call costs 5 credits.
   *
   * @example
   * ```ts
   * const response = await client.web.webScrapeImages({
   *   url: 'https://example.com',
   * });
   * ```
   */
  webScrapeImages(
    query: WebWebScrapeImagesParams,
    options?: RequestOptions,
  ): APIPromise<WebWebScrapeImagesResponse> {
    return this._client.get('/web/scrape/images', { query, ...options });
  }

  /**
   * Scrapes the given URL into LLM usable Markdown. Inspect key_metadata on JSON
   * responses from a recognized API key; use error_code to distinguish stable
   * failure categories.
   *
   * ### Billing & errors
   *
   * | HTTP status | Billed?        | Meaning                                                                                  |
   * | ----------- | -------------- | ---------------------------------------------------------------------------------------- |
   * | 200         | Yes — 1 credit | Successful scrape, including a zero-length result when includeSelectors matched nothing  |
   * | 400         | No             | Invalid input, skipped PDF, or the page could not be scraped                             |
   * | 401 / 403   | No             | Invalid/disabled key, insufficient permissions, or credits exhausted; inspect error_code |
   * | 404         | No             | Target page returned or fingerprinted as not found                                       |
   * | 408         | No             | Request timed out                                                                        |
   * | 415         | No             | Unsupported content type                                                                 |
   * | 429         | No             | Per-minute rate limit exceeded; honor Retry-After                                        |
   * | 500         | No             | Internal error                                                                           |
   *
   * @example
   * ```ts
   * const response = await client.web.webScrapeMd({
   *   url: 'https://example.com',
   * });
   * ```
   */
  webScrapeMd(query: WebWebScrapeMdParams, options?: RequestOptions): APIPromise<WebWebScrapeMdResponse> {
    return this._client.get('/web/scrape/markdown', { query, ...options });
  }

  /**
   * Crawl an entire website's sitemap and return all discovered page URLs.
   *
   * @example
   * ```ts
   * const response = await client.web.webScrapeSitemap({
   *   domain: 'xxx',
   * });
   * ```
   */
  webScrapeSitemap(
    query: WebWebScrapeSitemapParams,
    options?: RequestOptions,
  ): APIPromise<WebWebScrapeSitemapResponse> {
    return this._client.get('/web/scrape/sitemap', { query, ...options });
  }
}

export interface WebExtractResponse {
  /**
   * Extracted data matching the request schema
   */
  data: { [key: string]: unknown };

  metadata: WebExtractResponse.Metadata;

  /**
   * Status of the response, e.g., 'ok'
   */
  status: string;

  /**
   * The starting URL that was analyzed
   */
  url: string;

  /**
   * List of URLs whose Markdown was used for extraction
   */
  urls_analyzed: Array<string>;

  /**
   * Metadata about the API key used for the request. Included in every response
   * whenever a valid API key is provided, even when the response status is not 200.
   */
  key_metadata?: WebExtractResponse.KeyMetadata;
}

export namespace WebExtractResponse {
  export interface Metadata {
    maxCrawlDepth: number;

    /**
     * Number of crawled pages excluded because they were anti-bot challenges, error
     * pages, or parked-domain placeholders.
     */
    numBlocked: number;

    numFailed: number;

    numSkipped: number;

    numSucceeded: number;

    numUrls: number;
  }

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

export interface WebExtractCompetitorsResponse {
  /**
   * Direct competitors ordered by relevance and confidence.
   */
  competitors: Array<WebExtractCompetitorsResponse.Competitor>;

  /**
   * Normalized input domain.
   */
  domain: string;

  /**
   * Status of the response.
   */
  status: 'ok';

  /**
   * Target company profile inferred from the landing page.
   */
  target: WebExtractCompetitorsResponse.Target;

  /**
   * Metadata about the API key used for the request. Included in every response
   * whenever a valid API key is provided, even when the response status is not 200.
   */
  key_metadata?: WebExtractCompetitorsResponse.KeyMetadata;
}

export namespace WebExtractCompetitorsResponse {
  export interface Competitor {
    /**
     * Confidence that this company is a direct competitor.
     */
    confidence: 'high' | 'medium';

    /**
     * Short description of the competitor.
     */
    description: string;

    /**
     * Competitor's normalized official domain.
     */
    domain: string;

    /**
     * Competitor company or product name.
     */
    name: string;

    /**
     * Search result URLs used as evidence for this competitor.
     */
    sourceUrls: Array<string>;

    /**
     * Competitor website URL.
     */
    url: string;
  }

  /**
   * Target company profile inferred from the landing page.
   */
  export interface Target {
    /**
     * Company or product name inferred from the landing page.
     */
    companyName: string;

    /**
     * Specific operating field, product category, or market.
     */
    field: string;

    /**
     * One-sentence description of what the target company sells and who it serves.
     */
    fieldDescription: string;

    /**
     * Resolved URL used for the landing page analysis.
     */
    websiteUrl: string;
  }

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

  /**
   * Font assets keyed by family name as it appears in the fonts array (non-generic
   * names only). Clients match entries in fonts to pick a file URL from files.
   * Omitted when no families resolve to Google or custom @font-face URLs.
   */
  fontLinks?: { [key: string]: WebExtractFontsResponse.FontLinks };

  /**
   * Metadata about the API key used for the request. Included in every response
   * whenever a valid API key is provided, even when the response status is not 200.
   */
  key_metadata?: WebExtractFontsResponse.KeyMetadata;
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

  export interface FontLinks {
    /**
     * Upright font files keyed by weight string (e.g. "400" for regular, "500",
     * "700"). Values are absolute URLs.
     */
    files: { [key: string]: string };

    type: 'google' | 'custom';

    /**
     * Google Fonts category when type is google (e.g. sans-serif, serif, monospace,
     * display, handwriting). Omitted for custom fonts when unknown.
     */
    category?: string;

    /**
     * Present when type is custom: human-readable name derived from the fontLinks key
     * (strip build/hash suffixes, split camelCase / PascalCase, normalize separators).
     * Google entries omit this.
     */
    displayName?: string;
  }

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

export interface WebExtractStyleguideResponse {
  /**
   * HTTP status code
   */
  code?: number;

  /**
   * The normalized domain that was processed
   */
  domain?: string;

  /**
   * Metadata about the API key used for the request. Included in every response
   * whenever a valid API key is provided, even when the response status is not 200.
   */
  key_metadata?: WebExtractStyleguideResponse.KeyMetadata;

  /**
   * Status of the response, e.g., 'ok'
   */
  status?: string;

  /**
   * Comprehensive styleguide data extracted from the website
   */
  styleguide?: WebExtractStyleguideResponse.Styleguide;
}

export namespace WebExtractStyleguideResponse {
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

  /**
   * Comprehensive styleguide data extracted from the website
   */
  export interface Styleguide {
    /**
     * Primary colors used on the website
     */
    colors: Styleguide.Colors;

    /**
     * UI component styles
     */
    components: Styleguide.Components;

    /**
     * Spacing system used on the website
     */
    elementSpacing: Styleguide.ElementSpacing;

    /**
     * Font assets keyed by family name as it appears in fontFamily/fontFallbacks
     * (non-generic names only). Clients match typography.fontFamily / fontWeight or
     * button styles to pick a file URL from files.
     */
    fontLinks: { [key: string]: Styleguide.FontLinks };

    /**
     * The primary color mode of the website design
     */
    mode: 'light' | 'dark';

    /**
     * Shadow styles used on the website
     */
    shadows: Styleguide.Shadows;

    /**
     * Typography styles used on the website
     */
    typography: Styleguide.Typography;
  }

  export namespace Styleguide {
    /**
     * Primary colors used on the website
     */
    export interface Colors {
      /**
       * Accent color (hex format)
       */
      accent: string;

      /**
       * Background color (hex format)
       */
      background: string;

      /**
       * Text color (hex format)
       */
      text: string;
    }

    /**
     * UI component styles
     */
    export interface Components {
      /**
       * Button component styles
       */
      button: Components.Button;

      /**
       * Card component style
       */
      card?: Components.Card;
    }

    export namespace Components {
      /**
       * Button component styles
       */
      export interface Button {
        link?: Button.Link;

        primary?: Button.Primary;

        secondary?: Button.Secondary;
      }

      export namespace Button {
        export interface Link {
          backgroundColor: string;

          /**
           * Border color as CSS hex (#RRGGBB or #RRGGBBAA when computed border-color has
           * alpha)
           */
          borderColor: string;

          borderRadius: string;

          borderStyle: string;

          borderWidth: string;

          /**
           * Computed box-shadow (comma-separated layers when present)
           */
          boxShadow: string;

          color: string;

          /**
           * Ready-to-use CSS declaration block for this component style
           */
          css: string;

          fontSize: string;

          fontWeight: number;

          /**
           * Sampled minimum height of the button box (typically px)
           */
          minHeight: string;

          /**
           * Sampled minimum width of the button box (typically px)
           */
          minWidth: string;

          padding: string;

          textDecoration: string;

          /**
           * Full ordered font list from computed font-family
           */
          fontFallbacks?: Array<string>;

          /**
           * Primary button typeface (first in fontFallbacks)
           */
          fontFamily?: string;

          /**
           * Hex color of the underline when it differs from the text color
           */
          textDecorationColor?: string;
        }

        export interface Primary {
          backgroundColor: string;

          /**
           * Border color as CSS hex (#RRGGBB or #RRGGBBAA when computed border-color has
           * alpha)
           */
          borderColor: string;

          borderRadius: string;

          borderStyle: string;

          borderWidth: string;

          /**
           * Computed box-shadow (comma-separated layers when present)
           */
          boxShadow: string;

          color: string;

          /**
           * Ready-to-use CSS declaration block for this component style
           */
          css: string;

          fontSize: string;

          fontWeight: number;

          /**
           * Sampled minimum height of the button box (typically px)
           */
          minHeight: string;

          /**
           * Sampled minimum width of the button box (typically px)
           */
          minWidth: string;

          padding: string;

          textDecoration: string;

          /**
           * Full ordered font list from computed font-family
           */
          fontFallbacks?: Array<string>;

          /**
           * Primary button typeface (first in fontFallbacks)
           */
          fontFamily?: string;

          /**
           * Hex color of the underline when it differs from the text color
           */
          textDecorationColor?: string;
        }

        export interface Secondary {
          backgroundColor: string;

          /**
           * Border color as CSS hex (#RRGGBB or #RRGGBBAA when computed border-color has
           * alpha)
           */
          borderColor: string;

          borderRadius: string;

          borderStyle: string;

          borderWidth: string;

          /**
           * Computed box-shadow (comma-separated layers when present)
           */
          boxShadow: string;

          color: string;

          /**
           * Ready-to-use CSS declaration block for this component style
           */
          css: string;

          fontSize: string;

          fontWeight: number;

          /**
           * Sampled minimum height of the button box (typically px)
           */
          minHeight: string;

          /**
           * Sampled minimum width of the button box (typically px)
           */
          minWidth: string;

          padding: string;

          textDecoration: string;

          /**
           * Full ordered font list from computed font-family
           */
          fontFallbacks?: Array<string>;

          /**
           * Primary button typeface (first in fontFallbacks)
           */
          fontFamily?: string;

          /**
           * Hex color of the underline when it differs from the text color
           */
          textDecorationColor?: string;
        }
      }

      /**
       * Card component style
       */
      export interface Card {
        backgroundColor: string;

        /**
         * Border color as CSS hex (#RRGGBB or #RRGGBBAA when computed border-color has
         * alpha)
         */
        borderColor: string;

        borderRadius: string;

        borderStyle: string;

        borderWidth: string;

        boxShadow: string;

        /**
         * Ready-to-use CSS declaration block for this component style
         */
        css: string;

        padding: string;

        textColor: string;
      }
    }

    /**
     * Spacing system used on the website
     */
    export interface ElementSpacing {
      lg: string;

      md: string;

      sm: string;

      xl: string;

      xs: string;
    }

    export interface FontLinks {
      /**
       * Upright font files keyed by weight string (e.g. "400" for regular, "500",
       * "700"). Values are absolute URLs.
       */
      files: { [key: string]: string };

      type: 'google' | 'custom';

      /**
       * Google Fonts category when type is google (e.g. sans-serif, serif, monospace,
       * display, handwriting). Omitted for custom fonts when unknown.
       */
      category?: string;

      /**
       * Present when type is custom: human-readable name derived from the fontLinks key
       * (strip build/hash suffixes, split camelCase / PascalCase, normalize separators).
       * Google entries omit this.
       */
      displayName?: string;
    }

    /**
     * Shadow styles used on the website
     */
    export interface Shadows {
      inner: string;

      lg: string;

      md: string;

      sm: string;

      xl: string;
    }

    /**
     * Typography styles used on the website
     */
    export interface Typography {
      /**
       * Heading styles
       */
      headings: Typography.Headings;

      p?: Typography.P;
    }

    export namespace Typography {
      /**
       * Heading styles
       */
      export interface Headings {
        h1?: Headings.H1;

        h2?: Headings.H2;

        h3?: Headings.H3;

        h4?: Headings.H4;
      }

      export namespace Headings {
        export interface H1 {
          /**
           * Full ordered font list from resolved computed font-family
           */
          fontFallbacks: Array<string>;

          /**
           * Primary face (first family in the computed stack)
           */
          fontFamily: string;

          fontSize: string;

          fontWeight: number;

          letterSpacing: string;

          lineHeight: string;
        }

        export interface H2 {
          /**
           * Full ordered font list from resolved computed font-family
           */
          fontFallbacks: Array<string>;

          /**
           * Primary face (first family in the computed stack)
           */
          fontFamily: string;

          fontSize: string;

          fontWeight: number;

          letterSpacing: string;

          lineHeight: string;
        }

        export interface H3 {
          /**
           * Full ordered font list from resolved computed font-family
           */
          fontFallbacks: Array<string>;

          /**
           * Primary face (first family in the computed stack)
           */
          fontFamily: string;

          fontSize: string;

          fontWeight: number;

          letterSpacing: string;

          lineHeight: string;
        }

        export interface H4 {
          /**
           * Full ordered font list from resolved computed font-family
           */
          fontFallbacks: Array<string>;

          /**
           * Primary face (first family in the computed stack)
           */
          fontFamily: string;

          fontSize: string;

          fontWeight: number;

          letterSpacing: string;

          lineHeight: string;
        }
      }

      export interface P {
        /**
         * Full ordered font list from resolved computed font-family
         */
        fontFallbacks: Array<string>;

        /**
         * Primary face (first family in the computed stack)
         */
        fontFamily: string;

        fontSize: string;

        fontWeight: number;

        letterSpacing: string;

        lineHeight: string;
      }
    }
  }
}

export interface WebScreenshotResponse {
  /**
   * HTTP status code
   */
  code?: number;

  /**
   * The normalized domain that was processed
   */
  domain?: string;

  /**
   * Height in pixels of the returned screenshot image
   */
  height?: number;

  /**
   * Metadata about the API key used for the request. Included in every response
   * whenever a valid API key is provided, even when the response status is not 200.
   */
  key_metadata?: WebScreenshotResponse.KeyMetadata;

  /**
   * Public URL of the uploaded screenshot image
   */
  screenshot?: string;

  /**
   * Type of screenshot that was captured
   */
  screenshotType?: 'viewport' | 'fullPage';

  /**
   * Status of the response, e.g., 'ok'
   */
  status?: string;

  /**
   * Width in pixels of the returned screenshot image
   */
  width?: number;
}

export namespace WebScreenshotResponse {
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

export interface WebSearchResponse {
  /**
   * Echo of the original query (useful when fanout was enabled).
   */
  query: string;

  results: Array<WebSearchResponse.Result>;

  /**
   * Metadata about the API key used for the request. Included in every response
   * whenever a valid API key is provided, even when the response status is not 200.
   */
  key_metadata?: WebSearchResponse.KeyMetadata;
}

export namespace WebSearchResponse {
  export interface Result {
    /**
     * Snippet excerpt from the page.
     */
    description: string;

    /**
     * Markdown scrape status and content for this result.
     */
    markdown: Result.Markdown;

    /**
     * Relevance to the original query.
     */
    relevance: 'high' | 'medium' | 'low';

    /**
     * Page title.
     */
    title: string;

    /**
     * Canonical result URL.
     */
    url: string;
  }

  export namespace Result {
    /**
     * Markdown scrape status and content for this result.
     */
    export interface Markdown {
      /**
       * Per-result scrape outcome. Inspect this before reading `markdown`.
       */
      code: 'SUCCESS' | 'NOT_REQUESTED' | 'TIMEOUT' | 'WEBSITE_ACCESS_ERROR' | 'ERROR';

      /**
       * GFM Markdown of the page. Null unless markdownOptions.enabled is true and
       * scraping succeeded.
       */
      markdown: string | null;
    }
  }

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

export interface WebWebCrawlMdResponse {
  metadata: WebWebCrawlMdResponse.Metadata;

  results: Array<WebWebCrawlMdResponse.Result>;

  /**
   * Metadata about the API key used for the request. Included in every response
   * whenever a valid API key is provided, even when the response status is not 200.
   */
  key_metadata?: WebWebCrawlMdResponse.KeyMetadata;
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
     * Number of URLs skipped (PDFs when pdf.shouldParse=false, or URLs not matching
     * urlRegex)
     */
    numSkipped: number;

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
       * Final URL scraped after redirects or scraper fallback, when known. Falls back to
       * sourceUrl when unavailable.
       */
      finalUrl: string;

      /**
       * Original URL requested by the caller.
       */
      sourceUrl: string;

      /**
       * HTTP status code of the response
       */
      statusCode: number;

      /**
       * true if the page was fetched and parsed successfully
       */
      success: boolean;

      /**
       * Best page title extracted from the page (empty string if unavailable).
       */
      title: string;

      /**
       * The crawl URL fetched for this page.
       */
      url: string;

      /**
       * Additional non-social meta tags not promoted to top-level metadata fields.
       */
      additionalMeta?: { [key: string]: string | Array<string> };

      /**
       * Resolved alternate links from link rel=alternate tags.
       */
      alternates?: Array<Metadata.Alternate>;

      /**
       * Author metadata, when present.
       */
      author?: string;

      /**
       * Resolved canonical URL, when present.
       */
      canonicalUrl?: string;

      /**
       * Best description extracted from standard, Open Graph, or Twitter metadata.
       */
      description?: string;

      /**
       * Resolved favicon URL, when present.
       */
      favicon?: string;

      /**
       * Primary resolved preview image from Open Graph, Twitter, or image metadata.
       */
      image?: string;

      /**
       * JSON-LD structured data blocks parsed from the page.
       */
      jsonLd?: Array<{ [key: string]: unknown }>;

      /**
       * Keywords extracted from the page's keywords meta tag.
       */
      keywords?: Array<string>;

      /**
       * Language extracted from html lang or language meta tags.
       */
      language?: string;

      /**
       * Modified timestamp/date from page metadata, when present.
       */
      modifiedTime?: string;

      /**
       * Open Graph metadata with the og: prefix removed and keys camel-cased.
       */
      openGraph?: { [key: string]: string | Array<string> };

      /**
       * Published timestamp/date from page metadata, when present.
       */
      publishedTime?: string;

      /**
       * Robots meta directive, when present.
       */
      robots?: string;

      /**
       * Site or application name from page metadata.
       */
      siteName?: string;

      /**
       * Twitter card metadata with the twitter: prefix removed and keys camel-cased.
       */
      twitter?: { [key: string]: string | Array<string> };
    }

    export namespace Metadata {
      export interface Alternate {
        /**
         * Resolved alternate URL.
         */
        href: string;

        /**
         * Language or locale for the alternate URL, when present.
         */
        hreflang?: string;

        /**
         * Alternate resource title, when present.
         */
        title?: string;

        /**
         * Alternate resource MIME type, when present.
         */
        type?: string;
      }
    }
  }

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

export interface WebWebScrapeHTMLResponse {
  /**
   * The scraped content of the page. For normal pages this is the raw HTML. When the
   * page is a sitemap or feed served behind an XSL stylesheet (which browsers render
   * into HTML), this is the underlying XML instead — see the `type` field.
   */
  html: string;

  /**
   * Metadata extracted from the scraped page HTML.
   */
  metadata: WebWebScrapeHTMLResponse.Metadata;

  /**
   * Indicates success
   */
  success: true;

  /**
   * Detected content type of the returned `html` field. Sitemaps and feeds are
   * surfaced as `xml`; ordinary pages are `html`. Excel workbooks are surfaced as
   * `xlsx`/`xls` with the extracted sheets as HTML tables; PowerPoint presentations
   * are surfaced as `pptx`/`ppt` with the extracted slides as HTML.
   */
  type:
    | 'html'
    | 'xml'
    | 'json'
    | 'text'
    | 'csv'
    | 'markdown'
    | 'svg'
    | 'pdf'
    | 'docx'
    | 'doc'
    | 'xlsx'
    | 'xls'
    | 'pptx'
    | 'ppt';

  /**
   * The URL that was scraped
   */
  url: string;

  /**
   * Metadata about the API key used for the request. Included in every response
   * whenever a valid API key is provided, even when the response status is not 200.
   */
  key_metadata?: WebWebScrapeHTMLResponse.KeyMetadata;
}

export namespace WebWebScrapeHTMLResponse {
  /**
   * Metadata extracted from the scraped page HTML.
   */
  export interface Metadata {
    /**
     * Final URL scraped after redirects or scraper fallback, when known. Falls back to
     * sourceUrl when unavailable.
     */
    finalUrl: string;

    /**
     * Original URL requested by the caller.
     */
    sourceUrl: string;

    /**
     * Additional non-social meta tags not promoted to top-level metadata fields.
     */
    additionalMeta?: { [key: string]: string | Array<string> };

    /**
     * Resolved alternate links from link rel=alternate tags.
     */
    alternates?: Array<Metadata.Alternate>;

    /**
     * Author metadata, when present.
     */
    author?: string;

    /**
     * Resolved canonical URL, when present.
     */
    canonicalUrl?: string;

    /**
     * Best description extracted from standard, Open Graph, or Twitter metadata.
     */
    description?: string;

    /**
     * Resolved favicon URL, when present.
     */
    favicon?: string;

    /**
     * Primary resolved preview image from Open Graph, Twitter, or image metadata.
     */
    image?: string;

    /**
     * JSON-LD structured data blocks parsed from the page.
     */
    jsonLd?: Array<{ [key: string]: unknown }>;

    /**
     * Keywords extracted from the page's keywords meta tag.
     */
    keywords?: Array<string>;

    /**
     * Language extracted from html lang or language meta tags.
     */
    language?: string;

    /**
     * Modified timestamp/date from page metadata, when present.
     */
    modifiedTime?: string;

    /**
     * Open Graph metadata with the og: prefix removed and keys camel-cased.
     */
    openGraph?: { [key: string]: string | Array<string> };

    /**
     * Published timestamp/date from page metadata, when present.
     */
    publishedTime?: string;

    /**
     * Robots meta directive, when present.
     */
    robots?: string;

    /**
     * Site or application name from page metadata.
     */
    siteName?: string;

    /**
     * Best title extracted from the page.
     */
    title?: string;

    /**
     * Twitter card metadata with the twitter: prefix removed and keys camel-cased.
     */
    twitter?: { [key: string]: string | Array<string> };
  }

  export namespace Metadata {
    export interface Alternate {
      /**
       * Resolved alternate URL.
       */
      href: string;

      /**
       * Language or locale for the alternate URL, when present.
       */
      hreflang?: string;

      /**
       * Alternate resource title, when present.
       */
      title?: string;

      /**
       * Alternate resource MIME type, when present.
       */
      type?: string;
    }
  }

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

export interface WebWebScrapeImagesResponse {
  /**
   * Images found on the page.
   */
  images: Array<WebWebScrapeImagesResponse.Image>;

  /**
   * Always true on success.
   */
  success: true;

  /**
   * Page URL that was scraped.
   */
  url: string;

  /**
   * Metadata about the API key used for the request. Included in every response
   * whenever a valid API key is provided, even when the response status is not 200.
   */
  key_metadata?: WebWebScrapeImagesResponse.KeyMetadata;
}

export namespace WebWebScrapeImagesResponse {
  export interface Image {
    /**
     * Image alt text, or null when unavailable.
     */
    alt: string | null;

    /**
     * Where the image was found.
     */
    element: 'img' | 'svg' | 'link' | 'source' | 'video' | 'css' | 'object' | 'meta' | 'background';

    /**
     * Original image value: URL, inline SVG or HTML, or base64 data URI.
     */
    src: string;

    /**
     * Format of src.
     */
    type: 'url' | 'html' | 'base64';

    /**
     * Requested metadata for images that could be processed.
     */
    enrichment?: Image.Enrichment;
  }

  export namespace Image {
    /**
     * Requested metadata for images that could be processed.
     */
    export interface Enrichment {
      /**
       * Image height in pixels, when measured.
       */
      height?: number;

      /**
       * Detected MIME type, when hosted.
       */
      mimetype?: string;

      /**
       * Visual asset category, when classified.
       */
      type?: 'photography' | 'illustration' | 'logo' | 'wordmark' | 'icon' | 'pattern' | 'graphic' | 'other';

      /**
       * Brand.dev CDN URL, when hosted.
       */
      url?: string;

      /**
       * Image width in pixels, when measured.
       */
      width?: number;
    }
  }

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

export interface WebWebScrapeMdResponse {
  /**
   * UTF-8 byte length of the returned Markdown. Use 0 to identify an empty result
   * and compare small values against your workload's minimum useful-content
   * threshold.
   */
  contentLength: number;

  /**
   * Page content converted to GitHub Flavored Markdown
   */
  markdown: string;

  /**
   * Metadata extracted from the scraped page HTML.
   */
  metadata: WebWebScrapeMdResponse.Metadata;

  /**
   * Indicates success
   */
  success: true;

  /**
   * The URL that was scraped
   */
  url: string;

  /**
   * Metadata about the API key used for the request. Included in every response
   * whenever a valid API key is provided, even when the response status is not 200.
   */
  key_metadata?: WebWebScrapeMdResponse.KeyMetadata;
}

export namespace WebWebScrapeMdResponse {
  /**
   * Metadata extracted from the scraped page HTML.
   */
  export interface Metadata {
    /**
     * Final URL scraped after redirects or scraper fallback, when known. Falls back to
     * sourceUrl when unavailable.
     */
    finalUrl: string;

    /**
     * Original URL requested by the caller.
     */
    sourceUrl: string;

    /**
     * Additional non-social meta tags not promoted to top-level metadata fields.
     */
    additionalMeta?: { [key: string]: string | Array<string> };

    /**
     * Resolved alternate links from link rel=alternate tags.
     */
    alternates?: Array<Metadata.Alternate>;

    /**
     * Author metadata, when present.
     */
    author?: string;

    /**
     * Resolved canonical URL, when present.
     */
    canonicalUrl?: string;

    /**
     * Best description extracted from standard, Open Graph, or Twitter metadata.
     */
    description?: string;

    /**
     * Resolved favicon URL, when present.
     */
    favicon?: string;

    /**
     * Primary resolved preview image from Open Graph, Twitter, or image metadata.
     */
    image?: string;

    /**
     * JSON-LD structured data blocks parsed from the page.
     */
    jsonLd?: Array<{ [key: string]: unknown }>;

    /**
     * Keywords extracted from the page's keywords meta tag.
     */
    keywords?: Array<string>;

    /**
     * Language extracted from html lang or language meta tags.
     */
    language?: string;

    /**
     * Modified timestamp/date from page metadata, when present.
     */
    modifiedTime?: string;

    /**
     * Open Graph metadata with the og: prefix removed and keys camel-cased.
     */
    openGraph?: { [key: string]: string | Array<string> };

    /**
     * Published timestamp/date from page metadata, when present.
     */
    publishedTime?: string;

    /**
     * Robots meta directive, when present.
     */
    robots?: string;

    /**
     * Site or application name from page metadata.
     */
    siteName?: string;

    /**
     * Best title extracted from the page.
     */
    title?: string;

    /**
     * Twitter card metadata with the twitter: prefix removed and keys camel-cased.
     */
    twitter?: { [key: string]: string | Array<string> };
  }

  export namespace Metadata {
    export interface Alternate {
      /**
       * Resolved alternate URL.
       */
      href: string;

      /**
       * Language or locale for the alternate URL, when present.
       */
      hreflang?: string;

      /**
       * Alternate resource title, when present.
       */
      title?: string;

      /**
       * Alternate resource MIME type, when present.
       */
      type?: string;
    }
  }

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

  /**
   * Metadata about the API key used for the request. Included in every response
   * whenever a valid API key is provided, even when the response status is not 200.
   */
  key_metadata?: WebWebScrapeSitemapResponse.KeyMetadata;
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

export interface WebExtractParams {
  /**
   * JSON Schema for the returned data object. TypeScript Zod users can pass a JSON
   * Schema generated from a Zod object; Python users can pass the equivalent JSON
   * Schema object.
   */
  schema: { [key: string]: unknown };

  /**
   * The starting website URL to crawl and extract from. Must include http:// or
   * https://.
   */
  url: string;

  /**
   * When true, every returned value must be grounded in facts stated on the page;
   * fields that cannot be supported by the page are returned as null/empty. When
   * false (default), the model may make reasonable inferences and derivations from
   * the page content (e.g. ideal customer, competitor analysis, recommendations)
   * while keeping verifiable specifics (names, quotes, URLs, dates, metrics)
   * faithful to the source.
   */
  factCheck?: boolean;

  /**
   * When true, follow links on subdomains of the starting URL's domain.
   */
  followSubdomains?: boolean;

  /**
   * When true, iframe contents are included in Markdown before extraction.
   */
  includeFrames?: boolean;

  /**
   * Optional extraction guidance, such as which facts to prioritize or how to
   * interpret fields in the schema.
   */
  instructions?: string;

  /**
   * Return cached scrape results if a prior scrape for the same parameters is
   * younger than this many milliseconds. Defaults to 7 days (604800000 ms).
   */
  maxAgeMs?: number;

  /**
   * Optional maximum link depth from the starting URL (0 = only the starting page).
   * If omitted, there is no crawl depth limit.
   */
  maxDepth?: number;

  /**
   * Maximum number of pages to analyze for extraction. Hard cap: 50. Defaults to 5.
   */
  maxPages?: number;

  pdf?: WebExtractParams.Pdf;

  /**
   * Soft time budget for the crawl in milliseconds. Min: 10000 (10s). Max: 110000
   * (110s). Default: 80000 (80s).
   */
  stopAfterMs?: number;

  /**
   * Optional caller-defined tags for tracking this request. Tags are recorded on the
   * request's usage log and can be used to filter usage on the dashboard usage page.
   * Up to 20 tags, each 1-50 characters.
   */
  tags?: Array<string>;

  /**
   * Optional timeout in milliseconds for the request. If the request takes longer
   * than this value, it will be aborted with a 408 status code. Maximum allowed
   * value is 300000ms (5 minutes).
   */
  timeoutMS?: number;

  /**
   * Optional browser wait time in milliseconds after initial page load for each
   * crawled page.
   */
  waitForMs?: number;
}

export namespace WebExtractParams {
  export interface Pdf {
    /**
     * Last 1-based PDF page to parse. Must be greater than or equal to start when both
     * are provided.
     */
    end?: number;

    /**
     * When true, PDF pages are fetched and parsed. When false, PDF pages are skipped.
     */
    shouldParse?: boolean;

    /**
     * First 1-based PDF page to parse.
     */
    start?: number;
  }
}

export interface WebExtractCompetitorsParams {
  /**
   * Company domain to analyze, such as `stripe.com`. Full http(s) URLs are accepted
   * and normalized to their domain.
   */
  domain: string;

  /**
   * Exact number of direct competitors to return. Defaults to 5.
   */
  numCompetitors?: number;

  /**
   * Optional comma-separated caller-defined tags for tracking this request. Tags are
   * recorded on the request's usage log and can be used to filter usage on the
   * dashboard usage page. Up to 20 tags, each 1-50 characters.
   */
  tags?: Array<string>;

  /**
   * Optional timeout in milliseconds for the request. If the request takes longer
   * than this value, it will be aborted with a 408 status code. Maximum allowed
   * value is 300000ms (5 minutes).
   */
  timeoutMS?: number;
}

export interface WebExtractFontsParams {
  /**
   * A specific URL to fetch fonts from directly, bypassing domain resolution (e.g.,
   * 'https://example.com/design-system'). When provided, fonts are extracted from
   * this exact URL. You must provide either 'domain' or 'directUrl', but not both.
   */
  directUrl?: string;

  /**
   * Domain name to extract fonts from (e.g., 'example.com', 'google.com'). The
   * domain will be automatically normalized and validated. You must provide either
   * 'domain' or 'directUrl', but not both.
   */
  domain?: string;

  /**
   * Maximum age in milliseconds for cached brand data before the API performs a hard
   * refresh. Defaults to 3 months (7776000000 ms). Values below 1 day (86400000 ms)
   * are clamped to 1 day; values above 1 year (31536000000 ms) are clamped to 1
   * year.
   */
  maxAgeMs?: number | null;

  /**
   * Optional comma-separated caller-defined tags for tracking this request. Tags are
   * recorded on the request's usage log and can be used to filter usage on the
   * dashboard usage page. Up to 20 tags, each 1-50 characters.
   */
  tags?: Array<string>;

  /**
   * Optional timeout in milliseconds for the request. If the request takes longer
   * than this value, it will be aborted with a 408 status code. Maximum allowed
   * value is 300000ms (5 minutes).
   */
  timeoutMS?: number;
}

export interface WebExtractStyleguideParams {
  /**
   * Optional browser color scheme to emulate for websites that respond to
   * prefers-color-scheme. This value is part of the styleguide cache key.
   */
  colorScheme?: 'light' | 'dark';

  /**
   * A specific URL to fetch the styleguide from directly, bypassing domain
   * resolution (e.g., 'https://example.com/design-system'). When provided, the
   * styleguide is extracted from this exact URL. You must provide either 'domain' or
   * 'directUrl', but not both.
   */
  directUrl?: string;

  /**
   * Domain name to extract styleguide from (e.g., 'example.com', 'google.com'). The
   * domain will be automatically normalized and validated. You must provide either
   * 'domain' or 'directUrl', but not both.
   */
  domain?: string;

  /**
   * Maximum age in milliseconds for cached brand data before the API performs a hard
   * refresh. Defaults to 3 months (7776000000 ms). Values below 1 day (86400000 ms)
   * are clamped to 1 day; values above 1 year (31536000000 ms) are clamped to 1
   * year.
   */
  maxAgeMs?: number | null;

  /**
   * Optional comma-separated caller-defined tags for tracking this request. Tags are
   * recorded on the request's usage log and can be used to filter usage on the
   * dashboard usage page. Up to 20 tags, each 1-50 characters.
   */
  tags?: Array<string>;

  /**
   * Optional timeout in milliseconds for the request. If the request takes longer
   * than this value, it will be aborted with a 408 status code. Maximum allowed
   * value is 300000ms (5 minutes).
   */
  timeoutMS?: number;
}

export interface WebScreenshotParams {
  /**
   * Optional parameter to choose the site's visual theme in the screenshot. Use
   * 'light' or 'dark' when the site offers both appearances.
   */
  colorScheme?: 'light' | 'dark';

  /**
   * Two-letter ISO 3166-1 alpha-2 country code identifying a supported Context.dev
   * residential proxy exit location. Must be one of Context.dev's supported
   * countries. When provided, Context.dev fetches the target page from that country.
   */
  country?:
    | 'ad'
    | 'ae'
    | 'af'
    | 'ag'
    | 'ai'
    | 'al'
    | 'am'
    | 'ao'
    | 'ar'
    | 'at'
    | 'au'
    | 'aw'
    | 'az'
    | 'ba'
    | 'bb'
    | 'bd'
    | 'be'
    | 'bf'
    | 'bg'
    | 'bh'
    | 'bi'
    | 'bj'
    | 'bm'
    | 'bn'
    | 'bo'
    | 'bq'
    | 'br'
    | 'bs'
    | 'bw'
    | 'by'
    | 'bz'
    | 'ca'
    | 'cd'
    | 'cf'
    | 'cg'
    | 'ch'
    | 'ci'
    | 'cl'
    | 'cm'
    | 'cn'
    | 'co'
    | 'cr'
    | 'cv'
    | 'cw'
    | 'cy'
    | 'cz'
    | 'de'
    | 'dj'
    | 'dk'
    | 'dm'
    | 'do'
    | 'dz'
    | 'ec'
    | 'ee'
    | 'eg'
    | 'es'
    | 'et'
    | 'fi'
    | 'fj'
    | 'fr'
    | 'ga'
    | 'gb'
    | 'gd'
    | 'ge'
    | 'gf'
    | 'gg'
    | 'gh'
    | 'gm'
    | 'gn'
    | 'gp'
    | 'gq'
    | 'gr'
    | 'gt'
    | 'gu'
    | 'gw'
    | 'gy'
    | 'hk'
    | 'hn'
    | 'hr'
    | 'ht'
    | 'hu'
    | 'id'
    | 'ie'
    | 'il'
    | 'im'
    | 'in'
    | 'iq'
    | 'ir'
    | 'is'
    | 'it'
    | 'je'
    | 'jm'
    | 'jo'
    | 'jp'
    | 'ke'
    | 'kg'
    | 'kh'
    | 'kn'
    | 'kr'
    | 'kw'
    | 'ky'
    | 'kz'
    | 'la'
    | 'lb'
    | 'lc'
    | 'lk'
    | 'lr'
    | 'ls'
    | 'lt'
    | 'lu'
    | 'lv'
    | 'ly'
    | 'ma'
    | 'mc'
    | 'md'
    | 'me'
    | 'mf'
    | 'mg'
    | 'mk'
    | 'ml'
    | 'mm'
    | 'mn'
    | 'mo'
    | 'mq'
    | 'mr'
    | 'mt'
    | 'mu'
    | 'mv'
    | 'mw'
    | 'mx'
    | 'my'
    | 'mz'
    | 'na'
    | 'nc'
    | 'ne'
    | 'ng'
    | 'ni'
    | 'nl'
    | 'no'
    | 'np'
    | 'nz'
    | 'om'
    | 'pa'
    | 'pe'
    | 'pf'
    | 'pg'
    | 'ph'
    | 'pk'
    | 'pl'
    | 'pr'
    | 'ps'
    | 'pt'
    | 'py'
    | 'qa'
    | 're'
    | 'ro'
    | 'rs'
    | 'ru'
    | 'rw'
    | 'sa'
    | 'sc'
    | 'sd'
    | 'se'
    | 'sg'
    | 'si'
    | 'sk'
    | 'sl'
    | 'sm'
    | 'sn'
    | 'so'
    | 'sr'
    | 'ss'
    | 'st'
    | 'sv'
    | 'sx'
    | 'sy'
    | 'sz'
    | 'tc'
    | 'td'
    | 'tg'
    | 'th'
    | 'tj'
    | 'tl'
    | 'tm'
    | 'tn'
    | 'tr'
    | 'tt'
    | 'tw'
    | 'tz'
    | 'ua'
    | 'ug'
    | 'us'
    | 'uy'
    | 'uz'
    | 'vc'
    | 've'
    | 'vg'
    | 'vi'
    | 'vn'
    | 'ye'
    | 'yt'
    | 'za'
    | 'zm'
    | 'zw';

  /**
   * A specific URL to screenshot directly, bypassing domain resolution (e.g.,
   * 'https://example.com/pricing'). When provided, the screenshot is taken of this
   * exact URL. You must provide either 'domain' or 'directUrl', but not both.
   */
  directUrl?: string;

  /**
   * Domain name to take screenshot of (e.g., 'example.com', 'google.com'). The
   * domain will be automatically normalized and validated. You must provide either
   * 'domain' or 'directUrl', but not both.
   */
  domain?: string;

  /**
   * Optional parameter to determine screenshot type. If 'true', takes a full page
   * screenshot capturing all content. If 'false' or not provided, takes a viewport
   * screenshot (standard browser view).
   */
  fullScreenshot?: 'true' | 'false';

  /**
   * Optional parameter to control cookie/consent popup handling. If 'true', we
   * dismiss cookie banner before capture. If 'false' or not provided, captures the
   * page without that step.
   */
  handleCookiePopup?: boolean | 'true' | 'false';

  /**
   * Return a cached screenshot if a prior screenshot for the same parameters exists
   * and is younger than this many milliseconds. Defaults to 1 day (86400000 ms) when
   * omitted. Max is 30 days (2592000000 ms). Set to 0 to always capture fresh.
   */
  maxAgeMs?: number | null;

  /**
   * Optional parameter to specify which page type to screenshot. If provided, the
   * system will scrape the domain's links and use heuristics to find the most
   * appropriate URL for the specified page type (30 supported languages). If not
   * provided, screenshots the main domain landing page. Only applicable when using
   * 'domain', not 'directUrl'.
   */
  page?: 'login' | 'signup' | 'blog' | 'careers' | 'pricing' | 'terms' | 'privacy' | 'contact';

  /**
   * Optional vertical scroll offset in pixels for capturing a long page in
   * viewport-sized chunks. When provided, the full page is captured once and the
   * returned image is the viewport-sized slice that begins at this Y offset (e.g.
   * request scrollOffset=0, then 1080, then 2160 to walk a 1920x1080 landing page
   * top to bottom). The final slice may be shorter than the viewport height. Takes
   * precedence over fullScreenshot. Max: 100000.
   */
  scrollOffset?: number | null;

  /**
   * Optional comma-separated caller-defined tags for tracking this request. Tags are
   * recorded on the request's usage log and can be used to filter usage on the
   * dashboard usage page. Up to 20 tags, each 1-50 characters.
   */
  tags?: Array<string>;

  /**
   * Optional timeout in milliseconds for the request. If the request takes longer
   * than this value, it will be aborted with a 408 status code. Maximum allowed
   * value is 300000ms (5 minutes).
   */
  timeoutMS?: number;

  /**
   * Optional browser viewport dimensions for the screenshot. Defaults to 1920x1080.
   */
  viewport?: WebScreenshotParams.Viewport;

  /**
   * Optional browser wait time in milliseconds after initial page load before taking
   * the screenshot. Min: 0. Max: 30000 (30 seconds). Defaults to 3000 ms when
   * omitted.
   */
  waitForMs?: number | null;
}

export namespace WebScreenshotParams {
  /**
   * Optional browser viewport dimensions for the screenshot. Defaults to 1920x1080.
   */
  export interface Viewport {
    /**
     * Viewport height in pixels.
     */
    height?: number;

    /**
     * Viewport width in pixels.
     */
    width?: number;
  }
}

export interface WebSearchParams {
  /**
   * Search query. Accepts natural language as well as Google-style search operators
   * such as `site:`, `-site:`, `inurl:`, `intitle:`, quoted phrases, and `OR`.
   */
  query: string;

  /**
   * Two-letter ISO 3166-1 alpha-2 country code to localize results to a specific
   * country (maps to Google's `gl` parameter). Example: "us", "gb", "de".
   */
  country?:
    | 'af'
    | 'al'
    | 'dz'
    | 'as'
    | 'ad'
    | 'ao'
    | 'ai'
    | 'aq'
    | 'ag'
    | 'ar'
    | 'am'
    | 'aw'
    | 'au'
    | 'at'
    | 'az'
    | 'bs'
    | 'bh'
    | 'bd'
    | 'bb'
    | 'by'
    | 'be'
    | 'bz'
    | 'bj'
    | 'bm'
    | 'bt'
    | 'bo'
    | 'ba'
    | 'bw'
    | 'bv'
    | 'br'
    | 'io'
    | 'bn'
    | 'bg'
    | 'bf'
    | 'bi'
    | 'kh'
    | 'cm'
    | 'ca'
    | 'cv'
    | 'ky'
    | 'cf'
    | 'td'
    | 'cl'
    | 'cn'
    | 'cx'
    | 'cc'
    | 'co'
    | 'km'
    | 'cg'
    | 'cd'
    | 'ck'
    | 'cr'
    | 'ci'
    | 'hr'
    | 'cu'
    | 'cy'
    | 'cz'
    | 'dk'
    | 'dj'
    | 'dm'
    | 'do'
    | 'ec'
    | 'eg'
    | 'sv'
    | 'gq'
    | 'er'
    | 'ee'
    | 'et'
    | 'fk'
    | 'fo'
    | 'fj'
    | 'fi'
    | 'fr'
    | 'gf'
    | 'pf'
    | 'tf'
    | 'ga'
    | 'gm'
    | 'ge'
    | 'de'
    | 'gh'
    | 'gi'
    | 'gr'
    | 'gl'
    | 'gd'
    | 'gp'
    | 'gu'
    | 'gt'
    | 'gn'
    | 'gw'
    | 'gy'
    | 'ht'
    | 'hm'
    | 'va'
    | 'hn'
    | 'hk'
    | 'hu'
    | 'is'
    | 'in'
    | 'id'
    | 'ir'
    | 'iq'
    | 'ie'
    | 'il'
    | 'it'
    | 'jm'
    | 'jp'
    | 'jo'
    | 'kz'
    | 'ke'
    | 'ki'
    | 'kp'
    | 'kr'
    | 'kw'
    | 'kg'
    | 'la'
    | 'lv'
    | 'lb'
    | 'ls'
    | 'lr'
    | 'ly'
    | 'li'
    | 'lt'
    | 'lu'
    | 'mo'
    | 'mk'
    | 'mg'
    | 'mw'
    | 'my'
    | 'mv'
    | 'ml'
    | 'mt'
    | 'mh'
    | 'mq'
    | 'mr'
    | 'mu'
    | 'yt'
    | 'mx'
    | 'fm'
    | 'md'
    | 'mc'
    | 'mn'
    | 'ms'
    | 'ma'
    | 'mz'
    | 'mm'
    | 'na'
    | 'nr'
    | 'np'
    | 'nl'
    | 'an'
    | 'nc'
    | 'nz'
    | 'ni'
    | 'ne'
    | 'ng'
    | 'nu'
    | 'nf'
    | 'mp'
    | 'no'
    | 'om'
    | 'pk'
    | 'pw'
    | 'ps'
    | 'pa'
    | 'pg'
    | 'py'
    | 'pe'
    | 'ph'
    | 'pn'
    | 'pl'
    | 'pt'
    | 'pr'
    | 'qa'
    | 're'
    | 'ro'
    | 'ru'
    | 'rw'
    | 'sh'
    | 'kn'
    | 'lc'
    | 'pm'
    | 'vc'
    | 'ws'
    | 'sm'
    | 'st'
    | 'sa'
    | 'sn'
    | 'rs'
    | 'sc'
    | 'sl'
    | 'sg'
    | 'sk'
    | 'si'
    | 'sb'
    | 'so'
    | 'za'
    | 'gs'
    | 'es'
    | 'lk'
    | 'sd'
    | 'sr'
    | 'sj'
    | 'sz'
    | 'se'
    | 'ch'
    | 'sy'
    | 'tw'
    | 'tj'
    | 'tz'
    | 'th'
    | 'tl'
    | 'tg'
    | 'tk'
    | 'to'
    | 'tt'
    | 'tn'
    | 'tr'
    | 'tm'
    | 'tc'
    | 'tv'
    | 'ug'
    | 'ua'
    | 'ae'
    | 'gb'
    | 'us'
    | 'um'
    | 'uy'
    | 'uz'
    | 'vu'
    | 've'
    | 'vn'
    | 'vg'
    | 'vi'
    | 'wf'
    | 'eh'
    | 'ye'
    | 'zm'
    | 'zw';

  /**
   * Blocklist — drop results from these domains. Example: ["pinterest.com",
   * "reddit.com"].
   */
  excludeDomains?: Array<string>;

  /**
   * Restrict results to content published within this window.
   */
  freshness?: 'last_24_hours' | 'last_week' | 'last_month' | 'last_year';

  /**
   * Allowlist — only return results from these domains. Example: ["arxiv.org",
   * "github.com"].
   */
  includeDomains?: Array<string>;

  /**
   * Inline Markdown scraping for each result. Set `enabled: true` to activate.
   */
  markdownOptions?: WebSearchParams.MarkdownOptions;

  /**
   * Number of results to request and return (10–100). Defaults to 10.
   */
  numResults?: number;

  /**
   * Expand the query into multiple parallel variants for broader recall.
   */
  queryFanout?: boolean;

  /**
   * Optional caller-defined tags for tracking this request. Tags are recorded on the
   * request's usage log and can be used to filter usage on the dashboard usage page.
   * Up to 20 tags, each 1-50 characters.
   */
  tags?: Array<string>;

  /**
   * Optional timeout in milliseconds for the request. If the request takes longer
   * than this value, it will be aborted with a 408 status code. Maximum allowed
   * value is 300000ms (5 minutes).
   */
  timeoutMS?: number;
}

export namespace WebSearchParams {
  /**
   * Inline Markdown scraping for each result. Set `enabled: true` to activate.
   */
  export interface MarkdownOptions {
    /**
     * Scrape each result to Markdown. Off by default to keep search cheap and fast.
     */
    enabled?: boolean;

    /**
     * Render iframe contents into the Markdown.
     */
    includeFrames?: boolean;

    /**
     * Emit image references in the Markdown.
     */
    includeImages?: boolean;

    /**
     * Keep hyperlinks in the Markdown.
     */
    includeLinks?: boolean;

    /**
     * Cache TTL in ms for scraped Markdown keyed by URL + options. Default 1 day, max
     * 30 days. Set to 0 to force a fresh scrape.
     */
    maxAgeMs?: number;

    /**
     * PDF handling. Use start/end to bound text extraction and OCR to a page range.
     */
    pdf?: MarkdownOptions.Pdf;

    /**
     * Truncate inline base64 image payloads to keep responses small.
     */
    shortenBase64Images?: boolean;

    /**
     * Optional timeout in milliseconds for the request. If the request takes longer
     * than this value, it will be aborted with a 408 status code. Maximum allowed
     * value is 300000ms (5 minutes).
     */
    timeoutMS?: number;

    /**
     * Strip nav, header, footer, and sidebar — keep only the primary article content.
     */
    useMainContentOnly?: boolean;

    /**
     * Extra wait after page load before rendering, in ms (0–30000). Useful for
     * JS-heavy pages.
     */
    waitForMs?: number;
  }

  export namespace MarkdownOptions {
    /**
     * PDF handling. Use start/end to bound text extraction and OCR to a page range.
     */
    export interface Pdf {
      /**
       * Last PDF page to parse (1-based, inclusive). Defaults to the final page. Must
       * be >= start.
       */
      end?: number;

      /**
       * Parse PDF URLs. When false, PDF results are skipped with WEBSITE_ACCESS_ERROR.
       */
      shouldParse?: boolean;

      /**
       * First PDF page to parse (1-based, inclusive). Defaults to page 1.
       */
      start?: number;
    }
  }
}

export interface WebWebCrawlMdParams {
  /**
   * The starting URL for the crawl (must include http:// or https:// protocol)
   */
  url: string;

  /**
   * Two-letter ISO 3166-1 alpha-2 country code identifying a supported Context.dev
   * residential proxy exit location. Must be one of Context.dev's supported
   * countries. When provided, Context.dev fetches the target page from that country.
   */
  country?:
    | 'ad'
    | 'ae'
    | 'af'
    | 'ag'
    | 'ai'
    | 'al'
    | 'am'
    | 'ao'
    | 'ar'
    | 'at'
    | 'au'
    | 'aw'
    | 'az'
    | 'ba'
    | 'bb'
    | 'bd'
    | 'be'
    | 'bf'
    | 'bg'
    | 'bh'
    | 'bi'
    | 'bj'
    | 'bm'
    | 'bn'
    | 'bo'
    | 'bq'
    | 'br'
    | 'bs'
    | 'bw'
    | 'by'
    | 'bz'
    | 'ca'
    | 'cd'
    | 'cf'
    | 'cg'
    | 'ch'
    | 'ci'
    | 'cl'
    | 'cm'
    | 'cn'
    | 'co'
    | 'cr'
    | 'cv'
    | 'cw'
    | 'cy'
    | 'cz'
    | 'de'
    | 'dj'
    | 'dk'
    | 'dm'
    | 'do'
    | 'dz'
    | 'ec'
    | 'ee'
    | 'eg'
    | 'es'
    | 'et'
    | 'fi'
    | 'fj'
    | 'fr'
    | 'ga'
    | 'gb'
    | 'gd'
    | 'ge'
    | 'gf'
    | 'gg'
    | 'gh'
    | 'gm'
    | 'gn'
    | 'gp'
    | 'gq'
    | 'gr'
    | 'gt'
    | 'gu'
    | 'gw'
    | 'gy'
    | 'hk'
    | 'hn'
    | 'hr'
    | 'ht'
    | 'hu'
    | 'id'
    | 'ie'
    | 'il'
    | 'im'
    | 'in'
    | 'iq'
    | 'ir'
    | 'is'
    | 'it'
    | 'je'
    | 'jm'
    | 'jo'
    | 'jp'
    | 'ke'
    | 'kg'
    | 'kh'
    | 'kn'
    | 'kr'
    | 'kw'
    | 'ky'
    | 'kz'
    | 'la'
    | 'lb'
    | 'lc'
    | 'lk'
    | 'lr'
    | 'ls'
    | 'lt'
    | 'lu'
    | 'lv'
    | 'ly'
    | 'ma'
    | 'mc'
    | 'md'
    | 'me'
    | 'mf'
    | 'mg'
    | 'mk'
    | 'ml'
    | 'mm'
    | 'mn'
    | 'mo'
    | 'mq'
    | 'mr'
    | 'mt'
    | 'mu'
    | 'mv'
    | 'mw'
    | 'mx'
    | 'my'
    | 'mz'
    | 'na'
    | 'nc'
    | 'ne'
    | 'ng'
    | 'ni'
    | 'nl'
    | 'no'
    | 'np'
    | 'nz'
    | 'om'
    | 'pa'
    | 'pe'
    | 'pf'
    | 'pg'
    | 'ph'
    | 'pk'
    | 'pl'
    | 'pr'
    | 'ps'
    | 'pt'
    | 'py'
    | 'qa'
    | 're'
    | 'ro'
    | 'rs'
    | 'ru'
    | 'rw'
    | 'sa'
    | 'sc'
    | 'sd'
    | 'se'
    | 'sg'
    | 'si'
    | 'sk'
    | 'sl'
    | 'sm'
    | 'sn'
    | 'so'
    | 'sr'
    | 'ss'
    | 'st'
    | 'sv'
    | 'sx'
    | 'sy'
    | 'sz'
    | 'tc'
    | 'td'
    | 'tg'
    | 'th'
    | 'tj'
    | 'tl'
    | 'tm'
    | 'tn'
    | 'tr'
    | 'tt'
    | 'tw'
    | 'tz'
    | 'ua'
    | 'ug'
    | 'us'
    | 'uy'
    | 'uz'
    | 'vc'
    | 've'
    | 'vg'
    | 'vi'
    | 'vn'
    | 'ye'
    | 'yt'
    | 'za'
    | 'zm'
    | 'zw';

  /**
   * CSS selectors to remove before each crawled page is converted to Markdown.
   * Applied after includeSelectors. Exclusion takes precedence: an element matching
   * both is removed. Examples: "nav", "footer", ".ad-banner", "[aria-hidden=true]".
   */
  excludeSelectors?: Array<string>;

  /**
   * When true, follow links on subdomains of the starting URL's domain (e.g.
   * docs.example.com when starting from example.com). www and apex are always
   * treated as equivalent.
   */
  followSubdomains?: boolean;

  /**
   * When true, the contents of iframes are rendered to Markdown for each crawled
   * page.
   */
  includeFrames?: boolean;

  /**
   * Include image references in the Markdown output
   */
  includeImages?: boolean;

  /**
   * Preserve hyperlinks in the Markdown output
   */
  includeLinks?: boolean;

  /**
   * CSS selectors. When provided, only matching HTML subtrees (and their
   * descendants) are kept before each crawled page is converted to Markdown. When
   * omitted, the entire document is kept. Examples: "article.main", "#content",
   * "[role=main]".
   */
  includeSelectors?: Array<string>;

  /**
   * Return a cached result if a prior scrape for the same parameters exists and is
   * younger than this many milliseconds. Defaults to 1 day (86400000 ms) when
   * omitted. Max is 30 days (2592000000 ms). Set to 0 to always scrape fresh.
   */
  maxAgeMs?: number;

  /**
   * Maximum link depth from the starting URL (0 = only the starting page)
   */
  maxDepth?: number;

  /**
   * Maximum number of pages to crawl. Hard cap: 500.
   */
  maxPages?: number;

  /**
   * PDF parsing controls. Use start/end to limit text extraction and embedded-image
   * detection/OCR to an inclusive 1-based page range.
   */
  pdf?: WebWebCrawlMdParams.Pdf;

  /**
   * When true, waits briefly for CSS and transition animations to settle before
   * extracting each crawled page. Defaults to false. This adds a bit of latency in
   * exchange for more stable output on animated pages.
   */
  settleAnimations?: boolean;

  /**
   * Truncate base64-encoded image data in the Markdown output
   */
  shortenBase64Images?: boolean;

  /**
   * Soft time budget for the crawl in milliseconds. After each scrape, the crawler
   * checks the elapsed time and, if exceeded, returns the pages collected so far
   * instead of continuing. Min: 10000 (10s). Max: 110000 (110s). Default: 80000
   * (80s).
   */
  stopAfterMs?: number;

  /**
   * Optional caller-defined tags for tracking this request. Tags are recorded on the
   * request's usage log and can be used to filter usage on the dashboard usage page.
   * Up to 20 tags, each 1-50 characters.
   */
  tags?: Array<string>;

  /**
   * Optional timeout in milliseconds for the request. If the request takes longer
   * than this value, it will be aborted with a 408 status code. Maximum allowed
   * value is 300000ms (5 minutes).
   */
  timeoutMS?: number;

  /**
   * Regex pattern. Only URLs matching this pattern will be followed and scraped.
   */
  urlRegex?: string;

  /**
   * Extract only the main content, stripping headers, footers, sidebars, and
   * navigation
   */
  useMainContentOnly?: boolean;

  /**
   * Optional browser wait time in milliseconds after initial page load for each
   * crawled page. Min: 0. Max: 30000 (30 seconds).
   */
  waitForMs?: number;
}

export namespace WebWebCrawlMdParams {
  /**
   * PDF parsing controls. Use start/end to limit text extraction and embedded-image
   * detection/OCR to an inclusive 1-based page range.
   */
  export interface Pdf {
    /**
     * Last 1-based PDF page to parse. When omitted, parsing ends at the last page.
     * Must be greater than or equal to start when both are provided.
     */
    end?: number;

    /**
     * When true, detect and OCR images embedded in the selected PDF pages, inserting
     * recognized text at each image's position in page reading order while preserving
     * the PDF text layer. This is separate from automatic scanned-PDF OCR fallback.
     */
    ocr?: boolean;

    /**
     * When true, PDF pages are fetched and parsed. When false, PDF pages are skipped
     * entirely (not included in results and not counted as failures).
     */
    shouldParse?: boolean;

    /**
     * First 1-based PDF page to parse. When omitted, parsing starts at the first page.
     */
    start?: number;
  }
}

export interface WebWebScrapeHTMLParams {
  /**
   * Full URL to scrape (must include http:// or https:// protocol)
   */
  url: string;

  /**
   * Two-letter ISO 3166-1 alpha-2 country code identifying a supported Context.dev
   * residential proxy exit location. Must be one of Context.dev's supported
   * countries. When provided, Context.dev fetches the target page from that country.
   */
  country?:
    | 'ad'
    | 'ae'
    | 'af'
    | 'ag'
    | 'ai'
    | 'al'
    | 'am'
    | 'ao'
    | 'ar'
    | 'at'
    | 'au'
    | 'aw'
    | 'az'
    | 'ba'
    | 'bb'
    | 'bd'
    | 'be'
    | 'bf'
    | 'bg'
    | 'bh'
    | 'bi'
    | 'bj'
    | 'bm'
    | 'bn'
    | 'bo'
    | 'bq'
    | 'br'
    | 'bs'
    | 'bw'
    | 'by'
    | 'bz'
    | 'ca'
    | 'cd'
    | 'cf'
    | 'cg'
    | 'ch'
    | 'ci'
    | 'cl'
    | 'cm'
    | 'cn'
    | 'co'
    | 'cr'
    | 'cv'
    | 'cw'
    | 'cy'
    | 'cz'
    | 'de'
    | 'dj'
    | 'dk'
    | 'dm'
    | 'do'
    | 'dz'
    | 'ec'
    | 'ee'
    | 'eg'
    | 'es'
    | 'et'
    | 'fi'
    | 'fj'
    | 'fr'
    | 'ga'
    | 'gb'
    | 'gd'
    | 'ge'
    | 'gf'
    | 'gg'
    | 'gh'
    | 'gm'
    | 'gn'
    | 'gp'
    | 'gq'
    | 'gr'
    | 'gt'
    | 'gu'
    | 'gw'
    | 'gy'
    | 'hk'
    | 'hn'
    | 'hr'
    | 'ht'
    | 'hu'
    | 'id'
    | 'ie'
    | 'il'
    | 'im'
    | 'in'
    | 'iq'
    | 'ir'
    | 'is'
    | 'it'
    | 'je'
    | 'jm'
    | 'jo'
    | 'jp'
    | 'ke'
    | 'kg'
    | 'kh'
    | 'kn'
    | 'kr'
    | 'kw'
    | 'ky'
    | 'kz'
    | 'la'
    | 'lb'
    | 'lc'
    | 'lk'
    | 'lr'
    | 'ls'
    | 'lt'
    | 'lu'
    | 'lv'
    | 'ly'
    | 'ma'
    | 'mc'
    | 'md'
    | 'me'
    | 'mf'
    | 'mg'
    | 'mk'
    | 'ml'
    | 'mm'
    | 'mn'
    | 'mo'
    | 'mq'
    | 'mr'
    | 'mt'
    | 'mu'
    | 'mv'
    | 'mw'
    | 'mx'
    | 'my'
    | 'mz'
    | 'na'
    | 'nc'
    | 'ne'
    | 'ng'
    | 'ni'
    | 'nl'
    | 'no'
    | 'np'
    | 'nz'
    | 'om'
    | 'pa'
    | 'pe'
    | 'pf'
    | 'pg'
    | 'ph'
    | 'pk'
    | 'pl'
    | 'pr'
    | 'ps'
    | 'pt'
    | 'py'
    | 'qa'
    | 're'
    | 'ro'
    | 'rs'
    | 'ru'
    | 'rw'
    | 'sa'
    | 'sc'
    | 'sd'
    | 'se'
    | 'sg'
    | 'si'
    | 'sk'
    | 'sl'
    | 'sm'
    | 'sn'
    | 'so'
    | 'sr'
    | 'ss'
    | 'st'
    | 'sv'
    | 'sx'
    | 'sy'
    | 'sz'
    | 'tc'
    | 'td'
    | 'tg'
    | 'th'
    | 'tj'
    | 'tl'
    | 'tm'
    | 'tn'
    | 'tr'
    | 'tt'
    | 'tw'
    | 'tz'
    | 'ua'
    | 'ug'
    | 'us'
    | 'uy'
    | 'uz'
    | 'vc'
    | 've'
    | 'vg'
    | 'vi'
    | 'vn'
    | 'ye'
    | 'yt'
    | 'za'
    | 'zm'
    | 'zw';

  /**
   * CSS selectors to remove from the result. Applied after includeSelectors.
   * Exclusion takes precedence: an element matching both is removed. Examples:
   * "nav", "footer", ".ad-banner", "[aria-hidden=true]".
   */
  excludeSelectors?: Array<string> | null;

  /**
   * Optional outbound HTTP headers forwarded only to the target URL, sent as
   * deep-object query params such as headers[X-Custom]=value. When provided, caching
   * is bypassed: the result is neither read from nor written to cache.
   */
  headers?: { [key: string]: string };

  /**
   * When true, iframes are rendered inline into the returned HTML.
   */
  includeFrames?: boolean | 'true' | 'false';

  /**
   * CSS selectors. When provided, only matching subtrees (and their descendants) are
   * kept and everything else is dropped. When omitted, the entire document is kept.
   * Examples: "article.main", "#content", "[role=main]".
   */
  includeSelectors?: Array<string> | null;

  /**
   * Return a cached result if a prior scrape for the same parameters exists and is
   * younger than this many milliseconds. Defaults to 1 day (86400000 ms) when
   * omitted. Max is 30 days (2592000000 ms). Set to 0 to always scrape fresh.
   */
  maxAgeMs?: number | null;

  /**
   * PDF parsing controls. Use start/end to limit text extraction and embedded-image
   * detection/OCR to an inclusive 1-based page range.
   */
  pdf?: WebWebScrapeHTMLParams.Pdf;

  /**
   * When true, waits briefly for CSS and transition animations to settle before
   * extracting HTML. Defaults to false. This adds a bit of latency in exchange for
   * more stable output on animated pages.
   */
  settleAnimations?: boolean | 'true' | 'false';

  /**
   * Optional comma-separated caller-defined tags for tracking this request. Tags are
   * recorded on the request's usage log and can be used to filter usage on the
   * dashboard usage page. Up to 20 tags, each 1-50 characters.
   */
  tags?: Array<string>;

  /**
   * Optional timeout in milliseconds for the request. If the request takes longer
   * than this value, it will be aborted with a 408 status code. Maximum allowed
   * value is 300000ms (5 minutes).
   */
  timeoutMS?: number;

  /**
   * When true, return only the page's main content in the HTML response, excluding
   * headers, footers, sidebars, and navigation when detectable.
   */
  useMainContentOnly?: boolean | 'true' | 'false';

  /**
   * Optional browser wait time in milliseconds after initial page load. Min: 0. Max:
   * 30000 (30 seconds).
   */
  waitForMs?: number | null;
}

export namespace WebWebScrapeHTMLParams {
  /**
   * PDF parsing controls. Use start/end to limit text extraction and embedded-image
   * detection/OCR to an inclusive 1-based page range.
   */
  export interface Pdf {
    /**
     * Last 1-based PDF page to parse. When omitted, parsing ends at the last page.
     * Must be greater than or equal to start when both are provided.
     */
    end?: number;

    /**
     * When true, detect and OCR images embedded in the selected PDF pages, inserting
     * recognized text at each image's position in page reading order while preserving
     * the PDF text layer. This is separate from automatic scanned-PDF OCR fallback.
     */
    ocr?: boolean | 'true' | 'false';

    /**
     * When true, PDF URLs are fetched and parsed. When false, PDF URLs are skipped and
     * a 400 WEBSITE_ACCESS_ERROR is returned.
     */
    shouldParse?: boolean | 'true' | 'false';

    /**
     * First 1-based PDF page to parse. When omitted, parsing starts at the first page.
     */
    start?: number;
  }
}

export interface WebWebScrapeImagesParams {
  /**
   * Page URL to inspect. Must include http:// or https://.
   */
  url: string;

  /**
   * When true, visually duplicate images are removed: every image is loaded and
   * perceptually hashed, and only the highest-resolution copy of each duplicate
   * group is kept. Images that cannot be downloaded or hashed are kept. Default:
   * false.
   */
  dedupe?: boolean | 'true' | 'false';

  /**
   * Optional per-image processing, sent as deep-object query params such as
   * enrichment[resolution]=true.
   */
  enrichment?: WebWebScrapeImagesParams.Enrichment | null;

  /**
   * Optional outbound HTTP headers forwarded only to the target URL, sent as
   * deep-object query params such as headers[X-Custom]=value. When provided, caching
   * is bypassed: the result is neither read from nor written to cache.
   */
  headers?: { [key: string]: string };

  /**
   * Reuse a cached result this many milliseconds old or newer. Default: 86400000 (1
   * day). Set to 0 to bypass cache. Maximum: 2592000000 (30 days).
   */
  maxAgeMs?: number | null;

  /**
   * Optional comma-separated caller-defined tags for tracking this request. Tags are
   * recorded on the request's usage log and can be used to filter usage on the
   * dashboard usage page. Up to 20 tags, each 1-50 characters.
   */
  tags?: Array<string>;

  /**
   * Optional timeout in milliseconds for the request. If the request takes longer
   * than this value, it will be aborted with a 408 status code. Maximum allowed
   * value is 300000ms (5 minutes).
   */
  timeoutMS?: number;

  /**
   * Optional browser wait time in milliseconds after initial page load before
   * collecting images. Min: 0. Max: 30000 (30 seconds).
   */
  waitForMs?: number | null;
}

export namespace WebWebScrapeImagesParams {
  /**
   * Optional per-image processing, sent as deep-object query params such as
   * enrichment[resolution]=true.
   */
  export interface Enrichment {
    /**
     * Classify each image by visual asset type.
     */
    classification?: boolean | 'true' | 'false';

    /**
     * Host materializable images on the Brand.dev CDN and return their URL and MIME
     * type.
     */
    hostedUrl?: boolean | 'true' | 'false';

    /**
     * Per-image enrichment timeout in milliseconds. Default: 30000. Maximum: 60000.
     */
    maxTimePerMs?: number;

    /**
     * Measure image width and height when possible.
     */
    resolution?: boolean | 'true' | 'false';
  }
}

export interface WebWebScrapeMdParams {
  /**
   * Full URL to scrape into LLM usable Markdown (must include http:// or https://
   * protocol)
   */
  url: string;

  /**
   * Two-letter ISO 3166-1 alpha-2 country code identifying a supported Context.dev
   * residential proxy exit location. Must be one of Context.dev's supported
   * countries. When provided, Context.dev fetches the target page from that country.
   */
  country?:
    | 'ad'
    | 'ae'
    | 'af'
    | 'ag'
    | 'ai'
    | 'al'
    | 'am'
    | 'ao'
    | 'ar'
    | 'at'
    | 'au'
    | 'aw'
    | 'az'
    | 'ba'
    | 'bb'
    | 'bd'
    | 'be'
    | 'bf'
    | 'bg'
    | 'bh'
    | 'bi'
    | 'bj'
    | 'bm'
    | 'bn'
    | 'bo'
    | 'bq'
    | 'br'
    | 'bs'
    | 'bw'
    | 'by'
    | 'bz'
    | 'ca'
    | 'cd'
    | 'cf'
    | 'cg'
    | 'ch'
    | 'ci'
    | 'cl'
    | 'cm'
    | 'cn'
    | 'co'
    | 'cr'
    | 'cv'
    | 'cw'
    | 'cy'
    | 'cz'
    | 'de'
    | 'dj'
    | 'dk'
    | 'dm'
    | 'do'
    | 'dz'
    | 'ec'
    | 'ee'
    | 'eg'
    | 'es'
    | 'et'
    | 'fi'
    | 'fj'
    | 'fr'
    | 'ga'
    | 'gb'
    | 'gd'
    | 'ge'
    | 'gf'
    | 'gg'
    | 'gh'
    | 'gm'
    | 'gn'
    | 'gp'
    | 'gq'
    | 'gr'
    | 'gt'
    | 'gu'
    | 'gw'
    | 'gy'
    | 'hk'
    | 'hn'
    | 'hr'
    | 'ht'
    | 'hu'
    | 'id'
    | 'ie'
    | 'il'
    | 'im'
    | 'in'
    | 'iq'
    | 'ir'
    | 'is'
    | 'it'
    | 'je'
    | 'jm'
    | 'jo'
    | 'jp'
    | 'ke'
    | 'kg'
    | 'kh'
    | 'kn'
    | 'kr'
    | 'kw'
    | 'ky'
    | 'kz'
    | 'la'
    | 'lb'
    | 'lc'
    | 'lk'
    | 'lr'
    | 'ls'
    | 'lt'
    | 'lu'
    | 'lv'
    | 'ly'
    | 'ma'
    | 'mc'
    | 'md'
    | 'me'
    | 'mf'
    | 'mg'
    | 'mk'
    | 'ml'
    | 'mm'
    | 'mn'
    | 'mo'
    | 'mq'
    | 'mr'
    | 'mt'
    | 'mu'
    | 'mv'
    | 'mw'
    | 'mx'
    | 'my'
    | 'mz'
    | 'na'
    | 'nc'
    | 'ne'
    | 'ng'
    | 'ni'
    | 'nl'
    | 'no'
    | 'np'
    | 'nz'
    | 'om'
    | 'pa'
    | 'pe'
    | 'pf'
    | 'pg'
    | 'ph'
    | 'pk'
    | 'pl'
    | 'pr'
    | 'ps'
    | 'pt'
    | 'py'
    | 'qa'
    | 're'
    | 'ro'
    | 'rs'
    | 'ru'
    | 'rw'
    | 'sa'
    | 'sc'
    | 'sd'
    | 'se'
    | 'sg'
    | 'si'
    | 'sk'
    | 'sl'
    | 'sm'
    | 'sn'
    | 'so'
    | 'sr'
    | 'ss'
    | 'st'
    | 'sv'
    | 'sx'
    | 'sy'
    | 'sz'
    | 'tc'
    | 'td'
    | 'tg'
    | 'th'
    | 'tj'
    | 'tl'
    | 'tm'
    | 'tn'
    | 'tr'
    | 'tt'
    | 'tw'
    | 'tz'
    | 'ua'
    | 'ug'
    | 'us'
    | 'uy'
    | 'uz'
    | 'vc'
    | 've'
    | 'vg'
    | 'vi'
    | 'vn'
    | 'ye'
    | 'yt'
    | 'za'
    | 'zm'
    | 'zw';

  /**
   * CSS selectors to remove before conversion to Markdown. Applied after
   * includeSelectors. Exclusion takes precedence: an element matching both is
   * removed. Examples: "nav", "footer", ".ad-banner", "[aria-hidden=true]".
   */
  excludeSelectors?: Array<string> | null;

  /**
   * Optional outbound HTTP headers forwarded only to the target URL, sent as
   * deep-object query params such as headers[X-Custom]=value. When provided, caching
   * is bypassed: the result is neither read from nor written to cache.
   */
  headers?: { [key: string]: string };

  /**
   * When true, the contents of iframes are rendered to Markdown.
   */
  includeFrames?: boolean | 'true' | 'false';

  /**
   * Include image references in Markdown output
   */
  includeImages?: boolean | 'true' | 'false';

  /**
   * Preserve hyperlinks in Markdown output
   */
  includeLinks?: boolean | 'true' | 'false';

  /**
   * CSS selectors. When provided, only matching HTML subtrees (and their
   * descendants) are kept before conversion to Markdown. When omitted, the entire
   * document is kept. Examples: "article.main", "#content", "[role=main]".
   */
  includeSelectors?: Array<string> | null;

  /**
   * Return a cached result if a prior scrape for the same parameters exists and is
   * younger than this many milliseconds. Defaults to 1 day (86400000 ms) when
   * omitted. Max is 30 days (2592000000 ms). Set to 0 to always scrape fresh.
   */
  maxAgeMs?: number | null;

  /**
   * PDF parsing controls. Use start/end to limit text extraction and embedded-image
   * detection/OCR to an inclusive 1-based page range.
   */
  pdf?: WebWebScrapeMdParams.Pdf;

  /**
   * When true, waits briefly for CSS and transition animations to settle before
   * converting to Markdown. Defaults to false. This adds a bit of latency in
   * exchange for more stable output on animated pages.
   */
  settleAnimations?: boolean | 'true' | 'false';

  /**
   * Shorten base64-encoded image data in the Markdown output
   */
  shortenBase64Images?: boolean | 'true' | 'false';

  /**
   * Optional comma-separated caller-defined tags for tracking this request. Tags are
   * recorded on the request's usage log and can be used to filter usage on the
   * dashboard usage page. Up to 20 tags, each 1-50 characters.
   */
  tags?: Array<string>;

  /**
   * Optional timeout in milliseconds for the request. If the request takes longer
   * than this value, it will be aborted with a 408 status code. Maximum allowed
   * value is 300000ms (5 minutes).
   */
  timeoutMS?: number;

  /**
   * Extract only the main content of the page, excluding headers, footers, sidebars,
   * and navigation
   */
  useMainContentOnly?: boolean | 'true' | 'false';

  /**
   * Optional browser wait time in milliseconds after initial page load before
   * converting the page to Markdown. Min: 0. Max: 30000 (30 seconds).
   */
  waitForMs?: number | null;
}

export namespace WebWebScrapeMdParams {
  /**
   * PDF parsing controls. Use start/end to limit text extraction and embedded-image
   * detection/OCR to an inclusive 1-based page range.
   */
  export interface Pdf {
    /**
     * Last 1-based PDF page to parse. When omitted, parsing ends at the last page.
     * Must be greater than or equal to start when both are provided.
     */
    end?: number;

    /**
     * When true, detect and OCR images embedded in the selected PDF pages, inserting
     * recognized text at each image's position in page reading order while preserving
     * the PDF text layer. This is separate from automatic scanned-PDF OCR fallback.
     */
    ocr?: boolean | 'true' | 'false';

    /**
     * When true, PDF URLs are fetched and parsed. When false, PDF URLs are skipped and
     * a 400 WEBSITE_ACCESS_ERROR is returned.
     */
    shouldParse?: boolean | 'true' | 'false';

    /**
     * First 1-based PDF page to parse. When omitted, parsing starts at the first page.
     */
    start?: number;
  }
}

export interface WebWebScrapeSitemapParams {
  /**
   * Domain to build a sitemap for
   */
  domain: string;

  /**
   * Optional outbound HTTP headers forwarded only to the target URL, sent as
   * deep-object query params such as headers[X-Custom]=value. When provided, caching
   * is bypassed: the result is neither read from nor written to cache.
   */
  headers?: { [key: string]: string };

  /**
   * Maximum number of links to return from the sitemap crawl. Defaults to 10,000.
   * Minimum is 1, maximum is 100,000.
   */
  maxLinks?: number;

  /**
   * Optional explicit sitemap URL. When provided, exactly this sitemap is crawled
   * instead of discovering the domain's sitemaps.
   */
  sitemapUrl?: string;

  /**
   * Optional comma-separated caller-defined tags for tracking this request. Tags are
   * recorded on the request's usage log and can be used to filter usage on the
   * dashboard usage page. Up to 20 tags, each 1-50 characters.
   */
  tags?: Array<string>;

  /**
   * Optional timeout in milliseconds for the request. If the request takes longer
   * than this value, it will be aborted with a 408 status code. Maximum allowed
   * value is 300000ms (5 minutes).
   */
  timeoutMS?: number;

  /**
   * Optional RE2-compatible regex pattern. Only URLs matching this pattern are
   * returned and counted against maxLinks.
   */
  urlRegex?: string;
}

export declare namespace Web {
  export {
    type WebExtractResponse as WebExtractResponse,
    type WebExtractCompetitorsResponse as WebExtractCompetitorsResponse,
    type WebExtractFontsResponse as WebExtractFontsResponse,
    type WebExtractStyleguideResponse as WebExtractStyleguideResponse,
    type WebScreenshotResponse as WebScreenshotResponse,
    type WebSearchResponse as WebSearchResponse,
    type WebWebCrawlMdResponse as WebWebCrawlMdResponse,
    type WebWebScrapeHTMLResponse as WebWebScrapeHTMLResponse,
    type WebWebScrapeImagesResponse as WebWebScrapeImagesResponse,
    type WebWebScrapeMdResponse as WebWebScrapeMdResponse,
    type WebWebScrapeSitemapResponse as WebWebScrapeSitemapResponse,
    type WebExtractParams as WebExtractParams,
    type WebExtractCompetitorsParams as WebExtractCompetitorsParams,
    type WebExtractFontsParams as WebExtractFontsParams,
    type WebExtractStyleguideParams as WebExtractStyleguideParams,
    type WebScreenshotParams as WebScreenshotParams,
    type WebSearchParams as WebSearchParams,
    type WebWebCrawlMdParams as WebWebCrawlMdParams,
    type WebWebScrapeHTMLParams as WebWebScrapeHTMLParams,
    type WebWebScrapeImagesParams as WebWebScrapeImagesParams,
    type WebWebScrapeMdParams as WebWebScrapeMdParams,
    type WebWebScrapeSitemapParams as WebWebScrapeSitemapParams,
  };
}
