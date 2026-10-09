
import React from "react";
import Link from "next/link";

const PriceDrops = async () => {
  const res = await fetch(
    "https://better-auth-backend-kappa.vercel.app/api/products"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products = await res.json();

  const trendDown = products.filter(
    (td) => td.trend === "down"
  );

  return (
    <section className="bg-[#f8fafc] px-4 py-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-5 flex items-center gap-2 text-xl font-bold text-slate-900">
          🎯 Price Drops
        </h1>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trendDown.map((product) => {
            const isDiscounted =
              product.currentPrice < product.previousPrice;

            return (
              <article
                key={product._id}
                className="rounded-xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md"
              >
                {/* Product image */}
                <div className="relative flex h-40 items-center justify-center rounded-lg bg-slate-100 p-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain"
                  />

                  {/* Price drop percentage */}
                  <span className="absolute right-2 top-3 rounded-md border border-red-200 bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                    ▼ {Math.abs(product.trendPercent)}%
                  </span>

                  {/* Savings badge */}
                  {isDiscounted && (
                    <span className="absolute left-2 top-3 rounded-md border border-green-200 bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                      Save ৳
                      {(
                        product.previousPrice -
                        product.currentPrice
                      ).toLocaleString("en-BD")}
                    </span>
                  )}
                </div>

                {/* Category */}
                <div className="mt-5">
                  <span className="rounded bg-indigo-50 px-2 py-1 text-[11px] font-medium uppercase tracking-wide text-indigo-600">
                    {product.category}
                  </span>
                </div>

                {/* Product name */}
                <h2 className="mt-3 min-h-10 text-sm font-semibold leading-5 text-slate-900">
                  {product.name}
                </h2>

                {/* Prices */}
                <div className="mt-2 flex flex-wrap items-baseline gap-2">
                  <span className="text-xl font-bold text-slate-950">
                    ৳{product.currentPrice.toLocaleString("en-BD")}
                  </span>

                  {isDiscounted && (
                    <span className="text-xs text-slate-400 line-through">
                      ৳{product.previousPrice.toLocaleString("en-BD")}
                    </span>
                  )}
                </div>

                {/* Footer */}
                <div className="mt-5 flex items-center justify-between gap-2 border-t border-slate-100 pt-4">
                  <span className="text-xs text-slate-500">
                    🏬 {product.stores.length} stores
                  </span>

                  <Link
                    href={`/products/${product.slug}`}
                    className="whitespace-nowrap text-xs font-medium text-[#4935ff] hover:underline"
                  >
                    View Details →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {trendDown.length === 0 && (
          <p className="py-10 text-center text-slate-500">
            No price drops found.
          </p>
        )}
      </div>
    </section>
  );
};

export default PriceDrops;
