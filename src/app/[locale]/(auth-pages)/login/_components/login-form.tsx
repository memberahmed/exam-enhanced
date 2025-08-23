"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import FeedbackError from "@/components/comman/feedback-error";
import useLogin from "../_hooks/use-login";
import HaveAccount from "@/components/comman/have-account";
import ToggleLang from "@/components/comman/toggle-lang";

export function LoginForm() {
  //  Translations
  const t = useTranslations();

  //  Hooks
  const { isPending, error, login } = useLogin();

  // States
  const [showPassword, setShowPassword] = useState(false);

  // Schema
  const FormSchema = z.object({
    email: z.email({ error: t("email-required") }),
    password: z
      .string({ error: t("password-required") })
      .min(1, { error: t("password-required") })
      .regex(/[a-zA-Z]/, t("english-letters-only"))
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
        error: t("password-regex"),
      })
      .max(30, { error: t("password-max") }),
  });

  // Forms
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Fucntions
  function onSubmit(data: z.infer<typeof FormSchema>) {
    login(data);
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="p-4 flex flex-col w-full max-w-[454px] justify-center space-y-4"
        >
          {/* Toggle Lacoale */}
          <ToggleLang />

          {/* Form tietle */}
          <h1 className="text-custom-gray-800 font-inter font-bold text-3xl leading-full tracking-none">
            {t("login")}
          </h1>
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
          {/* Password input  */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                {/* Password label */}
                <FormLabel
                  htmlFor="password"
                  className="font-GeistMono text-custom-gray-800 font-medium text-base leading-full tracking-none"
                >
                  {t("password-label")}
                </FormLabel>
                {/* Password text */}
                <FormControl>
                  <div
                    className={`flex items-center border focus-within:ring-0 focus-within:ring-custom-blue-600 focus-within:border-custom-blue-600 ${
                      form.formState.errors.password ? "border-custom-red-600 " : ""
                    } `}
                  >
                    <Input
                      autoComplete="current-password"
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className="border-none focus-visible:ring-0"
                      placeholder="***********"
                      {...field}
                    />
                    {!showPassword ? (
                      <Eye
                        onClick={() => setShowPassword(!showPassword)}
                        className="cursor-pointer text-custom-gray-500 relative ltr:right-2 rtl:left-2"
                      />
                    ) : (
                      <EyeOff
                        onClick={() => setShowPassword(!showPassword)}
                        className="cursor-pointer text-custom-gray-500 relative ltr:right-2 rtl:left-2"
                      />
                    )}
                  </div>
                </FormControl>
                {/* Error message */}
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Forgot password Lable */}
          <Link
            href={"/forgot-password"}
            className="text-custom-blue-600 font-GeistMono font-medium text-base leading-full tracking-none self-end"
          >
            {t("forgot-your-password")}
          </Link>
          {/* Feedback message */}
          <FeedbackError error={error?.message} />
          {/* Submit */}
          <Button
            disabled={(form.formState.isSubmitting && !form.formState.isValid) || isPending}
            className="w-full font-medium font-GeistMono text-base tracking-none leading-full h-12"
            type="submit"
          >
            {isPending ? t("loading") : t("login")}
          </Button>
          <HaveAccount />
        </form>
      </Form>
    </>
  );
}
