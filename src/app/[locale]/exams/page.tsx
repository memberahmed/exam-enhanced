import { BookOpen } from "lucide-react";
import { Suspense } from "react";
import { useTranslations } from "next-intl";
import GoBack from "@/components/custom/questions/go-back";
import ExamsContent from "./_components/exams-content";
import { Locales } from "@/i18n/routing";
import { ExamCardSkeleton } from "@/components/sekeltons/exam-skeleton";

type ParamsProps = {
  params: {
    locale: Locales;
  };
  searchParams: SearchParams;
};

export default function Page({ params: { locale }, searchParams }: ParamsProps) {
  // Translation
  const t = useTranslations();
  // const locale = useLocale() as Locales;
  return (
    <main>
      <section>
        <div dir={locale === "ar" ? "rtl" : "ltr"} className="p-6 space-y-4">
          {/* Header */}
          <div className="flex mt-4  gap-2.5 items-center">
            {/* Move back route icon */}
            <GoBack />

            {/* Title */}
            <h1 className="p-4 flex-1 flex items-center h-10 md:h-20 gap-x-4 font-inter font font-semibold text-2xl md:text-3xl tracking-none leading-full  bg-custom-blue-600 text-white">
              {t.rich("exams-and-icon", {
                span: () => (
                  <BookOpen className="text-2xl md:text-4xl lg:text-6xl w-6 h-6 md:w-10 md:h-10 lg:w-14 lg:h-14" />
                ),
              })}
            </h1>
          </div>

          {/* Exams content */}
          <Suspense
            fallback={
              <div className="space-y-4 ">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ExamCardSkeleton key={i} />
                ))}
              </div>
            }
          >
            <ExamsContent searchParams={searchParams} />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
