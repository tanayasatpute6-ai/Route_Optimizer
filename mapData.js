export const CITY_NODES = [
  { id: 'N01', name: 'North Hill Crossing', x: 120, y: 80, district: 'Residential North' },
  { id: 'N02', name: 'Highland Junction', x: 300, y: 70, district: 'Residential North' },
  { id: 'N03', name: 'Civic Center Hub', x: 500, y: 90, district: 'Civic District' },
  { id: 'N04', name: 'University Circle', x: 700, y: 80, district: 'Academic Zone' },
  { id: 'N05', name: 'Metro Terminal Square', x: 900, y: 90, district: 'East Transit Hub' },

  { id: 'N06', name: 'Westside Boulevard', x: 100, y: 240, district: 'West Suburb' },
  { id: 'N07', name: 'Central Plaza', x: 280, y: 230, district: 'Downtown Core' },
  { id: 'N08', name: 'Downtown Midtown', x: 490, y: 220, district: 'Commercial Hub' },
  { id: 'N09', name: 'Medical District North', x: 690, y: 240, district: 'Healthcare Sector' },
  { id: 'N10', name: 'East River Bridge West', x: 890, y: 250, district: 'East Waterfront' },

  { id: 'N11', name: 'Industrial Expressway West', x: 110, y: 400, district: 'Industrial Zone' },
  { id: 'N12', name: 'Tech Park Junction', x: 310, y: 390, district: 'Innovation Corridor' },
  { id: 'N13', name: 'Grand Avenue Crossing', x: 510, y: 380, district: 'South Commercial' },
  { id: 'N14', name: 'South Medical Gate', x: 710, y: 410, district: 'Healthcare Sector' },
  { id: 'N15', name: 'Harbor Boulevard Roundabout', x: 910, y: 420, district: 'Harbor Port' },

  { id: 'N16', name: 'South Outer Ringroad', x: 400, y: 530, district: 'Southern Suburbs' },
  { id: 'N17', name: 'Riverside Parkway South', x: 650, y: 540, district: 'South Waterfront' },
  { id: 'N18', name: 'Coastal Highway Link', x: 850, y: 530, district: 'Harbor Port' }
];

export const NODE_COORDINATES = CITY_NODES.reduce((acc, node) => {
  acc[node.id] = { x: node.x, y: node.y, name: node.name };
  return acc;
}, {});

export const TRAFFIC_MULTIPLIERS = {
  low: 1.0,
  moderate: 1.5,
  heavy: 2.2
};

export const CITY_ROADS = [
  { id: 'R01', u: 'N01', v: 'N02', name: 'Hillcrest Ave', distance: 2.4, traffic: 'low' },
  { id: 'R02', u: 'N02', v: 'N03', name: 'Civic Expressway', distance: 2.8, traffic: 'moderate' },
  { id: 'R03', u: 'N03', v: 'N04', name: 'University Way', distance: 2.6, traffic: 'low' },
  { id: 'R04', u: 'N04', v: 'N05', name: 'East Metro Link', distance: 2.7, traffic: 'heavy' },

  { id: 'R05', u: 'N01', v: 'N06', name: 'West Parkway', distance: 2.1, traffic: 'low' },
  { id: 'R06', u: 'N02', v: 'N07', name: 'Highland Descent', distance: 2.3, traffic: 'moderate' },
  { id: 'R07', u: 'N03', v: 'N08', name: 'Civic Spine', distance: 1.9, traffic: 'heavy' },
  { id: 'R08', u: 'N04', v: 'N09', name: 'Hospital Access Rd', distance: 2.2, traffic: 'low' },
  { id: 'R09', u: 'N05', v: 'N10', name: 'Terminal Overpass', distance: 2.0, traffic: 'moderate' },

  { id: 'R10', u: 'N06', v: 'N07', name: 'Central Loop West', distance: 2.5, traffic: 'low' },
  { id: 'R11', u: 'N07', v: 'N08', name: 'Downtown Main St', distance: 2.7, traffic: 'heavy' },
  { id: 'R12', u: 'N08', v: 'N09', name: 'Medical District Way', distance: 2.6, traffic: 'moderate' },
  { id: 'R13', u: 'N09', v: 'N10', name: 'Waterfront Blvd', distance: 2.5, traffic: 'low' },

  { id: 'R14', u: 'N07', v: 'N12', name: 'Innovation Diagonal', distance: 2.2, traffic: 'low' },
  { id: 'R15', u: 'N08', v: 'N14', name: 'Health Diagonal Bypass', distance: 3.2, traffic: 'moderate' },

  { id: 'R16', u: 'N06', v: 'N11', name: 'Industrial Bypass', distance: 2.2, traffic: 'moderate' },
  { id: 'R17', u: 'N07', v: 'N12', name: 'Central Tech Ave', distance: 2.3, traffic: 'low' },
  { id: 'R18', u: 'N08', v: 'N13', name: 'Grand Corridor', distance: 2.1, traffic: 'heavy' },
  { id: 'R19', u: 'N09', v: 'N14', name: 'Ambulance Priority Rd', distance: 2.3, traffic: 'low' },
  { id: 'R20', u: 'N10', v: 'N15', name: 'Harbor Freight Rd', distance: 2.4, traffic: 'moderate' },

  { id: 'R21', u: 'N11', v: 'N12', name: 'Tech Park Arterial', distance: 2.6, traffic: 'low' },
  { id: 'R22', u: 'N12', v: 'N13', name: 'Commerce Drive', distance: 2.7, traffic: 'low' },
  { id: 'R23', u: 'N13', v: 'N14', name: 'Hospital South Parkway', distance: 2.5, traffic: 'moderate' },
  { id: 'R24', u: 'N14', v: 'N15', name: 'Port Connector', distance: 2.8, traffic: 'low' },

  { id: 'R25', u: 'N11', v: 'N16', name: 'South Industrial Link', distance: 2.9, traffic: 'low' },
  { id: 'R26', u: 'N12', v: 'N16', name: 'Ring Road West Link', distance: 2.3, traffic: 'low' },
  { id: 'R27', u: 'N13', v: 'N16', name: 'Metro Center South Bypass', distance: 2.4, traffic: 'moderate' },
  { id: 'R28', u: 'N13', v: 'N17', name: 'Riverside Connector', distance: 2.8, traffic: 'low' },
  { id: 'R29', u: 'N14', v: 'N17', name: 'Hospital River Exit', distance: 2.2, traffic: 'low' },
  { id: 'R30', u: 'N15', v: 'N18', name: 'Coast Expressway', distance: 2.6, traffic: 'heavy' },
  { id: 'R31', u: 'N17', v: 'N18', name: 'South Shore Bridge', distance: 2.5, traffic: 'low' }
];
