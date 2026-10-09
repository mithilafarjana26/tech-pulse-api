
import Link from "next/link";

const AllProducts = async () => {
  const res = await fetch(
    "https://better-auth-backend-kappa.vercel.app/api/products"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products = await res.json();
  console.log(products);

  return (
    <section className="min-h-screen bg-[#f6f8fc] px-3 py-5 sm:px-6 sm:py-6">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-5 flex flex-wrap items-center gap-3 sm:mb-7">
          <h1 className="flex items-center gap-2 text-lg font-bold text-slate-900 sm:text-xl">
            <span>⚡</span>
            All Products
          </h1>

          <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs text-slate-600">
            {products.length} products
          </span>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => {
            const isUp = product.trend === "up";

            const imageSrc = Array.isArray(product.image)
              ? product.image[0]
              : product.image;

            return (
              <article
                key={product._id}
                className="min-w-0 rounded-xl border border-[#dce3ef] bg-white p-3 transition-shadow hover:shadow-md sm:p-5"
              >
                {/* Image */}
                <div className="relative flex h-36 items-center justify-center overflow-hidden rounded-lg bg-[#f0f4f9] p-3 sm:h-[164px]">
                  {imageSrc && (
                    <img
                      src={imageSrc}
                      alt={product.name}
                      className="h-full w-full object-contain"
                    />
                  )}

                  {/* Price Trend */}
                  <span
                    className={`absolute right-2 top-2 rounded-md border bg-white px-1.5 py-1 text-[10px] font-semibold sm:right-2 sm:top-3 sm:px-2 sm:text-xs ${
                      isUp
                        ? "border-green-200 text-green-600"
                        : "border-red-200 text-red-600"
                    }`}
                  >
                    {isUp ? "▲" : "▼"}{" "}
                    {Math.abs(product.trendPercent ?? 0)}%
                  </span>

                  {/* Savings */}
                  {product.currentPrice < product.previousPrice && (
                    <span className="absolute left-2 top-2 rounded-md border border-green-200 bg-green-100 px-1.5 py-1 text-[10px] font-semibold text-green-700 sm:top-3 sm:px-2 sm:text-xs">
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

                {/* Product Name */}
                <h2 className="mt-3 min-h-12 break-words text-sm font-semibold leading-6 text-slate-900">
                  {product.name}
                </h2>

                {/* Price */}
                <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-lg font-bold text-slate-950 sm:text-xl">
                    ৳{product.currentPrice.toLocaleString("en-BD")}
                  </span>

                  {product.previousPrice > product.currentPrice && (
                    <span className="text-xs text-slate-400 line-through">
                      ৳{product.previousPrice.toLocaleString("en-BD")}
                    </span>
                  )}
                </div>

                {/* Footer */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3 sm:mt-5 sm:flex-nowrap sm:gap-2 sm:pt-4">
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
