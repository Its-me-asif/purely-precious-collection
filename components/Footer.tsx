import Link from "next/link";
import { SubscribeForm } from "./SubscribeForm";
import type { Catalog, Settings } from "@/lib/types";

export function Footer({ settings, catalogs }: { settings: Settings; catalogs: Catalog[] }) {
  return (
    <footer className="site-footer">
      <div className="wrap footer-top">
        <div>
          <h2>Subscribe for the next edit</h2>
          <SubscribeForm />
          <p className="house-name">Purely Precious Collection</p>
          <p>
            {settings.city ? `${settings.city}. ` : "Viewings by appointment. "}
            Reservations are confirmed by phone before a piece is set aside.
          </p>
          {settings.phone ? <p>{settings.phone}</p> : null}
          {settings.email ? <p>{settings.email}</p> : null}
        </div>
        <div>
          <h2>Policy</h2>
          <Link href="/policies/returns">Returns</Link>
          <Link href="/policies/care">Care</Link>
          <Link href="/policies/shipping">Shipping and delivery</Link>
          <Link href="/policies/privacy">Privacy</Link>
        </div>
        <div>
          <h2>Help</h2>
          <Link href="/contact">Contact</Link>
          <Link href="/bag">Your reservation</Link>
          <Link href="/policies/shipping">Shipping and delivery</Link>
          <Link href="/#faq">Questions</Link>
        </div>
        <div>
          <h2>About</h2>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/collections">Collections</Link>
        </div>
      </div>
      <div className="socials">
        <a href={settings.instagram || "/contact"} aria-label="Instagram">Ig</a>
        <Link href="/contact" aria-label="Write to the house">@</Link>
        <Link href="/collections" aria-label="Collections">Pp</Link>
        <Link href="/about" aria-label="About">i</Link>
      </div>
      <div className="band">
        <p>Viewings by appointment. Write to the house.</p>
      </div>
    </footer>
  );
}
