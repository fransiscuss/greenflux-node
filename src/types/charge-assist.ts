/**
 * Charge Assist models from charge-assist-1.
 * Property names match the API (camelCase). Response fields are optional because
 * the service omits unused values; request types mark the documented required fields.
 */

export type LocationType =
  | "ON_STREET"
  | "PARKING_GARAGE"
  | "UNDERGROUND_GARAGE"
  | "PARKING_LOT"
  | "OTHER"
  | "UNKNOWN"
  | "ALONG_MOTORWAY"
  | "ON_DRIVEWAY";

export type Facility =
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
  | "BIKE_SHARING"
  | "METRO_STATION"
  | "PARKING_LOT"
  | "TRAM_STOP";

export type PaymentMethodType =
  | "CHARGE_CARD"
  | "MASTER_CARD"
  | "VISA"
  | "AMEX"
  | "APPLE_PAY"
  | "GOOGLE_PAY"
  | "IDEAL"
  | "BANCONTACT"
  | "SOFORT"
  | "WALLET"
  | "CARD_OTHER"
  | "EXTERNAL";

export type Availability = "NONE" | "LOW" | "MODERATE" | "HIGH";
export type PaymentServiceProvider = "Stripe" | "Lemonway" | "Adyen";

export type EvseStatus =
  | "AVAILABLE"
  | "BLOCKED"
  | "CHARGING"
  | "INOPERATIVE"
  | "OUTOFORDER"
  | "PLANNED"
  | "REMOVED"
  | "RESERVED"
  | "UNKNOWN";

export type EvseCapability =
  | "CHARGING_PROFILE_CAPABLE"
  | "CREDIT_CARD_PAYABLE"
  | "REMOTE_START_STOP_CAPABLE"
  | "RESERVABLE"
  | "RFID_READER"
  | "UNLOCK_CAPABLE"
  | "TOKEN_GROUP_CAPABLE"
  | "PED_TERMINAL"
  | "DEBIT_CARD_PAYABLE"
  | "CONTACTLESS_CARD_SUPPORT"
  | "CHIP_CARD_SUPPORT"
  | "CHARGING_PREFERENCES_CAPABLE"
  | "START_SESSION_CONNECTOR_REQUIRED"
  | "ISO_15118_2_PLUG_AND_CHARGE"
  | "ISO_15118_20_PLUG_AND_CHARGE";

export type ParkingRestriction = "EV_ONLY" | "PLUGGED" | "DISABLED" | "CUSTOMERS" | "MOTORCYCLES";

export type ConnectorStandard =
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
  | "TESLA_S"
  | "PANTOGRAPH_BOTTOM_UP"
  | "PANTOGRAPH_TOP_DOWN";

export type ConnectorFormat = "SOCKET" | "CABLE";
export type ConnectorPowerType = "AC_1_PHASE" | "AC_3_PHASE" | "DC";
export type FilterPowerType = "AC" | "DC";
export type ImageCategory = "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";

export interface Coordinates {
  latitude?: number;
  longitude?: number;
}

export interface DisplayText {
  language?: string | null;
  text?: string | null;
}

export interface Image {
  url?: string | null;
  thumbnail?: string | null;
  category?: ImageCategory;
  type?: string | null;
  width?: number | null;
  height?: number | null;
}

export interface BusinessDetails {
  name?: string | null;
  website?: string | null;
  logo?: Image;
  phone_number?: string | null;
  email?: string | null;
}

export interface RegularHourPeriod {
  periodBegin?: string | null;
  periodEnd?: string | null;
}

export interface RegularHours {
  weekday?: number;
  periods?: RegularHourPeriod[] | null;
}

export interface ExceptionalPeriod {
  periodBegin?: string;
  periodEnd?: string;
}

export interface OpeningHours {
  regularHours?: RegularHours[] | null;
  twentyfourseven?: boolean;
  exceptionalOpenings?: ExceptionalPeriod[] | null;
  exceptionalClosings?: ExceptionalPeriod[] | null;
}

export type EnergySourceCategory = "NUCLEAR" | "GENERAL_FOSSIL" | "COAL" | "GAS" | "GENERAL_GREEN" | "SOLAR" | "WIND" | "WATER";
export type EnvironmentalImpactCategory = "NUCLEAR_WASTE" | "CARBON_DIOXIDE";

export interface EnergySource {
  source?: EnergySourceCategory;
  percentage?: number;
  isRenewableEnergy?: boolean;
}

export interface EnvironmentalImpact {
  source?: EnvironmentalImpactCategory;
  amount?: number;
}

export interface EnergyMix {
  isGreenEnergy?: boolean;
  energySources?: EnergySource[] | null;
  environImpact?: EnvironmentalImpact[] | null;
  supplierName?: string | null;
  energyProductName?: string | null;
}

export interface CustomProperty {
  name?: string | null;
  value?: string | null;
}

export interface OperatorBranding {
  id?: string | null;
  displayName?: string | null;
  primaryColorHex?: string | null;
  logoUrl?: string | null;
  supportPhone?: string | null;
  supportEmail?: string | null;
  supportWebsite?: string | null;
}

export interface Connector {
  id?: string | null;
  standard?: ConnectorStandard;
  format?: ConnectorFormat;
  powerType?: ConnectorPowerType;
  phases?: number;
  kw?: number | null;
  powerInKw?: number | null;
  voltage?: number;
  amperage?: number;
  tariffId?: string | null;
  termsAndConditions?: string | null;
  matchesFilter?: boolean | null;
}

export interface Evse {
  uid?: string | null;
  displayName?: string | null;
  status?: EvseStatus;
  capabilities?: EvseCapability[] | null;
  connectors?: Connector[] | null;
  floorLevel?: string | null;
  coordinates?: Coordinates[] | null;
  physicalReference?: string | null;
  chargingNotAllowed?: boolean;
  agreement?: boolean;
  directions?: DisplayText[] | null;
  parkingRestrictions?: ParkingRestriction[] | null;
  images?: Image[] | null;
  matchesFilter?: boolean | null;
  restrictedAccess?: boolean;
  remoteCommandsCapable?: boolean;
  chargerType?: string | null;
  isPrivateCharger?: boolean;
  evseId?: string | null;
  isQrPresent?: boolean | null;
  lastUpdated?: string | null;
}

export interface Location {
  id?: string | null;
  type?: LocationType;
  name?: string | null;
  displayName?: string | null;
  address?: string | null;
  city?: string | null;
  postalCode?: string | null;
  country?: string | null;
  coordinates?: Coordinates;
  evses?: Evse[] | null;
  directions?: DisplayText[] | null;
  operator?: BusinessDetails;
  suboperator?: BusinessDetails;
  owner?: BusinessDetails;
  facilities?: Facility[] | null;
  openingHours?: OpeningHours;
  images?: Image[] | null;
  branding?: OperatorBranding;
  smartChargingEnabled?: boolean;
  reservationEnabled?: boolean;
  dp?: boolean;
  rfid?: boolean;
  isPrivateLocation?: boolean;
  pms?: PaymentMethodType[] | null;
  issuers?: string[] | null;
  availability?: Availability;
  energyMix?: EnergyMix;
  isHomeCharger?: boolean;
  customProperties?: CustomProperty[] | null;
  timeZone?: string | null;
  preAuthAmountInCents?: number | null;
  cpsoId?: string | null;
  cpoCustomerId?: string | null;
  paymentServiceProvider?: PaymentServiceProvider;
}

export interface ListMeta {
  count?: number;
  hasMoreData?: boolean;
  continuationToken?: string | null;
}

export interface BoundingBox {
  bottomLeftLat?: number;
  bottomLeftLng?: number;
  topRightLat?: number;
  topRightLng?: number;
}

export interface LocationSearchResponse {
  boundingBox?: BoundingBox;
  data?: Location[] | null;
  meta?: ListMeta;
}

export interface LocationFilters {
  "filter.evseUid"?: string;
  "filter.appToken"?: string;
  "filter.isAvailable"?: boolean;
  "filter.isFavorite"?: boolean;
  "filter.directPayEnabled"?: boolean;
  "filter.powerType"?: FilterPowerType;
  "filter.connectorType"?: ConnectorStandard;
  "filter.connectorTypes"?: readonly ConnectorStandard[];
  "filter.minKw"?: number;
  "filter.maxKw"?: number;
  "filter.restrictedAccess"?: boolean;
  "filter.country"?: string;
  "filter.customerExternalId"?: string;
  "filter.lastUpdated"?: string;
}

export interface LocationSearchQuery extends LocationFilters {
  userLatitude?: number;
  userLongitude?: number;
  paymentMethodId?: string;
  pageSize?: number;
}

export type SessionState =
  | "REQUESTED"
  | "REJECTED"
  | "STARTING"
  | "CHARGING"
  | "STOPPING"
  | "COMPLETED"
  | "CDR_AVAILABLE"
  | "PARKING"
  | "TIMEOUT"
  | "CANCELLED"
  | "ERROR";

export type SessionErrorCode = "INVALID_TOKEN" | "EVSE_NOT_AVAILABLE" | "COMMAND_TIMED_OUT" | "SOFT_TIME_OUT" | "UNKNOWN";
export type PrioritySessionStatus = "NOT_APPLICABLE" | "OFF" | "ON";
export type VidStatus = "VID_NOT_AVAILABLE" | "VID_NOT_REGISTERED" | "VID_REGISTRATION_IN_PROGRESS" | "VID_REGISTERED" | "VID_DEREGISTERED";
export type CouponStatus = "NOT_APPLICABLE" | "NOT_APPLIED" | "APPLIED";
export type StartMethod = "UNKNOWN" | "APP" | "NOT_APP";

export interface SessionDataPoint {
  timestamp?: string;
  energyInKwh?: number | null;
  powerInKw?: number | null;
  status?: SessionState;
  stateOfCharge?: number | null;
}

export interface SessionDataPointsSummary {
  maxEnergyInKwh?: number | null;
  maxPowerInKw?: number | null;
  minEnergyInKwh?: number | null;
  minPowerInKw?: number | null;
  dataPoints?: SessionDataPoint[] | null;
}

export interface SessionPaymentMethod {
  id?: string | null;
  type?: PaymentMethodType;
  cardHint?: string | null;
  chargeCardVisualNumber?: string | null;
  externalPaymentMethodId?: string | null;
  displayName?: string | null;
}

export interface SessionBranding {
  displayName?: string | null;
  logoUrl?: string | null;
  supportPhone?: string | null;
  supportEmail?: string | null;
  supportWebsite?: string | null;
}

export interface SessionLocation {
  coordinates?: Coordinates;
  name?: string | null;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  timeZone?: string | null;
  powerType?: ConnectorPowerType | null;
  branding?: SessionBranding;
}

export type CostDimension = "TIME" | "ENERGY" | "PARKING_TIME" | "FLAT" | "UNKNOWN";
export type CostUnit = "MIN" | "KWH" | "MONEY" | "UNKNOWN";

export interface SessionCostLine {
  dimension?: CostDimension;
  price?: number;
  quantity?: number;
  unroundedCost?: number;
  roundedCost?: number;
  unit?: CostUnit;
}

export interface SessionCostSegment {
  segmentId?: number;
  fromUtc?: string;
  items?: SessionCostLine[] | null;
}

export interface SessionCostBreakdown {
  retailSegments?: SessionCostSegment[] | null;
}

export interface StartSessionRequest {
  locationId: string;
  evseUid: string;
  paymentMethodId: string;
  connectorId?: string | null;
  adhocPaymentMethodId?: string | null;
  isPinned?: boolean | null;
  /** Spelled this way by the Charge Assist API. */
  ignoreEvseAvailablity?: boolean;
}

export interface StartSessionResponse {
  chargeSessionId?: string | null;
  nextStatusCall?: string;
  messageId?: string | null;
}

export interface StopSessionRequest {
  chargeSessionId: string;
}

export interface SessionStatus {
  sessionId?: string | null;
  appToken?: string | null;
  externalSessionId?: string | null;
  locationId?: string | null;
  evseUid?: string | null;
  connectorId?: string | null;
  authId?: string | null;
  status?: SessionState;
  canRateSession?: boolean;
  error?: SessionErrorCode | null;
  errorMessage?: string | null;
  energyInKwh?: number | null;
  currentPowerInKw?: number | null;
  totalCosts?: number | null;
  totalVat?: number | null;
  vatPercentage?: number | null;
  currency?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  nextStatusCall?: string;
  usageSummary?: SessionDataPointsSummary;
  smartChargingEnabled?: boolean;
  prioritySessionStatus?: PrioritySessionStatus;
  vidStatus?: VidStatus;
  paymentMethodId?: string | null;
  paymentMethod?: SessionPaymentMethod;
  chargingNotAllowed?: boolean;
  stateOfCharge?: number | null;
  receiptNumber?: string | null;
  couponStatus?: CouponStatus;
  mileage?: string | null;
  startMethod?: StartMethod;
  pspPreAuthTransactionId?: string | null;
  isPrivateCharger?: boolean;
  location?: SessionLocation;
  costBreakdown?: SessionCostBreakdown;
}

export type PaymentVerificationStatus = "PENDING" | "VALID" | "INVALID";

export interface LinkedPaymentMethod {
  id?: string | null;
  type?: PaymentMethodType;
  cardHint?: string | null;
}

export interface PaymentMethod {
  id?: string | null;
  externalPaymentMethodId?: string | null;
  cardAlias?: string | null;
  type?: PaymentMethodType;
  chargeCardIssuer?: string | null;
  cardHint?: string | null;
  cardShortHint?: string | null;
  cardExpiryHint?: string | null;
  authId?: string | null;
  isCompatible?: boolean | null;
  isVidMapped?: boolean | null;
  isAccountPaymentMethod?: boolean;
  verificationStatus?: PaymentVerificationStatus;
  driverName?: string | null;
  linkedPaymentMethodId?: string | null;
  linkedPaymentMethod?: LinkedPaymentMethod;
  expirationDate?: string | null;
  createdDate?: string | null;
  isDefault?: boolean | null;
  displayName?: string | null;
  preferredNetwork?: string | null;
  isValid?: boolean;
}

export interface WalletResponse {
  data?: PaymentMethod[] | null;
  meta?: ListMeta;
}

export interface ExternalPaymentMethodRequest {
  externalPaymentMethodId: string;
  displayName?: string | null;
}

export interface CreateAppTokenRequest {
  appToken: string;
  driverId?: string | null;
  emspId?: string | null;
}

export interface LocationAlert {
  locationId?: string | null;
  evseUid?: string | null;
  expirationTime?: string;
}

export type VidMappingStatus = "VID_REQUESTED" | "VID_REGISTERED" | "VID_ONHOLD";

export interface VidMapping {
  vid?: string | null;
  appToken?: string | null;
  paymentMethodId?: string | null;
  emailId?: string | null;
  vidStatus?: VidMappingStatus;
}

export interface TokenSettings {
  defaultPaymentMethodId?: string | null;
  defaultLanguageCode?: string | null;
}

export interface PersonalChargerSettings {
  evseUid?: string | null;
  pauseEnabled?: boolean;
  startTime?: string;
  endTime?: string;
}

export interface QrSetting {
  name?: string | null;
  logo?: string | null;
  text?: string | null;
}

export interface AutoChargeSetting {
  enabled?: boolean;
}

export interface RetryFailedPaymentsSetting {
  enabled?: boolean;
  startDate?: string | null;
}

export interface TariffMinSetting {
  enabled?: boolean;
  minimumZoomLevel?: number;
  maximumNumberOfLocations?: number;
}

export type MeasurementSystem = "Metric" | "Imperial";
export type AccountType = "Anonymous" | "Account" | "Hybrid";

export interface SubscriptionSettings {
  subscriber?: string | null;
  displayName?: string | null;
  requestChargeCardUrl?: string | null;
  supportUrl?: string | null;
  supportEmail?: string | null;
  supportPhoneNumber?: string | null;
  driverAccount?: boolean;
  loginRequired?: boolean;
  allowExternalChargeCards?: boolean;
  allowDirectCards?: boolean;
  whiteLabelApp?: string | null;
  isWhiteLabelApp?: boolean;
  supportedPaymentMethods?: PaymentMethodType[] | null;
  measurementSystem?: MeasurementSystem | null;
  qrSetting?: QrSetting;
  autoChargeSetting?: AutoChargeSetting;
  retryFailedPaymentsSetting?: RetryFailedPaymentsSetting;
  taxLabel?: string | null;
  accountType?: AccountType;
  tariffMinSetting?: TariffMinSetting;
  reject3rdPartyChargeCards?: boolean;
}

export interface AppToken {
  appToken?: string | null;
  shareableId?: string | null;
  authId?: string | null;
  groups?: string[] | null;
  groupFilterString?: string | null;
  alerts?: LocationAlert[] | null;
  vidMapping?: VidMapping;
  settings?: TokenSettings;
  vidUpdating?: boolean;
  muteVidNotifications?: boolean;
  personalChargerSettings?: PersonalChargerSettings[] | null;
  email?: string | null;
  subscriptionSettings?: SubscriptionSettings;
}

export type TariffKind = "WHOLESALE" | "RETAIL";
export type PriceComponentType = "FLAT" | "ENERGY" | "PARKING_TIME" | "TIME";
export type TariffValidity = "VALID" | "UNKNOWN" | "NO_TARIFF_FOUND" | "NOT_COMPATIBLE" | "ERROR";

export interface TariffRestriction {
  min?: number | null;
  max?: number | null;
  min_kwh?: number | null;
  max_kwh?: number | null;
  min_duration?: number | null;
  max_duration?: number | null;
  min_power?: number | null;
  max_power?: number | null;
  min_current?: number | null;
  max_current?: number | null;
}

export interface PriceComponent {
  price?: number;
  priceUnrounded?: number;
  type?: PriceComponentType;
  stepSize?: number;
  vat?: number | null;
  restrictions?: TariffRestriction;
}

export interface TariffElement {
  priceComponents?: PriceComponent[] | null;
}

export interface Tariff {
  tariffType?: TariffKind;
  vatPercentage?: number | null;
  currency?: string | null;
  isVatIncluded?: boolean | null;
  countryCode?: string | null;
  descriptionUrl?: string | null;
  descriptions?: DisplayText[] | null;
  elements?: TariffElement[] | null;
  validFrom?: string | null;
  validTo?: string | null;
}

export interface WalletTariff {
  tariff?: Tariff;
  tariffWholeSale?: Tariff;
  validity?: TariffValidity;
  paymentMethod?: PaymentMethod;
  futureTariffs?: Tariff[] | null;
  isDefaultTariff?: boolean;
}

export interface WalletTariffResponse {
  data?: WalletTariff[] | null;
  meta?: ListMeta;
}
