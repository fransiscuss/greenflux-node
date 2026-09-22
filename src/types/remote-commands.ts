/** Remote Commands models from remotecommandsapi. */

import type { JsonValue } from "./json.js";

export type RemoteCommandTokenType = "OTHER" | "RFID";
export type RemoteCommandWhitelist = "ALWAYS" | "ALLOWED" | "ALLOWED_OFFLINE" | "NEVER";
export type CommandResponseResult = "NOT_SUPPORTED" | "REJECTED" | "ACCEPTED" | "TIMEOUT" | "UNKNOWN_SESSION";
export type CommandResultStatus =
  | "ACCEPTED"
  | "CANCELED_RESERVATION"
  | "EVSE_OCCUPIED"
  | "EVSE_INOPERATIVE"
  | "FAILED"
  | "NOT_SUPPORTED"
  | "REJECTED"
  | "TIMEOUT"
  | "UNKNOWN_RESERVATION"
  | "PENDING";

export interface RemoteCommandToken {
  uid: string;
  auth_id: string;
  valid: boolean;
  type?: RemoteCommandTokenType;
  visual_number?: string | null;
  issuer?: string | null;
  whitelist?: RemoteCommandWhitelist;
  language?: string | null;
  last_updated?: string | null;
}

export interface RemoteStartSessionRequest {
  location_id: string;
  evse_uid: string;
  chargestation_id: string;
  token: RemoteCommandToken;
  connector_id?: string | null;
}

export interface RemoteStopSessionRequest {
  /** Required to identify the session. The published schema marks this nullable, but a stop command cannot be sent without it. */
  session_id: string;
}

export interface RemoteUnlockConnectorRequest {
  location_id: string;
  evse_uid: string;
  connector_id: string;
}

export interface RemoteCommandResponse {
  result?: CommandResponseResult;
  charge_station_notification_id?: string | null;
}

export interface CommandResult {
  result?: CommandResultStatus;
  message?: string | null;
  /** The API documents this as an untyped object. */
  request?: JsonValue;
  charge_station_notification_id?: string | null;
}
