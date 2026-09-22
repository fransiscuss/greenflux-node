import { GreenfluxApiClient, type GreenfluxClientOptions, type RequestOptions } from "./client.js";
import type { CommandResult, RemoteCommandResponse, RemoteStartSessionRequest, RemoteStopSessionRequest, RemoteUnlockConnectorRequest } from "./types/index.js";

/** Client for Greenflux Remote Commands API v1.0. */
export class RemoteCommandsClient extends GreenfluxApiClient {
  public constructor(options: GreenfluxClientOptions) {
    super(options);
  }

  public startSession(body: RemoteStartSessionRequest, options?: RequestOptions): Promise<RemoteCommandResponse> {
    return this.post<RemoteCommandResponse>("api/1.0/remotecommands/START_SESSION", body, options);
  }

  public stopSession(body: RemoteStopSessionRequest, options?: RequestOptions): Promise<RemoteCommandResponse> {
    return this.post<RemoteCommandResponse>("api/1.0/remotecommands/STOP_SESSION", body, options);
  }

  public unlockConnector(body: RemoteUnlockConnectorRequest, options?: RequestOptions): Promise<RemoteCommandResponse> {
    return this.post<RemoteCommandResponse>("api/1.0/remotecommands/UNLOCK_CONNECTOR", body, options);
  }

  public getCommandNotification(evseUid: string, notificationId: string, options?: RequestOptions): Promise<CommandResult> {
    return this.get<CommandResult>(`api/1.0/remotecommands/${encodeURIComponent(evseUid)}/${encodeURIComponent(notificationId)}`, options);
  }
}
