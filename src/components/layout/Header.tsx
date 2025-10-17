export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="Browne Law Group"
              className="h-12 w-auto"
            />
          </div>
          <div className="hidden md:block">
            <a
              href="tel:1-800-LAW-FIRM"
              className="text-primary font-bold text-xl hover:text-primary-dark transition-colors"
            >
              1-800-LAW-FIRM
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
