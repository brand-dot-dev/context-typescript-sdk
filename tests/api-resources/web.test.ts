// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import ContextDev from 'context.dev';

const client = new ContextDev({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource web', () => {
  // Mock server tests are disabled
  test.skip('extractFonts', async () => {
    const responsePromise = client.web.extractFonts();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('extractFonts: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.web.extractFonts(
        {
          directUrl: 'https://example.com',
          domain: 'domain',
          timeoutMS: 1000,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(ContextDev.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('extractStyleguide', async () => {
    const responsePromise = client.web.extractStyleguide();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('extractStyleguide: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.web.extractStyleguide(
        {
          directUrl: 'https://example.com',
          domain: 'domain',
          timeoutMS: 1000,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(ContextDev.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('screenshot', async () => {
    const responsePromise = client.web.screenshot();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('screenshot: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.web.screenshot(
        {
          directUrl: 'https://example.com',
          domain: 'domain',
          fullScreenshot: 'true',
          page: 'login',
          prioritize: 'speed',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(ContextDev.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('webCrawlMd: only required params', async () => {
    const responsePromise = client.web.webCrawlMd({ url: 'https://example.com' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('webCrawlMd: required and optional params', async () => {
    const response = await client.web.webCrawlMd({
      url: 'https://example.com',
      followSubdomains: true,
      includeImages: true,
      includeLinks: true,
      maxDepth: 0,
      maxPages: 1,
      shortenBase64Images: true,
      urlRegex: 'urlRegex',
      useMainContentOnly: true,
    });
  });

  // Mock server tests are disabled
  test.skip('webScrapeHTML: only required params', async () => {
    const responsePromise = client.web.webScrapeHTML({ url: 'https://example.com' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('webScrapeHTML: required and optional params', async () => {
    const response = await client.web.webScrapeHTML({ url: 'https://example.com', maxAgeMs: 0 });
  });

  // Mock server tests are disabled
  test.skip('webScrapeImages: only required params', async () => {
    const responsePromise = client.web.webScrapeImages({ url: 'https://example.com' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('webScrapeImages: required and optional params', async () => {
    const response = await client.web.webScrapeImages({ url: 'https://example.com' });
  });

  // Mock server tests are disabled
  test.skip('webScrapeMd: only required params', async () => {
    const responsePromise = client.web.webScrapeMd({ url: 'https://example.com' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('webScrapeMd: required and optional params', async () => {
    const response = await client.web.webScrapeMd({
      url: 'https://example.com',
      includeImages: true,
      includeLinks: true,
      maxAgeMs: 0,
      shortenBase64Images: true,
      useMainContentOnly: true,
    });
  });

  // Mock server tests are disabled
  test.skip('webScrapeSitemap: only required params', async () => {
    const responsePromise = client.web.webScrapeSitemap({ domain: 'domain' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('webScrapeSitemap: required and optional params', async () => {
    const response = await client.web.webScrapeSitemap({ domain: 'domain', maxLinks: 1 });
  });
});
