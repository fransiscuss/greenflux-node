import { GreenfluxApiClient, type GreenfluxClientOptions, type QueryParameters, type RequestOptions } from "./client.js";
import type { ApiEnvelope, JsonObject, Location } from "./types.js";

/** Client for Greenflux Charge Location Management API. */
export class ChargeLocationManagementClient extends GreenfluxApiClient {
  public constructor(options: GreenfluxClientOptions) {
    super(options);
  }

  public getLocations(versionNumber: string, query?: QueryParameters, options?: RequestOptions): Promise<ApiEnvelope<Location[]>> {
    return this.get(`api/${encodeURIComponent(versionNumber)}/Locations`, { ...options, query });
  }

  public getLocationById(versionNumber: string, locationId: string, query?: QueryParameters, options?: RequestOptions): Promise<ApiEnvelope<Location>> {
    return this.get(`api/${encodeURIComponent(versionNumber)}/Locations/${encodeURIComponent(locationId)}`, { ...options, query });
  }

  public createLocation(versionNumber: string, body: JsonObject, options?: RequestOptions): Promise<ApiEnvelope<Location>> {
    return this.post(`api/${encodeURIComponent(versionNumber)}/Locations`, body, options);
  }

  public getChargeStations(versionNumber: string, query?: QueryParameters, options?: RequestOptions): Promise<ApiEnvelope> {
    return this.get(`api/${encodeURIComponent(versionNumber)}/ChargeStations`, { ...options, query });
  }
}
