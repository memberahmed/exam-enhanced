"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLocale, useTranslations } from "next-intl";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import FeedbackError from "@/components/comman/feedback-error";
import useChangePassword from "../_hooks/use-change-password";
import MoveBack from "./move-back";
import ToggleLang from "@/components/comman/toggle-lang";
import { Locales } from "@/i18n/routing";

type ChangePasswordProps = {
  step: CurrnetForgotPasswordForm;
  setStep: SetForgotPasswordForm;
  email: string;
};

export default function ChangePasswordForm({ setStep, step, email }: ChangePasswordProps) {
  // Translatoin
  const t = useTranslations();
  const locale = useLocale() as Locales;

  // Hooks
  const { isPending, error, changePassword } = useChangePassword();

  // States
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Form schema
  const FormSchema = z
    .object({
      email: z.email(),
      password: z
        .string({ error: t("password-required") })
        .min(8, { message: t("password-regex") })
        .max(30, { message: t("password-max") })
        .regex(/[a-zA-Z]/, { message: t("english-letters-only") })
        .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/, {
          message: t("password-regex"),
        }),
      newPassword: z.string({ error: t("password-required") }),
    })
    .refine((data) => data.password === data.newPassword, {
      message: t("password-confirm-not-match"),
      path: ["newPassword"], // error shows under confirmPassword field
    });

  // Form Hook
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: email,
      password: "",
      newPassword: "",
    },
  });

  // Functions
  function onSubmit(data: z.infer<typeof FormSchema>) {
    // Map form data to backend format
    const payload = {
      email: email,
      newPassword: data.newPassword,
    };

    changePassword(payload);
  }

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
        <div className="pb-6">
          <h1 className="text-custom-gray-800 font-inter font-bold text-3xl leading-full tracking-none">
            {t("create-a-new-password")}
          </h1>
          <p className="mt-2.5 font-GeistMono font-normal text-base tracking-none leading-full text-custom-gray-500">
            {t("create-a-new-strong-password")}
          </p>
        </div>

        {/* Email Input */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="sr-only">
              <FormLabel
                htmlFor="email"
                className="font-GeistMono text-custom-gray-800 font-medium text-base leading-full tracking-none"
              >
                {t("email-label")}
              </FormLabel>
              <FormControl>
                <Input
                  id="email"
                  className={form.formState.errors.email ? "border-custom-red-600 focus-visible:ring-0" : ""}
                  autoComplete="email"
                  placeholder="user@example.com"
                  {...field}
                  value={email}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Input */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                htmlFor="password"
                className="font-GeistMono text-custom-gray-800 font-medium text-base leading-full tracking-none"
              >
                {t("new-password")}
              </FormLabel>
              <FormControl>
                <div
                  className={`flex items-center border focus-within:ring-0 focus-within:ring-custom-blue-600 focus-within:border-custom-blue-600 ${
                    form.formState.errors.password ? "border-custom-red-600" : ""
                  }`}
                >
                  <Input
                    autoComplete="new-password"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="border-none focus-visible:ring-0"
                    placeholder="***********"
                    {...field}
                  />
                  {!showPassword ? (
                    <Eye
                      onClick={() => setShowPassword(!showPassword)}
                      className={`relative cursor-pointer   text-custom-gray-500  ${
                        locale === "ar" ? "left-2.5" : "right-2.5"
                      }`}
                    />
                  ) : (
                    <EyeOff
                      onClick={() => setShowPassword(!showPassword)}
                      className={`relative cursor-pointer   text-custom-gray-500  ${
                        locale === "ar" ? "left-2.5" : "right-2.5"
                      }`}
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password Input */}
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                htmlFor="newPassword"
                className="font-GeistMono text-custom-gray-800 font-medium text-base leading-full tracking-none"
              >
                {t("confirm-password-label")}
              </FormLabel>
              <FormControl>
                <div
                  className={`flex items-center border focus-within:ring-0 focus-within:ring-custom-blue-600 focus-within:border-custom-blue-600 ${
                    form.formState.errors.newPassword ? "border-custom-red-600" : ""
                  }`}
                >
                  <Input
                    autoComplete="new-password"
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    className="border-none focus-visible:ring-0"
                    placeholder="***********"
                    {...field}
                  />
                  {!showNewPassword ? (
                    <Eye
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className={`relative cursor-pointer   text-custom-gray-500  ${
                        locale === "ar" ? "left-2.5" : "right-2.5"
                      }`}
                    />
                  ) : (
                    <EyeOff
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className={`relative cursor-pointer   text-custom-gray-500  ${
                        locale === "ar" ? "left-2.5" : "right-2.5"
                      }`}
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FeedbackError error={error?.message} />

        <Button
          disabled={form.formState.isSubmitting && !form.formState.isValid}
          className="w-full font-medium font-GeistMono text-base tracking-none leading-full h-12"
          type="submit"
        >
          {isPending ? t("loading") : t("update-password")}
        </Button>
      </form>
    </Form>
  );
}
