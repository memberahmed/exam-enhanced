"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useLocale, useTranslations } from "next-intl";
import FeedbackError from "@/components/comman/feedback-error";
import HaveAccount from "@/components/comman/have-account";
import Arrow from "@/components/comman/arrow";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useEffect, useState } from "react";
import {} from "@/lib/actions/forgot-password.action";
import { Locales } from "@/i18n/routing";
import useVerifyOTP from "../_hooks/use-verify-otp";
import useResendOTP from "../_hooks/use-resend-otp";
import MoveBack from "./move-back";
import ToggleLang from "@/components/comman/toggle-lang";
import { Loader2Icon } from "lucide-react";

type VerifyOTPProps = {
  step: CurrnetForgotPasswordForm;
  setStep: SetForgotPasswordForm;
  email: string;
};
export default function VerifyOTP({ email, setStep, step }: VerifyOTPProps) {
  //  Translations
  const t = useTranslations();
  const locale = useLocale() as Locales;
  const [canResend, setCanResend] = useState(false);

  //  Hooks
  const { isPending, error, verifyOTP } = useVerifyOTP({ setStep });
  const { resendPending, resendError, resendOTP } = useResendOTP({ setCanResend });
  // Countdown state
  const [countdown, setCountdown] = useState(60); // Start at 60 seconds

  // Schema
  const FormSchema = z.object({
    resetCode: z.string().min(6, {
      message: "Your one-time password must be 6 characters.",
    }),
  });

  // Forms
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      resetCode: "",
    },
  });

  // Fucntions
  function onSubmit(data: z.infer<typeof FormSchema>) {
    verifyOTP(data);
  }

  // Resend OTP function (example placeholder)
  const handleResendOTP = async () => {
    if (canResend) {
      // Reset countdown
      setCountdown(60);
      // Mutate function
      resendOTP({ email });
      // Disable resend until countdown finishes again
      // Clear the OTP input
      form.reset();
    }
  };

  // Countdown effect
  useEffect(() => {
    if (countdown <= 0) {
      // Enable resend when countdown reaches 0
      setCanResend(true);
      return;
    }

    // Decrease every second
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <Form {...form}>
      <form
        dir={locale === "ar" ? "rtl" : "ltr"}
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-4 flex flex-col w-full max-w-[454px] justify-center space-y-4"
      >
        {/* Toggle Lacoale */}
        <ToggleLang />

        <MoveBack step={step} setStep={setStep} />
        {/* Form headers */}
        <div className="pb-6">
          {/* Form tietle */}
          <h1 className="text-custom-gray-800 font-inter font-bold text-3xl leading-full tracking-none pb-[10px]">
            {t("verify-otp")}
          </h1>
          <p className=" font-GeistMono font-normal text-base tracking-none leading-full text-custom-gray-500">
            {t("please-enter-the-6-digits")}
            <span
              dir={locale === "ar" ? "ltr" : ""}
              className="font-normal font-GeistMono text-base tracking-none leading-full text-custom-gray-800"
            >
              {email}.
            </span>{" "}
            <span
              onClick={() => setStep("sendOTP")}
              className="text-custom-blue-600 cursor-pointer font-GeistMono font-medium text-base tracking-none leading-full underline"
            >
              {t("edit")}
            </span>
          </p>
        </div>
        {/* OTP input */}
        <FormField
          control={form.control}
          name="resetCode"
          render={({ field }) => (
            <FormItem>
              {/* Email label */}
              <FormLabel htmlFor="resetCode" className="sr-only ">
                {t("verify-otp")}
              </FormLabel>
              {/* Email text input */}
              <div className="flex  flex-col justify-center items-center ">
                <FormControl>
                  <InputOTP id="resetCode" dir={locale === "ar" ? "rtl" : ""} maxLength={6} {...field}>
                    <InputOTPGroup>
                      {Array.from({ length: 6 }).map((_, i) => (
                        <InputOTPSlot className="me-4 border border-custom-gray-200  rounded-none" key={i} index={i} />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>

                <p className="font-GeistMono mt-6 font-medium text-[14px] tracking-none leading-full text-custom-gray-500">
                  {canResend ? (
                    <span onClick={handleResendOTP} className="text-custom-blue-600 cursor-pointer underline">
                      {resendPending ? t("loading") : t("resend")}
                    </span>
                  ) : (
                    t("you-can-request-another-otp") + ` ${countdown} ${t("s")}`
                  )}
                </p>
              </div>
              {/* Error message */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Feedback message */}
        <FeedbackError error={error?.message || resendError?.message} />

        {/* Form footer */}
        <div className="pt-6 gap-9 text-center">
          {/* Submit */}
          <Button
            disabled={(form.formState.isSubmitted && !form.formState.isValid) || isPending}
            className="w-full font-medium font-GeistMono text-base tracking-none leading-full h-12"
            type="submit"
          >
            {isPending
              ? t.rich("loading", {
                  span: () => <Loader2Icon />,
                })
              : t("continue")}
            <Arrow />
          </Button>
          <div className="pt-9">
            <HaveAccount />
          </div>
        </div>
      </form>
    </Form>
  );
}
