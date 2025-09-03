"use client";

import { BreadcrumbItem, BreadcrumbLink, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Link } from "@/i18n/navigation";
import useBreadcrumbData from "../hooks/use-breadcrumb-nav";
import { SlashIcon } from "lucide-react";

export default function BreadcrumbItems() {
  const { error, isPending, exam, pathSegments } = useBreadcrumbData();

  if (error) {
    return (
      <div className="flex items-center text-red-600">
        <SlashIcon />
        <BreadcrumbItem>
          <BreadcrumbPage>Error: {error.message || "Failed to load breadcrumb data"}</BreadcrumbPage>
        </BreadcrumbItem>
      </div>
    );
  }

  return pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    const isLast = index === pathSegments.length - 1;

    // Check if this segment is an exam ID
    const isExamId = pathSegments[index - 1] === "exams";

    // Determine the label to display
    let label;

    if (isExamId && exam?.exam?.title) {
      // If we hav exam title
      label = exam?.exam.title.replace(/-/g, " ");
    } else if (isExamId && isPending) {
      // Pending state
      label = "Loading...";
    } else {
      // For all other segments, segment itself will appeares
      label = decodeURIComponent(segment.replace(/-/g, " "));
    }

    return (
      <div className="flex items-center capitalize" key={index}>
        {/* Seprator */}
        <SlashIcon className="mx-1" size={14} />

        {/* Loop through the segments */}
        <BreadcrumbItem>
          {/* Last itme to be the page */}
          {isLast ? (
            <BreadcrumbPage
              className={`text-custom-blue-600 ${isExamId && error ? "text-red-500" : ""}`}
              title={isExamId && error ? `Error: ${error}` : undefined}
            >
              {label}
            </BreadcrumbPage>
          ) : (
            // Other items
            <BreadcrumbLink asChild>
              <Link
                href={href}
                className={`${isExamId && error ? "text-red-500" : ""} hover:text-custom-gray-700`}
                title={isExamId && error ? `Error: ${error}` : undefined}
              >
                {label}
              </Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
      </div>
    );
  });
}
