import { Locales } from "@/i18n/routing";
import { useLocale } from "next-intl";

export function useDirection() {
  const locale = useLocale() as Locales;

  return locale === "ar" ? "rtl" : "ltr";
}
