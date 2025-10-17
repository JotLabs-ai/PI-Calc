import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import type { CalculatorFormData } from '../../types';

interface Step6Props {
  register: UseFormRegister<CalculatorFormData>;
  watch: UseFormWatch<CalculatorFormData>;
}

export default function Step6({ register, watch }: Step6Props) {
  const faultValue = watch('faultPercentage') || 100;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-h2-mobile md:text-h2 font-bold text-dark mb-3">
          What percentage of fault lies with the other party?
        </h2>
        <p className="text-base text-dark-light">
          Move the slider to indicate liability
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        <div className="mb-8">
          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-primary mb-2">{faultValue}%</div>
            <div className="text-sm text-dark-light">Other Party's Fault</div>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            step="5"
            {...register('faultPercentage', {
              valueAsNumber: true,
            })}
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />

          <div className="flex justify-between mt-2 text-sm text-dark-light">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-dark-light">
          <p className="mb-2">
            <strong>Note:</strong> In most states, your compensation is reduced by your percentage of fault.
          </p>
          <p>
            For example, if you're 20% at fault, you can typically recover 80% of the damages.
          </p>
        </div>
      </div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #DC971F;
          cursor: pointer;
        }

        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #DC971F;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}
