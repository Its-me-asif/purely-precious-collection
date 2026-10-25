import type { Metadata } from "next";
import Link from "next/link";
import { readDB } from "@/lib/store";

export const metadata: Metadata = { title: "The house" };

export default function AboutPage() {
  const { settings } = readDB();
  return (
    <div className="page">
      <div className="wrap narrow">
        <p className="kicker">The house</p>
        <h1>Jewellery with a life outside the box.</h1>
        <div className="prose">
          <p>{settings.about}</p>
          <p>
            Purely Precious Collection is built around one line: not just jewellery, a feeling you wear. The pieces are meant to be mixed, layered, and kept on.
          </p>
          <p>
            Reservations are taken through the bag. The house confirms each one by phone or email, then arranges payment and delivery with you directly. Nothing is charged on this site.
          </p>
          <p>{settings.city ? `The studio is in ${settings.city}, and viewings are by appointment.` : "Viewings are by appointment."}</p>
        </div>
        <div className="hero-actions">
          <Link className="btn" href="/collections">
            See the collection
          </Link>
          <Link className="btn btn-ghost" href="/contact">
            Write to us
          </Link>
        </div>
      </div>
    </div>
  );
}
