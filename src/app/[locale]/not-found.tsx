import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function LocaleNotFound() {
  const t = useTranslations();
  return (
    <div className="flex font-inter h-screen items-center justify-center flex-col gap-4 text-center">
      <h1 className="text-3xl font-bold">404</h1>
      <p className="text-lg">{t("page-not-found")}</p>
      <Link href="/" className="px-4 py-2 ">
        <Button className="w-28 h-10 block">{t("go-home")}</Button>
      </Link>
    </div>
  );
}
