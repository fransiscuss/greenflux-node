import { GreenfluxApiClient, type GreenfluxClientOptions, type RequestOptions } from "./client.js";
import type { CommandResult, JsonObject, RemoteCommandResponse } from "./types.js";

/** Client for Greenflux Remote Commands API v1.0. */
export class RemoteCommandsClient extends GreenfluxApiClient {
  public constructor(options: GreenfluxClientOptions) {
    super(options);
  }

  public startSession(body: JsonObject, options?: RequestOptions): Promise<RemoteCommandResponse> {
    return this.post("api/1.0/remotecommands/START_SESSION", body, options);
  }

  public stopSession(body: JsonObject, options?: RequestOptions): Promise<RemoteCommandResponse> {
    return this.post("api/1.0/remotecommands/STOP_SESSION", body, options);
  }

  public unlockConnector(body: JsonObject, options?: RequestOptions): Promise<RemoteCommandResponse> {
    return this.post("api/1.0/remotecommands/UNLOCK_CONNECTOR", body, options);
  }

  public getCommandNotification(evseUid: string, notificationId: string, options?: RequestOptions): Promise<CommandResult> {
    return this.get(`api/1.0/remotecommands/${encodeURIComponent(evseUid)}/${encodeURIComponent(notificationId)}`, options);
  }
}
