import Link from 'next/link';

const piTypes = [
  { id: 'car-accident', label: 'Car Accident', icon: '🚗', enabled: true, href: '/car-accident-calculator' },
  { id: 'slip-fall', label: 'Slip & Fall', icon: '⚠️', enabled: false, href: '#' },
  { id: 'medical-malpractice', label: 'Medical Malpractice', icon: '🏥', enabled: false, href: '#' },
  { id: 'workplace-injury', label: 'Workplace Injury', icon: '👷', enabled: false, href: '#' },
  { id: 'dog-bite', label: 'Dog Bite', icon: '🐕', enabled: false, href: '#' },
  { id: 'other', label: 'Other Injuries', icon: '📋', enabled: false, href: '#' },
];

export default function PITypeSelector() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-[length:var(--font-size-h2-mobile)] md:text-[length:var(--font-size-h2)] font-bold text-[color:var(--dark)] mb-4">
            Choose Your Injury Type
          </h2>
          <p className="text-[length:var(--font-size-body-mobile)] md:text-[length:var(--font-size-body)] text-[color:var(--dark-light)]">
            Select the calculator that matches your situation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {piTypes.map((type) => (
            type.enabled ? (
              <Link
                key={type.id}
                href={type.href}
                className="group relative flex flex-col items-center p-8 border-2 border-[color:var(--primary)] rounded-xl hover:shadow-xl transition-all duration-300 bg-white hover:bg-gradient-to-br hover:from-[color:var(--primary)] hover:to-[color:var(--primary-dark)] hover:text-white"
              >
                <span className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">{type.icon}</span>
                <h3 className="text-xl font-bold text-center group-hover:text-white transition-colors">{type.label}</h3>
                <div className="mt-4 bg-[color:var(--primary)] group-hover:bg-white text-white group-hover:text-[color:var(--primary)] px-4 py-2 rounded-full text-sm font-semibold transition-colors">
                  Calculate Now
                </div>
              </Link>
            ) : (
              <div
                key={type.id}
                className="relative flex flex-col items-center p-8 border-2 border-gray-300 rounded-xl bg-gray-50 opacity-60 cursor-not-allowed"
              >
                <span className="text-6xl mb-4 grayscale">{type.icon}</span>
                <h3 className="text-xl font-bold text-center text-gray-600">{type.label}</h3>
                <div className="mt-4 bg-gray-400 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Coming Soon
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
}
