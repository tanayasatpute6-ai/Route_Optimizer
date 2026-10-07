import { reconstructPath, measureExecution } from './algorithmUtils.js';

export function runBFS(graph, startNode, targetNode, blockedEdges = new Set()) {
  return measureExecution(() => {
    if (startNode === targetNode) {
      return {
        path: [startNode],
        cost: 0,
        visitedNodes: [startNode],
        nodesExplored: 1,
        timeComplexity: 'O(V + E)',
        spaceComplexity: 'O(V)',
        success: true
      };
    }

    const queue = [startNode];
    const visited = new Set([startNode]);
    const parents = { [startNode]: null };
    const explorationOrder = [];
    let found = false;

    while (queue.length > 0) {
      const current = queue.shift();
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

        if (!visited.has(neighborId)) {
          visited.add(neighborId);
          parents[neighborId] = current;
          queue.push(neighborId);
        }
      }
    }

    if (!found) {
      return {
        path: [],
        cost: Infinity,
        visitedNodes: explorationOrder,
        nodesExplored: explorationOrder.length,
        timeComplexity: 'O(V + E)',
        spaceComplexity: 'O(V)',
        success: false
      };
    }

    const path = reconstructPath(parents, startNode, targetNode);
    let totalCost = 0;
    for (let i = 0; i < path.length - 1; i++) {
      const u = path[i];
      const v = path[i + 1];
      const edge = (graph[u] || []).find((e) => e.to === v);
      if (edge) {
        totalCost += edge.effectiveWeight !== undefined ? edge.effectiveWeight : edge.weight;
      }
    }

    return {
      path,
      cost: Number(totalCost.toFixed(2)),
      visitedNodes: explorationOrder,
      nodesExplored: explorationOrder.length,
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V)',
      success: true
    };
  });
}
