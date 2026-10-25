"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useCart } from "./CartProvider";
import { readWish } from "./wish";

type LinkItem = { name: string; slug: string };
type Piece = { name: string; slug: string };

const groups = [
  {
    title: "For her",
    links: [
      ["Rings", "/collections/rings"],
      ["Earrings", "/collections/earrings"],
      ["Bracelets", "/collections/bracelets"],
      ["Pendants", "/collections/necklaces"],
      ["Necklaces", "/collections/necklaces"],
      ["Bridal", "/collections/bridal"],
    ],
  },
  {
    title: "Necklaces",
    links: [
      ["Pendants", "/collections/necklaces"],
      ["Pearl layer", "/products/pearl-layer-chain"],
      ["Lune pendant", "/products/lune-pendant"],
      ["Temple haar", "/products/temple-petal-haar"],
    ],
  },
  {
    title: "Rings",
    links: [
      ["Gold rings", "/collections/rings"],
      ["Signet", "/products/signet-pearl-ring"],
      ["Twin band", "/products/twin-band"],
    ],
  },
  {
    title: "Earrings",
    links: [
      ["Studs", "/products/solitaire-studs"],
      ["Hoops", "/products/crescent-hoops"],
      ["Bridal jhumka", "/products/bridal-jhumka"],
    ],
  },
];

export function Header({
  announcement,
  catalogs,
  products,
}: {
  announcement: string;
  catalogs: LinkItem[];
  products: Piece[];
}) {
  const router = useRouter();
  const { count } = useCart();
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [pinOpen, setPinOpen] = useState(false);
  const [pin, setPin] = useState("");
  const [pinDraft, setPinDraft] = useState("");
  const [wishes, setWishes] = useState(0);

  useEffect(() => {
    setPin(localStorage.getItem("pp-pin") || "");
    const syncWish = () => setWishes(readWish().length);
    syncWish();
    window.addEventListener("pp-wish", syncWish);
    return () => window.removeEventListener("pp-wish", syncWish);
  }, []);

  const matches = query.trim()
    ? products.filter((product) => product.name.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 8)
    : [];

  function onSearch(event: FormEvent) {
    event.preventDefault();
    const term = query.trim();
    if (!term) return;
    setSearchOpen(false);
    router.push(`/search?q=${encodeURIComponent(term)}`);
  }

  function savePin(event: FormEvent) {
    event.preventDefault();
    const next = pinDraft.replace(/\D/g, "").slice(0, 6);
    if (next.length < 6) return;
    localStorage.setItem("pp-pin", next);
    setPin(next);
    setPinOpen(false);
  }

  return (
    <>
      {announcement ? <div className="topbar">{announcement}</div> : null}
      <header className="site-header">
        <a className="skip" href="#content">
          Skip to content
        </a>
        <div className="site-bar">
          <Link className="wordmark" href="/" onClick={() => setMobile(false)}>
            Purely Precious
          </Link>
          <form className="search" onSubmit={onSearch}>
            <input
              value={query}
              placeholder="Search products..."
              aria-label="Search products"
              onChange={(event) => {
                setQuery(event.target.value);
                setSearchOpen(true);
              }}
              onFocus={() => setSearchOpen(true)}
              onClick={() => setSearchOpen(true)}
            />
            <button type="submit" aria-label="Search">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
          </form>
          <div className="icon-row">
            <button className="pin" type="button" onClick={() => { setPinDraft(pin); setPinOpen(true); }}>
              <PinIcon />
              <span>{pin || "Enter Pincode"}</span>
            </button>
            <Link href="/wishlist" aria-label={`Wishlist${wishes ? `, ${wishes} saved` : ""}`}>
              <HeartIcon />
            </Link>
            <Link href="/contact" aria-label="Write to the house">
              <UserIcon />
            </Link>
            <Link className="bag-icon" href="/bag" aria-label={`Bag, ${count} items`}>
              <BagIcon />
              <em>{count}</em>
            </Link>
            <button className="menu-btn" type="button" aria-expanded={mobile} onClick={() => setMobile((value) => !value)}>
              {mobile ? "Close" : "Menu"}
            </button>
          </div>
        </div>
        <nav className="site-nav" aria-label="Primary">
          <Link href="/collections/bridal">Festive Edit</Link>
          <Link href="/bestsellers">Best Sellers</Link>
          <Link href="/collections/necklaces">Necklaces</Link>
          <button type="button" className={mega ? "on" : ""} aria-expanded={mega} onClick={() => { setMega((value) => !value); setMenu(null); }}>
            The Collection <Caret />
          </button>
          <Link href="/collections/bridal">Bridal</Link>
          <Link href="/collections">Everyday</Link>
          <button type="button" className={menu === "gift" ? "on" : ""} onClick={() => { setMenu(menu === "gift" ? null : "gift"); setMega(false); }}>
            Gifting <Caret />
          </button>
          <button type="button" className={menu === "about" ? "on" : ""} onClick={() => { setMenu(menu === "about" ? null : "about"); setMega(false); }}>
            About <Caret />
          </button>
        </nav>
        {mega ? (
          <div className="mega">
            <div>
              <h2>Shop by category</h2>
              {catalogs.map((catalog) => (
                <Link key={catalog.slug} href={`/collections/${catalog.slug}`} onClick={() => setMega(false)}>
                  {catalog.name}
                </Link>
              ))}
              <Link href="/collections" onClick={() => setMega(false)}>
                View all
              </Link>
            </div>
            <div>
              <h2>Shop by edit</h2>
              <Link href="/bestsellers" onClick={() => setMega(false)}>Best sellers</Link>
              <Link href="/collections/necklaces" onClick={() => setMega(false)}>Everyday gold</Link>
              <Link href="/products/pearl-layer-chain" onClick={() => setMega(false)}>Pearl edit</Link>
              <Link href="/collections/bridal" onClick={() => setMega(false)}>Bridal edit</Link>
              <Link href="/collections" onClick={() => setMega(false)}>View all</Link>
            </div>
            <div>
              <h2>Shop by occasion</h2>
              <Link href="/collections/bridal" onClick={() => setMega(false)}>Wedding</Link>
              <Link href="/collections/rings" onClick={() => setMega(false)}>Office</Link>
              <Link href="/collections/necklaces" onClick={() => setMega(false)}>Daily</Link>
              <Link href="/collections/earrings" onClick={() => setMega(false)}>Festive</Link>
              <Link href="/collections" onClick={() => setMega(false)}>View all</Link>
            </div>
          </div>
        ) : null}
        {menu === "gift" ? (
          <div className="mini-menu">
            <Link href="/collections" onClick={() => setMenu(null)}>Gifts for her</Link>
            <Link href="/contact" onClick={() => setMenu(null)}>Write to the house</Link>
          </div>
        ) : null}
        {menu === "about" ? (
          <div className="mini-menu">
            <Link href="/about" onClick={() => setMenu(null)}>About</Link>
            <Link href="/contact" onClick={() => setMenu(null)}>Contact</Link>
            <Link href="/policies/care" onClick={() => setMenu(null)}>Care</Link>
          </div>
        ) : null}
        {searchOpen ? (
          <div className="search-panel">
            <div className="wrap">
              {query.trim() ? (
                <>
                  <h2>Results</h2>
                  {matches.length === 0 ? <p>No pieces match that search.</p> : null}
                  {matches.map((product) => (
                    <Link key={product.slug} href={`/products/${product.slug}`} onClick={() => setSearchOpen(false)}>
                      {product.name}
                    </Link>
                  ))}
                </>
              ) : (
                <>
                  <h2>Popular searches</h2>
                  <div className="search-groups">
                    {groups.map((group) => (
                      <div key={group.title}>
                        <h3>{group.title}</h3>
                        <p>
                          {group.links.map(([label, href], index) => (
                            <span key={label}>
                              {index > 0 ? " | " : ""}
                              <Link href={href} onClick={() => setSearchOpen(false)}>
                                {label}
                              </Link>
                            </span>
                          ))}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              )}
              <button className="panel-close" type="button" onClick={() => setSearchOpen(false)}>
                Close
              </button>
            </div>
          </div>
        ) : null}
        {mobile ? (
          <div className="mobile-nav">
            <Link href="/collections/bridal" onClick={() => setMobile(false)}>Festive Edit</Link>
            <Link href="/bestsellers" onClick={() => setMobile(false)}>Best Sellers</Link>
            {catalogs.map((catalog) => (
              <Link key={catalog.slug} href={`/collections/${catalog.slug}`} onClick={() => setMobile(false)}>
                {catalog.name}
              </Link>
            ))}
            <Link href="/about" onClick={() => setMobile(false)}>About</Link>
            <Link href="/contact" onClick={() => setMobile(false)}>Contact</Link>
            <Link href="/wishlist" onClick={() => setMobile(false)}>Wishlist</Link>
          </div>
        ) : null}
      </header>
      {pinOpen ? (
        <div className="modal-back" onClick={() => setPinOpen(false)}>
          <form className="modal" onClick={(event) => event.stopPropagation()} onSubmit={savePin}>
            <h2>Enter pincode</h2>
            <p>We use it to talk through delivery once a reservation is confirmed.</p>
            <input
              inputMode="numeric"
              maxLength={6}
              value={pinDraft}
              aria-label="Pincode"
              onChange={(event) => setPinDraft(event.target.value.replace(/\D/g, "").slice(0, 6))}
            />
            <button className="btn" type="submit">
              Save
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}

function Caret() {
  return (
    <svg viewBox="0 0 12 8" aria-hidden="true">
      <path d="M1 1.5 6 6.5 11 1.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="11" r="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 20s-7-4.4-7-9.1A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7 2.9C19 15.6 12 20 12 20z" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 19.5c1.4-3 3.8-4.5 7-4.5s5.6 1.5 7 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 8h12l-1 12H7L6 8z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 8V7a3 3 0 0 1 6 0v1" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
