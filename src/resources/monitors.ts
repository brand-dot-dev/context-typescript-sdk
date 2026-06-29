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
   * List monitors
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
 * Union of monitor response shapes.
 */
export type MonitorCreateResponse =
  | MonitorCreateResponse.MonitorsPageExactMonitor
  | MonitorCreateResponse.MonitorsSitemapExactMonitor
  | MonitorCreateResponse.MonitorsPageSemanticMonitor
  | MonitorCreateResponse.MonitorsExtractSemanticMonitor;

export namespace MonitorCreateResponse {
  /**
   * A page monitor using exact change detection.
   */
  export interface MonitorsPageExactMonitor {
    id: string;

    /**
     * Detect exact changes. For page targets, this means visible text diffs. For
     * sitemap targets, this means URL additions and removals.
     */
    change_detection: MonitorsPageExactMonitor.ChangeDetection;

    created_at: string;

    name: string;

    /**
     * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
     * every 6 hours or every 2 days. The total interval (frequency × unit) must be
     * between 10 minutes and 1 year.
     */
    schedule: MonitorsPageExactMonitor.Schedule;

    status: 'active' | 'paused' | 'failed';

    target: MonitorsPageExactMonitor.Target;

    updated_at: string;

    last_change_at?: string | null;

    last_run_at?: string | null;

    /**
     * User-defined tags for grouping and filtering monitors and their changes.
     */
    tags?: Array<string>;

    webhook?: MonitorsPageExactMonitor.Webhook | null;
  }

  export namespace MonitorsPageExactMonitor {
    /**
     * Detect exact changes. For page targets, this means visible text diffs. For
     * sitemap targets, this means URL additions and removals.
     */
    export interface ChangeDetection {
      type: 'exact';
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

    export interface Target {
      type: 'page';

      url: string;

      /**
       * Normalize whitespace before comparing or analyzing text.
       */
      normalize_whitespace?: boolean;
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
   * A sitemap monitor using exact change detection.
   */
  export interface MonitorsSitemapExactMonitor {
    id: string;

    /**
     * Detect exact changes. For page targets, this means visible text diffs. For
     * sitemap targets, this means URL additions and removals.
     */
    change_detection: MonitorsSitemapExactMonitor.ChangeDetection;

    created_at: string;

    name: string;

    /**
     * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
     * every 6 hours or every 2 days. The total interval (frequency × unit) must be
     * between 10 minutes and 1 year.
     */
    schedule: MonitorsSitemapExactMonitor.Schedule;

    status: 'active' | 'paused' | 'failed';

    target: MonitorsSitemapExactMonitor.Target;

    updated_at: string;

    last_change_at?: string | null;

    last_run_at?: string | null;

    /**
     * User-defined tags for grouping and filtering monitors and their changes.
     */
    tags?: Array<string>;

    webhook?: MonitorsSitemapExactMonitor.Webhook | null;
  }

  export namespace MonitorsSitemapExactMonitor {
    /**
     * Detect exact changes. For page targets, this means visible text diffs. For
     * sitemap targets, this means URL additions and removals.
     */
    export interface ChangeDetection {
      type: 'exact';
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

    export interface Target {
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

      max_urls?: number;
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
   * A page monitor using semantic change detection.
   */
  export interface MonitorsPageSemanticMonitor {
    id: string;

    /**
     * Detect meaning-level changes that match a natural language query.
     */
    change_detection: MonitorsPageSemanticMonitor.ChangeDetection;

    created_at: string;

    name: string;

    /**
     * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
     * every 6 hours or every 2 days. The total interval (frequency × unit) must be
     * between 10 minutes and 1 year.
     */
    schedule: MonitorsPageSemanticMonitor.Schedule;

    status: 'active' | 'paused' | 'failed';

    target: MonitorsPageSemanticMonitor.Target;

    updated_at: string;

    last_change_at?: string | null;

    last_run_at?: string | null;

    /**
     * User-defined tags for grouping and filtering monitors and their changes.
     */
    tags?: Array<string>;

    webhook?: MonitorsPageSemanticMonitor.Webhook | null;
  }

  export namespace MonitorsPageSemanticMonitor {
    /**
     * Detect meaning-level changes that match a natural language query.
     */
    export interface ChangeDetection {
      query: string;

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

    export interface Target {
      type: 'page';

      url: string;

      /**
       * Normalize whitespace before comparing or analyzing text.
       */
      normalize_whitespace?: boolean;
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
   * An extract monitor using semantic change detection.
   */
  export interface MonitorsExtractSemanticMonitor {
    id: string;

    /**
     * Detect meaning-level changes that match a natural language query.
     */
    change_detection: MonitorsExtractSemanticMonitor.ChangeDetection;

    created_at: string;

    name: string;

    /**
     * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
     * every 6 hours or every 2 days. The total interval (frequency × unit) must be
     * between 10 minutes and 1 year.
     */
    schedule: MonitorsExtractSemanticMonitor.Schedule;

    status: 'active' | 'paused' | 'failed';

    target: MonitorsExtractSemanticMonitor.Target;

    updated_at: string;

    last_change_at?: string | null;

    last_run_at?: string | null;

    /**
     * User-defined tags for grouping and filtering monitors and their changes.
     */
    tags?: Array<string>;

    webhook?: MonitorsExtractSemanticMonitor.Webhook | null;
  }

  export namespace MonitorsExtractSemanticMonitor {
    /**
     * Detect meaning-level changes that match a natural language query.
     */
    export interface ChangeDetection {
      query: string;

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

    export interface Target {
      type: 'extract';

      /**
       * Root URL to extract structured data from.
       */
      url: string;

      follow_subdomains?: boolean;

      /**
       * Optional natural-language instructions guiding what to extract.
       */
      instructions?: string;

      /**
       * Optional maximum link depth from the starting URL (0 = only the starting page).
       */
      max_depth?: number;

      /**
       * Maximum number of pages to analyze during extraction.
       */
      max_pages?: number;

      /**
       * JSON Schema describing the structured data to extract and watch for changes. If
       * omitted, a default summary + key-points schema is used.
       */
      schema?: { [key: string]: unknown };
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

/**
 * Union of monitor response shapes.
 */
export type MonitorRetrieveResponse =
  | MonitorRetrieveResponse.MonitorsPageExactMonitor
  | MonitorRetrieveResponse.MonitorsSitemapExactMonitor
  | MonitorRetrieveResponse.MonitorsPageSemanticMonitor
  | MonitorRetrieveResponse.MonitorsExtractSemanticMonitor;

export namespace MonitorRetrieveResponse {
  /**
   * A page monitor using exact change detection.
   */
  export interface MonitorsPageExactMonitor {
    id: string;

    /**
     * Detect exact changes. For page targets, this means visible text diffs. For
     * sitemap targets, this means URL additions and removals.
     */
    change_detection: MonitorsPageExactMonitor.ChangeDetection;

    created_at: string;

    name: string;

    /**
     * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
     * every 6 hours or every 2 days. The total interval (frequency × unit) must be
     * between 10 minutes and 1 year.
     */
    schedule: MonitorsPageExactMonitor.Schedule;

    status: 'active' | 'paused' | 'failed';

    target: MonitorsPageExactMonitor.Target;

    updated_at: string;

    last_change_at?: string | null;

    last_run_at?: string | null;

    /**
     * User-defined tags for grouping and filtering monitors and their changes.
     */
    tags?: Array<string>;

    webhook?: MonitorsPageExactMonitor.Webhook | null;
  }

  export namespace MonitorsPageExactMonitor {
    /**
     * Detect exact changes. For page targets, this means visible text diffs. For
     * sitemap targets, this means URL additions and removals.
     */
    export interface ChangeDetection {
      type: 'exact';
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

    export interface Target {
      type: 'page';

      url: string;

      /**
       * Normalize whitespace before comparing or analyzing text.
       */
      normalize_whitespace?: boolean;
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
   * A sitemap monitor using exact change detection.
   */
  export interface MonitorsSitemapExactMonitor {
    id: string;

    /**
     * Detect exact changes. For page targets, this means visible text diffs. For
     * sitemap targets, this means URL additions and removals.
     */
    change_detection: MonitorsSitemapExactMonitor.ChangeDetection;

    created_at: string;

    name: string;

    /**
     * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
     * every 6 hours or every 2 days. The total interval (frequency × unit) must be
     * between 10 minutes and 1 year.
     */
    schedule: MonitorsSitemapExactMonitor.Schedule;

    status: 'active' | 'paused' | 'failed';

    target: MonitorsSitemapExactMonitor.Target;

    updated_at: string;

    last_change_at?: string | null;

    last_run_at?: string | null;

    /**
     * User-defined tags for grouping and filtering monitors and their changes.
     */
    tags?: Array<string>;

    webhook?: MonitorsSitemapExactMonitor.Webhook | null;
  }

  export namespace MonitorsSitemapExactMonitor {
    /**
     * Detect exact changes. For page targets, this means visible text diffs. For
     * sitemap targets, this means URL additions and removals.
     */
    export interface ChangeDetection {
      type: 'exact';
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

    export interface Target {
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

      max_urls?: number;
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
   * A page monitor using semantic change detection.
   */
  export interface MonitorsPageSemanticMonitor {
    id: string;

    /**
     * Detect meaning-level changes that match a natural language query.
     */
    change_detection: MonitorsPageSemanticMonitor.ChangeDetection;

    created_at: string;

    name: string;

    /**
     * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
     * every 6 hours or every 2 days. The total interval (frequency × unit) must be
     * between 10 minutes and 1 year.
     */
    schedule: MonitorsPageSemanticMonitor.Schedule;

    status: 'active' | 'paused' | 'failed';

    target: MonitorsPageSemanticMonitor.Target;

    updated_at: string;

    last_change_at?: string | null;

    last_run_at?: string | null;

    /**
     * User-defined tags for grouping and filtering monitors and their changes.
     */
    tags?: Array<string>;

    webhook?: MonitorsPageSemanticMonitor.Webhook | null;
  }

  export namespace MonitorsPageSemanticMonitor {
    /**
     * Detect meaning-level changes that match a natural language query.
     */
    export interface ChangeDetection {
      query: string;

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

    export interface Target {
      type: 'page';

      url: string;

      /**
       * Normalize whitespace before comparing or analyzing text.
       */
      normalize_whitespace?: boolean;
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
   * An extract monitor using semantic change detection.
   */
  export interface MonitorsExtractSemanticMonitor {
    id: string;

    /**
     * Detect meaning-level changes that match a natural language query.
     */
    change_detection: MonitorsExtractSemanticMonitor.ChangeDetection;

    created_at: string;

    name: string;

    /**
     * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
     * every 6 hours or every 2 days. The total interval (frequency × unit) must be
     * between 10 minutes and 1 year.
     */
    schedule: MonitorsExtractSemanticMonitor.Schedule;

    status: 'active' | 'paused' | 'failed';

    target: MonitorsExtractSemanticMonitor.Target;

    updated_at: string;

    last_change_at?: string | null;

    last_run_at?: string | null;

    /**
     * User-defined tags for grouping and filtering monitors and their changes.
     */
    tags?: Array<string>;

    webhook?: MonitorsExtractSemanticMonitor.Webhook | null;
  }

  export namespace MonitorsExtractSemanticMonitor {
    /**
     * Detect meaning-level changes that match a natural language query.
     */
    export interface ChangeDetection {
      query: string;

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

    export interface Target {
      type: 'extract';

      /**
       * Root URL to extract structured data from.
       */
      url: string;

      follow_subdomains?: boolean;

      /**
       * Optional natural-language instructions guiding what to extract.
       */
      instructions?: string;

      /**
       * Optional maximum link depth from the starting URL (0 = only the starting page).
       */
      max_depth?: number;

      /**
       * Maximum number of pages to analyze during extraction.
       */
      max_pages?: number;

      /**
       * JSON Schema describing the structured data to extract and watch for changes. If
       * omitted, a default summary + key-points schema is used.
       */
      schema?: { [key: string]: unknown };
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

/**
 * Union of monitor response shapes.
 */
export type MonitorUpdateResponse =
  | MonitorUpdateResponse.MonitorsPageExactMonitor
  | MonitorUpdateResponse.MonitorsSitemapExactMonitor
  | MonitorUpdateResponse.MonitorsPageSemanticMonitor
  | MonitorUpdateResponse.MonitorsExtractSemanticMonitor;

export namespace MonitorUpdateResponse {
  /**
   * A page monitor using exact change detection.
   */
  export interface MonitorsPageExactMonitor {
    id: string;

    /**
     * Detect exact changes. For page targets, this means visible text diffs. For
     * sitemap targets, this means URL additions and removals.
     */
    change_detection: MonitorsPageExactMonitor.ChangeDetection;

    created_at: string;

    name: string;

    /**
     * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
     * every 6 hours or every 2 days. The total interval (frequency × unit) must be
     * between 10 minutes and 1 year.
     */
    schedule: MonitorsPageExactMonitor.Schedule;

    status: 'active' | 'paused' | 'failed';

    target: MonitorsPageExactMonitor.Target;

    updated_at: string;

    last_change_at?: string | null;

    last_run_at?: string | null;

    /**
     * User-defined tags for grouping and filtering monitors and their changes.
     */
    tags?: Array<string>;

    webhook?: MonitorsPageExactMonitor.Webhook | null;
  }

  export namespace MonitorsPageExactMonitor {
    /**
     * Detect exact changes. For page targets, this means visible text diffs. For
     * sitemap targets, this means URL additions and removals.
     */
    export interface ChangeDetection {
      type: 'exact';
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

    export interface Target {
      type: 'page';

      url: string;

      /**
       * Normalize whitespace before comparing or analyzing text.
       */
      normalize_whitespace?: boolean;
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
   * A sitemap monitor using exact change detection.
   */
  export interface MonitorsSitemapExactMonitor {
    id: string;

    /**
     * Detect exact changes. For page targets, this means visible text diffs. For
     * sitemap targets, this means URL additions and removals.
     */
    change_detection: MonitorsSitemapExactMonitor.ChangeDetection;

    created_at: string;

    name: string;

    /**
     * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
     * every 6 hours or every 2 days. The total interval (frequency × unit) must be
     * between 10 minutes and 1 year.
     */
    schedule: MonitorsSitemapExactMonitor.Schedule;

    status: 'active' | 'paused' | 'failed';

    target: MonitorsSitemapExactMonitor.Target;

    updated_at: string;

    last_change_at?: string | null;

    last_run_at?: string | null;

    /**
     * User-defined tags for grouping and filtering monitors and their changes.
     */
    tags?: Array<string>;

    webhook?: MonitorsSitemapExactMonitor.Webhook | null;
  }

  export namespace MonitorsSitemapExactMonitor {
    /**
     * Detect exact changes. For page targets, this means visible text diffs. For
     * sitemap targets, this means URL additions and removals.
     */
    export interface ChangeDetection {
      type: 'exact';
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

    export interface Target {
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

      max_urls?: number;
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
   * A page monitor using semantic change detection.
   */
  export interface MonitorsPageSemanticMonitor {
    id: string;

    /**
     * Detect meaning-level changes that match a natural language query.
     */
    change_detection: MonitorsPageSemanticMonitor.ChangeDetection;

    created_at: string;

    name: string;

    /**
     * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
     * every 6 hours or every 2 days. The total interval (frequency × unit) must be
     * between 10 minutes and 1 year.
     */
    schedule: MonitorsPageSemanticMonitor.Schedule;

    status: 'active' | 'paused' | 'failed';

    target: MonitorsPageSemanticMonitor.Target;

    updated_at: string;

    last_change_at?: string | null;

    last_run_at?: string | null;

    /**
     * User-defined tags for grouping and filtering monitors and their changes.
     */
    tags?: Array<string>;

    webhook?: MonitorsPageSemanticMonitor.Webhook | null;
  }

  export namespace MonitorsPageSemanticMonitor {
    /**
     * Detect meaning-level changes that match a natural language query.
     */
    export interface ChangeDetection {
      query: string;

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

    export interface Target {
      type: 'page';

      url: string;

      /**
       * Normalize whitespace before comparing or analyzing text.
       */
      normalize_whitespace?: boolean;
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
   * An extract monitor using semantic change detection.
   */
  export interface MonitorsExtractSemanticMonitor {
    id: string;

    /**
     * Detect meaning-level changes that match a natural language query.
     */
    change_detection: MonitorsExtractSemanticMonitor.ChangeDetection;

    created_at: string;

    name: string;

    /**
     * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
     * every 6 hours or every 2 days. The total interval (frequency × unit) must be
     * between 10 minutes and 1 year.
     */
    schedule: MonitorsExtractSemanticMonitor.Schedule;

    status: 'active' | 'paused' | 'failed';

    target: MonitorsExtractSemanticMonitor.Target;

    updated_at: string;

    last_change_at?: string | null;

    last_run_at?: string | null;

    /**
     * User-defined tags for grouping and filtering monitors and their changes.
     */
    tags?: Array<string>;

    webhook?: MonitorsExtractSemanticMonitor.Webhook | null;
  }

  export namespace MonitorsExtractSemanticMonitor {
    /**
     * Detect meaning-level changes that match a natural language query.
     */
    export interface ChangeDetection {
      query: string;

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

    export interface Target {
      type: 'extract';

      /**
       * Root URL to extract structured data from.
       */
      url: string;

      follow_subdomains?: boolean;

      /**
       * Optional natural-language instructions guiding what to extract.
       */
      instructions?: string;

      /**
       * Optional maximum link depth from the starting URL (0 = only the starting page).
       */
      max_depth?: number;

      /**
       * Maximum number of pages to analyze during extraction.
       */
      max_pages?: number;

      /**
       * JSON Schema describing the structured data to extract and watch for changes. If
       * omitted, a default summary + key-points schema is used.
       */
      schema?: { [key: string]: unknown };
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

export interface MonitorListResponse {
  data: Array<
    | MonitorListResponse.MonitorsPageExactMonitor
    | MonitorListResponse.MonitorsSitemapExactMonitor
    | MonitorListResponse.MonitorsPageSemanticMonitor
    | MonitorListResponse.MonitorsExtractSemanticMonitor
  >;

  has_more: boolean;

  next_cursor: string | null;
}

export namespace MonitorListResponse {
  /**
   * A page monitor using exact change detection.
   */
  export interface MonitorsPageExactMonitor {
    id: string;

    /**
     * Detect exact changes. For page targets, this means visible text diffs. For
     * sitemap targets, this means URL additions and removals.
     */
    change_detection: MonitorsPageExactMonitor.ChangeDetection;

    created_at: string;

    name: string;

    /**
     * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
     * every 6 hours or every 2 days. The total interval (frequency × unit) must be
     * between 10 minutes and 1 year.
     */
    schedule: MonitorsPageExactMonitor.Schedule;

    status: 'active' | 'paused' | 'failed';

    target: MonitorsPageExactMonitor.Target;

    updated_at: string;

    last_change_at?: string | null;

    last_run_at?: string | null;

    /**
     * User-defined tags for grouping and filtering monitors and their changes.
     */
    tags?: Array<string>;

    webhook?: MonitorsPageExactMonitor.Webhook | null;
  }

  export namespace MonitorsPageExactMonitor {
    /**
     * Detect exact changes. For page targets, this means visible text diffs. For
     * sitemap targets, this means URL additions and removals.
     */
    export interface ChangeDetection {
      type: 'exact';
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

    export interface Target {
      type: 'page';

      url: string;

      /**
       * Normalize whitespace before comparing or analyzing text.
       */
      normalize_whitespace?: boolean;
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
   * A sitemap monitor using exact change detection.
   */
  export interface MonitorsSitemapExactMonitor {
    id: string;

    /**
     * Detect exact changes. For page targets, this means visible text diffs. For
     * sitemap targets, this means URL additions and removals.
     */
    change_detection: MonitorsSitemapExactMonitor.ChangeDetection;

    created_at: string;

    name: string;

    /**
     * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
     * every 6 hours or every 2 days. The total interval (frequency × unit) must be
     * between 10 minutes and 1 year.
     */
    schedule: MonitorsSitemapExactMonitor.Schedule;

    status: 'active' | 'paused' | 'failed';

    target: MonitorsSitemapExactMonitor.Target;

    updated_at: string;

    last_change_at?: string | null;

    last_run_at?: string | null;

    /**
     * User-defined tags for grouping and filtering monitors and their changes.
     */
    tags?: Array<string>;

    webhook?: MonitorsSitemapExactMonitor.Webhook | null;
  }

  export namespace MonitorsSitemapExactMonitor {
    /**
     * Detect exact changes. For page targets, this means visible text diffs. For
     * sitemap targets, this means URL additions and removals.
     */
    export interface ChangeDetection {
      type: 'exact';
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

    export interface Target {
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

      max_urls?: number;
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
   * A page monitor using semantic change detection.
   */
  export interface MonitorsPageSemanticMonitor {
    id: string;

    /**
     * Detect meaning-level changes that match a natural language query.
     */
    change_detection: MonitorsPageSemanticMonitor.ChangeDetection;

    created_at: string;

    name: string;

    /**
     * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
     * every 6 hours or every 2 days. The total interval (frequency × unit) must be
     * between 10 minutes and 1 year.
     */
    schedule: MonitorsPageSemanticMonitor.Schedule;

    status: 'active' | 'paused' | 'failed';

    target: MonitorsPageSemanticMonitor.Target;

    updated_at: string;

    last_change_at?: string | null;

    last_run_at?: string | null;

    /**
     * User-defined tags for grouping and filtering monitors and their changes.
     */
    tags?: Array<string>;

    webhook?: MonitorsPageSemanticMonitor.Webhook | null;
  }

  export namespace MonitorsPageSemanticMonitor {
    /**
     * Detect meaning-level changes that match a natural language query.
     */
    export interface ChangeDetection {
      query: string;

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

    export interface Target {
      type: 'page';

      url: string;

      /**
       * Normalize whitespace before comparing or analyzing text.
       */
      normalize_whitespace?: boolean;
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
   * An extract monitor using semantic change detection.
   */
  export interface MonitorsExtractSemanticMonitor {
    id: string;

    /**
     * Detect meaning-level changes that match a natural language query.
     */
    change_detection: MonitorsExtractSemanticMonitor.ChangeDetection;

    created_at: string;

    name: string;

    /**
     * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
     * every 6 hours or every 2 days. The total interval (frequency × unit) must be
     * between 10 minutes and 1 year.
     */
    schedule: MonitorsExtractSemanticMonitor.Schedule;

    status: 'active' | 'paused' | 'failed';

    target: MonitorsExtractSemanticMonitor.Target;

    updated_at: string;

    last_change_at?: string | null;

    last_run_at?: string | null;

    /**
     * User-defined tags for grouping and filtering monitors and their changes.
     */
    tags?: Array<string>;

    webhook?: MonitorsExtractSemanticMonitor.Webhook | null;
  }

  export namespace MonitorsExtractSemanticMonitor {
    /**
     * Detect meaning-level changes that match a natural language query.
     */
    export interface ChangeDetection {
      query: string;

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

    export interface Target {
      type: 'extract';

      /**
       * Root URL to extract structured data from.
       */
      url: string;

      follow_subdomains?: boolean;

      /**
       * Optional natural-language instructions guiding what to extract.
       */
      instructions?: string;

      /**
       * Optional maximum link depth from the starting URL (0 = only the starting page).
       */
      max_depth?: number;

      /**
       * Maximum number of pages to analyze during extraction.
       */
      max_pages?: number;

      /**
       * JSON Schema describing the structured data to extract and watch for changes. If
       * omitted, a default summary + key-points schema is used.
       */
      schema?: { [key: string]: unknown };
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
  data: Array<
    | MonitorListAccountChangesResponse.MonitorsPageExactChangeSummary
    | MonitorListAccountChangesResponse.MonitorsSitemapExactChangeSummary
    | MonitorListAccountChangesResponse.MonitorsPageSemanticChangeSummary
    | MonitorListAccountChangesResponse.MonitorsExtractSemanticChangeSummary
  >;

  has_more: boolean;

  next_cursor: string | null;
}

export namespace MonitorListAccountChangesResponse {
  export interface MonitorsPageExactChangeSummary {
    id: string;

    change_detection_type: 'exact';

    detected_at: string;

    monitor_id: string;

    summary: string;

    target_type: 'page';

    title: string;

    url: string;

    /**
     * User-defined tags for grouping and filtering monitors and their changes.
     */
    tags?: Array<string>;
  }

  export interface MonitorsSitemapExactChangeSummary {
    id: string;

    added_url_count: number;

    change_detection_type: 'exact';

    detected_at: string;

    monitor_id: string;

    removed_url_count: number;

    summary: string;

    target_type: 'sitemap';

    title: string;

    url: string;

    /**
     * User-defined tags for grouping and filtering monitors and their changes.
     */
    tags?: Array<string>;
  }

  export interface MonitorsPageSemanticChangeSummary {
    id: string;

    change_detection_type: 'semantic';

    confidence: number;

    detected_at: string;

    importance: 'low' | 'medium' | 'high';

    monitor_id: string;

    summary: string;

    target_type: 'page';

    title: string;

    url: string;

    /**
     * User-defined tags for grouping and filtering monitors and their changes.
     */
    tags?: Array<string>;
  }

  export interface MonitorsExtractSemanticChangeSummary {
    id: string;

    change_detection_type: 'semantic';

    confidence: number;

    detected_at: string;

    importance: 'low' | 'medium' | 'high';

    matched_url_count: number;

    monitor_id: string;

    summary: string;

    target_type: 'extract';

    title: string;

    url: string;

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

    monitor_id: string;

    /**
     * The first run after monitor creation is a baseline run.
     */
    run_type: 'baseline' | 'scheduled';

    status: 'queued' | 'running' | 'completed' | 'failed';

    target_type: 'page' | 'sitemap' | 'extract';

    change_id?: string | null;

    completed_at?: string | null;

    error?: Data.Error | null;

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
  data: Array<
    | MonitorListChangesResponse.MonitorsPageExactChangeSummary
    | MonitorListChangesResponse.MonitorsSitemapExactChangeSummary
    | MonitorListChangesResponse.MonitorsPageSemanticChangeSummary
    | MonitorListChangesResponse.MonitorsExtractSemanticChangeSummary
  >;

  has_more: boolean;

  next_cursor: string | null;
}

export namespace MonitorListChangesResponse {
  export interface MonitorsPageExactChangeSummary {
    id: string;

    change_detection_type: 'exact';

    detected_at: string;

    monitor_id: string;

    summary: string;

    target_type: 'page';

    title: string;

    url: string;

    /**
     * User-defined tags for grouping and filtering monitors and their changes.
     */
    tags?: Array<string>;
  }

  export interface MonitorsSitemapExactChangeSummary {
    id: string;

    added_url_count: number;

    change_detection_type: 'exact';

    detected_at: string;

    monitor_id: string;

    removed_url_count: number;

    summary: string;

    target_type: 'sitemap';

    title: string;

    url: string;

    /**
     * User-defined tags for grouping and filtering monitors and their changes.
     */
    tags?: Array<string>;
  }

  export interface MonitorsPageSemanticChangeSummary {
    id: string;

    change_detection_type: 'semantic';

    confidence: number;

    detected_at: string;

    importance: 'low' | 'medium' | 'high';

    monitor_id: string;

    summary: string;

    target_type: 'page';

    title: string;

    url: string;

    /**
     * User-defined tags for grouping and filtering monitors and their changes.
     */
    tags?: Array<string>;
  }

  export interface MonitorsExtractSemanticChangeSummary {
    id: string;

    change_detection_type: 'semantic';

    confidence: number;

    detected_at: string;

    importance: 'low' | 'medium' | 'high';

    matched_url_count: number;

    monitor_id: string;

    summary: string;

    target_type: 'extract';

    title: string;

    url: string;

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

    monitor_id: string;

    /**
     * The first run after monitor creation is a baseline run.
     */
    run_type: 'baseline' | 'scheduled';

    status: 'queued' | 'running' | 'completed' | 'failed';

    target_type: 'page' | 'sitemap' | 'extract';

    change_id?: string | null;

    completed_at?: string | null;

    error?: Data.Error | null;

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
 * Union of full change detail objects.
 */
export type MonitorRetrieveChangeResponse =
  | MonitorRetrieveChangeResponse.MonitorsPageExactChange
  | MonitorRetrieveChangeResponse.MonitorsSitemapExactChange
  | MonitorRetrieveChangeResponse.MonitorsPageSemanticChange
  | MonitorRetrieveChangeResponse.MonitorsExtractSemanticChange;

export namespace MonitorRetrieveChangeResponse {
  export interface MonitorsPageExactChange {
    id: string;

    change_detection_type: 'exact';

    detected_at: string;

    /**
     * Text diff between the previous and current page baseline.
     */
    diff: string;

    monitor_id: string;

    summary: string;

    target_type: 'page';

    title: string;

    url: string;

    after_text_excerpt?: string;

    before_text_excerpt?: string;

    /**
     * User-defined tags for grouping and filtering monitors and their changes.
     */
    tags?: Array<string>;
  }

  export interface MonitorsSitemapExactChange {
    id: string;

    added_url_count: number;

    added_urls: Array<string>;

    change_detection_type: 'exact';

    detected_at: string;

    monitor_id: string;

    removed_url_count: number;

    removed_urls: Array<string>;

    summary: string;

    target_type: 'sitemap';

    title: string;

    url: string;

    /**
     * User-defined tags for grouping and filtering monitors and their changes.
     */
    tags?: Array<string>;
  }

  export interface MonitorsPageSemanticChange {
    id: string;

    change_detection_type: 'semantic';

    confidence: number;

    detected_at: string;

    evidence: Array<MonitorsPageSemanticChange.Evidence>;

    importance: 'low' | 'medium' | 'high';

    monitor_id: string;

    query: string;

    summary: string;

    target_type: 'page';

    title: string;

    url: string;

    /**
     * User-defined tags for grouping and filtering monitors and their changes.
     */
    tags?: Array<string>;
  }

  export namespace MonitorsPageSemanticChange {
    export interface Evidence {
      after: string;

      before: string;
    }
  }

  export interface MonitorsExtractSemanticChange {
    id: string;

    change_detection_type: 'semantic';

    confidence: number;

    detected_at: string;

    evidence: Array<MonitorsExtractSemanticChange.Evidence>;

    importance: 'low' | 'medium' | 'high';

    matched_url_count: number;

    matched_urls: Array<string>;

    monitor_id: string;

    query: string;

    summary: string;

    target_type: 'extract';

    title: string;

    /**
     * Root URL of the extract target.
     */
    url: string;

    /**
     * User-defined tags for grouping and filtering monitors and their changes.
     */
    tags?: Array<string>;
  }

  export namespace MonitorsExtractSemanticChange {
    export interface Evidence {
      /**
       * Snapshot of the extracted data after the change.
       */
      after: string;

      /**
       * Snapshot of the extracted data before the change.
       */
      before: string;

      /**
       * Optional URL the evidence relates to. Absent for whole-target extract diffs.
       */
      url?: string;
    }
  }
}

export interface MonitorRunResponse {
  monitor_id: string;

  queued: boolean;
}

export type MonitorCreateParams =
  | MonitorCreateParams.MonitorsCreatePageExactMonitorRequest
  | MonitorCreateParams.MonitorsCreateSitemapExactMonitorRequest
  | MonitorCreateParams.MonitorsCreatePageSemanticMonitorRequest
  | MonitorCreateParams.MonitorsCreateExtractSemanticMonitorRequest;

export declare namespace MonitorCreateParams {
  export interface MonitorsCreatePageExactMonitorRequest {
    /**
     * Detect exact changes. For page targets, this means visible text diffs. For
     * sitemap targets, this means URL additions and removals.
     */
    change_detection: MonitorsCreatePageExactMonitorRequest.ChangeDetection;

    name: string;

    /**
     * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
     * every 6 hours or every 2 days. The total interval (frequency × unit) must be
     * between 10 minutes and 1 year.
     */
    schedule: MonitorsCreatePageExactMonitorRequest.Schedule;

    target: MonitorsCreatePageExactMonitorRequest.Target;

    /**
     * User-defined tags for grouping and filtering monitors and their changes.
     */
    tags?: Array<string>;

    webhook?: MonitorsCreatePageExactMonitorRequest.Webhook | null;
  }

  export namespace MonitorsCreatePageExactMonitorRequest {
    /**
     * Detect exact changes. For page targets, this means visible text diffs. For
     * sitemap targets, this means URL additions and removals.
     */
    export interface ChangeDetection {
      type: 'exact';
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

    export interface Target {
      type: 'page';

      url: string;

      /**
       * Normalize whitespace before comparing or analyzing text.
       */
      normalize_whitespace?: boolean;
    }

    export interface Webhook {
      /**
       * Webhook URL called when a change is detected.
       */
      url: string;
    }
  }

  export interface MonitorsCreateSitemapExactMonitorRequest {
    /**
     * Detect exact changes. For page targets, this means visible text diffs. For
     * sitemap targets, this means URL additions and removals.
     */
    change_detection: MonitorsCreateSitemapExactMonitorRequest.ChangeDetection;

    name: string;

    /**
     * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
     * every 6 hours or every 2 days. The total interval (frequency × unit) must be
     * between 10 minutes and 1 year.
     */
    schedule: MonitorsCreateSitemapExactMonitorRequest.Schedule;

    target: MonitorsCreateSitemapExactMonitorRequest.Target;

    /**
     * User-defined tags for grouping and filtering monitors and their changes.
     */
    tags?: Array<string>;

    webhook?: MonitorsCreateSitemapExactMonitorRequest.Webhook | null;
  }

  export namespace MonitorsCreateSitemapExactMonitorRequest {
    /**
     * Detect exact changes. For page targets, this means visible text diffs. For
     * sitemap targets, this means URL additions and removals.
     */
    export interface ChangeDetection {
      type: 'exact';
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

    export interface Target {
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

      max_urls?: number;
    }

    export interface Webhook {
      /**
       * Webhook URL called when a change is detected.
       */
      url: string;
    }
  }

  export interface MonitorsCreatePageSemanticMonitorRequest {
    /**
     * Detect meaning-level changes that match a natural language query.
     */
    change_detection: MonitorsCreatePageSemanticMonitorRequest.ChangeDetection;

    name: string;

    /**
     * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
     * every 6 hours or every 2 days. The total interval (frequency × unit) must be
     * between 10 minutes and 1 year.
     */
    schedule: MonitorsCreatePageSemanticMonitorRequest.Schedule;

    target: MonitorsCreatePageSemanticMonitorRequest.Target;

    /**
     * User-defined tags for grouping and filtering monitors and their changes.
     */
    tags?: Array<string>;

    webhook?: MonitorsCreatePageSemanticMonitorRequest.Webhook | null;
  }

  export namespace MonitorsCreatePageSemanticMonitorRequest {
    /**
     * Detect meaning-level changes that match a natural language query.
     */
    export interface ChangeDetection {
      query: string;

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

    export interface Target {
      type: 'page';

      url: string;

      /**
       * Normalize whitespace before comparing or analyzing text.
       */
      normalize_whitespace?: boolean;
    }

    export interface Webhook {
      /**
       * Webhook URL called when a change is detected.
       */
      url: string;
    }
  }

  export interface MonitorsCreateExtractSemanticMonitorRequest {
    /**
     * Detect meaning-level changes that match a natural language query.
     */
    change_detection: MonitorsCreateExtractSemanticMonitorRequest.ChangeDetection;

    name: string;

    /**
     * Run the monitor on a fixed interval defined by a frequency and a unit, e.g.
     * every 6 hours or every 2 days. The total interval (frequency × unit) must be
     * between 10 minutes and 1 year.
     */
    schedule: MonitorsCreateExtractSemanticMonitorRequest.Schedule;

    target: MonitorsCreateExtractSemanticMonitorRequest.Target;

    /**
     * User-defined tags for grouping and filtering monitors and their changes.
     */
    tags?: Array<string>;

    webhook?: MonitorsCreateExtractSemanticMonitorRequest.Webhook | null;
  }

  export namespace MonitorsCreateExtractSemanticMonitorRequest {
    /**
     * Detect meaning-level changes that match a natural language query.
     */
    export interface ChangeDetection {
      query: string;

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

    export interface Target {
      type: 'extract';

      /**
       * Root URL to extract structured data from.
       */
      url: string;

      follow_subdomains?: boolean;

      /**
       * Optional natural-language instructions guiding what to extract.
       */
      instructions?: string;

      /**
       * Optional maximum link depth from the starting URL (0 = only the starting page).
       */
      max_depth?: number;

      /**
       * Maximum number of pages to analyze during extraction.
       */
      max_pages?: number;

      /**
       * JSON Schema describing the structured data to extract and watch for changes. If
       * omitted, a default summary + key-points schema is used.
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
   * Detect meaning-level changes that match a natural language query.
   */
  export interface MonitorsSemanticChangeDetection {
    query: string;

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

  export interface MonitorsPageTarget {
    type: 'page';

    url: string;

    /**
     * Normalize whitespace before comparing or analyzing text.
     */
    normalize_whitespace?: boolean;
  }

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

    max_urls?: number;
  }

  export interface MonitorsExtractTarget {
    type: 'extract';

    /**
     * Root URL to extract structured data from.
     */
    url: string;

    follow_subdomains?: boolean;

    /**
     * Optional natural-language instructions guiding what to extract.
     */
    instructions?: string;

    /**
     * Optional maximum link depth from the starting URL (0 = only the starting page).
     */
    max_depth?: number;

    /**
     * Maximum number of pages to analyze during extraction.
     */
    max_pages?: number;

    /**
     * JSON Schema describing the structured data to extract and watch for changes. If
     * omitted, a default summary + key-points schema is used.
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

  status?: 'active' | 'paused' | 'failed';

  /**
   * Filter to items that have this tag.
   */
  tag?: string;

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

  status?: 'queued' | 'running' | 'completed' | 'failed';
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

  status?: 'queued' | 'running' | 'completed' | 'failed';
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
