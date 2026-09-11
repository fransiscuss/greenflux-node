import { describe, expect, it, vi } from "vitest";
import { ChargeAssistClient, GreenfluxApiError } from "../src/index.js";

describe("GreenfluxApiClient", () => {
  it("preserves a base URL path and encodes query parameters", async () => {
    const fetch = vi.fn<typeof globalThis.fetch>().mockResolvedValue(
      new Response('{"id":"loc-1"}', { status: 200, headers: { "content-type": "application/json" } }),
    );
    const client = new ChargeAssistClient({ baseUrl: "https://example.test/ca/", apiKey: "key", fetch });

    await client.getLocationById("loc/1", { "filter.connectorTypes": ["CHADEMO", "IEC_62196_T2"] });

    const [url, init] = fetch.mock.calls[0] ?? [];
    expect(String(url)).toBe("https://example.test/ca/locations/loc%2F1?filter.connectorTypes=CHADEMO&filter.connectorTypes=IEC_62196_T2");
    expect(new Headers(init?.headers).get("ocp-apim-subscription-key")).toBe("key");
  });

  it("throws an inspectable error for non-success responses", async () => {
    const fetch = vi.fn<typeof globalThis.fetch>().mockResolvedValue(new Response('{"error":"nope"}', { status: 401 }));
    const client = new ChargeAssistClient({ baseUrl: "https://example.test", fetch });

    await expect(client.serviceStatus()).rejects.toMatchObject({
      status: 401,
      response: '{"error":"nope"}',
    });
  });
});
