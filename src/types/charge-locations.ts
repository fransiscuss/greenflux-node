/**
 * Charge Location Management models from charge-location-management-apis.
 * List endpoints return the array itself, not an OCPI envelope.
 */

export type ManagedLocationType = "ON_STREET" | "PARKING_GARAGE" | "UNDERGROUND_GARAGE" | "PARKING_LOT" | "OTHER" | "UNKNOWN";
export type ManagedAccessType = "PUBLIC" | "RESTRICTED" | "PRIVATE";
export type ManagedEvseStatus = "AVAILABLE" | "BLOCKED" | "CHARGING" | "INOPERATIVE" | "OUTOFORDER" | "PLANNED" | "REMOVED" | "RESERVED" | "UNKNOWN";
export type ManagedParkingRestriction = "EV_ONLY" | "PLUGGED" | "DISABLED" | "CUSTOMERS" | "MOTORCYCLES";
export type ManagedImageCategory = "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
export type ChargeStationDeployState = "Stock" | "Production" | "Deprecated";
export type ChargingSpeed = "Slow" | "Fast" | "Rapid" | "Mix_AC_DC" | "Mix_DC";
export type ChargePointConnectivity = "Online" | "Offline";
export type ChargePointProtocol = "Ocpp15" | "Ocpp15Soap" | "Ocpp16" | "Ocpp201";
export type ChargerType = "Public" | "Home" | "Business";
export type ManagedAuthRuleType = "CustomerExternalId" | "ClosedGroups" | "HomeToken";

export interface ManagedCoordinates {
  latitude?: string | null;
  longitude?: string | null;
}

export interface ManagedDisplayText {
  language?: string | null;
  text?: string | null;
}

export interface ManagedImage {
  url?: string | null;
  thumbnail?: string | null;
  category?: ManagedImageCategory;
  type?: string | null;
  width?: number | null;
  height?: number | null;
}

export interface ManagedBusinessDetails {
  name?: string | null;
  website?: string | null;
  logo?: ManagedImage;
  phone_number?: string | null;
}

export interface ManagedRegularHours {
  weekday?: number;
  period_begin?: string | null;
  period_end?: string | null;
}

export interface ManagedExceptionalPeriod {
  period_begin?: string;
  period_end?: string;
}

export interface ManagedHours {
  regular_hours?: ManagedRegularHours[] | null;
  twentyfourseven?: boolean;
  exceptional_openings?: ManagedExceptionalPeriod[] | null;
  exceptional_closings?: ManagedExceptionalPeriod[] | null;
}

export interface ManagedAuthRule {
  type?: ManagedAuthRuleType | null;
  value?: string | null;
}

export interface ManagedCustomGroup {
  name?: string | null;
  external_id?: string | null;
}

export interface ManagedCustomField {
  type?: string | null;
  value?: string | null;
}

export interface ManagedEnergyMix {
  energy_mix_profile_id?: string | null;
  is_green_energy?: boolean | null;
  supplier_name?: string | null;
  energy_product_name?: string | null;
}

export interface ManagedStatusSchedule {
  period_begin?: string;
  period_end?: string | null;
  status?: ManagedEvseStatus;
  status_message?: string | null;
}

export interface ManagedConnector {
  id?: string | null;
  standard?: string | null;
  format?: string | null;
  power_type?: string | null;
  voltage?: number;
  amperage?: number;
  max_electric_power?: number | null;
  tariff_id?: string | null;
  terms_and_conditions?: string | null;
  last_updated?: string | null;
  reimbursement_tariff_id?: string | null;
}

export interface ManagedEvse {
  uid?: string | null;
  evse_id?: string | null;
  status?: ManagedEvseStatus;
  status_schedule?: ManagedStatusSchedule[] | null;
  capabilities?: string[] | null;
  connectors?: ManagedConnector[] | null;
  floor_level?: string | null;
  coordinates?: ManagedCoordinates;
  physical_reference?: string | null;
  directions?: ManagedDisplayText[] | null;
  parking_restrictions?: ManagedParkingRestriction[] | null;
  images?: ManagedImage[] | null;
  last_updated?: string | null;
  evse_sequence_number?: number;
}

export interface ManagedLocation {
  id?: string | null;
  type?: ManagedLocationType;
  publish?: boolean | null;
  access_type?: ManagedAccessType;
  name?: string | null;
  address?: string | null;
  address_line_2?: string | null;
  city?: string | null;
  postal_code?: string | null;
  country?: string | null;
  coordinates?: ManagedCoordinates;
  evses?: ManagedEvse[] | null;
  directions?: ManagedDisplayText[] | null;
  facilities?: string[] | null;
  operator?: ManagedBusinessDetails;
  suboperator?: ManagedBusinessDetails;
  owner?: ManagedBusinessDetails;
  auth_rules?: ManagedAuthRule[] | null;
  time_zone?: string | null;
  opening_times?: ManagedHours;
  charging_when_closed?: boolean | null;
  energy_mix?: ManagedEnergyMix;
  custom_groups?: ManagedCustomGroup[] | null;
  maintenance_info?: string | null;
  remarks?: string | null;
  payment_provider?: string | null;
  wallet_id?: string | null;
  cpo_id?: string | null;
  cpo_customer_external_id?: string | null;
  etag?: string | null;
  created_by?: string | null;
  modified_by?: string | null;
  customised_fields?: ManagedCustomField[] | null;
  created?: string;
  modified?: string | null;
  last_updated?: string | null;
}

export interface CreateManagedLocationRequest {
  cpo_id: string;
  name: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
  id?: string | null;
  cpo_customer_external_id?: string | null;
  type?: ManagedLocationType;
  publish?: boolean | null;
  access_type?: ManagedAccessType;
  coordinates?: ManagedCoordinates;
  directions?: ManagedDisplayText[] | null;
  auth_rules?: ManagedAuthRule[] | null;
  facilities?: string[] | null;
  opening_times?: ManagedHours;
  energy_mix?: { energy_mix_profile_id?: string | null };
  address_line_2?: string | null;
  payment_provider?: string | null;
  wallet_id?: string | null;
  custom_groups?: ManagedCustomGroup[] | null;
  maintenance_info?: string | null;
  remarks?: string | null;
  customised_fields?: ManagedCustomField[] | null;
}

export interface ManagedLocationQuery {
  cpoId?: string;
  date_from?: string;
  date_to?: string;
  street?: string;
  housenumber?: string;
  city?: string;
  postcode?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  exclude_evses?: boolean;
  exclude_evses_modified?: boolean;
  distanceinmeters?: number;
  offset?: number;
  limit?: number;
}

export interface ManagedLocationByIdQuery {
  excludeEvses?: boolean;
}

export interface ChargeStation {
  charge_station_id?: string | null;
  location_id?: string | null;
  name?: string | null;
  deploy_state?: ChargeStationDeployState;
  installation_date?: string | null;
  default_charge_station_reimbursement_tariff_id?: string | null;
  default_charge_station_tariff_id?: string | null;
  default_charge_station_directions?: ManagedDisplayText[] | null;
  default_charge_station_floor_level?: string | null;
  driver_id?: string | null;
  customer_id?: string | null;
  evses?: ManagedEvse[] | null;
  maintenance_info?: string | null;
  remarks?: string | null;
  contactless_terminal_serial_number?: string | null;
  contactless_terminal_auth_amount?: number | null;
  status_schedule?: ManagedStatusSchedule[] | null;
  auth_rules?: ManagedAuthRule[] | null;
  contactless_type?: string | null;
  tap_to_stop?: boolean | null;
  stop_on_parking?: boolean | null;
  grid_connection_id?: string;
  dynamic_time_based_tariffs?: boolean | null;
  time_of_use_tariffs?: boolean | null;
  exclude_vat?: boolean | null;
  charger_type?: ChargerType | null;
  charge_station_template_id?: string | null;
  etag?: string | null;
  status?: ManagedEvseStatus;
  charging_speed?: ChargingSpeed;
  created?: string;
  modified?: string | null;
  heartbeat_interval?: number | null;
  charge_point_model?: string | null;
  charge_point_vendor?: string | null;
  charge_point_serial_number?: string | null;
  charge_box_serial_number?: string | null;
  client_ip_address?: string | null;
  firmware_version?: string | null;
  iccid?: string | null;
  imsi?: string | null;
  meter_serial_number?: string | null;
  meter_type?: string | null;
  remote_manageable?: boolean | null;
  connectivity_status?: ChargePointConnectivity;
  protocol_version?: ChargePointProtocol;
  endpoint?: string | null;
}

export interface ChargeStationQuery {
  cpoId?: string;
  date_from?: string;
  date_to?: string;
  location_id?: string;
  exclude_evses_modified?: boolean;
  offset?: number;
  limit?: number;
}
