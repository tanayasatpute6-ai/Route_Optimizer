import { MinPriorityQueue } from './priorityQueue.js';
import { reconstructPath, measureExecution } from './algorithmUtils.js';

export function runDijkstra(graph, startNode, targetNode, blockedEdges = new Set()) {
  return measureExecution(() => {
    if (startNode === targetNode) {
      return {
        path: [startNode],
        cost: 0,
        visitedNodes: [startNode],
        nodesExplored: 1,
        timeComplexity: 'O((V + E) log V)',
        spaceComplexity: 'O(V + E)',
        success: true
      };
    }

    const distances = {};
    const parents = {};
    const visited = new Set();
    const explorationOrder = [];

    for (const node of Object.keys(graph)) {
      distances[node] = Infinity;
      parents[node] = null;
    }
    distances[startNode] = 0;

    const pq = new MinPriorityQueue();
    pq.enqueue(startNode, 0);

    let found = false;

    while (!pq.isEmpty()) {
      const current = pq.dequeue();

      if (visited.has(current)) continue;
      visited.add(current);
      explorationOrder.push(current);

      if (current === targetNode) {
        found = true;
        break;
      }

      const neighbors = graph[current] || [];
      for (const edge of neighbors) {
        const neighborId = edge.to;
        const edgeKey1 = current + '-' + neighborId;
        const edgeKey2 = neighborId + '-' + current;
        const edgeId = edge.roadId || edgeKey1;

        if (blockedEdges.has(edgeId) || blockedEdges.has(edgeKey1) || blockedEdges.has(edgeKey2)) {
          continue;
        }

        const edgeWeight = edge.effectiveWeight !== undefined ? edge.effectiveWeight : edge.weight;
        const newDist = distances[current] + edgeWeight;

        if (newDist < (distances[neighborId] !== undefined ? distances[neighborId] : Infinity)) {
          distances[neighborId] = newDist;
          parents[neighborId] = current;
          pq.enqueue(neighborId, newDist);
        }
      }
    }

    if (!found || distances[targetNode] === Infinity) {
      return {
        path: [],
        cost: Infinity,
        visitedNodes: explorationOrder,
        nodesExplored: explorationOrder.length,
        timeComplexity: 'O((V + E) log V)',
        spaceComplexity: 'O(V + E)',
        success: false
      };
    }

    const path = reconstructPath(parents, startNode, targetNode);

    return {
      path,
      cost: Number(distances[targetNode].toFixed(2)),
      visitedNodes: explorationOrder,
      nodesExplored: explorationOrder.length,
      timeComplexity: 'O((V + E) log V)',
      spaceComplexity: 'O(V + E)',
      success: true
    };
  });
}
