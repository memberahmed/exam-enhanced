import FeedbackError from "@/components/comman/feedback-error";
import { getExamById } from "@/lib/api/exam-by-id";
import ExamCard from "../_components/exam-card";
import { getTranslations } from "next-intl/server";
import GoBack from "@/components/custom/questions/go-back";
import { BookOpen } from "lucide-react";
import { Suspense } from "react";

type GetExamParams = {
  params: {
    examId: string;
  };
};

export default async function SingleExam({ params }: GetExamParams) {
  const t = await getTranslations();
  const exam = await getExamById(params?.examId);

  if ("code" in exam) {
    return <FeedbackError error={exam?.message} />;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex mt-4  gap-2.5 items-center">
        {/* Move back route icon */}
        <GoBack />

        {/* Title */}
        <h1 className="p-4 flex-1 flex items-center h-10 md:h-20 gap-x-4 font-GeistMono font font-semibold text-2xl md:text-3xl tracking-none leading-full  bg-custom-blue-600 text-white">
          {t.rich("single-exam-and-icon", {
            span: () => (
              <span>
                <BookOpen size={45} />
              </span>
            ),
            value: exam?.exam?.title,
          })}
        </h1>
      </div>
      <Suspense fallback={<p className="h-16 flex justify-center items-center"> loading exam </p>}>
        <ExamCard exam={exam?.exam} />
      </Suspense>
    </div>
  );
}
