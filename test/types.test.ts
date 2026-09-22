import { describe, expect, it } from "vitest";
import type {
  ConnectorStandard,
  CreateManagedLocationRequest,
  EvseStatus,
  Location,
  RemoteStartSessionRequest,
  SessionStatus,
  StartSessionRequest,
} from "../src/index.js";

describe("strong request types", () => {
  it("accepts a Charge Assist start request and rejects unknown fields at compile time", () => {
    const request = {
      locationId: "loc",
      evseUid: "evse",
      paymentMethodId: "pm",
      connectorId: "1",
    } satisfies StartSessionRequest;
    expect(request.evseUid).toBe("evse");
  });

  it("accepts a remote start command with the documented token fields", () => {
    const command = {
      location_id: "loc",
      evse_uid: "evse",
      chargestation_id: "cs",
      token: { uid: "token", auth_id: "auth", valid: true, type: "RFID" },
    } satisfies RemoteStartSessionRequest;
    expect(command.token.auth_id).toBe("auth");
  });

  it("accepts a managed location create body", () => {
    const body = {
      cpo_id: "cpo",
      name: "Depot",
      address: "1 Road",
      city: "Amsterdam",
      postal_code: "1000AA",
      country: "NLD",
      access_type: "PUBLIC",
    } satisfies CreateManagedLocationRequest;
    expect(body.country).toBe("NLD");
  });
});

const status: EvseStatus = "AVAILABLE";
const standard: ConnectorStandard = "IEC_62196_T2";
const location = {
  evses: [{ status, connectors: [{ standard, powerType: "DC" }] }],
} satisfies Location;
void location;

const session = { status: "CHARGING", energyInKwh: 1.5 } satisfies SessionStatus;
void session;

// @ts-expect-error paymentMethodId is required to start a Charge Assist session
const missingPayment: StartSessionRequest = { locationId: "loc", evseUid: "evse" };
void missingPayment;

const extraField: StartSessionRequest = {
  locationId: "loc",
  evseUid: "evse",
  paymentMethodId: "pm",
  // @ts-expect-error unknown fields are not part of the start request
  nope: true,
};
void extraField;

const badStatus: SessionStatus = {
  // @ts-expect-error session status is a documented enum
  status: "CHARGING_FAST",
};
void badStatus;

const badRemote: RemoteStartSessionRequest = {
  location_id: "loc",
  evse_uid: "evse",
  chargestation_id: "cs",
  token: {
    uid: "token",
    auth_id: "auth",
    valid: true,
    // @ts-expect-error token type is RFID or OTHER
    type: "APP",
  },
};
void badRemote;
