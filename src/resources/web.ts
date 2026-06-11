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
   * Scrapes the given URL into LLM usable Markdown.
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
   *   domain: 'domain',
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
   * Indicates success
   */
  success: true;

  /**
   * Detected content type of the returned `html` field. Sitemaps and feeds are
   * surfaced as `xml`; ordinary pages are `html`.
   */
  type: 'html' | 'xml' | 'json' | 'text' | 'csv' | 'markdown' | 'svg' | 'pdf';

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

  /**
   * Metadata about the API key used for the request. Included in every response
   * whenever a valid API key is provided, even when the response status is not 200.
   */
  key_metadata?: WebWebScrapeMdResponse.KeyMetadata;
}

export namespace WebWebScrapeMdResponse {
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
   * Maximum age in milliseconds for cached data before the API performs a hard
   * refresh. Defaults to 3 months (7776000000 ms). Values below 1 day (86400000 ms)
   * are clamped to 1 day; values above 1 year (31536000000 ms) are clamped to 1
   * year.
   */
  maxAgeMs?: number;

  /**
   * Optional timeout in milliseconds for the request. If the request takes longer
   * than this value, it will be aborted with a 408 status code. Maximum allowed
   * value is 300000ms (5 minutes).
   */
  timeoutMS?: number;
}

export interface WebExtractStyleguideParams {
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
   * Maximum age in milliseconds for cached data before the API performs a hard
   * refresh. Defaults to 3 months (7776000000 ms). Values below 1 day (86400000 ms)
   * are clamped to 1 day; values above 1 year (31536000000 ms) are clamped to 1
   * year.
   */
  maxAgeMs?: number;

  /**
   * Optional timeout in milliseconds for the request. If the request takes longer
   * than this value, it will be aborted with a 408 status code. Maximum allowed
   * value is 300000ms (5 minutes).
   */
  timeoutMS?: number;
}

export interface WebScreenshotParams {
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
  handleCookiePopup?: 'true' | 'false';

  /**
   * Return a cached screenshot if a prior screenshot for the same parameters exists
   * and is younger than this many milliseconds. Defaults to 1 day (86400000 ms) when
   * omitted. Max is 30 days (2592000000 ms). Set to 0 to always capture fresh.
   */
  maxAgeMs?: number;

  /**
   * Optional parameter to specify which page type to screenshot. If provided, the
   * system will scrape the domain's links and use heuristics to find the most
   * appropriate URL for the specified page type (30 supported languages). If not
   * provided, screenshots the main domain landing page. Only applicable when using
   * 'domain', not 'directUrl'.
   */
  page?: 'login' | 'signup' | 'blog' | 'careers' | 'pricing' | 'terms' | 'privacy' | 'contact';

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
  waitForMs?: number;
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
   * Natural-language search query.
   */
  query: string;

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
   * Expand the query into multiple parallel variants for broader recall.
   */
  queryFanout?: boolean;

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
   * PDF parsing controls. Use start/end to limit text extraction and OCR to an
   * inclusive 1-based page range.
   */
  pdf?: WebWebCrawlMdParams.Pdf;

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
   * PDF parsing controls. Use start/end to limit text extraction and OCR to an
   * inclusive 1-based page range.
   */
  export interface Pdf {
    /**
     * Last 1-based PDF page to parse. When omitted, parsing ends at the last page.
     * Must be greater than or equal to start when both are provided.
     */
    end?: number;

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
   * CSS selectors to remove from the result. Applied after includeSelectors.
   * Exclusion takes precedence: an element matching both is removed. Examples:
   * "nav", "footer", ".ad-banner", "[aria-hidden=true]".
   */
  excludeSelectors?: Array<string>;

  /**
   * Optional outbound HTTP headers forwarded only to the target URL, sent as
   * deep-object query params such as headers[X-Custom]=value. When provided, caching
   * is bypassed: the result is neither read from nor written to cache.
   */
  headers?: { [key: string]: string };

  /**
   * When true, iframes are rendered inline into the returned HTML.
   */
  includeFrames?: boolean;

  /**
   * CSS selectors. When provided, only matching subtrees (and their descendants) are
   * kept and everything else is dropped. When omitted, the entire document is kept.
   * Examples: "article.main", "#content", "[role=main]".
   */
  includeSelectors?: Array<string>;

  /**
   * Return a cached result if a prior scrape for the same parameters exists and is
   * younger than this many milliseconds. Defaults to 1 day (86400000 ms) when
   * omitted. Max is 30 days (2592000000 ms). Set to 0 to always scrape fresh.
   */
  maxAgeMs?: number;

  /**
   * PDF parsing controls. Use start/end to limit text extraction and OCR to an
   * inclusive 1-based page range.
   */
  pdf?: WebWebScrapeHTMLParams.Pdf;

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
  useMainContentOnly?: boolean;

  /**
   * Optional browser wait time in milliseconds after initial page load. Min: 0. Max:
   * 30000 (30 seconds).
   */
  waitForMs?: number;
}

export namespace WebWebScrapeHTMLParams {
  /**
   * PDF parsing controls. Use start/end to limit text extraction and OCR to an
   * inclusive 1-based page range.
   */
  export interface Pdf {
    /**
     * Last 1-based PDF page to parse. When omitted, parsing ends at the last page.
     * Must be greater than or equal to start when both are provided.
     */
    end?: number;

    /**
     * When true, PDF URLs are fetched and parsed. When false, PDF URLs are skipped and
     * a 400 WEBSITE_ACCESS_ERROR is returned.
     */
    shouldParse?: boolean;

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
   * Optional per-image processing, sent as deep-object query params such as
   * enrichment[resolution]=true.
   */
  enrichment?: WebWebScrapeImagesParams.Enrichment;

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
  maxAgeMs?: number;

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
  waitForMs?: number;
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
    classification?: boolean;

    /**
     * Host materializable images on the Brand.dev CDN and return their URL and MIME
     * type.
     */
    hostedUrl?: boolean;

    /**
     * Per-image enrichment timeout in milliseconds. Default: 30000. Maximum: 60000.
     */
    maxTimePerMs?: number;

    /**
     * Measure image width and height when possible.
     */
    resolution?: boolean;
  }
}

export interface WebWebScrapeMdParams {
  /**
   * Full URL to scrape into LLM usable Markdown (must include http:// or https://
   * protocol)
   */
  url: string;

  /**
   * CSS selectors to remove before conversion to Markdown. Applied after
   * includeSelectors. Exclusion takes precedence: an element matching both is
   * removed. Examples: "nav", "footer", ".ad-banner", "[aria-hidden=true]".
   */
  excludeSelectors?: Array<string>;

  /**
   * Optional outbound HTTP headers forwarded only to the target URL, sent as
   * deep-object query params such as headers[X-Custom]=value. When provided, caching
   * is bypassed: the result is neither read from nor written to cache.
   */
  headers?: { [key: string]: string };

  /**
   * When true, the contents of iframes are rendered to Markdown.
   */
  includeFrames?: boolean;

  /**
   * Include image references in Markdown output
   */
  includeImages?: boolean;

  /**
   * Preserve hyperlinks in Markdown output
   */
  includeLinks?: boolean;

  /**
   * CSS selectors. When provided, only matching HTML subtrees (and their
   * descendants) are kept before conversion to Markdown. When omitted, the entire
   * document is kept. Examples: "article.main", "#content", "[role=main]".
   */
  includeSelectors?: Array<string>;

  /**
   * Return a cached result if a prior scrape for the same parameters exists and is
   * younger than this many milliseconds. Defaults to 1 day (86400000 ms) when
   * omitted. Max is 30 days (2592000000 ms). Set to 0 to always scrape fresh.
   */
  maxAgeMs?: number;

  /**
   * PDF parsing controls. Use start/end to limit text extraction and OCR to an
   * inclusive 1-based page range.
   */
  pdf?: WebWebScrapeMdParams.Pdf;

  /**
   * Shorten base64-encoded image data in the Markdown output
   */
  shortenBase64Images?: boolean;

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
  useMainContentOnly?: boolean;

  /**
   * Optional browser wait time in milliseconds after initial page load before
   * converting the page to Markdown. Min: 0. Max: 30000 (30 seconds).
   */
  waitForMs?: number;
}

export namespace WebWebScrapeMdParams {
  /**
   * PDF parsing controls. Use start/end to limit text extraction and OCR to an
   * inclusive 1-based page range.
   */
  export interface Pdf {
    /**
     * Last 1-based PDF page to parse. When omitted, parsing ends at the last page.
     * Must be greater than or equal to start when both are provided.
     */
    end?: number;

    /**
     * When true, PDF URLs are fetched and parsed. When false, PDF URLs are skipped and
     * a 400 WEBSITE_ACCESS_ERROR is returned.
     */
    shouldParse?: boolean;

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
