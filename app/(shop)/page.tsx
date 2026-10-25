import Link from "next/link";
import { ChipRail } from "@/components/ChipRail";
import { DealRow } from "@/components/DealRow";
import { HeroCarousel } from "@/components/HeroCarousel";
import { HomeInfo } from "@/components/HomeInfo";
import { ProductRail } from "@/components/ProductRail";
import { catalogCover, readDB, sortedCatalogs } from "@/lib/store";

const occasions = [
  { name: "Wedding", href: "/collections/bridal", image: "/looks/haar.jpg", alt: "A gold haar with a pearl drop." },
  { name: "Office", href: "/collections/rings", image: "/looks/studs.jpg", alt: "A gold solitaire stud." },
  { name: "Daily", href: "/collections/necklaces", image: "/looks/pendant.jpg", alt: "A small gold pendant on a fine chain." },
  { name: "Festive", href: "/collections/earrings", image: "/looks/jhumka.jpg", alt: "A gold jhumka with a pearl." },
];

const edits = [
  { name: "Everyday", href: "/collections/necklaces", image: "/looks/pearls.jpg" },
  { name: "Pearl edit", href: "/products/pearl-layer-chain", image: "/looks/pearls.jpg" },
  { name: "Quiet gold", href: "/collections/rings", image: "/looks/hoops.jpg" },
  { name: "Bridal", href: "/collections/bridal", image: "/looks/haar.jpg" },
];

export default function HomePage() {
  const db = readDB();
  const catalogs = sortedCatalogs(db);
  const available = db.products.filter((product) => product.available);
  const bySlug = (slug: string) => available.find((product) => product.slug === slug);
  const dealSlugs = ["oval-link-cuff", "lune-pendant", "crescent-hoops", "solitaire-studs"];
  const deal = dealSlugs
    .map((slug, index) => {
      const product = bySlug(slug);
      if (!product) return null;
      if (index === 0) return { product };
      const date = new Date();
      date.setDate(date.getDate() + index);
      const unlock = date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
      return { product, unlock };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const bridalId = catalogs.find((catalog) => catalog.slug === "bridal")?.id || "";

  return (
    <>
      <HeroCarousel
        slides={[
          {
            image: "/looks/hero.jpg",
            alt: "Layered gold necklaces.",
            kicker: "Purely Precious Collection",
            title: "Not just jewellery.",
            line: "A feeling you wear.",
            href: "/collections",
          },
          {
            image: "/looks/haar.jpg",
            alt: "A gold bridal haar.",
            kicker: "Bridal edit",
            title: "Worn for the day.",
            line: "Then kept.",
            href: "/collections/bridal",
          },
          {
            image: "/looks/pearls.jpg",
            alt: "Layered pearls on a gold chain.",
            kicker: "The pearl edit",
            title: "Quiet layers.",
            line: "Made for every day.",
            href: "/collections/necklaces",
          },
        ]}
      />

      <ul className="trust">
        <li>18k gold vermeil</li>
        <li>Freshwater pearl</li>
        <li>One house price</li>
        <li>Gift wrap on request</li>
        <li>Reserved by phone</li>
        <li>Made to be worn</li>
      </ul>

      <section className="block">
        <div className="occasion-row">
          {occasions.map((item) => (
            <Link key={item.name} href={item.href}>
              <img src={item.image} alt={item.alt} />
              <span>
                {item.name} <i aria-hidden="true">→</i>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <div className="cat-row">
            {catalogs.map((catalog) => {
              const cover = catalogCover(db, catalog);
              return (
                <Link key={catalog.id} href={`/collections/${catalog.slug}`}>
                  <span className="cat-photo">{cover ? <img src={cover} alt="" /> : null}</span>
                  {catalog.name}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <h2 className="block-title">Offers and edits</h2>
          <div className="offer-grid">
            <Link href="/collections/bridal">
              <img src="/looks/haar.jpg" alt="A gold haar." />
              <span>
                <em>Bridal</em>
                <strong>Festive edit</strong>
              </span>
            </Link>
            <Link href="/collections">
              <img src="/looks/hero.jpg" alt="Layered gold necklaces." />
              <span>
                <em>From the house</em>
                <strong>Everyday gold</strong>
              </span>
            </Link>
          </div>
        </div>
      </section>

      <DealRow items={deal} />
      <ChipRail products={available} bridalId={bridalId} />

      <section className="block">
        <div className="wrap">
          <h2 className="block-title">House edits</h2>
          <div className="edit-row">
            {edits.map((item) => (
              <Link key={item.name} href={item.href}>
                <img src={item.image} alt="" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ProductRail title="The gold edit" products={available} href="/collections" />

      <section className="block">
        <div className="wrap">
          <h2 className="block-title">Worn in gold, pearl, and stone</h2>
          <p className="block-sub">Three ways into the collection.</p>
          <div className="metal-grid">
            <Link href="/collections/necklaces">
              <img src="/looks/pendant.jpg" alt="A gold pendant." />
              <span>
                <strong>Gold</strong>
                Explore
              </span>
            </Link>
            <Link href="/products/pearl-layer-chain">
              <img src="/looks/pearls.jpg" alt="A pearl cluster on gold." />
              <span>
                <strong>Pearl</strong>
                Explore
              </span>
            </Link>
            <Link href="/collections/bridal">
              <img src="/looks/jhumka.jpg" alt="A gold jhumka." />
              <span>
                <strong>Bridal</strong>
                Explore
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="block info-block">
        <div className="wrap narrow-copy">
          <p>
            From a fine pendant to a bridal haar, Purely Precious Collection is jewellery meant to leave the box. Gold, pearl, and stone, finished for days with meetings, meals, and weather. Reserve online. We confirm every piece by phone.
          </p>
          <HomeInfo categories={catalogs.map((catalog) => ({ name: catalog.name, slug: catalog.slug }))} />
          <h2 className="search-label">Popular searches</h2>
          <div className="search-groups">
            <div>
              <h3>For her</h3>
              <p>
                <Link href="/collections/rings">Rings</Link> | <Link href="/collections/earrings">Earrings</Link> |{" "}
                <Link href="/collections/bracelets">Bracelets</Link> | <Link href="/collections/necklaces">Necklaces</Link> |{" "}
                <Link href="/collections/bridal">Bridal</Link> | <Link href="/collections/anklets">Anklets</Link>
              </p>
            </div>
            <div>
              <h3>Pendants</h3>
              <p>
                <Link href="/products/lune-pendant">Lune pendant</Link> | <Link href="/products/pearl-layer-chain">Pearl layer</Link> |{" "}
                <Link href="/collections/necklaces">Gold pendants</Link>
              </p>
            </div>
            <div>
              <h3>Earrings</h3>
              <p>
                <Link href="/products/solitaire-studs">Studs</Link> | <Link href="/products/crescent-hoops">Hoops</Link> |{" "}
                <Link href="/products/bridal-jhumka">Jhumka</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
