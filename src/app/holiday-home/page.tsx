import { BrandPageView, brandMetadata } from "@/components/BrandPage";
import { holiday } from "@/data/content";

export const metadata = brandMetadata(holiday);

export default function Page() {
  return <BrandPageView b={holiday} />;
}

