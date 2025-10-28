export interface AgentComponentHealth {
  healthy: boolean;
  startTimeUnixNano: number;
  lastError: string;
  status: string;
  statusTimeUnixNano: number;
  componentHealthMap: { [key: string]: AgentComponentHealth };
}
