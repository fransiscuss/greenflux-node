# @fransiscuss/greenflux

An unofficial TypeScript SDK for Greenflux CPMS APIs. It has four independently configured clients: Charge Assist, Platform/CPO/eMSP, Charge Location Management, and Remote Commands. It uses the native `fetch` available in Node.js 18+ and does not ship a runtime dependency.

This project is not affiliated with Greenflux.

## Install

```bash
npm install @fransiscuss/greenflux
```

## Quick start

Keep API credentials in environment variables or a secrets manager, never in source control.

```ts
import { ChargeAssistClient, GreenfluxPlatformClient } from "@fransiscuss/greenflux";

const chargeAssist = new ChargeAssistClient({
  baseUrl: process.env.GREENFLUX_CHARGE_ASSIST_BASE_URL!,
  apiKey: process.env.GREENFLUX_CHARGE_ASSIST_KEY!,
});
const platform = new GreenfluxPlatformClient({
  baseUrl: process.env.GREENFLUX_PLATFORM_BASE_URL!,
  token: process.env.GREENFLUX_PLATFORM_TOKEN!,
});

const location = await chargeAssist.getLocationById("your-location-id", {
  "filter.powerType": "DC",
});
const locations = await platform.getCpoLocations("2.0", { limit: 10 });
```

`ChargeAssistClient` defaults to the gateway header `Ocp-Apim-Subscription-Key`. For an endpoint requiring the OpenAPI-style `Authorization: ApiKey …` header, set `chargeAssistAuthentication: "authorization-api-key"`.

All clients expose `get`, `post`, `put`, `patch`, and `delete` for APIs not yet wrapped by a convenience method. Non-2xx responses throw `GreenfluxApiError`, which contains `status`, `response`, and response `headers`.

## Live Charge Assist example

[`examples/charge-assist-session.ts`](examples/charge-assist-session.ts) demonstrates a real start → status → stop flow. It is safe by default: without `--run-live`, it performs only a read-only location request. Set the `GREENFLUX_CHARGE_ASSIST_*`, `GREENFLUX_APP_TOKEN`, `GREENFLUX_LOCATION_ID`, `GREENFLUX_EVSE_UID`, and `GREENFLUX_PAYMENT_METHOD_ID` environment variables before using it.

```bash
npm run example:charge-assist -- --run-live
```

Use a dedicated test tenant/station. This command can start a physical charging session and incur costs.

## Integration checks

The local harness starts a real HTTP server and verifies request paths, repeated query parameters, authentication, JSON payloads, and error handling without Greenflux credentials:

```bash
npm run integration
```

`npm run smoke` is an opt-in, read-only connectivity check against a real CPMS account. Copy `.env.example` values into your shell; it requires `GREENFLUX_PLATFORM_BASE_URL` and `GREENFLUX_PLATFORM_TOKEN`. It is intentionally never run by GitHub Actions.

## Development

```bash
npm ci
npm run verify
```

The CI workflow runs type checking, unit tests, the local HTTP integration harness, and checks the publishable npm tarball. Releases use Conventional Commit PR titles and release-please.

## License

[MIT](LICENSE)
