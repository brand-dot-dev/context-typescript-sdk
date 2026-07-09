// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Monitor pages, sitemaps, and extracted website data for exact or semantic changes. The change.detected webhook payload is documented by the MonitorsChangeDetectedWebhookPayload schema.
 */
export class Monitors extends APIResource {
  /**
   * Creates a monitor. The request body is a union of the supported target/change
   * detection combinations. The monitor runs immediately after creation to create
   * its initial baseline.
   *
   * @example
   * ```ts
   * const monitor = await client.monitors.create({
   *   change_detection: { type: 'exact' },
   *   name: 'Acme pricing page',
   *   schedule: {
   *     type: 'interval',
   *     frequency: 6,
   *     unit: 'hours',
   *   },
   *   target: { type: 'page', url: 'https://acme.com/pricing' },
   *   mode: 'web',
   *   webhook: { url: 'https://example.com/webhook' },
   * });
   * ```
   */
  create(body: MonitorCreateParams, options?: RequestOptions): APIPromise<MonitorCreateResponse> {
    return this._client.post('/monitors', { body, ...options });
  }

  /**
   * Get a monitor
   *
   * @example
   * ```ts
   * const monitor = await client.monitors.retrieve('mon_123');
   * ```
   */
  retrieve(monitorID: string, options?: RequestOptions): APIPromise<MonitorRetrieveResponse> {
    return this._client.get(path`/monitors/${monitorID}`, options);
  }

  /**
   * Updates a monitor. If `target` or `change_detection` changes, the monitor
   * creates a new baseline. Unsupported target/change detection combinations are
   * rejected.
   *
   * @example
   * ```ts
   * const monitor = await client.monitors.update('mon_123', {
   *   name: 'Acme pricing monitor',
   *   schedule: {
   *     type: 'interval',
   *     frequency: 1,
   *     unit: 'hours',
   *   },
   *   status: 'active',
   *   webhook: { url: 'https://example.com/webhook' },
   * });
   * ```
   */
  update(
    monitorID: string,
    body: MonitorUpdateParams,
    options?: RequestOptions,
  ): APIPromise<MonitorUpdateResponse> {
    return this._client.patch(path`/monitors/${monitorID}`, { body, ...options });
  }

  /**
   * Lists monitors for the authenticated organization. Supports free-text search
   * (`q` over `search_by` fields, `prefix` or `exact` via `search_type`) plus
   * status/type/tag filters. Results are paginated via the opaque `cursor`.
   *
   * @example
   * ```ts
   * const monitors = await client.monitors.list();
   * ```
   */
  list(
    query: MonitorListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MonitorListResponse> {
    return this._client.get('/monitors', { query, ...options });
  }

  /**
   * Delete a monitor
   *
   * @example
   * ```ts
   * const monitor = await client.monitors.delete('mon_123');
   * ```
   */
  delete(monitorID: string, options?: RequestOptions): APIPromise<MonitorDeleteResponse> {
    return this._client.delete(path`/monitors/${monitorID}`, options);
  }

  /**
   * Returns an account-wide feed of detected changes across monitors.
   *
   * @example
   * ```ts
   * const response = await client.monitors.listAccountChanges();
   * ```
   */
  listAccountChanges(
    query: MonitorListAccountChangesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MonitorListAccountChangesResponse> {
    return this._client.get('/monitors/changes', { query, ...options });
  }

  /**
   * Returns an account-wide feed of monitor runs across all monitors.
   *
   * @example
   * ```ts
   * const response = await client.monitors.listAccountRuns();
   * ```
   */
  listAccountRuns(
    query: MonitorListAccountRunsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MonitorListAccountRunsResponse> {
    return this._client.get('/monitors/runs', { query, ...options });
  }

  /**
   * List changes for a monitor
   *
   * @example
   * ```ts
   * const response = await client.monitors.listChanges(
   *   'mon_123',
   * );
   * ```
   */
  listChanges(
    monitorID: string,
    query: MonitorListChangesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MonitorListChangesResponse> {
    return this._client.get(path`/monitors/${monitorID}/changes`, { query, ...options });
  }

  /**
   * List monitor runs
   *
   * @example
   * ```ts
   * const response = await client.monitors.listRuns('mon_123');
   * ```
   */
  listRuns(
    monitorID: string,
    query: MonitorListRunsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MonitorListRunsResponse> {
    return this._client.get(path`/monitors/${monitorID}/runs`, { query, ...options });
  }

  /**
   * Get a change
   *
   * @example
   * ```ts
   * const response = await client.monitors.retrieveChange(
   *   'chg_123',
   * );
   * ```
   */
  retrieveChange(changeID: string, options?: RequestOptions): APIPromise<MonitorRetrieveChangeResponse> {
    return this._client.get(path`/monitors/changes/${changeID}`, options);
  }

  /**
   * Triggers an immediate run of the monitor outside its normal schedule. The run is
   * queued and processed asynchronously.
   *
   * @example
   * ```ts
   * const response = await client.monitors.run('mon_123');
   * ```
   */
  run(monitorID: string, options?: RequestOptions): APIPromise<MonitorRunResponse> {
    return this._client.post(path`/monitors/${monitorID}/run`, options);
  }
}

/**
 * A web monitor. `mode` is the constant `web`; behavior is described by `target`
 * (page/sitemap/extract) and `change_detection` (exact/semantic).
 */
export interface MonitorCreateResponse {
  id: string;

  /**
   * Discriminated union describing how changes are detected.
   */
  change_detection:
    | MonitorCreateResponse.MonitorsExactChangeDetection
    | MonitorCreateResponse.MonitorsSemanticChangeDetection;

  created_at: string;

  /**
   * Top-level monitor category. Always `web` today; the concrete behavior is
   * described by `target` and `change_detection`.
   */
  mode: 'web';

  name: string;

  /**
   * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
   * every 6 hours or every 2 days. The total interval (frequency × unit) must be
   * between 10 minutes and 1 year.
   */
  schedule: MonitorCreateResponse.Schedule;

  /**
   * Monitor lifecycle status. `failed` means the most recent run failed (see the
   * monitor's `last_error`); failed monitors keep running on schedule and flip back
   * to `active` on the next successful run. Monitors are auto-`paused` after
   * repeated consecutive failures or insufficient-credit skips; resume by PATCHing
   * status to `active`.
   */
  status: 'active' | 'paused' | 'failed';

  /**
   * Discriminated union describing what the monitor watches.
   */
  target:
    | MonitorCreateResponse.MonitorsPageTarget
    | MonitorCreateResponse.MonitorsSitemapTarget
    | MonitorCreateResponse.MonitorsExtractTarget;

  updated_at: string;

  /**
   * Current baseline: the last observed value the monitor compares new snapshots
   * against. Its shape follows `target.type` (page/sitemap/extract). Only populated
   * on GET /monitors/{monitor_id}; null until the first baseline run completes (and
   * after a target or change_detection update, which resets the baseline).
   */
  baseline?:
    | MonitorCreateResponse.MonitorsPageBaseline
    | MonitorCreateResponse.MonitorsSitemapBaseline
    | MonitorCreateResponse.MonitorsExtractBaseline
    | null;

  last_change_at?: string | null;

  /**
   * Error from the most recent failed run; null when the last run succeeded.
   */
  last_error?: MonitorCreateResponse.LastError | null;

  last_run_at?: string | null;

  /**
   * When the next scheduled run is due.
   */
  next_run_at?: string | null;

  /**
   * User-defined tags for grouping and filtering monitors and their changes.
   */
  tags?: Array<string>;

  webhook?: MonitorCreateResponse.Webhook | null;
}

export namespace MonitorCreateResponse {
  /**
   * Detect exact changes. For page targets, this means visible text diffs. For
   * sitemap targets, this means URL additions and removals.
   */
  export interface MonitorsExactChangeDetection {
    type: 'exact';
  }

  /**
   * Detect meaning-level changes to tracked page content, ignoring cosmetic or
   * paraphrase-only differences. Which changes are meaningful is judged against the
   * extract target's `instructions` (and `schema`, when provided).
   */
  export interface MonitorsSemanticChangeDetection {
    type: 'semantic';

    confidence_threshold?: number;
  }

  /**
   * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
   * every 6 hours or every 2 days. The total interval (frequency × unit) must be
   * between 10 minutes and 1 year.
   */
  export interface Schedule {
    /**
     * Number of units between runs. The resulting interval (frequency × unit) must be
     * at least 10 minutes and at most 1 year (e.g. minimum 10 when unit is minutes;
     * maximum 365 when unit is days).
     */
    frequency: number;

    type: 'interval';

    unit: 'minutes' | 'hours' | 'days';
  }

  /**
   * Watch a single web page.
   */
  export interface MonitorsPageTarget {
    type: 'page';

    url: string;

    /**
     * Normalize whitespace before comparing or analyzing text.
     */
    normalize_whitespace?: boolean;
  }

  /**
   * Watch a sitemap for URL additions and removals. Crawled URLs are normalized
   * (lowercased host, no trailing slash/fragment) and scoped to the monitored site
   * and its subdomains before comparison. On a detected difference the sitemap is
   * re-fetched within the same run and only URLs both observations agree on are
   * reported, suppressing transient crawl flaps.
   */
  export interface MonitorsSitemapTarget {
    type: 'sitemap';

    /**
     * Sitemap URL to monitor.
     */
    url: string;

    /**
     * URL path patterns to exclude.
     */
    exclude?: Array<string>;

    /**
     * URL path patterns to include.
     */
    include?: Array<string>;

    /**
     * Maximum number of sitemap URLs to track (capped at 10,000).
     */
    max_urls?: number;
  }

  /**
   * Watch the monitor-relevant pages of a site for meaningful changes. A crawl
   * guided by `schema`/`instructions` selects up to `max_pages` relevant pages to
   * track; each run re-checks exactly those pages, and confirmed content changes are
   * judged for relevance against the monitor's `instructions` (and `schema`, when
   * provided). The tracked page set is refreshed by a periodic re-discovery crawl.
   */
  export interface MonitorsExtractTarget {
    /**
     * Natural-language instructions guiding which pages and facts to track and which
     * changes to report.
     */
    instructions: string;

    type: 'extract';

    /**
     * Root URL to extract structured data from.
     */
    url: string;

    follow_subdomains?: boolean;

    /**
     * Optional maximum link depth from the starting URL (0 = only the starting page).
     */
    max_depth?: number;

    /**
     * Maximum number of pages to track.
     */
    max_pages?: number;

    /**
     * JSON Schema describing the data you care about. It is used three ways: it guides
     * which pages are selected for tracking, it gives the change judge extra context
     * on which changes matter (alongside `instructions`), and it defines the shape of
     * the baseline `data` snapshot on GET /monitors/{monitor_id} (refreshed at most
     * about once a day). It is not a response format for changes: change events and
     * webhook payloads always contain diffs, summaries, and evidence excerpts — never
     * data in this schema's shape. If omitted, a default summary + key-points schema
     * is used.
     */
    schema?: { [key: string]: unknown };
  }

  /**
   * Current baseline of a `page` monitor: the visible page text as last observed.
   */
  export interface MonitorsPageBaseline {
    /**
     * When this baseline was last captured or replaced.
     */
    captured_at: string;

    /**
     * The page's visible text as last observed.
     */
    text: string;
  }

  /**
   * Current baseline of a `sitemap` monitor: the normalized URL set as last
   * observed.
   */
  export interface MonitorsSitemapBaseline {
    /**
     * When this baseline was last captured or replaced.
     */
    captured_at: string;

    /**
     * Number of URLs in the baseline.
     */
    url_count: number;

    /**
     * The sitemap URLs as last observed (sorted, normalized).
     */
    urls: Array<string>;
  }

  /**
   * Current baseline of an `extract` monitor: the pages it tracks and the structured
   * data as last extracted.
   */
  export interface MonitorsExtractBaseline {
    /**
     * When this baseline was last captured or replaced.
     */
    captured_at: string;

    /**
     * The extracted structured data, matching the monitor's extraction schema (same
     * shape as the /web/extract endpoint's `data`). Refreshed when the monitor
     * re-discovers its page set (at most about once a day); `null` when no extraction
     * has been captured yet.
     */
    data: unknown;

    /**
     * The page URLs the monitor tracks and analyzes for changes.
     */
    urls_analyzed: Array<string>;
  }

  /**
   * Error from the most recent failed run; null when the last run succeeded.
   */
  export interface LastError {
    code: string;

    message: string;
  }

  export interface Webhook {
    /**
     * Webhook URL called when a change is detected.
     */
    url: string;

    /**
     * Signing secret used to verify webhook authenticity. Each delivery includes an
     * `X-Context-Signature: t=<unix>,v1=<hmac>` header, where the HMAC is SHA-256 over
     * `"{t}.{rawRequestBody}"` keyed by this secret. Recompute it with a constant-time
     * compare and reject stale timestamps to prevent replay. Generated by the API;
     * cannot be set by clients.
     */
    secret?: string;
  }
}

/**
 * A web monitor. `mode` is the constant `web`; behavior is described by `target`
 * (page/sitemap/extract) and `change_detection` (exact/semantic).
 */
export interface MonitorRetrieveResponse {
  id: string;

  /**
   * Discriminated union describing how changes are detected.
   */
  change_detection:
    | MonitorRetrieveResponse.MonitorsExactChangeDetection
    | MonitorRetrieveResponse.MonitorsSemanticChangeDetection;

  created_at: string;

  /**
   * Top-level monitor category. Always `web` today; the concrete behavior is
   * described by `target` and `change_detection`.
   */
  mode: 'web';

  name: string;

  /**
   * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
   * every 6 hours or every 2 days. The total interval (frequency × unit) must be
   * between 10 minutes and 1 year.
   */
  schedule: MonitorRetrieveResponse.Schedule;

  /**
   * Monitor lifecycle status. `failed` means the most recent run failed (see the
   * monitor's `last_error`); failed monitors keep running on schedule and flip back
   * to `active` on the next successful run. Monitors are auto-`paused` after
   * repeated consecutive failures or insufficient-credit skips; resume by PATCHing
   * status to `active`.
   */
  status: 'active' | 'paused' | 'failed';

  /**
   * Discriminated union describing what the monitor watches.
   */
  target:
    | MonitorRetrieveResponse.MonitorsPageTarget
    | MonitorRetrieveResponse.MonitorsSitemapTarget
    | MonitorRetrieveResponse.MonitorsExtractTarget;

  updated_at: string;

  /**
   * Current baseline: the last observed value the monitor compares new snapshots
   * against. Its shape follows `target.type` (page/sitemap/extract). Only populated
   * on GET /monitors/{monitor_id}; null until the first baseline run completes (and
   * after a target or change_detection update, which resets the baseline).
   */
  baseline?:
    | MonitorRetrieveResponse.MonitorsPageBaseline
    | MonitorRetrieveResponse.MonitorsSitemapBaseline
    | MonitorRetrieveResponse.MonitorsExtractBaseline
    | null;

  last_change_at?: string | null;

  /**
   * Error from the most recent failed run; null when the last run succeeded.
   */
  last_error?: MonitorRetrieveResponse.LastError | null;

  last_run_at?: string | null;

  /**
   * When the next scheduled run is due.
   */
  next_run_at?: string | null;

  /**
   * User-defined tags for grouping and filtering monitors and their changes.
   */
  tags?: Array<string>;

  webhook?: MonitorRetrieveResponse.Webhook | null;
}

export namespace MonitorRetrieveResponse {
  /**
   * Detect exact changes. For page targets, this means visible text diffs. For
   * sitemap targets, this means URL additions and removals.
   */
  export interface MonitorsExactChangeDetection {
    type: 'exact';
  }

  /**
   * Detect meaning-level changes to tracked page content, ignoring cosmetic or
   * paraphrase-only differences. Which changes are meaningful is judged against the
   * extract target's `instructions` (and `schema`, when provided).
   */
  export interface MonitorsSemanticChangeDetection {
    type: 'semantic';

    confidence_threshold?: number;
  }

  /**
   * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
   * every 6 hours or every 2 days. The total interval (frequency × unit) must be
   * between 10 minutes and 1 year.
   */
  export interface Schedule {
    /**
     * Number of units between runs. The resulting interval (frequency × unit) must be
     * at least 10 minutes and at most 1 year (e.g. minimum 10 when unit is minutes;
     * maximum 365 when unit is days).
     */
    frequency: number;

    type: 'interval';

    unit: 'minutes' | 'hours' | 'days';
  }

  /**
   * Watch a single web page.
   */
  export interface MonitorsPageTarget {
    type: 'page';

    url: string;

    /**
     * Normalize whitespace before comparing or analyzing text.
     */
    normalize_whitespace?: boolean;
  }

  /**
   * Watch a sitemap for URL additions and removals. Crawled URLs are normalized
   * (lowercased host, no trailing slash/fragment) and scoped to the monitored site
   * and its subdomains before comparison. On a detected difference the sitemap is
   * re-fetched within the same run and only URLs both observations agree on are
   * reported, suppressing transient crawl flaps.
   */
  export interface MonitorsSitemapTarget {
    type: 'sitemap';

    /**
     * Sitemap URL to monitor.
     */
    url: string;

    /**
     * URL path patterns to exclude.
     */
    exclude?: Array<string>;

    /**
     * URL path patterns to include.
     */
    include?: Array<string>;

    /**
     * Maximum number of sitemap URLs to track (capped at 10,000).
     */
    max_urls?: number;
  }

  /**
   * Watch the monitor-relevant pages of a site for meaningful changes. A crawl
   * guided by `schema`/`instructions` selects up to `max_pages` relevant pages to
   * track; each run re-checks exactly those pages, and confirmed content changes are
   * judged for relevance against the monitor's `instructions` (and `schema`, when
   * provided). The tracked page set is refreshed by a periodic re-discovery crawl.
   */
  export interface MonitorsExtractTarget {
    /**
     * Natural-language instructions guiding which pages and facts to track and which
     * changes to report.
     */
    instructions: string;

    type: 'extract';

    /**
     * Root URL to extract structured data from.
     */
    url: string;

    follow_subdomains?: boolean;

    /**
     * Optional maximum link depth from the starting URL (0 = only the starting page).
     */
    max_depth?: number;

    /**
     * Maximum number of pages to track.
     */
    max_pages?: number;

    /**
     * JSON Schema describing the data you care about. It is used three ways: it guides
     * which pages are selected for tracking, it gives the change judge extra context
     * on which changes matter (alongside `instructions`), and it defines the shape of
     * the baseline `data` snapshot on GET /monitors/{monitor_id} (refreshed at most
     * about once a day). It is not a response format for changes: change events and
     * webhook payloads always contain diffs, summaries, and evidence excerpts — never
     * data in this schema's shape. If omitted, a default summary + key-points schema
     * is used.
     */
    schema?: { [key: string]: unknown };
  }

  /**
   * Current baseline of a `page` monitor: the visible page text as last observed.
   */
  export interface MonitorsPageBaseline {
    /**
     * When this baseline was last captured or replaced.
     */
    captured_at: string;

    /**
     * The page's visible text as last observed.
     */
    text: string;
  }

  /**
   * Current baseline of a `sitemap` monitor: the normalized URL set as last
   * observed.
   */
  export interface MonitorsSitemapBaseline {
    /**
     * When this baseline was last captured or replaced.
     */
    captured_at: string;

    /**
     * Number of URLs in the baseline.
     */
    url_count: number;

    /**
     * The sitemap URLs as last observed (sorted, normalized).
     */
    urls: Array<string>;
  }

  /**
   * Current baseline of an `extract` monitor: the pages it tracks and the structured
   * data as last extracted.
   */
  export interface MonitorsExtractBaseline {
    /**
     * When this baseline was last captured or replaced.
     */
    captured_at: string;

    /**
     * The extracted structured data, matching the monitor's extraction schema (same
     * shape as the /web/extract endpoint's `data`). Refreshed when the monitor
     * re-discovers its page set (at most about once a day); `null` when no extraction
     * has been captured yet.
     */
    data: unknown;

    /**
     * The page URLs the monitor tracks and analyzes for changes.
     */
    urls_analyzed: Array<string>;
  }

  /**
   * Error from the most recent failed run; null when the last run succeeded.
   */
  export interface LastError {
    code: string;

    message: string;
  }

  export interface Webhook {
    /**
     * Webhook URL called when a change is detected.
     */
    url: string;

    /**
     * Signing secret used to verify webhook authenticity. Each delivery includes an
     * `X-Context-Signature: t=<unix>,v1=<hmac>` header, where the HMAC is SHA-256 over
     * `"{t}.{rawRequestBody}"` keyed by this secret. Recompute it with a constant-time
     * compare and reject stale timestamps to prevent replay. Generated by the API;
     * cannot be set by clients.
     */
    secret?: string;
  }
}

/**
 * A web monitor. `mode` is the constant `web`; behavior is described by `target`
 * (page/sitemap/extract) and `change_detection` (exact/semantic).
 */
export interface MonitorUpdateResponse {
  id: string;

  /**
   * Discriminated union describing how changes are detected.
   */
  change_detection:
    | MonitorUpdateResponse.MonitorsExactChangeDetection
    | MonitorUpdateResponse.MonitorsSemanticChangeDetection;

  created_at: string;

  /**
   * Top-level monitor category. Always `web` today; the concrete behavior is
   * described by `target` and `change_detection`.
   */
  mode: 'web';

  name: string;

  /**
   * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
   * every 6 hours or every 2 days. The total interval (frequency × unit) must be
   * between 10 minutes and 1 year.
   */
  schedule: MonitorUpdateResponse.Schedule;

  /**
   * Monitor lifecycle status. `failed` means the most recent run failed (see the
   * monitor's `last_error`); failed monitors keep running on schedule and flip back
   * to `active` on the next successful run. Monitors are auto-`paused` after
   * repeated consecutive failures or insufficient-credit skips; resume by PATCHing
   * status to `active`.
   */
  status: 'active' | 'paused' | 'failed';

  /**
   * Discriminated union describing what the monitor watches.
   */
  target:
    | MonitorUpdateResponse.MonitorsPageTarget
    | MonitorUpdateResponse.MonitorsSitemapTarget
    | MonitorUpdateResponse.MonitorsExtractTarget;

  updated_at: string;

  /**
   * Current baseline: the last observed value the monitor compares new snapshots
   * against. Its shape follows `target.type` (page/sitemap/extract). Only populated
   * on GET /monitors/{monitor_id}; null until the first baseline run completes (and
   * after a target or change_detection update, which resets the baseline).
   */
  baseline?:
    | MonitorUpdateResponse.MonitorsPageBaseline
    | MonitorUpdateResponse.MonitorsSitemapBaseline
    | MonitorUpdateResponse.MonitorsExtractBaseline
    | null;

  last_change_at?: string | null;

  /**
   * Error from the most recent failed run; null when the last run succeeded.
   */
  last_error?: MonitorUpdateResponse.LastError | null;

  last_run_at?: string | null;

  /**
   * When the next scheduled run is due.
   */
  next_run_at?: string | null;

  /**
   * User-defined tags for grouping and filtering monitors and their changes.
   */
  tags?: Array<string>;

  webhook?: MonitorUpdateResponse.Webhook | null;
}

export namespace MonitorUpdateResponse {
  /**
   * Detect exact changes. For page targets, this means visible text diffs. For
   * sitemap targets, this means URL additions and removals.
   */
  export interface MonitorsExactChangeDetection {
    type: 'exact';
  }

  /**
   * Detect meaning-level changes to tracked page content, ignoring cosmetic or
   * paraphrase-only differences. Which changes are meaningful is judged against the
   * extract target's `instructions` (and `schema`, when provided).
   */
  export interface MonitorsSemanticChangeDetection {
    type: 'semantic';

    confidence_threshold?: number;
  }

  /**
   * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
   * every 6 hours or every 2 days. The total interval (frequency × unit) must be
   * between 10 minutes and 1 year.
   */
  export interface Schedule {
    /**
     * Number of units between runs. The resulting interval (frequency × unit) must be
     * at least 10 minutes and at most 1 year (e.g. minimum 10 when unit is minutes;
     * maximum 365 when unit is days).
     */
    frequency: number;

    type: 'interval';

    unit: 'minutes' | 'hours' | 'days';
  }

  /**
   * Watch a single web page.
   */
  export interface MonitorsPageTarget {
    type: 'page';

    url: string;

    /**
     * Normalize whitespace before comparing or analyzing text.
     */
    normalize_whitespace?: boolean;
  }

  /**
   * Watch a sitemap for URL additions and removals. Crawled URLs are normalized
   * (lowercased host, no trailing slash/fragment) and scoped to the monitored site
   * and its subdomains before comparison. On a detected difference the sitemap is
   * re-fetched within the same run and only URLs both observations agree on are
   * reported, suppressing transient crawl flaps.
   */
  export interface MonitorsSitemapTarget {
    type: 'sitemap';

    /**
     * Sitemap URL to monitor.
     */
    url: string;

    /**
     * URL path patterns to exclude.
     */
    exclude?: Array<string>;

    /**
     * URL path patterns to include.
     */
    include?: Array<string>;

    /**
     * Maximum number of sitemap URLs to track (capped at 10,000).
     */
    max_urls?: number;
  }

  /**
   * Watch the monitor-relevant pages of a site for meaningful changes. A crawl
   * guided by `schema`/`instructions` selects up to `max_pages` relevant pages to
   * track; each run re-checks exactly those pages, and confirmed content changes are
   * judged for relevance against the monitor's `instructions` (and `schema`, when
   * provided). The tracked page set is refreshed by a periodic re-discovery crawl.
   */
  export interface MonitorsExtractTarget {
    /**
     * Natural-language instructions guiding which pages and facts to track and which
     * changes to report.
     */
    instructions: string;

    type: 'extract';

    /**
     * Root URL to extract structured data from.
     */
    url: string;

    follow_subdomains?: boolean;

    /**
     * Optional maximum link depth from the starting URL (0 = only the starting page).
     */
    max_depth?: number;

    /**
     * Maximum number of pages to track.
     */
    max_pages?: number;

    /**
     * JSON Schema describing the data you care about. It is used three ways: it guides
     * which pages are selected for tracking, it gives the change judge extra context
     * on which changes matter (alongside `instructions`), and it defines the shape of
     * the baseline `data` snapshot on GET /monitors/{monitor_id} (refreshed at most
     * about once a day). It is not a response format for changes: change events and
     * webhook payloads always contain diffs, summaries, and evidence excerpts — never
     * data in this schema's shape. If omitted, a default summary + key-points schema
     * is used.
     */
    schema?: { [key: string]: unknown };
  }

  /**
   * Current baseline of a `page` monitor: the visible page text as last observed.
   */
  export interface MonitorsPageBaseline {
    /**
     * When this baseline was last captured or replaced.
     */
    captured_at: string;

    /**
     * The page's visible text as last observed.
     */
    text: string;
  }

  /**
   * Current baseline of a `sitemap` monitor: the normalized URL set as last
   * observed.
   */
  export interface MonitorsSitemapBaseline {
    /**
     * When this baseline was last captured or replaced.
     */
    captured_at: string;

    /**
     * Number of URLs in the baseline.
     */
    url_count: number;

    /**
     * The sitemap URLs as last observed (sorted, normalized).
     */
    urls: Array<string>;
  }

  /**
   * Current baseline of an `extract` monitor: the pages it tracks and the structured
   * data as last extracted.
   */
  export interface MonitorsExtractBaseline {
    /**
     * When this baseline was last captured or replaced.
     */
    captured_at: string;

    /**
     * The extracted structured data, matching the monitor's extraction schema (same
     * shape as the /web/extract endpoint's `data`). Refreshed when the monitor
     * re-discovers its page set (at most about once a day); `null` when no extraction
     * has been captured yet.
     */
    data: unknown;

    /**
     * The page URLs the monitor tracks and analyzes for changes.
     */
    urls_analyzed: Array<string>;
  }

  /**
   * Error from the most recent failed run; null when the last run succeeded.
   */
  export interface LastError {
    code: string;

    message: string;
  }

  export interface Webhook {
    /**
     * Webhook URL called when a change is detected.
     */
    url: string;

    /**
     * Signing secret used to verify webhook authenticity. Each delivery includes an
     * `X-Context-Signature: t=<unix>,v1=<hmac>` header, where the HMAC is SHA-256 over
     * `"{t}.{rawRequestBody}"` keyed by this secret. Recompute it with a constant-time
     * compare and reject stale timestamps to prevent replay. Generated by the API;
     * cannot be set by clients.
     */
    secret?: string;
  }
}

export interface MonitorListResponse {
  data: Array<MonitorListResponse.Data>;

  has_more: boolean;

  next_cursor: string | null;
}

export namespace MonitorListResponse {
  /**
   * A web monitor. `mode` is the constant `web`; behavior is described by `target`
   * (page/sitemap/extract) and `change_detection` (exact/semantic).
   */
  export interface Data {
    id: string;

    /**
     * Discriminated union describing how changes are detected.
     */
    change_detection: Data.MonitorsExactChangeDetection | Data.MonitorsSemanticChangeDetection;

    created_at: string;

    /**
     * Top-level monitor category. Always `web` today; the concrete behavior is
     * described by `target` and `change_detection`.
     */
    mode: 'web';

    name: string;

    /**
     * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
     * every 6 hours or every 2 days. The total interval (frequency × unit) must be
     * between 10 minutes and 1 year.
     */
    schedule: Data.Schedule;

    /**
     * Monitor lifecycle status. `failed` means the most recent run failed (see the
     * monitor's `last_error`); failed monitors keep running on schedule and flip back
     * to `active` on the next successful run. Monitors are auto-`paused` after
     * repeated consecutive failures or insufficient-credit skips; resume by PATCHing
     * status to `active`.
     */
    status: 'active' | 'paused' | 'failed';

    /**
     * Discriminated union describing what the monitor watches.
     */
    target: Data.MonitorsPageTarget | Data.MonitorsSitemapTarget | Data.MonitorsExtractTarget;

    updated_at: string;

    /**
     * Current baseline: the last observed value the monitor compares new snapshots
     * against. Its shape follows `target.type` (page/sitemap/extract). Only populated
     * on GET /monitors/{monitor_id}; null until the first baseline run completes (and
     * after a target or change_detection update, which resets the baseline).
     */
    baseline?: Data.MonitorsPageBaseline | Data.MonitorsSitemapBaseline | Data.MonitorsExtractBaseline | null;

    last_change_at?: string | null;

    /**
     * Error from the most recent failed run; null when the last run succeeded.
     */
    last_error?: Data.LastError | null;

    last_run_at?: string | null;

    /**
     * When the next scheduled run is due.
     */
    next_run_at?: string | null;

    /**
     * User-defined tags for grouping and filtering monitors and their changes.
     */
    tags?: Array<string>;

    webhook?: Data.Webhook | null;
  }

  export namespace Data {
    /**
     * Detect exact changes. For page targets, this means visible text diffs. For
     * sitemap targets, this means URL additions and removals.
     */
    export interface MonitorsExactChangeDetection {
      type: 'exact';
    }

    /**
     * Detect meaning-level changes to tracked page content, ignoring cosmetic or
     * paraphrase-only differences. Which changes are meaningful is judged against the
     * extract target's `instructions` (and `schema`, when provided).
     */
    export interface MonitorsSemanticChangeDetection {
      type: 'semantic';

      confidence_threshold?: number;
    }

    /**
     * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
     * every 6 hours or every 2 days. The total interval (frequency × unit) must be
     * between 10 minutes and 1 year.
     */
    export interface Schedule {
      /**
       * Number of units between runs. The resulting interval (frequency × unit) must be
       * at least 10 minutes and at most 1 year (e.g. minimum 10 when unit is minutes;
       * maximum 365 when unit is days).
       */
      frequency: number;

      type: 'interval';

      unit: 'minutes' | 'hours' | 'days';
    }

    /**
     * Watch a single web page.
     */
    export interface MonitorsPageTarget {
      type: 'page';

      url: string;

      /**
       * Normalize whitespace before comparing or analyzing text.
       */
      normalize_whitespace?: boolean;
    }

    /**
     * Watch a sitemap for URL additions and removals. Crawled URLs are normalized
     * (lowercased host, no trailing slash/fragment) and scoped to the monitored site
     * and its subdomains before comparison. On a detected difference the sitemap is
     * re-fetched within the same run and only URLs both observations agree on are
     * reported, suppressing transient crawl flaps.
     */
    export interface MonitorsSitemapTarget {
      type: 'sitemap';

      /**
       * Sitemap URL to monitor.
       */
      url: string;

      /**
       * URL path patterns to exclude.
       */
      exclude?: Array<string>;

      /**
       * URL path patterns to include.
       */
      include?: Array<string>;

      /**
       * Maximum number of sitemap URLs to track (capped at 10,000).
       */
      max_urls?: number;
    }

    /**
     * Watch the monitor-relevant pages of a site for meaningful changes. A crawl
     * guided by `schema`/`instructions` selects up to `max_pages` relevant pages to
     * track; each run re-checks exactly those pages, and confirmed content changes are
     * judged for relevance against the monitor's `instructions` (and `schema`, when
     * provided). The tracked page set is refreshed by a periodic re-discovery crawl.
     */
    export interface MonitorsExtractTarget {
      /**
       * Natural-language instructions guiding which pages and facts to track and which
       * changes to report.
       */
      instructions: string;

      type: 'extract';

      /**
       * Root URL to extract structured data from.
       */
      url: string;

      follow_subdomains?: boolean;

      /**
       * Optional maximum link depth from the starting URL (0 = only the starting page).
       */
      max_depth?: number;

      /**
       * Maximum number of pages to track.
       */
      max_pages?: number;

      /**
       * JSON Schema describing the data you care about. It is used three ways: it guides
       * which pages are selected for tracking, it gives the change judge extra context
       * on which changes matter (alongside `instructions`), and it defines the shape of
       * the baseline `data` snapshot on GET /monitors/{monitor_id} (refreshed at most
       * about once a day). It is not a response format for changes: change events and
       * webhook payloads always contain diffs, summaries, and evidence excerpts — never
       * data in this schema's shape. If omitted, a default summary + key-points schema
       * is used.
       */
      schema?: { [key: string]: unknown };
    }

    /**
     * Current baseline of a `page` monitor: the visible page text as last observed.
     */
    export interface MonitorsPageBaseline {
      /**
       * When this baseline was last captured or replaced.
       */
      captured_at: string;

      /**
       * The page's visible text as last observed.
       */
      text: string;
    }

    /**
     * Current baseline of a `sitemap` monitor: the normalized URL set as last
     * observed.
     */
    export interface MonitorsSitemapBaseline {
      /**
       * When this baseline was last captured or replaced.
       */
      captured_at: string;

      /**
       * Number of URLs in the baseline.
       */
      url_count: number;

      /**
       * The sitemap URLs as last observed (sorted, normalized).
       */
      urls: Array<string>;
    }

    /**
     * Current baseline of an `extract` monitor: the pages it tracks and the structured
     * data as last extracted.
     */
    export interface MonitorsExtractBaseline {
      /**
       * When this baseline was last captured or replaced.
       */
      captured_at: string;

      /**
       * The extracted structured data, matching the monitor's extraction schema (same
       * shape as the /web/extract endpoint's `data`). Refreshed when the monitor
       * re-discovers its page set (at most about once a day); `null` when no extraction
       * has been captured yet.
       */
      data: unknown;

      /**
       * The page URLs the monitor tracks and analyzes for changes.
       */
      urls_analyzed: Array<string>;
    }

    /**
     * Error from the most recent failed run; null when the last run succeeded.
     */
    export interface LastError {
      code: string;

      message: string;
    }

    export interface Webhook {
      /**
       * Webhook URL called when a change is detected.
       */
      url: string;

      /**
       * Signing secret used to verify webhook authenticity. Each delivery includes an
       * `X-Context-Signature: t=<unix>,v1=<hmac>` header, where the HMAC is SHA-256 over
       * `"{t}.{rawRequestBody}"` keyed by this secret. Recompute it with a constant-time
       * compare and reject stale timestamps to prevent replay. Generated by the API;
       * cannot be set by clients.
       */
      secret?: string;
    }
  }
}

export interface MonitorDeleteResponse {
  id: string;

  deleted: boolean;
}

export interface MonitorListAccountChangesResponse {
  data: Array<MonitorListAccountChangesResponse.Data>;

  has_more: boolean;

  next_cursor: string | null;
}

export namespace MonitorListAccountChangesResponse {
  /**
   * A lightweight change summary. `mode` is the constant `web`; `target_type` and
   * `change_detection_type` describe the change, and which optional fields are
   * present depends on them (e.g. sitemap changes include
   * `added_url_count`/`removed_url_count`; semantic changes include
   * `confidence`/`importance`).
   */
  export interface Data {
    id: string;

    change_detection_type: 'exact' | 'semantic';

    detected_at: string;

    /**
     * Top-level monitor category. Always `web` today; the concrete behavior is
     * described by `target` and `change_detection`.
     */
    mode: 'web';

    monitor_id: string;

    summary: string;

    target_type: 'page' | 'sitemap' | 'extract';

    title: string;

    url: string;

    added_url_count?: number;

    confidence?: number;

    importance?: 'low' | 'medium' | 'high';

    matched_url_count?: number;

    removed_url_count?: number;

    /**
     * User-defined tags for grouping and filtering monitors and their changes.
     */
    tags?: Array<string>;
  }
}

export interface MonitorListAccountRunsResponse {
  data: Array<MonitorListAccountRunsResponse.Data>;

  has_more: boolean;

  next_cursor: string | null;
}

export namespace MonitorListAccountRunsResponse {
  export interface Data {
    id: string;

    /**
     * True when this run established the monitor's initial baseline; baseline runs
     * perform no change detection.
     */
    baseline_created: boolean;

    change_detected: boolean;

    change_detection_type: 'exact' | 'semantic';

    /**
     * Credits charged for this run (0 for skipped/failed runs).
     */
    credits_charged: number;

    monitor_id: string;

    /**
     * The first run after monitor creation is a baseline run.
     */
    run_type: 'baseline' | 'scheduled';

    /**
     * Lifecycle status of a run. `skipped` runs never executed — see `skip_reason`
     * (insufficient credits, monitor paused, or superseded by a concurrent run).
     */
    status: 'queued' | 'running' | 'completed' | 'failed' | 'skipped';

    target_type: 'page' | 'sitemap' | 'extract';

    change_id?: string | null;

    completed_at?: string | null;

    error?: Data.Error | null;

    /**
     * Why a skipped run never executed; null unless status is `skipped`.
     */
    skip_reason?: 'insufficient_credits' | 'monitor_paused' | 'superseded' | null;

    started_at?: string | null;
  }

  export namespace Data {
    export interface Error {
      code: string;

      message: string;
    }
  }
}

export interface MonitorListChangesResponse {
  data: Array<MonitorListChangesResponse.Data>;

  has_more: boolean;

  next_cursor: string | null;
}

export namespace MonitorListChangesResponse {
  /**
   * A lightweight change summary. `mode` is the constant `web`; `target_type` and
   * `change_detection_type` describe the change, and which optional fields are
   * present depends on them (e.g. sitemap changes include
   * `added_url_count`/`removed_url_count`; semantic changes include
   * `confidence`/`importance`).
   */
  export interface Data {
    id: string;

    change_detection_type: 'exact' | 'semantic';

    detected_at: string;

    /**
     * Top-level monitor category. Always `web` today; the concrete behavior is
     * described by `target` and `change_detection`.
     */
    mode: 'web';

    monitor_id: string;

    summary: string;

    target_type: 'page' | 'sitemap' | 'extract';

    title: string;

    url: string;

    added_url_count?: number;

    confidence?: number;

    importance?: 'low' | 'medium' | 'high';

    matched_url_count?: number;

    removed_url_count?: number;

    /**
     * User-defined tags for grouping and filtering monitors and their changes.
     */
    tags?: Array<string>;
  }
}

export interface MonitorListRunsResponse {
  data: Array<MonitorListRunsResponse.Data>;

  has_more: boolean;

  next_cursor: string | null;
}

export namespace MonitorListRunsResponse {
  export interface Data {
    id: string;

    /**
     * True when this run established the monitor's initial baseline; baseline runs
     * perform no change detection.
     */
    baseline_created: boolean;

    change_detected: boolean;

    change_detection_type: 'exact' | 'semantic';

    /**
     * Credits charged for this run (0 for skipped/failed runs).
     */
    credits_charged: number;

    monitor_id: string;

    /**
     * The first run after monitor creation is a baseline run.
     */
    run_type: 'baseline' | 'scheduled';

    /**
     * Lifecycle status of a run. `skipped` runs never executed — see `skip_reason`
     * (insufficient credits, monitor paused, or superseded by a concurrent run).
     */
    status: 'queued' | 'running' | 'completed' | 'failed' | 'skipped';

    target_type: 'page' | 'sitemap' | 'extract';

    change_id?: string | null;

    completed_at?: string | null;

    error?: Data.Error | null;

    /**
     * Why a skipped run never executed; null unless status is `skipped`.
     */
    skip_reason?: 'insufficient_credits' | 'monitor_paused' | 'superseded' | null;

    started_at?: string | null;
  }

  export namespace Data {
    export interface Error {
      code: string;

      message: string;
    }
  }
}

/**
 * A detected change. `mode` is the constant `web`; `target_type` and
 * `change_detection_type` describe the change, and which optional fields are
 * present depends on them (page: `diff` + excerpts; sitemap:
 * `added_urls`/`removed_urls`; semantic:
 * `query`/`confidence`/`importance`/`evidence`/`matched_urls`).
 */
export interface MonitorRetrieveChangeResponse {
  id: string;

  change_detection_type: 'exact' | 'semantic';

  detected_at: string;

  /**
   * Top-level monitor category. Always `web` today; the concrete behavior is
   * described by `target` and `change_detection`.
   */
  mode: 'web';

  monitor_id: string;

  /**
   * The run that detected this change.
   */
  run_id: string;

  summary: string;

  target_type: 'page' | 'sitemap' | 'extract';

  title: string;

  url: string;

  added_url_count?: number;

  /**
   * At most 500 URLs are included; the corresponding count field is always exact.
   */
  added_urls?: Array<string>;

  after_text_excerpt?: string;

  before_text_excerpt?: string;

  confidence?: number;

  /**
   * Text diff between the previous and current page baseline (page targets).
   */
  diff?: string;

  evidence?: Array<MonitorRetrieveChangeResponse.Evidence>;

  importance?: 'low' | 'medium' | 'high';

  matched_url_count?: number;

  /**
   * At most 500 URLs are included; the corresponding count field is always exact.
   */
  matched_urls?: Array<string>;

  removed_url_count?: number;

  /**
   * At most 500 URLs are included; the corresponding count field is always exact.
   */
  removed_urls?: Array<string>;

  /**
   * User-defined tags for grouping and filtering monitors and their changes.
   */
  tags?: Array<string>;
}

export namespace MonitorRetrieveChangeResponse {
  export interface Evidence {
    /**
     * Snapshot of the content after the change.
     */
    after: string;

    /**
     * Snapshot of the content before the change.
     */
    before: string;

    /**
     * Optional URL the evidence relates to. Absent for whole-target diffs.
     */
    url?: string;
  }
}

export interface MonitorRunResponse {
  monitor_id: string;

  queued: boolean;

  /**
   * The queued run. Poll GET /monitors/{monitor_id}/runs or use it to correlate
   * results.
   */
  run_id: string;
}

export interface MonitorCreateParams {
  /**
   * Discriminated union describing how changes are detected.
   */
  change_detection:
    | MonitorCreateParams.MonitorsExactChangeDetection
    | MonitorCreateParams.MonitorsSemanticChangeDetection;

  name: string;

  /**
   * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
   * every 6 hours or every 2 days. The total interval (frequency × unit) must be
   * between 10 minutes and 1 year.
   */
  schedule: MonitorCreateParams.Schedule;

  /**
   * Discriminated union describing what the monitor watches.
   */
  target:
    | MonitorCreateParams.MonitorsPageTarget
    | MonitorCreateParams.MonitorsSitemapTarget
    | MonitorCreateParams.MonitorsExtractTarget;

  /**
   * Top-level monitor category. Always `web` today; the concrete behavior is
   * described by `target` and `change_detection`.
   */
  mode?: 'web';

  /**
   * User-defined tags for grouping and filtering monitors and their changes.
   */
  tags?: Array<string>;

  webhook?: MonitorCreateParams.Webhook | null;
}

export namespace MonitorCreateParams {
  /**
   * Detect exact changes. For page targets, this means visible text diffs. For
   * sitemap targets, this means URL additions and removals.
   */
  export interface MonitorsExactChangeDetection {
    type: 'exact';
  }

  /**
   * Detect meaning-level changes to tracked page content, ignoring cosmetic or
   * paraphrase-only differences. Which changes are meaningful is judged against the
   * extract target's `instructions` (and `schema`, when provided).
   */
  export interface MonitorsSemanticChangeDetection {
    type: 'semantic';

    confidence_threshold?: number;
  }

  /**
   * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
   * every 6 hours or every 2 days. The total interval (frequency × unit) must be
   * between 10 minutes and 1 year.
   */
  export interface Schedule {
    /**
     * Number of units between runs. The resulting interval (frequency × unit) must be
     * at least 10 minutes and at most 1 year (e.g. minimum 10 when unit is minutes;
     * maximum 365 when unit is days).
     */
    frequency: number;

    type: 'interval';

    unit: 'minutes' | 'hours' | 'days';
  }

  /**
   * Watch a single web page.
   */
  export interface MonitorsPageTarget {
    type: 'page';

    url: string;

    /**
     * Normalize whitespace before comparing or analyzing text.
     */
    normalize_whitespace?: boolean;
  }

  /**
   * Watch a sitemap for URL additions and removals. Crawled URLs are normalized
   * (lowercased host, no trailing slash/fragment) and scoped to the monitored site
   * and its subdomains before comparison. On a detected difference the sitemap is
   * re-fetched within the same run and only URLs both observations agree on are
   * reported, suppressing transient crawl flaps.
   */
  export interface MonitorsSitemapTarget {
    type: 'sitemap';

    /**
     * Sitemap URL to monitor.
     */
    url: string;

    /**
     * URL path patterns to exclude.
     */
    exclude?: Array<string>;

    /**
     * URL path patterns to include.
     */
    include?: Array<string>;

    /**
     * Maximum number of sitemap URLs to track (capped at 10,000).
     */
    max_urls?: number;
  }

  /**
   * Watch the monitor-relevant pages of a site for meaningful changes. A crawl
   * guided by `schema`/`instructions` selects up to `max_pages` relevant pages to
   * track; each run re-checks exactly those pages, and confirmed content changes are
   * judged for relevance against the monitor's `instructions` (and `schema`, when
   * provided). The tracked page set is refreshed by a periodic re-discovery crawl.
   */
  export interface MonitorsExtractTarget {
    /**
     * Natural-language instructions guiding which pages and facts to track and which
     * changes to report.
     */
    instructions: string;

    type: 'extract';

    /**
     * Root URL to extract structured data from.
     */
    url: string;

    follow_subdomains?: boolean;

    /**
     * Optional maximum link depth from the starting URL (0 = only the starting page).
     */
    max_depth?: number;

    /**
     * Maximum number of pages to track.
     */
    max_pages?: number;

    /**
     * JSON Schema describing the data you care about. It is used three ways: it guides
     * which pages are selected for tracking, it gives the change judge extra context
     * on which changes matter (alongside `instructions`), and it defines the shape of
     * the baseline `data` snapshot on GET /monitors/{monitor_id} (refreshed at most
     * about once a day). It is not a response format for changes: change events and
     * webhook payloads always contain diffs, summaries, and evidence excerpts — never
     * data in this schema's shape. If omitted, a default summary + key-points schema
     * is used.
     */
    schema?: { [key: string]: unknown };
  }

  export interface Webhook {
    /**
     * Webhook URL called when a change is detected.
     */
    url: string;
  }
}

export interface MonitorUpdateParams {
  /**
   * Discriminated union describing how changes are detected.
   */
  change_detection?:
    | MonitorUpdateParams.MonitorsExactChangeDetection
    | MonitorUpdateParams.MonitorsSemanticChangeDetection;

  name?: string;

  /**
   * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
   * every 6 hours or every 2 days. The total interval (frequency × unit) must be
   * between 10 minutes and 1 year.
   */
  schedule?: MonitorUpdateParams.Schedule;

  status?: 'active' | 'paused';

  /**
   * User-defined tags for grouping and filtering monitors and their changes.
   */
  tags?: Array<string>;

  /**
   * Discriminated union describing what the monitor watches.
   */
  target?:
    | MonitorUpdateParams.MonitorsPageTarget
    | MonitorUpdateParams.MonitorsSitemapTarget
    | MonitorUpdateParams.MonitorsExtractTarget;

  /**
   * Set to null to remove the webhook.
   */
  webhook?: MonitorUpdateParams.Webhook | null;
}

export namespace MonitorUpdateParams {
  /**
   * Detect exact changes. For page targets, this means visible text diffs. For
   * sitemap targets, this means URL additions and removals.
   */
  export interface MonitorsExactChangeDetection {
    type: 'exact';
  }

  /**
   * Detect meaning-level changes to tracked page content, ignoring cosmetic or
   * paraphrase-only differences. Which changes are meaningful is judged against the
   * extract target's `instructions` (and `schema`, when provided).
   */
  export interface MonitorsSemanticChangeDetection {
    type: 'semantic';

    confidence_threshold?: number;
  }

  /**
   * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
   * every 6 hours or every 2 days. The total interval (frequency × unit) must be
   * between 10 minutes and 1 year.
   */
  export interface Schedule {
    /**
     * Number of units between runs. The resulting interval (frequency × unit) must be
     * at least 10 minutes and at most 1 year (e.g. minimum 10 when unit is minutes;
     * maximum 365 when unit is days).
     */
    frequency: number;

    type: 'interval';

    unit: 'minutes' | 'hours' | 'days';
  }

  /**
   * Watch a single web page.
   */
  export interface MonitorsPageTarget {
    type: 'page';

    url: string;

    /**
     * Normalize whitespace before comparing or analyzing text.
     */
    normalize_whitespace?: boolean;
  }

  /**
   * Watch a sitemap for URL additions and removals. Crawled URLs are normalized
   * (lowercased host, no trailing slash/fragment) and scoped to the monitored site
   * and its subdomains before comparison. On a detected difference the sitemap is
   * re-fetched within the same run and only URLs both observations agree on are
   * reported, suppressing transient crawl flaps.
   */
  export interface MonitorsSitemapTarget {
    type: 'sitemap';

    /**
     * Sitemap URL to monitor.
     */
    url: string;

    /**
     * URL path patterns to exclude.
     */
    exclude?: Array<string>;

    /**
     * URL path patterns to include.
     */
    include?: Array<string>;

    /**
     * Maximum number of sitemap URLs to track (capped at 10,000).
     */
    max_urls?: number;
  }

  /**
   * Watch the monitor-relevant pages of a site for meaningful changes. A crawl
   * guided by `schema`/`instructions` selects up to `max_pages` relevant pages to
   * track; each run re-checks exactly those pages, and confirmed content changes are
   * judged for relevance against the monitor's `instructions` (and `schema`, when
   * provided). The tracked page set is refreshed by a periodic re-discovery crawl.
   */
  export interface MonitorsExtractTarget {
    /**
     * Natural-language instructions guiding which pages and facts to track and which
     * changes to report.
     */
    instructions: string;

    type: 'extract';

    /**
     * Root URL to extract structured data from.
     */
    url: string;

    follow_subdomains?: boolean;

    /**
     * Optional maximum link depth from the starting URL (0 = only the starting page).
     */
    max_depth?: number;

    /**
     * Maximum number of pages to track.
     */
    max_pages?: number;

    /**
     * JSON Schema describing the data you care about. It is used three ways: it guides
     * which pages are selected for tracking, it gives the change judge extra context
     * on which changes matter (alongside `instructions`), and it defines the shape of
     * the baseline `data` snapshot on GET /monitors/{monitor_id} (refreshed at most
     * about once a day). It is not a response format for changes: change events and
     * webhook payloads always contain diffs, summaries, and evidence excerpts — never
     * data in this schema's shape. If omitted, a default summary + key-points schema
     * is used.
     */
    schema?: { [key: string]: unknown };
  }

  /**
   * Set to null to remove the webhook.
   */
  export interface Webhook {
    /**
     * Webhook URL called when a change is detected.
     */
    url: string;
  }
}

export interface MonitorListParams {
  change_detection_type?: 'exact' | 'semantic';

  cursor?: string;

  limit?: number;

  /**
   * Free-text search term, matched against the fields named in `search_by`.
   */
  q?: string;

  /**
   * Comma-separated fields to search with `q`. Defaults to all of them. Note
   * `instructions` only exists on extract monitors.
   */
  search_by?: Array<'name' | 'url' | 'instructions' | 'tags'>;

  /**
   * `prefix` for as-you-type prefix matching (default), `exact` for full-token
   * matching.
   */
  search_type?: 'exact' | 'prefix';

  /**
   * Monitor lifecycle status. `failed` means the most recent run failed (see the
   * monitor's `last_error`); failed monitors keep running on schedule and flip back
   * to `active` on the next successful run. Monitors are auto-`paused` after
   * repeated consecutive failures or insufficient-credit skips; resume by PATCHing
   * status to `active`.
   */
  status?: 'active' | 'paused' | 'failed';

  /**
   * Filter to items that have this tag.
   */
  tag?: string;

  /**
   * Comma-separated list of tags to filter by (matches monitors having any of them).
   */
  tags?: Array<string>;

  target_type?: 'page' | 'sitemap' | 'extract';
}

export interface MonitorListAccountChangesParams {
  change_detection_type?: 'exact' | 'semantic';

  cursor?: string;

  limit?: number;

  monitor_id?: string;

  since?: string;

  /**
   * Filter to items that have this tag.
   */
  tag?: string;

  target_type?: 'page' | 'sitemap' | 'extract';

  until?: string;
}

export interface MonitorListAccountRunsParams {
  cursor?: string;

  limit?: number;

  /**
   * Lifecycle status of a run. `skipped` runs never executed — see `skip_reason`
   * (insufficient credits, monitor paused, or superseded by a concurrent run).
   */
  status?: 'queued' | 'running' | 'completed' | 'failed' | 'skipped';
}

export interface MonitorListChangesParams {
  cursor?: string;

  limit?: number;

  since?: string;

  /**
   * Filter to items that have this tag.
   */
  tag?: string;

  until?: string;
}

export interface MonitorListRunsParams {
  cursor?: string;

  limit?: number;

  /**
   * Lifecycle status of a run. `skipped` runs never executed — see `skip_reason`
   * (insufficient credits, monitor paused, or superseded by a concurrent run).
   */
  status?: 'queued' | 'running' | 'completed' | 'failed' | 'skipped';
}

export declare namespace Monitors {
  export {
    type MonitorCreateResponse as MonitorCreateResponse,
    type MonitorRetrieveResponse as MonitorRetrieveResponse,
    type MonitorUpdateResponse as MonitorUpdateResponse,
    type MonitorListResponse as MonitorListResponse,
    type MonitorDeleteResponse as MonitorDeleteResponse,
    type MonitorListAccountChangesResponse as MonitorListAccountChangesResponse,
    type MonitorListAccountRunsResponse as MonitorListAccountRunsResponse,
    type MonitorListChangesResponse as MonitorListChangesResponse,
    type MonitorListRunsResponse as MonitorListRunsResponse,
    type MonitorRetrieveChangeResponse as MonitorRetrieveChangeResponse,
    type MonitorRunResponse as MonitorRunResponse,
    type MonitorCreateParams as MonitorCreateParams,
    type MonitorUpdateParams as MonitorUpdateParams,
    type MonitorListParams as MonitorListParams,
    type MonitorListAccountChangesParams as MonitorListAccountChangesParams,
    type MonitorListAccountRunsParams as MonitorListAccountRunsParams,
    type MonitorListChangesParams as MonitorListChangesParams,
    type MonitorListRunsParams as MonitorListRunsParams,
  };
}
