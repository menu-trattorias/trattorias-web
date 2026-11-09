import { BrandPageView, brandMetadata } from "@/components/BrandPage";
import { restaurant } from "@/data/content";

export const metadata = brandMetadata(restaurant);

export default function Page() {
  return <BrandPageView b={restaurant} />;
}
