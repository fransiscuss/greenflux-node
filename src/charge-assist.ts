import { GreenfluxApiClient, type GreenfluxClientOptions, type QueryParameters, type RequestOptions } from "./client.js";
import { GreenfluxApiError } from "./errors.js";
import type { JsonObject, Location, PaymentMethod, SessionStatus, StartSessionRequest, StartSessionResponse, WalletResponse } from "./types.js";

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

  public getAppToken(appToken: string, options?: RequestOptions): Promise<JsonObject> {
    return this.get(`v2.1/token/${encodeURIComponent(appToken)}`, options);
  }

  /** Returns null only when the app token does not exist (HTTP 404). */
  public async tryGetAppToken(appToken: string, options?: RequestOptions): Promise<JsonObject | null> {
    try {
      return await this.getAppToken(appToken, options);
    } catch (error) {
      if (error instanceof GreenfluxApiError && error.status === 404) return null;
      throw error;
    }
  }

  public createAppToken(body: JsonObject, options?: RequestOptions): Promise<JsonObject> {
    return this.post("v2.1/token", body, options);
  }

  /** Returns null only when the wallet does not exist (HTTP 404). */
  public async tryGetWallet(appToken: string, locationId?: string, options?: RequestOptions): Promise<WalletResponse | null> {
    try {
      return await this.get(`payment/${encodeURIComponent(appToken)}/wallet`, { ...options, query: { locationId } });
    } catch (error) {
      if (error instanceof GreenfluxApiError && error.status === 404) return null;
      throw error;
    }
  }

  public addExternalPaymentMethod(appToken: string, body: JsonObject, options?: RequestOptions): Promise<PaymentMethod> {
    return this.put(`payment/${encodeURIComponent(appToken)}/external`, body, options);
  }

  public startSession(appToken: string, body: StartSessionRequest, options?: RequestOptions): Promise<StartSessionResponse> {
    return this.post("session/start", body, { ...options, query: { appToken } });
  }

  public stopSession(appToken: string, body: JsonObject, options?: RequestOptions): Promise<SessionStatus> {
    return this.post("session/stop", body, { ...options, query: { appToken } });
  }

  public getSessionStatus(appToken: string, chargeSessionId: string, maxDataPoints?: number, options?: RequestOptions): Promise<SessionStatus> {
    return this.get("session/status", { ...options, query: { appToken, chargeSessionId, maxDataPoints } });
  }
}
