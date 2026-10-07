export function reconstructPath(parents, startNode, targetNode) {
  const path = [];
  let current = targetNode;
  while (current !== null && current !== undefined) {
    path.unshift(current);
    if (current === startNode) break;
    current = parents[current];
  }
  return path[0] === startNode ? path : [];
}

export function measureExecution(fn) {
  const startTime = performance.now();
  const result = fn();
  const endTime = performance.now();
  const duration = Number((endTime - startTime).toFixed(3));
  return {
    ...result,
    executionTime: Math.max(duration, 0.05)
  };
}
