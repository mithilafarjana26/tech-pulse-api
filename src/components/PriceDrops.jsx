
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

  const trendDown = products.filter((td) => td.trend === "down");

  return (
    <section className="bg-[#f8fafc] px-3 py-5 sm:px-4 sm:py-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900 sm:mb-5 sm:text-xl">
          🎯 Price Drops
        </h1>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {trendDown.map((product) => {
            const isDiscounted =
              product.currentPrice < product.previousPrice;

            const imageSrc = Array.isArray(product.image)
              ? product.image[0]
              : product.image;

            return (
              <article
                key={product._id}
                className="min-w-0 rounded-xl border border-slate-200 bg-white p-3 transition-shadow hover:shadow-md sm:p-5"
              >
                {/* Product image */}
                <div className="relative flex h-36 items-center justify-center overflow-hidden rounded-lg bg-slate-100 p-3 sm:h-40">
                  {imageSrc && (
                    <img
                      src={imageSrc}
                      alt={product.name}
                      className="h-full w-full object-contain"
                    />
                  )}

                  {/* Price drop percentage */}
                  <span className="absolute right-2 top-2 rounded-md border border-red-200 bg-red-50 px-1.5 py-1 text-[10px] font-semibold text-red-600 sm:px-2 sm:text-xs">
                    ▼ {Math.abs(product.trendPercent ?? 0)}%
                  </span>

                  {/* Savings badge */}
                  {isDiscounted && (
                    <span className="absolute left-2 top-2 rounded-md border border-green-200 bg-green-100 px-1.5 py-1 text-[10px] font-semibold text-green-700 sm:px-2 sm:text-xs">
                      Save ৳
                      {(
                        product.previousPrice - product.currentPrice
                      ).toLocaleString("en-BD")}
                    </span>
                  )}
                </div>

                {/* Category */}
                <div className="mt-4 sm:mt-5">
                  <span className="inline-block max-w-full break-words rounded bg-indigo-50 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-indigo-600 sm:text-[11px]">
                    {product.category}
                  </span>
                </div>

                {/* Product name */}
                <h2 className="mt-3 min-h-10 break-words text-sm font-semibold leading-5 text-slate-900">
                  {product.name}
                </h2>

                {/* Prices */}
                <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-lg font-bold text-slate-950 sm:text-xl">
                    ৳{product.currentPrice.toLocaleString("en-BD")}
                  </span>

                  {isDiscounted && (
                    <span className="text-xs text-slate-400 line-through">
                      ৳{product.previousPrice.toLocaleString("en-BD")}
                    </span>
                  )}
                </div>

                {/* Footer */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3 sm:mt-5 sm:pt-4">
                  <span className="text-xs text-slate-500">
                    🏬 {product.stores?.length || 0} stores
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
          <p className="py-10 text-center text-sm text-slate-500">
            No price drops found.
          </p>
        )}
      </div>
    </section>
  );
};

export default PriceDrops;
