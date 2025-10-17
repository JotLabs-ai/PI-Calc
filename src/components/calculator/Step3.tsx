import { UseFormRegister } from 'react-hook-form';
import type { CalculatorFormData } from '../../types';

interface Step3Props {
  register: UseFormRegister<CalculatorFormData>;
}

const treatments = [
  { key: 'emergency_room', label: 'Emergency Room Visit' },
  { key: 'hospitalization', label: 'Hospitalization' },
  { key: 'surgery', label: 'Surgery' },
  { key: 'physical_therapy', label: 'Physical Therapy' },
  { key: 'ongoing_care', label: 'Ongoing Medical Care' },
] as const;

export default function Step3({ register }: Step3Props) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-h2-mobile md:text-h2 font-bold text-dark mb-3">
          What medical treatment did you receive?
        </h2>
        <p className="text-base text-dark-light">
          Select all that apply
        </p>
      </div>

      <div className="space-y-4">
        {treatments.map((treatment) => (
          <label
            key={treatment.key}
            className="flex items-center p-5 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-primary hover:bg-gray-50 transition-all duration-200"
          >
            <input
              type="checkbox"
              {...register(`medicalTreatment.${treatment.key}`)}
              className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <span className="ml-4 text-lg text-dark">{treatment.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
