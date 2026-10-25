import { ok } from "@/lib/http";
import { readDB } from "@/lib/store";

export async function GET() {
  const products = readDB()
    .products.filter((product) => product.available)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return ok(products);
}
