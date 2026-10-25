"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

export function AddToBag({ productId, name }: { productId: string; name: string }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");

  return (
    <div>
      <div className="qty" aria-label="Quantity">
        <button type="button" onClick={() => setQty((value) => Math.max(1, value - 1))} aria-label="Decrease quantity">
          −
        </button>
        <span>{qty}</span>
        <button type="button" onClick={() => setQty((value) => Math.min(9, value + 1))} aria-label="Increase quantity">
          +
        </button>
      </div>
      <button
        className="btn"
        type="button"
        onClick={() => {
          add(productId, qty);
          setNote(`${name} is in your bag.`);
        }}
      >
        Add to bag
      </button>
      {note ? (
        <p className="form-status" role="status" style={{ marginTop: 12 }}>
          {note} <a href="/bag">Review the bag</a>
        </p>
      ) : null}
    </div>
  );
}
