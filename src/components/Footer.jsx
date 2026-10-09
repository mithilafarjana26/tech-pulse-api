
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-slate-900"
          >
            <span className="text-indigo-600">Price</span>Track
          </Link>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-5 text-sm text-slate-600">
            <Link href="/" className="transition hover:text-indigo-600">
              Home
            </Link>
            <Link
              href="/products"
              className="transition hover:text-indigo-600"
            >
              Products
            </Link>
            <Link
              href="/price-drops"
              className="transition hover:text-indigo-600"
            >
              Price Drops
            </Link>
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-6 border-t border-slate-100 pt-5 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} PriceTrack. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
