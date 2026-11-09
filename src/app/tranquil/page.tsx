import { BrandPageView, brandMetadata } from "@/components/BrandPage";
import { tranquil } from "@/data/content";

export const metadata = brandMetadata(tranquil);

export default function Page() {
  return <BrandPageView b={tranquil} />;
}
