import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { readDB } from "@/lib/store";

type Props = { params: { slug: string } };

export function generateMetadata({ params }: Props): Metadata {
  const catalog = readDB().catalogs.find((item) => item.slug === params.slug);
  return { title: catalog?.name || "Collection" };
}

export default function CollectionPage({ params }: Props) {
  const db = readDB();
  const catalog = db.catalogs.find((item) => item.slug === params.slug);
  if (!catalog) notFound();
  const pieces = db.products
    .filter((product) => product.catalogId === catalog.id && product.available)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <div className="page">
      <div className="wrap">
        <p className="kicker">Collection</p>
        <h1>{catalog.name}</h1>
        <p className="lead">{catalog.description}</p>
        {pieces.length === 0 ? (
          <p className="lead">Pieces will appear here once the atelier adds them.</p>
        ) : (
          <div className="shelf" style={{ marginTop: 32 }}>
            {pieces.map((product) => (
              <ProductCard key={product.id} product={product} catalog={catalog.name} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
