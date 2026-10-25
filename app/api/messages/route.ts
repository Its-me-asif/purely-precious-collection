import { randomUUID } from "crypto";
import { fail, ok } from "@/lib/http";
import { updateDB } from "@/lib/store";
import type { Message } from "@/lib/types";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Partial<Message> & { company?: string };
  if (body.company) return ok({ ok: true });
  const name = String(body.name || "").trim();
  const phone = String(body.phone || "").trim();
  const email = String(body.email || "").trim();
  const message = String(body.message || "").trim();
  if (name.length < 2 || phone.length < 6 || !email.includes("@") || message.length < 4) {
    return fail("Name, phone, email, and a short note are required.");
  }
  const note: Message = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    name,
    phone,
    email,
    message,
    read: false,
  };
  updateDB((db) => {
    db.messages.unshift(note);
  });
  return ok({ ok: true }, 201);
}
