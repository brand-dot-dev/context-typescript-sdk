// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Web extends APIResource {
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
   * Scrapes all images from the given URL. Extracts images from img, svg,
   * picture/source, link, and video elements including inline SVGs, base64 data
   * URIs, and standard URLs.
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
   * Optional parameter to specify which page type to screenshot. If provided, the
   * system will scrape the domain's links and use heuristics to find the most
   * appropriate URL for the specified page type (30 supported languages). If not
   * provided, screenshots the main domain landing page. Only applicable when using
   * 'domain', not 'directUrl'.
   */
  page?: 'login' | 'signup' | 'blog' | 'careers' | 'pricing' | 'terms' | 'privacy' | 'contact';

  /**
   * Optional parameter to prioritize screenshot capture. If 'speed', optimizes for
   * faster capture with basic quality. If 'quality', optimizes for higher quality
   * with longer wait times. Defaults to 'quality' if not provided.
   */
  prioritize?: 'speed' | 'quality';
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

  /**
   * Optional RE2-compatible regex pattern. Only URLs matching this pattern are
   * returned and counted against maxLinks.
   */
  urlRegex?: string;
}

export declare namespace Web {
  export {
    type WebExtractFontsResponse as WebExtractFontsResponse,
    type WebExtractStyleguideResponse as WebExtractStyleguideResponse,
    type WebScreenshotResponse as WebScreenshotResponse,
    type WebWebCrawlMdResponse as WebWebCrawlMdResponse,
    type WebWebScrapeHTMLResponse as WebWebScrapeHTMLResponse,
    type WebWebScrapeImagesResponse as WebWebScrapeImagesResponse,
    type WebWebScrapeMdResponse as WebWebScrapeMdResponse,
    type WebWebScrapeSitemapResponse as WebWebScrapeSitemapResponse,
    type WebExtractFontsParams as WebExtractFontsParams,
    type WebExtractStyleguideParams as WebExtractStyleguideParams,
    type WebScreenshotParams as WebScreenshotParams,
    type WebWebCrawlMdParams as WebWebCrawlMdParams,
    type WebWebScrapeHTMLParams as WebWebScrapeHTMLParams,
    type WebWebScrapeImagesParams as WebWebScrapeImagesParams,
    type WebWebScrapeMdParams as WebWebScrapeMdParams,
    type WebWebScrapeSitemapParams as WebWebScrapeSitemapParams,
  };
}
