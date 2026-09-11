import { GreenfluxApiError } from "./errors.js";
import type { JsonObject, JsonValue } from "./types.js";

export type QueryValue = string | number | boolean | Date | null | undefined;
export type QueryParameters = Record<string, QueryValue | readonly QueryValue[]>;
export type FetchImplementation = typeof fetch;

export interface GreenfluxClientOptions {
  /** The API root, for example `https://platform.greenflux.com/`. */
  baseUrl: string;
  /** Raw Greenflux token. The client sends `Authorization: Token <token>`. */
  token?: string;
  /** Raw Charge Assist key. */
  apiKey?: string;
  /** Charge Assist gateway authentication style. Defaults to subscription-key. */
  chargeAssistAuthentication?: "subscription-key" | "authorization-api-key";
  /** Override fetch, primarily for tests or non-standard runtimes. */
  fetch?: FetchImplementation;
  /** Extra headers applied to every request. Explicit request headers win. */
  headers?: HeadersInit;
}

export interface RequestOptions {
  query?: QueryParameters;
  headers?: HeadersInit;
  signal?: AbortSignal;
}

/**
 * Shared transport for Greenflux APIs. It accepts every 2xx status, serializes
 * JSON exactly as supplied, and preserves an error response body for diagnosis.
 */
export class GreenfluxApiClient {
  private readonly baseUrl: string;
  private readonly fetchImplementation: FetchImplementation;
  private readonly defaults: Headers;

  public constructor(options: GreenfluxClientOptions) {
    if (!options.baseUrl) throw new Error("Greenflux client requires a baseUrl.");
    this.baseUrl = `${options.baseUrl.replace(/\/+$/, "")}/`;
    this.fetchImplementation = options.fetch ?? globalThis.fetch;
    if (!this.fetchImplementation) throw new Error("No fetch implementation is available; use Node.js 18+ or provide options.fetch.");

    this.defaults = new Headers(options.headers);
    this.defaults.set("accept", "application/json");
    if (options.token) this.defaults.set("authorization", `Token ${options.token}`);
    if (options.apiKey) {
      if ((options.chargeAssistAuthentication ?? "subscription-key") === "authorization-api-key") {
        this.defaults.set("authorization", `ApiKey ${options.apiKey}`);
      } else {
        this.defaults.set("ocp-apim-subscription-key", options.apiKey);
      }
    }
  }

  public get<T extends JsonValue = JsonValue>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>("GET", path, undefined, options);
  }

  public post<T extends JsonValue = JsonValue>(path: string, body?: JsonValue, options?: RequestOptions): Promise<T> {
    return this.request<T>("POST", path, body, options);
  }

  public put<T extends JsonValue = JsonValue>(path: string, body?: JsonValue, options?: RequestOptions): Promise<T> {
    return this.request<T>("PUT", path, body, options);
  }

  public patch<T extends JsonValue = JsonValue>(path: string, body?: JsonValue, options?: RequestOptions): Promise<T> {
    return this.request<T>("PATCH", path, body, options);
  }

  public delete<T extends JsonValue = JsonValue>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>("DELETE", path, undefined, options);
  }

  private async request<T extends JsonValue>(
    method: string,
    path: string,
    body: JsonValue | undefined,
    options: RequestOptions | undefined,
  ): Promise<T> {
    const url = new URL(path.replace(/^\/+/, ""), this.baseUrl);
    this.appendQuery(url, options?.query);
    const headers = new Headers(this.defaults);
    new Headers(options?.headers).forEach((value, name) => headers.set(name, value));
    if (body !== undefined) headers.set("content-type", "application/json");

    const response = await this.fetchImplementation(url, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: options?.signal,
    });
    const responseBody = await response.text();
    if (!response.ok) {
      throw new GreenfluxApiError(
        `Greenflux API request failed: ${method} ${url.pathname} returned ${response.status}.`,
        response.status,
        responseBody,
        response.headers,
      );
    }
    if (response.status === 204 || responseBody.length === 0) return undefined as unknown as T;
    try {
      return JSON.parse(responseBody) as T;
    } catch (error) {
      throw new GreenfluxApiError(
        `Greenflux API returned invalid JSON for ${method} ${url.pathname}.`,
        response.status,
        responseBody,
        response.headers,
      );
    }
  }

  private appendQuery(url: URL, query: QueryParameters | undefined): void {
    if (!query) return;
    for (const [name, input] of Object.entries(query)) {
      const values = Array.isArray(input) ? input : [input];
      for (const value of values) {
        if (value === undefined || value === null) continue;
        url.searchParams.append(name, value instanceof Date ? value.toISOString() : String(value));
      }
    }
  }
}

export type RequestBody = JsonObject | JsonValue[];
