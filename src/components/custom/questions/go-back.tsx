"use client";
import { useRouter } from "@/i18n/navigation";
import { Locales } from "@/i18n/routing";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale } from "next-intl";

export default function GoBack() {
  const locale = useLocale() as Locales;
  const router = useRouter();
  return (
    <>
      {locale === "en" ? (
        <span
          className="cursor-pointer border h-10 md:h-20 border-custom-blue-600 justify-center w-10 flex items-center"
          onClick={() => router.back()}
        >
          {" "}
          <ChevronLeft size={45} className="w-6 text-custom-blue-600 h-6 md:w-10 md:h-10 lg:w-14 lg:h-14" />
        </span>
      ) : (
        <span
          className="cursor-pointer border h-10 md:h-20 border-custom-blue-600 justify-center w-10 flex items-center"
          onClick={() => router.back()}
        >
          <ChevronRight size={45} className=" text-2xl md:text-4xl lg:text-6xl text-custom-blue-600" />
        </span>
      )}
    </>
  );
}
