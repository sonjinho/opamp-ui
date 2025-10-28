<script setup lang="ts">
import { onMounted, ref } from 'vue';
import AgentDetail from '~/components/AgentDetail.vue';
import type { Agent } from '../types/agent';

const { data: agents, error } = await useFetch<Agent[]>('http://localhost:4320/api/v1/agents');

const selectedAgent = ref<Agent | null>(null);

onMounted(() => {
  if (agents.value && agents.value.length > 0) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    selectedAgent.value = agents.value[0];
  }
});

if (error.value) {
  console.error('Error fetching agents:', error.value);
}

function selectAgent(agent: Agent) {
  selectedAgent.value = agent;
}
</script>

<template>
  <div class="agent-layout">
    <div class="agent-list-container">
      <h2>Agents</h2>
      <ul class="agent-list">
        <li v-for="agent in agents" :key="agent.instanceUId"
          :class="{ selected: selectedAgent && selectedAgent.instanceUId === agent.instanceUId }"
          @click="selectAgent(agent)">

          <!-- {{ agent.description.identifyingAttributes['service.name'] }}
           -->
          {{ agent.instanceUId }}
        </li>
      </ul>
    </div>

    <div class="agent-detail-container">
      <AgentDetail :agent="selectedAgent" />
    </div>
  </div>
</template>

<style scoped>
.agent-layout {
  display: flex;
  height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  background-color: #f4f7f9;
}

.agent-list-container {
  width: 250px;
  border-right: 1px solid #e2e8f0;
  padding: 1rem;
  background-color: #ffffff;
  overflow-y: auto;
}

.agent-list-container h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.agent-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.agent-list li {
  padding: 0.75rem 1rem;
  cursor: pointer;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  transition: background-color 0.2s;
}

.agent-list li:hover {
  background-color: #f1f5f9;
}

.agent-list li.selected {
  background-color: #e2e8f0;
  font-weight: 600;
  color: #334155;
}

.agent-detail-container {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}
</style>