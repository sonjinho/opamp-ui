import type { AgentConfigFile } from './agent-config-file';

export interface EffectiveConfig {
  configMap: { [key: string]: AgentConfigFile };
}
