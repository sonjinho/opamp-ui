
import type { AgentDescription } from './agent-description';
import type { AgentComponentHealth } from './agent-component-health';
import type { EffectiveConfig } from './effective-config';
import type { RemoteConfigStatus } from './remote-config-status';
import type { PackageStatuses } from './package-statuses';

export interface Agent {
  instanceUId: string;
  capabilities: number;
  description: AgentDescription;
  componentHealth: AgentComponentHealth;
  effectiveConfig: EffectiveConfig;
  remoteConfigStatus: RemoteConfigStatus;
  packagesStatuses: PackageStatuses;
  createdAt: string;
  updatedAt: string;
  disconnectedAt: string;
}
