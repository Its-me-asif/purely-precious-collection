"use client";

import { FormEvent, useState } from "react";
import { api } from "@/lib/client";

export function ContactForm() {
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    const form = new FormData(event.currentTarget);
    try {
      await api("/api/messages", {
        method: "POST",
        body: JSON.stringify({
          name: form.get("name"),
          phone: form.get("phone"),
          email: form.get("email"),
          message: form.get("message"),
          company: form.get("company"),
        }),
      });
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "The note could not be sent.");
    } finally {
      setPending(false);
    }
  }

  if (done) {
    return <p className="form-status">The house has your note and will reply from there.</p>;
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <label className="hp">
        Company
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="field">
        <span>Name</span>
        <input name="name" required autoComplete="name" />
      </label>
      <label className="field">
        <span>Phone</span>
        <input name="phone" required autoComplete="tel" />
      </label>
      <label className="field">
        <span>Email</span>
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label className="field">
        <span>Note</span>
        <textarea name="message" required placeholder="The piece, the occasion, or a question." />
      </label>
      {error ? <p className="error">{error}</p> : null}
      <button className="btn" type="submit" disabled={pending}>
        {pending ? "Sending" : "Send the note"}
      </button>
    </form>
  );
}
