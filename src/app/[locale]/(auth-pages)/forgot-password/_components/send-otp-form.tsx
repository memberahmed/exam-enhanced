"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import FeedbackError from "@/components/comman/feedback-error";
import HaveAccount from "@/components/comman/have-account";
import Arrow from "@/components/comman/arrow";
import useSendOTP from "../_hooks/use-send-otp";

type SendOTPProps = {
  setStep: SetForgotPasswordForm;
  setEmail: SetEamil;
};
export default function SendOTP({ setEmail, setStep }: SendOTPProps) {
  //  Translations
  const t = useTranslations();

  //  Hooks
  const { isPending, error, sendOTP } = useSendOTP({ setStep, setEmail });
  // Schema
  const FormSchema = z.object({
    email: z.email({ error: t("email-required") }),
  });

  // Forms
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  // Fucntions
  function onSubmit(data: z.infer<typeof FormSchema>) {
    sendOTP(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col [300px] sm:w-[350px] md:w-[400px] xl:w-[454px] justify-center space-y-4"
      >
        {/* Form headers */}
        <div>
          {/* Form tietle */}
          <h1 className="text-custom-gray-800 font-inter font-bold text-3xl leading-full tracking-none pb-[10px]">
            {t("forgot-password")}
          </h1>
          <p className="pb-6 font-GeistMono font-normal text-base tracking-none leading-full text-custom-gray-500">
            {t("dont-worry-we-will-help")}
          </p>
        </div>

        {/* Email input */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              {/* Email label */}
              <FormLabel
                htmlFor="email"
                className="font-GeistMono text-custom-gray-800 font-medium text-base leading-full tracking-none "
              >
                {t("email-label")}
              </FormLabel>
              {/* Email text input */}
              <FormControl>
                <Input
                  id="email"
                  className={form.formState.errors.email ? "border-custom-red-600 focus-visible:ring-0" : ""}
                  autoComplete="email"
                  placeholder="user@example.com"
                  {...field}
                />
              </FormControl>
              {/* Error message */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Feedback message */}
        <FeedbackError error={error?.message} />

        {/* Form footer */}
        <div className="pt-6 gap-9 text-center">
          {/* Submit */}
          <Button
            disabled={(form.formState.isSubmitting && !form.formState.isValid) || isPending}
            className="w-full font-medium font-GeistMono text-base tracking-none leading-full h-12"
            type="submit"
          >
            {isPending ? t("loading") : t("continue")}
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
