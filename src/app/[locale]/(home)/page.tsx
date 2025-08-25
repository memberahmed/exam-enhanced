import { GraduationCap } from "lucide-react";
import GetFirstPageDiplomas from "./_components/get-diplomas";
import { Suspense } from "react";
import { useLocale, useTranslations } from "next-intl";
import LoadMore from "../../../components/custom/load-more/load-more";
import { Locales } from "@/i18n/routing";

export default function Home() {
  // Translation
  const t = useTranslations();
  const locale = useLocale() as Locales;

  return (
    <main>
      <section>
        <div className="p-6 flex flex-col space-y-6">
          {/* Header */}
          <h1
            dir={locale === "ar" ? "rtl" : "ltr"}
            className="p-4 text-start flex items-center gap-x-4 font-GeistMono font font-semibold text-3xl tracking-none leading-full h-20 bg-custom-blue-600 text-white"
          >
            {t.rich("diplomas-and-icon", {
              span: () => (
                <span>
                  <GraduationCap size={40} />
                </span>
              ),
            })}
          </h1>

          {/* First page */}
          <Suspense fallback={<p className="text-3x flex justify-center items-center h-screen">Loading....</p>}>
            <GetFirstPageDiplomas />
          </Suspense>

          {/* Load more */}
          <LoadMore />
        </div>
      </section>
    </main>
  );
}
