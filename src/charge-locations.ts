import { GreenfluxApiClient, type GreenfluxClientOptions, type RequestOptions } from "./client.js";
import type {
  ChargeStation,
  ChargeStationQuery,
  CreateManagedLocationRequest,
  ManagedLocation,
  ManagedLocationByIdQuery,
  ManagedLocationQuery,
} from "./types/index.js";

/** Client for Greenflux Charge Location Management API. */
export class ChargeLocationManagementClient extends GreenfluxApiClient {
  public constructor(options: GreenfluxClientOptions) {
    super(options);
  }

  public getLocations(versionNumber: string, query?: ManagedLocationQuery, options?: RequestOptions): Promise<ManagedLocation[]> {
    return this.get<ManagedLocation[]>(`api/${encodeURIComponent(versionNumber)}/Locations`, this.optionsWithQuery(options, query));
  }

  public getLocationById(versionNumber: string, locationId: string, query?: ManagedLocationByIdQuery, options?: RequestOptions): Promise<ManagedLocation> {
    return this.get<ManagedLocation>(`api/${encodeURIComponent(versionNumber)}/Locations/${encodeURIComponent(locationId)}`, this.optionsWithQuery(options, query));
  }

  public createLocation(versionNumber: string, body: CreateManagedLocationRequest, options?: RequestOptions): Promise<ManagedLocation> {
    return this.post<ManagedLocation>(`api/${encodeURIComponent(versionNumber)}/Locations`, body, options);
  }

  public getChargeStations(versionNumber: string, query?: ChargeStationQuery, options?: RequestOptions): Promise<ChargeStation[]> {
    return this.get<ChargeStation[]>(`api/${encodeURIComponent(versionNumber)}/ChargeStations`, this.optionsWithQuery(options, query));
  }
}
