import { BookOpen } from "lucide-react";
import { Suspense } from "react";
import ExamsContent from "./_components/exams-content";
import { useLocale, useTranslations } from "next-intl";
import GoBack from "@/components/custom/questions/go-back";

declare type ExamsSearchParams = {
  subject?: string;
};

declare type ExamsPageProps = {
  searchParams: ExamsSearchParams;
};
export default function Page({ searchParams }: ExamsPageProps) {
  // Translation
  const t = useTranslations();
  const locale = useLocale();

  return (
    <main>
      <section>
        <div className="p-6 space-y-4">
          {/* Header */}
          <div className="flex mt-4 rtl:flex-row-reverse gap-2.5 items-center">
            {/* Move back route icon */}
            <GoBack />

            {/* Title */}
            <h1
              dir={locale === "ar" ? "rtl" : "ltr"}
              className="p-4 flex-1 flex items-center h-10 md:h-20 gap-x-4 font-GeistMono font font-semibold text-2xl md:text-3xl tracking-none leading-full  bg-custom-blue-600 text-white"
            >
              {t.rich("exams-and-icon", {
                span: () => (
                  <BookOpen className="text-2xl md:text-4xl lg:text-6xl w-6 h-6 md:w-10 md:h-10 lg:w-14 lg:h-14" />
                ),
              })}
            </h1>
          </div>

          {/* Exams content */}
          <Suspense fallback={<p className="text-3x flex justify-center items-center h-screen">Loading....</p>}>
            <ExamsContent searchParams={searchParams} />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
