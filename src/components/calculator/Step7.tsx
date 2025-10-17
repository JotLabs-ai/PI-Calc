import { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { CalculatorFormData } from '../../types';

interface Step7Props {
  register: UseFormRegister<CalculatorFormData>;
  errors: FieldErrors<CalculatorFormData>;
}

export default function Step7({ register, errors }: Step7Props) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-h2-mobile md:text-h2 font-bold text-dark mb-3">
          Get Your Results
        </h2>
        <p className="text-base text-dark-light">
          Enter your contact information to see your estimated compensation
        </p>
      </div>

      <div className="max-w-xl mx-auto space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-dark mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
              errors.email
                ? 'border-red-500 focus:border-red-500'
                : 'border-gray-300 focus:border-primary'
            }`}
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-dark mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            {...register('phone')}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
              errors.phone
                ? 'border-red-500 focus:border-red-500'
                : 'border-gray-300 focus:border-primary'
            }`}
            placeholder="(555) 123-4567"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-dark-light">
          <p className="mb-2">
            🔒 <strong>Your privacy is protected.</strong>
          </p>
          <p>
            We will only use your information to send you the calculation results and,
            if you choose, to connect you with an attorney. We never sell your data.
          </p>
        </div>
      </div>
    </div>
  );
}
