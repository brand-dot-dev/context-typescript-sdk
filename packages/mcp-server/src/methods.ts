// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { McpOptions } from './options';

export type SdkMethod = {
  clientCallName: string;
  fullyQualifiedName: string;
  httpMethod?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'query';
  httpPath?: string;
};

export const sdkMethods: SdkMethod[] = [
  {
    clientCallName: 'client.parse.handle',
    fullyQualifiedName: 'parse.handle',
    httpMethod: 'post',
    httpPath: '/parse',
  },
  {
    clientCallName: 'client.web.extract',
    fullyQualifiedName: 'web.extract',
    httpMethod: 'post',
    httpPath: '/web/extract',
  },
  {
    clientCallName: 'client.web.extractCompetitors',
    fullyQualifiedName: 'web.extractCompetitors',
    httpMethod: 'get',
    httpPath: '/web/competitors',
  },
  {
    clientCallName: 'client.web.extractFonts',
    fullyQualifiedName: 'web.extractFonts',
    httpMethod: 'get',
    httpPath: '/web/fonts',
  },
  {
    clientCallName: 'client.web.extractStyleguide',
    fullyQualifiedName: 'web.extractStyleguide',
    httpMethod: 'get',
    httpPath: '/web/styleguide',
  },
  {
    clientCallName: 'client.web.screenshot',
    fullyQualifiedName: 'web.screenshot',
    httpMethod: 'get',
    httpPath: '/web/screenshot',
  },
  {
    clientCallName: 'client.web.search',
    fullyQualifiedName: 'web.search',
    httpMethod: 'post',
    httpPath: '/web/search',
  },
  {
    clientCallName: 'client.web.webCrawlMd',
    fullyQualifiedName: 'web.webCrawlMd',
    httpMethod: 'post',
    httpPath: '/web/crawl',
  },
  {
    clientCallName: 'client.web.webScrapeHTML',
    fullyQualifiedName: 'web.webScrapeHTML',
    httpMethod: 'get',
    httpPath: '/web/scrape/html',
  },
  {
    clientCallName: 'client.web.webScrapeImages',
    fullyQualifiedName: 'web.webScrapeImages',
    httpMethod: 'get',
    httpPath: '/web/scrape/images',
  },
  {
    clientCallName: 'client.web.webScrapeMd',
    fullyQualifiedName: 'web.webScrapeMd',
    httpMethod: 'get',
    httpPath: '/web/scrape/markdown',
  },
  {
    clientCallName: 'client.web.webScrapeSitemap',
    fullyQualifiedName: 'web.webScrapeSitemap',
    httpMethod: 'get',
    httpPath: '/web/scrape/sitemap',
  },
  {
    clientCallName: 'client.ai.extractProduct',
    fullyQualifiedName: 'ai.extractProduct',
    httpMethod: 'post',
    httpPath: '/brand/ai/product',
  },
  {
    clientCallName: 'client.ai.extractProducts',
    fullyQualifiedName: 'ai.extractProducts',
    httpMethod: 'post',
    httpPath: '/brand/ai/products',
  },
  {
    clientCallName: 'client.brand.retrieve',
    fullyQualifiedName: 'brand.retrieve',
    httpMethod: 'post',
    httpPath: '/brand/retrieve',
  },
  {
    clientCallName: 'client.brand.retrieveSimplified',
    fullyQualifiedName: 'brand.retrieveSimplified',
    httpMethod: 'get',
    httpPath: '/brand/retrieve-simplified',
  },
  {
    clientCallName: 'client.brand.search',
    fullyQualifiedName: 'brand.search',
    httpMethod: 'get',
    httpPath: '/brand/search',
  },
  {
    clientCallName: 'client.industry.retrieveNaics',
    fullyQualifiedName: 'industry.retrieveNaics',
    httpMethod: 'get',
    httpPath: '/web/naics',
  },
  {
    clientCallName: 'client.industry.retrieveSic',
    fullyQualifiedName: 'industry.retrieveSic',
    httpMethod: 'get',
    httpPath: '/web/sic',
  },
  {
    clientCallName: 'client.utility.prefetch',
    fullyQualifiedName: 'utility.prefetch',
    httpMethod: 'post',
    httpPath: '/utility/prefetch',
  },
  {
    clientCallName: 'client.monitors.create',
    fullyQualifiedName: 'monitors.create',
    httpMethod: 'post',
    httpPath: '/monitors',
  },
  {
    clientCallName: 'client.monitors.retrieve',
    fullyQualifiedName: 'monitors.retrieve',
    httpMethod: 'get',
    httpPath: '/monitors/{monitor_id}',
  },
  {
    clientCallName: 'client.monitors.update',
    fullyQualifiedName: 'monitors.update',
    httpMethod: 'patch',
    httpPath: '/monitors/{monitor_id}',
  },
  {
    clientCallName: 'client.monitors.list',
    fullyQualifiedName: 'monitors.list',
    httpMethod: 'get',
    httpPath: '/monitors',
  },
  {
    clientCallName: 'client.monitors.delete',
    fullyQualifiedName: 'monitors.delete',
    httpMethod: 'delete',
    httpPath: '/monitors/{monitor_id}',
  },
  {
    clientCallName: 'client.monitors.getCreditUsage',
    fullyQualifiedName: 'monitors.getCreditUsage',
    httpMethod: 'get',
    httpPath: '/monitors/credit-usage',
  },
  {
    clientCallName: 'client.monitors.getLimits',
    fullyQualifiedName: 'monitors.getLimits',
    httpMethod: 'get',
    httpPath: '/monitors/limits',
  },
  {
    clientCallName: 'client.monitors.listAccountChanges',
    fullyQualifiedName: 'monitors.listAccountChanges',
    httpMethod: 'get',
    httpPath: '/monitors/changes',
  },
  {
    clientCallName: 'client.monitors.listAccountRuns',
    fullyQualifiedName: 'monitors.listAccountRuns',
    httpMethod: 'get',
    httpPath: '/monitors/runs',
  },
  {
    clientCallName: 'client.monitors.listChanges',
    fullyQualifiedName: 'monitors.listChanges',
    httpMethod: 'get',
    httpPath: '/monitors/{monitor_id}/changes',
  },
  {
    clientCallName: 'client.monitors.listRuns',
    fullyQualifiedName: 'monitors.listRuns',
    httpMethod: 'get',
    httpPath: '/monitors/{monitor_id}/runs',
  },
  {
    clientCallName: 'client.monitors.retrieveChange',
    fullyQualifiedName: 'monitors.retrieveChange',
    httpMethod: 'get',
    httpPath: '/monitors/changes/{change_id}',
  },
  {
    clientCallName: 'client.monitors.run',
    fullyQualifiedName: 'monitors.run',
    httpMethod: 'post',
    httpPath: '/monitors/{monitor_id}/run',
  },
  {
    clientCallName: 'client.batch.retrieve',
    fullyQualifiedName: 'batch.retrieve',
    httpMethod: 'get',
    httpPath: '/batch/{batch_id}',
  },
  {
    clientCallName: 'client.batch.list',
    fullyQualifiedName: 'batch.list',
    httpMethod: 'get',
    httpPath: '/batch/list',
  },
  {
    clientCallName: 'client.batch.delete',
    fullyQualifiedName: 'batch.delete',
    httpMethod: 'delete',
    httpPath: '/batch/{batch_id}',
  },
  {
    clientCallName: 'client.batch.cancel',
    fullyQualifiedName: 'batch.cancel',
    httpMethod: 'post',
    httpPath: '/batch/{batch_id}/cancel',
  },
  {
    clientCallName: 'client.batch.getResults',
    fullyQualifiedName: 'batch.getResults',
    httpMethod: 'get',
    httpPath: '/batch/{batch_id}/results',
  },
  {
    clientCallName: 'client.batch.submit',
    fullyQualifiedName: 'batch.submit',
    httpMethod: 'post',
    httpPath: '/batch/submit',
  },
  {
    clientCallName: 'client.people.enrich',
    fullyQualifiedName: 'people.enrich',
    httpMethod: 'post',
    httpPath: '/people/enrich',
  },
  {
    clientCallName: 'client.news.search',
    fullyQualifiedName: 'news.search',
    httpMethod: 'post',
    httpPath: '/news/search',
  },
];

function allowedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  if (!options) {
    return undefined;
  }

  let allowedMethods: SdkMethod[];

  if (options.codeAllowHttpGets || options.codeAllowedMethods) {
    // Start with nothing allowed and then add into it from options
    let allowedMethodsSet = new Set<SdkMethod>();

    if (options.codeAllowHttpGets) {
      // Add all methods that map to an HTTP GET
      sdkMethods
        .filter((method) => method.httpMethod === 'get')
        .forEach((method) => allowedMethodsSet.add(method));
    }

    if (options.codeAllowedMethods) {
      // Add all methods that match any of the allowed regexps
      const allowedRegexps = options.codeAllowedMethods.map((pattern) => {
        try {
          return new RegExp(pattern);
        } catch (e) {
          throw new Error(
            `Invalid regex pattern for allowed method: "${pattern}": ${e instanceof Error ? e.message : e}`,
          );
        }
      });

      sdkMethods
        .filter((method) => allowedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)))
        .forEach((method) => allowedMethodsSet.add(method));
    }

    allowedMethods = Array.from(allowedMethodsSet);
  } else {
    // Start with everything allowed
    allowedMethods = [...sdkMethods];
  }

  if (options.codeBlockedMethods) {
    // Filter down based on blocked regexps
    const blockedRegexps = options.codeBlockedMethods.map((pattern) => {
      try {
        return new RegExp(pattern);
      } catch (e) {
        throw new Error(
          `Invalid regex pattern for blocked method: "${pattern}": ${e instanceof Error ? e.message : e}`,
        );
      }
    });

    allowedMethods = allowedMethods.filter(
      (method) => !blockedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)),
    );
  }

  return allowedMethods;
}

export function blockedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  const allowedMethods = allowedMethodsForCodeTool(options);
  if (!allowedMethods) {
    return undefined;
  }

  const allowedSet = new Set(allowedMethods.map((method) => method.fullyQualifiedName));

  // Return any methods that are not explicitly allowed
  return sdkMethods.filter((method) => !allowedSet.has(method.fullyQualifiedName));
}
