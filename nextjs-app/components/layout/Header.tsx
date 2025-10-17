import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Browne Law Group"
              width={120}
              height={48}
              className="h-12 w-auto"
              priority
            />
          </Link>
          <div className="hidden md:block">
            <a
              href="tel:1-800-LAW-FIRM"
              className="text-[color:var(--primary)] font-bold text-xl hover:text-[color:var(--primary-dark)] transition-colors"
            >
              1-800-LAW-FIRM
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
