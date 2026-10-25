"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useCart } from "./CartProvider";
import { api } from "@/lib/client";
import { inr } from "@/lib/format";
import type { Product } from "@/lib/types";

export function BagView() {
  const { items, setQty, remove, clear } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [reference, setReference] = useState("");

  useEffect(() => {
    api<Product[]>("/api/products")
      .then(setProducts)
      .catch(() => setError("The collection could not be loaded."));
  }, []);

  const lines = items
    .map((item) => {
      const product = products.find((entry) => entry.id === item.productId);
      return product ? { ...item, product } : null;
    })
    .filter((line): line is { productId: string; qty: number; product: Product } => Boolean(line));

  const total = lines.reduce((sum, line) => sum + line.product.price * line.qty, 0);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    const form = new FormData(event.currentTarget);
    try {
      const order = await api<{ reference: string }>("/api/orders", {
        method: "POST",
        body: JSON.stringify({
          name: form.get("name"),
          phone: form.get("phone"),
          email: form.get("email"),
          note: form.get("note"),
          company: form.get("company"),
          items: items.map((item) => ({ productId: item.productId, qty: item.qty })),
        }),
      });
      clear();
      setReference(order.reference);
    } catch (err) {
      setError(err instanceof Error ? err.message : "The request could not be sent.");
    } finally {
      setPending(false);
    }
  }

  if (reference) {
    return (
      <div className="narrow">
        <h1>Request {reference}</h1>
        <p className="lead">The house has this reservation and will confirm it by phone or email. Nothing has been charged.</p>
        <div className="hero-actions">
          <Link className="btn" href="/collections">
            Continue looking
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bag-layout">
      <div>
        <p className="kicker">Bag</p>
        <h1>Your reservation</h1>
        {lines.length === 0 ? (
          <p className="lead">
            The bag is empty. <Link href="/collections">Browse the collection.</Link>
          </p>
        ) : (
          lines.map((line) => (
            <div className="bag-line" key={line.productId}>
              {line.product.images[0] ? <img src={line.product.images[0]} alt="" /> : <span />}
              <div>
                <h2 style={{ fontSize: 28, color: "var(--brown)" }}>{line.product.name}</h2>
                <p className="price">{inr(line.product.price)}</p>
                <div className="qty">
                  <button type="button" aria-label={`Decrease ${line.product.name}`} onClick={() => setQty(line.productId, line.qty - 1)}>
                    −
                  </button>
                  <span>{line.qty}</span>
                  <button type="button" aria-label={`Increase ${line.product.name}`} onClick={() => setQty(line.productId, line.qty + 1)}>
                    +
                  </button>
                </div>
                <button className="btn-quiet" type="button" onClick={() => remove(line.productId)}>
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {lines.length > 0 ? (
        <aside className="summary">
          <h2 style={{ fontSize: 32, color: "var(--brown)" }}>Request to reserve</h2>
          <p className="price">{inr(total)}</p>
          <p>The house confirms availability, then arranges payment with you. This is not a charge.</p>
          <form className="form" onSubmit={onSubmit}>
            <label className="hp">
              Company
              <input name="company" tabIndex={-1} autoComplete="off" />
            </label>
            <label className="field">
              <span>Name</span>
              <input name="name" required autoComplete="name" />
            </label>
            <label className="field">
              <span>Phone</span>
              <input name="phone" required autoComplete="tel" />
            </label>
            <label className="field">
              <span>Email</span>
              <input name="email" type="email" required autoComplete="email" />
            </label>
            <label className="field">
              <span>Note</span>
              <textarea name="note" placeholder="Size, date, or a question." />
            </label>
            {error ? <p className="error">{error}</p> : null}
            <button className="btn" disabled={pending} type="submit">
              {pending ? "Sending" : "Send the request"}
            </button>
          </form>
        </aside>
      ) : null}
    </div>
  );
}
