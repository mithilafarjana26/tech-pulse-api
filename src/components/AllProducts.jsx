
import Image from "next/image";
import Link from "next/link";

const AllProducts = async () => {
  const res = await fetch("https://better-auth-backend-kappa.vercel.app/api/products");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products = await res.json();

  return (
    <section className="min-h-screen bg-[#f6f8fc] px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-7 flex items-center gap-3">
          <h1 className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <span>⚡</span>
            All Products
          </h1>

          <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs text-slate-600">
            {products.length} products
          </span>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => {
            const isUp = product.trend === "up";

            return (
              <article
                key={product._id}
                className="rounded-xl border border-[#dce3ef] bg-white p-5 transition-shadow hover:shadow-md"
              >
                {/* Image */}
                <div className="relative flex h-[164px] items-center justify-center overflow-hidden rounded-lg bg-[#f0f4f9] p-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain"
                  />

                  {/* Price Trend */}
                  <span
                    className={`absolute right-2 top-3 rounded-md border bg-white px-2 py-1 text-xs font-semibold ${
                      isUp
                        ? "border-green-200 text-green-600"
                        : "border-red-200 text-red-600"
                    }`}
                  >
                    {isUp ? "▲" : "▼"}{" "}
                    {Math.abs(product.trendPercent)}%
                  </span>

                  {/* Savings */}
                  {product.currentPrice < product.previousPrice && (
                    <span className="absolute left-2 top-3 rounded-md border border-green-200 bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                      Save ৳
                      {(
                        product.previousPrice - product.currentPrice
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

                {/* Product Name */}
                <h2 className="mt-3 min-h-12 text-sm font-semibold leading-6 text-slate-900">
                  {product.name}
                </h2>

                {/* Price */}
                <div className="mt-2 flex flex-wrap items-baseline gap-2">
                  <span className="text-xl font-bold text-slate-950">
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
                    🏬 {product.stores.length} stores
                  </span>
{/* {`/products/${product.slug}`} */}
                  <Link
                    href='/'
                    className="whitespace-nowrap text-xs font-medium text-[#4935ff] hover:underline"
                  >
                    View Details →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {products.length === 0 && (
          <p className="py-12 text-center text-slate-500">
            No products found.
          </p>
        )}
      </div>
    </section>
  );
};

export default AllProducts;
