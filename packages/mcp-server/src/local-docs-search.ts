// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

type PerLanguageData = {
  method?: string;
  example?: string;
};

type MethodEntry = {
  name: string;
  endpoint: string;
  httpMethod: string;
  summary: string;
  description: string;
  stainlessPath: string;
  qualified: string;
  params?: string[];
  response?: string;
  markdown?: string;
  perLanguage?: Record<string, PerLanguageData>;
};

type ProseChunk = {
  content: string;
  tag: string;
  sectionContext?: string;
  source?: string;
};

type MiniSearchDocument = {
  id: string;
  kind: 'http_method' | 'prose';
  name?: string;
  endpoint?: string;
  summary?: string;
  description?: string;
  qualified?: string;
  stainlessPath?: string;
  content?: string;
  sectionContext?: string;
  _original: Record<string, unknown>;
};

type SearchResult = {
  results: (string | Record<string, unknown>)[];
};

const EMBEDDED_METHODS: MethodEntry[] = [
  {
    name: 'web_scrape_html',
    endpoint: '/web/scrape/html',
    httpMethod: 'get',
    summary: 'Scrape HTML',
    description: 'Scrapes the given URL and returns the raw HTML content of the page.',
    stainlessPath: '(resource) web > (method) web_scrape_html',
    qualified: 'client.web.webScrapeHTML',
    params: [
      'url: string;',
      'excludeSelectors?: string[];',
      'headers?: object;',
      'includeFrames?: boolean;',
      'includeSelectors?: string[];',
      'maxAgeMs?: number;',
      'pdf?: { end?: number; shouldParse?: boolean; start?: number; };',
      'timeoutMS?: number;',
      'useMainContentOnly?: boolean;',
      'waitForMs?: number;',
    ],
    response:
      "{ html: string; metadata: { finalUrl: string; sourceUrl: string; additionalMeta?: object; alternates?: { href: string; hreflang?: string; title?: string; type?: string; }[]; author?: string; canonicalUrl?: string; description?: string; favicon?: string; image?: string; jsonLd?: object[]; keywords?: string[]; language?: string; modifiedTime?: string; openGraph?: object; publishedTime?: string; robots?: string; siteName?: string; title?: string; twitter?: object; }; success: true; type: 'html' | 'xml' | 'json' | 'text' | 'csv' | 'markdown' | 'svg' | 'pdf' | 'docx' | 'doc'; url: string; key_metadata?: { credits_consumed: number; credits_remaining: number; }; }",
    markdown:
      "## web_scrape_html\n\n`client.web.webScrapeHTML(url: string, excludeSelectors?: string[], headers?: object, includeFrames?: boolean, includeSelectors?: string[], maxAgeMs?: number, pdf?: { end?: number; shouldParse?: boolean; start?: number; }, timeoutMS?: number, useMainContentOnly?: boolean, waitForMs?: number): { html: string; metadata: object; success: true; type: 'html' | 'xml' | 'json' | 'text' | 'csv' | 'markdown' | 'svg' | 'pdf' | 'docx' | 'doc'; url: string; key_metadata?: object; }`\n\n**get** `/web/scrape/html`\n\nScrapes the given URL and returns the raw HTML content of the page.\n\n### Parameters\n\n- `url: string`\n  Full URL to scrape (must include http:// or https:// protocol)\n\n- `excludeSelectors?: string[]`\n  CSS selectors to remove from the result. Applied after includeSelectors. Exclusion takes precedence: an element matching both is removed. Examples: \"nav\", \"footer\", \".ad-banner\", \"[aria-hidden=true]\".\n\n- `headers?: object`\n  Optional outbound HTTP headers forwarded only to the target URL, sent as deep-object query params such as headers[X-Custom]=value. When provided, caching is bypassed: the result is neither read from nor written to cache.\n\n- `includeFrames?: boolean`\n  When true, iframes are rendered inline into the returned HTML.\n\n- `includeSelectors?: string[]`\n  CSS selectors. When provided, only matching subtrees (and their descendants) are kept and everything else is dropped. When omitted, the entire document is kept. Examples: \"article.main\", \"#content\", \"[role=main]\".\n\n- `maxAgeMs?: number`\n  Return a cached result if a prior scrape for the same parameters exists and is younger than this many milliseconds. Defaults to 1 day (86400000 ms) when omitted. Max is 30 days (2592000000 ms). Set to 0 to always scrape fresh.\n\n- `pdf?: { end?: number; shouldParse?: boolean; start?: number; }`\n  PDF parsing controls. Use start/end to limit text extraction and OCR to an inclusive 1-based page range.\n  - `end?: number`\n    Last 1-based PDF page to parse. When omitted, parsing ends at the last page. Must be greater than or equal to start when both are provided.\n  - `shouldParse?: boolean`\n    When true, PDF URLs are fetched and parsed. When false, PDF URLs are skipped and a 400 WEBSITE_ACCESS_ERROR is returned.\n  - `start?: number`\n    First 1-based PDF page to parse. When omitted, parsing starts at the first page.\n\n- `timeoutMS?: number`\n  Optional timeout in milliseconds for the request. If the request takes longer than this value, it will be aborted with a 408 status code. Maximum allowed value is 300000ms (5 minutes).\n\n- `useMainContentOnly?: boolean`\n  When true, return only the page's main content in the HTML response, excluding headers, footers, sidebars, and navigation when detectable.\n\n- `waitForMs?: number`\n  Optional browser wait time in milliseconds after initial page load. Min: 0. Max: 30000 (30 seconds). \n\n### Returns\n\n- `{ html: string; metadata: { finalUrl: string; sourceUrl: string; additionalMeta?: object; alternates?: { href: string; hreflang?: string; title?: string; type?: string; }[]; author?: string; canonicalUrl?: string; description?: string; favicon?: string; image?: string; jsonLd?: object[]; keywords?: string[]; language?: string; modifiedTime?: string; openGraph?: object; publishedTime?: string; robots?: string; siteName?: string; title?: string; twitter?: object; }; success: true; type: 'html' | 'xml' | 'json' | 'text' | 'csv' | 'markdown' | 'svg' | 'pdf' | 'docx' | 'doc'; url: string; key_metadata?: { credits_consumed: number; credits_remaining: number; }; }`\n\n  - `html: string`\n  - `metadata: { finalUrl: string; sourceUrl: string; additionalMeta?: object; alternates?: { href: string; hreflang?: string; title?: string; type?: string; }[]; author?: string; canonicalUrl?: string; description?: string; favicon?: string; image?: string; jsonLd?: object[]; keywords?: string[]; language?: string; modifiedTime?: string; openGraph?: object; publishedTime?: string; robots?: string; siteName?: string; title?: string; twitter?: object; }`\n  - `success: true`\n  - `type: 'html' | 'xml' | 'json' | 'text' | 'csv' | 'markdown' | 'svg' | 'pdf' | 'docx' | 'doc'`\n  - `url: string`\n  - `key_metadata?: { credits_consumed: number; credits_remaining: number; }`\n\n### Example\n\n```typescript\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev();\n\nconst response = await client.web.webScrapeHTML({ url: 'https://example.com' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.web.webScrapeHTML',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.web.webScrapeHTML({ url: 'https://example.com' });\n\nconsole.log(response.html);",
      },
      python: {
        method: 'web.web_scrape_html',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.web.web_scrape_html(\n    url="https://example.com",\n)\nprint(response.html)',
      },
      go: {
        method: 'client.Web.WebScrapeHTML',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/context-dot-dev/context-go-sdk"\n\t"github.com/context-dot-dev/context-go-sdk/option"\n)\n\nfunc main() {\n\tclient := contextdev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Web.WebScrapeHTML(context.TODO(), contextdev.WebWebScrapeHTMLParams{\n\t\tURL: "https://example.com",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.HTML)\n}\n',
      },
      ruby: {
        method: 'web.web_scrape_html',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nresponse = context_dev.web.web_scrape_html(url: "https://example.com")\n\nputs(response)',
      },
      cli: {
        method: 'web web_scrape_html',
        example:
          "context-dev web web-scrape-html \\\n  --api-key 'My API Key' \\\n  --url https://example.com",
      },
      php: {
        method: 'web->webScrapeHTML',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->web->webScrapeHTML(\n  url: 'https://example.com',\n  excludeSelectors: ['string'],\n  headers: ['foo' => 'J!'],\n  includeFrames: true,\n  includeSelectors: ['string'],\n  maxAgeMs: 0,\n  pdf: ['end' => 1, 'shouldParse' => true, 'start' => 1],\n  timeoutMs: 1000,\n  useMainContentOnly: true,\n  waitForMs: 0,\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl https://api.context.dev/v1/web/scrape/html \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY"',
      },
    },
  },
  {
    name: 'web_scrape_md',
    endpoint: '/web/scrape/markdown',
    httpMethod: 'get',
    summary: 'Scrape Markdown',
    description: 'Scrapes the given URL into LLM usable Markdown.',
    stainlessPath: '(resource) web > (method) web_scrape_md',
    qualified: 'client.web.webScrapeMd',
    params: [
      'url: string;',
      'excludeSelectors?: string[];',
      'headers?: object;',
      'includeFrames?: boolean;',
      'includeImages?: boolean;',
      'includeLinks?: boolean;',
      'includeSelectors?: string[];',
      'maxAgeMs?: number;',
      'pdf?: { end?: number; shouldParse?: boolean; start?: number; };',
      'shortenBase64Images?: boolean;',
      'timeoutMS?: number;',
      'useMainContentOnly?: boolean;',
      'waitForMs?: number;',
    ],
    response:
      '{ markdown: string; metadata: { finalUrl: string; sourceUrl: string; additionalMeta?: object; alternates?: { href: string; hreflang?: string; title?: string; type?: string; }[]; author?: string; canonicalUrl?: string; description?: string; favicon?: string; image?: string; jsonLd?: object[]; keywords?: string[]; language?: string; modifiedTime?: string; openGraph?: object; publishedTime?: string; robots?: string; siteName?: string; title?: string; twitter?: object; }; success: true; url: string; key_metadata?: { credits_consumed: number; credits_remaining: number; }; }',
    markdown:
      '## web_scrape_md\n\n`client.web.webScrapeMd(url: string, excludeSelectors?: string[], headers?: object, includeFrames?: boolean, includeImages?: boolean, includeLinks?: boolean, includeSelectors?: string[], maxAgeMs?: number, pdf?: { end?: number; shouldParse?: boolean; start?: number; }, shortenBase64Images?: boolean, timeoutMS?: number, useMainContentOnly?: boolean, waitForMs?: number): { markdown: string; metadata: object; success: true; url: string; key_metadata?: object; }`\n\n**get** `/web/scrape/markdown`\n\nScrapes the given URL into LLM usable Markdown.\n\n### Parameters\n\n- `url: string`\n  Full URL to scrape into LLM usable Markdown (must include http:// or https:// protocol)\n\n- `excludeSelectors?: string[]`\n  CSS selectors to remove before conversion to Markdown. Applied after includeSelectors. Exclusion takes precedence: an element matching both is removed. Examples: "nav", "footer", ".ad-banner", "[aria-hidden=true]".\n\n- `headers?: object`\n  Optional outbound HTTP headers forwarded only to the target URL, sent as deep-object query params such as headers[X-Custom]=value. When provided, caching is bypassed: the result is neither read from nor written to cache.\n\n- `includeFrames?: boolean`\n  When true, the contents of iframes are rendered to Markdown.\n\n- `includeImages?: boolean`\n  Include image references in Markdown output\n\n- `includeLinks?: boolean`\n  Preserve hyperlinks in Markdown output\n\n- `includeSelectors?: string[]`\n  CSS selectors. When provided, only matching HTML subtrees (and their descendants) are kept before conversion to Markdown. When omitted, the entire document is kept. Examples: "article.main", "#content", "[role=main]".\n\n- `maxAgeMs?: number`\n  Return a cached result if a prior scrape for the same parameters exists and is younger than this many milliseconds. Defaults to 1 day (86400000 ms) when omitted. Max is 30 days (2592000000 ms). Set to 0 to always scrape fresh.\n\n- `pdf?: { end?: number; shouldParse?: boolean; start?: number; }`\n  PDF parsing controls. Use start/end to limit text extraction and OCR to an inclusive 1-based page range.\n  - `end?: number`\n    Last 1-based PDF page to parse. When omitted, parsing ends at the last page. Must be greater than or equal to start when both are provided.\n  - `shouldParse?: boolean`\n    When true, PDF URLs are fetched and parsed. When false, PDF URLs are skipped and a 400 WEBSITE_ACCESS_ERROR is returned.\n  - `start?: number`\n    First 1-based PDF page to parse. When omitted, parsing starts at the first page.\n\n- `shortenBase64Images?: boolean`\n  Shorten base64-encoded image data in the Markdown output\n\n- `timeoutMS?: number`\n  Optional timeout in milliseconds for the request. If the request takes longer than this value, it will be aborted with a 408 status code. Maximum allowed value is 300000ms (5 minutes).\n\n- `useMainContentOnly?: boolean`\n  Extract only the main content of the page, excluding headers, footers, sidebars, and navigation\n\n- `waitForMs?: number`\n  Optional browser wait time in milliseconds after initial page load before converting the page to Markdown. Min: 0. Max: 30000 (30 seconds). \n\n### Returns\n\n- `{ markdown: string; metadata: { finalUrl: string; sourceUrl: string; additionalMeta?: object; alternates?: { href: string; hreflang?: string; title?: string; type?: string; }[]; author?: string; canonicalUrl?: string; description?: string; favicon?: string; image?: string; jsonLd?: object[]; keywords?: string[]; language?: string; modifiedTime?: string; openGraph?: object; publishedTime?: string; robots?: string; siteName?: string; title?: string; twitter?: object; }; success: true; url: string; key_metadata?: { credits_consumed: number; credits_remaining: number; }; }`\n\n  - `markdown: string`\n  - `metadata: { finalUrl: string; sourceUrl: string; additionalMeta?: object; alternates?: { href: string; hreflang?: string; title?: string; type?: string; }[]; author?: string; canonicalUrl?: string; description?: string; favicon?: string; image?: string; jsonLd?: object[]; keywords?: string[]; language?: string; modifiedTime?: string; openGraph?: object; publishedTime?: string; robots?: string; siteName?: string; title?: string; twitter?: object; }`\n  - `success: true`\n  - `url: string`\n  - `key_metadata?: { credits_consumed: number; credits_remaining: number; }`\n\n### Example\n\n```typescript\nimport ContextDev from \'context.dev\';\n\nconst client = new ContextDev();\n\nconst response = await client.web.webScrapeMd({ url: \'https://example.com\' });\n\nconsole.log(response);\n```',
    perLanguage: {
      typescript: {
        method: 'client.web.webScrapeMd',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.web.webScrapeMd({ url: 'https://example.com' });\n\nconsole.log(response.markdown);",
      },
      python: {
        method: 'web.web_scrape_md',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.web.web_scrape_md(\n    url="https://example.com",\n)\nprint(response.markdown)',
      },
      go: {
        method: 'client.Web.WebScrapeMd',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/context-dot-dev/context-go-sdk"\n\t"github.com/context-dot-dev/context-go-sdk/option"\n)\n\nfunc main() {\n\tclient := contextdev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Web.WebScrapeMd(context.TODO(), contextdev.WebWebScrapeMdParams{\n\t\tURL: "https://example.com",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Markdown)\n}\n',
      },
      ruby: {
        method: 'web.web_scrape_md',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nresponse = context_dev.web.web_scrape_md(url: "https://example.com")\n\nputs(response)',
      },
      cli: {
        method: 'web web_scrape_md',
        example: "context-dev web web-scrape-md \\\n  --api-key 'My API Key' \\\n  --url https://example.com",
      },
      php: {
        method: 'web->webScrapeMd',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->web->webScrapeMd(\n  url: 'https://example.com',\n  excludeSelectors: ['string'],\n  headers: ['foo' => 'J!'],\n  includeFrames: true,\n  includeImages: true,\n  includeLinks: true,\n  includeSelectors: ['string'],\n  maxAgeMs: 0,\n  pdf: ['end' => 1, 'shouldParse' => true, 'start' => 1],\n  shortenBase64Images: true,\n  timeoutMs: 1000,\n  useMainContentOnly: true,\n  waitForMs: 0,\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl https://api.context.dev/v1/web/scrape/markdown \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY"',
      },
    },
  },
  {
    name: 'web_scrape_images',
    endpoint: '/web/scrape/images',
    httpMethod: 'get',
    summary: 'Scrape Images',
    description:
      'Extract image assets from a web page, including standard URLs, inline SVGs, data URIs, responsive image sources, metadata, CSS backgrounds, video posters, and embeds. The base request costs 1 credit. When enrichment is enabled, the entire call costs 5 credits.',
    stainlessPath: '(resource) web > (method) web_scrape_images',
    qualified: 'client.web.webScrapeImages',
    params: [
      'url: string;',
      'enrichment?: { classification?: boolean; hostedUrl?: boolean; maxTimePerMs?: number; resolution?: boolean; };',
      'headers?: object;',
      'maxAgeMs?: number;',
      'timeoutMS?: number;',
      'waitForMs?: number;',
    ],
    response:
      "{ images: { alt: string; element: 'img' | 'svg' | 'link' | 'source' | 'video' | 'css' | 'object' | 'meta' | 'background'; src: string; type: 'url' | 'html' | 'base64'; enrichment?: { height?: number; mimetype?: string; type?: 'photography' | 'illustration' | 'logo' | 'wordmark' | 'icon' | 'pattern' | 'graphic' | 'other'; url?: string; width?: number; }; }[]; success: true; url: string; key_metadata?: { credits_consumed: number; credits_remaining: number; }; }",
    markdown:
      "## web_scrape_images\n\n`client.web.webScrapeImages(url: string, enrichment?: { classification?: boolean; hostedUrl?: boolean; maxTimePerMs?: number; resolution?: boolean; }, headers?: object, maxAgeMs?: number, timeoutMS?: number, waitForMs?: number): { images: object[]; success: true; url: string; key_metadata?: object; }`\n\n**get** `/web/scrape/images`\n\nExtract image assets from a web page, including standard URLs, inline SVGs, data URIs, responsive image sources, metadata, CSS backgrounds, video posters, and embeds. The base request costs 1 credit. When enrichment is enabled, the entire call costs 5 credits.\n\n### Parameters\n\n- `url: string`\n  Page URL to inspect. Must include http:// or https://.\n\n- `enrichment?: { classification?: boolean; hostedUrl?: boolean; maxTimePerMs?: number; resolution?: boolean; }`\n  Optional per-image processing, sent as deep-object query params such as enrichment[resolution]=true.\n  - `classification?: boolean`\n    Classify each image by visual asset type.\n  - `hostedUrl?: boolean`\n    Host materializable images on the Brand.dev CDN and return their URL and MIME type.\n  - `maxTimePerMs?: number`\n    Per-image enrichment timeout in milliseconds. Default: 30000. Maximum: 60000.\n  - `resolution?: boolean`\n    Measure image width and height when possible.\n\n- `headers?: object`\n  Optional outbound HTTP headers forwarded only to the target URL, sent as deep-object query params such as headers[X-Custom]=value. When provided, caching is bypassed: the result is neither read from nor written to cache.\n\n- `maxAgeMs?: number`\n  Reuse a cached result this many milliseconds old or newer. Default: 86400000 (1 day). Set to 0 to bypass cache. Maximum: 2592000000 (30 days).\n\n- `timeoutMS?: number`\n  Optional timeout in milliseconds for the request. If the request takes longer than this value, it will be aborted with a 408 status code. Maximum allowed value is 300000ms (5 minutes).\n\n- `waitForMs?: number`\n  Optional browser wait time in milliseconds after initial page load before collecting images. Min: 0. Max: 30000 (30 seconds). \n\n### Returns\n\n- `{ images: { alt: string; element: 'img' | 'svg' | 'link' | 'source' | 'video' | 'css' | 'object' | 'meta' | 'background'; src: string; type: 'url' | 'html' | 'base64'; enrichment?: { height?: number; mimetype?: string; type?: 'photography' | 'illustration' | 'logo' | 'wordmark' | 'icon' | 'pattern' | 'graphic' | 'other'; url?: string; width?: number; }; }[]; success: true; url: string; key_metadata?: { credits_consumed: number; credits_remaining: number; }; }`\n\n  - `images: { alt: string; element: 'img' | 'svg' | 'link' | 'source' | 'video' | 'css' | 'object' | 'meta' | 'background'; src: string; type: 'url' | 'html' | 'base64'; enrichment?: { height?: number; mimetype?: string; type?: 'photography' | 'illustration' | 'logo' | 'wordmark' | 'icon' | 'pattern' | 'graphic' | 'other'; url?: string; width?: number; }; }[]`\n  - `success: true`\n  - `url: string`\n  - `key_metadata?: { credits_consumed: number; credits_remaining: number; }`\n\n### Example\n\n```typescript\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev();\n\nconst response = await client.web.webScrapeImages({ url: 'https://example.com' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.web.webScrapeImages',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.web.webScrapeImages({ url: 'https://example.com' });\n\nconsole.log(response.images);",
      },
      python: {
        method: 'web.web_scrape_images',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.web.web_scrape_images(\n    url="https://example.com",\n)\nprint(response.images)',
      },
      go: {
        method: 'client.Web.WebScrapeImages',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/context-dot-dev/context-go-sdk"\n\t"github.com/context-dot-dev/context-go-sdk/option"\n)\n\nfunc main() {\n\tclient := contextdev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Web.WebScrapeImages(context.TODO(), contextdev.WebWebScrapeImagesParams{\n\t\tURL: "https://example.com",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Images)\n}\n',
      },
      ruby: {
        method: 'web.web_scrape_images',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nresponse = context_dev.web.web_scrape_images(url: "https://example.com")\n\nputs(response)',
      },
      cli: {
        method: 'web web_scrape_images',
        example:
          "context-dev web web-scrape-images \\\n  --api-key 'My API Key' \\\n  --url https://example.com",
      },
      php: {
        method: 'web->webScrapeImages',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->web->webScrapeImages(\n  url: 'https://example.com',\n  enrichment: [\n    'classification' => true,\n    'hostedURL' => true,\n    'maxTimePerMs' => 1,\n    'resolution' => true,\n  ],\n  headers: ['foo' => 'J!'],\n  maxAgeMs: 0,\n  timeoutMs: 1000,\n  waitForMs: 0,\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl https://api.context.dev/v1/web/scrape/images \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY"',
      },
    },
  },
  {
    name: 'web_scrape_sitemap',
    endpoint: '/web/scrape/sitemap',
    httpMethod: 'get',
    summary: 'Crawl Sitemap',
    description: "Crawl an entire website's sitemap and return all discovered page URLs.",
    stainlessPath: '(resource) web > (method) web_scrape_sitemap',
    qualified: 'client.web.webScrapeSitemap',
    params: [
      'domain: string;',
      'headers?: object;',
      'maxLinks?: number;',
      'timeoutMS?: number;',
      'urlRegex?: string;',
    ],
    response:
      '{ domain: string; meta: { errors: number; sitemapsDiscovered: number; sitemapsFetched: number; sitemapsSkipped: number; }; success: true; urls: string[]; key_metadata?: { credits_consumed: number; credits_remaining: number; }; }',
    markdown:
      "## web_scrape_sitemap\n\n`client.web.webScrapeSitemap(domain: string, headers?: object, maxLinks?: number, timeoutMS?: number, urlRegex?: string): { domain: string; meta: object; success: true; urls: string[]; key_metadata?: object; }`\n\n**get** `/web/scrape/sitemap`\n\nCrawl an entire website's sitemap and return all discovered page URLs.\n\n### Parameters\n\n- `domain: string`\n  Domain to build a sitemap for\n\n- `headers?: object`\n  Optional outbound HTTP headers forwarded only to the target URL, sent as deep-object query params such as headers[X-Custom]=value. When provided, caching is bypassed: the result is neither read from nor written to cache.\n\n- `maxLinks?: number`\n  Maximum number of links to return from the sitemap crawl. Defaults to 10,000. Minimum is 1, maximum is 100,000.\n\n- `timeoutMS?: number`\n  Optional timeout in milliseconds for the request. If the request takes longer than this value, it will be aborted with a 408 status code. Maximum allowed value is 300000ms (5 minutes).\n\n- `urlRegex?: string`\n  Optional RE2-compatible regex pattern. Only URLs matching this pattern are returned and counted against maxLinks.\n\n### Returns\n\n- `{ domain: string; meta: { errors: number; sitemapsDiscovered: number; sitemapsFetched: number; sitemapsSkipped: number; }; success: true; urls: string[]; key_metadata?: { credits_consumed: number; credits_remaining: number; }; }`\n\n  - `domain: string`\n  - `meta: { errors: number; sitemapsDiscovered: number; sitemapsFetched: number; sitemapsSkipped: number; }`\n  - `success: true`\n  - `urls: string[]`\n  - `key_metadata?: { credits_consumed: number; credits_remaining: number; }`\n\n### Example\n\n```typescript\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev();\n\nconst response = await client.web.webScrapeSitemap({ domain: 'domain' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.web.webScrapeSitemap',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.web.webScrapeSitemap({ domain: 'domain' });\n\nconsole.log(response.domain);",
      },
      python: {
        method: 'web.web_scrape_sitemap',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.web.web_scrape_sitemap(\n    domain="domain",\n)\nprint(response.domain)',
      },
      go: {
        method: 'client.Web.WebScrapeSitemap',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/context-dot-dev/context-go-sdk"\n\t"github.com/context-dot-dev/context-go-sdk/option"\n)\n\nfunc main() {\n\tclient := contextdev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Web.WebScrapeSitemap(context.TODO(), contextdev.WebWebScrapeSitemapParams{\n\t\tDomain: "domain",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Domain)\n}\n',
      },
      ruby: {
        method: 'web.web_scrape_sitemap',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nresponse = context_dev.web.web_scrape_sitemap(domain: "domain")\n\nputs(response)',
      },
      cli: {
        method: 'web web_scrape_sitemap',
        example: "context-dev web web-scrape-sitemap \\\n  --api-key 'My API Key' \\\n  --domain domain",
      },
      php: {
        method: 'web->webScrapeSitemap',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->web->webScrapeSitemap(\n  domain: 'domain',\n  headers: ['foo' => 'J!'],\n  maxLinks: 1,\n  timeoutMs: 1000,\n  urlRegex: '^https?://[^/]+/blog/',\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl https://api.context.dev/v1/web/scrape/sitemap \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY"',
      },
    },
  },
  {
    name: 'screenshot',
    endpoint: '/web/screenshot',
    httpMethod: 'get',
    summary: 'Scrape Screenshot',
    description: 'Capture a screenshot of a website.',
    stainlessPath: '(resource) web > (method) screenshot',
    qualified: 'client.web.screenshot',
    params: [
      'directUrl?: string;',
      'domain?: string;',
      "fullScreenshot?: 'true' | 'false';",
      "handleCookiePopup?: 'true' | 'false';",
      'maxAgeMs?: number;',
      "page?: 'login' | 'signup' | 'blog' | 'careers' | 'pricing' | 'terms' | 'privacy' | 'contact';",
      'timeoutMS?: number;',
      'viewport?: { height?: number; width?: number; };',
      'waitForMs?: number;',
    ],
    response:
      "{ code?: number; domain?: string; height?: number; key_metadata?: { credits_consumed: number; credits_remaining: number; }; screenshot?: string; screenshotType?: 'viewport' | 'fullPage'; status?: string; width?: number; }",
    markdown:
      "## screenshot\n\n`client.web.screenshot(directUrl?: string, domain?: string, fullScreenshot?: 'true' | 'false', handleCookiePopup?: 'true' | 'false', maxAgeMs?: number, page?: 'login' | 'signup' | 'blog' | 'careers' | 'pricing' | 'terms' | 'privacy' | 'contact', timeoutMS?: number, viewport?: { height?: number; width?: number; }, waitForMs?: number): { code?: number; domain?: string; height?: number; key_metadata?: object; screenshot?: string; screenshotType?: 'viewport' | 'fullPage'; status?: string; width?: number; }`\n\n**get** `/web/screenshot`\n\nCapture a screenshot of a website.\n\n### Parameters\n\n- `directUrl?: string`\n  A specific URL to screenshot directly, bypassing domain resolution (e.g., 'https://example.com/pricing'). When provided, the screenshot is taken of this exact URL. You must provide either 'domain' or 'directUrl', but not both.\n\n- `domain?: string`\n  Domain name to take screenshot of (e.g., 'example.com', 'google.com'). The domain will be automatically normalized and validated. You must provide either 'domain' or 'directUrl', but not both.\n\n- `fullScreenshot?: 'true' | 'false'`\n  Optional parameter to determine screenshot type. If 'true', takes a full page screenshot capturing all content. If 'false' or not provided, takes a viewport screenshot (standard browser view).\n\n- `handleCookiePopup?: 'true' | 'false'`\n  Optional parameter to control cookie/consent popup handling. If 'true', we dismiss cookie banner before capture. If 'false' or not provided, captures the page without that step.\n\n- `maxAgeMs?: number`\n  Return a cached screenshot if a prior screenshot for the same parameters exists and is younger than this many milliseconds. Defaults to 1 day (86400000 ms) when omitted. Max is 30 days (2592000000 ms). Set to 0 to always capture fresh.\n\n- `page?: 'login' | 'signup' | 'blog' | 'careers' | 'pricing' | 'terms' | 'privacy' | 'contact'`\n  Optional parameter to specify which page type to screenshot. If provided, the system will scrape the domain's links and use heuristics to find the most appropriate URL for the specified page type (30 supported languages). If not provided, screenshots the main domain landing page. Only applicable when using 'domain', not 'directUrl'.\n\n- `timeoutMS?: number`\n  Optional timeout in milliseconds for the request. If the request takes longer than this value, it will be aborted with a 408 status code. Maximum allowed value is 300000ms (5 minutes).\n\n- `viewport?: { height?: number; width?: number; }`\n  Optional browser viewport dimensions for the screenshot. Defaults to 1920x1080.\n  - `height?: number`\n    Viewport height in pixels.\n  - `width?: number`\n    Viewport width in pixels.\n\n- `waitForMs?: number`\n  Optional browser wait time in milliseconds after initial page load before taking the screenshot. Min: 0. Max: 30000 (30 seconds).  Defaults to 3000 ms when omitted.\n\n### Returns\n\n- `{ code?: number; domain?: string; height?: number; key_metadata?: { credits_consumed: number; credits_remaining: number; }; screenshot?: string; screenshotType?: 'viewport' | 'fullPage'; status?: string; width?: number; }`\n\n  - `code?: number`\n  - `domain?: string`\n  - `height?: number`\n  - `key_metadata?: { credits_consumed: number; credits_remaining: number; }`\n  - `screenshot?: string`\n  - `screenshotType?: 'viewport' | 'fullPage'`\n  - `status?: string`\n  - `width?: number`\n\n### Example\n\n```typescript\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev();\n\nconst response = await client.web.screenshot();\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.web.screenshot',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.web.screenshot();\n\nconsole.log(response.width);",
      },
      python: {
        method: 'web.screenshot',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.web.screenshot()\nprint(response.width)',
      },
      go: {
        method: 'client.Web.Screenshot',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/context-dot-dev/context-go-sdk"\n\t"github.com/context-dot-dev/context-go-sdk/option"\n)\n\nfunc main() {\n\tclient := contextdev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Web.Screenshot(context.TODO(), contextdev.WebScreenshotParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Width)\n}\n',
      },
      ruby: {
        method: 'web.screenshot',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nresponse = context_dev.web.screenshot\n\nputs(response)',
      },
      cli: {
        method: 'web screenshot',
        example: "context-dev web screenshot \\\n  --api-key 'My API Key'",
      },
      php: {
        method: 'web->screenshot',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->web->screenshot(\n  directURL: 'https://example.com',\n  domain: 'domain',\n  fullScreenshot: 'true',\n  handleCookiePopup: 'true',\n  maxAgeMs: 0,\n  page: 'login',\n  timeoutMs: 1000,\n  viewport: ['height' => 240, 'width' => 240],\n  waitForMs: 0,\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl https://api.context.dev/v1/web/screenshot \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY"',
      },
    },
  },
  {
    name: 'web_crawl_md',
    endpoint: '/web/crawl',
    httpMethod: 'post',
    summary: 'Crawl Website & Scrape Markdown',
    description:
      'Performs a crawl starting from a given URL, extracts page content as Markdown, and returns results for all crawled pages.',
    stainlessPath: '(resource) web > (method) web_crawl_md',
    qualified: 'client.web.webCrawlMd',
    params: [
      'url: string;',
      'excludeSelectors?: string[];',
      'followSubdomains?: boolean;',
      'includeFrames?: boolean;',
      'includeImages?: boolean;',
      'includeLinks?: boolean;',
      'includeSelectors?: string[];',
      'maxAgeMs?: number;',
      'maxDepth?: number;',
      'maxPages?: number;',
      'pdf?: { end?: number; shouldParse?: boolean; start?: number; };',
      'shortenBase64Images?: boolean;',
      'stopAfterMs?: number;',
      'timeoutMS?: number;',
      'urlRegex?: string;',
      'useMainContentOnly?: boolean;',
      'waitForMs?: number;',
    ],
    response:
      '{ metadata: { maxCrawlDepth: number; numFailed: number; numSkipped: number; numSucceeded: number; numUrls: number; }; results: { markdown: string; metadata: { crawlDepth: number; finalUrl: string; sourceUrl: string; statusCode: number; success: boolean; title: string; url: string; additionalMeta?: object; alternates?: object[]; author?: string; canonicalUrl?: string; description?: string; favicon?: string; image?: string; jsonLd?: object[]; keywords?: string[]; language?: string; modifiedTime?: string; openGraph?: object; publishedTime?: string; robots?: string; siteName?: string; twitter?: object; }; }[]; key_metadata?: { credits_consumed: number; credits_remaining: number; }; }',
    markdown:
      '## web_crawl_md\n\n`client.web.webCrawlMd(url: string, excludeSelectors?: string[], followSubdomains?: boolean, includeFrames?: boolean, includeImages?: boolean, includeLinks?: boolean, includeSelectors?: string[], maxAgeMs?: number, maxDepth?: number, maxPages?: number, pdf?: { end?: number; shouldParse?: boolean; start?: number; }, shortenBase64Images?: boolean, stopAfterMs?: number, timeoutMS?: number, urlRegex?: string, useMainContentOnly?: boolean, waitForMs?: number): { metadata: object; results: object[]; key_metadata?: object; }`\n\n**post** `/web/crawl`\n\nPerforms a crawl starting from a given URL, extracts page content as Markdown, and returns results for all crawled pages.\n\n### Parameters\n\n- `url: string`\n  The starting URL for the crawl (must include http:// or https:// protocol)\n\n- `excludeSelectors?: string[]`\n  CSS selectors to remove before each crawled page is converted to Markdown. Applied after includeSelectors. Exclusion takes precedence: an element matching both is removed. Examples: "nav", "footer", ".ad-banner", "[aria-hidden=true]".\n\n- `followSubdomains?: boolean`\n  When true, follow links on subdomains of the starting URL\'s domain (e.g. docs.example.com when starting from example.com). www and apex are always treated as equivalent.\n\n- `includeFrames?: boolean`\n  When true, the contents of iframes are rendered to Markdown for each crawled page.\n\n- `includeImages?: boolean`\n  Include image references in the Markdown output\n\n- `includeLinks?: boolean`\n  Preserve hyperlinks in the Markdown output\n\n- `includeSelectors?: string[]`\n  CSS selectors. When provided, only matching HTML subtrees (and their descendants) are kept before each crawled page is converted to Markdown. When omitted, the entire document is kept. Examples: "article.main", "#content", "[role=main]".\n\n- `maxAgeMs?: number`\n  Return a cached result if a prior scrape for the same parameters exists and is younger than this many milliseconds. Defaults to 1 day (86400000 ms) when omitted. Max is 30 days (2592000000 ms). Set to 0 to always scrape fresh.\n\n- `maxDepth?: number`\n  Maximum link depth from the starting URL (0 = only the starting page)\n\n- `maxPages?: number`\n  Maximum number of pages to crawl. Hard cap: 500.\n\n- `pdf?: { end?: number; shouldParse?: boolean; start?: number; }`\n  PDF parsing controls. Use start/end to limit text extraction and OCR to an inclusive 1-based page range.\n  - `end?: number`\n    Last 1-based PDF page to parse. When omitted, parsing ends at the last page. Must be greater than or equal to start when both are provided.\n  - `shouldParse?: boolean`\n    When true, PDF pages are fetched and parsed. When false, PDF pages are skipped entirely (not included in results and not counted as failures).\n  - `start?: number`\n    First 1-based PDF page to parse. When omitted, parsing starts at the first page.\n\n- `shortenBase64Images?: boolean`\n  Truncate base64-encoded image data in the Markdown output\n\n- `stopAfterMs?: number`\n  Soft time budget for the crawl in milliseconds. After each scrape, the crawler checks the elapsed time and, if exceeded, returns the pages collected so far instead of continuing. Min: 10000 (10s). Max: 110000 (110s). Default: 80000 (80s).\n\n- `timeoutMS?: number`\n  Optional timeout in milliseconds for the request. If the request takes longer than this value, it will be aborted with a 408 status code. Maximum allowed value is 300000ms (5 minutes).\n\n- `urlRegex?: string`\n  Regex pattern. Only URLs matching this pattern will be followed and scraped.\n\n- `useMainContentOnly?: boolean`\n  Extract only the main content, stripping headers, footers, sidebars, and navigation\n\n- `waitForMs?: number`\n  Optional browser wait time in milliseconds after initial page load for each crawled page. Min: 0. Max: 30000 (30 seconds). \n\n### Returns\n\n- `{ metadata: { maxCrawlDepth: number; numFailed: number; numSkipped: number; numSucceeded: number; numUrls: number; }; results: { markdown: string; metadata: { crawlDepth: number; finalUrl: string; sourceUrl: string; statusCode: number; success: boolean; title: string; url: string; additionalMeta?: object; alternates?: object[]; author?: string; canonicalUrl?: string; description?: string; favicon?: string; image?: string; jsonLd?: object[]; keywords?: string[]; language?: string; modifiedTime?: string; openGraph?: object; publishedTime?: string; robots?: string; siteName?: string; twitter?: object; }; }[]; key_metadata?: { credits_consumed: number; credits_remaining: number; }; }`\n\n  - `metadata: { maxCrawlDepth: number; numFailed: number; numSkipped: number; numSucceeded: number; numUrls: number; }`\n  - `results: { markdown: string; metadata: { crawlDepth: number; finalUrl: string; sourceUrl: string; statusCode: number; success: boolean; title: string; url: string; additionalMeta?: object; alternates?: { href: string; hreflang?: string; title?: string; type?: string; }[]; author?: string; canonicalUrl?: string; description?: string; favicon?: string; image?: string; jsonLd?: object[]; keywords?: string[]; language?: string; modifiedTime?: string; openGraph?: object; publishedTime?: string; robots?: string; siteName?: string; twitter?: object; }; }[]`\n  - `key_metadata?: { credits_consumed: number; credits_remaining: number; }`\n\n### Example\n\n```typescript\nimport ContextDev from \'context.dev\';\n\nconst client = new ContextDev();\n\nconst response = await client.web.webCrawlMd({ url: \'https://example.com\' });\n\nconsole.log(response);\n```',
    perLanguage: {
      typescript: {
        method: 'client.web.webCrawlMd',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.web.webCrawlMd({ url: 'https://example.com' });\n\nconsole.log(response.metadata);",
      },
      python: {
        method: 'web.web_crawl_md',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.web.web_crawl_md(\n    url="https://example.com",\n)\nprint(response.metadata)',
      },
      go: {
        method: 'client.Web.WebCrawlMd',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/context-dot-dev/context-go-sdk"\n\t"github.com/context-dot-dev/context-go-sdk/option"\n)\n\nfunc main() {\n\tclient := contextdev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Web.WebCrawlMd(context.TODO(), contextdev.WebWebCrawlMdParams{\n\t\tURL: "https://example.com",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Metadata)\n}\n',
      },
      ruby: {
        method: 'web.web_crawl_md',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nresponse = context_dev.web.web_crawl_md(url: "https://example.com")\n\nputs(response)',
      },
      cli: {
        method: 'web web_crawl_md',
        example: "context-dev web web-crawl-md \\\n  --api-key 'My API Key' \\\n  --url https://example.com",
      },
      php: {
        method: 'web->webCrawlMd',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->web->webCrawlMd(\n  url: 'https://example.com',\n  excludeSelectors: ['string'],\n  followSubdomains: true,\n  includeFrames: true,\n  includeImages: true,\n  includeLinks: true,\n  includeSelectors: ['string'],\n  maxAgeMs: 0,\n  maxDepth: 0,\n  maxPages: 1,\n  pdf: ['end' => 1, 'shouldParse' => true, 'start' => 1],\n  shortenBase64Images: true,\n  stopAfterMs: 10000,\n  timeoutMs: 1000,\n  urlRegex: '^https?://[^/]+/blog/',\n  useMainContentOnly: true,\n  waitForMs: 0,\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl https://api.context.dev/v1/web/crawl \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY" \\\n    -d \'{\n          "url": "https://example.com",\n          "urlRegex": "^https?://[^/]+/blog/"\n        }\'',
      },
    },
  },
  {
    name: 'extract_fonts',
    endpoint: '/web/fonts',
    httpMethod: 'get',
    summary: 'Scrape Fonts',
    description:
      'Scrape font information from a website including font families, usage statistics, fallbacks, and element/word counts.',
    stainlessPath: '(resource) web > (method) extract_fonts',
    qualified: 'client.web.extractFonts',
    params: ['directUrl?: string;', 'domain?: string;', 'maxAgeMs?: number;', 'timeoutMS?: number;'],
    response:
      '{ code: number; domain: string; fonts: { fallbacks: string[]; font: string; num_elements: number; num_words: number; percent_elements: number; percent_words: number; uses: string[]; }[]; status: string; fontLinks?: object; key_metadata?: { credits_consumed: number; credits_remaining: number; }; }',
    markdown:
      "## extract_fonts\n\n`client.web.extractFonts(directUrl?: string, domain?: string, maxAgeMs?: number, timeoutMS?: number): { code: number; domain: string; fonts: object[]; status: string; fontLinks?: object; key_metadata?: object; }`\n\n**get** `/web/fonts`\n\nScrape font information from a website including font families, usage statistics, fallbacks, and element/word counts.\n\n### Parameters\n\n- `directUrl?: string`\n  A specific URL to fetch fonts from directly, bypassing domain resolution (e.g., 'https://example.com/design-system'). When provided, fonts are extracted from this exact URL. You must provide either 'domain' or 'directUrl', but not both.\n\n- `domain?: string`\n  Domain name to extract fonts from (e.g., 'example.com', 'google.com'). The domain will be automatically normalized and validated. You must provide either 'domain' or 'directUrl', but not both.\n\n- `maxAgeMs?: number`\n  Maximum age in milliseconds for cached data before the API performs a hard refresh. Defaults to 3 months (7776000000 ms). Values below 1 day (86400000 ms) are clamped to 1 day; values above 1 year (31536000000 ms) are clamped to 1 year.\n\n- `timeoutMS?: number`\n  Optional timeout in milliseconds for the request. If the request takes longer than this value, it will be aborted with a 408 status code. Maximum allowed value is 300000ms (5 minutes).\n\n### Returns\n\n- `{ code: number; domain: string; fonts: { fallbacks: string[]; font: string; num_elements: number; num_words: number; percent_elements: number; percent_words: number; uses: string[]; }[]; status: string; fontLinks?: object; key_metadata?: { credits_consumed: number; credits_remaining: number; }; }`\n\n  - `code: number`\n  - `domain: string`\n  - `fonts: { fallbacks: string[]; font: string; num_elements: number; num_words: number; percent_elements: number; percent_words: number; uses: string[]; }[]`\n  - `status: string`\n  - `fontLinks?: object`\n  - `key_metadata?: { credits_consumed: number; credits_remaining: number; }`\n\n### Example\n\n```typescript\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev();\n\nconst response = await client.web.extractFonts();\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.web.extractFonts',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.web.extractFonts();\n\nconsole.log(response.code);",
      },
      python: {
        method: 'web.extract_fonts',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.web.extract_fonts()\nprint(response.code)',
      },
      go: {
        method: 'client.Web.ExtractFonts',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/context-dot-dev/context-go-sdk"\n\t"github.com/context-dot-dev/context-go-sdk/option"\n)\n\nfunc main() {\n\tclient := contextdev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Web.ExtractFonts(context.TODO(), contextdev.WebExtractFontsParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Code)\n}\n',
      },
      ruby: {
        method: 'web.extract_fonts',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nresponse = context_dev.web.extract_fonts\n\nputs(response)',
      },
      cli: {
        method: 'web extract_fonts',
        example: "context-dev web extract-fonts \\\n  --api-key 'My API Key'",
      },
      php: {
        method: 'web->extractFonts',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->web->extractFonts(\n  directURL: 'https://example.com',\n  domain: 'domain',\n  maxAgeMs: 86400000,\n  timeoutMs: 1000,\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl https://api.context.dev/v1/web/fonts \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY"',
      },
    },
  },
  {
    name: 'extract_styleguide',
    endpoint: '/web/styleguide',
    httpMethod: 'get',
    summary: 'Scrape Styleguide',
    description:
      'Extract a comprehensive design system from a website including colors, typography, spacing, shadows, and UI components.',
    stainlessPath: '(resource) web > (method) extract_styleguide',
    qualified: 'client.web.extractStyleguide',
    params: ['directUrl?: string;', 'domain?: string;', 'maxAgeMs?: number;', 'timeoutMS?: number;'],
    response:
      "{ code?: number; domain?: string; key_metadata?: { credits_consumed: number; credits_remaining: number; }; status?: string; styleguide?: { colors: { accent: string; background: string; text: string; }; components: { button: object; card?: object; }; elementSpacing: { lg: string; md: string; sm: string; xl: string; xs: string; }; fontLinks: object; mode: 'light' | 'dark'; shadows: { inner: string; lg: string; md: string; sm: string; xl: string; }; typography: { headings: object; p?: object; }; }; }",
    markdown:
      "## extract_styleguide\n\n`client.web.extractStyleguide(directUrl?: string, domain?: string, maxAgeMs?: number, timeoutMS?: number): { code?: number; domain?: string; key_metadata?: object; status?: string; styleguide?: object; }`\n\n**get** `/web/styleguide`\n\nExtract a comprehensive design system from a website including colors, typography, spacing, shadows, and UI components.\n\n### Parameters\n\n- `directUrl?: string`\n  A specific URL to fetch the styleguide from directly, bypassing domain resolution (e.g., 'https://example.com/design-system'). When provided, the styleguide is extracted from this exact URL. You must provide either 'domain' or 'directUrl', but not both.\n\n- `domain?: string`\n  Domain name to extract styleguide from (e.g., 'example.com', 'google.com'). The domain will be automatically normalized and validated. You must provide either 'domain' or 'directUrl', but not both.\n\n- `maxAgeMs?: number`\n  Maximum age in milliseconds for cached data before the API performs a hard refresh. Defaults to 3 months (7776000000 ms). Values below 1 day (86400000 ms) are clamped to 1 day; values above 1 year (31536000000 ms) are clamped to 1 year.\n\n- `timeoutMS?: number`\n  Optional timeout in milliseconds for the request. If the request takes longer than this value, it will be aborted with a 408 status code. Maximum allowed value is 300000ms (5 minutes).\n\n### Returns\n\n- `{ code?: number; domain?: string; key_metadata?: { credits_consumed: number; credits_remaining: number; }; status?: string; styleguide?: { colors: { accent: string; background: string; text: string; }; components: { button: object; card?: object; }; elementSpacing: { lg: string; md: string; sm: string; xl: string; xs: string; }; fontLinks: object; mode: 'light' | 'dark'; shadows: { inner: string; lg: string; md: string; sm: string; xl: string; }; typography: { headings: object; p?: object; }; }; }`\n\n  - `code?: number`\n  - `domain?: string`\n  - `key_metadata?: { credits_consumed: number; credits_remaining: number; }`\n  - `status?: string`\n  - `styleguide?: { colors: { accent: string; background: string; text: string; }; components: { button: { link?: { backgroundColor: string; borderColor: string; borderRadius: string; borderStyle: string; borderWidth: string; boxShadow: string; color: string; css: string; fontSize: string; fontWeight: number; minHeight: string; minWidth: string; padding: string; textDecoration: string; fontFallbacks?: string[]; fontFamily?: string; textDecorationColor?: string; }; primary?: { backgroundColor: string; borderColor: string; borderRadius: string; borderStyle: string; borderWidth: string; boxShadow: string; color: string; css: string; fontSize: string; fontWeight: number; minHeight: string; minWidth: string; padding: string; textDecoration: string; fontFallbacks?: string[]; fontFamily?: string; textDecorationColor?: string; }; secondary?: { backgroundColor: string; borderColor: string; borderRadius: string; borderStyle: string; borderWidth: string; boxShadow: string; color: string; css: string; fontSize: string; fontWeight: number; minHeight: string; minWidth: string; padding: string; textDecoration: string; fontFallbacks?: string[]; fontFamily?: string; textDecorationColor?: string; }; }; card?: { backgroundColor: string; borderColor: string; borderRadius: string; borderStyle: string; borderWidth: string; boxShadow: string; css: string; padding: string; textColor: string; }; }; elementSpacing: { lg: string; md: string; sm: string; xl: string; xs: string; }; fontLinks: object; mode: 'light' | 'dark'; shadows: { inner: string; lg: string; md: string; sm: string; xl: string; }; typography: { headings: { h1?: { fontFallbacks: string[]; fontFamily: string; fontSize: string; fontWeight: number; letterSpacing: string; lineHeight: string; }; h2?: { fontFallbacks: string[]; fontFamily: string; fontSize: string; fontWeight: number; letterSpacing: string; lineHeight: string; }; h3?: { fontFallbacks: string[]; fontFamily: string; fontSize: string; fontWeight: number; letterSpacing: string; lineHeight: string; }; h4?: { fontFallbacks: string[]; fontFamily: string; fontSize: string; fontWeight: number; letterSpacing: string; lineHeight: string; }; }; p?: { fontFallbacks: string[]; fontFamily: string; fontSize: string; fontWeight: number; letterSpacing: string; lineHeight: string; }; }; }`\n\n### Example\n\n```typescript\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev();\n\nconst response = await client.web.extractStyleguide();\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.web.extractStyleguide',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.web.extractStyleguide();\n\nconsole.log(response.styleguide);",
      },
      python: {
        method: 'web.extract_styleguide',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.web.extract_styleguide()\nprint(response.styleguide)',
      },
      go: {
        method: 'client.Web.ExtractStyleguide',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/context-dot-dev/context-go-sdk"\n\t"github.com/context-dot-dev/context-go-sdk/option"\n)\n\nfunc main() {\n\tclient := contextdev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Web.ExtractStyleguide(context.TODO(), contextdev.WebExtractStyleguideParams{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Styleguide)\n}\n',
      },
      ruby: {
        method: 'web.extract_styleguide',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nresponse = context_dev.web.extract_styleguide\n\nputs(response)',
      },
      cli: {
        method: 'web extract_styleguide',
        example: "context-dev web extract-styleguide \\\n  --api-key 'My API Key'",
      },
      php: {
        method: 'web->extractStyleguide',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->web->extractStyleguide(\n  directURL: 'https://example.com',\n  domain: 'domain',\n  maxAgeMs: 86400000,\n  timeoutMs: 1000,\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl https://api.context.dev/v1/web/styleguide \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY"',
      },
    },
  },
  {
    name: 'search',
    endpoint: '/web/search',
    httpMethod: 'post',
    summary: 'Web Search',
    description: 'Search the web and optionally scrape each result to Markdown in one round-trip.',
    stainlessPath: '(resource) web > (method) search',
    qualified: 'client.web.search',
    params: [
      'query: string;',
      'excludeDomains?: string[];',
      "freshness?: 'last_24_hours' | 'last_week' | 'last_month' | 'last_year';",
      'includeDomains?: string[];',
      'markdownOptions?: { enabled?: boolean; includeFrames?: boolean; includeImages?: boolean; includeLinks?: boolean; maxAgeMs?: number; pdf?: { end?: number; shouldParse?: boolean; start?: number; }; shortenBase64Images?: boolean; timeoutMS?: number; useMainContentOnly?: boolean; waitForMs?: number; };',
      'queryFanout?: boolean;',
      'timeoutMS?: number;',
    ],
    response:
      "{ query: string; results: { description: string; markdown: { code: 'SUCCESS' | 'NOT_REQUESTED' | 'TIMEOUT' | 'WEBSITE_ACCESS_ERROR' | 'ERROR'; markdown: string; }; relevance: 'high' | 'medium' | 'low'; title: string; url: string; }[]; key_metadata?: { credits_consumed: number; credits_remaining: number; }; }",
    markdown:
      "## search\n\n`client.web.search(query: string, excludeDomains?: string[], freshness?: 'last_24_hours' | 'last_week' | 'last_month' | 'last_year', includeDomains?: string[], markdownOptions?: { enabled?: boolean; includeFrames?: boolean; includeImages?: boolean; includeLinks?: boolean; maxAgeMs?: number; pdf?: { end?: number; shouldParse?: boolean; start?: number; }; shortenBase64Images?: boolean; timeoutMS?: number; useMainContentOnly?: boolean; waitForMs?: number; }, queryFanout?: boolean, timeoutMS?: number): { query: string; results: object[]; key_metadata?: object; }`\n\n**post** `/web/search`\n\nSearch the web and optionally scrape each result to Markdown in one round-trip.\n\n### Parameters\n\n- `query: string`\n  Natural-language search query.\n\n- `excludeDomains?: string[]`\n  Blocklist — drop results from these domains. Example: [\"pinterest.com\", \"reddit.com\"].\n\n- `freshness?: 'last_24_hours' | 'last_week' | 'last_month' | 'last_year'`\n  Restrict results to content published within this window.\n\n- `includeDomains?: string[]`\n  Allowlist — only return results from these domains. Example: [\"arxiv.org\", \"github.com\"].\n\n- `markdownOptions?: { enabled?: boolean; includeFrames?: boolean; includeImages?: boolean; includeLinks?: boolean; maxAgeMs?: number; pdf?: { end?: number; shouldParse?: boolean; start?: number; }; shortenBase64Images?: boolean; timeoutMS?: number; useMainContentOnly?: boolean; waitForMs?: number; }`\n  Inline Markdown scraping for each result. Set `enabled: true` to activate.\n  - `enabled?: boolean`\n    Scrape each result to Markdown. Off by default to keep search cheap and fast.\n  - `includeFrames?: boolean`\n    Render iframe contents into the Markdown.\n  - `includeImages?: boolean`\n    Emit image references in the Markdown.\n  - `includeLinks?: boolean`\n    Keep hyperlinks in the Markdown.\n  - `maxAgeMs?: number`\n    Cache TTL in ms for scraped Markdown keyed by URL + options. Default 1 day, max 30 days. Set to 0 to force a fresh scrape.\n  - `pdf?: { end?: number; shouldParse?: boolean; start?: number; }`\n    PDF handling. Use start/end to bound text extraction and OCR to a page range.\n  - `shortenBase64Images?: boolean`\n    Truncate inline base64 image payloads to keep responses small.\n  - `timeoutMS?: number`\n    Optional timeout in milliseconds for the request. If the request takes longer than this value, it will be aborted with a 408 status code. Maximum allowed value is 300000ms (5 minutes).\n  - `useMainContentOnly?: boolean`\n    Strip nav, header, footer, and sidebar — keep only the primary article content.\n  - `waitForMs?: number`\n    Extra wait after page load before rendering, in ms (0–30000). Useful for JS-heavy pages.\n\n- `queryFanout?: boolean`\n  Expand the query into multiple parallel variants for broader recall.\n\n- `timeoutMS?: number`\n  Optional timeout in milliseconds for the request. If the request takes longer than this value, it will be aborted with a 408 status code. Maximum allowed value is 300000ms (5 minutes).\n\n### Returns\n\n- `{ query: string; results: { description: string; markdown: { code: 'SUCCESS' | 'NOT_REQUESTED' | 'TIMEOUT' | 'WEBSITE_ACCESS_ERROR' | 'ERROR'; markdown: string; }; relevance: 'high' | 'medium' | 'low'; title: string; url: string; }[]; key_metadata?: { credits_consumed: number; credits_remaining: number; }; }`\n\n  - `query: string`\n  - `results: { description: string; markdown: { code: 'SUCCESS' | 'NOT_REQUESTED' | 'TIMEOUT' | 'WEBSITE_ACCESS_ERROR' | 'ERROR'; markdown: string; }; relevance: 'high' | 'medium' | 'low'; title: string; url: string; }[]`\n  - `key_metadata?: { credits_consumed: number; credits_remaining: number; }`\n\n### Example\n\n```typescript\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev();\n\nconst response = await client.web.search({ query: 'x' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.web.search',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.web.search({ query: 'x' });\n\nconsole.log(response.query);",
      },
      python: {
        method: 'web.search',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.web.search(\n    query="x",\n)\nprint(response.query)',
      },
      go: {
        method: 'client.Web.Search',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/context-dot-dev/context-go-sdk"\n\t"github.com/context-dot-dev/context-go-sdk/option"\n)\n\nfunc main() {\n\tclient := contextdev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Web.Search(context.TODO(), contextdev.WebSearchParams{\n\t\tQuery: "x",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Query)\n}\n',
      },
      ruby: {
        method: 'web.search',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nresponse = context_dev.web.search(query: "x")\n\nputs(response)',
      },
      cli: {
        method: 'web search',
        example: "context-dev web search \\\n  --api-key 'My API Key' \\\n  --query x",
      },
      php: {
        method: 'web->search',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->web->search(\n  query: 'x',\n  excludeDomains: ['string'],\n  freshness: 'last_24_hours',\n  includeDomains: ['string'],\n  markdownOptions: [\n    'enabled' => true,\n    'includeFrames' => true,\n    'includeImages' => true,\n    'includeLinks' => true,\n    'maxAgeMs' => 0,\n    'pdf' => ['end' => 1, 'shouldParse' => true, 'start' => 1],\n    'shortenBase64Images' => true,\n    'timeoutMs' => 1000,\n    'useMainContentOnly' => true,\n    'waitForMs' => 0,\n  ],\n  queryFanout: true,\n  timeoutMs: 1000,\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl https://api.context.dev/v1/web/search \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY" \\\n    -d \'{\n          "query": "x"\n        }\'',
      },
    },
  },
  {
    name: 'extract',
    endpoint: '/web/extract',
    httpMethod: 'post',
    summary: 'Extract Structured Website Data',
    description:
      'Crawl a website, use the provided JSON Schema and instructions to prioritize relevant internal links, and extract structured data from the selected pages.',
    stainlessPath: '(resource) web > (method) extract',
    qualified: 'client.web.extract',
    params: [
      'schema: object;',
      'url: string;',
      'factCheck?: boolean;',
      'followSubdomains?: boolean;',
      'includeFrames?: boolean;',
      'instructions?: string;',
      'maxAgeMs?: number;',
      'maxDepth?: number;',
      'maxPages?: number;',
      'pdf?: { end?: number; shouldParse?: boolean; start?: number; };',
      'stopAfterMs?: number;',
      'timeoutMS?: number;',
      'waitForMs?: number;',
    ],
    response:
      '{ data: object; metadata: { maxCrawlDepth: number; numFailed: number; numSkipped: number; numSucceeded: number; numUrls: number; }; status: string; url: string; urls_analyzed: string[]; key_metadata?: { credits_consumed: number; credits_remaining: number; }; }',
    markdown:
      "## extract\n\n`client.web.extract(schema: object, url: string, factCheck?: boolean, followSubdomains?: boolean, includeFrames?: boolean, instructions?: string, maxAgeMs?: number, maxDepth?: number, maxPages?: number, pdf?: { end?: number; shouldParse?: boolean; start?: number; }, stopAfterMs?: number, timeoutMS?: number, waitForMs?: number): { data: object; metadata: object; status: string; url: string; urls_analyzed: string[]; key_metadata?: object; }`\n\n**post** `/web/extract`\n\nCrawl a website, use the provided JSON Schema and instructions to prioritize relevant internal links, and extract structured data from the selected pages.\n\n### Parameters\n\n- `schema: object`\n  JSON Schema for the returned data object. TypeScript Zod users can pass a JSON Schema generated from a Zod object; Python users can pass the equivalent JSON Schema object.\n\n- `url: string`\n  The starting website URL to crawl and extract from. Must include http:// or https://.\n\n- `factCheck?: boolean`\n  When true, every returned value must be grounded in facts stated on the page; fields that cannot be supported by the page are returned as null/empty. When false (default), the model may make reasonable inferences and derivations from the page content (e.g. ideal customer, competitor analysis, recommendations) while keeping verifiable specifics (names, quotes, URLs, dates, metrics) faithful to the source.\n\n- `followSubdomains?: boolean`\n  When true, follow links on subdomains of the starting URL's domain.\n\n- `includeFrames?: boolean`\n  When true, iframe contents are included in Markdown before extraction.\n\n- `instructions?: string`\n  Optional extraction guidance, such as which facts to prioritize or how to interpret fields in the schema.\n\n- `maxAgeMs?: number`\n  Return cached scrape results if a prior scrape for the same parameters is younger than this many milliseconds. Defaults to 7 days (604800000 ms).\n\n- `maxDepth?: number`\n  Optional maximum link depth from the starting URL (0 = only the starting page). If omitted, there is no crawl depth limit.\n\n- `maxPages?: number`\n  Maximum number of pages to analyze for extraction. Hard cap: 50. Defaults to 5.\n\n- `pdf?: { end?: number; shouldParse?: boolean; start?: number; }`\n  - `end?: number`\n    Last 1-based PDF page to parse. Must be greater than or equal to start when both are provided.\n  - `shouldParse?: boolean`\n    When true, PDF pages are fetched and parsed. When false, PDF pages are skipped.\n  - `start?: number`\n    First 1-based PDF page to parse.\n\n- `stopAfterMs?: number`\n  Soft time budget for the crawl in milliseconds. Min: 10000 (10s). Max: 110000 (110s). Default: 80000 (80s).\n\n- `timeoutMS?: number`\n  Optional timeout in milliseconds for the request. If the request takes longer than this value, it will be aborted with a 408 status code. Maximum allowed value is 300000ms (5 minutes).\n\n- `waitForMs?: number`\n  Optional browser wait time in milliseconds after initial page load for each crawled page.\n\n### Returns\n\n- `{ data: object; metadata: { maxCrawlDepth: number; numFailed: number; numSkipped: number; numSucceeded: number; numUrls: number; }; status: string; url: string; urls_analyzed: string[]; key_metadata?: { credits_consumed: number; credits_remaining: number; }; }`\n\n  - `data: object`\n  - `metadata: { maxCrawlDepth: number; numFailed: number; numSkipped: number; numSucceeded: number; numUrls: number; }`\n  - `status: string`\n  - `url: string`\n  - `urls_analyzed: string[]`\n  - `key_metadata?: { credits_consumed: number; credits_remaining: number; }`\n\n### Example\n\n```typescript\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev();\n\nconst response = await client.web.extract({\n  schema: {\n  type: 'bar',\n  properties: 'bar',\n  required: 'bar',\n  additionalProperties: 'bar',\n},\n  url: 'https://example.com',\n});\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.web.extract',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.web.extract({\n  schema: {\n    type: 'bar',\n    properties: 'bar',\n    required: 'bar',\n    additionalProperties: 'bar',\n  },\n  url: 'https://example.com',\n});\n\nconsole.log(response.data);",
      },
      python: {
        method: 'web.extract',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.web.extract(\n    schema={\n        "type": "bar",\n        "properties": "bar",\n        "required": "bar",\n        "additionalProperties": "bar",\n    },\n    url="https://example.com",\n)\nprint(response.data)',
      },
      go: {
        method: 'client.Web.Extract',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/context-dot-dev/context-go-sdk"\n\t"github.com/context-dot-dev/context-go-sdk/option"\n)\n\nfunc main() {\n\tclient := contextdev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Web.Extract(context.TODO(), contextdev.WebExtractParams{\n\t\tSchema: map[string]any{\n\t\t\t"type":                 "bar",\n\t\t\t"properties":           "bar",\n\t\t\t"required":             "bar",\n\t\t\t"additionalProperties": "bar",\n\t\t},\n\t\tURL: "https://example.com",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Data)\n}\n',
      },
      ruby: {
        method: 'web.extract',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nresponse = context_dev.web.extract(\n  schema: {type: "bar", properties: "bar", required: "bar", additionalProperties: "bar"},\n  url: "https://example.com"\n)\n\nputs(response)',
      },
      cli: {
        method: 'web extract',
        example:
          "context-dev web extract \\\n  --api-key 'My API Key' \\\n  --schema '{type: bar, properties: bar, required: bar, additionalProperties: bar}' \\\n  --url https://example.com",
      },
      php: {
        method: 'web->extract',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->web->extract(\n  schema: [\n    'type' => 'bar',\n    'properties' => 'bar',\n    'required' => 'bar',\n    'additionalProperties' => 'bar',\n  ],\n  url: 'https://example.com',\n  factCheck: true,\n  followSubdomains: true,\n  includeFrames: true,\n  instructions: 'instructions',\n  maxAgeMs: 0,\n  maxDepth: 0,\n  maxPages: 1,\n  pdf: ['end' => 1, 'shouldParse' => true, 'start' => 1],\n  stopAfterMs: 10000,\n  timeoutMs: 1000,\n  waitForMs: 0,\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl https://api.context.dev/v1/web/extract \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY" \\\n    -d \'{\n          "schema": {\n            "type": "bar",\n            "properties": "bar",\n            "required": "bar",\n            "additionalProperties": "bar"\n          },\n          "url": "https://example.com"\n        }\'',
      },
    },
  },
  {
    name: 'extract_competitors',
    endpoint: '/web/competitors',
    httpMethod: 'get',
    summary: 'Find website competitors',
    description:
      "Analyze a company's landing page and web search evidence to return direct competitors for the same product or market.",
    stainlessPath: '(resource) web > (method) extract_competitors',
    qualified: 'client.web.extractCompetitors',
    params: ['domain: string;', 'numCompetitors?: number;', 'timeoutMS?: number;'],
    response:
      "{ competitors: { confidence: 'high' | 'medium'; description: string; domain: string; name: string; sourceUrls: string[]; url: string; }[]; domain: string; status: 'ok'; target: { companyName: string; field: string; fieldDescription: string; websiteUrl: string; }; key_metadata?: { credits_consumed: number; credits_remaining: number; }; }",
    markdown:
      "## extract_competitors\n\n`client.web.extractCompetitors(domain: string, numCompetitors?: number, timeoutMS?: number): { competitors: object[]; domain: string; status: 'ok'; target: object; key_metadata?: object; }`\n\n**get** `/web/competitors`\n\nAnalyze a company's landing page and web search evidence to return direct competitors for the same product or market.\n\n### Parameters\n\n- `domain: string`\n  Company domain to analyze, such as `stripe.com`. Full http(s) URLs are accepted and normalized to their domain.\n\n- `numCompetitors?: number`\n  Exact number of direct competitors to return. Defaults to 5.\n\n- `timeoutMS?: number`\n  Optional timeout in milliseconds for the request. If the request takes longer than this value, it will be aborted with a 408 status code. Maximum allowed value is 300000ms (5 minutes).\n\n### Returns\n\n- `{ competitors: { confidence: 'high' | 'medium'; description: string; domain: string; name: string; sourceUrls: string[]; url: string; }[]; domain: string; status: 'ok'; target: { companyName: string; field: string; fieldDescription: string; websiteUrl: string; }; key_metadata?: { credits_consumed: number; credits_remaining: number; }; }`\n\n  - `competitors: { confidence: 'high' | 'medium'; description: string; domain: string; name: string; sourceUrls: string[]; url: string; }[]`\n  - `domain: string`\n  - `status: 'ok'`\n  - `target: { companyName: string; field: string; fieldDescription: string; websiteUrl: string; }`\n  - `key_metadata?: { credits_consumed: number; credits_remaining: number; }`\n\n### Example\n\n```typescript\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev();\n\nconst response = await client.web.extractCompetitors({ domain: 'xxx' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.web.extractCompetitors',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.web.extractCompetitors({ domain: 'xxx' });\n\nconsole.log(response.competitors);",
      },
      python: {
        method: 'web.extract_competitors',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.web.extract_competitors(\n    domain="xxx",\n)\nprint(response.competitors)',
      },
      go: {
        method: 'client.Web.ExtractCompetitors',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/context-dot-dev/context-go-sdk"\n\t"github.com/context-dot-dev/context-go-sdk/option"\n)\n\nfunc main() {\n\tclient := contextdev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Web.ExtractCompetitors(context.TODO(), contextdev.WebExtractCompetitorsParams{\n\t\tDomain: "xxx",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Competitors)\n}\n',
      },
      ruby: {
        method: 'web.extract_competitors',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nresponse = context_dev.web.extract_competitors(domain: "xxx")\n\nputs(response)',
      },
      cli: {
        method: 'web extract_competitors',
        example: "context-dev web extract-competitors \\\n  --api-key 'My API Key' \\\n  --domain xxx",
      },
      php: {
        method: 'web->extractCompetitors',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->web->extractCompetitors(\n  domain: 'xxx', numCompetitors: 1, timeoutMs: 1000\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl https://api.context.dev/v1/web/competitors \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY"',
      },
    },
  },
  {
    name: 'extract_products',
    endpoint: '/brand/ai/products',
    httpMethod: 'post',
    summary: "Extract products from a brand's website",
    description:
      "Extract product information from a brand's website. We will analyze the website and return a list of products with details such as name, description, image, pricing, features, and more.",
    stainlessPath: '(resource) ai > (method) extract_products',
    qualified: 'client.ai.extractProducts',
    params: [
      '{ domain: string; maxAgeMs?: number; maxProducts?: number; timeoutMS?: number; } | { directUrl: string; maxAgeMs?: number; maxProducts?: number; timeoutMS?: number; };',
    ],
    response:
      "{ key_metadata?: { credits_consumed: number; credits_remaining: number; }; products?: { description: string; features: string[]; images: string[]; name: string; sku: string; tags: string[]; target_audience: string[]; billing_frequency?: 'monthly' | 'yearly' | 'one_time' | 'usage_based'; category?: string; currency?: string; image_url?: string; price?: number; pricing_model?: 'per_seat' | 'flat' | 'tiered' | 'freemium' | 'custom'; url?: string; }[]; }",
    perLanguage: {
      typescript: {
        method: 'client.ai.extractProducts',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.ai.extractProducts({ domain: 'domain' });\n\nconsole.log(response.key_metadata);",
      },
      python: {
        method: 'ai.extract_products',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.ai.extract_products(\n    domain="domain",\n)\nprint(response.key_metadata)',
      },
      go: {
        method: 'client.AI.ExtractProducts',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/context-dot-dev/context-go-sdk"\n\t"github.com/context-dot-dev/context-go-sdk/option"\n)\n\nfunc main() {\n\tclient := contextdev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.AI.ExtractProducts(context.TODO(), contextdev.AIExtractProductsParams{\n\t\tOfByDomain: &contextdev.AIExtractProductsParamsBodyByDomain{\n\t\t\tDomain: "domain",\n\t\t},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.KeyMetadata)\n}\n',
      },
      ruby: {
        method: 'ai.extract_products',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nresponse = context_dev.ai.extract_products(body: {domain: "domain"})\n\nputs(response)',
      },
      cli: {
        method: 'ai extract_products',
        example:
          "context-dev ai extract-products \\\n  --api-key 'My API Key' \\\n  --domain domain \\\n  --direct-url https://example.com",
      },
      php: {
        method: 'ai->extractProducts',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->ai->extractProducts(\n  domain: 'domain',\n  maxAgeMs: 0,\n  maxProducts: 1,\n  timeoutMs: 1000,\n  directURL: 'https://example.com',\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl https://api.context.dev/v1/brand/ai/products \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY" \\\n    -d \'{\n          "domain": "domain"\n        }\'',
      },
    },
  },
  {
    name: 'extract_product',
    endpoint: '/brand/ai/product',
    httpMethod: 'post',
    summary: 'Extract a single product from a URL',
    description:
      'Given a single URL, determines if it is a product page and extracts the product information.',
    stainlessPath: '(resource) ai > (method) extract_product',
    qualified: 'client.ai.extractProduct',
    params: ['url: string;', 'maxAgeMs?: number;', 'timeoutMS?: number;'],
    response:
      "{ is_product_page?: boolean; key_metadata?: { credits_consumed: number; credits_remaining: number; }; platform?: 'amazon' | 'tiktok_shop' | 'etsy' | 'generic'; product?: { description: string; features: string[]; images: string[]; name: string; sku: string; tags: string[]; target_audience: string[]; billing_frequency?: 'monthly' | 'yearly' | 'one_time' | 'usage_based'; category?: string; currency?: string; image_url?: string; price?: number; pricing_model?: 'per_seat' | 'flat' | 'tiered' | 'freemium' | 'custom'; url?: string; }; }",
    markdown:
      "## extract_product\n\n`client.ai.extractProduct(url: string, maxAgeMs?: number, timeoutMS?: number): { is_product_page?: boolean; key_metadata?: object; platform?: 'amazon' | 'tiktok_shop' | 'etsy' | 'generic'; product?: object; }`\n\n**post** `/brand/ai/product`\n\nGiven a single URL, determines if it is a product page and extracts the product information.\n\n### Parameters\n\n- `url: string`\n  The product page URL to extract product data from.\n\n- `maxAgeMs?: number`\n  Return a cached result if a prior scrape for the same parameters exists and is younger than this many milliseconds. Defaults to 7 days (604800000 ms) when omitted. Max is 30 days (2592000000 ms). Set to 0 to always scrape fresh.\n\n- `timeoutMS?: number`\n  Optional timeout in milliseconds for the request. If the request takes longer than this value, it will be aborted with a 408 status code. Maximum allowed value is 300000ms (5 minutes).\n\n### Returns\n\n- `{ is_product_page?: boolean; key_metadata?: { credits_consumed: number; credits_remaining: number; }; platform?: 'amazon' | 'tiktok_shop' | 'etsy' | 'generic'; product?: { description: string; features: string[]; images: string[]; name: string; sku: string; tags: string[]; target_audience: string[]; billing_frequency?: 'monthly' | 'yearly' | 'one_time' | 'usage_based'; category?: string; currency?: string; image_url?: string; price?: number; pricing_model?: 'per_seat' | 'flat' | 'tiered' | 'freemium' | 'custom'; url?: string; }; }`\n\n  - `is_product_page?: boolean`\n  - `key_metadata?: { credits_consumed: number; credits_remaining: number; }`\n  - `platform?: 'amazon' | 'tiktok_shop' | 'etsy' | 'generic'`\n  - `product?: { description: string; features: string[]; images: string[]; name: string; sku: string; tags: string[]; target_audience: string[]; billing_frequency?: 'monthly' | 'yearly' | 'one_time' | 'usage_based'; category?: string; currency?: string; image_url?: string; price?: number; pricing_model?: 'per_seat' | 'flat' | 'tiered' | 'freemium' | 'custom'; url?: string; }`\n\n### Example\n\n```typescript\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev();\n\nconst response = await client.ai.extractProduct({ url: 'https://example.com' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.ai.extractProduct',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.ai.extractProduct({ url: 'https://example.com' });\n\nconsole.log(response.is_product_page);",
      },
      python: {
        method: 'ai.extract_product',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.ai.extract_product(\n    url="https://example.com",\n)\nprint(response.is_product_page)',
      },
      go: {
        method: 'client.AI.ExtractProduct',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/context-dot-dev/context-go-sdk"\n\t"github.com/context-dot-dev/context-go-sdk/option"\n)\n\nfunc main() {\n\tclient := contextdev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.AI.ExtractProduct(context.TODO(), contextdev.AIExtractProductParams{\n\t\tURL: "https://example.com",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.IsProductPage)\n}\n',
      },
      ruby: {
        method: 'ai.extract_product',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nresponse = context_dev.ai.extract_product(url: "https://example.com")\n\nputs(response)',
      },
      cli: {
        method: 'ai extract_product',
        example:
          "context-dev ai extract-product \\\n  --api-key 'My API Key' \\\n  --url https://example.com",
      },
      php: {
        method: 'ai->extractProduct',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->ai->extractProduct(\n  url: 'https://example.com', maxAgeMs: 0, timeoutMs: 1000\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl https://api.context.dev/v1/brand/ai/product \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY" \\\n    -d \'{\n          "url": "https://example.com"\n        }\'',
      },
    },
  },
  {
    name: 'ai_query',
    endpoint: '/brand/ai/query',
    httpMethod: 'post',
    summary: 'Query website data using AI',
    description:
      "Use AI to extract specific data points from a brand's website. The AI will crawl the website and extract the requested information based on the provided data points.",
    stainlessPath: '(resource) ai > (method) ai_query',
    qualified: 'client.ai.aiQuery',
    params: [
      "data_to_extract: { datapoint_description: string; datapoint_example: string; datapoint_name: string; datapoint_type: 'text' | 'number' | 'date' | 'boolean' | 'list' | 'url'; datapoint_list_type?: 'string' | 'text' | 'number' | 'date' | 'boolean' | 'list' | 'url' | 'object'; datapoint_object_schema?: object; }[];",
      'domain: string;',
      'specific_pages?: { about_us?: boolean; blog?: boolean; careers?: boolean; contact_us?: boolean; faq?: boolean; home_page?: boolean; pricing?: boolean; privacy_policy?: boolean; terms_and_conditions?: boolean; };',
      'timeoutMS?: number;',
    ],
    response:
      '{ data_extracted?: { datapoint_name?: string; datapoint_value?: string | number | boolean | string[] | number[] | object[]; }[]; domain?: string; key_metadata?: { credits_consumed: number; credits_remaining: number; }; status?: string; urls_analyzed?: string[]; }',
    markdown:
      "## ai_query\n\n`client.ai.aiQuery(data_to_extract: { datapoint_description: string; datapoint_example: string; datapoint_name: string; datapoint_type: 'text' | 'number' | 'date' | 'boolean' | 'list' | 'url'; datapoint_list_type?: 'string' | 'text' | 'number' | 'date' | 'boolean' | 'list' | 'url' | 'object'; datapoint_object_schema?: object; }[], domain: string, specific_pages?: { about_us?: boolean; blog?: boolean; careers?: boolean; contact_us?: boolean; faq?: boolean; home_page?: boolean; pricing?: boolean; privacy_policy?: boolean; terms_and_conditions?: boolean; }, timeoutMS?: number): { data_extracted?: object[]; domain?: string; key_metadata?: object; status?: string; urls_analyzed?: string[]; }`\n\n**post** `/brand/ai/query`\n\nUse AI to extract specific data points from a brand's website. The AI will crawl the website and extract the requested information based on the provided data points.\n\n### Parameters\n\n- `data_to_extract: { datapoint_description: string; datapoint_example: string; datapoint_name: string; datapoint_type: 'text' | 'number' | 'date' | 'boolean' | 'list' | 'url'; datapoint_list_type?: 'string' | 'text' | 'number' | 'date' | 'boolean' | 'list' | 'url' | 'object'; datapoint_object_schema?: object; }[]`\n  Array of data points to extract from the website\n\n- `domain: string`\n  The domain name to analyze\n\n- `specific_pages?: { about_us?: boolean; blog?: boolean; careers?: boolean; contact_us?: boolean; faq?: boolean; home_page?: boolean; pricing?: boolean; privacy_policy?: boolean; terms_and_conditions?: boolean; }`\n  Optional object specifying which pages to analyze\n  - `about_us?: boolean`\n    Whether to analyze the about us page\n  - `blog?: boolean`\n    Whether to analyze the blog\n  - `careers?: boolean`\n    Whether to analyze the careers page\n  - `contact_us?: boolean`\n    Whether to analyze the contact us page\n  - `faq?: boolean`\n    Whether to analyze the FAQ page\n  - `home_page?: boolean`\n    Whether to analyze the home page\n  - `pricing?: boolean`\n    Whether to analyze the pricing page\n  - `privacy_policy?: boolean`\n    Whether to analyze the privacy policy page\n  - `terms_and_conditions?: boolean`\n    Whether to analyze the terms and conditions page\n\n- `timeoutMS?: number`\n  Optional timeout in milliseconds for the request. If the request takes longer than this value, it will be aborted with a 408 status code. Maximum allowed value is 300000ms (5 minutes).\n\n### Returns\n\n- `{ data_extracted?: { datapoint_name?: string; datapoint_value?: string | number | boolean | string[] | number[] | object[]; }[]; domain?: string; key_metadata?: { credits_consumed: number; credits_remaining: number; }; status?: string; urls_analyzed?: string[]; }`\n\n  - `data_extracted?: { datapoint_name?: string; datapoint_value?: string | number | boolean | string[] | number[] | object[]; }[]`\n  - `domain?: string`\n  - `key_metadata?: { credits_consumed: number; credits_remaining: number; }`\n  - `status?: string`\n  - `urls_analyzed?: string[]`\n\n### Example\n\n```typescript\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev();\n\nconst response = await client.ai.aiQuery({ data_to_extract: [{\n  datapoint_description: 'datapoint_description',\n  datapoint_example: 'datapoint_example',\n  datapoint_name: 'datapoint_name',\n  datapoint_type: 'text',\n}], domain: 'domain' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.ai.aiQuery',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.ai.aiQuery({\n  data_to_extract: [\n    {\n      datapoint_description: 'datapoint_description',\n      datapoint_example: 'datapoint_example',\n      datapoint_name: 'datapoint_name',\n      datapoint_type: 'text',\n    },\n  ],\n  domain: 'domain',\n});\n\nconsole.log(response.data_extracted);",
      },
      python: {
        method: 'ai.ai_query',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.ai.ai_query(\n    data_to_extract=[{\n        "datapoint_description": "datapoint_description",\n        "datapoint_example": "datapoint_example",\n        "datapoint_name": "datapoint_name",\n        "datapoint_type": "text",\n    }],\n    domain="domain",\n)\nprint(response.data_extracted)',
      },
      go: {
        method: 'client.AI.AIQuery',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/context-dot-dev/context-go-sdk"\n\t"github.com/context-dot-dev/context-go-sdk/option"\n)\n\nfunc main() {\n\tclient := contextdev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.AI.AIQuery(context.TODO(), contextdev.AIAIQueryParams{\n\t\tDataToExtract: []contextdev.AIAIQueryParamsDataToExtract{{\n\t\t\tDatapointDescription: "datapoint_description",\n\t\t\tDatapointExample:     "datapoint_example",\n\t\t\tDatapointName:        "datapoint_name",\n\t\t\tDatapointType:        "text",\n\t\t}},\n\t\tDomain: "domain",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.DataExtracted)\n}\n',
      },
      ruby: {
        method: 'ai.ai_query',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nresponse = context_dev.ai.ai_query(\n  data_to_extract: [\n    {\n      datapoint_description: "datapoint_description",\n      datapoint_example: "datapoint_example",\n      datapoint_name: "datapoint_name",\n      datapoint_type: :text\n    }\n  ],\n  domain: "domain"\n)\n\nputs(response)',
      },
      cli: {
        method: 'ai ai_query',
        example:
          "context-dev ai ai-query \\\n  --api-key 'My API Key' \\\n  --data-to-extract '{datapoint_description: datapoint_description, datapoint_example: datapoint_example, datapoint_name: datapoint_name, datapoint_type: text}' \\\n  --domain domain",
      },
      php: {
        method: 'ai->aiQuery',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->ai->aiQuery(\n  dataToExtract: [\n    [\n      'datapointDescription' => 'datapoint_description',\n      'datapointExample' => 'datapoint_example',\n      'datapointName' => 'datapoint_name',\n      'datapointType' => 'text',\n      'datapointListType' => 'string',\n      'datapointObjectSchema' => [\n        'testimonial_text' => 'string', 'testimonial_author' => 'string'\n      ],\n    ],\n  ],\n  domain: 'domain',\n  specificPages: [\n    'aboutUs' => true,\n    'blog' => true,\n    'careers' => true,\n    'contactUs' => true,\n    'faq' => true,\n    'homePage' => true,\n    'pricing' => true,\n    'privacyPolicy' => true,\n    'termsAndConditions' => true,\n  ],\n  timeoutMs: 1000,\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl https://api.context.dev/v1/brand/ai/query \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY" \\\n    -d \'{\n          "data_to_extract": [\n            {\n              "datapoint_description": "datapoint_description",\n              "datapoint_example": "datapoint_example",\n              "datapoint_name": "datapoint_name",\n              "datapoint_type": "text"\n            }\n          ],\n          "domain": "domain"\n        }\'',
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/brand/retrieve',
    httpMethod: 'get',
    summary: 'Retrieve brand data by domain',
    description: 'Retrieve logos, backdrops, colors, industry, description, and more from any domain',
    stainlessPath: '(resource) brand > (method) retrieve',
    qualified: 'client.brand.retrieve',
    params: [
      'domain: string;',
      'force_language?: string;',
      'maxAgeMs?: number;',
      'maxSpeed?: boolean;',
      'timeoutMS?: number;',
    ],
    response:
      "{ brand?: { address?: { city?: string; country?: string; country_code?: string; postal_code?: string; state_code?: string; state_province?: string; street?: string; }; backdrops?: { colors?: object[]; resolution?: object; url?: string; }[]; colors?: { hex?: string; name?: string; }[]; description?: string; domain?: string; email?: string; industries?: { eic?: object[]; }; is_nsfw?: boolean; links?: { blog?: string; careers?: string; contact?: string; pricing?: string; privacy?: string; terms?: string; }; logos?: { colors?: object[]; mode?: 'light' | 'dark' | 'has_opaque_background'; resolution?: object; type?: 'icon' | 'logo'; url?: string; }[]; phone?: string; primary_language?: string; slogan?: string; socials?: { type?: string; url?: string; }[]; stock?: { exchange?: string; ticker?: string; }; title?: string; }; code?: number; key_metadata?: { credits_consumed: number; credits_remaining: number; }; status?: string; }",
    markdown:
      "## retrieve\n\n`client.brand.retrieve(domain: string, force_language?: string, maxAgeMs?: number, maxSpeed?: boolean, timeoutMS?: number): { brand?: object; code?: number; key_metadata?: object; status?: string; }`\n\n**get** `/brand/retrieve`\n\nRetrieve logos, backdrops, colors, industry, description, and more from any domain\n\n### Parameters\n\n- `domain: string`\n  Domain name to retrieve brand data for (e.g., 'example.com', 'google.com'). Cannot be used with name or ticker parameters.\n\n- `force_language?: string`\n  Optional parameter to force the language of the retrieved brand data.\n\n- `maxAgeMs?: number`\n  Maximum age in milliseconds for cached brand data before the API performs a hard refresh. Defaults to 3 months (7776000000 ms). Values below 1 day (86400000 ms) are clamped to 1 day; values above 1 year (31536000000 ms) are clamped to 1 year.\n\n- `maxSpeed?: boolean`\n  Optional parameter to optimize the API call for maximum speed. When set to true, the API will skip time-consuming operations for faster response at the cost of less comprehensive data. Works with all three lookup methods.\n\n- `timeoutMS?: number`\n  Optional timeout in milliseconds for the request. If the request takes longer than this value, it will be aborted with a 408 status code. Maximum allowed value is 300000ms (5 minutes).\n\n### Returns\n\n- `{ brand?: { address?: { city?: string; country?: string; country_code?: string; postal_code?: string; state_code?: string; state_province?: string; street?: string; }; backdrops?: { colors?: object[]; resolution?: object; url?: string; }[]; colors?: { hex?: string; name?: string; }[]; description?: string; domain?: string; email?: string; industries?: { eic?: object[]; }; is_nsfw?: boolean; links?: { blog?: string; careers?: string; contact?: string; pricing?: string; privacy?: string; terms?: string; }; logos?: { colors?: object[]; mode?: 'light' | 'dark' | 'has_opaque_background'; resolution?: object; type?: 'icon' | 'logo'; url?: string; }[]; phone?: string; primary_language?: string; slogan?: string; socials?: { type?: string; url?: string; }[]; stock?: { exchange?: string; ticker?: string; }; title?: string; }; code?: number; key_metadata?: { credits_consumed: number; credits_remaining: number; }; status?: string; }`\n\n  - `brand?: { address?: { city?: string; country?: string; country_code?: string; postal_code?: string; state_code?: string; state_province?: string; street?: string; }; backdrops?: { colors?: { hex?: string; name?: string; }[]; resolution?: { aspect_ratio?: number; height?: number; width?: number; }; url?: string; }[]; colors?: { hex?: string; name?: string; }[]; description?: string; domain?: string; email?: string; industries?: { eic?: { industry: string; subindustry: string; }[]; }; is_nsfw?: boolean; links?: { blog?: string; careers?: string; contact?: string; pricing?: string; privacy?: string; terms?: string; }; logos?: { colors?: { hex?: string; name?: string; }[]; mode?: 'light' | 'dark' | 'has_opaque_background'; resolution?: { aspect_ratio?: number; height?: number; width?: number; }; type?: 'icon' | 'logo'; url?: string; }[]; phone?: string; primary_language?: string; slogan?: string; socials?: { type?: string; url?: string; }[]; stock?: { exchange?: string; ticker?: string; }; title?: string; }`\n  - `code?: number`\n  - `key_metadata?: { credits_consumed: number; credits_remaining: number; }`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev();\n\nconst brand = await client.brand.retrieve({ domain: 'domain' });\n\nconsole.log(brand);\n```",
    perLanguage: {
      typescript: {
        method: 'client.brand.retrieve',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst brand = await client.brand.retrieve({ domain: 'domain' });\n\nconsole.log(brand.brand);",
      },
      python: {
        method: 'brand.retrieve',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nbrand = client.brand.retrieve(\n    domain="domain",\n)\nprint(brand.brand)',
      },
      go: {
        method: 'client.Brand.Get',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/context-dot-dev/context-go-sdk"\n\t"github.com/context-dot-dev/context-go-sdk/option"\n)\n\nfunc main() {\n\tclient := contextdev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tbrand, err := client.Brand.Get(context.TODO(), contextdev.BrandGetParams{\n\t\tDomain: "domain",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", brand.Brand)\n}\n',
      },
      ruby: {
        method: 'brand.retrieve',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nbrand = context_dev.brand.retrieve(domain: "domain")\n\nputs(brand)',
      },
      cli: {
        method: 'brand retrieve',
        example: "context-dev brand retrieve \\\n  --api-key 'My API Key' \\\n  --domain domain",
      },
      php: {
        method: 'brand->retrieve',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$brand = $client->brand->retrieve(\n  domain: 'domain',\n  forceLanguage: 'afrikaans',\n  maxAgeMs: 86400000,\n  maxSpeed: true,\n  timeoutMs: 1000,\n);\n\nvar_dump($brand);",
      },
      http: {
        example:
          'curl https://api.context.dev/v1/brand/retrieve \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY"',
      },
    },
  },
  {
    name: 'retrieve_by_ticker',
    endpoint: '/brand/retrieve-by-ticker',
    httpMethod: 'get',
    summary: 'Retrieve brand data by stock ticker',
    description: 'Retrieve brand information using a stock ticker symbol.',
    stainlessPath: '(resource) brand > (method) retrieve_by_ticker',
    qualified: 'client.brand.retrieveByTicker',
    params: [
      'ticker: string;',
      'force_language?: string;',
      'maxAgeMs?: number;',
      'maxSpeed?: boolean;',
      'ticker_exchange?: string;',
      'timeoutMS?: number;',
    ],
    response:
      "{ brand?: { address?: { city?: string; country?: string; country_code?: string; postal_code?: string; state_code?: string; state_province?: string; street?: string; }; backdrops?: { colors?: object[]; resolution?: object; url?: string; }[]; colors?: { hex?: string; name?: string; }[]; description?: string; domain?: string; email?: string; industries?: { eic?: object[]; }; is_nsfw?: boolean; links?: { blog?: string; careers?: string; contact?: string; pricing?: string; privacy?: string; terms?: string; }; logos?: { colors?: object[]; mode?: 'light' | 'dark' | 'has_opaque_background'; resolution?: object; type?: 'icon' | 'logo'; url?: string; }[]; phone?: string; primary_language?: string; slogan?: string; socials?: { type?: string; url?: string; }[]; stock?: { exchange?: string; ticker?: string; }; title?: string; }; code?: number; key_metadata?: { credits_consumed: number; credits_remaining: number; }; status?: string; }",
    markdown:
      "## retrieve_by_ticker\n\n`client.brand.retrieveByTicker(ticker: string, force_language?: string, maxAgeMs?: number, maxSpeed?: boolean, ticker_exchange?: string, timeoutMS?: number): { brand?: object; code?: number; key_metadata?: object; status?: string; }`\n\n**get** `/brand/retrieve-by-ticker`\n\nRetrieve brand information using a stock ticker symbol.\n\n### Parameters\n\n- `ticker: string`\n  Stock ticker symbol to retrieve brand data for (e.g., 'AAPL', 'GOOGL', 'BRK.A'). Must be 1-15 characters, letters/numbers/dots only.\n\n- `force_language?: string`\n  Optional parameter to force the language of the retrieved brand data.\n\n- `maxAgeMs?: number`\n  Maximum age in milliseconds for cached brand data before the API performs a hard refresh. Defaults to 3 months (7776000000 ms). Values below 1 day (86400000 ms) are clamped to 1 day; values above 1 year (31536000000 ms) are clamped to 1 year.\n\n- `maxSpeed?: boolean`\n  Optional parameter to optimize the API call for maximum speed. When set to true, the API will skip time-consuming operations for faster response at the cost of less comprehensive data.\n\n- `ticker_exchange?: string`\n  Optional stock exchange for the ticker. Defaults to NASDAQ if not specified.\n\n- `timeoutMS?: number`\n  Optional timeout in milliseconds for the request. If the request takes longer than this value, it will be aborted with a 408 status code. Maximum allowed value is 300000ms (5 minutes).\n\n### Returns\n\n- `{ brand?: { address?: { city?: string; country?: string; country_code?: string; postal_code?: string; state_code?: string; state_province?: string; street?: string; }; backdrops?: { colors?: object[]; resolution?: object; url?: string; }[]; colors?: { hex?: string; name?: string; }[]; description?: string; domain?: string; email?: string; industries?: { eic?: object[]; }; is_nsfw?: boolean; links?: { blog?: string; careers?: string; contact?: string; pricing?: string; privacy?: string; terms?: string; }; logos?: { colors?: object[]; mode?: 'light' | 'dark' | 'has_opaque_background'; resolution?: object; type?: 'icon' | 'logo'; url?: string; }[]; phone?: string; primary_language?: string; slogan?: string; socials?: { type?: string; url?: string; }[]; stock?: { exchange?: string; ticker?: string; }; title?: string; }; code?: number; key_metadata?: { credits_consumed: number; credits_remaining: number; }; status?: string; }`\n\n  - `brand?: { address?: { city?: string; country?: string; country_code?: string; postal_code?: string; state_code?: string; state_province?: string; street?: string; }; backdrops?: { colors?: { hex?: string; name?: string; }[]; resolution?: { aspect_ratio?: number; height?: number; width?: number; }; url?: string; }[]; colors?: { hex?: string; name?: string; }[]; description?: string; domain?: string; email?: string; industries?: { eic?: { industry: string; subindustry: string; }[]; }; is_nsfw?: boolean; links?: { blog?: string; careers?: string; contact?: string; pricing?: string; privacy?: string; terms?: string; }; logos?: { colors?: { hex?: string; name?: string; }[]; mode?: 'light' | 'dark' | 'has_opaque_background'; resolution?: { aspect_ratio?: number; height?: number; width?: number; }; type?: 'icon' | 'logo'; url?: string; }[]; phone?: string; primary_language?: string; slogan?: string; socials?: { type?: string; url?: string; }[]; stock?: { exchange?: string; ticker?: string; }; title?: string; }`\n  - `code?: number`\n  - `key_metadata?: { credits_consumed: number; credits_remaining: number; }`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev();\n\nconst response = await client.brand.retrieveByTicker({ ticker: 'ticker' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.brand.retrieveByTicker',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.brand.retrieveByTicker({ ticker: 'ticker' });\n\nconsole.log(response.brand);",
      },
      python: {
        method: 'brand.retrieve_by_ticker',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.brand.retrieve_by_ticker(\n    ticker="ticker",\n)\nprint(response.brand)',
      },
      go: {
        method: 'client.Brand.GetByTicker',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/context-dot-dev/context-go-sdk"\n\t"github.com/context-dot-dev/context-go-sdk/option"\n)\n\nfunc main() {\n\tclient := contextdev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Brand.GetByTicker(context.TODO(), contextdev.BrandGetByTickerParams{\n\t\tTicker: "ticker",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Brand)\n}\n',
      },
      ruby: {
        method: 'brand.retrieve_by_ticker',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nresponse = context_dev.brand.retrieve_by_ticker(ticker: "ticker")\n\nputs(response)',
      },
      cli: {
        method: 'brand retrieve_by_ticker',
        example: "context-dev brand retrieve-by-ticker \\\n  --api-key 'My API Key' \\\n  --ticker ticker",
      },
      php: {
        method: 'brand->retrieveByTicker',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->brand->retrieveByTicker(\n  ticker: 'ticker',\n  forceLanguage: 'afrikaans',\n  maxAgeMs: 86400000,\n  maxSpeed: true,\n  tickerExchange: 'AMEX',\n  timeoutMs: 1000,\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl https://api.context.dev/v1/brand/retrieve-by-ticker \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY"',
      },
    },
  },
  {
    name: 'retrieve_by_isin',
    endpoint: '/brand/retrieve-by-isin',
    httpMethod: 'get',
    summary: 'Retrieve brand data by ISIN',
    description:
      'Retrieve brand information using an ISIN (International Securities Identification Number). ',
    stainlessPath: '(resource) brand > (method) retrieve_by_isin',
    qualified: 'client.brand.retrieveByIsin',
    params: [
      'isin: string;',
      'force_language?: string;',
      'maxAgeMs?: number;',
      'maxSpeed?: boolean;',
      'timeoutMS?: number;',
    ],
    response:
      "{ brand?: { address?: { city?: string; country?: string; country_code?: string; postal_code?: string; state_code?: string; state_province?: string; street?: string; }; backdrops?: { colors?: object[]; resolution?: object; url?: string; }[]; colors?: { hex?: string; name?: string; }[]; description?: string; domain?: string; email?: string; industries?: { eic?: object[]; }; is_nsfw?: boolean; links?: { blog?: string; careers?: string; contact?: string; pricing?: string; privacy?: string; terms?: string; }; logos?: { colors?: object[]; mode?: 'light' | 'dark' | 'has_opaque_background'; resolution?: object; type?: 'icon' | 'logo'; url?: string; }[]; phone?: string; primary_language?: string; slogan?: string; socials?: { type?: string; url?: string; }[]; stock?: { exchange?: string; ticker?: string; }; title?: string; }; code?: number; key_metadata?: { credits_consumed: number; credits_remaining: number; }; status?: string; }",
    markdown:
      "## retrieve_by_isin\n\n`client.brand.retrieveByIsin(isin: string, force_language?: string, maxAgeMs?: number, maxSpeed?: boolean, timeoutMS?: number): { brand?: object; code?: number; key_metadata?: object; status?: string; }`\n\n**get** `/brand/retrieve-by-isin`\n\nRetrieve brand information using an ISIN (International Securities Identification Number). \n\n### Parameters\n\n- `isin: string`\n  ISIN (International Securities Identification Number) to retrieve brand data for (e.g., 'AU000000IMD5', 'US0378331005'). Must be exactly 12 characters: 2 letters followed by 9 alphanumeric characters and ending with a digit.\n\n- `force_language?: string`\n  Optional parameter to force the language of the retrieved brand data.\n\n- `maxAgeMs?: number`\n  Maximum age in milliseconds for cached brand data before the API performs a hard refresh. Defaults to 3 months (7776000000 ms). Values below 1 day (86400000 ms) are clamped to 1 day; values above 1 year (31536000000 ms) are clamped to 1 year.\n\n- `maxSpeed?: boolean`\n  Optional parameter to optimize the API call for maximum speed. When set to true, the API will skip time-consuming operations for faster response at the cost of less comprehensive data.\n\n- `timeoutMS?: number`\n  Optional timeout in milliseconds for the request. If the request takes longer than this value, it will be aborted with a 408 status code. Maximum allowed value is 300000ms (5 minutes).\n\n### Returns\n\n- `{ brand?: { address?: { city?: string; country?: string; country_code?: string; postal_code?: string; state_code?: string; state_province?: string; street?: string; }; backdrops?: { colors?: object[]; resolution?: object; url?: string; }[]; colors?: { hex?: string; name?: string; }[]; description?: string; domain?: string; email?: string; industries?: { eic?: object[]; }; is_nsfw?: boolean; links?: { blog?: string; careers?: string; contact?: string; pricing?: string; privacy?: string; terms?: string; }; logos?: { colors?: object[]; mode?: 'light' | 'dark' | 'has_opaque_background'; resolution?: object; type?: 'icon' | 'logo'; url?: string; }[]; phone?: string; primary_language?: string; slogan?: string; socials?: { type?: string; url?: string; }[]; stock?: { exchange?: string; ticker?: string; }; title?: string; }; code?: number; key_metadata?: { credits_consumed: number; credits_remaining: number; }; status?: string; }`\n\n  - `brand?: { address?: { city?: string; country?: string; country_code?: string; postal_code?: string; state_code?: string; state_province?: string; street?: string; }; backdrops?: { colors?: { hex?: string; name?: string; }[]; resolution?: { aspect_ratio?: number; height?: number; width?: number; }; url?: string; }[]; colors?: { hex?: string; name?: string; }[]; description?: string; domain?: string; email?: string; industries?: { eic?: { industry: string; subindustry: string; }[]; }; is_nsfw?: boolean; links?: { blog?: string; careers?: string; contact?: string; pricing?: string; privacy?: string; terms?: string; }; logos?: { colors?: { hex?: string; name?: string; }[]; mode?: 'light' | 'dark' | 'has_opaque_background'; resolution?: { aspect_ratio?: number; height?: number; width?: number; }; type?: 'icon' | 'logo'; url?: string; }[]; phone?: string; primary_language?: string; slogan?: string; socials?: { type?: string; url?: string; }[]; stock?: { exchange?: string; ticker?: string; }; title?: string; }`\n  - `code?: number`\n  - `key_metadata?: { credits_consumed: number; credits_remaining: number; }`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev();\n\nconst response = await client.brand.retrieveByIsin({ isin: 'SE60513A9993' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.brand.retrieveByIsin',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.brand.retrieveByIsin({ isin: 'SE60513A9993' });\n\nconsole.log(response.brand);",
      },
      python: {
        method: 'brand.retrieve_by_isin',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.brand.retrieve_by_isin(\n    isin="SE60513A9993",\n)\nprint(response.brand)',
      },
      go: {
        method: 'client.Brand.GetByIsin',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/context-dot-dev/context-go-sdk"\n\t"github.com/context-dot-dev/context-go-sdk/option"\n)\n\nfunc main() {\n\tclient := contextdev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Brand.GetByIsin(context.TODO(), contextdev.BrandGetByIsinParams{\n\t\tIsin: "SE60513A9993",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Brand)\n}\n',
      },
      ruby: {
        method: 'brand.retrieve_by_isin',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nresponse = context_dev.brand.retrieve_by_isin(isin: "SE60513A9993")\n\nputs(response)',
      },
      cli: {
        method: 'brand retrieve_by_isin',
        example: "context-dev brand retrieve-by-isin \\\n  --api-key 'My API Key' \\\n  --isin SE60513A9993",
      },
      php: {
        method: 'brand->retrieveByIsin',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->brand->retrieveByIsin(\n  isin: 'SE60513A9993',\n  forceLanguage: 'afrikaans',\n  maxAgeMs: 86400000,\n  maxSpeed: true,\n  timeoutMs: 1000,\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl https://api.context.dev/v1/brand/retrieve-by-isin \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY"',
      },
    },
  },
  {
    name: 'retrieve_by_name',
    endpoint: '/brand/retrieve-by-name',
    httpMethod: 'get',
    summary: 'Retrieve brand data by company name',
    description: 'Retrieve brand information using a company name.',
    stainlessPath: '(resource) brand > (method) retrieve_by_name',
    qualified: 'client.brand.retrieveByName',
    params: [
      'name: string;',
      'country_gl?: string;',
      'force_language?: string;',
      'maxAgeMs?: number;',
      'maxSpeed?: boolean;',
      'timeoutMS?: number;',
    ],
    response:
      "{ brand?: { address?: { city?: string; country?: string; country_code?: string; postal_code?: string; state_code?: string; state_province?: string; street?: string; }; backdrops?: { colors?: object[]; resolution?: object; url?: string; }[]; colors?: { hex?: string; name?: string; }[]; description?: string; domain?: string; email?: string; industries?: { eic?: object[]; }; is_nsfw?: boolean; links?: { blog?: string; careers?: string; contact?: string; pricing?: string; privacy?: string; terms?: string; }; logos?: { colors?: object[]; mode?: 'light' | 'dark' | 'has_opaque_background'; resolution?: object; type?: 'icon' | 'logo'; url?: string; }[]; phone?: string; primary_language?: string; slogan?: string; socials?: { type?: string; url?: string; }[]; stock?: { exchange?: string; ticker?: string; }; title?: string; }; code?: number; key_metadata?: { credits_consumed: number; credits_remaining: number; }; status?: string; }",
    markdown:
      "## retrieve_by_name\n\n`client.brand.retrieveByName(name: string, country_gl?: string, force_language?: string, maxAgeMs?: number, maxSpeed?: boolean, timeoutMS?: number): { brand?: object; code?: number; key_metadata?: object; status?: string; }`\n\n**get** `/brand/retrieve-by-name`\n\nRetrieve brand information using a company name.\n\n### Parameters\n\n- `name: string`\n  Company name to retrieve brand data for (e.g., 'Apple Inc', 'Microsoft Corporation'). Must be 3-30 characters.\n\n- `country_gl?: string`\n  Optional country code hint (GL parameter) to specify the country for the company name.\n\n- `force_language?: string`\n  Optional parameter to force the language of the retrieved brand data.\n\n- `maxAgeMs?: number`\n  Maximum age in milliseconds for cached brand data before the API performs a hard refresh. Defaults to 3 months (7776000000 ms). Values below 1 day (86400000 ms) are clamped to 1 day; values above 1 year (31536000000 ms) are clamped to 1 year.\n\n- `maxSpeed?: boolean`\n  Optional parameter to optimize the API call for maximum speed. When set to true, the API will skip time-consuming operations for faster response at the cost of less comprehensive data.\n\n- `timeoutMS?: number`\n  Optional timeout in milliseconds for the request. If the request takes longer than this value, it will be aborted with a 408 status code. Maximum allowed value is 300000ms (5 minutes).\n\n### Returns\n\n- `{ brand?: { address?: { city?: string; country?: string; country_code?: string; postal_code?: string; state_code?: string; state_province?: string; street?: string; }; backdrops?: { colors?: object[]; resolution?: object; url?: string; }[]; colors?: { hex?: string; name?: string; }[]; description?: string; domain?: string; email?: string; industries?: { eic?: object[]; }; is_nsfw?: boolean; links?: { blog?: string; careers?: string; contact?: string; pricing?: string; privacy?: string; terms?: string; }; logos?: { colors?: object[]; mode?: 'light' | 'dark' | 'has_opaque_background'; resolution?: object; type?: 'icon' | 'logo'; url?: string; }[]; phone?: string; primary_language?: string; slogan?: string; socials?: { type?: string; url?: string; }[]; stock?: { exchange?: string; ticker?: string; }; title?: string; }; code?: number; key_metadata?: { credits_consumed: number; credits_remaining: number; }; status?: string; }`\n\n  - `brand?: { address?: { city?: string; country?: string; country_code?: string; postal_code?: string; state_code?: string; state_province?: string; street?: string; }; backdrops?: { colors?: { hex?: string; name?: string; }[]; resolution?: { aspect_ratio?: number; height?: number; width?: number; }; url?: string; }[]; colors?: { hex?: string; name?: string; }[]; description?: string; domain?: string; email?: string; industries?: { eic?: { industry: string; subindustry: string; }[]; }; is_nsfw?: boolean; links?: { blog?: string; careers?: string; contact?: string; pricing?: string; privacy?: string; terms?: string; }; logos?: { colors?: { hex?: string; name?: string; }[]; mode?: 'light' | 'dark' | 'has_opaque_background'; resolution?: { aspect_ratio?: number; height?: number; width?: number; }; type?: 'icon' | 'logo'; url?: string; }[]; phone?: string; primary_language?: string; slogan?: string; socials?: { type?: string; url?: string; }[]; stock?: { exchange?: string; ticker?: string; }; title?: string; }`\n  - `code?: number`\n  - `key_metadata?: { credits_consumed: number; credits_remaining: number; }`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev();\n\nconst response = await client.brand.retrieveByName({ name: 'xxx' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.brand.retrieveByName',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.brand.retrieveByName({ name: 'xxx' });\n\nconsole.log(response.brand);",
      },
      python: {
        method: 'brand.retrieve_by_name',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.brand.retrieve_by_name(\n    name="xxx",\n)\nprint(response.brand)',
      },
      go: {
        method: 'client.Brand.GetByName',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/context-dot-dev/context-go-sdk"\n\t"github.com/context-dot-dev/context-go-sdk/option"\n)\n\nfunc main() {\n\tclient := contextdev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Brand.GetByName(context.TODO(), contextdev.BrandGetByNameParams{\n\t\tName: "xxx",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Brand)\n}\n',
      },
      ruby: {
        method: 'brand.retrieve_by_name',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nresponse = context_dev.brand.retrieve_by_name(name: "xxx")\n\nputs(response)',
      },
      cli: {
        method: 'brand retrieve_by_name',
        example: "context-dev brand retrieve-by-name \\\n  --api-key 'My API Key' \\\n  --name xxx",
      },
      php: {
        method: 'brand->retrieveByName',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->brand->retrieveByName(\n  name: 'xxx',\n  countryGl: 'ad',\n  forceLanguage: 'afrikaans',\n  maxAgeMs: 86400000,\n  maxSpeed: true,\n  timeoutMs: 1000,\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl https://api.context.dev/v1/brand/retrieve-by-name \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY"',
      },
    },
  },
  {
    name: 'retrieve_by_email',
    endpoint: '/brand/retrieve-by-email',
    httpMethod: 'get',
    summary: 'Retrieve brand data by email address',
    description:
      'Retrieve brand information using an email address while detecting disposable and free email addresses. Disposable and free email addresses (like gmail.com, yahoo.com) will throw a 422 error.',
    stainlessPath: '(resource) brand > (method) retrieve_by_email',
    qualified: 'client.brand.retrieveByEmail',
    params: [
      'email: string;',
      'force_language?: string;',
      'maxAgeMs?: number;',
      'maxSpeed?: boolean;',
      'timeoutMS?: number;',
    ],
    response:
      "{ brand?: { address?: { city?: string; country?: string; country_code?: string; postal_code?: string; state_code?: string; state_province?: string; street?: string; }; backdrops?: { colors?: object[]; resolution?: object; url?: string; }[]; colors?: { hex?: string; name?: string; }[]; description?: string; domain?: string; email?: string; industries?: { eic?: object[]; }; is_nsfw?: boolean; links?: { blog?: string; careers?: string; contact?: string; pricing?: string; privacy?: string; terms?: string; }; logos?: { colors?: object[]; mode?: 'light' | 'dark' | 'has_opaque_background'; resolution?: object; type?: 'icon' | 'logo'; url?: string; }[]; phone?: string; primary_language?: string; slogan?: string; socials?: { type?: string; url?: string; }[]; stock?: { exchange?: string; ticker?: string; }; title?: string; }; code?: number; key_metadata?: { credits_consumed: number; credits_remaining: number; }; status?: string; }",
    markdown:
      "## retrieve_by_email\n\n`client.brand.retrieveByEmail(email: string, force_language?: string, maxAgeMs?: number, maxSpeed?: boolean, timeoutMS?: number): { brand?: object; code?: number; key_metadata?: object; status?: string; }`\n\n**get** `/brand/retrieve-by-email`\n\nRetrieve brand information using an email address while detecting disposable and free email addresses. Disposable and free email addresses (like gmail.com, yahoo.com) will throw a 422 error.\n\n### Parameters\n\n- `email: string`\n  Email address to retrieve brand data for (e.g., 'contact@example.com'). The domain will be extracted from the email. Free email providers (gmail.com, yahoo.com, etc.) and disposable email addresses are not allowed.\n\n- `force_language?: string`\n  Optional parameter to force the language of the retrieved brand data.\n\n- `maxAgeMs?: number`\n  Maximum age in milliseconds for cached brand data before the API performs a hard refresh. Defaults to 3 months (7776000000 ms). Values below 1 day (86400000 ms) are clamped to 1 day; values above 1 year (31536000000 ms) are clamped to 1 year.\n\n- `maxSpeed?: boolean`\n  Optional parameter to optimize the API call for maximum speed. When set to true, the API will skip time-consuming operations for faster response at the cost of less comprehensive data.\n\n- `timeoutMS?: number`\n  Optional timeout in milliseconds for the request. If the request takes longer than this value, it will be aborted with a 408 status code. Maximum allowed value is 300000ms (5 minutes).\n\n### Returns\n\n- `{ brand?: { address?: { city?: string; country?: string; country_code?: string; postal_code?: string; state_code?: string; state_province?: string; street?: string; }; backdrops?: { colors?: object[]; resolution?: object; url?: string; }[]; colors?: { hex?: string; name?: string; }[]; description?: string; domain?: string; email?: string; industries?: { eic?: object[]; }; is_nsfw?: boolean; links?: { blog?: string; careers?: string; contact?: string; pricing?: string; privacy?: string; terms?: string; }; logos?: { colors?: object[]; mode?: 'light' | 'dark' | 'has_opaque_background'; resolution?: object; type?: 'icon' | 'logo'; url?: string; }[]; phone?: string; primary_language?: string; slogan?: string; socials?: { type?: string; url?: string; }[]; stock?: { exchange?: string; ticker?: string; }; title?: string; }; code?: number; key_metadata?: { credits_consumed: number; credits_remaining: number; }; status?: string; }`\n\n  - `brand?: { address?: { city?: string; country?: string; country_code?: string; postal_code?: string; state_code?: string; state_province?: string; street?: string; }; backdrops?: { colors?: { hex?: string; name?: string; }[]; resolution?: { aspect_ratio?: number; height?: number; width?: number; }; url?: string; }[]; colors?: { hex?: string; name?: string; }[]; description?: string; domain?: string; email?: string; industries?: { eic?: { industry: string; subindustry: string; }[]; }; is_nsfw?: boolean; links?: { blog?: string; careers?: string; contact?: string; pricing?: string; privacy?: string; terms?: string; }; logos?: { colors?: { hex?: string; name?: string; }[]; mode?: 'light' | 'dark' | 'has_opaque_background'; resolution?: { aspect_ratio?: number; height?: number; width?: number; }; type?: 'icon' | 'logo'; url?: string; }[]; phone?: string; primary_language?: string; slogan?: string; socials?: { type?: string; url?: string; }[]; stock?: { exchange?: string; ticker?: string; }; title?: string; }`\n  - `code?: number`\n  - `key_metadata?: { credits_consumed: number; credits_remaining: number; }`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev();\n\nconst response = await client.brand.retrieveByEmail({ email: 'dev@stainless.com' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.brand.retrieveByEmail',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.brand.retrieveByEmail({ email: 'dev@stainless.com' });\n\nconsole.log(response.brand);",
      },
      python: {
        method: 'brand.retrieve_by_email',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.brand.retrieve_by_email(\n    email="dev@stainless.com",\n)\nprint(response.brand)',
      },
      go: {
        method: 'client.Brand.GetByEmail',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/context-dot-dev/context-go-sdk"\n\t"github.com/context-dot-dev/context-go-sdk/option"\n)\n\nfunc main() {\n\tclient := contextdev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Brand.GetByEmail(context.TODO(), contextdev.BrandGetByEmailParams{\n\t\tEmail: "dev@stainless.com",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Brand)\n}\n',
      },
      ruby: {
        method: 'brand.retrieve_by_email',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nresponse = context_dev.brand.retrieve_by_email(email: "dev@stainless.com")\n\nputs(response)',
      },
      cli: {
        method: 'brand retrieve_by_email',
        example:
          "context-dev brand retrieve-by-email \\\n  --api-key 'My API Key' \\\n  --email dev@stainless.com",
      },
      php: {
        method: 'brand->retrieveByEmail',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->brand->retrieveByEmail(\n  email: 'dev@stainless.com',\n  forceLanguage: 'afrikaans',\n  maxAgeMs: 86400000,\n  maxSpeed: true,\n  timeoutMs: 1000,\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl https://api.context.dev/v1/brand/retrieve-by-email \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY"',
      },
    },
  },
  {
    name: 'identify_from_transaction',
    endpoint: '/brand/transaction_identifier',
    httpMethod: 'get',
    summary: 'Identify brand from transaction data',
    description:
      'Endpoint specially designed for platforms that want to identify transaction data by the transaction title.',
    stainlessPath: '(resource) brand > (method) identify_from_transaction',
    qualified: 'client.brand.identifyFromTransaction',
    params: [
      'transaction_info: string;',
      'city?: string;',
      'country_gl?: string;',
      'force_language?: string;',
      'high_confidence_only?: boolean;',
      'maxSpeed?: boolean;',
      'mcc?: string;',
      'phone?: number;',
      'timeoutMS?: number;',
    ],
    response:
      "{ brand?: { address?: { city?: string; country?: string; country_code?: string; postal_code?: string; state_code?: string; state_province?: string; street?: string; }; backdrops?: { colors?: object[]; resolution?: object; url?: string; }[]; colors?: { hex?: string; name?: string; }[]; description?: string; domain?: string; email?: string; industries?: { eic?: object[]; }; is_nsfw?: boolean; links?: { blog?: string; careers?: string; contact?: string; pricing?: string; privacy?: string; terms?: string; }; logos?: { colors?: object[]; mode?: 'light' | 'dark' | 'has_opaque_background'; resolution?: object; type?: 'icon' | 'logo'; url?: string; }[]; phone?: string; primary_language?: string; slogan?: string; socials?: { type?: string; url?: string; }[]; stock?: { exchange?: string; ticker?: string; }; title?: string; }; code?: number; key_metadata?: { credits_consumed: number; credits_remaining: number; }; status?: string; }",
    markdown:
      "## identify_from_transaction\n\n`client.brand.identifyFromTransaction(transaction_info: string, city?: string, country_gl?: string, force_language?: string, high_confidence_only?: boolean, maxSpeed?: boolean, mcc?: string, phone?: number, timeoutMS?: number): { brand?: object; code?: number; key_metadata?: object; status?: string; }`\n\n**get** `/brand/transaction_identifier`\n\nEndpoint specially designed for platforms that want to identify transaction data by the transaction title.\n\n### Parameters\n\n- `transaction_info: string`\n  Transaction information to identify the brand\n\n- `city?: string`\n  Optional city name to prioritize when searching for the brand.\n\n- `country_gl?: string`\n  Optional country code (GL parameter) to specify the country. This affects the geographic location used for search queries.\n\n- `force_language?: string`\n  Optional parameter to force the language of the retrieved brand data.\n\n- `high_confidence_only?: boolean`\n  When set to true, the API will perform an additional verification steps to ensure the identified brand matches the transaction with high confidence.\n\n- `maxSpeed?: boolean`\n  Optional parameter to optimize the API call for maximum speed. When set to true, the API will skip time-consuming operations for faster response at the cost of less comprehensive data.\n\n- `mcc?: string`\n  Optional Merchant Category Code (MCC) to help identify the business category/industry. \n\n- `phone?: number`\n  Optional phone number from the transaction to help verify brand match.\n\n- `timeoutMS?: number`\n  Optional timeout in milliseconds for the request. If the request takes longer than this value, it will be aborted with a 408 status code. Maximum allowed value is 300000ms (5 minutes).\n\n### Returns\n\n- `{ brand?: { address?: { city?: string; country?: string; country_code?: string; postal_code?: string; state_code?: string; state_province?: string; street?: string; }; backdrops?: { colors?: object[]; resolution?: object; url?: string; }[]; colors?: { hex?: string; name?: string; }[]; description?: string; domain?: string; email?: string; industries?: { eic?: object[]; }; is_nsfw?: boolean; links?: { blog?: string; careers?: string; contact?: string; pricing?: string; privacy?: string; terms?: string; }; logos?: { colors?: object[]; mode?: 'light' | 'dark' | 'has_opaque_background'; resolution?: object; type?: 'icon' | 'logo'; url?: string; }[]; phone?: string; primary_language?: string; slogan?: string; socials?: { type?: string; url?: string; }[]; stock?: { exchange?: string; ticker?: string; }; title?: string; }; code?: number; key_metadata?: { credits_consumed: number; credits_remaining: number; }; status?: string; }`\n\n  - `brand?: { address?: { city?: string; country?: string; country_code?: string; postal_code?: string; state_code?: string; state_province?: string; street?: string; }; backdrops?: { colors?: { hex?: string; name?: string; }[]; resolution?: { aspect_ratio?: number; height?: number; width?: number; }; url?: string; }[]; colors?: { hex?: string; name?: string; }[]; description?: string; domain?: string; email?: string; industries?: { eic?: { industry: string; subindustry: string; }[]; }; is_nsfw?: boolean; links?: { blog?: string; careers?: string; contact?: string; pricing?: string; privacy?: string; terms?: string; }; logos?: { colors?: { hex?: string; name?: string; }[]; mode?: 'light' | 'dark' | 'has_opaque_background'; resolution?: { aspect_ratio?: number; height?: number; width?: number; }; type?: 'icon' | 'logo'; url?: string; }[]; phone?: string; primary_language?: string; slogan?: string; socials?: { type?: string; url?: string; }[]; stock?: { exchange?: string; ticker?: string; }; title?: string; }`\n  - `code?: number`\n  - `key_metadata?: { credits_consumed: number; credits_remaining: number; }`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev();\n\nconst response = await client.brand.identifyFromTransaction({ transaction_info: 'transaction_info' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.brand.identifyFromTransaction',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.brand.identifyFromTransaction({\n  transaction_info: 'transaction_info',\n});\n\nconsole.log(response.brand);",
      },
      python: {
        method: 'brand.identify_from_transaction',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.brand.identify_from_transaction(\n    transaction_info="transaction_info",\n)\nprint(response.brand)',
      },
      go: {
        method: 'client.Brand.IdentifyFromTransaction',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/context-dot-dev/context-go-sdk"\n\t"github.com/context-dot-dev/context-go-sdk/option"\n)\n\nfunc main() {\n\tclient := contextdev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Brand.IdentifyFromTransaction(context.TODO(), contextdev.BrandIdentifyFromTransactionParams{\n\t\tTransactionInfo: "transaction_info",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Brand)\n}\n',
      },
      ruby: {
        method: 'brand.identify_from_transaction',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nresponse = context_dev.brand.identify_from_transaction(transaction_info: "transaction_info")\n\nputs(response)',
      },
      cli: {
        method: 'brand identify_from_transaction',
        example:
          "context-dev brand identify-from-transaction \\\n  --api-key 'My API Key' \\\n  --transaction-info transaction_info",
      },
      php: {
        method: 'brand->identifyFromTransaction',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->brand->identifyFromTransaction(\n  transactionInfo: 'transaction_info',\n  city: 'city',\n  countryGl: 'ad',\n  forceLanguage: 'afrikaans',\n  highConfidenceOnly: true,\n  maxSpeed: true,\n  mcc: 'mcc',\n  phone: 0,\n  timeoutMs: 1000,\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl https://api.context.dev/v1/brand/transaction_identifier \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY"',
      },
    },
  },
  {
    name: 'retrieve_simplified',
    endpoint: '/brand/retrieve-simplified',
    httpMethod: 'get',
    summary: 'Retrieve simplified brand data by domain',
    description:
      'Returns a simplified version of brand data containing only essential information: domain, title, colors, logos, and backdrops. Optimized for faster responses and reduced data transfer.',
    stainlessPath: '(resource) brand > (method) retrieve_simplified',
    qualified: 'client.brand.retrieveSimplified',
    params: ['domain: string;', 'maxAgeMs?: number;', 'timeoutMS?: number;'],
    response:
      "{ brand?: { backdrops?: { colors?: object[]; resolution?: object; url?: string; }[]; colors?: { hex?: string; name?: string; }[]; domain?: string; logos?: { colors?: object[]; mode?: 'light' | 'dark' | 'has_opaque_background'; resolution?: object; type?: 'icon' | 'logo'; url?: string; }[]; title?: string; }; code?: number; key_metadata?: { credits_consumed: number; credits_remaining: number; }; status?: string; }",
    markdown:
      "## retrieve_simplified\n\n`client.brand.retrieveSimplified(domain: string, maxAgeMs?: number, timeoutMS?: number): { brand?: object; code?: number; key_metadata?: object; status?: string; }`\n\n**get** `/brand/retrieve-simplified`\n\nReturns a simplified version of brand data containing only essential information: domain, title, colors, logos, and backdrops. Optimized for faster responses and reduced data transfer.\n\n### Parameters\n\n- `domain: string`\n  Domain name to retrieve simplified brand data for\n\n- `maxAgeMs?: number`\n  Maximum age in milliseconds for cached brand data before the API performs a hard refresh. Defaults to 3 months (7776000000 ms). Values below 1 day (86400000 ms) are clamped to 1 day; values above 1 year (31536000000 ms) are clamped to 1 year.\n\n- `timeoutMS?: number`\n  Optional timeout in milliseconds for the request. If the request takes longer than this value, it will be aborted with a 408 status code. Maximum allowed value is 300000ms (5 minutes).\n\n### Returns\n\n- `{ brand?: { backdrops?: { colors?: object[]; resolution?: object; url?: string; }[]; colors?: { hex?: string; name?: string; }[]; domain?: string; logos?: { colors?: object[]; mode?: 'light' | 'dark' | 'has_opaque_background'; resolution?: object; type?: 'icon' | 'logo'; url?: string; }[]; title?: string; }; code?: number; key_metadata?: { credits_consumed: number; credits_remaining: number; }; status?: string; }`\n\n  - `brand?: { backdrops?: { colors?: { hex?: string; name?: string; }[]; resolution?: { aspect_ratio?: number; height?: number; width?: number; }; url?: string; }[]; colors?: { hex?: string; name?: string; }[]; domain?: string; logos?: { colors?: { hex?: string; name?: string; }[]; mode?: 'light' | 'dark' | 'has_opaque_background'; resolution?: { aspect_ratio?: number; height?: number; width?: number; }; type?: 'icon' | 'logo'; url?: string; }[]; title?: string; }`\n  - `code?: number`\n  - `key_metadata?: { credits_consumed: number; credits_remaining: number; }`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev();\n\nconst response = await client.brand.retrieveSimplified({ domain: 'domain' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.brand.retrieveSimplified',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.brand.retrieveSimplified({ domain: 'domain' });\n\nconsole.log(response.brand);",
      },
      python: {
        method: 'brand.retrieve_simplified',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.brand.retrieve_simplified(\n    domain="domain",\n)\nprint(response.brand)',
      },
      go: {
        method: 'client.Brand.GetSimplified',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/context-dot-dev/context-go-sdk"\n\t"github.com/context-dot-dev/context-go-sdk/option"\n)\n\nfunc main() {\n\tclient := contextdev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Brand.GetSimplified(context.TODO(), contextdev.BrandGetSimplifiedParams{\n\t\tDomain: "domain",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Brand)\n}\n',
      },
      ruby: {
        method: 'brand.retrieve_simplified',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nresponse = context_dev.brand.retrieve_simplified(domain: "domain")\n\nputs(response)',
      },
      cli: {
        method: 'brand retrieve_simplified',
        example: "context-dev brand retrieve-simplified \\\n  --api-key 'My API Key' \\\n  --domain domain",
      },
      php: {
        method: 'brand->retrieveSimplified',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->brand->retrieveSimplified(\n  domain: 'domain', maxAgeMs: 86400000, timeoutMs: 1000\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl https://api.context.dev/v1/brand/retrieve-simplified \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY"',
      },
    },
  },
  {
    name: 'retrieve_naics',
    endpoint: '/web/naics',
    httpMethod: 'get',
    summary: 'Classify NAICS industries',
    description: 'Classify any brand into 2022 NAICS industry codes from its domain or name.',
    stainlessPath: '(resource) industry > (method) retrieve_naics',
    qualified: 'client.industry.retrieveNaics',
    params: ['input: string;', 'maxResults?: number;', 'minResults?: number;', 'timeoutMS?: number;'],
    response:
      "{ codes?: { code: string; confidence: 'high' | 'medium' | 'low'; name: string; }[]; domain?: string; key_metadata?: { credits_consumed: number; credits_remaining: number; }; status?: string; type?: string; }",
    markdown:
      "## retrieve_naics\n\n`client.industry.retrieveNaics(input: string, maxResults?: number, minResults?: number, timeoutMS?: number): { codes?: object[]; domain?: string; key_metadata?: object; status?: string; type?: string; }`\n\n**get** `/web/naics`\n\nClassify any brand into 2022 NAICS industry codes from its domain or name.\n\n### Parameters\n\n- `input: string`\n  Brand domain or title to retrieve NAICS code for. If a valid domain is provided, it will be used for classification, otherwise, we will search for the brand using the provided title.\n\n- `maxResults?: number`\n  Maximum number of NAICS codes to return. Must be between 1 and 10. Defaults to 5.\n\n- `minResults?: number`\n  Minimum number of NAICS codes to return. Must be at least 1. Defaults to 1.\n\n- `timeoutMS?: number`\n  Optional timeout in milliseconds for the request. If the request takes longer than this value, it will be aborted with a 408 status code. Maximum allowed value is 300000ms (5 minutes).\n\n### Returns\n\n- `{ codes?: { code: string; confidence: 'high' | 'medium' | 'low'; name: string; }[]; domain?: string; key_metadata?: { credits_consumed: number; credits_remaining: number; }; status?: string; type?: string; }`\n\n  - `codes?: { code: string; confidence: 'high' | 'medium' | 'low'; name: string; }[]`\n  - `domain?: string`\n  - `key_metadata?: { credits_consumed: number; credits_remaining: number; }`\n  - `status?: string`\n  - `type?: string`\n\n### Example\n\n```typescript\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev();\n\nconst response = await client.industry.retrieveNaics({ input: 'input' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.industry.retrieveNaics',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.industry.retrieveNaics({ input: 'input' });\n\nconsole.log(response.codes);",
      },
      python: {
        method: 'industry.retrieve_naics',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.industry.retrieve_naics(\n    input="input",\n)\nprint(response.codes)',
      },
      go: {
        method: 'client.Industry.GetNaics',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/context-dot-dev/context-go-sdk"\n\t"github.com/context-dot-dev/context-go-sdk/option"\n)\n\nfunc main() {\n\tclient := contextdev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Industry.GetNaics(context.TODO(), contextdev.IndustryGetNaicsParams{\n\t\tInput: "input",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Codes)\n}\n',
      },
      ruby: {
        method: 'industry.retrieve_naics',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nresponse = context_dev.industry.retrieve_naics(input: "input")\n\nputs(response)',
      },
      cli: {
        method: 'industry retrieve_naics',
        example: "context-dev industry retrieve-naics \\\n  --api-key 'My API Key' \\\n  --input input",
      },
      php: {
        method: 'industry->retrieveNaics',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->industry->retrieveNaics(\n  input: 'input', maxResults: 1, minResults: 1, timeoutMs: 1000\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl https://api.context.dev/v1/web/naics \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY"',
      },
    },
  },
  {
    name: 'retrieve_sic',
    endpoint: '/web/sic',
    httpMethod: 'get',
    summary: 'Classify SIC industries',
    description:
      'Classify any brand into Standard Industrial Classification (SIC) codes from its domain or name. Choose between the original SIC system (`original_sic`) or the latest SIC list maintained by the SEC (`latest_sec`).',
    stainlessPath: '(resource) industry > (method) retrieve_sic',
    qualified: 'client.industry.retrieveSic',
    params: [
      'input: string;',
      'maxResults?: number;',
      'minResults?: number;',
      'timeoutMS?: number;',
      "type?: 'original_sic' | 'latest_sec';",
    ],
    response:
      "{ classification?: 'original_sic' | 'latest_sec'; codes?: { code: string; confidence: 'high' | 'medium' | 'low'; name: string; majorGroup?: string; majorGroupName?: string; office?: string; }[]; domain?: string; key_metadata?: { credits_consumed: number; credits_remaining: number; }; status?: string; type?: string; }",
    markdown:
      "## retrieve_sic\n\n`client.industry.retrieveSic(input: string, maxResults?: number, minResults?: number, timeoutMS?: number, type?: 'original_sic' | 'latest_sec'): { classification?: 'original_sic' | 'latest_sec'; codes?: object[]; domain?: string; key_metadata?: object; status?: string; type?: string; }`\n\n**get** `/web/sic`\n\nClassify any brand into Standard Industrial Classification (SIC) codes from its domain or name. Choose between the original SIC system (`original_sic`) or the latest SIC list maintained by the SEC (`latest_sec`).\n\n### Parameters\n\n- `input: string`\n  Brand domain or title to retrieve SIC code for. If a valid domain is provided, it will be used for classification, otherwise, we will search for the brand using the provided title.\n\n- `maxResults?: number`\n  Maximum number of SIC codes to return. Must be between 1 and 10. Defaults to 5.\n\n- `minResults?: number`\n  Minimum number of SIC codes to return. Must be at least 1. Defaults to 1.\n\n- `timeoutMS?: number`\n  Optional timeout in milliseconds for the request. If the request takes longer than this value, it will be aborted with a 408 status code. Maximum allowed value is 300000ms (5 minutes).\n\n- `type?: 'original_sic' | 'latest_sec'`\n  Which SIC dataset to classify against. `original_sic` uses the 1987 Standard Industrial Classification system; `latest_sec` uses the current SIC list as published by the SEC. Defaults to `original_sic`.\n\n### Returns\n\n- `{ classification?: 'original_sic' | 'latest_sec'; codes?: { code: string; confidence: 'high' | 'medium' | 'low'; name: string; majorGroup?: string; majorGroupName?: string; office?: string; }[]; domain?: string; key_metadata?: { credits_consumed: number; credits_remaining: number; }; status?: string; type?: string; }`\n\n  - `classification?: 'original_sic' | 'latest_sec'`\n  - `codes?: { code: string; confidence: 'high' | 'medium' | 'low'; name: string; majorGroup?: string; majorGroupName?: string; office?: string; }[]`\n  - `domain?: string`\n  - `key_metadata?: { credits_consumed: number; credits_remaining: number; }`\n  - `status?: string`\n  - `type?: string`\n\n### Example\n\n```typescript\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev();\n\nconst response = await client.industry.retrieveSic({ input: 'input' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.industry.retrieveSic',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.industry.retrieveSic({ input: 'input' });\n\nconsole.log(response.classification);",
      },
      python: {
        method: 'industry.retrieve_sic',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.industry.retrieve_sic(\n    input="input",\n)\nprint(response.classification)',
      },
      go: {
        method: 'client.Industry.GetSic',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/context-dot-dev/context-go-sdk"\n\t"github.com/context-dot-dev/context-go-sdk/option"\n)\n\nfunc main() {\n\tclient := contextdev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Industry.GetSic(context.TODO(), contextdev.IndustryGetSicParams{\n\t\tInput: "input",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Classification)\n}\n',
      },
      ruby: {
        method: 'industry.retrieve_sic',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nresponse = context_dev.industry.retrieve_sic(input: "input")\n\nputs(response)',
      },
      cli: {
        method: 'industry retrieve_sic',
        example: "context-dev industry retrieve-sic \\\n  --api-key 'My API Key' \\\n  --input input",
      },
      php: {
        method: 'industry->retrieveSic',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->industry->retrieveSic(\n  input: 'input',\n  maxResults: 1,\n  minResults: 1,\n  timeoutMs: 1000,\n  type: 'original_sic',\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl https://api.context.dev/v1/web/sic \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY"',
      },
    },
  },
  {
    name: 'prefetch',
    endpoint: '/brand/prefetch',
    httpMethod: 'post',
    summary: 'Prefetch brand data for a domain',
    description: 'Signal that you may fetch brand data for a particular domain soon to improve latency.',
    stainlessPath: '(resource) utility > (method) prefetch',
    qualified: 'client.utility.prefetch',
    params: ['domain: string;', 'timeoutMS?: number;'],
    response:
      '{ domain?: string; key_metadata?: { credits_consumed: number; credits_remaining: number; }; message?: string; status?: string; }',
    markdown:
      "## prefetch\n\n`client.utility.prefetch(domain: string, timeoutMS?: number): { domain?: string; key_metadata?: object; message?: string; status?: string; }`\n\n**post** `/brand/prefetch`\n\nSignal that you may fetch brand data for a particular domain soon to improve latency.\n\n### Parameters\n\n- `domain: string`\n  Domain name to prefetch brand data for\n\n- `timeoutMS?: number`\n  Optional timeout in milliseconds for the request. If the request takes longer than this value, it will be aborted with a 408 status code. Maximum allowed value is 300000ms (5 minutes).\n\n### Returns\n\n- `{ domain?: string; key_metadata?: { credits_consumed: number; credits_remaining: number; }; message?: string; status?: string; }`\n\n  - `domain?: string`\n  - `key_metadata?: { credits_consumed: number; credits_remaining: number; }`\n  - `message?: string`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev();\n\nconst response = await client.utility.prefetch({ domain: 'domain' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.utility.prefetch',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.utility.prefetch({ domain: 'domain' });\n\nconsole.log(response.domain);",
      },
      python: {
        method: 'utility.prefetch',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.utility.prefetch(\n    domain="domain",\n)\nprint(response.domain)',
      },
      go: {
        method: 'client.Utility.Prefetch',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/context-dot-dev/context-go-sdk"\n\t"github.com/context-dot-dev/context-go-sdk/option"\n)\n\nfunc main() {\n\tclient := contextdev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Utility.Prefetch(context.TODO(), contextdev.UtilityPrefetchParams{\n\t\tDomain: "domain",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Domain)\n}\n',
      },
      ruby: {
        method: 'utility.prefetch',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nresponse = context_dev.utility.prefetch(domain: "domain")\n\nputs(response)',
      },
      cli: {
        method: 'utility prefetch',
        example: "context-dev utility prefetch \\\n  --api-key 'My API Key' \\\n  --domain domain",
      },
      php: {
        method: 'utility->prefetch',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->utility->prefetch(domain: 'domain', timeoutMs: 1000);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl https://api.context.dev/v1/brand/prefetch \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY" \\\n    -d \'{\n          "domain": "domain"\n        }\'',
      },
    },
  },
  {
    name: 'prefetch_by_email',
    endpoint: '/brand/prefetch-by-email',
    httpMethod: 'post',
    summary: 'Prefetch brand data by email',
    description:
      "Signal that you may fetch brand data for a particular domain soon to improve latency. This endpoint accepts an email address, extracts the domain from it, validates that it's not a disposable or free email provider, and queues the domain for prefetching.",
    stainlessPath: '(resource) utility > (method) prefetch_by_email',
    qualified: 'client.utility.prefetchByEmail',
    params: ['email: string;', 'timeoutMS?: number;'],
    response:
      '{ domain?: string; key_metadata?: { credits_consumed: number; credits_remaining: number; }; message?: string; status?: string; }',
    markdown:
      "## prefetch_by_email\n\n`client.utility.prefetchByEmail(email: string, timeoutMS?: number): { domain?: string; key_metadata?: object; message?: string; status?: string; }`\n\n**post** `/brand/prefetch-by-email`\n\nSignal that you may fetch brand data for a particular domain soon to improve latency. This endpoint accepts an email address, extracts the domain from it, validates that it's not a disposable or free email provider, and queues the domain for prefetching.\n\n### Parameters\n\n- `email: string`\n  Email address to prefetch brand data for. The domain will be extracted from the email. Free email providers (gmail.com, yahoo.com, etc.) and disposable email addresses are not allowed.\n\n- `timeoutMS?: number`\n  Optional timeout in milliseconds for the request. If the request takes longer than this value, it will be aborted with a 408 status code. Maximum allowed value is 300000ms (5 minutes).\n\n### Returns\n\n- `{ domain?: string; key_metadata?: { credits_consumed: number; credits_remaining: number; }; message?: string; status?: string; }`\n\n  - `domain?: string`\n  - `key_metadata?: { credits_consumed: number; credits_remaining: number; }`\n  - `message?: string`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev();\n\nconst response = await client.utility.prefetchByEmail({ email: 'dev@stainless.com' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.utility.prefetchByEmail',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.utility.prefetchByEmail({ email: 'dev@stainless.com' });\n\nconsole.log(response.domain);",
      },
      python: {
        method: 'utility.prefetch_by_email',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.utility.prefetch_by_email(\n    email="dev@stainless.com",\n)\nprint(response.domain)',
      },
      go: {
        method: 'client.Utility.PrefetchByEmail',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/context-dot-dev/context-go-sdk"\n\t"github.com/context-dot-dev/context-go-sdk/option"\n)\n\nfunc main() {\n\tclient := contextdev.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Utility.PrefetchByEmail(context.TODO(), contextdev.UtilityPrefetchByEmailParams{\n\t\tEmail: "dev@stainless.com",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Domain)\n}\n',
      },
      ruby: {
        method: 'utility.prefetch_by_email',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nresponse = context_dev.utility.prefetch_by_email(email: "dev@stainless.com")\n\nputs(response)',
      },
      cli: {
        method: 'utility prefetch_by_email',
        example:
          "context-dev utility prefetch-by-email \\\n  --api-key 'My API Key' \\\n  --email dev@stainless.com",
      },
      php: {
        method: 'utility->prefetchByEmail',
        example:
          "<?php\n\nrequire_once dirname(__DIR__) . '/vendor/autoload.php';\n\n$client = new Client(apiKey: 'My API Key');\n\n$response = $client->utility->prefetchByEmail(\n  email: 'dev@stainless.com', timeoutMs: 1000\n);\n\nvar_dump($response);",
      },
      http: {
        example:
          'curl https://api.context.dev/v1/brand/prefetch-by-email \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY" \\\n    -d \'{\n          "email": "dev@stainless.com"\n        }\'',
      },
    },
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [
  {
    language: 'cli',
    content:
      "# Context Dev CLI\n\nThe official CLI for the [Context Dev REST API](https://docs.context.dev/).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n<!-- x-release-please-start-version -->\n\n## Installation\n\n### Installing with Go\n\nTo test or install the CLI locally, you need [Go](https://go.dev/doc/install) version 1.22 or later installed.\n\n~~~sh\ngo install 'github.com/context-dot-dev/context-dev-cli/cmd/context-dev@latest'\n~~~\n\nOnce you have run `go install`, the binary is placed in your Go bin directory:\n\n- **Default location**: `$HOME/go/bin` (or `$GOPATH/bin` if GOPATH is set)\n- **Check your path**: Run `go env GOPATH` to see the base directory\n\nIf commands aren't found after installation, add the Go bin directory to your PATH:\n\n~~~sh\n# Add to your shell profile (.zshrc, .bashrc, etc.)\nexport PATH=\"$PATH:$(go env GOPATH)/bin\"\n~~~\n\n<!-- x-release-please-end -->\n\n### Running Locally\n\nAfter cloning the git repository for this project, you can use the\n`scripts/run` script to run the tool locally:\n\n~~~sh\n./scripts/run args...\n~~~\n\n## Usage\n\nThe CLI follows a resource-based command structure:\n\n~~~sh\ncontext-dev [resource] <command> [flags...]\n~~~\n\n~~~sh\ncontext-dev brand retrieve \\\n  --api-key 'My API Key' \\\n  --domain REPLACE_ME\n~~~\n\nFor details about specific commands, use the `--help` flag.\n\n### Environment variables\n\n| Environment variable  | Required |\n| --------------------- | -------- |\n| `CONTEXT_DEV_API_KEY` | yes      |\n\n### Global flags\n\n- `--api-key` (can also be set with `CONTEXT_DEV_API_KEY` env var)\n- `--help` - Show command line usage\n- `--debug` - Enable debug logging (includes HTTP request/response details)\n- `--version`, `-v` - Show the CLI version\n- `--base-url` - Use a custom API backend URL\n- `--format` - Change the output format (`auto`, `explore`, `json`, `jsonl`, `pretty`, `raw`, `yaml`)\n- `--format-error` - Change the output format for errors (`auto`, `explore`, `json`, `jsonl`, `pretty`, `raw`, `yaml`)\n- `--transform` - Transform the data output using [GJSON syntax](https://github.com/tidwall/gjson/blob/master/SYNTAX.md)\n- `--transform-error` - Transform the error output using [GJSON syntax](https://github.com/tidwall/gjson/blob/master/SYNTAX.md)\n\n### Passing files as arguments\n\nTo pass files to your API, you can use the `@myfile.ext` syntax:\n\n~~~bash\ncontext-dev <command> --arg @abe.jpg\n~~~\n\nFiles can also be passed inside JSON or YAML blobs:\n\n~~~bash\ncontext-dev <command> --arg '{image: \"@abe.jpg\"}'\n# Equivalent:\ncontext-dev <command> <<YAML\narg:\n  image: \"@abe.jpg\"\nYAML\n~~~\n\nIf you need to pass a string literal that begins with an `@` sign, you can\nescape the `@` sign to avoid accidentally passing a file.\n\n~~~bash\ncontext-dev <command> --username '\\@abe'\n~~~\n\n#### Explicit encoding\n\nFor JSON endpoints, the CLI tool does filetype sniffing to determine whether the\nfile contents should be sent as a string literal (for plain text files) or as a\nbase64-encoded string literal (for binary files). If you need to explicitly send\nthe file as either plain text or base64-encoded data, you can use\n`@file://myfile.txt` (for string encoding) or `@data://myfile.dat` (for\nbase64-encoding). Note that absolute paths will begin with `@file://` or\n`@data://`, followed by a third `/` (for example, `@file:///tmp/file.txt`).\n\n~~~bash\ncontext-dev <command> --arg @data://file.txt\n~~~\n\n## Linking different Go SDK versions\n\nYou can link the CLI against a different version of the Context Dev Go SDK\nfor development purposes using the `./scripts/link` script.\n\nTo link to a specific version from a repository (version can be a branch,\ngit tag, or commit hash):\n\n~~~bash\n./scripts/link github.com/org/repo@version\n~~~\n\nTo link to a local copy of the SDK:\n\n~~~bash\n./scripts/link ../path/to/contextdev-go\n~~~\n\nIf you run the link script without any arguments, it will default to `../contextdev-go`.\n",
  },
  {
    language: 'go',
    content:
      '# Context Dev Go API Library\n\n<a href="https://pkg.go.dev/github.com/context-dot-dev/context-go-sdk"><img src="https://pkg.go.dev/badge/github.com/context-dot-dev/context-go-sdk.svg" alt="Go Reference"></a>\n\nThe Context Dev Go library provides convenient access to the [Context Dev REST API](https://docs.context.dev/)\nfrom applications written in Go.\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Context Dev MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=context.dev-mcp&config=eyJuYW1lIjoiY29udGV4dC5kZXYtbWNwIiwidHJhbnNwb3J0IjoiaHR0cCIsInVybCI6Imh0dHBzOi8vY29udGV4dC1kZXYuc3RsbWNwLmNvbSIsImhlYWRlcnMiOnsieC1jb250ZXh0LWRldi1hcGkta2V5IjoiTXkgQVBJIEtleSJ9fQ)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22context.dev-mcp%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fcontext-dev.stlmcp.com%22%2C%22headers%22%3A%7B%22x-context-dev-api-key%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n<!-- x-release-please-start-version -->\n\n```go\nimport (\n\t"github.com/context-dot-dev/context-go-sdk" // imported as SDK_PackageName\n)\n```\n\n<!-- x-release-please-end -->\n\nOr to pin the version:\n\n<!-- x-release-please-start-version -->\n\n```sh\ngo get -u \'github.com/context-dot-dev/context-go-sdk@v0.0.1\'\n```\n\n<!-- x-release-please-end -->\n\n## Requirements\n\nThis library requires Go 1.22+.\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```go\npackage main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/context-dot-dev/context-go-sdk"\n\t"github.com/context-dot-dev/context-go-sdk/option"\n)\n\nfunc main() {\n\tclient := contextdev.NewClient(\n\t\toption.WithAPIKey("My API Key"), // defaults to os.LookupEnv("CONTEXT_DEV_API_KEY")\n\t)\n\tbrand, err := client.Brand.Get(context.TODO(), contextdev.BrandGetParams{\n\t\tDomain: "REPLACE_ME",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", brand.Brand)\n}\n\n```\n\n### Request fields\n\nAll request parameters are wrapped in a generic `Field` type,\nwhich we use to distinguish zero values from null or omitted fields.\n\nThis prevents accidentally sending a zero value if you forget a required parameter,\nand enables explicitly sending `null`, `false`, `\'\'`, or `0` on optional parameters.\nAny field not specified is not sent.\n\nTo construct fields with values, use the helpers `String()`, `Int()`, `Float()`, or most commonly, the generic `F[T]()`.\nTo send a null, use `Null[T]()`, and to send a nonconforming value, use `Raw[T](any)`. For example:\n\n```go\nparams := FooParams{\n\tName: SDK_PackageName.F("hello"),\n\n\t// Explicitly send `"description": null`\n\tDescription: SDK_PackageName.Null[string](),\n\n\tPoint: SDK_PackageName.F(SDK_PackageName.Point{\n\t\tX: SDK_PackageName.Int(0),\n\t\tY: SDK_PackageName.Int(1),\n\n\t\t// In cases where the API specifies a given type,\n\t\t// but you want to send something else, use `Raw`:\n\t\tZ: SDK_PackageName.Raw[int64](0.01), // sends a float\n\t}),\n}\n```\n\n### Response objects\n\nAll fields in response structs are value types (not pointers or wrappers).\n\nIf a given field is `null`, not present, or invalid, the corresponding field\nwill simply be its zero value.\n\nAll response structs also include a special `JSON` field, containing more detailed\ninformation about each property, which you can use like so:\n\n```go\nif res.Name == "" {\n\t// true if `"name"` is either not present or explicitly null\n\tres.JSON.Name.IsNull()\n\n\t// true if the `"name"` key was not present in the response JSON at all\n\tres.JSON.Name.IsMissing()\n\n\t// When the API returns data that cannot be coerced to the expected type:\n\tif res.JSON.Name.IsInvalid() {\n\t\traw := res.JSON.Name.Raw()\n\n\t\tlegacyName := struct{\n\t\t\tFirst string `json:"first"`\n\t\t\tLast  string `json:"last"`\n\t\t}{}\n\t\tjson.Unmarshal([]byte(raw), &legacyName)\n\t\tname = legacyName.First + " " + legacyName.Last\n\t}\n}\n```\n\nThese `.JSON` structs also include an `Extras` map containing\nany properties in the json response that were not specified\nin the struct. This can be useful for API features not yet\npresent in the SDK.\n\n```go\nbody := res.JSON.ExtraFields["my_unexpected_field"].Raw()\n```\n\n### RequestOptions\n\nThis library uses the functional options pattern. Functions defined in the\n`SDK_PackageOptionName` package return a `RequestOption`, which is a closure that mutates a\n`RequestConfig`. These options can be supplied to the client or at individual\nrequests. For example:\n\n```go\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\t// Adds a header to every request made by the client\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "custom_header_info"),\n)\n\nclient.Brand.Get(context.TODO(), ...,\n\t// Override the header\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "some_other_custom_header_info"),\n\t// Add an undocumented field to the request body, using sjson syntax\n\tSDK_PackageOptionName.WithJSONSet("some.json.path", map[string]string{"my": "object"}),\n)\n```\n\nSee the [full list of request options](https://pkg.go.dev/github.com/context-dot-dev/context-go-sdk/SDK_PackageOptionName).\n\n### Pagination\n\nThis library provides some conveniences for working with paginated list endpoints.\n\nYou can use `.ListAutoPaging()` methods to iterate through items across all pages:\n\n\n\nOr you can use simple `.List()` methods to fetch a single page and receive a standard response object\nwith additional helper methods like `.GetNextPage()`, e.g.:\n\n\n\n### Errors\n\nWhen the API returns a non-success status code, we return an error with type\n`*SDK_PackageName.Error`. This contains the `StatusCode`, `*http.Request`, and\n`*http.Response` values of the request, as well as the JSON of the error body\n(much like other response objects in the SDK).\n\nTo handle errors, we recommend that you use the `errors.As` pattern:\n\n```go\n_, err := client.Brand.Get(context.TODO(), contextdev.BrandGetParams{\n\tDomain: "REPLACE_ME",\n})\nif err != nil {\n\tvar apierr *contextdev.Error\n\tif errors.As(err, &apierr) {\n\t\tprintln(string(apierr.DumpRequest(true)))  // Prints the serialized HTTP request\n\t\tprintln(string(apierr.DumpResponse(true))) // Prints the serialized HTTP response\n\t}\n\tpanic(err.Error()) // GET "/brand/retrieve": 400 Bad Request { ... }\n}\n```\n\nWhen other errors occur, they are returned unwrapped; for example,\nif HTTP transport fails, you might receive `*url.Error` wrapping `*net.OpError`.\n\n### Timeouts\n\nRequests do not time out by default; use context to configure a timeout for a request lifecycle.\n\nNote that if a request is [retried](#retries), the context timeout does not start over.\nTo set a per-retry timeout, use `SDK_PackageOptionName.WithRequestTimeout()`.\n\n```go\n// This sets the timeout for the request, including all the retries.\nctx, cancel := context.WithTimeout(context.Background(), 5*time.Minute)\ndefer cancel()\nclient.Brand.Get(\n\tctx,\n\tcontextdev.BrandGetParams{\n\t\tDomain: "REPLACE_ME",\n\t},\n\t// This sets the per-retry timeout\n\toption.WithRequestTimeout(20*time.Second),\n)\n```\n\n### File uploads\n\nRequest parameters that correspond to file uploads in multipart requests are typed as\n`param.Field[io.Reader]`. The contents of the `io.Reader` will by default be sent as a multipart form\npart with the file name of "anonymous_file" and content-type of "application/octet-stream".\n\nThe file name and content-type can be customized by implementing `Name() string` or `ContentType()\nstring` on the run-time type of `io.Reader`. Note that `os.File` implements `Name() string`, so a\nfile returned by `os.Open` will be sent with the file name on disk.\n\nWe also provide a helper `SDK_PackageName.FileParam(reader io.Reader, filename string, contentType string)`\nwhich can be used to wrap any `io.Reader` with the appropriate file name and content type.\n\n\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nWe retry by default all connection errors, 408 Request Timeout, 409 Conflict, 429 Rate Limit,\nand >=500 Internal errors.\n\nYou can use the `WithMaxRetries` option to configure or disable this:\n\n```go\n// Configure the default for all requests:\nclient := contextdev.NewClient(\n\toption.WithMaxRetries(0), // default is 2\n)\n\n// Override per-request:\nclient.Brand.Get(\n\tcontext.TODO(),\n\tcontextdev.BrandGetParams{\n\t\tDomain: "REPLACE_ME",\n\t},\n\toption.WithMaxRetries(5),\n)\n```\n\n\n### Accessing raw response data (e.g. response headers)\n\nYou can access the raw HTTP response data by using the `option.WithResponseInto()` request option. This is useful when\nyou need to examine response headers, status codes, or other details.\n\n```go\n// Create a variable to store the HTTP response\nvar response *http.Response\nbrand, err := client.Brand.Get(\n\tcontext.TODO(),\n\tcontextdev.BrandGetParams{\n\t\tDomain: "REPLACE_ME",\n\t},\n\toption.WithResponseInto(&response),\n)\nif err != nil {\n\t// handle error\n}\nfmt.Printf("%+v\\n", brand)\n\nfmt.Printf("Status Code: %d\\n", response.StatusCode)\nfmt.Printf("Headers: %+#v\\n", response.Header)\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.Get`, `client.Post`, and other HTTP verbs.\n`RequestOptions` on the client, such as retries, will be respected when making these requests.\n\n```go\nvar (\n    // params can be an io.Reader, a []byte, an encoding/json serializable object,\n    // or a "…Params" struct defined in this library.\n    params map[string]interface{}\n\n    // result can be an []byte, *http.Response, a encoding/json deserializable object,\n    // or a model defined in this library.\n    result *http.Response\n)\nerr := client.Post(context.Background(), "/unspecified", params, &result)\nif err != nil {\n    …\n}\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use either the `SDK_PackageOptionName.WithQuerySet()`\nor the `SDK_PackageOptionName.WithJSONSet()` methods.\n\n```go\nparams := FooNewParams{\n    ID:   SDK_PackageName.F("id_xxxx"),\n    Data: SDK_PackageName.F(FooNewParamsData{\n        FirstName: SDK_PackageName.F("John"),\n    }),\n}\nclient.Foo.New(context.Background(), params, SDK_PackageOptionName.WithJSONSet("data.last_name", "Doe"))\n```\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may either access the raw JSON of the response as a string\nwith `result.JSON.RawJSON()`, or get the raw JSON of a particular field on the result with\n`result.JSON.Foo.Raw()`.\n\nAny fields that are not present on the response struct will be saved and can be accessed by `result.JSON.ExtraFields()` which returns the extra fields as a `map[string]Field`.\n\n### Middleware\n\nWe provide `SDK_PackageOptionName.WithMiddleware` which applies the given\nmiddleware to requests.\n\n```go\nfunc Logger(req *http.Request, next SDK_PackageOptionName.MiddlewareNext) (res *http.Response, err error) {\n\t// Before the request\n\tstart := time.Now()\n\tLogReq(req)\n\n\t// Forward the request to the next handler\n\tres, err = next(req)\n\n\t// Handle stuff after the request\n\tend := time.Now()\n\tLogRes(res, err, start - end)\n\n    return res, err\n}\n\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\tSDK_PackageOptionName.WithMiddleware(Logger),\n)\n```\n\nWhen multiple middlewares are provided as variadic arguments, the middlewares\nare applied left to right. If `SDK_PackageOptionName.WithMiddleware` is given\nmultiple times, for example first in the client then the method, the\nmiddleware in the client will run first and the middleware given in the method\nwill run next.\n\nYou may also replace the default `http.Client` with\n`SDK_PackageOptionName.WithHTTPClient(client)`. Only one http client is\naccepted (this overwrites any previous client) and receives requests after any\nmiddleware has been applied.\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/context-dot-dev/context-go-sdk/issues) with questions, bugs, or suggestions.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'php',
    content:
      "# Context Dev PHP API Library\n\nThe Context Dev PHP library provides convenient access to the Context Dev REST API from any PHP 8.1.0+ application.\n\n## Installation\n\n<!-- x-release-please-start-version -->\n```\ncomposer require \"context-dev/context-dev-php 0.0.1\"\n```\n<!-- x-release-please-end -->\n\n## Usage\n\n```php\n<?php\n\n$client = new Client(apiKey: getenv('CONTEXT_DEV_API_KEY') ?: 'My API Key');\n\n$brand = $client->brand->retrieve(domain: 'REPLACE_ME');\n\nvar_dump($brand->brand);\n```",
  },
  {
    language: 'python',
    content:
      '# Context Dev Python API library\n\n<!-- prettier-ignore -->\n[![PyPI version](https://img.shields.io/pypi/v/context.dev.svg?label=pypi%20(stable))](https://pypi.org/project/context.dev/)\n\nThe Context Dev Python library provides convenient access to the Context Dev REST API from any Python 3.9+\napplication. The library includes type definitions for all request params and response fields,\nand offers both synchronous and asynchronous clients powered by [httpx](https://github.com/encode/httpx).\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Context Dev MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=context.dev-mcp&config=eyJuYW1lIjoiY29udGV4dC5kZXYtbWNwIiwidHJhbnNwb3J0IjoiaHR0cCIsInVybCI6Imh0dHBzOi8vY29udGV4dC1kZXYuc3RsbWNwLmNvbSIsImhlYWRlcnMiOnsieC1jb250ZXh0LWRldi1hcGkta2V5IjoiTXkgQVBJIEtleSJ9fQ)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22context.dev-mcp%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fcontext-dev.stlmcp.com%22%2C%22headers%22%3A%7B%22x-context-dev-api-key%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\nThe REST API documentation can be found on [docs.context.dev](https://docs.context.dev/). The full API of this library can be found in [api.md](api.md).\n\n## Installation\n\n```sh\n# install from PyPI\npip install context.dev\n```\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```python\nimport os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\n\nbrand = client.brand.retrieve(\n    domain="REPLACE_ME",\n)\nprint(brand.brand)\n```\n\nWhile you can provide an `api_key` keyword argument,\nwe recommend using [python-dotenv](https://pypi.org/project/python-dotenv/)\nto add `CONTEXT_DEV_API_KEY="My API Key"` to your `.env` file\nso that your API Key is not stored in source control.\n\n## Async usage\n\nSimply import `AsyncContextDev` instead of `ContextDev` and use `await` with each API call:\n\n```python\nimport os\nimport asyncio\nfrom context.dev import AsyncContextDev\n\nclient = AsyncContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\n\nasync def main() -> None:\n  brand = await client.brand.retrieve(\n      domain="REPLACE_ME",\n  )\n  print(brand.brand)\n\nasyncio.run(main())\n```\n\nFunctionality between the synchronous and asynchronous clients is otherwise identical.\n\n### With aiohttp\n\nBy default, the async client uses `httpx` for HTTP requests. However, for improved concurrency performance you may also use `aiohttp` as the HTTP backend.\n\nYou can enable this by installing `aiohttp`:\n\n```sh\n# install from PyPI\npip install context.dev[aiohttp]\n```\n\nThen you can enable it by instantiating the client with `http_client=DefaultAioHttpClient()`:\n\n```python\nimport os\nimport asyncio\nfrom context.dev import DefaultAioHttpClient\nfrom context.dev import AsyncContextDev\n\nasync def main() -> None:\n  async with AsyncContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n    http_client=DefaultAioHttpClient(),\n) as client:\n    brand = await client.brand.retrieve(\n        domain="REPLACE_ME",\n    )\n    print(brand.brand)\n\nasyncio.run(main())\n```\n\n\n\n## Using types\n\nNested request parameters are [TypedDicts](https://docs.python.org/3/library/typing.html#typing.TypedDict). Responses are [Pydantic models](https://docs.pydantic.dev) which also provide helper methods for things like:\n\n- Serializing back into JSON, `model.to_json()`\n- Converting to a dictionary, `model.to_dict()`\n\nTyped requests and responses provide autocomplete and documentation within your editor. If you would like to see type errors in VS Code to help catch bugs earlier, set `python.analysis.typeCheckingMode` to `basic`.\n\n\n\n## Nested params\n\nNested parameters are dictionaries, typed using `TypedDict`, for example:\n\n```python\nfrom context.dev import ContextDev\n\nclient = ContextDev()\n\nresponse = client.web.extract(\n    schema={\n        "type": "bar",\n        "properties": "bar",\n        "required": "bar",\n        "additionalProperties": "bar",\n    },\n    url="https://example.com",\n    pdf={},\n)\nprint(response.pdf)\n```\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API (for example, due to network connection problems or a timeout), a subclass of `context.dev.APIConnectionError` is raised.\n\nWhen the API returns a non-success status code (that is, 4xx or 5xx\nresponse), a subclass of `context.dev.APIStatusError` is raised, containing `status_code` and `response` properties.\n\nAll errors inherit from `context.dev.APIError`.\n\n```python\nimport context.dev\nfrom context.dev import ContextDev\n\nclient = ContextDev()\n\ntry:\n    client.brand.retrieve(\n        domain="REPLACE_ME",\n    )\nexcept context.dev.APIConnectionError as e:\n    print("The server could not be reached")\n    print(e.__cause__) # an underlying Exception, likely raised within httpx.\nexcept context.dev.RateLimitError as e:\n    print("A 429 status code was received; we should back off a bit.")\nexcept context.dev.APIStatusError as e:\n    print("Another non-200-range status code was received")\n    print(e.status_code)\n    print(e.response)\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors are automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors are all retried by default.\n\nYou can use the `max_retries` option to configure or disable retry settings:\n\n```python\nfrom context.dev import ContextDev\n\n# Configure the default for all requests:\nclient = ContextDev(\n    # default is 2\n    max_retries=0,\n)\n\n# Or, configure per-request:\nclient.with_options(max_retries = 5).brand.retrieve(\n    domain="REPLACE_ME",\n)\n```\n\n### Timeouts\n\nBy default requests time out after 1 minute. You can configure this with a `timeout` option,\nwhich accepts a float or an [`httpx.Timeout`](https://www.python-httpx.org/advanced/timeouts/#fine-tuning-the-configuration) object:\n\n```python\nfrom context.dev import ContextDev\n\n# Configure the default for all requests:\nclient = ContextDev(\n    # 20 seconds (default is 1 minute)\n    timeout=20.0,\n)\n\n# More granular control:\nclient = ContextDev(\n    timeout=httpx.Timeout(60.0, read=5.0, write=10.0, connect=2.0),\n)\n\n# Override per-request:\nclient.with_options(timeout = 5.0).brand.retrieve(\n    domain="REPLACE_ME",\n)\n```\n\nOn timeout, an `APITimeoutError` is thrown.\n\nNote that requests that time out are [retried twice by default](#retries).\n\n\n\n## Advanced\n\n### Logging\n\nWe use the standard library [`logging`](https://docs.python.org/3/library/logging.html) module.\n\nYou can enable logging by setting the environment variable `CONTEXT_DEV_LOG` to `info`.\n\n```shell\n$ export CONTEXT_DEV_LOG=info\n```\n\nOr to `debug` for more verbose logging.\n\n### How to tell whether `None` means `null` or missing\n\nIn an API response, a field may be explicitly `null`, or missing entirely; in either case, its value is `None` in this library. You can differentiate the two cases with `.model_fields_set`:\n\n```py\nif response.my_field is None:\n  if \'my_field\' not in response.model_fields_set:\n    print(\'Got json like {}, without a "my_field" key present at all.\')\n  else:\n    print(\'Got json like {"my_field": null}.\')\n```\n\n### Accessing raw response data (e.g. headers)\n\nThe "raw" Response object can be accessed by prefixing `.with_raw_response.` to any HTTP method call, e.g.,\n\n```py\nfrom context.dev import ContextDev\n\nclient = ContextDev()\nresponse = client.brand.with_raw_response.retrieve(\n    domain="REPLACE_ME",\n)\nprint(response.headers.get(\'X-My-Header\'))\n\nbrand = response.parse()  # get the object that `brand.retrieve()` would have returned\nprint(brand.brand)\n```\n\nThese methods return an [`APIResponse`](https://github.com/context-dot-dev/context-python-sdk/tree/main/src/context/dev/_response.py) object.\n\nThe async client returns an [`AsyncAPIResponse`](https://github.com/context-dot-dev/context-python-sdk/tree/main/src/context/dev/_response.py) with the same structure, the only difference being `await`able methods for reading the response content.\n\n#### `.with_streaming_response`\n\nThe above interface eagerly reads the full response body when you make the request, which may not always be what you want.\n\nTo stream the response body, use `.with_streaming_response` instead, which requires a context manager and only reads the response body once you call `.read()`, `.text()`, `.json()`, `.iter_bytes()`, `.iter_text()`, `.iter_lines()` or `.parse()`. In the async client, these are async methods.\n\n```python\nwith client.brand.with_streaming_response.retrieve(\n    domain="REPLACE_ME",\n) as response :\n    print(response.headers.get(\'X-My-Header\'))\n\n    for line in response.iter_lines():\n      print(line)\n```\n\nThe context manager is required so that the response will reliably be closed.\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API.\n\nIf you need to access undocumented endpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can make requests using `client.get`, `client.post`, and other\nhttp verbs. Options on the client will be respected (such as retries) when making this request.\n\n```py\nimport httpx\n\nresponse = client.post(\n    "/foo",\n    cast_to=httpx.Response,\n    body={"my_param": True},\n)\n\nprint(response.headers.get("x-foo"))\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you can access the extra fields like `response.unknown_prop`. You\ncan also get all the extra fields on the Pydantic model as a dict with\n[`response.model_extra`](https://docs.pydantic.dev/latest/api/base_model/#pydantic.BaseModel.model_extra).\n\n### Configuring the HTTP client\n\nYou can directly override the [httpx client](https://www.python-httpx.org/api/#client) to customize it for your use case, including:\n\n- Support for [proxies](https://www.python-httpx.org/advanced/proxies/)\n- Custom [transports](https://www.python-httpx.org/advanced/transports/)\n- Additional [advanced](https://www.python-httpx.org/advanced/clients/) functionality\n\n```python\nimport httpx\nfrom context.dev import ContextDev, DefaultHttpxClient\n\nclient = ContextDev(\n    # Or use the `CONTEXT_DEV_BASE_URL` env var\n    base_url="http://my.test.server.example.com:8083",\n    http_client=DefaultHttpxClient(proxy="http://my.test.proxy.example.com", transport=httpx.HTTPTransport(local_address="0.0.0.0")),\n)\n```\n\nYou can also customize the client on a per-request basis by using `with_options()`:\n\n```python\nclient.with_options(http_client=DefaultHttpxClient(...))\n```\n\n### Managing HTTP resources\n\nBy default the library closes underlying HTTP connections whenever the client is [garbage collected](https://docs.python.org/3/reference/datamodel.html#object.__del__). You can manually close the client using the `.close()` method if desired, or with a context manager that closes when exiting.\n\n```py\nfrom context.dev import ContextDev\n\nwith ContextDev() as client:\n  # make requests here\n  ...\n\n# HTTP client is now closed\n```\n\n## Versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/context-dot-dev/context-python-sdk/issues) with questions, bugs, or suggestions.\n\n### Determining the installed version\n\nIf you\'ve upgraded to the latest version but aren\'t seeing any new features you were expecting then your python environment is likely still using an older version.\n\nYou can determine the version that is being used at runtime with:\n\n```py\nimport context.dev\nprint(context.dev.__version__)\n```\n\n## Requirements\n\nPython 3.9 or higher.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'ruby',
    content:
      '# Context Dev Ruby API library\n\nThe Context Dev Ruby library provides convenient access to the Context Dev REST API from any Ruby 3.2.0+ application. It ships with comprehensive types & docstrings in Yard, RBS, and RBI – [see below](https://github.com/context-dot-dev/context-ruby-sdk#Sorbet) for usage with Sorbet. The standard library\'s `net/http` is used as the HTTP transport, with connection pooling via the `connection_pool` gem.\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Context Dev MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=context.dev-mcp&config=eyJuYW1lIjoiY29udGV4dC5kZXYtbWNwIiwidHJhbnNwb3J0IjoiaHR0cCIsInVybCI6Imh0dHBzOi8vY29udGV4dC1kZXYuc3RsbWNwLmNvbSIsImhlYWRlcnMiOnsieC1jb250ZXh0LWRldi1hcGkta2V5IjoiTXkgQVBJIEtleSJ9fQ)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22context.dev-mcp%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fcontext-dev.stlmcp.com%22%2C%22headers%22%3A%7B%22x-context-dev-api-key%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\nDocumentation for releases of this gem can be found [on RubyDoc](https://gemdocs.org/gems/context.dev).\n\nThe REST API documentation can be found on [docs.context.dev](https://docs.context.dev/).\n\n## Installation\n\nTo use this gem, install via Bundler by adding the following to your application\'s `Gemfile`:\n\n<!-- x-release-please-start-version -->\n\n```ruby\ngem "context.dev", "~> 0.0.1"\n```\n\n<!-- x-release-please-end -->\n\n## Usage\n\n```ruby\nrequire "bundler/setup"\nrequire "context_dev"\n\ncontext_dev = ContextDev::Client.new(\n  api_key: ENV["CONTEXT_DEV_API_KEY"] # This is the default and can be omitted\n)\n\nbrand = context_dev.brand.retrieve(domain: "REPLACE_ME")\n\nputs(brand.brand)\n```\n\n\n\n\n\n\n\n### Handling errors\n\nWhen the library is unable to connect to the API, or if the API returns a non-success status code (i.e., 4xx or 5xx response), a subclass of `ContextDev::Errors::APIError` will be thrown:\n\n```ruby\nbegin\n  brand = context_dev.brand.retrieve(domain: "REPLACE_ME")\nrescue ContextDev::Errors::APIConnectionError => e\n  puts("The server could not be reached")\n  puts(e.cause)  # an underlying Exception, likely raised within `net/http`\nrescue ContextDev::Errors::RateLimitError => e\n  puts("A 429 status code was received; we should back off a bit.")\nrescue ContextDev::Errors::APIStatusError => e\n  puts("Another non-200-range status code was received")\n  puts(e.status)\nend\n```\n\nError codes are as follows:\n\n| Cause            | Error Type                 |\n| ---------------- | -------------------------- |\n| HTTP 400         | `BadRequestError`          |\n| HTTP 401         | `AuthenticationError`      |\n| HTTP 403         | `PermissionDeniedError`    |\n| HTTP 404         | `NotFoundError`            |\n| HTTP 409         | `ConflictError`            |\n| HTTP 422         | `UnprocessableEntityError` |\n| HTTP 429         | `RateLimitError`           |\n| HTTP >= 500      | `InternalServerError`      |\n| Other HTTP error | `APIStatusError`           |\n| Timeout          | `APITimeoutError`          |\n| Network error    | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\n\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict, 429 Rate Limit, >=500 Internal errors, and timeouts will all be retried by default.\n\nYou can use the `max_retries` option to configure or disable this:\n\n```ruby\n# Configure the default for all requests:\ncontext_dev = ContextDev::Client.new(\n  max_retries: 0 # default is 2\n)\n\n# Or, configure per-request:\ncontext_dev.brand.retrieve(domain: "REPLACE_ME", request_options: {max_retries: 5})\n```\n\n### Timeouts\n\nBy default, requests will time out after 60 seconds. You can use the timeout option to configure or disable this:\n\n```ruby\n# Configure the default for all requests:\ncontext_dev = ContextDev::Client.new(\n  timeout: nil # default is 60\n)\n\n# Or, configure per-request:\ncontext_dev.brand.retrieve(domain: "REPLACE_ME", request_options: {timeout: 5})\n```\n\nOn timeout, `ContextDev::Errors::APITimeoutError` is raised.\n\nNote that requests that time out are retried by default.\n\n## Advanced concepts\n\n### BaseModel\n\nAll parameter and response objects inherit from `ContextDev::Internal::Type::BaseModel`, which provides several conveniences, including:\n\n1. All fields, including unknown ones, are accessible with `obj[:prop]` syntax, and can be destructured with `obj => {prop: prop}` or pattern-matching syntax.\n\n2. Structural equivalence for equality; if two API calls return the same values, comparing the responses with == will return true.\n\n3. Both instances and the classes themselves can be pretty-printed.\n\n4. Helpers such as `#to_h`, `#deep_to_h`, `#to_json`, and `#to_yaml`.\n\n### Making custom or undocumented requests\n\n#### Undocumented properties\n\nYou can send undocumented parameters to any endpoint, and read undocumented response properties, like so:\n\nNote: the `extra_` parameters of the same name overrides the documented parameters.\n\n```ruby\nbrand =\n  context_dev.brand.retrieve(\n    domain: "REPLACE_ME",\n    request_options: {\n      extra_query: {my_query_parameter: value},\n      extra_body: {my_body_parameter: value},\n      extra_headers: {"my-header": value}\n    }\n  )\n\nputs(brand[:my_undocumented_property])\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` under the `request_options:` parameter when making a request, as seen in the examples above.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints while retaining the benefit of auth, retries, and so on, you can make requests using `client.request`, like so:\n\n```ruby\nresponse = client.request(\n  method: :post,\n  path: \'/undocumented/endpoint\',\n  query: {"dog": "woof"},\n  headers: {"useful-header": "interesting-value"},\n  body: {"hello": "world"}\n)\n```\n\n### Concurrency & connection pooling\n\nThe `ContextDev::Client` instances are threadsafe, but are only are fork-safe when there are no in-flight HTTP requests.\n\nEach instance of `ContextDev::Client` has its own HTTP connection pool with a default size of 99. As such, we recommend instantiating the client once per application in most settings.\n\nWhen all available connections from the pool are checked out, requests wait for a new connection to become available, with queue time counting towards the request timeout.\n\nUnless otherwise specified, other classes in the SDK do not have locks protecting their underlying data structure.\n\n## Sorbet\n\nThis library provides comprehensive [RBI](https://sorbet.org/docs/rbi) definitions, and has no dependency on sorbet-runtime.\n\nYou can provide typesafe request parameters like so:\n\n```ruby\ncontext_dev.brand.retrieve(domain: "REPLACE_ME")\n```\n\nOr, equivalently:\n\n```ruby\n# Hashes work, but are not typesafe:\ncontext_dev.brand.retrieve(domain: "REPLACE_ME")\n\n# You can also splat a full Params class:\nparams = ContextDev::BrandRetrieveParams.new(domain: "REPLACE_ME")\ncontext_dev.brand.retrieve(**params)\n```\n\n### Enums\n\nSince this library does not depend on `sorbet-runtime`, it cannot provide [`T::Enum`](https://sorbet.org/docs/tenum) instances. Instead, we provide "tagged symbols" instead, which is always a primitive at runtime:\n\n```ruby\n# :true\nputs(ContextDev::WebScreenshotParams::FullScreenshot::TRUE)\n\n# Revealed type: `T.all(ContextDev::WebScreenshotParams::FullScreenshot, Symbol)`\nT.reveal_type(ContextDev::WebScreenshotParams::FullScreenshot::TRUE)\n```\n\nEnum parameters have a "relaxed" type, so you can either pass in enum constants or their literal value:\n\n```ruby\n# Using the enum constants preserves the tagged type information:\ncontext_dev.web.screenshot(\n  full_screenshot: ContextDev::WebScreenshotParams::FullScreenshot::TRUE,\n  # …\n)\n\n# Literal values are also permissible:\ncontext_dev.web.screenshot(\n  full_screenshot: :true,\n  # …\n)\n```\n\n## Versioning\n\nThis package follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions. As the library is in initial development and has a major version of `0`, APIs may change at any time.\n\nThis package considers improvements to the (non-runtime) `*.rbi` and `*.rbs` type definitions to be non-breaking changes.\n\n## Requirements\n\nRuby 3.2.0 or higher.\n\n## Contributing\n\nSee [the contributing documentation](https://github.com/context-dot-dev/context-ruby-sdk/tree/main/CONTRIBUTING.md).\n',
  },
  {
    language: 'typescript',
    content:
      "# Context Dev TypeScript API Library\n\n[![NPM version](https://img.shields.io/npm/v/context.dev.svg?label=npm%20(stable))](https://npmjs.org/package/context.dev) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/context.dev)\n\nThis library provides convenient access to the Context Dev REST API from server-side TypeScript or JavaScript.\n\n\n\nThe REST API documentation can be found on [docs.context.dev](https://docs.context.dev/). The full API of this library can be found in [api.md](api.md).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Context Dev MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=context.dev-mcp&config=eyJuYW1lIjoiY29udGV4dC5kZXYtbWNwIiwidHJhbnNwb3J0IjoiaHR0cCIsInVybCI6Imh0dHBzOi8vY29udGV4dC1kZXYuc3RsbWNwLmNvbSIsImhlYWRlcnMiOnsieC1jb250ZXh0LWRldi1hcGkta2V5IjoiTXkgQVBJIEtleSJ9fQ)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22context.dev-mcp%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fcontext-dev.stlmcp.com%22%2C%22headers%22%3A%7B%22x-context-dev-api-key%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n```sh\nnpm install context.dev\n```\n\n\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n<!-- prettier-ignore -->\n```js\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst brand = await client.brand.retrieve({ domain: 'REPLACE_ME' });\n\nconsole.log(brand.brand);\n```\n\n\n\n### Request & Response types\n\nThis library includes TypeScript definitions for all request params and response fields. You may import and use them like so:\n\n<!-- prettier-ignore -->\n```ts\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst params: ContextDev.BrandRetrieveParams = { domain: 'REPLACE_ME' };\nconst brand: ContextDev.BrandRetrieveResponse = await client.brand.retrieve(params);\n```\n\nDocumentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.\n\n\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API,\nor if the API returns a non-success status code (i.e., 4xx or 5xx response),\na subclass of `APIError` will be thrown:\n\n<!-- prettier-ignore -->\n```ts\nconst brand = await client.brand.retrieve({ domain: 'REPLACE_ME' }).catch(async (err) => {\n  if (err instanceof ContextDev.APIError) {\n    console.log(err.status); // 400\n    console.log(err.name); // BadRequestError\n    console.log(err.headers); // {server: 'nginx', ...}\n  } else {\n    throw err;\n  }\n});\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors will all be retried by default.\n\nYou can use the `maxRetries` option to configure or disable this:\n\n<!-- prettier-ignore -->\n```js\n// Configure the default for all requests:\nconst client = new ContextDev({\n  maxRetries: 0, // default is 2\n});\n\n// Or, configure per-request:\nawait client.brand.retrieve({ domain: 'REPLACE_ME' }, {\n  maxRetries: 5,\n});\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default. You can configure this with a `timeout` option:\n\n<!-- prettier-ignore -->\n```ts\n// Configure the default for all requests:\nconst client = new ContextDev({\n  timeout: 20 * 1000, // 20 seconds (default is 1 minute)\n});\n\n// Override per-request:\nawait client.brand.retrieve({ domain: 'REPLACE_ME' }, {\n  timeout: 5 * 1000,\n});\n```\n\nOn timeout, an `APIConnectionTimeoutError` is thrown.\n\nNote that requests which time out will be [retried twice by default](#retries).\n\n\n\n\n\n## Advanced Usage\n\n### Accessing raw Response data (e.g., headers)\n\nThe \"raw\" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.\nThis method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.\n\nYou can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.\nUnlike `.asResponse()` this method consumes the body, returning once it is parsed.\n\n<!-- prettier-ignore -->\n```ts\nconst client = new ContextDev();\n\nconst response = await client.brand.retrieve({ domain: 'REPLACE_ME' }).asResponse();\nconsole.log(response.headers.get('X-My-Header'));\nconsole.log(response.statusText); // access the underlying Response object\n\nconst { data: brand, response: raw } = await client.brand\n  .retrieve({ domain: 'REPLACE_ME' })\n  .withResponse();\nconsole.log(raw.headers.get('X-My-Header'));\nconsole.log(brand.brand);\n```\n\n### Logging\n\n> [!IMPORTANT]\n> All log messages are intended for debugging only. The format and content of log messages\n> may change between releases.\n\n#### Log levels\n\nThe log level can be configured in two ways:\n\n1. Via the `CONTEXT_DEV_LOG` environment variable\n2. Using the `logLevel` client option (overrides the environment variable if set)\n\n```ts\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  logLevel: 'debug', // Show all log messages\n});\n```\n\nAvailable log levels, from most to least verbose:\n\n- `'debug'` - Show debug messages, info, warnings, and errors\n- `'info'` - Show info messages, warnings, and errors\n- `'warn'` - Show warnings and errors (default)\n- `'error'` - Show only errors\n- `'off'` - Disable all logging\n\nAt the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.\nSome authentication-related headers are redacted, but sensitive data in request and response bodies\nmay still be visible.\n\n#### Custom logger\n\nBy default, this library logs to `globalThis.console`. You can also provide a custom logger.\nMost logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.\n\nWhen providing a custom logger, the `logLevel` option still controls which messages are emitted, messages\nbelow the configured level will not be sent to your logger.\n\n```ts\nimport ContextDev from 'context.dev';\nimport pino from 'pino';\n\nconst logger = pino();\n\nconst client = new ContextDev({\n  logger: logger.child({ name: 'ContextDev' }),\n  logLevel: 'debug', // Send all messages to pino, allowing it to filter\n});\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.\nOptions on the client, such as retries, will be respected when making these requests.\n\n```ts\nawait client.post('/some/path', {\n  body: { some_prop: 'foo' },\n  query: { some_query_arg: 'bar' },\n});\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented\nparameter. This library doesn't validate at runtime that the request matches the type, so any extra values you\nsend will be sent as-is.\n\n```ts\nclient.brand.retrieve({\n  // ...\n  // @ts-expect-error baz is not yet public\n  baz: 'undocumented option',\n});\n```\n\nFor requests with the `GET` verb, any extra params will be in the query, all other requests will send the\nextra param in the body.\n\nIf you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may access the response object with `// @ts-expect-error` on\nthe response object, or cast the response object to the requisite type. Like the request params, we do not\nvalidate or strip extra properties from the response from the API.\n\n### Customizing the fetch client\n\nBy default, this library expects a global `fetch` function is defined.\n\nIf you want to use a different `fetch` function, you can either polyfill the global:\n\n```ts\nimport fetch from 'my-fetch';\n\nglobalThis.fetch = fetch;\n```\n\nOr pass it to the client:\n\n```ts\nimport ContextDev from 'context.dev';\nimport fetch from 'my-fetch';\n\nconst client = new ContextDev({ fetch });\n```\n\n### Fetch options\n\nIf you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)\n\n```ts\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  fetchOptions: {\n    // `RequestInit` options\n  },\n});\n```\n\n#### Configuring proxies\n\nTo modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy\noptions to requests:\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg\" align=\"top\" width=\"18\" height=\"21\"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>\n\n```ts\nimport ContextDev from 'context.dev';\nimport * as undici from 'undici';\n\nconst proxyAgent = new undici.ProxyAgent('http://localhost:8888');\nconst client = new ContextDev({\n  fetchOptions: {\n    dispatcher: proxyAgent,\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg\" align=\"top\" width=\"18\" height=\"21\"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>\n\n```ts\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  fetchOptions: {\n    proxy: 'http://localhost:8888',\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg\" align=\"top\" width=\"18\" height=\"21\"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>\n\n```ts\nimport ContextDev from 'npm:context.dev';\n\nconst httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });\nconst client = new ContextDev({\n  fetchOptions: {\n    client: httpClient,\n  },\n});\n```\n\n## Frequently Asked Questions\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/context-dot-dev/context-typescript-sdk/issues) with questions, bugs, or suggestions.\n\n## Requirements\n\nTypeScript >= 4.9 is supported.\n\nThe following runtimes are supported:\n\n- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)\n- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.\n- Deno v1.28.0 or higher.\n- Bun 1.0 or later.\n- Cloudflare Workers.\n- Vercel Edge Runtime.\n- Jest 28 or greater with the `\"node\"` environment (`\"jsdom\"` is not supported at this time).\n- Nitro v2.6 or greater.\n\nNote that React Native is not supported at this time.\n\nIf you are interested in other runtime environments, please open or upvote an issue on GitHub.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n",
  },
];

const INDEX_OPTIONS = {
  fields: [
    'name',
    'endpoint',
    'summary',
    'description',
    'qualified',
    'stainlessPath',
    'content',
    'sectionContext',
  ],
  storeFields: ['kind', '_original'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.1,
    boost: {
      name: 5,
      stainlessPath: 3,
      endpoint: 3,
      qualified: 3,
      summary: 2,
      content: 1,
      description: 1,
    } as Record<string, number>,
  },
};

/**
 * Self-contained local search engine backed by MiniSearch.
 * Method data is embedded at SDK build time; prose documents
 * can be loaded from an optional docs directory at runtime.
 */
export class LocalDocsSearch {
  private methodIndex: MiniSearch<MiniSearchDocument>;
  private proseIndex: MiniSearch<MiniSearchDocument>;

  private constructor() {
    this.methodIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
    this.proseIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
  }

  static async create(opts?: { docsDir?: string }): Promise<LocalDocsSearch> {
    const instance = new LocalDocsSearch();
    instance.indexMethods(EMBEDDED_METHODS);
    for (const readme of EMBEDDED_READMES) {
      instance.indexProse(readme.content, `readme:${readme.language}`);
    }
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, language = 'typescript', detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score.
    // Filter prose hits so language-tagged content (READMEs and docs with
    // frontmatter) only matches the requested language.
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex
      .search(query)
      .filter((hit) => {
        const source = ((hit as Record<string, unknown>)['_original'] as ProseChunk | undefined)?.source;
        if (!source) return true;
        // Check for language-tagged sources: "readme:<lang>" or "lang:<lang>:<filename>"
        let taggedLang: string | undefined;
        if (source.startsWith('readme:')) taggedLang = source.slice('readme:'.length);
        else if (source.startsWith('lang:')) taggedLang = source.split(':')[1];
        if (!taggedLang) return true;
        return taggedLang === language || (language === 'javascript' && taggedLang === 'typescript');
      })
      .map((hit) => ({ ...hit, _kind: 'prose' as const }));
    const merged = [...methodHits, ...proseHits].sort((a, b) => b.score - a.score);
    const top = merged.slice(0, maxResults);

    const fullResults: (string | Record<string, unknown>)[] = [];

    for (const hit of top) {
      const original = (hit as Record<string, unknown>)['_original'];
      if (hit._kind === 'http_method') {
        const m = original as MethodEntry;
        if (useMarkdown && m.markdown) {
          fullResults.push(m.markdown);
        } else {
          // Use per-language data when available, falling back to the
          // top-level fields (which are TypeScript-specific in the
          // legacy codepath).
          const langData = m.perLanguage?.[language];
          fullResults.push({
            method: langData?.method ?? m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
            ...(langData?.example ? { example: langData.example } : {}),
            ...(m.params ? { params: m.params } : {}),
            ...(m.response ? { response: m.response } : {}),
          });
        }
      } else {
        const c = original as ProseChunk;
        fullResults.push({
          content: c.content,
          ...(c.source ? { source: c.source } : {}),
        });
      }
    }

    let totalLength = 0;
    const results: (string | Record<string, unknown>)[] = [];
    for (const result of fullResults) {
      const len = typeof result === 'string' ? result.length : JSON.stringify(result).length;
      totalLength += len;
      if (totalLength > maxLength) break;
      results.push(result);
    }

    if (results.length < fullResults.length) {
      results.unshift(`Truncated; showing ${results.length} of ${fullResults.length} results.`);
    }

    return { results };
  }

  private indexMethods(methods: MethodEntry[]): void {
    const docs: MiniSearchDocument[] = methods.map((m, i) => ({
      id: `method-${i}`,
      kind: 'http_method' as const,
      name: m.name,
      endpoint: m.endpoint,
      summary: m.summary,
      description: m.description,
      qualified: m.qualified,
      stainlessPath: m.stainlessPath,
      _original: m as unknown as Record<string, unknown>,
    }));
    if (docs.length > 0) {
      this.methodIndex.addAll(docs);
    }
  }

  private async loadDocsDirectory(docsDir: string): Promise<void> {
    let entries;
    try {
      entries = await fs.readdir(docsDir, { withFileTypes: true });
    } catch (err) {
      getLogger().warn({ err, docsDir }, 'Could not read docs directory');
      return;
    }

    const files = entries
      .filter((e) => e.isFile())
      .filter((e) => e.name.endsWith('.md') || e.name.endsWith('.markdown') || e.name.endsWith('.json'));

    for (const file of files) {
      try {
        const filePath = path.join(docsDir, file.name);
        const content = await fs.readFile(filePath, 'utf-8');

        if (file.name.endsWith('.json')) {
          const texts = extractTexts(JSON.parse(content));
          if (texts.length > 0) {
            this.indexProse(texts.join('\n\n'), file.name);
          }
        } else {
          // Parse optional YAML frontmatter for language tagging.
          // Files with a "language" field in frontmatter will only
          // surface in searches for that language.
          //
          // Example:
          //   ---
          //   language: python
          //   ---
          //   # Error handling in Python
          //   ...
          const frontmatter = parseFrontmatter(content);
          const source = frontmatter.language ? `lang:${frontmatter.language}:${file.name}` : file.name;
          this.indexProse(content, source);
        }
      } catch (err) {
        getLogger().warn({ err, file: file.name }, 'Failed to index docs file');
      }
    }
  }

  private indexProse(markdown: string, source: string): void {
    const chunks = chunkMarkdown(markdown);
    const baseId = this.proseIndex.documentCount;

    const docs: MiniSearchDocument[] = chunks.map((chunk, i) => ({
      id: `prose-${baseId + i}`,
      kind: 'prose' as const,
      content: chunk.content,
      ...(chunk.sectionContext != null ? { sectionContext: chunk.sectionContext } : {}),
      _original: { ...chunk, source } as unknown as Record<string, unknown>,
    }));

    if (docs.length > 0) {
      this.proseIndex.addAll(docs);
    }
  }
}

/** Lightweight markdown chunker — splits on headers, chunks by word count. */
function chunkMarkdown(markdown: string): { content: string; tag: string; sectionContext?: string }[] {
  // Strip YAML frontmatter
  const stripped = markdown.replace(/^---\n[\s\S]*?\n---\n?/, '');
  const lines = stripped.split('\n');

  const chunks: { content: string; tag: string; sectionContext?: string }[] = [];
  const headers: string[] = [];
  let current: string[] = [];

  const flush = () => {
    const text = current.join('\n').trim();
    if (!text) return;
    const sectionContext = headers.length > 0 ? headers.join(' > ') : undefined;
    // Split into ~200-word chunks
    const words = text.split(/\s+/);
    for (let i = 0; i < words.length; i += 200) {
      const slice = words.slice(i, i + 200).join(' ');
      if (slice) {
        chunks.push({ content: slice, tag: 'p', ...(sectionContext != null ? { sectionContext } : {}) });
      }
    }
    current = [];
  };

  for (const line of lines) {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headerMatch) {
      flush();
      const level = headerMatch[1]!.length;
      const text = headerMatch[2]!.trim();
      while (headers.length >= level) headers.pop();
      headers.push(text);
    } else {
      current.push(line);
    }
  }
  flush();

  return chunks;
}

/** Recursively extracts string values from a JSON structure. */
function extractTexts(data: unknown, depth = 0): string[] {
  if (depth > 10) return [];
  if (typeof data === 'string') return data.trim() ? [data] : [];
  if (Array.isArray(data)) return data.flatMap((item) => extractTexts(item, depth + 1));
  if (typeof data === 'object' && data !== null) {
    return Object.values(data).flatMap((v) => extractTexts(v, depth + 1));
  }
  return [];
}

/** Parses YAML frontmatter from a markdown string, extracting the language field if present. */
function parseFrontmatter(markdown: string): { language?: string } {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const body = match[1] ?? '';
  const langMatch = body.match(/^language:\s*(.+)$/m);
  return langMatch ? { language: langMatch[1]!.trim() } : {};
}
