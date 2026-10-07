import { TRAFFIC_MULTIPLIERS } from '../data/mapData.js';

export function buildGraphAdjacency(nodes, roads, trafficOverrides = {}) {
  const graph = {};
  for (const node of nodes) {
    graph[node.id] = [];
  }
  for (const road of roads) {
    const trafficLevel = trafficOverrides[road.id] || road.traffic || 'low';
    const multiplier = TRAFFIC_MULTIPLIERS[trafficLevel] || 1.0;
    const effectiveWeight = Number((road.distance * multiplier).toFixed(2));

    if (graph[road.u]) {
      graph[road.u].push({
        to: road.v,
        weight: road.distance,
        effectiveWeight,
        roadId: road.id,
        name: road.name,
        traffic: trafficLevel
      });
    }

    if (graph[road.v]) {
      graph[road.v].push({
        to: road.u,
        weight: road.distance,
        effectiveWeight,
        roadId: road.id,
        name: road.name,
        traffic: trafficLevel
      });
    }
  }
  return graph;
}
