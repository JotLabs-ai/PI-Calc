import Header from '@/components/layout/Header';
import Hero from '@/components/layout/Hero';
import Footer from '@/components/layout/Footer';
import CalculatorCar from '@/components/calculator/CalculatorCar';

export const metadata = {
  title: 'Car Accident Settlement Calculator | Browne Law Group',
  description: 'Calculate your potential car accident settlement with our comprehensive 9-category calculator. Get instant estimates based on your specific injuries and damages.',
};

export default function CarAccidentCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        <Hero
          title="Car Accident Settlement Calculator"
          subtitle="Answer questions about your injuries and damages to get an instant estimate of your potential settlement."
        />
        <CalculatorCar />
      </main>
      <Footer />
    </div>
  );
}
