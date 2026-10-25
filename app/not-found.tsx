import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page">
      <div className="wrap narrow">
        <p className="kicker">Purely Precious</p>
        <h1>This page is not in the collection.</h1>
        <div className="hero-actions">
          <Link className="btn" href="/">
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}
