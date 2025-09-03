import FeedbackError from "@/components/comman/feedback-error";
import GoBack from "@/components/custom/questions/go-back";
import QuestionsList from "@/components/custom/questions/questions-list";
import { Locales } from "@/i18n/routing";
import { getQuestions } from "@/lib/api/qusetion.api";
import { CircleQuestionMark } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

type GetQuestionsParams = {
  params: {
    examId: string;
  };
};

export default async function GetQuestions({ params }: GetQuestionsParams) {
  // Trnaslation
  const t = await getTranslations();
  const locale = (await getLocale()) as Locales;
  const { examId } = params;

  // Fectching data
  const payload = await getQuestions(examId);

  // Quesions
  const questions = "questions" in payload ? payload?.questions : null;

  // Error
  const feedbackMessage = "code" in payload ? payload?.message : null;

  return (
    <main>
      <section>
        <div className="p-2 sm:p-4 md:p-6">
          {/* Header */}
          <div dir={locale === "ar" ? "rtl" : "ltr"} className="flex mt-4 gap-2.5 items-center">
            {/*Move back route icon */}
            <GoBack />

            {/* Title */}
            <h1
              dir={locale === "ar" ? "rtl" : "ltr"}
              className="p-4 flex-1  flex items-center h-10 md:h-20 gap-x-4 font-GeistMono font font-semibold text-sm md:text-3xl tracking-none leading-full  bg-custom-blue-600 text-white"
            >
              <span>
                {" "}
                <CircleQuestionMark className="w-6 h-6 md:w-10 md:h-10 lg:w-14 lg:h-14 text-2xl md:text-4xl lg:text-6xl" />{" "}
              </span>
              <span>[{questions?.[0]?.exam?.title}]</span>
              {t("questions")}
            </h1>
          </div>

          {/* Content */}
          <div className="">
            {/* Error Massage */}
            {feedbackMessage ? <FeedbackError error={feedbackMessage} /> : null}

            {/* Questions */}
            {questions && <QuestionsList questions={questions} />}
          </div>
        </div>
      </section>
    </main>
  );
}
