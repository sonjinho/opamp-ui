<script setup lang="ts">
import type { Agent } from '../types/agent';
import { RemoteConfigStatusValue } from '../types/remote-config-status';
import { PackageStatusValue } from '../types/package-status';

defineProps<{ agent: Agent | null }>();

function decodeBase64(encoded: string) {
  if (typeof window !== 'undefined') {
    try {
      return window.atob(encoded);
    } catch (e) {
      console.error('Failed to decode base64 string:', e);
      return 'Invalid base64 content';
    }
  }
  return 'Cannot decode on server';
}

function getRemoteConfigStatusString(status: RemoteConfigStatusValue): string {
  return RemoteConfigStatusValue[status] || 'UNKNOWN';
}

function getPackageStatusString(status: PackageStatusValue): string {
  return PackageStatusValue[status] || 'UNKNOWN';
}
</script>

<template>
  <div v-if="agent" class="agent-card">
    <div class="agent-header">
      <h1>Agent Details</h1>
      <span class="agent-uid">UID: {{ agent.instanceUId }}</span>
    </div>

    <div class="agent-section">
      <h2>Description</h2>
      <div class="tags">
        <h3>Identifying Attributes</h3>
        <span v-for="(value, key) in agent.description.identifyingAttributes" :key="key" class="tag">
          <span class="tag-key">{{ key }}</span>: <span class="tag-value">{{ value }}</span>
        </span>
      </div>
      <div class="tags">
        <h3>Non-Identifying Attributes</h3>
        <span v-for="(value, key) in agent.description.nonIdentifyingAttributes" :key="key" class="tag">
          <span class="tag-key">{{ key }}</span>: <span class="tag-value">{{ value }}</span>
        </span>
      </div>
    </div>

    <div class="agent-section">
      <h2>Component Health</h2>
      <div class="health-details">
        <p><strong>Status:</strong> {{ agent.componentHealth.status }}</p>
        <p><strong>Healthy:</strong> {{ agent.componentHealth.healthy ? 'Yes' : 'No' }}</p>
        <p v-if="agent.componentHealth.lastError"><strong>Last Error:</strong> {{ agent.componentHealth.lastError }}</p>
      </div>
    </div>

    <div class="agent-section">
      <h2>Remote Config Status</h2>
      <div class="status-details">
        <p><strong>Status:</strong> {{ getRemoteConfigStatusString(agent.remoteConfigStatus.status) }}</p>
        <p><strong>Hash:</strong> {{ agent.remoteConfigStatus.lastRemoteConfigHash }}</p>
        <p v-if="agent.remoteConfigStatus.errorMessage"><strong>Error:</strong> {{ agent.remoteConfigStatus.errorMessage }}</p>
      </div>
    </div>

    <div class="agent-section">
      <h2>Package Statuses</h2>
      <div v-for="(pkg, key) in agent.packagesStatuses.packages" :key="key" class="package-status">
        <h4>{{ pkg.name }}</h4>
        <p><strong>Status:</strong> {{ getPackageStatusString(pkg.status) }}</p>
        <p><strong>Agent Version:</strong> {{ pkg.agentHasVersion }}</p>
        <p><strong>Server Version:</strong> {{ pkg.serverOfferedVersion }}</p>
        <p v-if="pkg.errorMessage"><strong>Error:</strong> {{ pkg.errorMessage }}</p>
      </div>
    </div>

    <div class="agent-section">
      <h2>Effective Configuration</h2>
      <div v-for="(configFile, key) in agent.effectiveConfig.configMap" :key="key" class="config-file">
        <h3>{{ key }}</h3>
        <p><strong>Content Type:</strong> {{ configFile.contentType }}</p>
        <pre class="code-block"><code>{{ decodeBase64(configFile.body) }}</code></pre>
      </div>
    </div>

    <div class="agent-section">
      <h2>Timestamps</h2>
      <p><strong>Created At:</strong> {{ new Date(agent.createdAt).toLocaleString() }}</p>
      <p><strong>Updated At:</strong> {{ new Date(agent.updatedAt).toLocaleString() }}</p>
      <p><strong>Disconnected At:</strong> {{ agent.disconnectedAt ? new Date(agent.disconnectedAt).toLocaleString() : 'N/A' }}</p>
    </div>
  </div>
  <div v-else class="no-agent-selected">
    <p>Select an agent to see details.</p>
  </div>
</template>

<style scoped>
.agent-card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.no-agent-selected {
  text-align: center;
  padding-top: 4rem;
  color: #64748b;
}

.agent-header {
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
}

.agent-header h1 {
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0;
}

.agent-uid {
  font-size: 0.9rem;
  color: #64748b;
  font-family: monospace;
}

.agent-section {
  margin-bottom: 2rem;
}

.agent-section h2 {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #334155;
}

.agent-section h3 {
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #475569;
}

.tags {
  margin-bottom: 1rem;
}

.tag {
  display: inline-block;
  background-color: #e2e8f0;
  color: #475569;
  border-radius: 16px;
  padding: 0.3rem 0.8rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  font-.size: 0.85rem;
  font-family: monospace;
}

.tag-key {
  font-weight: 600;
}

.config-file, .health-details, .status-details, .package-status {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.code-block {
  background-color: #0d1117;
  color: #c9d1d9;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
  font-size: 0.9rem;
}

p {
  color: #475569;
  margin-top: 0;
  margin-bottom: 0.5rem;
}
</style>
