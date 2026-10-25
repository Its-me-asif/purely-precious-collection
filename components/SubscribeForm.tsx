"use client";

import { FormEvent, useState } from "react";

export function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!email.includes("@")) return;
    const current = JSON.parse(localStorage.getItem("pp-notes") || "[]") as string[];
    localStorage.setItem("pp-notes", JSON.stringify([...current, email]));
    setDone(true);
    setEmail("");
  }

  if (done) return <p className="sub-done">You are on the list. We write when the next edit is ready.</p>;

  return (
    <form className="subscribe" onSubmit={onSubmit}>
      <label>
        <span className="hp">Email</span>
        <input
          type="email"
          required
          placeholder="Your email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <button type="submit" aria-label="Subscribe">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 6h18v12H3z" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </button>
    </form>
  );
}
