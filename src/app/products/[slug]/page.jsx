
const ProductDetails = async ({ params }) => {
  const { slug } = await params;

  const res = await fetch(
    `https://better-auth-backend-kappa.vercel.app/api/products/${slug}`
  );

  if (!res.ok) {
    return <div className="p-10">Product not found.</div>;
  }

  const product = await res.json();

  const discount =
    product.previousPrice > product.currentPrice
      ? (
          ((product.previousPrice - product.currentPrice) /
            product.previousPrice) *
          100
        ).toFixed(1)
      : 0;

  const specs = product.specs || {};
  const image = Array.isArray(product.image)
    ? product.image[0]
    : product.image;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <div className="mb-8 flex flex-wrap gap-2 text-sm text-blue-700">
          <a href="/">Home</a>
          <span>›</span>
          <a href={`/category/${product.category}`}>
            {product.category}
          </a>
          <span>›</span>
          <span className="text-slate-600">{product.name}</span>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Left column */}
          <div>
            <div className="flex h-80 items-center justify-center rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              {image && (
                <img
                  src={image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                />
              )}
            </div>

            {/* Store comparison */}
            <section className="mt-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 font-bold">🏬 Store Comparison</h2>

              <div className="space-y-3">
                {[...(product.stores || [])]
                  .sort((a, b) => a.price - b.price)
                  .map((store, index) => (
                    <div
                      key={store.name}
                      className={`flex items-center justify-between rounded-lg border p-4 ${
                        index === 0
                          ? "border-emerald-300 bg-emerald-50"
                          : "border-slate-200"
                      }`}
                    >
                      <div>
                        <p className="font-medium">{store.name}</p>
                        {index === 0 && (
                          <p className="text-xs font-semibold text-emerald-700">
                            ✓ Lowest Price
                          </p>
                        )}
                      </div>

                      <div className="text-right">
                        <p className="font-bold">
                          ৳{store.price.toLocaleString("en-US")}
                        </p>
                        <a
                          href={store.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-blue-700 hover:underline"
                        >
                          Visit →
                        </a>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          </div>

          {/* Right column */}
          <div>
            <span className="rounded-md bg-indigo-50 px-3 py-2 text-xs font-bold uppercase text-indigo-700">
              {product.brand} · {product.category}
            </span>

            <h1 className="mt-4 text-3xl font-bold">
              {product.name}
            </h1>

            <p className="mt-4 leading-7 text-slate-600">
              {product.description}
            </p>

            {/* Price */}
            <section className="mt-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">Current Price</p>

              <p className="text-3xl font-bold">
                ৳{product.currentPrice?.toLocaleString("en-US")}
              </p>

              {product.previousPrice > product.currentPrice && (
                <div className="mt-2 flex items-center gap-3">
                  <span className="text-sm text-slate-400 line-through">
                    ৳{product.previousPrice.toLocaleString("en-US")}
                  </span>

                  <span className="rounded-md border border-red-200 bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                    ▼ {discount}%
                  </span>
                </div>
              )}
            </section>

            {/* Specifications */}
            <section className="mt-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 font-bold">
                📋 Key Specifications
              </h2>

              {Object.keys(specs).length > 0 ? (
                <div>
                  {Object.entries(specs).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between gap-4 border-b border-slate-100 py-3 last:border-0"
                    >
                      <span className="text-sm text-slate-500">
                        {key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (s) => s.toUpperCase())}
                      </span>

                      <span className="text-right text-sm font-medium">
                        {String(value)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">
                  No specifications available.
                </p>
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
