import type { CalculatorFormData, CompensationResult } from '../types';

const INJURY_MULTIPLIERS = {
  minor: { min: 1.5, max: 3 },
  moderate: { min: 3, max: 5 },
  severe: { min: 5, max: 8 },
  catastrophic: { min: 8, max: 15 },
};

const INCIDENT_BASE_VALUES = {
  car_accident: 10000,
  slip_fall: 8000,
  medical_malpractice: 15000,
  workplace_injury: 12000,
  dog_bite: 7000,
  other: 8000,
};

const TIME_OFF_VALUES = {
  none: 0,
  '1-7_days': 2000,
  '1-4_weeks': 8000,
  '1-3_months': 25000,
  '3-6_months': 50000,
  '6_months_plus': 100000,
};

export function calculateCompensation(data: CalculatorFormData): CompensationResult {
  const baseValue = INCIDENT_BASE_VALUES[data.incidentType];
  const multiplier = INJURY_MULTIPLIERS[data.injurySeverity];

  // Calculate medical costs
  let medicalCosts = baseValue;
  const treatments = data.medicalTreatment;
  if (treatments.emergency_room) medicalCosts += 5000;
  if (treatments.hospitalization) medicalCosts += 20000;
  if (treatments.surgery) medicalCosts += 50000;
  if (treatments.physical_therapy) medicalCosts += 10000;
  if (treatments.ongoing_care) medicalCosts += 15000;

  // Calculate lost wages
  const lostWages = TIME_OFF_VALUES[data.timeOffWork];

  // Calculate pain and suffering
  const painAndSuffering = medicalCosts * multiplier.min;

  // Property damage
  const propertyDamage = data.propertyDamage ? 5000 : 0;

  // Total before fault adjustment
  const totalBeforeFault = medicalCosts + lostWages + painAndSuffering + propertyDamage;

  // Apply fault percentage
  const faultAdjustment = data.faultPercentage / 100;
  const estimatedMin = Math.round(totalBeforeFault * faultAdjustment * multiplier.min / 2);
  const estimatedMax = Math.round(totalBeforeFault * faultAdjustment * multiplier.max);

  return {
    estimatedMin,
    estimatedMax,
    medicalCosts: Math.round(medicalCosts * faultAdjustment),
    lostWages: Math.round(lostWages * faultAdjustment),
    painAndSuffering: Math.round(painAndSuffering * faultAdjustment),
    propertyDamage: Math.round(propertyDamage * faultAdjustment),
  };
}
