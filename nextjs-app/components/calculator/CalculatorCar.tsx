'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { CalculatorInput } from '@/lib/types';
import { calculateEstimate } from '@/lib/calc';
import { formatCurrency } from '@/lib/format';
import SoftTissueCard from './cards/SoftTissueCard';
import SpecialistsCard from './cards/SpecialistsCard';
import PainMgmtCard from './cards/PainMgmtCard';
import DiagnosticsCard from './cards/DiagnosticsCard';
import BrokenBonesCard from './cards/BrokenBonesCard';
import WageLossCard from './cards/WageLossCard';
import SurgeryCard from './cards/SurgeryCard';
import FaultCard from './cards/FaultCard';
import WrongfulDeathCard from './cards/WrongfulDeathCard';

export default function CalculatorCar() {
  const [result, setResult] = useState<number | null>(null);

  const { register, handleSubmit, watch } = useForm<CalculatorInput>({
    defaultValues: {
      softTissue: { enabled: 'no' },
      specialists: { enabled: 'no', method: 'multiplier' },
      painMgmt: { enabled: 'no', method: 'conservative' },
      diagnostics: {
        enabled: 'no',
        xrays: { count: 0, method: 'multiplier' },
        mris: { count: 0, method: 'multiplier' },
        cts: { count: 0, method: 'multiplier' },
      },
      brokenBones: { enabled: 'no' },
      wageLoss: { enabled: 'no', percentApplied: 100 },
      surgery: { enabled: 'no' },
      fault: { enabled: 'no', percent: 0 },
      wrongfulDeath: { enabled: 'no' },
      globalStyle: 'standard',
    },
  });

  // Watch all category states for progressive enablement
  const softTissueEnabled = watch('softTissue.enabled');
  const specialistsEnabled = watch('specialists.enabled');
  const painMgmtEnabled = watch('painMgmt.enabled');
  const diagnosticsEnabled = watch('diagnostics.enabled');
  const brokenBonesEnabled = watch('brokenBones.enabled');
  const wageLossEnabled = watch('wageLoss.enabled');
  const surgeryEnabled = watch('surgery.enabled');
  const faultEnabled = watch('fault.enabled');
  const wrongfulDeathEnabled = watch('wrongfulDeath.enabled');

  // Progressive enablement logic
  const category1Complete = softTissueEnabled !== undefined;
  const category2Enabled = category1Complete;
  const category2Complete = category2Enabled && specialistsEnabled !== undefined;
  const category3Enabled = category2Complete;
  const category3Complete = category3Enabled && painMgmtEnabled !== undefined;
  const category4Enabled = category3Complete;
  const category4Complete = category4Enabled && diagnosticsEnabled !== undefined;
  const category5Enabled = category4Complete;
  const category5Complete = category5Enabled && brokenBonesEnabled !== undefined;
  const category6Enabled = category5Complete;
  const category6Complete = category6Enabled && wageLossEnabled !== undefined;
  const category7Enabled = category6Complete;
  const category7Complete = category7Enabled && surgeryEnabled !== undefined;
  const category8Enabled = category7Complete;
  const category8Complete = category8Enabled && faultEnabled !== undefined;
  const category9Enabled = category8Complete;

  const onSubmit = (data: CalculatorInput) => {
    const calculation = calculateEstimate(data);
    setResult(calculation.net);
    // Scroll to result
    setTimeout(() => {
      document.getElementById('result')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-[length:var(--font-size-h2-mobile)] md:text-[length:var(--font-size-h2)] font-bold text-[color:var(--dark)] mb-4 text-center">
          Car Accident Settlement Calculator
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Answer each question to enable the next section. Select "No" to skip or "Yes" to provide details.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <SoftTissueCard register={register} watch={watch} disabled={false} />
          <SpecialistsCard register={register} watch={watch} disabled={!category2Enabled} />
          <PainMgmtCard register={register} watch={watch} disabled={!category3Enabled} />
          <DiagnosticsCard register={register} watch={watch} disabled={!category4Enabled} />
          <BrokenBonesCard register={register} watch={watch} disabled={!category5Enabled} />
          <WageLossCard register={register} watch={watch} disabled={!category6Enabled} />
          <SurgeryCard register={register} watch={watch} disabled={!category7Enabled} />
          <FaultCard register={register} watch={watch} disabled={!category8Enabled} />
          <WrongfulDeathCard register={register} watch={watch} disabled={!category9Enabled} />

          {/* Calculate Button */}
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              disabled={!category9Enabled || wrongfulDeathEnabled === undefined}
              className="bg-[color:var(--primary)] hover:bg-[color:var(--primary-dark)] text-white font-bold py-4 px-12 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Calculate Estimate
            </button>
          </div>
        </form>

        {/* Result Display */}
        {result !== null && (
          <div id="result" className="mt-8 p-8 bg-gradient-to-br from-[color:var(--primary)] to-[color:var(--primary-dark)] text-white rounded-2xl text-center animate-fadeIn">
            <h3 className="text-2xl font-bold mb-4">Estimated Settlement Value</h3>
            <div className="text-5xl font-bold mb-2">{formatCurrency(result)}</div>
            <p className="mt-4 text-sm opacity-90">
              This is an estimate based on the information provided. Actual settlement values may vary.
            </p>
            <button
              onClick={() => {
                setResult(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="mt-6 bg-white text-[color:var(--primary)] font-semibold py-2 px-6 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Calculate Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
