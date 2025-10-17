import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import type { CalculatorInput } from '@/lib/types';

interface FaultCardProps {
  register: UseFormRegister<CalculatorInput>;
  watch: UseFormWatch<CalculatorInput>;
  disabled?: boolean;
}

export default function FaultCard({ register, watch, disabled }: FaultCardProps) {
  const enabled = watch('fault.enabled');
  const faultPercent = watch('fault.percent') || 0;

  return (
    <div className={`border-2 rounded-lg p-6 transition-all ${disabled ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed' : 'border-gray-300 bg-white'}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-[color:var(--dark)]">8. Comparative Fault</h3>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="no"
              {...register('fault.enabled')}
              disabled={disabled}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium">No</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="yes"
              {...register('fault.enabled')}
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
            <label className="block text-sm font-medium mb-2">
              Your Fault Percentage: {faultPercent}%
            </label>
            <p className="text-xs text-gray-600 mb-3">
              If you were partially at fault, your compensation will be reduced by this percentage
            </p>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              {...register('fault.percent', { valueAsNumber: true })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0% (Not at fault)</span>
              <span>50%</span>
              <span>100% (Fully at fault)</span>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
            <p className="text-blue-800">
              <strong>Note:</strong> Your final settlement will be reduced by {faultPercent}%.
              {faultPercent > 0 && ` You'll receive ${100 - faultPercent}% of the total.`}
            </p>
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
