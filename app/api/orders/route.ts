import { randomUUID } from "crypto";
import { fail, ok } from "@/lib/http";
import { updateDB } from "@/lib/store";
import type { Order, OrderItem } from "@/lib/types";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    company?: string;
    name?: string;
    phone?: string;
    email?: string;
    note?: string;
    items?: { productId?: string; qty?: number }[];
  };
  if (body.company) return ok({ ok: true });
  const name = String(body.name || "").trim();
  const phone = String(body.phone || "").trim();
  const email = String(body.email || "").trim();
  if (name.length < 2 || phone.length < 6 || !email.includes("@")) {
    return fail("Name, phone, and a valid email are required.");
  }
  const requested = Array.isArray(body.items) ? body.items : [];
  if (requested.length === 0) return fail("Your bag is empty.");

  let order: Order | null = null;
  let error = "";
  updateDB((db) => {
    const items: OrderItem[] = [];
    for (const raw of requested) {
      const product = db.products.find((item) => item.id === raw.productId && item.available);
      if (!product) {
        error = "A piece in your bag is no longer available.";
        return;
      }
      const qty = Math.min(9, Math.max(1, Math.round(Number(raw.qty) || 1)));
      items.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        qty,
        image: product.images[0] || "",
      });
    }
    order = {
      id: randomUUID(),
      reference: `PP${new Date().getFullYear().toString().slice(2)}-${randomUUID().slice(0, 4).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      name,
      phone,
      email,
      note: String(body.note || "").trim(),
      items,
      total: items.reduce((sum, item) => sum + item.price * item.qty, 0),
      status: "new",
    };
    db.orders.unshift(order);
  });
  if (error || !order) return fail(error || "The request could not be saved.");
  return ok(order, 201);
}
