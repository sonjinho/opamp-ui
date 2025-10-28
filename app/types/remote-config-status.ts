export enum RemoteConfigStatusValue {
  UNSET = 0,
  APPLIED = 1,
  APPLYING = 2,
  FAILED = 3,
}

export interface RemoteConfigStatus {
  lastRemoteConfigHash: string;
  status: RemoteConfigStatusValue;
  errorMessage: string;
}
