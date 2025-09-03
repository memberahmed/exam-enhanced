"use client";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Link } from "@/i18n/navigation";
import BreadcrumbItems from "./components/braedcrumbItems";
import { useDirection } from "@/lib/utils/get-dirrction.util";

export default function Navbreadcrumb() {
  const dir = useDirection();

  return (
    <Breadcrumb dir={dir} className="h-12 p-4 gap-2.5 capitalize">
      <BreadcrumbList>
        {/* Home */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link className="hover:text-custom-gray-700" href="/">
              Home
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {/* Rendered items */}
        <BreadcrumbItems />
      </BreadcrumbList>
    </Breadcrumb>
  );
}
