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
    summary: 'Scrape raw HTML from a URL',
    description: 'Scrapes the given URL and returns the raw HTML content of the page.',
    stainlessPath: '(resource) web > (method) web_scrape_html',
    qualified: 'client.web.webScrapeHTML',
    params: ['url: string;', 'maxAgeMs?: number;'],
    response: '{ html: string; success: true; url: string; }',
    markdown:
      "## web_scrape_html\n\n`client.web.webScrapeHTML(url: string, maxAgeMs?: number): { html: string; success: true; url: string; }`\n\n**get** `/web/scrape/html`\n\nScrapes the given URL and returns the raw HTML content of the page.\n\n### Parameters\n\n- `url: string`\n  Full URL to scrape (must include http:// or https:// protocol)\n\n- `maxAgeMs?: number`\n  Return a cached result if a prior scrape for the same parameters exists and is younger than this many milliseconds. Defaults to 1 day (86400000 ms) when omitted. Set to 0 to always scrape fresh.\n\n### Returns\n\n- `{ html: string; success: true; url: string; }`\n\n  - `html: string`\n  - `success: true`\n  - `url: string`\n\n### Example\n\n```typescript\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev();\n\nconst response = await client.web.webScrapeHTML({ url: 'https://example.com' });\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.context.dev/v1/web/scrape/html \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY"',
      },
      python: {
        method: 'web.web_scrape_html',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.web.web_scrape_html(\n    url="https://example.com",\n)\nprint(response.html)',
      },
      ruby: {
        method: 'web.web_scrape_html',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nresponse = context_dev.web.web_scrape_html(url: "https://example.com")\n\nputs(response)',
      },
      typescript: {
        method: 'client.web.webScrapeHTML',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.web.webScrapeHTML({ url: 'https://example.com' });\n\nconsole.log(response.html);",
      },
    },
  },
  {
    name: 'web_scrape_md',
    endpoint: '/web/scrape/markdown',
    httpMethod: 'get',
    summary: 'Scrape URL and convert to Markdown',
    description: 'Scrapes the given URL, converts the HTML content to Markdown, and returns the result.',
    stainlessPath: '(resource) web > (method) web_scrape_md',
    qualified: 'client.web.webScrapeMd',
    params: [
      'url: string;',
      'includeImages?: boolean;',
      'includeLinks?: boolean;',
      'maxAgeMs?: number;',
      'shortenBase64Images?: boolean;',
      'useMainContentOnly?: boolean;',
    ],
    response: '{ markdown: string; success: true; url: string; }',
    markdown:
      "## web_scrape_md\n\n`client.web.webScrapeMd(url: string, includeImages?: boolean, includeLinks?: boolean, maxAgeMs?: number, shortenBase64Images?: boolean, useMainContentOnly?: boolean): { markdown: string; success: true; url: string; }`\n\n**get** `/web/scrape/markdown`\n\nScrapes the given URL, converts the HTML content to Markdown, and returns the result.\n\n### Parameters\n\n- `url: string`\n  Full URL to scrape and convert to markdown (must include http:// or https:// protocol)\n\n- `includeImages?: boolean`\n  Include image references in Markdown output\n\n- `includeLinks?: boolean`\n  Preserve hyperlinks in Markdown output\n\n- `maxAgeMs?: number`\n  Return a cached result if a prior scrape for the same parameters exists and is younger than this many milliseconds. Defaults to 1 day (86400000 ms) when omitted. Set to 0 to always scrape fresh.\n\n- `shortenBase64Images?: boolean`\n  Shorten base64-encoded image data in the Markdown output\n\n- `useMainContentOnly?: boolean`\n  Extract only the main content of the page, excluding headers, footers, sidebars, and navigation\n\n### Returns\n\n- `{ markdown: string; success: true; url: string; }`\n\n  - `markdown: string`\n  - `success: true`\n  - `url: string`\n\n### Example\n\n```typescript\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev();\n\nconst response = await client.web.webScrapeMd({ url: 'https://example.com' });\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.context.dev/v1/web/scrape/markdown \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY"',
      },
      python: {
        method: 'web.web_scrape_md',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.web.web_scrape_md(\n    url="https://example.com",\n)\nprint(response.markdown)',
      },
      ruby: {
        method: 'web.web_scrape_md',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nresponse = context_dev.web.web_scrape_md(url: "https://example.com")\n\nputs(response)',
      },
      typescript: {
        method: 'client.web.webScrapeMd',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.web.webScrapeMd({ url: 'https://example.com' });\n\nconsole.log(response.markdown);",
      },
    },
  },
  {
    name: 'web_scrape_images',
    endpoint: '/web/scrape/images',
    httpMethod: 'get',
    summary: 'Scrape images from a URL',
    description:
      'Scrapes all images from the given URL. Extracts images from img, svg, picture/source, link, and video elements including inline SVGs, base64 data URIs, and standard URLs.',
    stainlessPath: '(resource) web > (method) web_scrape_images',
    qualified: 'client.web.webScrapeImages',
    params: ['url: string;'],
    response:
      "{ images: { alt: string; element: 'img' | 'svg' | 'link' | 'source' | 'video' | 'css' | 'object' | 'meta' | 'background'; src: string; type: 'url' | 'html' | 'base64'; }[]; success: true; url: string; }",
    markdown:
      "## web_scrape_images\n\n`client.web.webScrapeImages(url: string): { images: object[]; success: true; url: string; }`\n\n**get** `/web/scrape/images`\n\nScrapes all images from the given URL. Extracts images from img, svg, picture/source, link, and video elements including inline SVGs, base64 data URIs, and standard URLs.\n\n### Parameters\n\n- `url: string`\n  Full URL to scrape images from (must include http:// or https:// protocol)\n\n### Returns\n\n- `{ images: { alt: string; element: 'img' | 'svg' | 'link' | 'source' | 'video' | 'css' | 'object' | 'meta' | 'background'; src: string; type: 'url' | 'html' | 'base64'; }[]; success: true; url: string; }`\n\n  - `images: { alt: string; element: 'img' | 'svg' | 'link' | 'source' | 'video' | 'css' | 'object' | 'meta' | 'background'; src: string; type: 'url' | 'html' | 'base64'; }[]`\n  - `success: true`\n  - `url: string`\n\n### Example\n\n```typescript\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev();\n\nconst response = await client.web.webScrapeImages({ url: 'https://example.com' });\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.context.dev/v1/web/scrape/images \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY"',
      },
      python: {
        method: 'web.web_scrape_images',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.web.web_scrape_images(\n    url="https://example.com",\n)\nprint(response.images)',
      },
      ruby: {
        method: 'web.web_scrape_images',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nresponse = context_dev.web.web_scrape_images(url: "https://example.com")\n\nputs(response)',
      },
      typescript: {
        method: 'client.web.webScrapeImages',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.web.webScrapeImages({ url: 'https://example.com' });\n\nconsole.log(response.images);",
      },
    },
  },
  {
    name: 'web_scrape_sitemap',
    endpoint: '/web/scrape/sitemap',
    httpMethod: 'get',
    summary: 'Crawl website sitemap',
    description:
      'Crawls the sitemap of the given domain and returns all discovered page URLs. Supports sitemap index files (recursive), parallel fetching with concurrency control, deduplication, and filters out non-page resources (images, PDFs, etc.).',
    stainlessPath: '(resource) web > (method) web_scrape_sitemap',
    qualified: 'client.web.webScrapeSitemap',
    params: ['domain: string;', 'maxLinks?: number;'],
    response:
      '{ domain: string; meta: { errors: number; sitemapsDiscovered: number; sitemapsFetched: number; sitemapsSkipped: number; }; success: true; urls: string[]; }',
    markdown:
      "## web_scrape_sitemap\n\n`client.web.webScrapeSitemap(domain: string, maxLinks?: number): { domain: string; meta: object; success: true; urls: string[]; }`\n\n**get** `/web/scrape/sitemap`\n\nCrawls the sitemap of the given domain and returns all discovered page URLs. Supports sitemap index files (recursive), parallel fetching with concurrency control, deduplication, and filters out non-page resources (images, PDFs, etc.).\n\n### Parameters\n\n- `domain: string`\n  Domain name to crawl sitemaps for (e.g., 'example.com'). The domain will be automatically normalized and validated.\n\n- `maxLinks?: number`\n  Maximum number of links to return from the sitemap crawl. Defaults to 10,000. Minimum is 1, maximum is 100,000.\n\n### Returns\n\n- `{ domain: string; meta: { errors: number; sitemapsDiscovered: number; sitemapsFetched: number; sitemapsSkipped: number; }; success: true; urls: string[]; }`\n\n  - `domain: string`\n  - `meta: { errors: number; sitemapsDiscovered: number; sitemapsFetched: number; sitemapsSkipped: number; }`\n  - `success: true`\n  - `urls: string[]`\n\n### Example\n\n```typescript\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev();\n\nconst response = await client.web.webScrapeSitemap({ domain: 'domain' });\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.context.dev/v1/web/scrape/sitemap \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY"',
      },
      python: {
        method: 'web.web_scrape_sitemap',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.web.web_scrape_sitemap(\n    domain="domain",\n)\nprint(response.domain)',
      },
      ruby: {
        method: 'web.web_scrape_sitemap',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nresponse = context_dev.web.web_scrape_sitemap(domain: "domain")\n\nputs(response)',
      },
      typescript: {
        method: 'client.web.webScrapeSitemap',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.web.webScrapeSitemap({ domain: 'domain' });\n\nconsole.log(response.domain);",
      },
    },
  },
  {
    name: 'screenshot',
    endpoint: '/brand/screenshot',
    httpMethod: 'get',
    summary: 'Take screenshot of website',
    description:
      "Capture a screenshot of a website. Supports both viewport (standard browser view) and full-page screenshots. Can also screenshot specific page types (login, pricing, etc.) by using heuristics to find the appropriate URL. Either 'domain' or 'directUrl' must be provided as a query parameter, but not both. Returns a URL to the uploaded screenshot image hosted on our CDN.",
    stainlessPath: '(resource) web > (method) screenshot',
    qualified: 'client.web.screenshot',
    params: [
      'directUrl?: string;',
      'domain?: string;',
      "fullScreenshot?: 'true' | 'false';",
      "page?: 'login' | 'signup' | 'blog' | 'careers' | 'pricing' | 'terms' | 'privacy' | 'contact';",
      "prioritize?: 'speed' | 'quality';",
    ],
    response:
      "{ code?: number; domain?: string; screenshot?: string; screenshotType?: 'viewport' | 'fullPage'; status?: string; }",
    markdown:
      "## screenshot\n\n`client.web.screenshot(directUrl?: string, domain?: string, fullScreenshot?: 'true' | 'false', page?: 'login' | 'signup' | 'blog' | 'careers' | 'pricing' | 'terms' | 'privacy' | 'contact', prioritize?: 'speed' | 'quality'): { code?: number; domain?: string; screenshot?: string; screenshotType?: 'viewport' | 'fullPage'; status?: string; }`\n\n**get** `/brand/screenshot`\n\nCapture a screenshot of a website. Supports both viewport (standard browser view) and full-page screenshots. Can also screenshot specific page types (login, pricing, etc.) by using heuristics to find the appropriate URL. Either 'domain' or 'directUrl' must be provided as a query parameter, but not both. Returns a URL to the uploaded screenshot image hosted on our CDN.\n\n### Parameters\n\n- `directUrl?: string`\n  A specific URL to screenshot directly, bypassing domain resolution (e.g., 'https://example.com/pricing'). When provided, the screenshot is taken of this exact URL.\n\n- `domain?: string`\n  Domain name to take screenshot of (e.g., 'example.com', 'google.com'). The domain will be automatically normalized and validated.\n\n- `fullScreenshot?: 'true' | 'false'`\n  Optional parameter to determine screenshot type. If 'true', takes a full page screenshot capturing all content. If 'false' or not provided, takes a viewport screenshot (standard browser view).\n\n- `page?: 'login' | 'signup' | 'blog' | 'careers' | 'pricing' | 'terms' | 'privacy' | 'contact'`\n  Optional parameter to specify which page type to screenshot. If provided, the system will scrape the domain's links and use heuristics to find the most appropriate URL for the specified page type (30 supported languages). If not provided, screenshots the main domain landing page. Only applicable when using 'domain', not 'directUrl'.\n\n- `prioritize?: 'speed' | 'quality'`\n  Optional parameter to prioritize screenshot capture. If 'speed', optimizes for faster capture with basic quality. If 'quality', optimizes for higher quality with longer wait times. Defaults to 'quality' if not provided.\n\n### Returns\n\n- `{ code?: number; domain?: string; screenshot?: string; screenshotType?: 'viewport' | 'fullPage'; status?: string; }`\n\n  - `code?: number`\n  - `domain?: string`\n  - `screenshot?: string`\n  - `screenshotType?: 'viewport' | 'fullPage'`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev();\n\nconst response = await client.web.screenshot();\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.context.dev/v1/brand/screenshot \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY"',
      },
      python: {
        method: 'web.screenshot',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.web.screenshot()\nprint(response.code)',
      },
      ruby: {
        method: 'web.screenshot',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nresponse = context_dev.web.screenshot\n\nputs(response)',
      },
      typescript: {
        method: 'client.web.screenshot',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.web.screenshot();\n\nconsole.log(response.code);",
      },
    },
  },
  {
    name: 'web_crawl_md',
    endpoint: '/web/crawl',
    httpMethod: 'post',
    summary: 'Crawl website and extract Markdown',
    description:
      'Performs a crawl starting from a given URL, extracts page content as Markdown, and returns results for all crawled pages. Only follows links within the same domain as the starting URL. Costs 1 credit per successful page crawled.',
    stainlessPath: '(resource) web > (method) web_crawl_md',
    qualified: 'client.web.webCrawlMd',
    params: [
      'url: string;',
      'followSubdomains?: boolean;',
      'includeImages?: boolean;',
      'includeLinks?: boolean;',
      'maxDepth?: number;',
      'maxPages?: number;',
      'shortenBase64Images?: boolean;',
      'urlRegex?: string;',
      'useMainContentOnly?: boolean;',
    ],
    response:
      '{ metadata: { maxCrawlDepth: number; numFailed: number; numSucceeded: number; numUrls: number; }; results: { markdown: string; metadata: { crawlDepth: number; statusCode: number; success: boolean; title: string; url: string; }; }[]; }',
    markdown:
      "## web_crawl_md\n\n`client.web.webCrawlMd(url: string, followSubdomains?: boolean, includeImages?: boolean, includeLinks?: boolean, maxDepth?: number, maxPages?: number, shortenBase64Images?: boolean, urlRegex?: string, useMainContentOnly?: boolean): { metadata: object; results: object[]; }`\n\n**post** `/web/crawl`\n\nPerforms a crawl starting from a given URL, extracts page content as Markdown, and returns results for all crawled pages. Only follows links within the same domain as the starting URL. Costs 1 credit per successful page crawled.\n\n### Parameters\n\n- `url: string`\n  The starting URL for the crawl (must include http:// or https:// protocol)\n\n- `followSubdomains?: boolean`\n  When true, follow links on subdomains of the starting URL's domain (e.g. docs.example.com when starting from example.com). www and apex are always treated as equivalent.\n\n- `includeImages?: boolean`\n  Include image references in the Markdown output\n\n- `includeLinks?: boolean`\n  Preserve hyperlinks in the Markdown output\n\n- `maxDepth?: number`\n  Maximum link depth from the starting URL (0 = only the starting page)\n\n- `maxPages?: number`\n  Maximum number of pages to crawl. Hard cap: 500.\n\n- `shortenBase64Images?: boolean`\n  Truncate base64-encoded image data in the Markdown output\n\n- `urlRegex?: string`\n  Regex pattern. Only URLs matching this pattern will be followed and scraped.\n\n- `useMainContentOnly?: boolean`\n  Extract only the main content, stripping headers, footers, sidebars, and navigation\n\n### Returns\n\n- `{ metadata: { maxCrawlDepth: number; numFailed: number; numSucceeded: number; numUrls: number; }; results: { markdown: string; metadata: { crawlDepth: number; statusCode: number; success: boolean; title: string; url: string; }; }[]; }`\n\n  - `metadata: { maxCrawlDepth: number; numFailed: number; numSucceeded: number; numUrls: number; }`\n  - `results: { markdown: string; metadata: { crawlDepth: number; statusCode: number; success: boolean; title: string; url: string; }; }[]`\n\n### Example\n\n```typescript\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev();\n\nconst response = await client.web.webCrawlMd({ url: 'https://example.com' });\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.context.dev/v1/web/crawl \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY" \\\n    -d \'{\n          "url": "https://example.com"\n        }\'',
      },
      python: {
        method: 'web.web_crawl_md',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.web.web_crawl_md(\n    url="https://example.com",\n)\nprint(response.metadata)',
      },
      ruby: {
        method: 'web.web_crawl_md',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nresponse = context_dev.web.web_crawl_md(url: "https://example.com")\n\nputs(response)',
      },
      typescript: {
        method: 'client.web.webCrawlMd',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.web.webCrawlMd({ url: 'https://example.com' });\n\nconsole.log(response.metadata);",
      },
    },
  },
  {
    name: 'extract_products',
    endpoint: '/brand/ai/products',
    httpMethod: 'post',
    summary: "Extract products from a brand's website",
    description:
      "Beta feature: Extract product information from a brand's website. We will analyze the website and return a list of products with details such as name, description, image, pricing, features, and more.",
    stainlessPath: '(resource) ai > (method) extract_products',
    qualified: 'client.ai.extractProducts',
    params: [
      '{ domain: string; maxProducts?: number; timeoutMS?: number; } | { directUrl: string; maxProducts?: number; timeoutMS?: number; };',
    ],
    response:
      "{ products?: { description: string; features: string[]; images: string[]; name: string; tags: string[]; target_audience: string[]; billing_frequency?: 'monthly' | 'yearly' | 'one_time' | 'usage_based'; category?: string; currency?: string; image_url?: string; price?: number; pricing_model?: 'per_seat' | 'flat' | 'tiered' | 'freemium' | 'custom'; url?: string; }[]; }",
    perLanguage: {
      http: {
        example:
          'curl https://api.context.dev/v1/brand/ai/products \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY" \\\n    -d \'{\n          "domain": "domain"\n        }\'',
      },
      python: {
        method: 'ai.extract_products',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.ai.extract_products(\n    domain="domain",\n)\nprint(response.products)',
      },
      ruby: {
        method: 'ai.extract_products',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nresponse = context_dev.ai.extract_products(body: {domain: "domain"})\n\nputs(response)',
      },
      typescript: {
        method: 'client.ai.extractProducts',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.ai.extractProducts({ domain: 'domain' });\n\nconsole.log(response.products);",
      },
    },
  },
  {
    name: 'extract_product',
    endpoint: '/brand/ai/product',
    httpMethod: 'post',
    summary: 'Extract a single product from a URL',
    description:
      'Beta feature: Given a single URL, determines if it is a product detail page, classifies the platform/product type, and extracts the product information. Supports Amazon, TikTok Shop, Etsy, and generic ecommerce sites.',
    stainlessPath: '(resource) ai > (method) extract_product',
    qualified: 'client.ai.extractProduct',
    params: ['url: string;', 'timeoutMS?: number;'],
    response:
      "{ is_product_page?: boolean; platform?: 'amazon' | 'tiktok_shop' | 'etsy' | 'generic'; product?: { description: string; features: string[]; images: string[]; name: string; tags: string[]; target_audience: string[]; billing_frequency?: 'monthly' | 'yearly' | 'one_time' | 'usage_based'; category?: string; currency?: string; image_url?: string; price?: number; pricing_model?: 'per_seat' | 'flat' | 'tiered' | 'freemium' | 'custom'; url?: string; }; }",
    markdown:
      "## extract_product\n\n`client.ai.extractProduct(url: string, timeoutMS?: number): { is_product_page?: boolean; platform?: 'amazon' | 'tiktok_shop' | 'etsy' | 'generic'; product?: object; }`\n\n**post** `/brand/ai/product`\n\nBeta feature: Given a single URL, determines if it is a product detail page, classifies the platform/product type, and extracts the product information. Supports Amazon, TikTok Shop, Etsy, and generic ecommerce sites.\n\n### Parameters\n\n- `url: string`\n  The product page URL to extract product data from.\n\n- `timeoutMS?: number`\n  Optional timeout in milliseconds for the request. Maximum allowed value is 300000ms (5 minutes).\n\n### Returns\n\n- `{ is_product_page?: boolean; platform?: 'amazon' | 'tiktok_shop' | 'etsy' | 'generic'; product?: { description: string; features: string[]; images: string[]; name: string; tags: string[]; target_audience: string[]; billing_frequency?: 'monthly' | 'yearly' | 'one_time' | 'usage_based'; category?: string; currency?: string; image_url?: string; price?: number; pricing_model?: 'per_seat' | 'flat' | 'tiered' | 'freemium' | 'custom'; url?: string; }; }`\n\n  - `is_product_page?: boolean`\n  - `platform?: 'amazon' | 'tiktok_shop' | 'etsy' | 'generic'`\n  - `product?: { description: string; features: string[]; images: string[]; name: string; tags: string[]; target_audience: string[]; billing_frequency?: 'monthly' | 'yearly' | 'one_time' | 'usage_based'; category?: string; currency?: string; image_url?: string; price?: number; pricing_model?: 'per_seat' | 'flat' | 'tiered' | 'freemium' | 'custom'; url?: string; }`\n\n### Example\n\n```typescript\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev();\n\nconst response = await client.ai.extractProduct({ url: 'https://example.com' });\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.context.dev/v1/brand/ai/product \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY" \\\n    -d \'{\n          "url": "https://example.com"\n        }\'',
      },
      python: {
        method: 'ai.extract_product',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.ai.extract_product(\n    url="https://example.com",\n)\nprint(response.is_product_page)',
      },
      ruby: {
        method: 'ai.extract_product',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nresponse = context_dev.ai.extract_product(url: "https://example.com")\n\nputs(response)',
      },
      typescript: {
        method: 'client.ai.extractProduct',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.ai.extractProduct({ url: 'https://example.com' });\n\nconsole.log(response.is_product_page);",
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
      '{ data_extracted?: { datapoint_name?: string; datapoint_value?: string | number | boolean | string[] | number[] | object[]; }[]; domain?: string; status?: string; urls_analyzed?: string[]; }',
    markdown:
      "## ai_query\n\n`client.ai.aiQuery(data_to_extract: { datapoint_description: string; datapoint_example: string; datapoint_name: string; datapoint_type: 'text' | 'number' | 'date' | 'boolean' | 'list' | 'url'; datapoint_list_type?: 'string' | 'text' | 'number' | 'date' | 'boolean' | 'list' | 'url' | 'object'; datapoint_object_schema?: object; }[], domain: string, specific_pages?: { about_us?: boolean; blog?: boolean; careers?: boolean; contact_us?: boolean; faq?: boolean; home_page?: boolean; pricing?: boolean; privacy_policy?: boolean; terms_and_conditions?: boolean; }, timeoutMS?: number): { data_extracted?: object[]; domain?: string; status?: string; urls_analyzed?: string[]; }`\n\n**post** `/brand/ai/query`\n\nUse AI to extract specific data points from a brand's website. The AI will crawl the website and extract the requested information based on the provided data points.\n\n### Parameters\n\n- `data_to_extract: { datapoint_description: string; datapoint_example: string; datapoint_name: string; datapoint_type: 'text' | 'number' | 'date' | 'boolean' | 'list' | 'url'; datapoint_list_type?: 'string' | 'text' | 'number' | 'date' | 'boolean' | 'list' | 'url' | 'object'; datapoint_object_schema?: object; }[]`\n  Array of data points to extract from the website\n\n- `domain: string`\n  The domain name to analyze\n\n- `specific_pages?: { about_us?: boolean; blog?: boolean; careers?: boolean; contact_us?: boolean; faq?: boolean; home_page?: boolean; pricing?: boolean; privacy_policy?: boolean; terms_and_conditions?: boolean; }`\n  Optional object specifying which pages to analyze\n  - `about_us?: boolean`\n    Whether to analyze the about us page\n  - `blog?: boolean`\n    Whether to analyze the blog\n  - `careers?: boolean`\n    Whether to analyze the careers page\n  - `contact_us?: boolean`\n    Whether to analyze the contact us page\n  - `faq?: boolean`\n    Whether to analyze the FAQ page\n  - `home_page?: boolean`\n    Whether to analyze the home page\n  - `pricing?: boolean`\n    Whether to analyze the pricing page\n  - `privacy_policy?: boolean`\n    Whether to analyze the privacy policy page\n  - `terms_and_conditions?: boolean`\n    Whether to analyze the terms and conditions page\n\n- `timeoutMS?: number`\n  Optional timeout in milliseconds for the request. If the request takes longer than this value, it will be aborted with a 408 status code. Maximum allowed value is 300000ms (5 minutes).\n\n### Returns\n\n- `{ data_extracted?: { datapoint_name?: string; datapoint_value?: string | number | boolean | string[] | number[] | object[]; }[]; domain?: string; status?: string; urls_analyzed?: string[]; }`\n\n  - `data_extracted?: { datapoint_name?: string; datapoint_value?: string | number | boolean | string[] | number[] | object[]; }[]`\n  - `domain?: string`\n  - `status?: string`\n  - `urls_analyzed?: string[]`\n\n### Example\n\n```typescript\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev();\n\nconst response = await client.ai.aiQuery({ data_to_extract: [{\n  datapoint_description: 'datapoint_description',\n  datapoint_example: 'datapoint_example',\n  datapoint_name: 'datapoint_name',\n  datapoint_type: 'text',\n}], domain: 'domain' });\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.context.dev/v1/brand/ai/query \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY" \\\n    -d \'{\n          "data_to_extract": [\n            {\n              "datapoint_description": "datapoint_description",\n              "datapoint_example": "datapoint_example",\n              "datapoint_name": "datapoint_name",\n              "datapoint_type": "text"\n            }\n          ],\n          "domain": "domain"\n        }\'',
      },
      python: {
        method: 'ai.ai_query',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.ai.ai_query(\n    data_to_extract=[{\n        "datapoint_description": "datapoint_description",\n        "datapoint_example": "datapoint_example",\n        "datapoint_name": "datapoint_name",\n        "datapoint_type": "text",\n    }],\n    domain="domain",\n)\nprint(response.data_extracted)',
      },
      ruby: {
        method: 'ai.ai_query',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nresponse = context_dev.ai.ai_query(\n  data_to_extract: [\n    {\n      datapoint_description: "datapoint_description",\n      datapoint_example: "datapoint_example",\n      datapoint_name: "datapoint_name",\n      datapoint_type: :text\n    }\n  ],\n  domain: "domain"\n)\n\nputs(response)',
      },
      typescript: {
        method: 'client.ai.aiQuery',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.ai.aiQuery({\n  data_to_extract: [\n    {\n      datapoint_description: 'datapoint_description',\n      datapoint_example: 'datapoint_example',\n      datapoint_name: 'datapoint_name',\n      datapoint_type: 'text',\n    },\n  ],\n  domain: 'domain',\n});\n\nconsole.log(response.data_extracted);",
      },
    },
  },
  {
    name: 'extract_styleguide',
    endpoint: '/brand/styleguide',
    httpMethod: 'get',
    summary: 'Extract design system and styleguide from website',
    description:
      "Automatically extract comprehensive design system information from a brand's website including colors, typography, spacing, shadows, and UI components. Either 'domain' or 'directUrl' must be provided as a query parameter, but not both.",
    stainlessPath: '(resource) style > (method) extract_styleguide',
    qualified: 'client.style.extractStyleguide',
    params: ['directUrl?: string;', 'domain?: string;', 'timeoutMS?: number;'],
    response:
      "{ code?: number; domain?: string; status?: string; styleguide?: { colors: { accent: string; background: string; text: string; }; components: { button: object; card?: object; }; elementSpacing: { lg: string; md: string; sm: string; xl: string; xs: string; }; fontLinks: object; mode: 'light' | 'dark'; shadows: { inner: string; lg: string; md: string; sm: string; xl: string; }; typography: { headings: object; p?: object; }; }; }",
    markdown:
      "## extract_styleguide\n\n`client.style.extractStyleguide(directUrl?: string, domain?: string, timeoutMS?: number): { code?: number; domain?: string; status?: string; styleguide?: object; }`\n\n**get** `/brand/styleguide`\n\nAutomatically extract comprehensive design system information from a brand's website including colors, typography, spacing, shadows, and UI components. Either 'domain' or 'directUrl' must be provided as a query parameter, but not both.\n\n### Parameters\n\n- `directUrl?: string`\n  A specific URL to fetch the styleguide from directly, bypassing domain resolution (e.g., 'https://example.com/design-system').\n\n- `domain?: string`\n  Domain name to extract styleguide from (e.g., 'example.com', 'google.com'). The domain will be automatically normalized and validated.\n\n- `timeoutMS?: number`\n  Optional timeout in milliseconds for the request. If the request takes longer than this value, it will be aborted with a 408 status code. Maximum allowed value is 300000ms (5 minutes).\n\n### Returns\n\n- `{ code?: number; domain?: string; status?: string; styleguide?: { colors: { accent: string; background: string; text: string; }; components: { button: object; card?: object; }; elementSpacing: { lg: string; md: string; sm: string; xl: string; xs: string; }; fontLinks: object; mode: 'light' | 'dark'; shadows: { inner: string; lg: string; md: string; sm: string; xl: string; }; typography: { headings: object; p?: object; }; }; }`\n\n  - `code?: number`\n  - `domain?: string`\n  - `status?: string`\n  - `styleguide?: { colors: { accent: string; background: string; text: string; }; components: { button: { link?: { backgroundColor: string; borderColor: string; borderRadius: string; borderStyle: string; borderWidth: string; boxShadow: string; color: string; css: string; fontSize: string; fontWeight: number; minHeight: string; minWidth: string; padding: string; textDecoration: string; fontFallbacks?: string[]; fontFamily?: string; textDecorationColor?: string; }; primary?: { backgroundColor: string; borderColor: string; borderRadius: string; borderStyle: string; borderWidth: string; boxShadow: string; color: string; css: string; fontSize: string; fontWeight: number; minHeight: string; minWidth: string; padding: string; textDecoration: string; fontFallbacks?: string[]; fontFamily?: string; textDecorationColor?: string; }; secondary?: { backgroundColor: string; borderColor: string; borderRadius: string; borderStyle: string; borderWidth: string; boxShadow: string; color: string; css: string; fontSize: string; fontWeight: number; minHeight: string; minWidth: string; padding: string; textDecoration: string; fontFallbacks?: string[]; fontFamily?: string; textDecorationColor?: string; }; }; card?: { backgroundColor: string; borderColor: string; borderRadius: string; borderStyle: string; borderWidth: string; boxShadow: string; css: string; padding: string; textColor: string; }; }; elementSpacing: { lg: string; md: string; sm: string; xl: string; xs: string; }; fontLinks: object; mode: 'light' | 'dark'; shadows: { inner: string; lg: string; md: string; sm: string; xl: string; }; typography: { headings: { h1?: { fontFallbacks: string[]; fontFamily: string; fontSize: string; fontWeight: number; letterSpacing: string; lineHeight: string; }; h2?: { fontFallbacks: string[]; fontFamily: string; fontSize: string; fontWeight: number; letterSpacing: string; lineHeight: string; }; h3?: { fontFallbacks: string[]; fontFamily: string; fontSize: string; fontWeight: number; letterSpacing: string; lineHeight: string; }; h4?: { fontFallbacks: string[]; fontFamily: string; fontSize: string; fontWeight: number; letterSpacing: string; lineHeight: string; }; }; p?: { fontFallbacks: string[]; fontFamily: string; fontSize: string; fontWeight: number; letterSpacing: string; lineHeight: string; }; }; }`\n\n### Example\n\n```typescript\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev();\n\nconst response = await client.style.extractStyleguide();\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.context.dev/v1/brand/styleguide \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY"',
      },
      python: {
        method: 'style.extract_styleguide',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.style.extract_styleguide()\nprint(response.styleguide)',
      },
      ruby: {
        method: 'style.extract_styleguide',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nresponse = context_dev.style.extract_styleguide\n\nputs(response)',
      },
      typescript: {
        method: 'client.style.extractStyleguide',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.style.extractStyleguide();\n\nconsole.log(response.styleguide);",
      },
    },
  },
  {
    name: 'extract_fonts',
    endpoint: '/brand/fonts',
    httpMethod: 'get',
    summary: 'Extract fonts from website',
    description:
      "Extract font information from a brand's website including font families, usage statistics, fallbacks, and element/word counts.",
    stainlessPath: '(resource) style > (method) extract_fonts',
    qualified: 'client.style.extractFonts',
    params: ['domain: string;', 'timeoutMS?: number;'],
    response:
      '{ code: number; domain: string; fonts: { fallbacks: string[]; font: string; num_elements: number; num_words: number; percent_elements: number; percent_words: number; uses: string[]; }[]; status: string; }',
    markdown:
      "## extract_fonts\n\n`client.style.extractFonts(domain: string, timeoutMS?: number): { code: number; domain: string; fonts: object[]; status: string; }`\n\n**get** `/brand/fonts`\n\nExtract font information from a brand's website including font families, usage statistics, fallbacks, and element/word counts.\n\n### Parameters\n\n- `domain: string`\n  Domain name to extract fonts from (e.g., 'example.com', 'google.com'). The domain will be automatically normalized and validated.\n\n- `timeoutMS?: number`\n  Optional timeout in milliseconds for the request. If the request takes longer than this value, it will be aborted with a 408 status code. Maximum allowed value is 300000ms (5 minutes).\n\n### Returns\n\n- `{ code: number; domain: string; fonts: { fallbacks: string[]; font: string; num_elements: number; num_words: number; percent_elements: number; percent_words: number; uses: string[]; }[]; status: string; }`\n\n  - `code: number`\n  - `domain: string`\n  - `fonts: { fallbacks: string[]; font: string; num_elements: number; num_words: number; percent_elements: number; percent_words: number; uses: string[]; }[]`\n  - `status: string`\n\n### Example\n\n```typescript\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev();\n\nconst response = await client.style.extractFonts({ domain: 'domain' });\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.context.dev/v1/brand/fonts \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY"',
      },
      python: {
        method: 'style.extract_fonts',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.style.extract_fonts(\n    domain="domain",\n)\nprint(response.code)',
      },
      ruby: {
        method: 'style.extract_fonts',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nresponse = context_dev.style.extract_fonts(domain: "domain")\n\nputs(response)',
      },
      typescript: {
        method: 'client.style.extractFonts',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.style.extractFonts({ domain: 'domain' });\n\nconsole.log(response.code);",
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
    params: ['domain: string;', 'force_language?: string;', 'maxSpeed?: boolean;', 'timeoutMS?: number;'],
    response:
      "{ brand?: { address?: { city?: string; country?: string; country_code?: string; postal_code?: string; state_code?: string; state_province?: string; street?: string; }; backdrops?: { colors?: object[]; resolution?: object; url?: string; }[]; colors?: { hex?: string; name?: string; }[]; description?: string; domain?: string; email?: string; industries?: { eic?: object[]; }; is_nsfw?: boolean; links?: { blog?: string; careers?: string; contact?: string; pricing?: string; privacy?: string; terms?: string; }; logos?: { colors?: object[]; mode?: 'light' | 'dark' | 'has_opaque_background'; resolution?: object; type?: 'icon' | 'logo'; url?: string; }[]; phone?: string; primary_language?: string; slogan?: string; socials?: { type?: string; url?: string; }[]; stock?: { exchange?: string; ticker?: string; }; title?: string; }; code?: number; status?: string; }",
    markdown:
      "## retrieve\n\n`client.brand.retrieve(domain: string, force_language?: string, maxSpeed?: boolean, timeoutMS?: number): { brand?: object; code?: number; status?: string; }`\n\n**get** `/brand/retrieve`\n\nRetrieve logos, backdrops, colors, industry, description, and more from any domain\n\n### Parameters\n\n- `domain: string`\n  Domain name to retrieve brand data for (e.g., 'example.com', 'google.com'). Cannot be used with name or ticker parameters.\n\n- `force_language?: string`\n  Optional parameter to force the language of the retrieved brand data.\n\n- `maxSpeed?: boolean`\n  Optional parameter to optimize the API call for maximum speed. When set to true, the API will skip time-consuming operations for faster response at the cost of less comprehensive data. Works with all three lookup methods.\n\n- `timeoutMS?: number`\n  Optional timeout in milliseconds for the request. If the request takes longer than this value, it will be aborted with a 408 status code. Maximum allowed value is 300000ms (5 minutes).\n\n### Returns\n\n- `{ brand?: { address?: { city?: string; country?: string; country_code?: string; postal_code?: string; state_code?: string; state_province?: string; street?: string; }; backdrops?: { colors?: object[]; resolution?: object; url?: string; }[]; colors?: { hex?: string; name?: string; }[]; description?: string; domain?: string; email?: string; industries?: { eic?: object[]; }; is_nsfw?: boolean; links?: { blog?: string; careers?: string; contact?: string; pricing?: string; privacy?: string; terms?: string; }; logos?: { colors?: object[]; mode?: 'light' | 'dark' | 'has_opaque_background'; resolution?: object; type?: 'icon' | 'logo'; url?: string; }[]; phone?: string; primary_language?: string; slogan?: string; socials?: { type?: string; url?: string; }[]; stock?: { exchange?: string; ticker?: string; }; title?: string; }; code?: number; status?: string; }`\n\n  - `brand?: { address?: { city?: string; country?: string; country_code?: string; postal_code?: string; state_code?: string; state_province?: string; street?: string; }; backdrops?: { colors?: { hex?: string; name?: string; }[]; resolution?: { aspect_ratio?: number; height?: number; width?: number; }; url?: string; }[]; colors?: { hex?: string; name?: string; }[]; description?: string; domain?: string; email?: string; industries?: { eic?: { industry: string; subindustry: string; }[]; }; is_nsfw?: boolean; links?: { blog?: string; careers?: string; contact?: string; pricing?: string; privacy?: string; terms?: string; }; logos?: { colors?: { hex?: string; name?: string; }[]; mode?: 'light' | 'dark' | 'has_opaque_background'; resolution?: { aspect_ratio?: number; height?: number; width?: number; }; type?: 'icon' | 'logo'; url?: string; }[]; phone?: string; primary_language?: string; slogan?: string; socials?: { type?: string; url?: string; }[]; stock?: { exchange?: string; ticker?: string; }; title?: string; }`\n  - `code?: number`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev();\n\nconst brand = await client.brand.retrieve({ domain: 'domain' });\n\nconsole.log(brand);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.context.dev/v1/brand/retrieve \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY"',
      },
      python: {
        method: 'brand.retrieve',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nbrand = client.brand.retrieve(\n    domain="domain",\n)\nprint(brand.brand)',
      },
      ruby: {
        method: 'brand.retrieve',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nbrand = context_dev.brand.retrieve(domain: "domain")\n\nputs(brand)',
      },
      typescript: {
        method: 'client.brand.retrieve',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst brand = await client.brand.retrieve({ domain: 'domain' });\n\nconsole.log(brand.brand);",
      },
    },
  },
  {
    name: 'retrieve_by_ticker',
    endpoint: '/brand/retrieve-by-ticker',
    httpMethod: 'get',
    summary: 'Retrieve brand data by stock ticker',
    description:
      'Retrieve brand information using a stock ticker symbol. This endpoint looks up the company associated with the ticker and returns its brand data.',
    stainlessPath: '(resource) brand > (method) retrieve_by_ticker',
    qualified: 'client.brand.retrieveByTicker',
    params: [
      'ticker: string;',
      'force_language?: string;',
      'maxSpeed?: boolean;',
      'ticker_exchange?: string;',
      'timeoutMS?: number;',
    ],
    response:
      "{ brand?: { address?: { city?: string; country?: string; country_code?: string; postal_code?: string; state_code?: string; state_province?: string; street?: string; }; backdrops?: { colors?: object[]; resolution?: object; url?: string; }[]; colors?: { hex?: string; name?: string; }[]; description?: string; domain?: string; email?: string; industries?: { eic?: object[]; }; is_nsfw?: boolean; links?: { blog?: string; careers?: string; contact?: string; pricing?: string; privacy?: string; terms?: string; }; logos?: { colors?: object[]; mode?: 'light' | 'dark' | 'has_opaque_background'; resolution?: object; type?: 'icon' | 'logo'; url?: string; }[]; phone?: string; primary_language?: string; slogan?: string; socials?: { type?: string; url?: string; }[]; stock?: { exchange?: string; ticker?: string; }; title?: string; }; code?: number; status?: string; }",
    markdown:
      "## retrieve_by_ticker\n\n`client.brand.retrieveByTicker(ticker: string, force_language?: string, maxSpeed?: boolean, ticker_exchange?: string, timeoutMS?: number): { brand?: object; code?: number; status?: string; }`\n\n**get** `/brand/retrieve-by-ticker`\n\nRetrieve brand information using a stock ticker symbol. This endpoint looks up the company associated with the ticker and returns its brand data.\n\n### Parameters\n\n- `ticker: string`\n  Stock ticker symbol to retrieve brand data for (e.g., 'AAPL', 'GOOGL', 'BRK.A'). Must be 1-15 characters, letters/numbers/dots only.\n\n- `force_language?: string`\n  Optional parameter to force the language of the retrieved brand data.\n\n- `maxSpeed?: boolean`\n  Optional parameter to optimize the API call for maximum speed. When set to true, the API will skip time-consuming operations for faster response at the cost of less comprehensive data.\n\n- `ticker_exchange?: string`\n  Optional stock exchange for the ticker. Defaults to NASDAQ if not specified.\n\n- `timeoutMS?: number`\n  Optional timeout in milliseconds for the request. If the request takes longer than this value, it will be aborted with a 408 status code. Maximum allowed value is 300000ms (5 minutes).\n\n### Returns\n\n- `{ brand?: { address?: { city?: string; country?: string; country_code?: string; postal_code?: string; state_code?: string; state_province?: string; street?: string; }; backdrops?: { colors?: object[]; resolution?: object; url?: string; }[]; colors?: { hex?: string; name?: string; }[]; description?: string; domain?: string; email?: string; industries?: { eic?: object[]; }; is_nsfw?: boolean; links?: { blog?: string; careers?: string; contact?: string; pricing?: string; privacy?: string; terms?: string; }; logos?: { colors?: object[]; mode?: 'light' | 'dark' | 'has_opaque_background'; resolution?: object; type?: 'icon' | 'logo'; url?: string; }[]; phone?: string; primary_language?: string; slogan?: string; socials?: { type?: string; url?: string; }[]; stock?: { exchange?: string; ticker?: string; }; title?: string; }; code?: number; status?: string; }`\n\n  - `brand?: { address?: { city?: string; country?: string; country_code?: string; postal_code?: string; state_code?: string; state_province?: string; street?: string; }; backdrops?: { colors?: { hex?: string; name?: string; }[]; resolution?: { aspect_ratio?: number; height?: number; width?: number; }; url?: string; }[]; colors?: { hex?: string; name?: string; }[]; description?: string; domain?: string; email?: string; industries?: { eic?: { industry: string; subindustry: string; }[]; }; is_nsfw?: boolean; links?: { blog?: string; careers?: string; contact?: string; pricing?: string; privacy?: string; terms?: string; }; logos?: { colors?: { hex?: string; name?: string; }[]; mode?: 'light' | 'dark' | 'has_opaque_background'; resolution?: { aspect_ratio?: number; height?: number; width?: number; }; type?: 'icon' | 'logo'; url?: string; }[]; phone?: string; primary_language?: string; slogan?: string; socials?: { type?: string; url?: string; }[]; stock?: { exchange?: string; ticker?: string; }; title?: string; }`\n  - `code?: number`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev();\n\nconst response = await client.brand.retrieveByTicker({ ticker: 'ticker' });\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.context.dev/v1/brand/retrieve-by-ticker \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY"',
      },
      python: {
        method: 'brand.retrieve_by_ticker',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.brand.retrieve_by_ticker(\n    ticker="ticker",\n)\nprint(response.brand)',
      },
      ruby: {
        method: 'brand.retrieve_by_ticker',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nresponse = context_dev.brand.retrieve_by_ticker(ticker: "ticker")\n\nputs(response)',
      },
      typescript: {
        method: 'client.brand.retrieveByTicker',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.brand.retrieveByTicker({ ticker: 'ticker' });\n\nconsole.log(response.brand);",
      },
    },
  },
  {
    name: 'retrieve_by_isin',
    endpoint: '/brand/retrieve-by-isin',
    httpMethod: 'get',
    summary: 'Retrieve brand data by ISIN',
    description:
      'Retrieve brand information using an ISIN (International Securities Identification Number). This endpoint looks up the company associated with the ISIN and returns its brand data.',
    stainlessPath: '(resource) brand > (method) retrieve_by_isin',
    qualified: 'client.brand.retrieveByIsin',
    params: ['isin: string;', 'force_language?: string;', 'maxSpeed?: boolean;', 'timeoutMS?: number;'],
    response:
      "{ brand?: { address?: { city?: string; country?: string; country_code?: string; postal_code?: string; state_code?: string; state_province?: string; street?: string; }; backdrops?: { colors?: object[]; resolution?: object; url?: string; }[]; colors?: { hex?: string; name?: string; }[]; description?: string; domain?: string; email?: string; industries?: { eic?: object[]; }; is_nsfw?: boolean; links?: { blog?: string; careers?: string; contact?: string; pricing?: string; privacy?: string; terms?: string; }; logos?: { colors?: object[]; mode?: 'light' | 'dark' | 'has_opaque_background'; resolution?: object; type?: 'icon' | 'logo'; url?: string; }[]; phone?: string; primary_language?: string; slogan?: string; socials?: { type?: string; url?: string; }[]; stock?: { exchange?: string; ticker?: string; }; title?: string; }; code?: number; status?: string; }",
    markdown:
      "## retrieve_by_isin\n\n`client.brand.retrieveByIsin(isin: string, force_language?: string, maxSpeed?: boolean, timeoutMS?: number): { brand?: object; code?: number; status?: string; }`\n\n**get** `/brand/retrieve-by-isin`\n\nRetrieve brand information using an ISIN (International Securities Identification Number). This endpoint looks up the company associated with the ISIN and returns its brand data.\n\n### Parameters\n\n- `isin: string`\n  ISIN (International Securities Identification Number) to retrieve brand data for (e.g., 'AU000000IMD5', 'US0378331005'). Must be exactly 12 characters: 2 letters followed by 9 alphanumeric characters and ending with a digit.\n\n- `force_language?: string`\n  Optional parameter to force the language of the retrieved brand data.\n\n- `maxSpeed?: boolean`\n  Optional parameter to optimize the API call for maximum speed. When set to true, the API will skip time-consuming operations for faster response at the cost of less comprehensive data.\n\n- `timeoutMS?: number`\n  Optional timeout in milliseconds for the request. If the request takes longer than this value, it will be aborted with a 408 status code. Maximum allowed value is 300000ms (5 minutes).\n\n### Returns\n\n- `{ brand?: { address?: { city?: string; country?: string; country_code?: string; postal_code?: string; state_code?: string; state_province?: string; street?: string; }; backdrops?: { colors?: object[]; resolution?: object; url?: string; }[]; colors?: { hex?: string; name?: string; }[]; description?: string; domain?: string; email?: string; industries?: { eic?: object[]; }; is_nsfw?: boolean; links?: { blog?: string; careers?: string; contact?: string; pricing?: string; privacy?: string; terms?: string; }; logos?: { colors?: object[]; mode?: 'light' | 'dark' | 'has_opaque_background'; resolution?: object; type?: 'icon' | 'logo'; url?: string; }[]; phone?: string; primary_language?: string; slogan?: string; socials?: { type?: string; url?: string; }[]; stock?: { exchange?: string; ticker?: string; }; title?: string; }; code?: number; status?: string; }`\n\n  - `brand?: { address?: { city?: string; country?: string; country_code?: string; postal_code?: string; state_code?: string; state_province?: string; street?: string; }; backdrops?: { colors?: { hex?: string; name?: string; }[]; resolution?: { aspect_ratio?: number; height?: number; width?: number; }; url?: string; }[]; colors?: { hex?: string; name?: string; }[]; description?: string; domain?: string; email?: string; industries?: { eic?: { industry: string; subindustry: string; }[]; }; is_nsfw?: boolean; links?: { blog?: string; careers?: string; contact?: string; pricing?: string; privacy?: string; terms?: string; }; logos?: { colors?: { hex?: string; name?: string; }[]; mode?: 'light' | 'dark' | 'has_opaque_background'; resolution?: { aspect_ratio?: number; height?: number; width?: number; }; type?: 'icon' | 'logo'; url?: string; }[]; phone?: string; primary_language?: string; slogan?: string; socials?: { type?: string; url?: string; }[]; stock?: { exchange?: string; ticker?: string; }; title?: string; }`\n  - `code?: number`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev();\n\nconst response = await client.brand.retrieveByIsin({ isin: 'SE60513A9993' });\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.context.dev/v1/brand/retrieve-by-isin \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY"',
      },
      python: {
        method: 'brand.retrieve_by_isin',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.brand.retrieve_by_isin(\n    isin="SE60513A9993",\n)\nprint(response.brand)',
      },
      ruby: {
        method: 'brand.retrieve_by_isin',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nresponse = context_dev.brand.retrieve_by_isin(isin: "SE60513A9993")\n\nputs(response)',
      },
      typescript: {
        method: 'client.brand.retrieveByIsin',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.brand.retrieveByIsin({ isin: 'SE60513A9993' });\n\nconsole.log(response.brand);",
      },
    },
  },
  {
    name: 'retrieve_by_name',
    endpoint: '/brand/retrieve-by-name',
    httpMethod: 'get',
    summary: 'Retrieve brand data by company name',
    description:
      'Retrieve brand information using a company name. This endpoint searches for the company by name and returns its brand data.',
    stainlessPath: '(resource) brand > (method) retrieve_by_name',
    qualified: 'client.brand.retrieveByName',
    params: [
      'name: string;',
      'country_gl?: string;',
      'force_language?: string;',
      'maxSpeed?: boolean;',
      'timeoutMS?: number;',
    ],
    response:
      "{ brand?: { address?: { city?: string; country?: string; country_code?: string; postal_code?: string; state_code?: string; state_province?: string; street?: string; }; backdrops?: { colors?: object[]; resolution?: object; url?: string; }[]; colors?: { hex?: string; name?: string; }[]; description?: string; domain?: string; email?: string; industries?: { eic?: object[]; }; is_nsfw?: boolean; links?: { blog?: string; careers?: string; contact?: string; pricing?: string; privacy?: string; terms?: string; }; logos?: { colors?: object[]; mode?: 'light' | 'dark' | 'has_opaque_background'; resolution?: object; type?: 'icon' | 'logo'; url?: string; }[]; phone?: string; primary_language?: string; slogan?: string; socials?: { type?: string; url?: string; }[]; stock?: { exchange?: string; ticker?: string; }; title?: string; }; code?: number; status?: string; }",
    markdown:
      "## retrieve_by_name\n\n`client.brand.retrieveByName(name: string, country_gl?: string, force_language?: string, maxSpeed?: boolean, timeoutMS?: number): { brand?: object; code?: number; status?: string; }`\n\n**get** `/brand/retrieve-by-name`\n\nRetrieve brand information using a company name. This endpoint searches for the company by name and returns its brand data.\n\n### Parameters\n\n- `name: string`\n  Company name to retrieve brand data for (e.g., 'Apple Inc', 'Microsoft Corporation'). Must be 3-30 characters.\n\n- `country_gl?: string`\n  Optional country code (GL parameter) to specify the country. This affects the geographic location used for search queries.\n\n- `force_language?: string`\n  Optional parameter to force the language of the retrieved brand data.\n\n- `maxSpeed?: boolean`\n  Optional parameter to optimize the API call for maximum speed. When set to true, the API will skip time-consuming operations for faster response at the cost of less comprehensive data.\n\n- `timeoutMS?: number`\n  Optional timeout in milliseconds for the request. If the request takes longer than this value, it will be aborted with a 408 status code. Maximum allowed value is 300000ms (5 minutes).\n\n### Returns\n\n- `{ brand?: { address?: { city?: string; country?: string; country_code?: string; postal_code?: string; state_code?: string; state_province?: string; street?: string; }; backdrops?: { colors?: object[]; resolution?: object; url?: string; }[]; colors?: { hex?: string; name?: string; }[]; description?: string; domain?: string; email?: string; industries?: { eic?: object[]; }; is_nsfw?: boolean; links?: { blog?: string; careers?: string; contact?: string; pricing?: string; privacy?: string; terms?: string; }; logos?: { colors?: object[]; mode?: 'light' | 'dark' | 'has_opaque_background'; resolution?: object; type?: 'icon' | 'logo'; url?: string; }[]; phone?: string; primary_language?: string; slogan?: string; socials?: { type?: string; url?: string; }[]; stock?: { exchange?: string; ticker?: string; }; title?: string; }; code?: number; status?: string; }`\n\n  - `brand?: { address?: { city?: string; country?: string; country_code?: string; postal_code?: string; state_code?: string; state_province?: string; street?: string; }; backdrops?: { colors?: { hex?: string; name?: string; }[]; resolution?: { aspect_ratio?: number; height?: number; width?: number; }; url?: string; }[]; colors?: { hex?: string; name?: string; }[]; description?: string; domain?: string; email?: string; industries?: { eic?: { industry: string; subindustry: string; }[]; }; is_nsfw?: boolean; links?: { blog?: string; careers?: string; contact?: string; pricing?: string; privacy?: string; terms?: string; }; logos?: { colors?: { hex?: string; name?: string; }[]; mode?: 'light' | 'dark' | 'has_opaque_background'; resolution?: { aspect_ratio?: number; height?: number; width?: number; }; type?: 'icon' | 'logo'; url?: string; }[]; phone?: string; primary_language?: string; slogan?: string; socials?: { type?: string; url?: string; }[]; stock?: { exchange?: string; ticker?: string; }; title?: string; }`\n  - `code?: number`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev();\n\nconst response = await client.brand.retrieveByName({ name: 'xxx' });\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.context.dev/v1/brand/retrieve-by-name \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY"',
      },
      python: {
        method: 'brand.retrieve_by_name',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.brand.retrieve_by_name(\n    name="xxx",\n)\nprint(response.brand)',
      },
      ruby: {
        method: 'brand.retrieve_by_name',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nresponse = context_dev.brand.retrieve_by_name(name: "xxx")\n\nputs(response)',
      },
      typescript: {
        method: 'client.brand.retrieveByName',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.brand.retrieveByName({ name: 'xxx' });\n\nconsole.log(response.brand);",
      },
    },
  },
  {
    name: 'retrieve_by_email',
    endpoint: '/brand/retrieve-by-email',
    httpMethod: 'get',
    summary: 'Retrieve brand data by email address',
    description:
      'Retrieve brand information using an email address while detecting disposable and free email addresses. This endpoint extracts the domain from the email address and returns brand data for that domain. Disposable and free email addresses (like gmail.com, yahoo.com) will throw a 422 error.',
    stainlessPath: '(resource) brand > (method) retrieve_by_email',
    qualified: 'client.brand.retrieveByEmail',
    params: ['email: string;', 'force_language?: string;', 'maxSpeed?: boolean;', 'timeoutMS?: number;'],
    response:
      "{ brand?: { address?: { city?: string; country?: string; country_code?: string; postal_code?: string; state_code?: string; state_province?: string; street?: string; }; backdrops?: { colors?: object[]; resolution?: object; url?: string; }[]; colors?: { hex?: string; name?: string; }[]; description?: string; domain?: string; email?: string; industries?: { eic?: object[]; }; is_nsfw?: boolean; links?: { blog?: string; careers?: string; contact?: string; pricing?: string; privacy?: string; terms?: string; }; logos?: { colors?: object[]; mode?: 'light' | 'dark' | 'has_opaque_background'; resolution?: object; type?: 'icon' | 'logo'; url?: string; }[]; phone?: string; primary_language?: string; slogan?: string; socials?: { type?: string; url?: string; }[]; stock?: { exchange?: string; ticker?: string; }; title?: string; }; code?: number; status?: string; }",
    markdown:
      "## retrieve_by_email\n\n`client.brand.retrieveByEmail(email: string, force_language?: string, maxSpeed?: boolean, timeoutMS?: number): { brand?: object; code?: number; status?: string; }`\n\n**get** `/brand/retrieve-by-email`\n\nRetrieve brand information using an email address while detecting disposable and free email addresses. This endpoint extracts the domain from the email address and returns brand data for that domain. Disposable and free email addresses (like gmail.com, yahoo.com) will throw a 422 error.\n\n### Parameters\n\n- `email: string`\n  Email address to retrieve brand data for (e.g., 'contact@example.com'). The domain will be extracted from the email. Free email providers (gmail.com, yahoo.com, etc.) and disposable email addresses are not allowed.\n\n- `force_language?: string`\n  Optional parameter to force the language of the retrieved brand data.\n\n- `maxSpeed?: boolean`\n  Optional parameter to optimize the API call for maximum speed. When set to true, the API will skip time-consuming operations for faster response at the cost of less comprehensive data.\n\n- `timeoutMS?: number`\n  Optional timeout in milliseconds for the request. If the request takes longer than this value, it will be aborted with a 408 status code. Maximum allowed value is 300000ms (5 minutes).\n\n### Returns\n\n- `{ brand?: { address?: { city?: string; country?: string; country_code?: string; postal_code?: string; state_code?: string; state_province?: string; street?: string; }; backdrops?: { colors?: object[]; resolution?: object; url?: string; }[]; colors?: { hex?: string; name?: string; }[]; description?: string; domain?: string; email?: string; industries?: { eic?: object[]; }; is_nsfw?: boolean; links?: { blog?: string; careers?: string; contact?: string; pricing?: string; privacy?: string; terms?: string; }; logos?: { colors?: object[]; mode?: 'light' | 'dark' | 'has_opaque_background'; resolution?: object; type?: 'icon' | 'logo'; url?: string; }[]; phone?: string; primary_language?: string; slogan?: string; socials?: { type?: string; url?: string; }[]; stock?: { exchange?: string; ticker?: string; }; title?: string; }; code?: number; status?: string; }`\n\n  - `brand?: { address?: { city?: string; country?: string; country_code?: string; postal_code?: string; state_code?: string; state_province?: string; street?: string; }; backdrops?: { colors?: { hex?: string; name?: string; }[]; resolution?: { aspect_ratio?: number; height?: number; width?: number; }; url?: string; }[]; colors?: { hex?: string; name?: string; }[]; description?: string; domain?: string; email?: string; industries?: { eic?: { industry: string; subindustry: string; }[]; }; is_nsfw?: boolean; links?: { blog?: string; careers?: string; contact?: string; pricing?: string; privacy?: string; terms?: string; }; logos?: { colors?: { hex?: string; name?: string; }[]; mode?: 'light' | 'dark' | 'has_opaque_background'; resolution?: { aspect_ratio?: number; height?: number; width?: number; }; type?: 'icon' | 'logo'; url?: string; }[]; phone?: string; primary_language?: string; slogan?: string; socials?: { type?: string; url?: string; }[]; stock?: { exchange?: string; ticker?: string; }; title?: string; }`\n  - `code?: number`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev();\n\nconst response = await client.brand.retrieveByEmail({ email: 'dev@stainless.com' });\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.context.dev/v1/brand/retrieve-by-email \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY"',
      },
      python: {
        method: 'brand.retrieve_by_email',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.brand.retrieve_by_email(\n    email="dev@stainless.com",\n)\nprint(response.brand)',
      },
      ruby: {
        method: 'brand.retrieve_by_email',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nresponse = context_dev.brand.retrieve_by_email(email: "dev@stainless.com")\n\nputs(response)',
      },
      typescript: {
        method: 'client.brand.retrieveByEmail',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.brand.retrieveByEmail({ email: 'dev@stainless.com' });\n\nconsole.log(response.brand);",
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
      "{ brand?: { address?: { city?: string; country?: string; country_code?: string; postal_code?: string; state_code?: string; state_province?: string; street?: string; }; backdrops?: { colors?: object[]; resolution?: object; url?: string; }[]; colors?: { hex?: string; name?: string; }[]; description?: string; domain?: string; email?: string; industries?: { eic?: object[]; }; is_nsfw?: boolean; links?: { blog?: string; careers?: string; contact?: string; pricing?: string; privacy?: string; terms?: string; }; logos?: { colors?: object[]; mode?: 'light' | 'dark' | 'has_opaque_background'; resolution?: object; type?: 'icon' | 'logo'; url?: string; }[]; phone?: string; primary_language?: string; slogan?: string; socials?: { type?: string; url?: string; }[]; stock?: { exchange?: string; ticker?: string; }; title?: string; }; code?: number; status?: string; }",
    markdown:
      "## identify_from_transaction\n\n`client.brand.identifyFromTransaction(transaction_info: string, city?: string, country_gl?: string, force_language?: string, high_confidence_only?: boolean, maxSpeed?: boolean, mcc?: string, phone?: number, timeoutMS?: number): { brand?: object; code?: number; status?: string; }`\n\n**get** `/brand/transaction_identifier`\n\nEndpoint specially designed for platforms that want to identify transaction data by the transaction title.\n\n### Parameters\n\n- `transaction_info: string`\n  Transaction information to identify the brand\n\n- `city?: string`\n  Optional city name to prioritize when searching for the brand.\n\n- `country_gl?: string`\n  Optional country code (GL parameter) to specify the country. This affects the geographic location used for search queries.\n\n- `force_language?: string`\n  Optional parameter to force the language of the retrieved brand data.\n\n- `high_confidence_only?: boolean`\n  When set to true, the API will perform an additional verification steps to ensure the identified brand matches the transaction with high confidence. Defaults to false.\n\n- `maxSpeed?: boolean`\n  Optional parameter to optimize the API call for maximum speed. When set to true, the API will skip time-consuming operations for faster response at the cost of less comprehensive data.\n\n- `mcc?: string`\n  Optional Merchant Category Code (MCC) to help identify the business category/industry. \n\n- `phone?: number`\n  Optional phone number from the transaction to help verify brand match.\n\n- `timeoutMS?: number`\n  Optional timeout in milliseconds for the request. If the request takes longer than this value, it will be aborted with a 408 status code. Maximum allowed value is 300000ms (5 minutes).\n\n### Returns\n\n- `{ brand?: { address?: { city?: string; country?: string; country_code?: string; postal_code?: string; state_code?: string; state_province?: string; street?: string; }; backdrops?: { colors?: object[]; resolution?: object; url?: string; }[]; colors?: { hex?: string; name?: string; }[]; description?: string; domain?: string; email?: string; industries?: { eic?: object[]; }; is_nsfw?: boolean; links?: { blog?: string; careers?: string; contact?: string; pricing?: string; privacy?: string; terms?: string; }; logos?: { colors?: object[]; mode?: 'light' | 'dark' | 'has_opaque_background'; resolution?: object; type?: 'icon' | 'logo'; url?: string; }[]; phone?: string; primary_language?: string; slogan?: string; socials?: { type?: string; url?: string; }[]; stock?: { exchange?: string; ticker?: string; }; title?: string; }; code?: number; status?: string; }`\n\n  - `brand?: { address?: { city?: string; country?: string; country_code?: string; postal_code?: string; state_code?: string; state_province?: string; street?: string; }; backdrops?: { colors?: { hex?: string; name?: string; }[]; resolution?: { aspect_ratio?: number; height?: number; width?: number; }; url?: string; }[]; colors?: { hex?: string; name?: string; }[]; description?: string; domain?: string; email?: string; industries?: { eic?: { industry: string; subindustry: string; }[]; }; is_nsfw?: boolean; links?: { blog?: string; careers?: string; contact?: string; pricing?: string; privacy?: string; terms?: string; }; logos?: { colors?: { hex?: string; name?: string; }[]; mode?: 'light' | 'dark' | 'has_opaque_background'; resolution?: { aspect_ratio?: number; height?: number; width?: number; }; type?: 'icon' | 'logo'; url?: string; }[]; phone?: string; primary_language?: string; slogan?: string; socials?: { type?: string; url?: string; }[]; stock?: { exchange?: string; ticker?: string; }; title?: string; }`\n  - `code?: number`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev();\n\nconst response = await client.brand.identifyFromTransaction({ transaction_info: 'transaction_info' });\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.context.dev/v1/brand/transaction_identifier \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY"',
      },
      python: {
        method: 'brand.identify_from_transaction',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.brand.identify_from_transaction(\n    transaction_info="transaction_info",\n)\nprint(response.brand)',
      },
      ruby: {
        method: 'brand.identify_from_transaction',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nresponse = context_dev.brand.identify_from_transaction(transaction_info: "transaction_info")\n\nputs(response)',
      },
      typescript: {
        method: 'client.brand.identifyFromTransaction',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.brand.identifyFromTransaction({\n  transaction_info: 'transaction_info',\n});\n\nconsole.log(response.brand);",
      },
    },
  },
  {
    name: 'retrieve_simplified',
    endpoint: '/brand/retrieve-simplified',
    httpMethod: 'get',
    summary: 'Retrieve simplified brand data by domain',
    description:
      'Returns a simplified version of brand data containing only essential information: domain, title, colors, logos, and backdrops. This endpoint is optimized for faster responses and reduced data transfer.',
    stainlessPath: '(resource) brand > (method) retrieve_simplified',
    qualified: 'client.brand.retrieveSimplified',
    params: ['domain: string;', 'timeoutMS?: number;'],
    response:
      "{ brand?: { backdrops?: { colors?: object[]; resolution?: object; url?: string; }[]; colors?: { hex?: string; name?: string; }[]; domain?: string; logos?: { colors?: object[]; mode?: 'light' | 'dark' | 'has_opaque_background'; resolution?: object; type?: 'icon' | 'logo'; url?: string; }[]; title?: string; }; code?: number; status?: string; }",
    markdown:
      "## retrieve_simplified\n\n`client.brand.retrieveSimplified(domain: string, timeoutMS?: number): { brand?: object; code?: number; status?: string; }`\n\n**get** `/brand/retrieve-simplified`\n\nReturns a simplified version of brand data containing only essential information: domain, title, colors, logos, and backdrops. This endpoint is optimized for faster responses and reduced data transfer.\n\n### Parameters\n\n- `domain: string`\n  Domain name to retrieve simplified brand data for\n\n- `timeoutMS?: number`\n  Optional timeout in milliseconds for the request. If the request takes longer than this value, it will be aborted with a 408 status code. Maximum allowed value is 300000ms (5 minutes).\n\n### Returns\n\n- `{ brand?: { backdrops?: { colors?: object[]; resolution?: object; url?: string; }[]; colors?: { hex?: string; name?: string; }[]; domain?: string; logos?: { colors?: object[]; mode?: 'light' | 'dark' | 'has_opaque_background'; resolution?: object; type?: 'icon' | 'logo'; url?: string; }[]; title?: string; }; code?: number; status?: string; }`\n\n  - `brand?: { backdrops?: { colors?: { hex?: string; name?: string; }[]; resolution?: { aspect_ratio?: number; height?: number; width?: number; }; url?: string; }[]; colors?: { hex?: string; name?: string; }[]; domain?: string; logos?: { colors?: { hex?: string; name?: string; }[]; mode?: 'light' | 'dark' | 'has_opaque_background'; resolution?: { aspect_ratio?: number; height?: number; width?: number; }; type?: 'icon' | 'logo'; url?: string; }[]; title?: string; }`\n  - `code?: number`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev();\n\nconst response = await client.brand.retrieveSimplified({ domain: 'domain' });\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.context.dev/v1/brand/retrieve-simplified \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY"',
      },
      python: {
        method: 'brand.retrieve_simplified',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.brand.retrieve_simplified(\n    domain="domain",\n)\nprint(response.brand)',
      },
      ruby: {
        method: 'brand.retrieve_simplified',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nresponse = context_dev.brand.retrieve_simplified(domain: "domain")\n\nputs(response)',
      },
      typescript: {
        method: 'client.brand.retrieveSimplified',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.brand.retrieveSimplified({ domain: 'domain' });\n\nconsole.log(response.brand);",
      },
    },
  },
  {
    name: 'retrieve_naics',
    endpoint: '/brand/naics',
    httpMethod: 'get',
    summary: 'Retrieve NAICS code for any brand',
    description: 'Endpoint to classify any brand into a 2022 NAICS code.',
    stainlessPath: '(resource) industry > (method) retrieve_naics',
    qualified: 'client.industry.retrieveNaics',
    params: ['input: string;', 'maxResults?: number;', 'minResults?: number;', 'timeoutMS?: number;'],
    response:
      "{ codes?: { code: string; confidence: 'high' | 'medium' | 'low'; name: string; }[]; domain?: string; status?: string; type?: string; }",
    markdown:
      "## retrieve_naics\n\n`client.industry.retrieveNaics(input: string, maxResults?: number, minResults?: number, timeoutMS?: number): { codes?: object[]; domain?: string; status?: string; type?: string; }`\n\n**get** `/brand/naics`\n\nEndpoint to classify any brand into a 2022 NAICS code.\n\n### Parameters\n\n- `input: string`\n  Brand domain or title to retrieve NAICS code for. If a valid domain is provided in `input`, it will be used for classification, otherwise, we will search for the brand using the provided title.\n\n- `maxResults?: number`\n  Maximum number of NAICS codes to return. Must be between 1 and 10. Defaults to 5.\n\n- `minResults?: number`\n  Minimum number of NAICS codes to return. Must be at least 1. Defaults to 1.\n\n- `timeoutMS?: number`\n  Optional timeout in milliseconds for the request. If the request takes longer than this value, it will be aborted with a 408 status code. Maximum allowed value is 300000ms (5 minutes).\n\n### Returns\n\n- `{ codes?: { code: string; confidence: 'high' | 'medium' | 'low'; name: string; }[]; domain?: string; status?: string; type?: string; }`\n\n  - `codes?: { code: string; confidence: 'high' | 'medium' | 'low'; name: string; }[]`\n  - `domain?: string`\n  - `status?: string`\n  - `type?: string`\n\n### Example\n\n```typescript\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev();\n\nconst response = await client.industry.retrieveNaics({ input: 'input' });\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.context.dev/v1/brand/naics \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY"',
      },
      python: {
        method: 'industry.retrieve_naics',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.industry.retrieve_naics(\n    input="input",\n)\nprint(response.codes)',
      },
      ruby: {
        method: 'industry.retrieve_naics',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nresponse = context_dev.industry.retrieve_naics(input: "input")\n\nputs(response)',
      },
      typescript: {
        method: 'client.industry.retrieveNaics',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.industry.retrieveNaics({ input: 'input' });\n\nconsole.log(response.codes);",
      },
    },
  },
  {
    name: 'prefetch',
    endpoint: '/brand/prefetch',
    httpMethod: 'post',
    summary: 'Prefetch brand data for a domain',
    description:
      'Signal that you may fetch brand data for a particular domain soon to improve latency. This endpoint does not charge credits and is available for paid customers to optimize future requests. [You must be on a paid plan to use this endpoint]',
    stainlessPath: '(resource) utility > (method) prefetch',
    qualified: 'client.utility.prefetch',
    params: ['domain: string;', 'timeoutMS?: number;'],
    response: '{ domain?: string; message?: string; status?: string; }',
    markdown:
      "## prefetch\n\n`client.utility.prefetch(domain: string, timeoutMS?: number): { domain?: string; message?: string; status?: string; }`\n\n**post** `/brand/prefetch`\n\nSignal that you may fetch brand data for a particular domain soon to improve latency. This endpoint does not charge credits and is available for paid customers to optimize future requests. [You must be on a paid plan to use this endpoint]\n\n### Parameters\n\n- `domain: string`\n  Domain name to prefetch brand data for\n\n- `timeoutMS?: number`\n  Optional timeout in milliseconds for the request. If the request takes longer than this value, it will be aborted with a 408 status code. Maximum allowed value is 300000ms (5 minutes).\n\n### Returns\n\n- `{ domain?: string; message?: string; status?: string; }`\n\n  - `domain?: string`\n  - `message?: string`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev();\n\nconst response = await client.utility.prefetch({ domain: 'domain' });\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.context.dev/v1/brand/prefetch \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY" \\\n    -d \'{\n          "domain": "domain"\n        }\'',
      },
      python: {
        method: 'utility.prefetch',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.utility.prefetch(\n    domain="domain",\n)\nprint(response.domain)',
      },
      ruby: {
        method: 'utility.prefetch',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nresponse = context_dev.utility.prefetch(domain: "domain")\n\nputs(response)',
      },
      typescript: {
        method: 'client.utility.prefetch',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.utility.prefetch({ domain: 'domain' });\n\nconsole.log(response.domain);",
      },
    },
  },
  {
    name: 'prefetch_by_email',
    endpoint: '/brand/prefetch-by-email',
    httpMethod: 'post',
    summary: 'Prefetch brand data by email',
    description:
      "Signal that you may fetch brand data for a particular domain soon to improve latency. This endpoint accepts an email address, extracts the domain from it, validates that it's not a disposable or free email provider, and queues the domain for prefetching. This endpoint does not charge credits and is available for paid customers to optimize future requests. [You must be on a paid plan to use this endpoint]",
    stainlessPath: '(resource) utility > (method) prefetch_by_email',
    qualified: 'client.utility.prefetchByEmail',
    params: ['email: string;', 'timeoutMS?: number;'],
    response: '{ domain?: string; message?: string; status?: string; }',
    markdown:
      "## prefetch_by_email\n\n`client.utility.prefetchByEmail(email: string, timeoutMS?: number): { domain?: string; message?: string; status?: string; }`\n\n**post** `/brand/prefetch-by-email`\n\nSignal that you may fetch brand data for a particular domain soon to improve latency. This endpoint accepts an email address, extracts the domain from it, validates that it's not a disposable or free email provider, and queues the domain for prefetching. This endpoint does not charge credits and is available for paid customers to optimize future requests. [You must be on a paid plan to use this endpoint]\n\n### Parameters\n\n- `email: string`\n  Email address to prefetch brand data for. The domain will be extracted from the email. Free email providers (gmail.com, yahoo.com, etc.) and disposable email addresses are not allowed.\n\n- `timeoutMS?: number`\n  Optional timeout in milliseconds for the request. If the request takes longer than this value, it will be aborted with a 408 status code. Maximum allowed value is 300000ms (5 minutes).\n\n### Returns\n\n- `{ domain?: string; message?: string; status?: string; }`\n\n  - `domain?: string`\n  - `message?: string`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev();\n\nconst response = await client.utility.prefetchByEmail({ email: 'dev@stainless.com' });\n\nconsole.log(response);\n```",
    perLanguage: {
      http: {
        example:
          'curl https://api.context.dev/v1/brand/prefetch-by-email \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $CONTEXT_DEV_API_KEY" \\\n    -d \'{\n          "email": "dev@stainless.com"\n        }\'',
      },
      python: {
        method: 'utility.prefetch_by_email',
        example:
          'import os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.utility.prefetch_by_email(\n    email="dev@stainless.com",\n)\nprint(response.domain)',
      },
      ruby: {
        method: 'utility.prefetch_by_email',
        example:
          'require "context_dev"\n\ncontext_dev = ContextDev::Client.new(api_key: "My API Key")\n\nresponse = context_dev.utility.prefetch_by_email(email: "dev@stainless.com")\n\nputs(response)',
      },
      typescript: {
        method: 'client.utility.prefetchByEmail',
        example:
          "import ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.utility.prefetchByEmail({ email: 'dev@stainless.com' });\n\nconsole.log(response.domain);",
      },
    },
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [
  {
    language: 'python',
    content:
      '# Context Dev Python API library\n\n<!-- prettier-ignore -->\n[![PyPI version](https://img.shields.io/pypi/v/context.dev.svg?label=pypi%20(stable))](https://pypi.org/project/context.dev/)\n\nThe Context Dev Python library provides convenient access to the Context Dev REST API from any Python 3.9+\napplication. The library includes type definitions for all request params and response fields,\nand offers both synchronous and asynchronous clients powered by [httpx](https://github.com/encode/httpx).\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Context Dev MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=context.dev-mcp&config=eyJuYW1lIjoiY29udGV4dC5kZXYtbWNwIiwidHJhbnNwb3J0IjoiaHR0cCIsInVybCI6Imh0dHBzOi8vY29udGV4dC1kZXYuc3RsbWNwLmNvbSIsImhlYWRlcnMiOnsieC1jb250ZXh0LWRldi1hcGkta2V5IjoiTXkgQVBJIEtleSJ9fQ)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22context.dev-mcp%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fcontext-dev.stlmcp.com%22%2C%22headers%22%3A%7B%22x-context-dev-api-key%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\nThe REST API documentation can be found on [docs.context.dev](https://docs.context.dev/). The full API of this library can be found in [api.md](api.md).\n\n## Installation\n\n```sh\n# install from PyPI\npip install context.dev\n```\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```python\nimport os\nfrom context.dev import ContextDev\n\nclient = ContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\n\nbrand = client.brand.retrieve(\n    domain="REPLACE_ME",\n)\nprint(brand.brand)\n```\n\nWhile you can provide an `api_key` keyword argument,\nwe recommend using [python-dotenv](https://pypi.org/project/python-dotenv/)\nto add `CONTEXT_DEV_API_KEY="My API Key"` to your `.env` file\nso that your API Key is not stored in source control.\n\n## Async usage\n\nSimply import `AsyncContextDev` instead of `ContextDev` and use `await` with each API call:\n\n```python\nimport os\nimport asyncio\nfrom context.dev import AsyncContextDev\n\nclient = AsyncContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n)\n\nasync def main() -> None:\n  brand = await client.brand.retrieve(\n      domain="REPLACE_ME",\n  )\n  print(brand.brand)\n\nasyncio.run(main())\n```\n\nFunctionality between the synchronous and asynchronous clients is otherwise identical.\n\n### With aiohttp\n\nBy default, the async client uses `httpx` for HTTP requests. However, for improved concurrency performance you may also use `aiohttp` as the HTTP backend.\n\nYou can enable this by installing `aiohttp`:\n\n```sh\n# install from PyPI\npip install context.dev[aiohttp]\n```\n\nThen you can enable it by instantiating the client with `http_client=DefaultAioHttpClient()`:\n\n```python\nimport os\nimport asyncio\nfrom context.dev import DefaultAioHttpClient\nfrom context.dev import AsyncContextDev\n\nasync def main() -> None:\n  async with AsyncContextDev(\n    api_key=os.environ.get("CONTEXT_DEV_API_KEY"),  # This is the default and can be omitted\n    http_client=DefaultAioHttpClient(),\n) as client:\n    brand = await client.brand.retrieve(\n        domain="REPLACE_ME",\n    )\n    print(brand.brand)\n\nasyncio.run(main())\n```\n\n\n\n## Using types\n\nNested request parameters are [TypedDicts](https://docs.python.org/3/library/typing.html#typing.TypedDict). Responses are [Pydantic models](https://docs.pydantic.dev) which also provide helper methods for things like:\n\n- Serializing back into JSON, `model.to_json()`\n- Converting to a dictionary, `model.to_dict()`\n\nTyped requests and responses provide autocomplete and documentation within your editor. If you would like to see type errors in VS Code to help catch bugs earlier, set `python.analysis.typeCheckingMode` to `basic`.\n\n\n\n## Nested params\n\nNested parameters are dictionaries, typed using `TypedDict`, for example:\n\n```python\nfrom context.dev import ContextDev\n\nclient = ContextDev()\n\nresponse = client.ai.ai_query(\n    data_to_extract=[{\n        "datapoint_description": "datapoint_description",\n        "datapoint_example": "datapoint_example",\n        "datapoint_name": "datapoint_name",\n        "datapoint_type": "text",\n    }],\n    domain="domain",\n    specific_pages={},\n)\nprint(response.specific_pages)\n```\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API (for example, due to network connection problems or a timeout), a subclass of `context.dev.APIConnectionError` is raised.\n\nWhen the API returns a non-success status code (that is, 4xx or 5xx\nresponse), a subclass of `context.dev.APIStatusError` is raised, containing `status_code` and `response` properties.\n\nAll errors inherit from `context.dev.APIError`.\n\n```python\nimport context.dev\nfrom context.dev import ContextDev\n\nclient = ContextDev()\n\ntry:\n    client.brand.retrieve(\n        domain="REPLACE_ME",\n    )\nexcept context.dev.APIConnectionError as e:\n    print("The server could not be reached")\n    print(e.__cause__) # an underlying Exception, likely raised within httpx.\nexcept context.dev.RateLimitError as e:\n    print("A 429 status code was received; we should back off a bit.")\nexcept context.dev.APIStatusError as e:\n    print("Another non-200-range status code was received")\n    print(e.status_code)\n    print(e.response)\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors are automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors are all retried by default.\n\nYou can use the `max_retries` option to configure or disable retry settings:\n\n```python\nfrom context.dev import ContextDev\n\n# Configure the default for all requests:\nclient = ContextDev(\n    # default is 2\n    max_retries=0,\n)\n\n# Or, configure per-request:\nclient.with_options(max_retries = 5).brand.retrieve(\n    domain="REPLACE_ME",\n)\n```\n\n### Timeouts\n\nBy default requests time out after 1 minute. You can configure this with a `timeout` option,\nwhich accepts a float or an [`httpx.Timeout`](https://www.python-httpx.org/advanced/timeouts/#fine-tuning-the-configuration) object:\n\n```python\nfrom context.dev import ContextDev\n\n# Configure the default for all requests:\nclient = ContextDev(\n    # 20 seconds (default is 1 minute)\n    timeout=20.0,\n)\n\n# More granular control:\nclient = ContextDev(\n    timeout=httpx.Timeout(60.0, read=5.0, write=10.0, connect=2.0),\n)\n\n# Override per-request:\nclient.with_options(timeout = 5.0).brand.retrieve(\n    domain="REPLACE_ME",\n)\n```\n\nOn timeout, an `APITimeoutError` is thrown.\n\nNote that requests that time out are [retried twice by default](#retries).\n\n\n\n## Advanced\n\n### Logging\n\nWe use the standard library [`logging`](https://docs.python.org/3/library/logging.html) module.\n\nYou can enable logging by setting the environment variable `CONTEXT_DEV_LOG` to `info`.\n\n```shell\n$ export CONTEXT_DEV_LOG=info\n```\n\nOr to `debug` for more verbose logging.\n\n### How to tell whether `None` means `null` or missing\n\nIn an API response, a field may be explicitly `null`, or missing entirely; in either case, its value is `None` in this library. You can differentiate the two cases with `.model_fields_set`:\n\n```py\nif response.my_field is None:\n  if \'my_field\' not in response.model_fields_set:\n    print(\'Got json like {}, without a "my_field" key present at all.\')\n  else:\n    print(\'Got json like {"my_field": null}.\')\n```\n\n### Accessing raw response data (e.g. headers)\n\nThe "raw" Response object can be accessed by prefixing `.with_raw_response.` to any HTTP method call, e.g.,\n\n```py\nfrom context.dev import ContextDev\n\nclient = ContextDev()\nresponse = client.brand.with_raw_response.retrieve(\n    domain="REPLACE_ME",\n)\nprint(response.headers.get(\'X-My-Header\'))\n\nbrand = response.parse()  # get the object that `brand.retrieve()` would have returned\nprint(brand.brand)\n```\n\nThese methods return an [`APIResponse`](https://github.com/context-dot-dev/context-python-sdk/tree/main/src/context/dev/_response.py) object.\n\nThe async client returns an [`AsyncAPIResponse`](https://github.com/context-dot-dev/context-python-sdk/tree/main/src/context/dev/_response.py) with the same structure, the only difference being `await`able methods for reading the response content.\n\n#### `.with_streaming_response`\n\nThe above interface eagerly reads the full response body when you make the request, which may not always be what you want.\n\nTo stream the response body, use `.with_streaming_response` instead, which requires a context manager and only reads the response body once you call `.read()`, `.text()`, `.json()`, `.iter_bytes()`, `.iter_text()`, `.iter_lines()` or `.parse()`. In the async client, these are async methods.\n\n```python\nwith client.brand.with_streaming_response.retrieve(\n    domain="REPLACE_ME",\n) as response :\n    print(response.headers.get(\'X-My-Header\'))\n\n    for line in response.iter_lines():\n      print(line)\n```\n\nThe context manager is required so that the response will reliably be closed.\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API.\n\nIf you need to access undocumented endpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can make requests using `client.get`, `client.post`, and other\nhttp verbs. Options on the client will be respected (such as retries) when making this request.\n\n```py\nimport httpx\n\nresponse = client.post(\n    "/foo",\n    cast_to=httpx.Response,\n    body={"my_param": True},\n)\n\nprint(response.headers.get("x-foo"))\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you can access the extra fields like `response.unknown_prop`. You\ncan also get all the extra fields on the Pydantic model as a dict with\n[`response.model_extra`](https://docs.pydantic.dev/latest/api/base_model/#pydantic.BaseModel.model_extra).\n\n### Configuring the HTTP client\n\nYou can directly override the [httpx client](https://www.python-httpx.org/api/#client) to customize it for your use case, including:\n\n- Support for [proxies](https://www.python-httpx.org/advanced/proxies/)\n- Custom [transports](https://www.python-httpx.org/advanced/transports/)\n- Additional [advanced](https://www.python-httpx.org/advanced/clients/) functionality\n\n```python\nimport httpx\nfrom context.dev import ContextDev, DefaultHttpxClient\n\nclient = ContextDev(\n    # Or use the `CONTEXT_DEV_BASE_URL` env var\n    base_url="http://my.test.server.example.com:8083",\n    http_client=DefaultHttpxClient(proxy="http://my.test.proxy.example.com", transport=httpx.HTTPTransport(local_address="0.0.0.0")),\n)\n```\n\nYou can also customize the client on a per-request basis by using `with_options()`:\n\n```python\nclient.with_options(http_client=DefaultHttpxClient(...))\n```\n\n### Managing HTTP resources\n\nBy default the library closes underlying HTTP connections whenever the client is [garbage collected](https://docs.python.org/3/reference/datamodel.html#object.__del__). You can manually close the client using the `.close()` method if desired, or with a context manager that closes when exiting.\n\n```py\nfrom context.dev import ContextDev\n\nwith ContextDev() as client:\n  # make requests here\n  ...\n\n# HTTP client is now closed\n```\n\n## Versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/context-dot-dev/context-python-sdk/issues) with questions, bugs, or suggestions.\n\n### Determining the installed version\n\nIf you\'ve upgraded to the latest version but aren\'t seeing any new features you were expecting then your python environment is likely still using an older version.\n\nYou can determine the version that is being used at runtime with:\n\n```py\nimport context.dev\nprint(context.dev.__version__)\n```\n\n## Requirements\n\nPython 3.9 or higher.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'typescript',
    content:
      "# Context Dev TypeScript API Library\n\n[![NPM version](https://img.shields.io/npm/v/context.dev.svg?label=npm%20(stable))](https://npmjs.org/package/context.dev) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/context.dev)\n\nThis library provides convenient access to the Context Dev REST API from server-side TypeScript or JavaScript.\n\n\n\nThe REST API documentation can be found on [docs.context.dev](https://docs.context.dev/). The full API of this library can be found in [api.md](api.md).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Context Dev MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=context.dev-mcp&config=eyJuYW1lIjoiY29udGV4dC5kZXYtbWNwIiwidHJhbnNwb3J0IjoiaHR0cCIsInVybCI6Imh0dHBzOi8vY29udGV4dC1kZXYuc3RsbWNwLmNvbSIsImhlYWRlcnMiOnsieC1jb250ZXh0LWRldi1hcGkta2V5IjoiTXkgQVBJIEtleSJ9fQ)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22context.dev-mcp%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fcontext-dev.stlmcp.com%22%2C%22headers%22%3A%7B%22x-context-dev-api-key%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n```sh\nnpm install context.dev\n```\n\n\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n<!-- prettier-ignore -->\n```js\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst brand = await client.brand.retrieve({ domain: 'REPLACE_ME' });\n\nconsole.log(brand.brand);\n```\n\n\n\n### Request & Response types\n\nThis library includes TypeScript definitions for all request params and response fields. You may import and use them like so:\n\n<!-- prettier-ignore -->\n```ts\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  apiKey: process.env['CONTEXT_DEV_API_KEY'], // This is the default and can be omitted\n});\n\nconst params: ContextDev.BrandRetrieveParams = { domain: 'REPLACE_ME' };\nconst brand: ContextDev.BrandRetrieveResponse = await client.brand.retrieve(params);\n```\n\nDocumentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.\n\n\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API,\nor if the API returns a non-success status code (i.e., 4xx or 5xx response),\na subclass of `APIError` will be thrown:\n\n<!-- prettier-ignore -->\n```ts\nconst brand = await client.brand.retrieve({ domain: 'REPLACE_ME' }).catch(async (err) => {\n  if (err instanceof ContextDev.APIError) {\n    console.log(err.status); // 400\n    console.log(err.name); // BadRequestError\n    console.log(err.headers); // {server: 'nginx', ...}\n  } else {\n    throw err;\n  }\n});\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors will all be retried by default.\n\nYou can use the `maxRetries` option to configure or disable this:\n\n<!-- prettier-ignore -->\n```js\n// Configure the default for all requests:\nconst client = new ContextDev({\n  maxRetries: 0, // default is 2\n});\n\n// Or, configure per-request:\nawait client.brand.retrieve({ domain: 'REPLACE_ME' }, {\n  maxRetries: 5,\n});\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default. You can configure this with a `timeout` option:\n\n<!-- prettier-ignore -->\n```ts\n// Configure the default for all requests:\nconst client = new ContextDev({\n  timeout: 20 * 1000, // 20 seconds (default is 1 minute)\n});\n\n// Override per-request:\nawait client.brand.retrieve({ domain: 'REPLACE_ME' }, {\n  timeout: 5 * 1000,\n});\n```\n\nOn timeout, an `APIConnectionTimeoutError` is thrown.\n\nNote that requests which time out will be [retried twice by default](#retries).\n\n\n\n\n\n## Advanced Usage\n\n### Accessing raw Response data (e.g., headers)\n\nThe \"raw\" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.\nThis method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.\n\nYou can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.\nUnlike `.asResponse()` this method consumes the body, returning once it is parsed.\n\n<!-- prettier-ignore -->\n```ts\nconst client = new ContextDev();\n\nconst response = await client.brand.retrieve({ domain: 'REPLACE_ME' }).asResponse();\nconsole.log(response.headers.get('X-My-Header'));\nconsole.log(response.statusText); // access the underlying Response object\n\nconst { data: brand, response: raw } = await client.brand\n  .retrieve({ domain: 'REPLACE_ME' })\n  .withResponse();\nconsole.log(raw.headers.get('X-My-Header'));\nconsole.log(brand.brand);\n```\n\n### Logging\n\n> [!IMPORTANT]\n> All log messages are intended for debugging only. The format and content of log messages\n> may change between releases.\n\n#### Log levels\n\nThe log level can be configured in two ways:\n\n1. Via the `CONTEXT_DEV_LOG` environment variable\n2. Using the `logLevel` client option (overrides the environment variable if set)\n\n```ts\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  logLevel: 'debug', // Show all log messages\n});\n```\n\nAvailable log levels, from most to least verbose:\n\n- `'debug'` - Show debug messages, info, warnings, and errors\n- `'info'` - Show info messages, warnings, and errors\n- `'warn'` - Show warnings and errors (default)\n- `'error'` - Show only errors\n- `'off'` - Disable all logging\n\nAt the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.\nSome authentication-related headers are redacted, but sensitive data in request and response bodies\nmay still be visible.\n\n#### Custom logger\n\nBy default, this library logs to `globalThis.console`. You can also provide a custom logger.\nMost logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.\n\nWhen providing a custom logger, the `logLevel` option still controls which messages are emitted, messages\nbelow the configured level will not be sent to your logger.\n\n```ts\nimport ContextDev from 'context.dev';\nimport pino from 'pino';\n\nconst logger = pino();\n\nconst client = new ContextDev({\n  logger: logger.child({ name: 'ContextDev' }),\n  logLevel: 'debug', // Send all messages to pino, allowing it to filter\n});\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.\nOptions on the client, such as retries, will be respected when making these requests.\n\n```ts\nawait client.post('/some/path', {\n  body: { some_prop: 'foo' },\n  query: { some_query_arg: 'bar' },\n});\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented\nparameter. This library doesn't validate at runtime that the request matches the type, so any extra values you\nsend will be sent as-is.\n\n```ts\nclient.brand.retrieve({\n  // ...\n  // @ts-expect-error baz is not yet public\n  baz: 'undocumented option',\n});\n```\n\nFor requests with the `GET` verb, any extra params will be in the query, all other requests will send the\nextra param in the body.\n\nIf you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may access the response object with `// @ts-expect-error` on\nthe response object, or cast the response object to the requisite type. Like the request params, we do not\nvalidate or strip extra properties from the response from the API.\n\n### Customizing the fetch client\n\nBy default, this library expects a global `fetch` function is defined.\n\nIf you want to use a different `fetch` function, you can either polyfill the global:\n\n```ts\nimport fetch from 'my-fetch';\n\nglobalThis.fetch = fetch;\n```\n\nOr pass it to the client:\n\n```ts\nimport ContextDev from 'context.dev';\nimport fetch from 'my-fetch';\n\nconst client = new ContextDev({ fetch });\n```\n\n### Fetch options\n\nIf you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)\n\n```ts\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  fetchOptions: {\n    // `RequestInit` options\n  },\n});\n```\n\n#### Configuring proxies\n\nTo modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy\noptions to requests:\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg\" align=\"top\" width=\"18\" height=\"21\"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>\n\n```ts\nimport ContextDev from 'context.dev';\nimport * as undici from 'undici';\n\nconst proxyAgent = new undici.ProxyAgent('http://localhost:8888');\nconst client = new ContextDev({\n  fetchOptions: {\n    dispatcher: proxyAgent,\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg\" align=\"top\" width=\"18\" height=\"21\"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>\n\n```ts\nimport ContextDev from 'context.dev';\n\nconst client = new ContextDev({\n  fetchOptions: {\n    proxy: 'http://localhost:8888',\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg\" align=\"top\" width=\"18\" height=\"21\"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>\n\n```ts\nimport ContextDev from 'npm:context.dev';\n\nconst httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });\nconst client = new ContextDev({\n  fetchOptions: {\n    client: httpClient,\n  },\n});\n```\n\n## Frequently Asked Questions\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/context-dot-dev/context-typescript-sdk/issues) with questions, bugs, or suggestions.\n\n## Requirements\n\nTypeScript >= 4.9 is supported.\n\nThe following runtimes are supported:\n\n- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)\n- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.\n- Deno v1.28.0 or higher.\n- Bun 1.0 or later.\n- Cloudflare Workers.\n- Vercel Edge Runtime.\n- Jest 28 or greater with the `\"node\"` environment (`\"jsdom\"` is not supported at this time).\n- Nitro v2.6 or greater.\n\nNote that React Native is not supported at this time.\n\nIf you are interested in other runtime environments, please open or upvote an issue on GitHub.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n",
  },
  {
    language: 'ruby',
    content:
      '# Context Dev Ruby API library\n\nThe Context Dev Ruby library provides convenient access to the Context Dev REST API from any Ruby 3.2.0+ application. It ships with comprehensive types & docstrings in Yard, RBS, and RBI – [see below](https://github.com/context-dot-dev/context-ruby-sdk#Sorbet) for usage with Sorbet. The standard library\'s `net/http` is used as the HTTP transport, with connection pooling via the `connection_pool` gem.\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Context Dev MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=context.dev-mcp&config=eyJuYW1lIjoiY29udGV4dC5kZXYtbWNwIiwidHJhbnNwb3J0IjoiaHR0cCIsInVybCI6Imh0dHBzOi8vY29udGV4dC1kZXYuc3RsbWNwLmNvbSIsImhlYWRlcnMiOnsieC1jb250ZXh0LWRldi1hcGkta2V5IjoiTXkgQVBJIEtleSJ9fQ)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22context.dev-mcp%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fcontext-dev.stlmcp.com%22%2C%22headers%22%3A%7B%22x-context-dev-api-key%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\nDocumentation for releases of this gem can be found [on RubyDoc](https://gemdocs.org/gems/context.dev).\n\nThe REST API documentation can be found on [docs.context.dev](https://docs.context.dev/).\n\n## Installation\n\nTo use this gem, install via Bundler by adding the following to your application\'s `Gemfile`:\n\n<!-- x-release-please-start-version -->\n\n```ruby\ngem "context.dev", "~> 0.0.1"\n```\n\n<!-- x-release-please-end -->\n\n## Usage\n\n```ruby\nrequire "bundler/setup"\nrequire "context_dev"\n\ncontext_dev = ContextDev::Client.new(\n  api_key: ENV["CONTEXT_DEV_API_KEY"] # This is the default and can be omitted\n)\n\nbrand = context_dev.brand.retrieve(domain: "REPLACE_ME")\n\nputs(brand.brand)\n```\n\n\n\n\n\n\n\n### Handling errors\n\nWhen the library is unable to connect to the API, or if the API returns a non-success status code (i.e., 4xx or 5xx response), a subclass of `ContextDev::Errors::APIError` will be thrown:\n\n```ruby\nbegin\n  brand = context_dev.brand.retrieve(domain: "REPLACE_ME")\nrescue ContextDev::Errors::APIConnectionError => e\n  puts("The server could not be reached")\n  puts(e.cause)  # an underlying Exception, likely raised within `net/http`\nrescue ContextDev::Errors::RateLimitError => e\n  puts("A 429 status code was received; we should back off a bit.")\nrescue ContextDev::Errors::APIStatusError => e\n  puts("Another non-200-range status code was received")\n  puts(e.status)\nend\n```\n\nError codes are as follows:\n\n| Cause            | Error Type                 |\n| ---------------- | -------------------------- |\n| HTTP 400         | `BadRequestError`          |\n| HTTP 401         | `AuthenticationError`      |\n| HTTP 403         | `PermissionDeniedError`    |\n| HTTP 404         | `NotFoundError`            |\n| HTTP 409         | `ConflictError`            |\n| HTTP 422         | `UnprocessableEntityError` |\n| HTTP 429         | `RateLimitError`           |\n| HTTP >= 500      | `InternalServerError`      |\n| Other HTTP error | `APIStatusError`           |\n| Timeout          | `APITimeoutError`          |\n| Network error    | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\n\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict, 429 Rate Limit, >=500 Internal errors, and timeouts will all be retried by default.\n\nYou can use the `max_retries` option to configure or disable this:\n\n```ruby\n# Configure the default for all requests:\ncontext_dev = ContextDev::Client.new(\n  max_retries: 0 # default is 2\n)\n\n# Or, configure per-request:\ncontext_dev.brand.retrieve(domain: "REPLACE_ME", request_options: {max_retries: 5})\n```\n\n### Timeouts\n\nBy default, requests will time out after 60 seconds. You can use the timeout option to configure or disable this:\n\n```ruby\n# Configure the default for all requests:\ncontext_dev = ContextDev::Client.new(\n  timeout: nil # default is 60\n)\n\n# Or, configure per-request:\ncontext_dev.brand.retrieve(domain: "REPLACE_ME", request_options: {timeout: 5})\n```\n\nOn timeout, `ContextDev::Errors::APITimeoutError` is raised.\n\nNote that requests that time out are retried by default.\n\n## Advanced concepts\n\n### BaseModel\n\nAll parameter and response objects inherit from `ContextDev::Internal::Type::BaseModel`, which provides several conveniences, including:\n\n1. All fields, including unknown ones, are accessible with `obj[:prop]` syntax, and can be destructured with `obj => {prop: prop}` or pattern-matching syntax.\n\n2. Structural equivalence for equality; if two API calls return the same values, comparing the responses with == will return true.\n\n3. Both instances and the classes themselves can be pretty-printed.\n\n4. Helpers such as `#to_h`, `#deep_to_h`, `#to_json`, and `#to_yaml`.\n\n### Making custom or undocumented requests\n\n#### Undocumented properties\n\nYou can send undocumented parameters to any endpoint, and read undocumented response properties, like so:\n\nNote: the `extra_` parameters of the same name overrides the documented parameters.\n\n```ruby\nbrand =\n  context_dev.brand.retrieve(\n    domain: "REPLACE_ME",\n    request_options: {\n      extra_query: {my_query_parameter: value},\n      extra_body: {my_body_parameter: value},\n      extra_headers: {"my-header": value}\n    }\n  )\n\nputs(brand[:my_undocumented_property])\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` under the `request_options:` parameter when making a request, as seen in the examples above.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints while retaining the benefit of auth, retries, and so on, you can make requests using `client.request`, like so:\n\n```ruby\nresponse = client.request(\n  method: :post,\n  path: \'/undocumented/endpoint\',\n  query: {"dog": "woof"},\n  headers: {"useful-header": "interesting-value"},\n  body: {"hello": "world"}\n)\n```\n\n### Concurrency & connection pooling\n\nThe `ContextDev::Client` instances are threadsafe, but are only are fork-safe when there are no in-flight HTTP requests.\n\nEach instance of `ContextDev::Client` has its own HTTP connection pool with a default size of 99. As such, we recommend instantiating the client once per application in most settings.\n\nWhen all available connections from the pool are checked out, requests wait for a new connection to become available, with queue time counting towards the request timeout.\n\nUnless otherwise specified, other classes in the SDK do not have locks protecting their underlying data structure.\n\n## Sorbet\n\nThis library provides comprehensive [RBI](https://sorbet.org/docs/rbi) definitions, and has no dependency on sorbet-runtime.\n\nYou can provide typesafe request parameters like so:\n\n```ruby\ncontext_dev.brand.retrieve(domain: "REPLACE_ME")\n```\n\nOr, equivalently:\n\n```ruby\n# Hashes work, but are not typesafe:\ncontext_dev.brand.retrieve(domain: "REPLACE_ME")\n\n# You can also splat a full Params class:\nparams = ContextDev::BrandRetrieveParams.new(domain: "REPLACE_ME")\ncontext_dev.brand.retrieve(**params)\n```\n\n### Enums\n\nSince this library does not depend on `sorbet-runtime`, it cannot provide [`T::Enum`](https://sorbet.org/docs/tenum) instances. Instead, we provide "tagged symbols" instead, which is always a primitive at runtime:\n\n```ruby\n# :true\nputs(ContextDev::WebScreenshotParams::FullScreenshot::TRUE)\n\n# Revealed type: `T.all(ContextDev::WebScreenshotParams::FullScreenshot, Symbol)`\nT.reveal_type(ContextDev::WebScreenshotParams::FullScreenshot::TRUE)\n```\n\nEnum parameters have a "relaxed" type, so you can either pass in enum constants or their literal value:\n\n```ruby\n# Using the enum constants preserves the tagged type information:\ncontext_dev.web.screenshot(\n  full_screenshot: ContextDev::WebScreenshotParams::FullScreenshot::TRUE,\n  # …\n)\n\n# Literal values are also permissible:\ncontext_dev.web.screenshot(\n  full_screenshot: :true,\n  # …\n)\n```\n\n## Versioning\n\nThis package follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions. As the library is in initial development and has a major version of `0`, APIs may change at any time.\n\nThis package considers improvements to the (non-runtime) `*.rbi` and `*.rbs` type definitions to be non-breaking changes.\n\n## Requirements\n\nRuby 3.2.0 or higher.\n\n## Contributing\n\nSee [the contributing documentation](https://github.com/context-dot-dev/context-ruby-sdk/tree/main/CONTRIBUTING.md).\n',
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
