import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToBag } from "@/components/AddToBag";
import { Gallery } from "@/components/Gallery";
import { ProductCard } from "@/components/ProductCard";
import { inr } from "@/lib/format";
import { readDB } from "@/lib/store";

type Props = { params: { slug: string } };

export function generateMetadata({ params }: Props): Metadata {
  const product = readDB().products.find((item) => item.slug === params.slug);
  return { title: product?.name || "Piece" };
}

export default function ProductPage({ params }: Props) {
  const db = readDB();
  const product = db.products.find((item) => item.slug === params.slug && item.available);
  if (!product) notFound();
  const catalog = db.catalogs.find((item) => item.id === product.catalogId);
  const related = db.products
    .filter((item) => item.available && item.catalogId === product.catalogId && item.id !== product.id)
    .slice(0, 3);

  return (
    <div className="wrap">
      <article className="pdp">
        <Gallery images={product.images} name={product.name} />
        <div>
          <p className="kicker">
            {catalog ? <Link href={`/collections/${catalog.slug}`}>{catalog.name}</Link> : "Piece"}
          </p>
          <h1>{product.name}</h1>
          <p className="price">
            {inr(product.price)}
            {product.compareAt && product.compareAt > product.price ? (
              <s style={{ marginLeft: 10, color: "#8a8178", fontSize: 18 }}>{inr(product.compareAt)}</s>
            ) : null}
          </p>
          {product.metal ? <p className="metal">{product.metal}</p> : null}
          <p className="lead">{product.description}</p>
          <AddToBag productId={product.id} name={product.name} />
          {product.details ? (
            <div className="detail-block">
              <h2>Details</h2>
              <p>{product.details}</p>
            </div>
          ) : null}
        </div>
      </article>
      {related.length > 0 ? (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-head">
            <h2>Also in {catalog?.name}</h2>
          </div>
          <div className="shelf">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} catalog={catalog?.name || ""} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
