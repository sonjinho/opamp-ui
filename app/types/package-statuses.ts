import type { PackageStatus } from './package-status';

export interface PackageStatuses {
  packages: { [key: string]: PackageStatus };
  serverProvidedAllPackagesHash: string;
  errorMessage: string;
}
