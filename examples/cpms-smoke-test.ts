import { GreenfluxPlatformClient } from "../src/index.js";

const baseUrl = process.env.GREENFLUX_PLATFORM_BASE_URL;
const token = process.env.GREENFLUX_PLATFORM_TOKEN;
if (!baseUrl || !token) {
  throw new Error("Set GREENFLUX_PLATFORM_BASE_URL and GREENFLUX_PLATFORM_TOKEN before running this read-only smoke test.");
}

const client = new GreenfluxPlatformClient({ baseUrl, token });
const locationId = process.env.GREENFLUX_LOCATION_ID;

if (locationId) {
  const response = await client.get<ApiResponse>(`api/2.0/cpolocations/${encodeURIComponent(locationId)}`);
  const location = Array.isArray(response.data) ? response.data[0] : response.data;
  console.log(`Retrieved location ${location?.id ?? locationId}.`);
} else {
  const response = await client.get<ApiResponse>("api/2.0/cpolocations", { query: { limit: 1 } });
  const locations = Array.isArray(response.data) ? response.data : response.data ? [response.data] : [];
  console.log(`CPMS connectivity verified; received ${locations.length} location(s).`);
}

type ApiResponse = { data?: { id?: string }[] | { id?: string } };
