import { UseFormRegister } from 'react-hook-form';
import type { CalculatorFormData, IncidentType } from '../../types';

interface Step1Props {
  register: UseFormRegister<CalculatorFormData>;
  value?: IncidentType;
}

const incidentTypes = [
  { value: 'car_accident', label: 'Car Accident', icon: '🚗' },
  { value: 'slip_fall', label: 'Slip & Fall', icon: '⚠️' },
  { value: 'medical_malpractice', label: 'Medical Malpractice', icon: '🏥' },
  { value: 'workplace_injury', label: 'Workplace Injury', icon: '👷' },
  { value: 'dog_bite', label: 'Dog Bite', icon: '🐕' },
  { value: 'other', label: 'Other', icon: '📋' },
] as const;

export default function Step1({ register, value }: Step1Props) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-h2-mobile md:text-h2 font-bold text-dark mb-3">
          What type of incident occurred?
        </h2>
        <p className="text-base text-dark-light">
          Select the category that best describes your injury
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {incidentTypes.map((type) => (
          <label
            key={type.value}
            className={`flex items-center p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              value === type.value
                ? 'border-primary bg-primary bg-opacity-5'
                : 'border-gray-300 hover:border-primary hover:bg-gray-50'
            }`}
          >
            <input
              type="radio"
              value={type.value}
              {...register('incidentType')}
              className="sr-only"
            />
            <span className="text-3xl mr-4">{type.icon}</span>
            <span className="text-lg font-medium text-dark">{type.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
