"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

type Group = { title: string; body: ReactNode };

export function HomeInfo({ categories }: { categories: { name: string; slug: string }[] }) {
  const groups: Group[] = [
    {
      title: "Shop by category",
      body: (
        <p>
          {categories.map((catalog, index) => (
            <span key={catalog.slug}>
              {index > 0 ? " · " : ""}
              <Link href={`/collections/${catalog.slug}`}>{catalog.name}</Link>
            </span>
          ))}
        </p>
      ),
    },
    {
      title: "What makes the collection different",
      body: (
        <p>
          Pieces are finished to be worn on ordinary days: gold vermeil, pearl, and stone, considered for how they sit and how they layer. The figure on the piece is the figure. Reservations are confirmed by phone.
        </p>
      ),
    },
    {
      title: "Gifting, sorted",
      body: (
        <p>
          Tell us the occasion and we will set a piece aside with gift wrap. <Link href="/contact">Write to the house</Link> with a name, a phone number, and the day you need it.
        </p>
      ),
    },
    {
      title: "Frequently asked questions",
      body: (
        <div className="faq">
          <p>
            <strong>How do I reserve a piece?</strong> Add it to your bag and send the request. We confirm by phone before anything is set aside.
          </p>
          <p>
            <strong>Do you ship?</strong> Yes, once the reservation is confirmed. Timing depends on the piece and your city.
          </p>
          <p>
            <strong>Can I see a piece first?</strong> Viewings are by appointment. Write to the house with the piece and the day.
          </p>
        </div>
      ),
    },
  ];
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="accordion" id="faq">
      {groups.map((group) => {
        const shown = open === group.title;
        return (
          <div key={group.title}>
            <button type="button" aria-expanded={shown} onClick={() => setOpen(shown ? null : group.title)}>
              {group.title}
              <span>{shown ? "–" : "+"}</span>
            </button>
            {shown ? <div className="accordion-body">{group.body}</div> : null}
          </div>
        );
      })}
    </div>
  );
}
