/** JSON values exchanged with Greenflux APIs. */
export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonObject | JsonValue[];
export interface JsonObject {
  [key: string]: JsonValue | undefined;
}

/** Common Location shape returned by Charge Assist and CPMS location endpoints. */
export interface Location extends JsonObject {
  id?: string;
  name?: string;
  country?: string;
  city?: string;
  evses?: Evse[];
}

export interface Evse extends JsonObject {
  uid?: string;
  evse_id?: string;
  status?: string;
  connectors?: Connector[];
}

export interface Connector extends JsonObject {
  id?: string;
  standard?: string;
  format?: string;
  power_type?: string;
  powerType?: string;
  power_in_kw?: number;
  powerInKw?: number;
}

export interface StartSessionRequest extends JsonObject {
  locationId?: string;
  evseUid?: string;
  connectorId?: string;
  paymentMethodId?: string;
}

export interface StartSessionResponse extends JsonObject {
  chargeSessionId?: string;
  nextStatusCall?: string;
}

export interface RemoteCommandResponse extends JsonObject {
  result?: string;
  charge_station_notification_id?: string;
}

export interface CommandResult extends JsonObject {
  result?: string;
}

export interface ApiEnvelope<T extends JsonValue = JsonValue> extends JsonObject {
  data?: T;
  status_code?: number;
  status_message?: string;
  timestamp?: string;
}
