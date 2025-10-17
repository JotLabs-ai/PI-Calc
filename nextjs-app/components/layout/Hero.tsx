interface HeroProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  onCTAClick?: () => void;
  ctaHref?: string;
}

export default function Hero({ title, subtitle, ctaText, onCTAClick, ctaHref }: HeroProps) {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-[length:var(--font-size-h1-mobile)] md:text-[length:var(--font-size-h1)] font-bold text-[color:var(--dark)] mb-6">
          {title}
        </h1>
        <p className="text-[length:var(--font-size-body-mobile)] md:text-[length:var(--font-size-body)] text-[color:var(--dark-light)] mb-8 max-w-2xl mx-auto">
          {subtitle}
        </p>
        {ctaText && (
          <div>
            {ctaHref ? (
              <a
                href={ctaHref}
                className="inline-block bg-[color:var(--primary)] hover:bg-[color:var(--primary-dark)] text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {ctaText}
              </a>
            ) : (
              <button
                onClick={onCTAClick}
                className="bg-[color:var(--primary)] hover:bg-[color:var(--primary-dark)] text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {ctaText}
              </button>
            )}
          </div>
        )}
        <p className="mt-6 text-sm text-gray-500">
          Trusted by thousands of injury victims • Free consultation available
        </p>
      </div>
    </section>
  );
}
