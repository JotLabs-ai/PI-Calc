import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import type { CalculatorInput } from '@/lib/types';

interface DiagnosticsCardProps {
  register: UseFormRegister<CalculatorInput>;
  watch: UseFormWatch<CalculatorInput>;
  disabled?: boolean;
}

export default function DiagnosticsCard({ register, watch, disabled }: DiagnosticsCardProps) {
  const enabled = watch('diagnostics.enabled');

  return (
    <div className={`border-2 rounded-lg p-6 transition-all ${disabled ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed' : 'border-gray-300 bg-white'}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-[color:var(--dark)]">4. Diagnostics (X-ray/MRI/CT)</h3>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="no"
              {...register('diagnostics.enabled')}
              disabled={disabled}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium">No</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="yes"
              {...register('diagnostics.enabled')}
              disabled={disabled}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium">Yes</span>
          </label>
        </div>
      </div>

      {enabled === 'yes' && (
        <div className="space-y-6 pl-4 border-l-2 border-[color:var(--primary)]">
          {/* X-rays */}
          <div className="space-y-2">
            <label className="block text-sm font-bold">X-rays</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium mb-1">Number of X-rays</label>
                <input
                  type="number"
                  {...register('diagnostics.xrays.count', { valueAsNumber: true })}
                  className="border-2 border-gray-300 rounded-lg px-3 py-2 w-full focus:border-[color:var(--primary)] focus:outline-none"
                  placeholder="0"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Method</label>
                <select
                  {...register('diagnostics.xrays.method')}
                  className="border-2 border-gray-300 rounded-lg px-3 py-2 w-full focus:border-[color:var(--primary)] focus:outline-none"
                >
                  <option value="multiplier">Multiplier</option>
                  <option value="flat">Flat</option>
                </select>
              </div>
            </div>
          </div>

          {/* MRIs */}
          <div className="space-y-2">
            <label className="block text-sm font-bold">MRIs</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium mb-1">Number of MRIs</label>
                <input
                  type="number"
                  {...register('diagnostics.mris.count', { valueAsNumber: true })}
                  className="border-2 border-gray-300 rounded-lg px-3 py-2 w-full focus:border-[color:var(--primary)] focus:outline-none"
                  placeholder="0"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Method</label>
                <select
                  {...register('diagnostics.mris.method')}
                  className="border-2 border-gray-300 rounded-lg px-3 py-2 w-full focus:border-[color:var(--primary)] focus:outline-none"
                >
                  <option value="multiplier">Multiplier</option>
                  <option value="flat">Flat</option>
                </select>
              </div>
            </div>
          </div>

          {/* CT Scans */}
          <div className="space-y-2">
            <label className="block text-sm font-bold">CT Scans</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium mb-1">Number of CT Scans</label>
                <input
                  type="number"
                  {...register('diagnostics.cts.count', { valueAsNumber: true })}
                  className="border-2 border-gray-300 rounded-lg px-3 py-2 w-full focus:border-[color:var(--primary)] focus:outline-none"
                  placeholder="0"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Method</label>
                <select
                  {...register('diagnostics.cts.method')}
                  className="border-2 border-gray-300 rounded-lg px-3 py-2 w-full focus:border-[color:var(--primary)] focus:outline-none"
                >
                  <option value="multiplier">Multiplier</option>
                  <option value="flat">Flat</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
