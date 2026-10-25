"use client";

import Link from "next/link";
import { useState } from "react";

export type Slide = {
  image: string;
  alt: string;
  kicker: string;
  title: string;
  line: string;
  href: string;
};

export function HeroCarousel({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const count = slides.length;
  const slide = slides[index] || slides[0];
  if (!slide) return null;
  const go = (step: number) => setIndex((current) => (current + step + count) % count);

  return (
    <section className="hero-block" aria-roledescription="carousel">
      <div className="hero-tabs" role="tablist">
        <Link className="pill on" href="/">
          Home
        </Link>
        <Link className="pill" href="/collections">
          The Edit
        </Link>
        <Link className="pill" href="/collections/necklaces">
          Gold
        </Link>
      </div>
      <div className="hero-stage">
        <img src={slide.image} alt={slide.alt} />
        <div className="hero-copy">
          <p>{slide.kicker}</p>
          <h1>{slide.title}</h1>
          <p className="hero-line">{slide.line}</p>
          <Link className="shop-now" href={slide.href}>
            Shop now
          </Link>
        </div>
        <button className="hero-arrow prev" type="button" aria-label="Previous slide" onClick={() => go(-1)}>
          ‹
        </button>
        <button className="hero-arrow next" type="button" aria-label="Next slide" onClick={() => go(1)}>
          ›
        </button>
        <div className="hero-dots">
          {slides.map((item, dot) => (
            <button
              key={item.title}
              type="button"
              aria-label={`Show slide ${dot + 1}`}
              aria-current={dot === index ? "true" : undefined}
              onClick={() => setIndex(dot)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
