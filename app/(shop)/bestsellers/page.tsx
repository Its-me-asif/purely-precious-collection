import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { readDB } from "@/lib/store";

export const metadata: Metadata = { title: "Best sellers" };

export default function BestsellersPage() {
  const products = readDB().products.filter((product) => product.available && product.featured);

  return (
    <div className="page">
      <div className="wrap">
        <p className="kicker">Best sellers</p>
        <h1>Most loved in the house</h1>
        <div className="shelf" style={{ marginTop: 28 }}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
