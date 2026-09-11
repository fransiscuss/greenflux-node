import { GreenfluxApiClient, type GreenfluxClientOptions, type QueryParameters, type RequestOptions } from "./client.js";
import type { JsonObject, Location, StartSessionRequest, StartSessionResponse } from "./types.js";

export interface LocationFilters extends QueryParameters {
  "filter.evseUid"?: string;
  "filter.appToken"?: string;
  "filter.isAvailable"?: boolean;
  "filter.isFavorite"?: boolean;
  "filter.directPayEnabled"?: boolean;
  "filter.powerType"?: "AC" | "DC";
  "filter.connectorType"?: string;
  "filter.connectorTypes"?: readonly string[];
  "filter.minKw"?: number;
  "filter.maxKw"?: number;
  "filter.restrictedAccess"?: boolean;
  "filter.country"?: string;
}

/** Client for the Greenflux Charge Assist API. */
export class ChargeAssistClient extends GreenfluxApiClient {
  public constructor(options: GreenfluxClientOptions) {
    super(options);
  }

  public serviceStatus(options?: RequestOptions): Promise<undefined> {
    return this.get("servicestatus", options).then(() => undefined);
  }

  public getLocationById(id: string, filters?: LocationFilters, options?: RequestOptions): Promise<Location> {
    return this.get(`locations/${encodeURIComponent(id)}`, { ...options, query: filters });
  }

  public searchLocations(q: string, filters?: LocationFilters, options?: RequestOptions): Promise<JsonObject> {
    return this.get("locations/search", { ...options, query: { q, ...filters } });
  }

  public getTariff(appToken: string, locationId: string, evseUid: string, connectorId?: string, options?: RequestOptions): Promise<JsonObject> {
    return this.get(`tariff/${encodeURIComponent(appToken)}/evse/${encodeURIComponent(locationId)}/${encodeURIComponent(evseUid)}`, {
      ...options,
      query: { connectorId },
    });
  }

  public startSession(appToken: string, body: StartSessionRequest, options?: RequestOptions): Promise<StartSessionResponse> {
    return this.post("session/start", body, { ...options, query: { appToken } });
  }

  public stopSession(appToken: string, body: JsonObject, options?: RequestOptions): Promise<undefined> {
    return this.post("session/stop", body, { ...options, query: { appToken } }).then(() => undefined);
  }
}
