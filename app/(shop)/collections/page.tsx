import type { Metadata } from "next";
import Link from "next/link";
import { catalogCover, readDB, sortedCatalogs } from "@/lib/store";

export const metadata: Metadata = { title: "Collections" };

export default function CollectionsPage() {
  const db = readDB();
  const catalogs = sortedCatalogs(db);

  return (
    <div className="page">
      <div className="wrap">
        <p className="kicker">Collections</p>
        <h1>The catalogs</h1>
        <p className="lead">Necklaces, earrings, rings, bracelets, and the bridal edit. Each catalog is kept from the atelier.</p>
        <div className="catalog-grid" style={{ marginTop: 32 }}>
          {catalogs.map((catalog) => {
            const cover = catalogCover(db, catalog);
            const count = db.products.filter((product) => product.catalogId === catalog.id && product.available).length;
            return (
              <Link className="catalog-card" href={`/collections/${catalog.slug}`} key={catalog.id}>
                <div className="media">{cover ? <img src={cover} alt="" /> : null}</div>
                <h3>{catalog.name}</h3>
                <p>
                  {catalog.description} {count} {count === 1 ? "piece" : "pieces"}.
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
