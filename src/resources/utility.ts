// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Utility extends APIResource {
  /**
   * Signal that you may fetch brand data soon to improve latency. The type field
   * selects what to prefetch (currently only 'brand') and identifier carries exactly
   * one lookup key: a domain, or an email whose domain is extracted and validated
   * (free email providers and disposable email addresses are not allowed).
   *
   * @example
   * ```ts
   * const response = await client.utility.prefetch({
   *   identifier: { domain: 'domain' },
   *   type: 'brand',
   * });
   * ```
   */
  prefetch(body: UtilityPrefetchParams, options?: RequestOptions): APIPromise<UtilityPrefetchResponse> {
    return this._client.post('/utility/prefetch', { body, ...options });
  }
}

export interface UtilityPrefetchResponse {
  /**
   * The domain that was queued for prefetching
   */
  domain?: string;

  /**
   * Metadata about the API key used for the request. Included in every response
   * whenever a valid API key is provided, even when the response status is not 200.
   */
  key_metadata?: UtilityPrefetchResponse.KeyMetadata;

  /**
   * Success message
   */
  message?: string;

  /**
   * Status of the response, e.g., 'ok'
   */
  status?: string;

  /**
   * The type of prefetch that was queued, echoed from the request (currently always
   * 'brand')
   */
  type?: 'brand';
}

export namespace UtilityPrefetchResponse {
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

export interface UtilityPrefetchParams {
  /**
   * Identifier of the brand to prefetch. Provide exactly one of domain or email.
   */
  identifier:
    | UtilityPrefetchParams.UtilityPrefetchDomainIdentifier
    | UtilityPrefetchParams.UtilityPrefetchEmailIdentifier;

  /**
   * What to prefetch. Currently only 'brand' is supported.
   */
  type: 'brand';

  /**
   * Optional caller-defined tags for tracking this request. Tags are recorded on the
   * request's usage log and can be used to filter usage on the dashboard usage page.
   * Up to 20 tags, each 1-50 characters.
   */
  tags?: Array<string>;

  /**
   * Optional timeout in milliseconds for the request. If the request takes longer
   * than this value, it will be aborted with a 408 status code. Maximum allowed
   * value is 300000ms (5 minutes).
   */
  timeoutMS?: number;
}

export namespace UtilityPrefetchParams {
  /**
   * Prefetch brand data by domain.
   */
  export interface UtilityPrefetchDomainIdentifier {
    /**
     * Domain name to prefetch brand data for
     */
    domain: string;
  }

  /**
   * Prefetch brand data by email. The domain will be extracted and validated.
   */
  export interface UtilityPrefetchEmailIdentifier {
    /**
     * Email address to prefetch brand data for. The domain will be extracted from the
     * email. Free email providers (gmail.com, yahoo.com, etc.) and disposable email
     * addresses are not allowed.
     */
    email: string;
  }
}

export declare namespace Utility {
  export {
    type UtilityPrefetchResponse as UtilityPrefetchResponse,
    type UtilityPrefetchParams as UtilityPrefetchParams,
  };
}
