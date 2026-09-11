# Security Policy

## Supported versions

Only the latest released version of `@fransiscuss/greenflux` receives fixes.

## Reporting a vulnerability

Please report security issues privately through
[GitHub Security Advisories](https://github.com/fransiscuss/greenflux-node/security/advisories/new)
rather than opening a public issue. Expect an initial response within 7 days.

This is an unofficial, community-maintained SDK. Vulnerabilities in the Greenflux
platform itself should go to Greenflux, not here.

## Handling credentials

Greenflux platform tokens and Charge Assist keys are server-side secrets:

- Keep them in environment variables or a secrets manager, never in source control.
- Never ship this package with a credential into browser or mobile client code.
- `GreenfluxApiError` exposes the raw response body so failures can be diagnosed.
  Redact it before forwarding an error to a log aggregator or issue tracker.
- The live example under `examples/` can start a physical charging session. Point
  it at a dedicated test tenant and station only.
