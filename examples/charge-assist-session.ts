/**
 * Live Charge Assist session example.
 *
 * This is intentionally inert unless `--run-live` is supplied. Use a dedicated
 * test tenant/station: it can start a physical charging session and incur costs.
 *
 * npm run example:charge-assist -- --run-live
 */
import { ChargeAssistClient } from "@fransiscuss/greenflux";

const required = (name: string): string => {
  const value = process.env[name];
  if (!value) throw new Error(`Set ${name}.`);
  return value;
};

const client = new ChargeAssistClient({
  baseUrl: required("GREENFLUX_CHARGE_ASSIST_BASE_URL"),
  apiKey: required("GREENFLUX_CHARGE_ASSIST_KEY"),
});
const appToken = required("GREENFLUX_APP_TOKEN");
const locationId = required("GREENFLUX_LOCATION_ID");
const evseUid = required("GREENFLUX_EVSE_UID");
const connectorId = process.env.GREENFLUX_CONNECTOR_ID;
const paymentMethodId = required("GREENFLUX_PAYMENT_METHOD_ID");

if (!process.argv.includes("--run-live")) {
  const location = await client.getLocationById(locationId);
  console.log(`Read-only check passed for ${location.id ?? "configured location"}. Re-run with --run-live to start a session.`);
  process.exit(0);
}

const started = await client.startSession(appToken, { locationId, evseUid, connectorId, paymentMethodId });
if (!started.chargeSessionId) throw new Error("Greenflux did not return a chargeSessionId.");
const sessionId = started.chargeSessionId;
console.log(`Started session ${sessionId}.`);

try {
  await new Promise((resolve) => setTimeout(resolve, 60_000));
  const status = await client.getSessionStatus(appToken, sessionId, 15);
  console.log(`Session status: ${status.status ?? "unknown"}.`);
} finally {
  await client.stopSession(appToken, { chargeSessionId: sessionId });
  console.log("Stop request sent.");
}
