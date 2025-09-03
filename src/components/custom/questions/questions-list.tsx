"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useDirection } from "@/lib/utils/get-dirrction.util";
import { useLocale, useTranslations } from "next-intl";
import Timer from "./duration/exam-duration";
import ProgressAnimation from "./prgress-animated";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Locales } from "@/i18n/routing";
import useCheckQuestions from "./hooks/use-check-question";
import CheckQuestions from "./check-questions";
import { cn } from "@/lib/utils";
import { useRouter } from "@/i18n/navigation";
import FeedbackError from "@/components/comman/feedback-error";

type QuestionProps = {
  questions: Question[];
};

export const checkQuestoinsForm = z.object({
  answers: z.array(
    z.object({
      questionId: z.string(),
      correct: z.string(),
    })
  ),
  time: z.number(),
});

export default function QuestionsList({ questions }: QuestionProps) {
  // Translation
  const t = useTranslations();
  const locale = useLocale() as Locales;

  // Nvigation
  const router = useRouter();

  // Hooks
  const { sendQuestions, error, isPending } = useCheckQuestions();
  const dir = useDirection();

  // States

  // Current question index
  const [step, setStep] = useState(0);
  // Is the form of question submmitted
  const [submitted, setSubmitted] = useState(false);
  // Custom validtaion state
  const [validationError, setValidationError] = useState<string>("");

  // Restart exam after the time is up
  const [restartExam, setRestartExam] = useState(false);

  // Variables
  const currentQuestion = questions?.[step];
  const totalQuestion = questions?.length;

  // Prepare default values for form
  const defaultValues = {
    answers: questions.map((q) => ({
      questionId: q._id,
      correct: "",
    })),
    time: 10,
  };

  // Form initialization
  const form = useForm<z.infer<typeof checkQuestoinsForm>>({
    resolver: zodResolver(checkQuestoinsForm),
    defaultValues,
  });

  // Function to validate that all questions are answered
  const validateAllAnswers = (data: z.infer<typeof checkQuestoinsForm>) => {
    const unansweredQuestions: number[] = [];

    data.answers.forEach((answer, index) => {
      if (!answer.correct || answer.correct.trim() === "") {
        unansweredQuestions.push(index);
        // Add an error to the specific question in the form
        form.setError(`answers.${index}.correct`, {
          type: "required",
          message: t("you-must-select-an-answer"),
        });
      }
    });

    if (unansweredQuestions.length > 0) {
      setValidationError(
        t("remaining-questions", {
          count: unansweredQuestions.length,
        })
      );

      // Navigate to the first unanswered question
      setStep(unansweredQuestions[0]);

      return false;
    }

    setValidationError("");
    return true;
  };

  // Function to handle form submission
  function onSubmit(data: z.infer<typeof checkQuestoinsForm>) {
    // Check if all answers are completed
    if (!validateAllAnswers(data)) {
      return; // Prevent submission if there are unanswered questions
    }
    console.log("data", data);
    sendQuestions(data, {
      onSuccess: () => {
        form.reset();
        setSubmitted(true);
        localStorage.setItem("questions", JSON.stringify(questions));
      },
      onError: (error) => {
        console.error("Submit error:", error);
        setValidationError("An error occurred while submitting the answers");
      },
    });
  }

  // Function to handle when the exam time ends
  const onTimerEnd = () => {
    if (!submitted) {
      const currentFormData = form.getValues();
      // Check if all answers are completed before submitting
      if (validateAllAnswers(currentFormData)) {
        setSubmitted(true);
        onSubmit(currentFormData);
      } else {
        // If there are unanswered questions, show restart exam option
        setRestartExam(true);
        setValidationError(t("time-is-over"));
      }
    }
  };

  // Function to restart the exam
  const handleRestartExam = () => {
    // Reset all states
    setStep(0);
    setSubmitted(false);
    setValidationError("");
    setRestartExam(false);

    // Reset the form and default values
    form.reset(defaultValues);
    // Clear all validation errors
    form.clearErrors();
  };

  // Function to cancel the exam
  const handleCancelExam = () => {
    router.replace("/");
  };

  // Current selected answer
  const currentAnswer = form.watch(`answers.${step}.correct`) || "";

  // No questions available
  if (!currentQuestion || !currentQuestion.answers) {
    return <div>{t("no-question-available")}</div>;
  }

  return (
    <div className="space-y-4  p-2 sm:p-4 md:p-6">
      {/* Exam title and progress */}
      <div dir={dir} className="space-y-2.5 flex flex-col">
        <div className="flex justify-between font-normal h-5 text-sm text-custom-gray-500 ">
          {/* Exam subject and title */}
          <h1>
            {questions?.[0]?.subject?.name} - {questions?.[0]?.exam?.title}
          </h1>

          {/* Current question number */}
          <h3>
            {t("question")} <span className="text-custom-blue-600 font-bold">{step + 1}</span> {t("of")} {totalQuestion}
          </h3>
        </div>

        {/* Progress bar */}
        <ProgressAnimation value={((step + 1) / totalQuestion) * 100} />
      </div>

      {/* Show validation error message if exists */}
      {validationError && !restartExam && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{validationError}</div>
      )}

      {/* Show restart exam options if time is over */}
      {restartExam && (
        <div className="bg-orange-100 border border-orange-400 text-orange-800 px-6 py-4 rounded-lg">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="font-semibold text-lg">{t("the-exam-time-is-over")} </h3>
            </div>

            <p className="text-sm">{t("time-up-message")}</p>

            <div className="flex gap-3 pt-2">
              <Button onClick={handleRestartExam} className="bg-blue-600 hover:bg-blue-700 text-white">
                {t("restart-exam")}{" "}
              </Button>

              <Button onClick={handleCancelExam} variant="outline" className="border-gray-300 hover:bg-gray-50">
                {t("cancel")}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* If form is not submitted, render the form, otherwise show CheckQuestions */}
      {!submitted && !restartExam ? (
        <>
          {/* Form */}
          <Form {...form}>
            <form
              dir={dir}
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 flex-col flex  md:min-h-[470px]"
            >
              <FormField
                control={form.control}
                name={`answers.${step}.correct`}
                render={({ field }) => (
                  <FormItem
                    className={cn("space-y-4 flex-1 w-full p-1 sm:p-6", dir === "rtl" ? "text-right" : "text-left")}
                  >
                    {/* Question text */}
                    <FormLabel
                      dir={dir}
                      className={cn(
                        "pt-6 font-semibold  md:text-2xl text-base text-custom-blue-600",
                        dir === "rtl" ? "text-right" : "text-left"
                      )}
                    >
                      {currentQuestion?.question}
                    </FormLabel>

                    {/* Answer options */}
                    <FormControl>
                      <RadioGroup
                        disabled={isPending}
                        dir={dir}
                        onValueChange={(value) => {
                          field.onChange(value);
                          // Clear validation error when selecting an answer
                          if (validationError) {
                            setValidationError("");
                          }
                          // Clear validation error for the current question
                          form.clearErrors(`answers.${step}.correct`);
                        }}
                        value={currentAnswer}
                        className="flex flex-col "
                      >
                        {currentQuestion?.answers.map((answer) => (
                          <FormItem
                            dir={dir}
                            key={answer.key}
                            className={cn(
                              "flex gap-2.5 p-4 bg-custom-gray-50 hover:bg-custom-gray-100 transition-colors duration-300 ease-in-out h-[50px] items-center",
                              form.formState.errors.answers?.[step]?.correct && "border border-red-500 bg-red-50"
                            )}
                          >
                            <FormControl>
                              {/* Radio input */}
                              <RadioGroupItem
                                value={answer.key}
                                className={cn(
                                  "text-custom-blue-600 [&_svg]:w-2.5 [&_svg]:fill-custom-blue-600",
                                  form.formState.errors.answers?.[step]?.correct
                                    ? "border-custom-red-600"
                                    : "border-custom-blue-600"
                                )}
                              />
                            </FormControl>

                            {/* Answer text */}
                            <FormLabel className="grow h-[50px] text-custom-gray-800 cursor-pointer flex items-center">
                              {answer.answer}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>

                    {/* Error message for current question */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <FeedbackError error={error.message} />}
              {/* Footer with navigation and timer */}
              <div className="flex items-center gap-1 my-auto">
                {/* Previous button */}
                <Button
                  className="h-12 hover:bg-custom-gray-300 font-medium text-sm tracking-none  w-6/12 bg-custom-gray-200 text-custom-gray-400"
                  type="button"
                  disabled={isPending}
                  onClick={() => {
                    setStep((prev) => Math.max(prev - 1, 0));
                    // Clear validation error on navigation;
                    setValidationError("");

                    // Clear validation error for the previous question
                    if (step > 0) {
                      form.clearErrors(`answers.${step - 1}.correct`);
                    }
                  }}
                >
                  {locale === "en" ? <ChevronLeft /> : <ChevronRight />}
                  {t("previous")}
                </Button>

                {/* Timer component */}
                <div>
                  <Timer
                    onTimerEnd={onTimerEnd}
                    onTimeChange={(timeInMinutes) => form.setValue("time", timeInMinutes)}
                    duration={currentQuestion?.exam?.duration}
                  />
                </div>

                {/* Next or Submit button */}
                <Button
                  disabled={isPending || form.formState.isSubmitting}
                  className="h-12 font-medium text-sm tracking-none  w-6/12"
                  type="button" // Always button, never submit directly
                  onClick={() => {
                    // If it's the last question, submit manually
                    if (step === totalQuestion - 1) {
                      form.handleSubmit(onSubmit)();
                      return;
                    }

                    // Otherwise, go to the next question
                    setStep((prev) => prev + 1);
                    setValidationError(""); // Clear validation error on navigation
                    // Clear validation error for the current question
                    form.clearErrors(`answers.${step}.correct`);
                  }}
                >
                  {step !== totalQuestion - 1 ? t("next") : isPending ? t("loading") : t("submit")}
                  {locale === "en" ? <ChevronRight /> : <ChevronLeft />}
                </Button>
              </div>
            </form>
          </Form>
        </>
      ) : !validationError && submitted ? (
        <CheckQuestions setStep={setStep} setSubmitted={setSubmitted} />
      ) : null}
    </div>
  );
}
