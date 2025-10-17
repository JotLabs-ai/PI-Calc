import Header from '@/components/layout/Header';
import Hero from '@/components/layout/Hero';
import PITypeSelector from '@/components/PITypeSelector';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero
          title="What's Your Personal Injury Claim Worth?"
          subtitle="Get an instant, free estimate of your potential compensation in just minutes. Choose your injury type below to get started."
        />
        <PITypeSelector />
      </main>
      <Footer />
    </div>
  );
}
