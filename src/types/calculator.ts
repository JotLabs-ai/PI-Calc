export type IncidentType =
  | 'car_accident'
  | 'slip_fall'
  | 'medical_malpractice'
  | 'workplace_injury'
  | 'dog_bite'
  | 'other';

export type InjurySeverity =
  | 'minor'
  | 'moderate'
  | 'severe'
  | 'catastrophic';

export type MedicalTreatment = {
  emergency_room: boolean;
  hospitalization: boolean;
  surgery: boolean;
  physical_therapy: boolean;
  ongoing_care: boolean;
};

export type TimeOffWork =
  | 'none'
  | '1-7_days'
  | '1-4_weeks'
  | '1-3_months'
  | '3-6_months'
  | '6_months_plus';

export interface CalculatorFormData {
  incidentType: IncidentType;
  injurySeverity: InjurySeverity;
  medicalTreatment: MedicalTreatment;
  timeOffWork: TimeOffWork;
  propertyDamage: boolean;
  propertyDamageDetails?: string;
  faultPercentage: number;
  email: string;
  phone: string;
}

export interface CompensationResult {
  estimatedMin: number;
  estimatedMax: number;
  medicalCosts: number;
  lostWages: number;
  painAndSuffering: number;
  propertyDamage: number;
}
