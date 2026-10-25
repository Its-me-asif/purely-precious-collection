"use client";

import { useEffect, useState } from "react";
import { Mark } from "./Mark";

const KEY = "pp-preview";

export function PreviewGate() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem(KEY) === "demo") setOpen(false);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  function enter() {
    sessionStorage.setItem(KEY, "demo");
    setOpen(false);
  }

  return (
    <div className="gate" role="dialog" aria-modal="true" aria-labelledby="gate-title">
      <div className="gate-card">
        <Mark size={72} />
        <p className="gate-kicker">A startup preview</p>
        <h1 id="gate-title">The house is still being built.</h1>
        <p className="gate-copy">
          Purely Precious Collection is early. This website is a working look at the jewellery, not the finished shop. Pages, pieces, and prices will keep changing.
        </p>
        <p className="gate-note">You are welcome to walk through the demo. Nothing here is open for sale yet.</p>
        <button className="gate-enter" type="button" onClick={enter} autoFocus>
          See the demo
        </button>
      </div>
    </div>
  );
}
