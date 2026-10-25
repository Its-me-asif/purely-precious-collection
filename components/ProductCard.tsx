"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";
import { readWish, toggleWish } from "./wish";
import { inr } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product; catalog?: string }) {
  const { add } = useCart();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const sync = () => setSaved(readWish().includes(product.id));
    sync();
    window.addEventListener("pp-wish", sync);
    return () => window.removeEventListener("pp-wish", sync);
  }, [product.id]);

  return (
    <article className="tile">
      <div className="tile-media">
        {product.featured ? <span className="ribbon">Bestseller</span> : null}
        <button
          className={saved ? "heart on" : "heart"}
          type="button"
          aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
          onClick={() => setSaved(toggleWish(product.id).includes(product.id))}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 20s-7-4.4-7-9.1A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7 2.9C19 15.6 12 20 12 20z" />
          </svg>
        </button>
        <Link href={`/products/${product.slug}`}>
          {product.images[0] ? <img src={product.images[0]} alt="" /> : null}
        </Link>
      </div>
      {product.rating ? (
        <p className="stars">
          {product.rating.toFixed(1)} <span aria-hidden="true">★</span>
          {product.reviews ? <span className="reviews"> {product.reviews}</span> : null}
        </p>
      ) : null}
      <div className="tile-price">
        <strong>{inr(product.price)}</strong>
        {product.compareAt && product.compareAt > product.price ? <s>{inr(product.compareAt)}</s> : null}
        <button className="plus" type="button" aria-label={`Add ${product.name} to bag`} onClick={() => add(product.id)}>
          +
        </button>
      </div>
      <p className="offer">Gift wrap on request</p>
      <Link className="tile-name" href={`/products/${product.slug}`}>
        {product.name}
      </Link>
    </article>
  );
}
