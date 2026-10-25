import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PreviewGate } from "@/components/PreviewGate";
import { readDB, sortedCatalogs } from "@/lib/store";
import "../shop.css";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  const db = readDB();
  const catalogs = sortedCatalogs(db);
  return (
    <>
      <PreviewGate />
      <Header
        announcement={db.settings.announcement}
        catalogs={catalogs.map((catalog) => ({ name: catalog.name, slug: catalog.slug }))}
        products={db.products.filter((product) => product.available).map((product) => ({ name: product.name, slug: product.slug }))}
      />
      <main id="content">{children}</main>
      <Footer settings={db.settings} catalogs={catalogs} />
    </>
  );
}
