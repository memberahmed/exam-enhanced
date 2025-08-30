import FeedbackError from "@/components/comman/feedback-error";
import { getExams } from "@/lib/api/exams.api";
import ExamCard from "./exam-card";
import { getTranslations } from "next-intl/server";

type ExamsContentSearchParams = {
  subject?: string;
};

type ExamsContentProps = {
  searchParams: ExamsContentSearchParams;
};

export default async function ExamsContent({ searchParams: { subject } }: ExamsContentProps) {
  // Translation
  const t = await getTranslations();

  // Functions
  const exams = await getExams(subject);

  // Error feed back
  if ("code" in exams) {
    return <FeedbackError error={exams?.message || t("something-went-wrong-please")} />;
  }

  return (
    <>
      <div className="flex flex-col space-y-4 ">
        {exams?.exams.length === 0 ? (
          // No exams case
          <p className="text-custom-gray-800 font-GeistMono font-medium p-4 text-center">{t("sorry-no-exams")}</p>
        ) : (
          <>
            {/* Exams */}
            {exams?.exams?.map((exam) => (
              <ExamCard exam={exam} key={exam._id} />
            ))}
          </>
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
