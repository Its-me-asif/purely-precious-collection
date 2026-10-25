import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advertisement",
  description: "Purely Precious Collection. Leave the box. Founder, M. Bindu Madhuri.",
};

export default function AdvertisementPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#faf5ee",
        display: "grid",
        placeItems: "center",
        padding: "24px 16px",
      }}
    >
      <img
        src="/advertisement.jpg"
        alt="Purely Precious Collection. Leave the box. Founder, M. Bindu Madhuri. purelypreciouscollection@gmail.com"
        style={{ width: "min(720px, 100%)", height: "auto" }}
      />
    </main>
  );
}
