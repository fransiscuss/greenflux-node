import { GreenfluxApiClient, type GreenfluxClientOptions, type RequestOptions } from "./client.js";
import { GreenfluxApiError } from "./errors.js";
import type {
  AppToken,
  CreateAppTokenRequest,
  ExternalPaymentMethodRequest,
  Location,
  LocationFilters,
  LocationSearchQuery,
  LocationSearchResponse,
  PaymentMethod,
  SessionStatus,
  StartSessionRequest,
  StartSessionResponse,
  StopSessionRequest,
  WalletResponse,
  WalletTariffResponse,
} from "./types/index.js";

export type { LocationFilters } from "./types/index.js";

/** Client for the Greenflux Charge Assist API. */
export class ChargeAssistClient extends GreenfluxApiClient {
  public constructor(options: GreenfluxClientOptions) {
    super(options);
  }

  public serviceStatus(options?: RequestOptions): Promise<undefined> {
    return this.get("servicestatus", options).then(() => undefined);
  }

  public getLocationById(id: string, filters?: LocationFilters, options?: RequestOptions): Promise<Location> {
    return this.get<Location>(`locations/${encodeURIComponent(id)}`, this.optionsWithQuery(options, filters));
  }

  public searchLocations(q: string, filters?: LocationSearchQuery, options?: RequestOptions): Promise<LocationSearchResponse> {
    return this.get<LocationSearchResponse>("locations/search", this.optionsWithQuery(options, { q, ...filters }));
  }

  public getTariff(appToken: string, locationId: string, evseUid: string, connectorId?: string, options?: RequestOptions): Promise<WalletTariffResponse> {
    return this.get<WalletTariffResponse>(`tariff/${encodeURIComponent(appToken)}/evse/${encodeURIComponent(locationId)}/${encodeURIComponent(evseUid)}`, {
      ...options,
      query: { connectorId },
    });
  }

  public getAppToken(appToken: string, options?: RequestOptions): Promise<AppToken> {
    return this.get<AppToken>(`v2.1/token/${encodeURIComponent(appToken)}`, options);
  }

  /** Returns null only when the app token does not exist (HTTP 404). */
  public async tryGetAppToken(appToken: string, options?: RequestOptions): Promise<AppToken | null> {
    try {
      return await this.getAppToken(appToken, options);
    } catch (error) {
      if (error instanceof GreenfluxApiError && error.status === 404) return null;
      throw error;
    }
  }

  public createAppToken(body: CreateAppTokenRequest, options?: RequestOptions): Promise<AppToken> {
    return this.post<AppToken>("v2.1/token", body, options);
  }

  /** Returns null only when the wallet does not exist (HTTP 404). */
  public async tryGetWallet(appToken: string, locationId?: string, options?: RequestOptions): Promise<WalletResponse | null> {
    try {
      return await this.get<WalletResponse>(`payment/${encodeURIComponent(appToken)}/wallet`, { ...options, query: { locationId } });
    } catch (error) {
      if (error instanceof GreenfluxApiError && error.status === 404) return null;
      throw error;
    }
  }

  public addExternalPaymentMethod(appToken: string, body: ExternalPaymentMethodRequest, options?: RequestOptions): Promise<PaymentMethod> {
    return this.put<PaymentMethod>(`payment/${encodeURIComponent(appToken)}/external`, body, options);
  }

  public startSession(appToken: string, body: StartSessionRequest, options?: RequestOptions): Promise<StartSessionResponse> {
    return this.post<StartSessionResponse>("session/start", body, { ...options, query: { appToken } });
  }

  public stopSession(appToken: string, body: StopSessionRequest, options?: RequestOptions): Promise<SessionStatus> {
    return this.post<SessionStatus>("session/stop", body, { ...options, query: { appToken } });
  }

  public getSessionStatus(appToken: string, chargeSessionId: string, maxDataPoints?: number, options?: RequestOptions): Promise<SessionStatus> {
    return this.get<SessionStatus>("session/status", { ...options, query: { appToken, chargeSessionId, maxDataPoints } });
  }
}
