import { UseFormRegister } from 'react-hook-form';
import type { CalculatorFormData, TimeOffWork } from '../../types';

interface Step4Props {
  register: UseFormRegister<CalculatorFormData>;
  value?: TimeOffWork;
}

const timeOffOptions = [
  { value: 'none', label: 'None - I continued working' },
  { value: '1-7_days', label: '1-7 days' },
  { value: '1-4_weeks', label: '1-4 weeks' },
  { value: '1-3_months', label: '1-3 months' },
  { value: '3-6_months', label: '3-6 months' },
  { value: '6_months_plus', label: '6+ months' },
] as const;

export default function Step4({ register, value }: Step4Props) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-h2-mobile md:text-h2 font-bold text-dark mb-3">
          How much time did you miss from work?
        </h2>
        <p className="text-base text-dark-light">
          Select the duration that applies to your situation
        </p>
      </div>

      <div className="space-y-3">
        {timeOffOptions.map((option) => (
          <label
            key={option.value}
            className={`flex items-center p-5 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              value === option.value
                ? 'border-primary bg-primary bg-opacity-5'
                : 'border-gray-300 hover:border-primary hover:bg-gray-50'
            }`}
          >
            <input
              type="radio"
              value={option.value}
              {...register('timeOffWork')}
              className="mr-4"
            />
            <span className="text-lg text-dark">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
