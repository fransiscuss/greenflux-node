import { GreenfluxApiClient, type GreenfluxClientOptions, type RequestOptions } from "./client.js";
import type { ApiEnvelope, CdrListQuery, CdrResponse, PlatformListQuery, PlatformLocation, PlatformLocationResponse } from "./types/index.js";

/** Client for the Greenflux Platform / CPO / eMSP API. */
export class GreenfluxPlatformClient extends GreenfluxApiClient {
  public constructor(options: GreenfluxClientOptions) {
    super(options);
  }

  public getCpoLocations(versionNumber: string, query?: PlatformListQuery, options?: RequestOptions): Promise<PlatformLocationResponse> {
    return this.get<PlatformLocationResponse>(`api/${encodeURIComponent(versionNumber)}/locations`, this.optionsWithQuery(options, query));
  }

  public getCpoLocation(versionNumber: string, locationId: string, options?: RequestOptions): Promise<ApiEnvelope<PlatformLocation>> {
    return this.get<ApiEnvelope<PlatformLocation>>(`api/${encodeURIComponent(versionNumber)}/locations/${encodeURIComponent(locationId)}`, options);
  }

  public getCdrs(versionNumber: string, query?: CdrListQuery, options?: RequestOptions): Promise<CdrResponse> {
    return this.get<CdrResponse>(`api/${encodeURIComponent(versionNumber)}/cdrs`, this.optionsWithQuery(options, query));
  }
}
