import { z } from 'zod';

export const step1Schema = z.object({
  incidentType: z.enum(['car_accident', 'slip_fall', 'medical_malpractice', 'workplace_injury', 'dog_bite', 'other']),
});

export const step2Schema = z.object({
  injurySeverity: z.enum(['minor', 'moderate', 'severe', 'catastrophic']),
});

export const step3Schema = z.object({
  medicalTreatment: z.object({
    emergency_room: z.boolean(),
    hospitalization: z.boolean(),
    surgery: z.boolean(),
    physical_therapy: z.boolean(),
    ongoing_care: z.boolean(),
  }),
});

export const step4Schema = z.object({
  timeOffWork: z.enum(['none', '1-7_days', '1-4_weeks', '1-3_months', '3-6_months', '6_months_plus']),
});

export const step5Schema = z.object({
  propertyDamage: z.boolean(),
  propertyDamageDetails: z.string().optional(),
});

export const step6Schema = z.object({
  faultPercentage: z.number().min(0).max(100),
});

export const step7Schema = z.object({
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^[\d\s\-\(\)]+$/, 'Please enter a valid phone number').min(10, 'Phone number must be at least 10 digits'),
});

export const fullFormSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema)
  .merge(step5Schema)
  .merge(step6Schema)
  .merge(step7Schema);
