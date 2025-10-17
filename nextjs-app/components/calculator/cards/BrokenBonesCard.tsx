import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import type { CalculatorInput } from '@/lib/types';

interface BrokenBonesCardProps {
  register: UseFormRegister<CalculatorInput>;
  watch: UseFormWatch<CalculatorInput>;
  disabled?: boolean;
}

export default function BrokenBonesCard({ register, watch, disabled }: BrokenBonesCardProps) {
  const enabled = watch('brokenBones.enabled');
  const knowsBills = watch('brokenBones.knowsBills');

  return (
    <div className={`border-2 rounded-lg p-6 transition-all ${disabled ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed' : 'border-gray-300 bg-white'}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-[color:var(--dark)]">5. Broken Bones</h3>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="no"
              {...register('brokenBones.enabled')}
              disabled={disabled}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium">No</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="yes"
              {...register('brokenBones.enabled')}
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
            <label className="block text-sm font-medium mb-2">Do you know your medical bills?</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="no"
                  {...register('brokenBones.knowsBills')}
                  className="w-4 h-4"
                />
                <span className="text-sm">No - Estimate by body part</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="yes"
                  {...register('brokenBones.knowsBills')}
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
                {...register('brokenBones.medicalBills', { valueAsNumber: true })}
                className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full focus:border-[color:var(--primary)] focus:outline-none"
                placeholder="50000"
              />
            </div>
          ) : knowsBills === 'no' ? (
            <div>
              <label className="block text-sm font-medium mb-2">Broken Body Part</label>
              <select
                {...register('brokenBones.bodyPart')}
                className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full focus:border-[color:var(--primary)] focus:outline-none"
              >
                <option value="">Select body part...</option>
                <option value="leg">Leg</option>
                <option value="arm">Arm</option>
                <option value="collar_bone">Collar Bone</option>
                <option value="foot_ankle">Foot/Ankle</option>
                <option value="hip">Hip</option>
              </select>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
