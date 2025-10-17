import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import type { CalculatorInput } from '@/lib/types';

interface SoftTissueCardProps {
  register: UseFormRegister<CalculatorInput>;
  watch: UseFormWatch<CalculatorInput>;
  disabled?: boolean;
}

export default function SoftTissueCard({ register, watch, disabled }: SoftTissueCardProps) {
  const enabled = watch('softTissue.enabled');
  const knowsBills = watch('softTissue.knowsBills');

  return (
    <div className={`border-2 rounded-lg p-6 transition-all ${disabled ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed' : 'border-gray-300 bg-white'}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-[color:var(--dark)]">1. Soft Tissue Injury</h3>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="no"
              {...register('softTissue.enabled')}
              disabled={disabled}
              className="w-4 h-4 text-[color:var(--primary)]"
            />
            <span className="text-sm font-medium">No</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="yes"
              {...register('softTissue.enabled')}
              disabled={disabled}
              className="w-4 h-4 text-[color:var(--primary)]"
            />
            <span className="text-sm font-medium">Yes</span>
          </label>
        </div>
      </div>

      {enabled === 'yes' && (
        <div className="space-y-4 pl-4 border-l-2 border-[color:var(--primary)] animate-fadeIn">
          <div>
            <label className="block text-sm font-medium mb-2">Do you know your medical bills?</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="no"
                  {...register('softTissue.knowsBills')}
                  className="w-4 h-4"
                />
                <span className="text-sm">No - I&apos;ll estimate</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="yes"
                  {...register('softTissue.knowsBills')}
                  className="w-4 h-4"
                />
                <span className="text-sm">Yes - I have the bills</span>
              </label>
            </div>
          </div>

          {knowsBills === 'yes' ? (
            <div>
              <label className="block text-sm font-medium mb-2">Medical Bills Amount ($)</label>
              <input
                type="number"
                {...register('softTissue.medicalBills', { valueAsNumber: true })}
                className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full focus:border-[color:var(--primary)] focus:outline-none"
                placeholder="10000"
              />
            </div>
          ) : knowsBills === 'no' ? (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Months of Chiropractic Care</label>
                <input
                  type="number"
                  {...register('softTissue.monthsChiro', { valueAsNumber: true })}
                  className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full focus:border-[color:var(--primary)] focus:outline-none"
                  placeholder="3"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Number of Doctor Visits</label>
                <input
                  type="number"
                  {...register('softTissue.doctorVisits', { valueAsNumber: true })}
                  className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full focus:border-[color:var(--primary)] focus:outline-none"
                  placeholder="5"
                  min="0"
                />
              </div>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
}
