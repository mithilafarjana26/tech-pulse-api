
import Image from "next/image";
import Link from "next/link";

const CategoryDetails = async ({ params }) => {
  const { slug } = await params;

  const res = await fetch(
    `https://better-auth-backend-kappa.vercel.app/api/products?category=${slug}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products = await res.json();

  const categoryName = products?.[0]?.category || slug;

  return (
    <div className="min-h-screen bg-[#f7f9fc] px-5 py-10">
      <div className="mx-auto max-w-6xl">

        {/* Category Header */}
        <div className="mb-10 flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-indigo-200 bg-indigo-50">
            <span className="text-2xl">🎮</span>
          </div>

          <div>
            <h1 className="text-3xl font-extrabold uppercase tracking-tight text-slate-950">
              {categoryName}
            </h1>

            <p className="mt-1 text-sm text-slate-500 sm:text-base">
              Browse best prices for {categoryName} across top stores
            </p>
          </div>
        </div>

        {/* Product Count and Status */}
        <div className="-mt-7 mb-10 flex flex-wrap items-center gap-4">
          <p className="text-xs text-slate-500">
            {products.length} products found
          </p>

          <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
            Prices updated today
          </span>
        </div>

        {/* Product Cards */}
        {products.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
            <h2 className="text-lg font-semibold text-slate-800">
              No products found
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              There are currently no products in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => {
              const isUp = product.trend === "up";

              const discount =
                product.previousPrice > product.currentPrice
                  ? Math.round(
                      ((product.previousPrice - product.currentPrice) /
                        product.previousPrice) *
                        100
                    )
                  : 0;

              return (
                <article
                  key={product._id}
                  className="rounded-xl border border-[#dce3ef] bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Product Image */}
                  <div className="relative flex h-[163px] items-center justify-center overflow-hidden rounded-lg bg-[#f0f4f9] p-3">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={220}
                      height={160}
                      className="h-full w-full object-contain"
                    />

                    {/* Discount Badge */}
                    {discount > 0 && (
                      <span className="absolute left-2.5 top-2.5 rounded-md border border-green-200 bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                        Save ৳{(
                          product.previousPrice - product.currentPrice
                        ).toLocaleString("en-BD")}
                      </span>
                    )}

                    {/* Price Trend */}
                    {product.trendPercent != null && (
                      <span
                        className={`absolute right-2.5 top-2.5 rounded-md border px-2 py-1 text-xs font-semibold ${
                          isUp
                            ? "border-green-200 bg-green-50 text-green-700"
                            : "border-red-200 bg-red-50 text-red-600"
                        }`}
                      >
                        {isUp ? "▲" : "▼"}{" "}
                        {Math.abs(product.trendPercent)}%
                      </span>
                    )}
                  </div>

                  {/* Category */}
                  <div className="mt-5">
                    <span className="rounded bg-indigo-50 px-2 py-1 text-[11px] font-medium uppercase tracking-wide text-indigo-600">
                      {product.category}
                    </span>
                  </div>

                  {/* Product Name */}
                  <h2 className="mt-3 min-h-6 text-sm font-semibold leading-6 text-slate-900">
                    {product.name}
                  </h2>

                  {/* Price */}
                  <div className="mt-2 flex flex-wrap items-baseline gap-2">
                    <span className="text-xl font-extrabold text-slate-950">
                      ৳{product.currentPrice.toLocaleString("en-BD")}
                    </span>

                    {product.previousPrice > product.currentPrice && (
                      <span className="text-xs text-slate-400 line-through">
                        ৳{product.previousPrice.toLocaleString("en-BD")}
                      </span>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="mt-5 flex items-center justify-between gap-2 border-t border-slate-100 pt-4">
                    <span className="flex items-center gap-1.5 text-xs text-slate-500">
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
        )}
      </div>
    </div>
  );
};

export default CategoryDetails;
