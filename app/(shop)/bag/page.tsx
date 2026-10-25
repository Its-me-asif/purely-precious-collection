import type { Metadata } from "next";
import { BagView } from "@/components/BagView";

export const metadata: Metadata = { title: "Bag" };

export default function BagPage() {
  return (
    <div className="page">
      <div className="wrap">
        <BagView />
      </div>
    </div>
  );
}
