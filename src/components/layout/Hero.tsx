interface HeroProps {
  onStartCalculator: () => void;
}

export default function Hero({ onStartCalculator }: HeroProps) {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-h1-mobile md:text-h1 font-bold text-dark mb-6">
          What's Your Personal Injury Claim Worth?
        </h1>
        <p className="text-body-mobile md:text-body text-dark-light mb-8 max-w-2xl mx-auto">
          Get an instant, free estimate of your potential compensation in just 2 minutes.
          No obligations, completely confidential.
        </p>
        <button
          onClick={onStartCalculator}
          className="bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Calculate My Claim Value
        </button>
        <p className="mt-6 text-sm text-gray-500">
          Trusted by thousands of injury victims • Free consultation available
        </p>
      </div>
    </section>
  );
}
