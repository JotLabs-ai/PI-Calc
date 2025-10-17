import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import type { CalculatorInput } from '@/lib/types';

interface WrongfulDeathCardProps {
  register: UseFormRegister<CalculatorInput>;
  watch: UseFormWatch<CalculatorInput>;
  disabled?: boolean;
}

export default function WrongfulDeathCard({ register, watch, disabled }: WrongfulDeathCardProps) {
  const enabled = watch('wrongfulDeath.enabled');

  return (
    <div className={`border-2 rounded-lg p-6 transition-all ${disabled ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed' : 'border-gray-300 bg-white'}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-[color:var(--dark)]">9. Wrongful Death</h3>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="no"
              {...register('wrongfulDeath.enabled')}
              disabled={disabled}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium">No</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="yes"
              {...register('wrongfulDeath.enabled')}
              disabled={disabled}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium">Yes</span>
          </label>
        </div>
      </div>

      {enabled === 'yes' && (
        <div className="space-y-4 pl-4 border-l-2 border-[color:var(--primary)]">
          <div>
            <label className="block text-sm font-medium mb-2">Age of Deceased</label>
            <select
              {...register('wrongfulDeath.ageBracket')}
              className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full focus:border-[color:var(--primary)] focus:outline-none"
            >
              <option value="">Select age bracket...</option>
              <option value="1_20">1-20 years</option>
              <option value="21_30">21-30 years</option>
              <option value="31_50">31-50 years</option>
              <option value="51_70">51-70 years</option>
              <option value="70_100">70-100 years</option>
            </select>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm">
            <p className="text-red-800 font-semibold mb-2">Important Notice</p>
            <p className="text-red-700">
              Wrongful death cases are extremely sensitive and complex. This calculator provides only
              a rough estimate. We strongly recommend consulting with an attorney who specializes in
              wrongful death claims to properly evaluate your case.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
