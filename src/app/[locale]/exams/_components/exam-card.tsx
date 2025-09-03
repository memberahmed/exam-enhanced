"use client";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useDirection } from "@/lib/utils/get-dirrction.util";
import { Timer } from "lucide-react";
import { useTranslations } from "next-intl";

type ExamsProps = {
  exam: Exam;
};

export default function ExamCard({ exam }: ExamsProps) {
  // Translation
  const t = useTranslations();

  // Hooks
  const dir = useDirection();

  // Navigation
  const router = useRouter();
  const pathname = usePathname();

  // Functions

  // functionto get last segment from a pathname

  const getLastSegment = (path: string): string | undefined => {
    const segments = path.split("/").filter(Boolean);
    return segments.pop();
  };

  // Function to navigate the required page
  const handleClick = (id: string) => {
    const currentId = getLastSegment(pathname);

    // If user clicked from the form get single exam
    if (currentId === id) {
      router.push(`${pathname}/questions`);
    } else {
      // Clicked form exams page
      router.push(`/exams/${id}/questions`);
    }
  };

  return (
    <div
      dir={dir}
      onClick={() => handleClick(exam._id)}
      className="cursor-pointer flex justify-between items-center h-16 md:h-20 bg-custom-blue-50 md:p-4"
    >
      {/* Title no. of question */}
      <div className="space-y-1 tracking-none leading-full">
        {/* Title */}
        <h2 className="font-semibold text-custom-blue-600 text-base md:text-2xl tracking-none leading-full font-GeistMono ">
          {exam.title}
        </h2>

        {/* Questions number */}
        <h3 className="font-normal font-GeistMono text-sm tracking-none leading-full text-custom-gray-500 ">
          {t.rich("exam-numberofquestions", {
            span: () => <span>{exam.numberOfQuestions}</span>,
          })}
        </h3>
      </div>

      {/* Duration  */}
      <div className="flex gap-x-1.5 font-GeistMono">
        {/* icon */}
        <span>
          <Timer className="text-custom-gray-400" />
        </span>

        {/* Text */}
        <p className="p-1  text-sm text-custom-gray-800 ">
          <span className="font-medium tracking-none leading-full ">{t("duration")}</span>:
          <span className="tracking-none leading-full font-normal">
            {" "}
            {exam.duration} {t("minutes")}
          </span>
        </p>
      </div>
    </div>
  );
}
