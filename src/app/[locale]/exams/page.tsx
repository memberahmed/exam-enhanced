import { Link } from "@/i18n/navigation";
import { Locales } from "@/i18n/routing";
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations();
  const locale = useLocale() as Locales;

  return (
    <main>
      <section>
        <div className="p-6">
          {/* Header */}
          <div className="flex rtl:flex-row-reverse gap-2.5 items-center">
            {locale === "en" ? (
              <Link href={"/"}>
                {" "}
                <ChevronLeft size={45} className="block h-20 border text-custom-blue-600 border-custom-blue-600" />
              </Link>
            ) : (
              <Link href={"/"}>
                <ChevronRight size={45} className="block h-20 border text-custom-blue-600 border-custom-blue-600" />
              </Link>
            )}
            <h1
              dir={locale === "ar" ? "rtl" : "ltr"}
              className="p-4 flex-1 flex items-center h-20 gap-x-4 font-GeistMono font font-semibold text-3xl tracking-none leading-full  bg-custom-blue-600 text-white"
            >
              {t.rich("exams-and-icon", {
                span: () => <BookOpen size={45} />,
              })}
            </h1>
          </div>
        </div>
      </section>
    </main>
  );
}
