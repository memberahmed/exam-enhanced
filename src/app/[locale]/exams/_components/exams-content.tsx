import { getExams } from "@/lib/api/exams.api";
import ExamCard from "./exam-card";
import { getTranslations } from "next-intl/server";
import { buildSearchParams } from "@/lib/utils/search-params.util";

type ExamsContentProps = {
  searchParams: SearchParams;
};

export default async function ExamsContent({ searchParams }: ExamsContentProps) {
  // Translation
  const t = await getTranslations();

  // Functions
  const query = buildSearchParams(searchParams);

  // payload
  const exams = await getExams(query);

  // Error feed back
  if ("code" in exams) {
    throw new Error(exams.message);
  }

  return (
    <>
      <div className="flex flex-col space-y-4 ">
        {exams?.exams?.length === 0 ? (
          // No exams case
          <p className="text-custom-gray-800 font-GeistMono font-medium p-4 text-center">{t("sorry-no-exams")}</p>
        ) : (
          exams.exams.map((exam) => <ExamCard key={exam._id} exam={exam} />)
        )}
        {/* Footer */}
        {exams?.exams?.length >= 1 ? (
          <p className="font-GeistMono font-normal tracking-none leading-full text-base text-custom-gray-600 text-center py-2.5">
            {t("end-of-list")}
          </p>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
