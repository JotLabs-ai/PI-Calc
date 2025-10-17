import type { CompensationResult } from '../../types';

interface ResultsProps {
  result: CompensationResult;
  onRestart: () => void;
}

export default function Results({ result, onRestart }: ResultsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-h2-mobile md:text-h2 font-bold text-dark mb-3">
          Your Estimated Compensation
        </h2>
        <p className="text-base text-dark-light">
          Based on the information you provided
        </p>
      </div>

      <div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-2xl p-8 text-center shadow-xl">
        <div className="text-sm font-medium mb-2 opacity-90">Estimated Range</div>
        <div className="text-4xl md:text-5xl font-bold mb-2">
          {formatCurrency(result.estimatedMin)} - {formatCurrency(result.estimatedMax)}
        </div>
        <div className="text-sm opacity-75">
          Potential total compensation
        </div>
      </div>

      <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-dark mb-4">Breakdown</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center pb-3 border-b border-gray-200">
            <span className="text-dark-light">Medical Costs</span>
            <span className="font-semibold text-dark">{formatCurrency(result.medicalCosts)}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-gray-200">
            <span className="text-dark-light">Lost Wages</span>
            <span className="font-semibold text-dark">{formatCurrency(result.lostWages)}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-gray-200">
            <span className="text-dark-light">Pain & Suffering</span>
            <span className="font-semibold text-dark">{formatCurrency(result.painAndSuffering)}</span>
          </div>
          {result.propertyDamage > 0 && (
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-dark-light">Property Damage</span>
              <span className="font-semibold text-dark">{formatCurrency(result.propertyDamage)}</span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-dark mb-3">Next Steps</h3>
        <p className="text-dark-light mb-4">
          These estimates are based on typical settlements for similar cases. An experienced attorney can help you:
        </p>
        <ul className="space-y-2 text-dark-light mb-6">
          <li className="flex items-start">
            <span className="text-primary mr-2">✓</span>
            <span>Maximize your compensation beyond these estimates</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">✓</span>
            <span>Navigate complex legal procedures</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">✓</span>
            <span>Negotiate with insurance companies on your behalf</span>
          </li>
        </ul>
        <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl">
          Schedule Free Consultation
        </button>
      </div>

      <div className="text-center">
        <button
          onClick={onRestart}
          className="text-primary hover:text-primary-dark font-medium underline"
        >
          Start Over with New Calculation
        </button>
      </div>
    </div>
  );
}
