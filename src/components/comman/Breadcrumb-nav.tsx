"use client";
import Link from "next/link";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { SlashIcon } from "lucide-react";

export function BreadcrumbNavLink() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);
  console.log(pathname);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link className="font-GeistMono text-custom-gray-400 text-[14px]" href="/">
              Home
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {segments.map((segment, index) => {
          const href = "/" + segments.slice(0, index + 1).join("/");
          const isLast = index === segments.length - 1;

          return (
            <div key={href} className="flex font-GeistMono items-center">
              <SlashIcon size={16} className="text-sm me-3 " />
              <BreadcrumbItem>
                <BreadcrumbLink
                  asChild
                  className={cn(
                    "capitalize transition-colors hover:text-primary",
                    isLast && "font-bold text-custom-blue-600 pointer-events-none"
                  )}
                >
                  <Link href={href}>{segment}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
