import { useState } from 'react';
import Header from './components/layout/Header';
import Hero from './components/layout/Hero';
import Footer from './components/layout/Footer';
import Calculator from './components/calculator/Calculator';

function App() {
  const [showCalculator, setShowCalculator] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {!showCalculator ? (
          <Hero onStartCalculator={() => setShowCalculator(true)} />
        ) : (
          <Calculator onClose={() => setShowCalculator(false)} />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
