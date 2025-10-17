import { UseFormRegister } from 'react-hook-form';
import type { CalculatorFormData, InjurySeverity } from '../../types';

interface Step2Props {
  register: UseFormRegister<CalculatorFormData>;
  value?: InjurySeverity;
}

const severityLevels = [
  {
    value: 'minor',
    label: 'Minor',
    description: 'Bruises, minor cuts, temporary pain',
  },
  {
    value: 'moderate',
    label: 'Moderate',
    description: 'Fractures, sprains, short-term disability',
  },
  {
    value: 'severe',
    label: 'Severe',
    description: 'Serious injuries requiring extensive treatment',
  },
  {
    value: 'catastrophic',
    label: 'Catastrophic',
    description: 'Life-altering injuries, permanent disability',
  },
] as const;

export default function Step2({ register, value }: Step2Props) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-h2-mobile md:text-h2 font-bold text-dark mb-3">
          How severe was your injury?
        </h2>
        <p className="text-base text-dark-light">
          Select the level that best matches your situation
        </p>
      </div>

      <div className="space-y-4">
        {severityLevels.map((level) => (
          <label
            key={level.value}
            className={`flex items-start p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              value === level.value
                ? 'border-primary bg-primary bg-opacity-5'
                : 'border-gray-300 hover:border-primary hover:bg-gray-50'
            }`}
          >
            <input
              type="radio"
              value={level.value}
              {...register('injurySeverity')}
              className="mt-1 mr-4"
            />
            <div className="flex-1">
              <div className="font-bold text-lg text-dark mb-1">{level.label}</div>
              <div className="text-sm text-dark-light">{level.description}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
