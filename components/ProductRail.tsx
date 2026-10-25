import Link from "next/link";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/types";

export function ProductRail({
  title,
  products,
  href = "/collections",
}: {
  title: string;
  products: Product[];
  href?: string;
}) {
  if (products.length === 0) return null;
  return (
    <section className="block">
      <div className="wrap">
        <h2 className="block-title">{title}</h2>
        <div className="rail">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="center">
          <Link className="view-all" href={href}>
            View all
          </Link>
        </div>
      </div>
    </section>
  );
}
