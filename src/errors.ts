/** Error returned for any non-2xx Greenflux HTTP response. */
export class GreenfluxApiError extends Error {
  public constructor(
    message: string,
    public readonly status: number,
    public readonly response: string,
    public readonly headers: Headers,
  ) {
    super(message);
    this.name = "GreenfluxApiError";
  }
}
