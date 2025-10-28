export enum PackageStatusValue {
  INSTALLED = 0,
  INSTALLING = 1,
  INSTALL_FAILED = 2,
}

export interface PackageStatus {
  name: string;
  agentHasVersion: string;
  agentHasHash: string;
  serverOfferedVersion: string;
  serverOfferedHash: string;
  status: PackageStatusValue;
  errorMessage: string;
}
