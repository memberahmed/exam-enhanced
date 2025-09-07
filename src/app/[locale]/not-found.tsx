"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-md">
        {/* 404 Number */}
        <div className="space-y-4">
          <h1 className="text-9xl font-bold text-muted-foreground/20 select-none">404</h1>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">{t("page-not-found")}</h2>
            <p className="text-muted-foreground text-balance">{t("sorry-we-couldnt-find-page")}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link href="/">{t("go-home")}</Link>
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            {t("go-back")}
          </Button>
        </div>

        {/* Decorative Element */}
        <div className="pt-8">
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-border to-transparent mx-auto"></div>
        </div>
      </div>
    </div>
  );
}
