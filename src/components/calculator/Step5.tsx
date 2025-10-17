import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import type { CalculatorFormData } from '../../types';

interface Step5Props {
  register: UseFormRegister<CalculatorFormData>;
  watch: UseFormWatch<CalculatorFormData>;
}

export default function Step5({ register, watch }: Step5Props) {
  const hasPropertyDamage = watch('propertyDamage');

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-h2-mobile md:text-h2 font-bold text-dark mb-3">
          Was there any property damage?
        </h2>
        <p className="text-base text-dark-light">
          This could include vehicle damage, personal belongings, etc.
        </p>
      </div>

      <div className="space-y-4">
        <label className="flex items-center p-5 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-primary hover:bg-gray-50 transition-all duration-200">
          <input
            type="radio"
            value="true"
            {...register('propertyDamage', {
              setValueAs: (v) => v === 'true',
            })}
            className="mr-4"
          />
          <span className="text-lg text-dark">Yes, there was property damage</span>
        </label>

        <label className="flex items-center p-5 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-primary hover:bg-gray-50 transition-all duration-200">
          <input
            type="radio"
            value="false"
            {...register('propertyDamage', {
              setValueAs: (v) => v === 'true',
            })}
            className="mr-4"
          />
          <span className="text-lg text-dark">No property damage</span>
        </label>
      </div>

      {hasPropertyDamage && (
        <div className="mt-6 animate-fadeIn">
          <label htmlFor="propertyDamageDetails" className="block text-sm font-medium text-dark mb-2">
            Please describe the property damage (optional):
          </label>
          <textarea
            id="propertyDamageDetails"
            {...register('propertyDamageDetails')}
            rows={3}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors"
            placeholder="e.g., Car totaled, personal laptop damaged..."
          />
        </div>
      )}
    </div>
  );
}
