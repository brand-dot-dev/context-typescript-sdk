// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Style extends APIResource {
  /**
   * Extract font information from a brand's website including font families, usage
   * statistics, fallbacks, and element/word counts.
   */
  extractFonts(
    query: StyleExtractFontsParams,
    options?: RequestOptions,
  ): APIPromise<StyleExtractFontsResponse> {
    return this._client.get('/brand/fonts', { query, ...options });
  }

  /**
   * Automatically extract comprehensive design system information from a brand's
   * website including colors, typography, spacing, shadows, and UI components.
   * Either 'domain' or 'directUrl' must be provided as a query parameter, but not
   * both.
   */
  extractStyleguide(
    query: StyleExtractStyleguideParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<StyleExtractStyleguideResponse> {
    return this._client.get('/brand/styleguide', { query, ...options });
  }
}

export interface StyleExtractFontsResponse {
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
  fonts: Array<StyleExtractFontsResponse.Font>;

  /**
   * Status of the response, e.g., 'ok'
   */
  status: string;
}

export namespace StyleExtractFontsResponse {
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

export interface StyleExtractStyleguideResponse {
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
  styleguide?: StyleExtractStyleguideResponse.Styleguide;
}

export namespace StyleExtractStyleguideResponse {
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

export interface StyleExtractFontsParams {
  /**
   * Domain name to extract fonts from (e.g., 'example.com', 'google.com'). The
   * domain will be automatically normalized and validated.
   */
  domain: string;

  /**
   * Optional timeout in milliseconds for the request. If the request takes longer
   * than this value, it will be aborted with a 408 status code. Maximum allowed
   * value is 300000ms (5 minutes).
   */
  timeoutMS?: number;
}

export interface StyleExtractStyleguideParams {
  /**
   * A specific URL to fetch the styleguide from directly, bypassing domain
   * resolution (e.g., 'https://example.com/design-system').
   */
  directUrl?: string;

  /**
   * Domain name to extract styleguide from (e.g., 'example.com', 'google.com'). The
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

export declare namespace Style {
  export {
    type StyleExtractFontsResponse as StyleExtractFontsResponse,
    type StyleExtractStyleguideResponse as StyleExtractStyleguideResponse,
    type StyleExtractFontsParams as StyleExtractFontsParams,
    type StyleExtractStyleguideParams as StyleExtractStyleguideParams,
  };
}
