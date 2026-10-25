"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/types";

const chips = [
  { id: "under", label: "Under ₹15,000" },
  { id: "her", label: "For her" },
  { id: "loved", label: "Most loved" },
  { id: "bridal", label: "Bridal" },
];

export function ChipRail({ products, bridalId }: { products: Product[]; bridalId: string }) {
  const [chip, setChip] = useState("her");
  const visible = useMemo(() => {
    if (chip === "under") return products.filter((product) => product.price < 15000);
    if (chip === "loved") return products.filter((product) => product.featured);
    if (chip === "bridal") return products.filter((product) => product.catalogId === bridalId);
    return products;
  }, [chip, products, bridalId]);

  return (
    <section className="block">
      <div className="wrap">
        <div className="chips" role="tablist">
          {chips.map((item) => (
            <button key={item.id} className={chip === item.id ? "chip on" : "chip"} type="button" onClick={() => setChip(item.id)}>
              {item.label}
            </button>
          ))}
        </div>
        <div className="rail">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
