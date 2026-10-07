import { runDijkstra } from '../algorithms/dijkstra.js';

export function selectBestAmbulance(ambulanceFleet, emergencyNodeId, graph, blockedEdges = new Set(), severity = 'Moderate') {
  const candidatesWithRoutes = [];

  for (const amb of ambulanceFleet) {
    const routeResult = runDijkstra(graph, amb.nodeId, emergencyNodeId, blockedEdges);
    if (routeResult.success) {
      let effectiveCost = routeResult.cost;
      if (severity === 'Critical' && amb.type === 'ALS') {
        effectiveCost *= 0.85;
      }
      candidatesWithRoutes.push({
        ambulance: amb,
        routeResult,
        effectiveCost: Number(effectiveCost.toFixed(2)),
        rawCost: routeResult.cost
      });
    }
  }

  if (candidatesWithRoutes.length === 0) {
    return { recommendedAmbulance: null, bestRoute: null, candidatesWithRoutes: [] };
  }

  candidatesWithRoutes.sort((a, b) => a.effectiveCost - b.effectiveCost);
  const bestCandidate = candidatesWithRoutes[0];

  return {
    recommendedAmbulance: bestCandidate.ambulance,
    bestRoute: bestCandidate.routeResult,
    candidatesWithRoutes,
    reason: `Lowest calculated route cost (${bestCandidate.effectiveCost} effective km) using Dijkstra's algorithm.`
  };
}

export function selectBestHospital(hospitalList, patientNodeId, emergencyType, severity, graph, blockedEdges = new Set()) {
  const scoredHospitals = [];

  for (const hosp of hospitalList) {
    const routeResult = runDijkstra(graph, patientNodeId, hosp.nodeId, blockedEdges);
    if (!routeResult.success) continue;

    let medicalScore = 100;
    const reasons = [];

    if (emergencyType === 'Cardiac Emergency' && hosp.facilities.cardiac) {
      medicalScore += 40;
      reasons.push('Specialized Cardiac Cath Lab available');
    }
    if ((emergencyType === 'Road Accident' || emergencyType === 'Severe Injury') && hosp.facilities.trauma) {
      medicalScore += 40;
      reasons.push('Trauma resuscitation unit available');
    }
    if (severity === 'Critical' && hosp.availableICUBeds > 0) {
      medicalScore += 25;
      reasons.push(`${hosp.availableICUBeds} ICU beds available`);
    }

    const finalScore = medicalScore - (routeResult.cost * 12);

    scoredHospitals.push({
      hospital: hosp,
      routeResult,
      routeCost: routeResult.cost,
      estimatedTimeMin: Math.max(3, Math.round(routeResult.cost * 2.8)),
      finalScore,
      matchNotes: reasons
    });
  }

  if (scoredHospitals.length === 0) {
    return { recommendedHospital: null, bestRoute: null, scoredHospitals: [] };
  }

  scoredHospitals.sort((a, b) => b.finalScore - a.finalScore);
  const best = scoredHospitals[0];

  return {
    recommendedHospital: best.hospital,
    bestRoute: best.routeResult,
    scoredHospitals,
    reason: `Optimal triage capability and shortest transit route (${best.routeCost} km).`
  };
}
