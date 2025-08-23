"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { Locales, LOCALES } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";

export default function ToggleLang() {
  const t = useTranslations();

  const locales = LOCALES;
  const locale = useLocale() as Locales;

  const languages = {
    ar: "العربية",
    en: "English",
  };
  //   Navigations
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [position, setPosition] = React.useState(locale ?? locales[0]);

  const handleLocale = (locale: "ar" | "en") => {
    router.push(`${pathname}?${searchParams.toString()}`, { locale });
  };
  return (
    <DropdownMenu dir={locale === "ar" ? "rtl" : "ltr"}>
      <DropdownMenuTrigger asChild>
        <Button
          className="w-10 bg-inherit h-10 shadow-none rounded-md focus-visible:ring-custom-blue-600"
          variant="outline"
        >
          <Globe className="text-custom-gray-600" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel>{t("select-language")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={(value) => setPosition(value as Locales)}>
          {locales.map((lang) => (
            <DropdownMenuRadioItem onClick={() => handleLocale(lang)} key={lang} value={lang}>
              {languages[lang]}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
