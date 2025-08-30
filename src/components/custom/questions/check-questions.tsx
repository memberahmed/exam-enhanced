"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import CircularProgressColorDemo from "./result-exam";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { FolderSearch, RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";

type CheckQuestionsProps = {
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};
export default function CheckQuestions({ setSubmitted, setStep }: CheckQuestionsProps) {
  // Translations
  const t = useTranslations();

  // Navigation
  const router = useRouter();

  // Hooks
  const queryClient = useQueryClient();

  // State

  // All questions
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    //  Get stored questions from local storage becouse bacouse the back don't send the data in a good way
    const storedQuestoins = localStorage.getItem("question");
    if (storedQuestoins) {
      setQuestions(JSON.parse(storedQuestoins));
    }
  }, []);

  // Set data for cashe
  const checkQuestionsResponse = queryClient.getQueryData<checkQuestionsReponse>(["check-questions"]);

  // Variable
  const data = checkQuestionsResponse;

  return (
    <>
      {/* Header */}
      <div>
        {/* Title */}
        <h1 className="text-custom-blue-600 text-2xl font-semibold tracking-none leading-full pt-6">{t("results")}</h1>
      </div>

      <div className="flex items-center flex-col md:flex-row md:gap-14">
        {/* Result */}
        <div className="flex items-center flex-col justify-center sapce-space-y-6">
          <CircularProgressColorDemo value={data?.total} />

          {/* Number of correct and wrong answers */}
          <div>
            <p className="flex text-sm font-GeistMono text-black tracking-none leading-full h-5 items-center gap-2.5">
              {/* Colored indicator box */}
              <span className="block h-4 w-4 bg-emerald-500"></span>

              {/* Correct questions count */}
              <span>
                {t("correct-answer", {
                  count: data?.correctQuestions.length ?? 0,
                })}
              </span>
            </p>

            <p className="flex text-sm font-GeistMono text-black tracking-none leading-full h-5 items-center gap-2.5">
              <span className="block h-4 w-4 bg-custom-red-500 "> </span>{" "}
              <span>
                {t("wrong-count", {
                  count: data?.WrongQuestions.length ?? 0,
                })}
              </span>
            </p>
          </div>
        </div>

        {/* Questions and  options */}
        <ScrollArea
          className="h-[calc(100vh-350px)] flex-1
        "
        >
          <div className="space-y-2.5">
            {data?.WrongQuestions.map((wrongQuestion) => {
              const question = questions.find((q) => q._id === wrongQuestion.QID);

              if (!question) return null;

              // Payload of check question responce
              return (
                <div
                  className="font-GeistMono space-y-2.5 p-2.5 gap-2.5"
                  key={
                    // Question head
                    question._id
                  }
                >
                  <h2 className="font-semibold text-xl tracking-none leading-full text-custom-blue-600">
                    {question.question}
                  </h2>

                  {/* Options */}
                  <RadioGroup defaultValue="comfortable">
                    {question.answers.map((answer) => (
                      <div
                        key={answer.key}
                        className={`${
                          wrongQuestion.inCorrectAnswer === answer.key
                            ? "bg-red-100"
                            : answer.key === question.correct
                            ? "bg-emerald-50"
                            : "bg-white"
                        }  flex items-center h-[50px] p-4 gap-3`}
                      >
                        <RadioGroupItem
                          className={`${
                            answer.key === wrongQuestion.inCorrectAnswer
                              ? "text-custom-red-600 border-custom-red-600 [&_svg]:fill-custom-red-600"
                              : answer.key === wrongQuestion.correctAnswer
                              ? "text-emerald-600 border-emerald-600 [&_svg]:fill-emerald-600"
                              : "text-custom-blue-600 border-custom-blue-600  [&_svg]:fill-custom-blue-600"
                          } [&_svg]:w-2.5 `}
                          value={answer.key}
                          checked={
                            answer.key === wrongQuestion.inCorrectAnswer || answer.key === wrongQuestion.correctAnswer
                          }
                          id={answer.key}
                        />

                        {/* Single option */}
                        <Label className={`flex-1   gap-2.5 font-GeistMono`} htmlFor={answer.key}>
                          {answer.answer}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-6 font-GeistMono tracking-none leading-full font-medium">
        <Button
          onClick={() => {
            // Reset step to first question in question list
            setStep(0);

            // Rest form sate in question lis
            setSubmitted(false);
          }}
          className="bg-custom-gray-200 h-12 hover:bg-custom-gray-300 gap-2.5 flex items-center text-custom-gray-800 justify-center"
        >
          <RotateCcw />
          {t("restart")}{" "}
        </Button>
        <Button
          onClick={() => router.replace("/")}
          className="flex h-12 text-white items-center gap-2.5 justify-center"
        >
          <FolderSearch />
          {t("explore")}{" "}
        </Button>
      </div>
    </>
  );
}
