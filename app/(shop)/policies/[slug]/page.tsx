import type { Metadata } from "next";
import { notFound } from "next/navigation";

const pages: Record<string, { title: string; body: string[] }> = {
  shipping: {
    title: "Shipping and delivery",
    body: [
      "A reservation is not a shipment. We confirm the piece, the city, and the timing by phone before anything leaves the house.",
      "Delivery windows depend on the piece and the pincode. You will hear the date before we dispatch.",
    ],
  },
  returns: {
    title: "Returns",
    body: [
      "If a piece is not as described, write to the house within seven days of delivery and we will arrange a return.",
      "Bridal and resized pieces are confirmed separately, because they are finished for one order.",
    ],
  },
  privacy: {
    title: "Privacy",
    body: [
      "We keep the name, phone, email, and note you send with a reservation or a message. They are used to confirm the order and to reply.",
      "We do not sell that information. The atelier is the only place it is read.",
    ],
  },
  care: {
    title: "Care",
    body: [
      "Wipe gold vermeil and pearl with a soft cloth. Keep perfume and water off the stone settings.",
      "Store pearls flat, away from other metal. A piece that is worn often should come back to the house when the finish looks tired.",
    ],
  },
};

type Props = { params: { slug: string } };

export function generateMetadata({ params }: Props): Metadata {
  return { title: pages[params.slug]?.title || "Policy" };
}

export default function PolicyPage({ params }: Props) {
  const page = pages[params.slug];
  if (!page) notFound();
  return (
    <div className="page">
      <div className="wrap narrow">
        <p className="kicker">House notes</p>
        <h1>{page.title}</h1>
        <div className="prose">
          {page.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
