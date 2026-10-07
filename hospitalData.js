export const HOSPITAL_LIST = [
  {
    id: 'H01',
    name: 'CityCare Apex Hospital',
    nodeId: 'N09',
    type: 'Level 1 Trauma Center',
    address: '690 Healthcare Avenue, North Sector',
    totalEmergencyBeds: 28,
    availableEmergencyBeds: 8,
    availableICUBeds: 4,
    facilities: {
      cardiac: true,
      trauma: true,
      burnUnit: false,
      neurology: true,
      pediatric: true
    },
    rating: 4.9,
    phone: '+1 (555) 019-4821'
  },
  {
    id: 'H02',
    name: 'Metro General Healthcare',
    nodeId: 'N14',
    type: 'Multi-Specialty Emergency Hospital',
    address: '710 South Medical Blvd, Central Core',
    totalEmergencyBeds: 34,
    availableEmergencyBeds: 12,
    availableICUBeds: 6,
    facilities: {
      cardiac: true,
      trauma: true,
      burnUnit: true,
      neurology: true,
      pediatric: false
    },
    rating: 4.8,
    phone: '+1 (555) 014-9932'
  },
  {
    id: 'H03',
    name: 'LifePoint Regional Medical Center',
    nodeId: 'N04',
    type: 'Community Emergency Clinic',
    address: '700 University Circle, Academic District',
    totalEmergencyBeds: 18,
    availableEmergencyBeds: 5,
    availableICUBeds: 2,
    facilities: {
      cardiac: false,
      trauma: false,
      burnUnit: false,
      neurology: false,
      pediatric: true
    },
    rating: 4.6,
    phone: '+1 (555) 018-3419'
  },
  {
    id: 'H04',
    name: 'Central Emergency Trauma Institute',
    nodeId: 'N17',
    type: 'Trauma & Surgical Center',
    address: '650 Riverside Parkway South, South Waterfront',
    totalEmergencyBeds: 22,
    availableEmergencyBeds: 7,
    availableICUBeds: 3,
    facilities: {
      cardiac: true,
      trauma: true,
      burnUnit: true,
      neurology: true,
      pediatric: false
    },
    rating: 4.7,
    phone: '+1 (555) 012-7711'
  }
];
