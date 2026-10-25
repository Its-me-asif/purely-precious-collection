"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { api } from "@/lib/client";
import { readWish } from "@/components/wish";
import type { Product } from "@/lib/types";

export default function WishlistPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [ids, setIds] = useState<string[] | null>(null);

  useEffect(() => {
    const sync = () => setIds(readWish());
    sync();
    window.addEventListener("pp-wish", sync);
    api<Product[]>("/api/products")
      .then(setProducts)
      .catch(() => setProducts([]));
    return () => window.removeEventListener("pp-wish", sync);
  }, []);

  const saved = products.filter((product) => ids?.includes(product.id));

  return (
    <div className="page">
      <div className="wrap">
        <p className="kicker">Wishlist</p>
        <h1>Saved pieces</h1>
        {ids === null ? null : saved.length === 0 ? (
          <p className="lead">Save a piece with the heart, and it will wait here.</p>
        ) : (
          <div className="shelf" style={{ marginTop: 28 }}>
            {saved.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
