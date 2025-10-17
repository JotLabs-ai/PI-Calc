import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import type { CalculatorInput } from '@/lib/types';

interface PainMgmtCardProps {
  register: UseFormRegister<CalculatorInput>;
  watch: UseFormWatch<CalculatorInput>;
  disabled?: boolean;
}

export default function PainMgmtCard({ register, watch, disabled }: PainMgmtCardProps) {
  const enabled = watch('painMgmt.enabled');

  return (
    <div className={`border-2 rounded-lg p-6 transition-all ${disabled ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed' : 'border-gray-300 bg-white'}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-[color:var(--dark)]">3. Pain Management (Injections)</h3>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="no"
              {...register('painMgmt.enabled')}
              disabled={disabled}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium">No</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="yes"
              {...register('painMgmt.enabled')}
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
            <label className="block text-sm font-medium mb-2">Number of Injections</label>
            <input
              type="number"
              {...register('painMgmt.injections', { valueAsNumber: true })}
              className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full focus:border-[color:var(--primary)] focus:outline-none"
              placeholder="3"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Treatment Method</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="conservative"
                  {...register('painMgmt.method')}
                  className="w-4 h-4"
                />
                <span className="text-sm">Conservative</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="aggressive"
                  {...register('painMgmt.method')}
                  className="w-4 h-4"
                />
                <span className="text-sm">Aggressive</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
