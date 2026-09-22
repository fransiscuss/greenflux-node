import { GreenfluxPlatformClient } from "../src/index.js";

const baseUrl = process.env.GREENFLUX_PLATFORM_BASE_URL;
const token = process.env.GREENFLUX_PLATFORM_TOKEN;
if (!baseUrl || !token) {
  throw new Error("Set GREENFLUX_PLATFORM_BASE_URL and GREENFLUX_PLATFORM_TOKEN before running this read-only smoke test.");
}

const client = new GreenfluxPlatformClient({ baseUrl, token });
const locationId = process.env.GREENFLUX_LOCATION_ID;

if (locationId) {
  const response = await client.getCpoLocation("2.0", locationId);
  const location = response.data;
  console.log(`Retrieved location ${location?.id ?? locationId} (${location?.city ?? "city unknown"}, ${location?.evses?.length ?? 0} EVSE(s)).`);
} else {
  const response = await client.getCpoLocations("2.0", { limit: 1 });
  const locations = response.data ?? [];
  console.log(`CPMS connectivity verified; received ${locations.length} location(s).`);
}
