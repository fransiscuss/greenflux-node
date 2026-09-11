import { GreenfluxApiClient, type GreenfluxClientOptions, type QueryParameters, type RequestOptions } from "./client.js";
import type { ApiEnvelope, Location } from "./types.js";

/** Client for the Greenflux Platform / CPO / eMSP API. */
export class GreenfluxPlatformClient extends GreenfluxApiClient {
  public constructor(options: GreenfluxClientOptions) {
    super(options);
  }

  public getCpoLocations(versionNumber: string, query?: QueryParameters, options?: RequestOptions): Promise<ApiEnvelope<Location[]>> {
    return this.get(`api/${encodeURIComponent(versionNumber)}/cpolocations`, { ...options, query });
  }

  public getCdrs(versionNumber: string, query?: QueryParameters, options?: RequestOptions): Promise<ApiEnvelope> {
    return this.get(`api/${encodeURIComponent(versionNumber)}/cdrs`, { ...options, query });
  }
}
