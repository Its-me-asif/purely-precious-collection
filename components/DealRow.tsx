import Link from "next/link";
import { inr } from "@/lib/format";
import type { Product } from "@/lib/types";

export function DealRow({ items }: { items: { product: Product; unlock?: string }[] }) {
  return (
    <section className="block deal-block">
      <div className="wrap">
        <p className="deal-kicker">Limited edit</p>
        <h2 className="deal-title">Deal of the day</h2>
        <div className="deal-grid">
          {items.map(({ product, unlock }) => (
            <Link className="deal-card" href={`/products/${product.slug}`} key={product.id}>
              <div className="deal-media">
                {product.images[0] ? <img src={product.images[0]} alt="" /> : null}
                {unlock ? (
                  <span className="lock">
                    <strong>Unlocks</strong>
                    {unlock}
                    <em>11:00am</em>
                  </span>
                ) : null}
              </div>
              {unlock ? null : (
                <div className="deal-copy">
                  <p>Deal of the day</p>
                  <span className="deal-pill">House price {inr(product.price)}</span>
                  <h3>{product.name}</h3>
                </div>
              )}
              {unlock ? (
                <div className="deal-copy muted">
                  <p>Deal of the day</p>
                  <h3>{product.name}</h3>
                </div>
              ) : null}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
