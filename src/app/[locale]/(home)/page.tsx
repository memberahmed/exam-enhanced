import { GraduationCap } from "lucide-react";
import { Suspense } from "react";
import { useLocale, useTranslations } from "next-intl";
import LoadMore from "../../../components/custom/load-more/load-more";
import { Locales } from "@/i18n/routing";
import DiplomaCardSkeleton from "@/components/sekeltons/diploma-card-sekelton";
import GetFirstPageDiplomas from "./_components/get-diplomas";

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
            className="p-4 text-start flex items-center gap-x-4 font-inter font font-semibold text-3xl tracking-none leading-full h-20 bg-custom-blue-600 text-white"
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
          <Suspense
            fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <DiplomaCardSkeleton key={index} />
                ))}
              </div>
            }
          >
            {/* <GetFirstPageDiplomas /> */}
            <LoadMore />
          </Suspense>

          {/* Load more Component */}
        </div>
      </section>
    </main>
  );
}
