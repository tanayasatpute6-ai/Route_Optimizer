import { MinPriorityQueue } from './priorityQueue.js';
import { reconstructPath, measureExecution } from './algorithmUtils.js';

export function calculateHeuristic(nodeA, nodeB, scaleFactor = 0.015) {
  if (!nodeA || !nodeB) return 0;
  const dx = nodeA.x - nodeB.x;
  const dy = nodeA.y - nodeB.y;
  return Math.sqrt(dx * dx + dy * dy) * scaleFactor;
}

export function runAStar(graph, nodeCoords, startNode, targetNode, blockedEdges = new Set()) {
  return measureExecution(() => {
    if (startNode === targetNode) {
      return {
        path: [startNode],
        cost: 0,
        visitedNodes: [startNode],
        nodesExplored: 1,
        timeComplexity: 'O(E) to O((V+E)logV)',
        spaceComplexity: 'O(V + E)',
        success: true
      };
    }

    const targetCoord = nodeCoords[targetNode];
    const gScore = {};
    const fScore = {};
    const parents = {};
    const closedSet = new Set();
    const explorationOrder = [];

    for (const node of Object.keys(graph)) {
      gScore[node] = Infinity;
      fScore[node] = Infinity;
      parents[node] = null;
    }

    gScore[startNode] = 0;
    const initialH = calculateHeuristic(nodeCoords[startNode], targetCoord);
    fScore[startNode] = initialH;

    const openSet = new MinPriorityQueue();
    openSet.enqueue(startNode, fScore[startNode]);

    let found = false;

    while (!openSet.isEmpty()) {
      const current = openSet.dequeue();

      if (closedSet.has(current)) continue;
      closedSet.add(current);
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
        if (closedSet.has(neighborId)) continue;

        const edgeWeight = edge.effectiveWeight !== undefined ? edge.effectiveWeight : edge.weight;
        const tentativeGScore = gScore[current] + edgeWeight;

        if (tentativeGScore < (gScore[neighborId] !== undefined ? gScore[neighborId] : Infinity)) {
          parents[neighborId] = current;
          gScore[neighborId] = tentativeGScore;

          const h = calculateHeuristic(nodeCoords[neighborId], targetCoord);
          const f = tentativeGScore + h;
          fScore[neighborId] = f;

          openSet.enqueue(neighborId, f);
        }
      }
    }

    if (!found || gScore[targetNode] === Infinity) {
      return {
        path: [],
        cost: Infinity,
        visitedNodes: explorationOrder,
        nodesExplored: explorationOrder.length,
        timeComplexity: 'O(E) to O((V+E)logV)',
        spaceComplexity: 'O(V + E)',
        success: false
      };
    }

    const path = reconstructPath(parents, startNode, targetNode);

    return {
      path,
      cost: Number(gScore[targetNode].toFixed(2)),
      visitedNodes: explorationOrder,
      nodesExplored: explorationOrder.length,
      timeComplexity: 'O(E) to O((V+E)logV)',
      spaceComplexity: 'O(V + E)',
      success: true
    };
  });
}
