import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { CalculatorFormData, CompensationResult } from '../../types';
import { fullFormSchema } from '../../utils/validation';
import { calculateCompensation } from '../../utils/calculator';
import ProgressBar from '../common/ProgressBar';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';
import Step7 from './Step7';
import Results from './Results';

const TOTAL_STEPS = 7;

interface CalculatorProps {
  onClose: () => void;
}

export default function Calculator({ onClose }: CalculatorProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [result, setResult] = useState<CompensationResult | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm<CalculatorFormData>({
    resolver: zodResolver(fullFormSchema),
    defaultValues: {
      faultPercentage: 100,
      propertyDamage: false,
      medicalTreatment: {
        emergency_room: false,
        hospitalization: false,
        surgery: false,
        physical_therapy: false,
        ongoing_care: false,
      },
    },
  });

  const onSubmit = (data: CalculatorFormData) => {
    const calculatedResult = calculateCompensation(data);
    setResult(calculatedResult);
  };

  const handleNext = async () => {
    const stepFields: Record<number, (keyof CalculatorFormData)[]> = {
      1: ['incidentType'],
      2: ['injurySeverity'],
      3: ['medicalTreatment'],
      4: ['timeOffWork'],
      5: ['propertyDamage'],
      6: ['faultPercentage'],
      7: ['email', 'phone'],
    };

    const isValid = await trigger(stepFields[currentStep] as any);

    if (isValid) {
      if (currentStep === TOTAL_STEPS) {
        handleSubmit(onSubmit)();
      } else {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setResult(null);
  };

  if (result) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Results result={result} onRestart={handleRestart} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />

          <form onSubmit={(e) => e.preventDefault()}>
            {currentStep === 1 && (
              <Step1 register={register} value={watch('incidentType')} />
            )}
            {currentStep === 2 && (
              <Step2 register={register} value={watch('injurySeverity')} />
            )}
            {currentStep === 3 && <Step3 register={register} />}
            {currentStep === 4 && (
              <Step4 register={register} value={watch('timeOffWork')} />
            )}
            {currentStep === 5 && <Step5 register={register} watch={watch} />}
            {currentStep === 6 && <Step6 register={register} watch={watch} />}
            {currentStep === 7 && <Step7 register={register} errors={errors} />}

            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={currentStep === 1 ? onClose : handlePrevious}
                className="px-6 py-3 border-2 border-gray-300 text-dark font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                {currentStep === 1 ? 'Cancel' : 'Previous'}
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                {currentStep === TOTAL_STEPS ? 'Calculate' : 'Next'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
