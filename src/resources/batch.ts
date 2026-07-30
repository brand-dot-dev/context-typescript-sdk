// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Batch extends APIResource {
  /**
   * Check progress and get download links when the batch finishes. Also returns the
   * rejected-URL list and webhook signing secret from submission, so nothing is lost
   * if the submit response was dropped.
   *
   * @example
   * ```ts
   * const batch = await client.batch.retrieve('batch_9f2c8a');
   * ```
   */
  retrieve(batchID: string, options?: RequestOptions): APIPromise<BatchRetrieveResponse> {
    return this._client.get(path`/batch/${batchID}`, options);
  }

  /**
   * List your batches from newest to oldest. Filter by status or continue with a
   * cursor.
   *
   * @example
   * ```ts
   * const batches = await client.batch.list();
   * ```
   */
  list(
    query: BatchListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<BatchListResponse> {
    return this._client.get('/batch/list', { query, ...options });
  }

  /**
   * Stop a batch from starting new pages. In-progress pages finish, and unused
   * credits are refunded.
   *
   * @example
   * ```ts
   * const response = await client.batch.cancel('batch_9f2c8a');
   * ```
   */
  cancel(batchID: string, options?: RequestOptions): APIPromise<BatchCancelResponse> {
    return this._client.post(path`/batch/${batchID}/cancel`, options);
  }

  /**
   * Page through the result records of a finished batch as JSON, in the same order
   * as the downloadable result files. Use this instead of downloading and parsing
   * the NDJSON files yourself.
   *
   * @example
   * ```ts
   * const response = await client.batch.getResults(
   *   'batch_9f2c8a',
   * );
   * ```
   */
  getResults(
    batchID: string,
    query: BatchGetResultsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<BatchGetResultsResponse> {
    return this._client.get(path`/batch/${batchID}/results`, { query, ...options });
  }

  /**
   * Retrieve and normalize a person profile from identifiers.
   *
   * @example
   * ```ts
   * const response = await client.batch.submit({
   *   identifiers: {
   *     linkedinUrl:
   *       'https://www.linkedin.com/in/yahia-bakour/',
   *   },
   * });
   * ```
   */
  submit(body: BatchSubmitParams, options?: RequestOptions): APIPromise<BatchSubmitResponse> {
    return this._client.post('/people/retrieve', { body, ...options });
  }
}

export interface BatchRetrieveResponse {
  /**
   * Batch ID used to retrieve or cancel the job.
   */
  id: string;

  /**
   * Reserved and used credits.
   */
  credits: BatchRetrieveResponse.Credits;

  /**
   * Batch-level error. Null unless `status` is `failed`.
   */
  error: BatchRetrieveResponse.Error | null;

  /**
   * Page failures grouped by error code.
   */
  errors: Array<BatchRetrieveResponse.Error>;

  /**
   * Submission counts.
   */
  input: BatchRetrieveResponse.Input;

  /**
   * Rejected URLs, up to 100. These are not charged.
   */
  invalid_urls: Array<BatchRetrieveResponse.InvalidURL>;

  /**
   * How pages are selected.
   */
  mode: 'scrape' | 'crawl';

  /**
   * Current processing counts. Use `status` to check completion.
   */
  progress: BatchRetrieveResponse.Progress;

  /**
   * Download links available when the batch finishes. GET /batch/{batch_id}/results
   * serves the same records as paginated JSON.
   */
  results: BatchRetrieveResponse.Results | null;

  /**
   * Current state. `completed`, `cancelled`, and `failed` are final.
   */
  status: 'queued' | 'running' | 'cancelling' | 'completed' | 'cancelled' | 'failed';

  /**
   * Tags stored on the batch at submission.
   */
  tags: Array<string>;

  timing: BatchRetrieveResponse.Timing;

  /**
   * Output format.
   */
  type: 'markdown' | 'html';

  /**
   * API key usage for this request.
   */
  key_metadata?: BatchRetrieveResponse.KeyMetadata;

  /**
   * Webhook signing secret. Also returned by GET /batch/{batch_id}.
   */
  webhook_secret?: string;
}

export namespace BatchRetrieveResponse {
  /**
   * Reserved and used credits.
   */
  export interface Credits {
    /**
     * Credits used by successful pages.
     */
    charged: number;

    /**
     * Credits reserved when the batch was accepted.
     */
    estimated: number;
  }

  /**
   * Batch-level error. Null unless `status` is `failed`.
   */
  export interface Error {
    /**
     * Batch error code.
     */
    code: string;

    /**
     * Batch error message.
     */
    message: string;
  }

  export interface Error {
    /**
     * Error code for these failures.
     */
    code: string;

    /**
     * Pages that failed with this code.
     */
    count: number;
  }

  /**
   * Submission counts.
   */
  export interface Input {
    /**
     * Pages accepted, or the crawl page limit. Credits are reserved for this count.
     */
    accepted: number;

    /**
     * Duplicate URL and `itemId` pairs skipped. Always 0 for crawls.
     */
    duplicates: number;

    /**
     * Pages rejected during validation.
     */
    invalid: number;

    /**
     * Pages submitted before validation. For a crawl, the page limit.
     */
    submitted: number;
  }

  export interface InvalidURL {
    /**
     * Why it was rejected.
     */
    reason: string;

    /**
     * Rejected URL.
     */
    url: string;
  }

  /**
   * Current processing counts. Use `status` to check completion.
   */
  export interface Progress {
    /**
     * Pages that could not be scraped.
     */
    failed: number;

    /**
     * Accepted pages not yet attempted. Always 0 once the batch completes; a crawl can
     * finish under its page limit when the site has no more reachable pages.
     */
    pending: number;

    /**
     * Pages scraped successfully.
     */
    succeeded: number;
  }

  /**
   * Download links available when the batch finishes. GET /batch/{batch_id}/results
   * serves the same records as paginated JSON.
   */
  export interface Results {
    /**
     * When the download URLs expire.
     */
    expires_at: string;

    /**
     * Result files. Order is not guaranteed.
     */
    files: Array<Results.File>;
  }

  export namespace Results {
    export interface File {
      /**
       * Compressed file size in bytes.
       */
      bytes: number;

      /**
       * Results in this file.
       */
      items: number;

      /**
       * Temporary URL for a gzipped NDJSON file.
       */
      url: string;
    }
  }

  export interface Timing {
    /**
     * When processing finished. Null while active.
     */
    completed_at: string | null;

    /**
     * When the batch was created.
     */
    created_at: string;

    /**
     * When processing started. Null while queued.
     */
    started_at: string | null;
  }

  /**
   * API key usage for this request.
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

export interface BatchListResponse {
  /**
   * Batches on this page.
   */
  data?: Array<BatchListResponse.Data>;

  /**
   * Whether another page is available.
   */
  has_more?: boolean;

  /**
   * Metadata about the API key used for the request. Included in every response
   * whenever a valid API key is provided, even when the response status is not 200.
   */
  key_metadata?: BatchListResponse.KeyMetadata;

  /**
   * Cursor for the next page.
   */
  next_cursor?: string | null;
}

export namespace BatchListResponse {
  /**
   * An asynchronous web scraping job.
   */
  export interface Data {
    /**
     * Batch ID used to retrieve or cancel the job.
     */
    id: string;

    /**
     * Reserved and used credits.
     */
    credits: Data.Credits;

    /**
     * Batch-level error. Null unless `status` is `failed`.
     */
    error: Data.Error | null;

    /**
     * Page failures grouped by error code.
     */
    errors: Array<Data.Error>;

    /**
     * Submission counts.
     */
    input: Data.Input;

    /**
     * How pages are selected.
     */
    mode: 'scrape' | 'crawl';

    /**
     * Current processing counts. Use `status` to check completion.
     */
    progress: Data.Progress;

    /**
     * Download links available when the batch finishes. GET /batch/{batch_id}/results
     * serves the same records as paginated JSON.
     */
    results: Data.Results | null;

    /**
     * Current state. `completed`, `cancelled`, and `failed` are final.
     */
    status: 'queued' | 'running' | 'cancelling' | 'completed' | 'cancelled' | 'failed';

    /**
     * Tags stored on the batch at submission.
     */
    tags: Array<string>;

    timing: Data.Timing;

    /**
     * Output format.
     */
    type: 'markdown' | 'html';
  }

  export namespace Data {
    /**
     * Reserved and used credits.
     */
    export interface Credits {
      /**
       * Credits used by successful pages.
       */
      charged: number;

      /**
       * Credits reserved when the batch was accepted.
       */
      estimated: number;
    }

    /**
     * Batch-level error. Null unless `status` is `failed`.
     */
    export interface Error {
      /**
       * Batch error code.
       */
      code: string;

      /**
       * Batch error message.
       */
      message: string;
    }

    export interface Error {
      /**
       * Error code for these failures.
       */
      code: string;

      /**
       * Pages that failed with this code.
       */
      count: number;
    }

    /**
     * Submission counts.
     */
    export interface Input {
      /**
       * Pages accepted, or the crawl page limit. Credits are reserved for this count.
       */
      accepted: number;

      /**
       * Duplicate URL and `itemId` pairs skipped. Always 0 for crawls.
       */
      duplicates: number;

      /**
       * Pages rejected during validation.
       */
      invalid: number;

      /**
       * Pages submitted before validation. For a crawl, the page limit.
       */
      submitted: number;
    }

    /**
     * Current processing counts. Use `status` to check completion.
     */
    export interface Progress {
      /**
       * Pages that could not be scraped.
       */
      failed: number;

      /**
       * Accepted pages not yet attempted. Always 0 once the batch completes; a crawl can
       * finish under its page limit when the site has no more reachable pages.
       */
      pending: number;

      /**
       * Pages scraped successfully.
       */
      succeeded: number;
    }

    /**
     * Download links available when the batch finishes. GET /batch/{batch_id}/results
     * serves the same records as paginated JSON.
     */
    export interface Results {
      /**
       * When the download URLs expire.
       */
      expires_at: string;

      /**
       * Result files. Order is not guaranteed.
       */
      files: Array<Results.File>;
    }

    export namespace Results {
      export interface File {
        /**
         * Compressed file size in bytes.
         */
        bytes: number;

        /**
         * Results in this file.
         */
        items: number;

        /**
         * Temporary URL for a gzipped NDJSON file.
         */
        url: string;
      }
    }

    export interface Timing {
      /**
       * When processing finished. Null while active.
       */
      completed_at: string | null;

      /**
       * When the batch was created.
       */
      created_at: string;

      /**
       * When processing started. Null while queued.
       */
      started_at: string | null;
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

export interface BatchCancelResponse {
  /**
   * Batch ID used to retrieve or cancel the job.
   */
  id: string;

  /**
   * Reserved and used credits.
   */
  credits: BatchCancelResponse.Credits;

  /**
   * Batch-level error. Null unless `status` is `failed`.
   */
  error: BatchCancelResponse.Error | null;

  /**
   * Page failures grouped by error code.
   */
  errors: Array<BatchCancelResponse.Error>;

  /**
   * Submission counts.
   */
  input: BatchCancelResponse.Input;

  /**
   * How pages are selected.
   */
  mode: 'scrape' | 'crawl';

  /**
   * Current processing counts. Use `status` to check completion.
   */
  progress: BatchCancelResponse.Progress;

  /**
   * Download links available when the batch finishes. GET /batch/{batch_id}/results
   * serves the same records as paginated JSON.
   */
  results: BatchCancelResponse.Results | null;

  /**
   * Current state. `completed`, `cancelled`, and `failed` are final.
   */
  status: 'queued' | 'running' | 'cancelling' | 'completed' | 'cancelled' | 'failed';

  /**
   * Tags stored on the batch at submission.
   */
  tags: Array<string>;

  timing: BatchCancelResponse.Timing;

  /**
   * Output format.
   */
  type: 'markdown' | 'html';

  /**
   * API key usage for this request.
   */
  key_metadata?: BatchCancelResponse.KeyMetadata;
}

export namespace BatchCancelResponse {
  /**
   * Reserved and used credits.
   */
  export interface Credits {
    /**
     * Credits used by successful pages.
     */
    charged: number;

    /**
     * Credits reserved when the batch was accepted.
     */
    estimated: number;
  }

  /**
   * Batch-level error. Null unless `status` is `failed`.
   */
  export interface Error {
    /**
     * Batch error code.
     */
    code: string;

    /**
     * Batch error message.
     */
    message: string;
  }

  export interface Error {
    /**
     * Error code for these failures.
     */
    code: string;

    /**
     * Pages that failed with this code.
     */
    count: number;
  }

  /**
   * Submission counts.
   */
  export interface Input {
    /**
     * Pages accepted, or the crawl page limit. Credits are reserved for this count.
     */
    accepted: number;

    /**
     * Duplicate URL and `itemId` pairs skipped. Always 0 for crawls.
     */
    duplicates: number;

    /**
     * Pages rejected during validation.
     */
    invalid: number;

    /**
     * Pages submitted before validation. For a crawl, the page limit.
     */
    submitted: number;
  }

  /**
   * Current processing counts. Use `status` to check completion.
   */
  export interface Progress {
    /**
     * Pages that could not be scraped.
     */
    failed: number;

    /**
     * Accepted pages not yet attempted. Always 0 once the batch completes; a crawl can
     * finish under its page limit when the site has no more reachable pages.
     */
    pending: number;

    /**
     * Pages scraped successfully.
     */
    succeeded: number;
  }

  /**
   * Download links available when the batch finishes. GET /batch/{batch_id}/results
   * serves the same records as paginated JSON.
   */
  export interface Results {
    /**
     * When the download URLs expire.
     */
    expires_at: string;

    /**
     * Result files. Order is not guaranteed.
     */
    files: Array<Results.File>;
  }

  export namespace Results {
    export interface File {
      /**
       * Compressed file size in bytes.
       */
      bytes: number;

      /**
       * Results in this file.
       */
      items: number;

      /**
       * Temporary URL for a gzipped NDJSON file.
       */
      url: string;
    }
  }

  export interface Timing {
    /**
     * When processing finished. Null while active.
     */
    completed_at: string | null;

    /**
     * When the batch was created.
     */
    created_at: string;

    /**
     * When processing started. Null while queued.
     */
    started_at: string | null;
  }

  /**
   * API key usage for this request.
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

export interface BatchGetResultsResponse {
  /**
   * Result records on this page.
   */
  data?: Array<BatchGetResultsResponse.Ok | BatchGetResultsResponse.Error>;

  /**
   * Whether another page is available.
   */
  has_more?: boolean;

  /**
   * Metadata about the API key used for the request. Included in every response
   * whenever a valid API key is provided, even when the response status is not 200.
   */
  key_metadata?: BatchGetResultsResponse.KeyMetadata;

  /**
   * Cursor for the next page.
   */
  next_cursor?: string | null;
}

export namespace BatchGetResultsResponse {
  /**
   * A page the batch fetched successfully.
   */
  export interface Ok {
    /**
     * URL the content was read from, after redirects.
     */
    final_url: string;

    /**
     * HTTP status of the final response, when known.
     */
    http_status: number | null;

    /**
     * Metadata extracted from the scraped page HTML.
     */
    metadata: Ok.Metadata;

    /**
     * The page was scraped.
     */
    status: 'ok';

    /**
     * URL as submitted, or as discovered by the crawl.
     */
    url: string;

    /**
     * Raw page HTML. Present on html batches.
     */
    html?: string;

    /**
     * Caller-supplied identifier echoed from submission.
     */
    itemId?: string;

    /**
     * Page content as Markdown. Present on markdown batches.
     */
    markdown?: string;

    /**
     * Caller-supplied metadata echoed from submission.
     */
    meta?: { [key: string]: unknown };
  }

  export namespace Ok {
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
  }

  /**
   * A page the batch could not fetch.
   */
  export interface Error {
    /**
     * Why the page failed.
     */
    error_code: string;

    /**
     * Human-readable failure detail.
     */
    message: string;

    /**
     * The page could not be scraped.
     */
    status: 'error';

    /**
     * URL as submitted, or as discovered by the crawl.
     */
    url: string;

    /**
     * Caller-supplied identifier echoed from submission.
     */
    itemId?: string;

    /**
     * Caller-supplied metadata echoed from submission.
     */
    meta?: { [key: string]: unknown };
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

export interface BatchSubmitResponse {
  /**
   * HTTP status code.
   */
  code: 200;

  /**
   * Additional response details.
   */
  metadata: BatchSubmitResponse.Metadata;

  /**
   * Retrieved person profile.
   */
  person: BatchSubmitResponse.Person;

  /**
   * Response status.
   */
  status: 'ok';

  /**
   * Metadata about the API key used for the request. Included in every response
   * whenever a valid API key is provided, even when the response status is not 200.
   */
  key_metadata?: BatchSubmitResponse.KeyMetadata;
}

export namespace BatchSubmitResponse {
  /**
   * Additional response details.
   */
  export interface Metadata {
    /**
     * Identifiers returned for the person.
     */
    identifiers: Metadata.Identifiers;

    /**
     * Source categories checked.
     */
    sourcesAttempted: Array<'linkedin' | 'cv' | 'manual' | 'github' | 'other'>;

    /**
     * Source categories with data.
     */
    sourcesSucceeded: Array<'linkedin' | 'cv' | 'manual' | 'github' | 'other'>;

    /**
     * URLs reviewed for this profile.
     */
    urlsAnalyzed: Array<string>;

    /**
     * Personal website URL, when found.
     */
    personalWebsiteUrl?: string;
  }

  export namespace Metadata {
    /**
     * Identifiers returned for the person.
     */
    export interface Identifiers {
      /**
       * LinkedIn profile URL.
       */
      linkedinUrl?: string;
    }
  }

  /**
   * Retrieved person profile.
   */
  export interface Person {
    /**
     * Education history.
     */
    education: Array<Person.Education>;

    /**
     * Work history.
     */
    experience: Array<Person.Experience>;

    /**
     * Core profile details.
     */
    profile: Person.Profile;

    /**
     * Listed skills.
     */
    skills: Array<Person.Skill>;
  }

  export namespace Person {
    export interface Education {
      /**
       * School or institution name.
       */
      institution: Education.Institution;

      /**
       * Education dates.
       */
      dates?: Education.Dates;

      /**
       * Additional education details.
       */
      description?: string;

      /**
       * Area of study.
       */
      fieldOfStudy?: string;

      /**
       * Degree, certificate, or credential.
       */
      qualification?: string;
    }

    export namespace Education {
      /**
       * School or institution name.
       */
      export interface Institution {
        /**
         * Display name.
         */
        display: string;

        /**
         * Standardized name, when available.
         */
        normalized?: string;
      }

      /**
       * Education dates.
       */
      export interface Dates {
        /**
         * End date, when known.
         */
        endDate?: Dates.EndDate;

        /**
         * Whether the entry is current.
         */
        isCurrent?: boolean;

        /**
         * Start date, when known.
         */
        startDate?: Dates.StartDate;
      }

      export namespace Dates {
        /**
         * End date, when known.
         */
        export interface EndDate {
          /**
           * Year value.
           */
          year: number;

          /**
           * Day value, when known.
           */
          day?: number;

          /**
           * Month value, when known.
           */
          month?: number;
        }

        /**
         * Start date, when known.
         */
        export interface StartDate {
          /**
           * Year value.
           */
          year: number;

          /**
           * Day value, when known.
           */
          day?: number;

          /**
           * Month value, when known.
           */
          month?: number;
        }
      }
    }

    export interface Experience {
      /**
       * Company or organization name.
       */
      company: Experience.Company;

      /**
       * Role or job title.
       */
      title: string;

      /**
       * Role dates.
       */
      dates?: Experience.Dates;

      /**
       * Role description.
       */
      description?: string;
    }

    export namespace Experience {
      /**
       * Company or organization name.
       */
      export interface Company {
        /**
         * Display name.
         */
        display: string;

        /**
         * Standardized name, when available.
         */
        normalized?: string;
      }

      /**
       * Role dates.
       */
      export interface Dates {
        /**
         * End date, when known.
         */
        endDate?: Dates.EndDate;

        /**
         * Whether the entry is current.
         */
        isCurrent?: boolean;

        /**
         * Start date, when known.
         */
        startDate?: Dates.StartDate;
      }

      export namespace Dates {
        /**
         * End date, when known.
         */
        export interface EndDate {
          /**
           * Year value.
           */
          year: number;

          /**
           * Day value, when known.
           */
          day?: number;

          /**
           * Month value, when known.
           */
          month?: number;
        }

        /**
         * Start date, when known.
         */
        export interface StartDate {
          /**
           * Year value.
           */
          year: number;

          /**
           * Day value, when known.
           */
          day?: number;

          /**
           * Month value, when known.
           */
          month?: number;
        }
      }
    }

    /**
     * Core profile details.
     */
    export interface Profile {
      /**
       * Person's full name.
       */
      fullName?: string;

      /**
       * Short professional headline.
       */
      headline?: string;

      /**
       * Person's listed location.
       */
      location?: string;

      /**
       * Profile image URL.
       */
      profilePictureUrl?: string;

      /**
       * Brief profile summary.
       */
      summary?: string;
    }

    export interface Skill {
      /**
       * Skill name.
       */
      name: string;

      /**
       * Standardized skill name, when available.
       */
      normalized?: string;

      /**
       * Skill proficiency, when available.
       */
      proficiency?: string;
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

export interface BatchListParams {
  /**
   * Cursor from the previous page.
   */
  cursor?: string;

  /**
   * Batches per page. Defaults to 25.
   */
  limit?: number;

  /**
   * Free-text search term, matched against the batch id, crawl source (start URL or
   * sitemap domain), and tags.
   */
  q?: string;

  /**
   * `prefix` for as-you-type prefix matching (default), `exact` for full-token
   * matching.
   */
  search_type?: 'exact' | 'prefix';

  /**
   * Filter by status.
   */
  status?: 'queued' | 'running' | 'cancelling' | 'completed' | 'cancelled' | 'failed';

  /**
   * Comma-separated list of tags to filter by (matches batches having any of them).
   */
  tags?: string;
}

export interface BatchGetResultsParams {
  /**
   * next_cursor from the previous page.
   */
  cursor?: string;

  /**
   * Records per page. Defaults to 25. A page can close early so its payload stays
   * under ~8 MB; rely on next_cursor rather than counting records.
   */
  limit?: number;
}

export interface BatchSubmitParams {
  /**
   * Known identifiers for the person. At least one identifier is required.
   */
  identifiers: BatchSubmitParams.Identifiers;

  /**
   * Optional tags for tracking usage. Up to 20 tags, each 1 to 50 characters.
   */
  tags?: Array<string>;

  /**
   * Optional timeout in milliseconds for the request. If the request takes longer
   * than this value, it will be aborted with a 408 status code. Maximum allowed
   * value is 300000ms (5 minutes).
   */
  timeoutMS?: number;
}

export namespace BatchSubmitParams {
  /**
   * Known identifiers for the person. At least one identifier is required.
   */
  export interface Identifiers {
    /**
     * LinkedIn profile URL, e.g. https://www.linkedin.com/in/yahia-bakour/.
     */
    linkedinUrl?: string;
  }
}

export declare namespace Batch {
  export {
    type BatchRetrieveResponse as BatchRetrieveResponse,
    type BatchListResponse as BatchListResponse,
    type BatchCancelResponse as BatchCancelResponse,
    type BatchGetResultsResponse as BatchGetResultsResponse,
    type BatchSubmitResponse as BatchSubmitResponse,
    type BatchListParams as BatchListParams,
    type BatchGetResultsParams as BatchGetResultsParams,
    type BatchSubmitParams as BatchSubmitParams,
  };
}
