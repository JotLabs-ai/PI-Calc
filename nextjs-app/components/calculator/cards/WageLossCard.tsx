import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import type { CalculatorInput } from '@/lib/types';

interface WageLossCardProps {
  register: UseFormRegister<CalculatorInput>;
  watch: UseFormWatch<CalculatorInput>;
  disabled?: boolean;
}

export default function WageLossCard({ register, watch, disabled }: WageLossCardProps) {
  const enabled = watch('wageLoss.enabled');
  const percentApplied = watch('wageLoss.percentApplied') || 100;

  return (
    <div className={`border-2 rounded-lg p-6 transition-all ${disabled ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed' : 'border-gray-300 bg-white'}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-[color:var(--dark)]">6. Wage Loss</h3>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="no"
              {...register('wageLoss.enabled')}
              disabled={disabled}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium">No</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="yes"
              {...register('wageLoss.enabled')}
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
            <label className="block text-sm font-medium mb-2">Gross Wage Loss Amount ($)</label>
            <input
              type="number"
              {...register('wageLoss.grossLoss', { valueAsNumber: true })}
              className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full focus:border-[color:var(--primary)] focus:outline-none"
              placeholder="25000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Percent Applied: {percentApplied}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              {...register('wageLoss.percentApplied', { valueAsNumber: true })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--primary);
          cursor: pointer;
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--primary);
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}
