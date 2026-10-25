"use client";

import { useState } from "react";

export function Gallery({ images, name }: { images: string[]; name: string }) {
  const [index, setIndex] = useState(0);
  const current = images[index] || "";

  return (
    <div>
      <div className="pdp-stage">{current ? <img src={current} alt={name} /> : null}</div>
      {images.length > 1 ? (
        <div className="thumbs">
          {images.map((image, imageIndex) => (
            <button
              key={image}
              type="button"
              aria-label={`Show image ${imageIndex + 1} of ${name}`}
              aria-current={imageIndex === index}
              onClick={() => setIndex(imageIndex)}
            >
              <img src={image} alt="" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
