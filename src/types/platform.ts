/**
 * Platform / CPO / eMSP models from greenflux-service-1.
 * Property names match the OCPI-style snake_case schema.
 */

export type OcpiStatusCode = 1000 | 2000 | 2001 | 2002 | 2003 | 3000 | 3001 | 3002 | 3003;

export interface ApiEnvelope<T> {
  data?: T | null;
  status_code?: OcpiStatusCode;
  status_message?: string | null;
  timestamp?: string;
}

export type PlatformLocationType = "ON_STREET" | "PARKING_GARAGE" | "UNDERGROUND_GARAGE" | "PARKING_LOT" | "OTHER" | "UNKNOWN";
export type AccessType = "PUBLIC" | "RESTRICTED" | "PRIVATE";
export type PlatformEvseStatus = "AVAILABLE" | "BLOCKED" | "CHARGING" | "INOPERATIVE" | "OUTOFORDER" | "PLANNED" | "REMOVED" | "RESERVED" | "UNKNOWN";
export type PlatformCapability = "CHARGING_PROFILE_CAPABLE" | "CREDIT_CARD_PAYABLE" | "REMOTE_START_STOP_CAPABLE" | "RESERVABLE" | "RFID_READER" | "UNLOCK_CAPABLE";
export type PlatformConnectorStandard =
  | "CHADEMO"
  | "DOMESTIC_A"
  | "DOMESTIC_B"
  | "DOMESTIC_C"
  | "DOMESTIC_D"
  | "DOMESTIC_E"
  | "DOMESTIC_F"
  | "DOMESTIC_G"
  | "DOMESTIC_H"
  | "DOMESTIC_I"
  | "DOMESTIC_J"
  | "DOMESTIC_K"
  | "DOMESTIC_L"
  | "IEC_60309_2_single_16"
  | "IEC_60309_2_three_16"
  | "IEC_60309_2_three_32"
  | "IEC_60309_2_three_64"
  | "IEC_62196_T1"
  | "IEC_62196_T1_COMBO"
  | "IEC_62196_T2"
  | "IEC_62196_T2_COMBO"
  | "IEC_62196_T3A"
  | "IEC_62196_T3C"
  | "TESLA_R"
  | "TESLA_S";
export type PlatformConnectorFormat = "SOCKET" | "CABLE";
export type PlatformPowerType = "AC_1_PHASE" | "AC_3_PHASE" | "DC";
export type PlatformFacility =
  | "HOTEL"
  | "RESTAURANT"
  | "CAFE"
  | "MALL"
  | "SUPERMARKET"
  | "SPORT"
  | "RECREATION_AREA"
  | "NATURE"
  | "MUSEUM"
  | "BUS_STOP"
  | "TAXI_STAND"
  | "TRAIN_STATION"
  | "AIRPORT"
  | "CARPOOL_PARKING"
  | "FUEL_STATION"
  | "WIFI"
  | "BUSINESS"
  | "EDUCATION"
  | "FINANCE"
  | "HEALTH"
  | "OTHER"
  | "SERVICE"
  | "STORE";
export type PlatformParkingRestriction = "EV_ONLY" | "PLUGGED" | "DISABLED" | "CUSTOMERS" | "MOTORCYCLES";
export type PlatformImageCategory = "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
export type AuthMethod = "AUTH_REQUEST" | "WHITELIST";
export type PlatformSessionStatus = "ACTIVE" | "COMPLETED" | "INVALID" | "PENDING";
export type CdrDimensionType = "ENERGY" | "FLAT" | "MAX_CURRENT" | "MIN_CURRENT" | "PARKING_TIME" | "TIME";
export type EnergySourceCategory = "NUCLEAR" | "GENERAL_FOSSIL" | "COAL" | "GAS" | "GENERAL_GREEN" | "SOLAR" | "WIND" | "WATER";
export type EnvironmentalImpactCategory = "NUCLEAR_WASTE" | "CARBON_DIOXIDE";

export interface PlatformCoordinates {
  latitude?: string | null;
  longitude?: string | null;
}

export interface PlatformDisplayText {
  language?: string | null;
  text?: string | null;
}

export interface PlatformImage {
  url?: string | null;
  thumbnail?: string | null;
  category?: PlatformImageCategory;
  type?: string | null;
  width?: number | null;
  height?: number | null;
}

export interface PlatformBusinessDetails {
  name?: string | null;
  website?: string | null;
  logo?: PlatformImage;
  phone_number?: string | null;
  email?: string | null;
}

export interface PlatformRegularHours {
  weekday?: number;
  period_begin?: string;
  period_end?: string;
}

export interface PlatformExceptionalPeriod {
  period_begin?: string;
  period_end?: string;
}

export interface PlatformHours {
  regular_hours?: PlatformRegularHours[] | null;
  twentyfourseven?: boolean;
  exceptional_openings?: PlatformExceptionalPeriod[] | null;
  exceptional_closings?: PlatformExceptionalPeriod[] | null;
}

export interface PlatformEnergySource {
  source?: EnergySourceCategory;
  percentage?: number;
}

export interface PlatformEnvironmentalImpact {
  source?: EnvironmentalImpactCategory;
  amount?: number;
}

export interface PlatformEnergyMix {
  is_green_energy?: boolean | null;
  energy_sources?: PlatformEnergySource[] | null;
  environ_impact?: PlatformEnvironmentalImpact[] | null;
  supplier_name?: string | null;
  energy_product_name?: string | null;
}

export interface PlatformAuthRule {
  type?: string | null;
  value?: string | null;
}

export interface PlatformStatusSchedule {
  period_begin?: string;
  period_end?: string | null;
  status?: PlatformEvseStatus;
  status_message?: string | null;
}

export interface PlatformConnector {
  id?: string | null;
  standard?: PlatformConnectorStandard;
  format?: PlatformConnectorFormat;
  power_type?: PlatformPowerType;
  voltage?: number | null;
  amperage?: number | null;
  max_electric_power?: number | null;
  tariff_id?: string | null;
  terms_and_conditions?: string | null;
  last_updated?: string | null;
}

export interface PlatformEvse {
  uid?: string;
  evse_id?: string | null;
  status?: PlatformEvseStatus;
  status_schedule?: PlatformStatusSchedule[] | null;
  capabilities?: PlatformCapability[] | null;
  connectors?: PlatformConnector[];
  floor_level?: string | null;
  coordinates?: PlatformCoordinates;
  physical_reference?: string | null;
  directions?: PlatformDisplayText[] | null;
  parking_restrictions?: PlatformParkingRestriction[] | null;
  images?: PlatformImage[] | null;
  last_updated?: string;
}

export interface PlatformLocation {
  id?: string;
  type?: PlatformLocationType;
  access_type?: AccessType;
  publish?: boolean | null;
  name?: string | null;
  address?: string;
  city?: string;
  postal_code?: string;
  country?: string;
  coordinates?: PlatformCoordinates;
  evses?: PlatformEvse[] | null;
  directions?: PlatformDisplayText[] | null;
  operator?: PlatformBusinessDetails;
  suboperator?: PlatformBusinessDetails;
  auth_rules?: PlatformAuthRule[] | null;
  owner?: PlatformBusinessDetails;
  facilities?: PlatformFacility[] | null;
  time_zone?: string | null;
  opening_times?: PlatformHours;
  charging_when_closed?: boolean | null;
  images?: PlatformImage[] | null;
  energy_mix?: PlatformEnergyMix;
  last_updated?: string;
}

export type PlatformLocationResponse = ApiEnvelope<PlatformLocation[]>;

export interface PlatformListQuery {
  date_from?: string;
  date_to?: string;
  offset?: number;
  limit?: number;
}

export interface CdrDimension {
  type?: CdrDimensionType;
  volume?: number;
}

export interface CdrChargingPeriod {
  start_date_time?: string | null;
  dimensions?: CdrDimension[] | null;
}

export interface Cdr {
  id?: string | null;
  start_date_time?: string | null;
  stop_date_time?: string | null;
  session_id?: string | null;
  auth_id?: string | null;
  token_uid?: string | null;
  token_visual_number?: string | null;
  auth_method?: AuthMethod;
  location?: PlatformLocation;
  meter_id?: string | null;
  currency?: string | null;
  charging_periods?: CdrChargingPeriod[] | null;
  total_cost?: number | null;
  total_cost_incl_vat?: number | null;
  total_vat?: number | null;
  total_energy?: number | null;
  total_time?: number | null;
  total_parking_time?: number | null;
  remark?: string | null;
  last_updated?: string | null;
  total_retail_cost?: number | null;
  total_retail_cost_incl_vat?: number | null;
  total_retail_vat?: number | null;
  retail_currency?: string;
  customer_external_id?: string | null;
  driver_external_id?: string | null;
  emsp_party_id?: string | null;
  emsp_country_code?: string | null;
  cpo_id?: string | null;
  charger_type?: string | null;
}

export type CdrResponse = ApiEnvelope<Cdr[]>;

export interface CdrListQuery extends PlatformListQuery {
  continuation_token?: string;
}

export interface PlatformSession {
  id?: string;
  start_datetime?: string;
  end_datetime?: string | null;
  kwh?: number;
  auth_id?: string;
  auth_method?: AuthMethod;
  location?: PlatformLocation;
  meter_id?: string | null;
  currency?: string;
  charging_periods?: CdrChargingPeriod[] | null;
  status?: PlatformSessionStatus;
  last_updated?: string;
  total_cost?: number | null;
  authorization_id?: string | null;
  vid?: string | null;
  state_of_charge?: number | null;
}
