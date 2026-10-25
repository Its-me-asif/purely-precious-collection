import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { readDB } from "@/lib/store";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  const { settings } = readDB();
  return (
    <div className="page">
      <div className="wrap" style={{ display: "grid", gap: 28 }}>
        <div className="narrow">
          <p className="kicker">Contact</p>
          <h1>Write to the house.</h1>
          <div className="prose">
            <p>Ask about a piece, a size, or a viewing. If you already know what you want, the bag is the faster path.</p>
            {settings.phone ? <p>Phone {settings.phone}</p> : null}
            {settings.email ? <p>Email {settings.email}</p> : null}
            {settings.city ? <p>{settings.city}, by appointment.</p> : <p>Viewings by appointment.</p>}
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
