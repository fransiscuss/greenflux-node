import { createServer } from "node:http";
import { once } from "node:events";
import assert from "node:assert/strict";
import { ChargeAssistClient, GreenfluxApiError, RemoteCommandsClient } from "../src/index.js";

type CapturedRequest = { method?: string; url?: string; body: string; headers: Record<string, string | string[] | undefined> };
const requests: CapturedRequest[] = [];

const server = createServer(async (request, response) => {
  let body = "";
  for await (const chunk of request) body += chunk;
  requests.push({ method: request.method, url: request.url, body, headers: request.headers });

  if (request.url?.startsWith("/ca/locations/loc-1")) {
    response.writeHead(200, { "content-type": "application/json" });
    response.end(JSON.stringify({ id: "loc-1", name: "Test Location", evses: [{ uid: "evse-1" }] }));
    return;
  }
  if (request.url?.startsWith("/remote/api/1.0/remotecommands/START_SESSION")) {
    response.writeHead(200, { "content-type": "application/json" });
    response.end(JSON.stringify({ result: "ACCEPTED", charge_station_notification_id: "n-1" }));
    return;
  }
  response.writeHead(404, { "content-type": "application/json" });
  response.end('{"error":"not found"}');
});

server.listen(0, "127.0.0.1");
await once(server, "listening");
const address = server.address();
if (!address || typeof address === "string") throw new Error("Could not obtain local test server address.");
const root = `http://127.0.0.1:${address.port}`;

try {
  const chargeAssist = new ChargeAssistClient({
    baseUrl: `${root}/ca/`,
    apiKey: "harness-api-key",
  });
  const location = await chargeAssist.getLocationById("loc-1", {
    "filter.powerType": "DC",
    "filter.connectorTypes": ["CHADEMO", "IEC_62196_T2"],
  });
  assert.equal(location.id, "loc-1");
  assert.equal(location.evses?.[0]?.uid, "evse-1");
  assert.equal(requests[0]?.headers["ocp-apim-subscription-key"], "harness-api-key");
  assert.match(requests[0]?.url ?? "", /filter.powerType=DC/);
  assert.match(requests[0]?.url ?? "", /filter.connectorTypes=CHADEMO/);

  const remoteCommands = new RemoteCommandsClient({ baseUrl: `${root}/remote/`, token: "harness-token" });
  const command = await remoteCommands.startSession({
    location_id: "loc-1",
    evse_uid: "evse-1",
    chargestation_id: "cs-1",
    token: { uid: "token-uid", auth_id: "auth-1", type: "RFID", valid: true },
  });
  assert.equal(command.result, "ACCEPTED");
  assert.equal(requests[1]?.headers.authorization, "Token harness-token");
  assert.equal(requests[1]?.body, '{"location_id":"loc-1","evse_uid":"evse-1","chargestation_id":"cs-1","token":{"uid":"token-uid","auth_id":"auth-1","type":"RFID","valid":true}}');

  await assert.rejects(
    () => chargeAssist.getLocationById("missing"),
    (error: unknown) => error instanceof GreenfluxApiError && error.status === 404 && error.response === '{"error":"not found"}',
  );

  console.log("All integration-harness checks passed.");
} finally {
  server.close();
  await once(server, "close");
}
