import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { readDB } from "@/lib/store";

export const metadata: Metadata = { title: "Search" };

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const term = String(searchParams.q || "").trim();
  const products = readDB().products.filter((product) => {
    if (!product.available) return false;
    if (!term) return true;
    const hay = `${product.name} ${product.metal} ${product.description}`.toLowerCase();
    return hay.includes(term.toLowerCase());
  });

  return (
    <div className="page">
      <div className="wrap">
        <p className="kicker">Search</p>
        <h1>{term ? `Results for “${term}”` : "All pieces"}</h1>
        {products.length === 0 ? (
          <p className="lead">Nothing in the house matches that search.</p>
        ) : (
          <div className="shelf" style={{ marginTop: 28 }}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
