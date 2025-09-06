"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLocale, useTranslations } from "next-intl";
import { Eye, EyeOff, Loader2Icon } from "lucide-react";
import { useState } from "react";
import FeedbackError from "@/components/comman/feedback-error";
import { Locales } from "@/i18n/routing";
import { useDirection } from "@/lib/utils/get-dirrction.util";
import useUpadatePassword from "../_hooks/use-update-password";

type InputsName = "oldPassword" | "password" | "rePassword";

export default function UpdatePasswordForm() {
  //  Translations
  const t = useTranslations();
  const locale = useLocale() as Locales;

  // Hooks
  const dir = useDirection();
  const { newPassword, error, isPending } = useUpadatePassword();

  // States

  const [showPassword, setShowPassword] = useState<{ [key in InputsName]: boolean }>({
    oldPassword: false,
    password: false,
    rePassword: false,
  });

  // Fucntion to show and hide password
  const togglePassword = (inputName: InputsName) => {
    setShowPassword((prev) => ({
      ...prev,
      [inputName]: !prev[inputName],
    }));
  };

  // Schema
  const FormSchema = z
    .object({
      oldPassword: z.string({ error: t("old-password-required") }).min(1, { error: t("old-password-required") }),
      password: z
        .string({ error: t("new-password-equired") })
        .min(1, { error: t("new-password-equired") })
        .regex(/[a-zA-Z]/, t("english-letters-only"))
        .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
          error: t("password-regex"),
        })
        .max(30, { error: t("password-max") }),
      rePassword: z.string({ error: t("password-confirm-required") }).min(1, { error: t("password-confirm-required") }),
    })
    .refine((data) => data.password === data.rePassword, {
      error: t("password-confirm-not-match"),
      path: ["rePassword"],
    });

  // Forms
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      oldPassword: "",
      password: "",
      rePassword: "",
    },
  });

  // Fucntions
  function onSubmit(data: z.infer<typeof FormSchema>) {
    newPassword(data);
  }

  return (
    <Form {...form}>
      <form
        dir={dir}
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-6 flex mt-2 flex-col w-full max-w-[724px] justify-center h-medium:space-y-3 space-y-4"
      >
        {/* Old Password input  */}
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              {/* Password label */}
              <FormLabel
                htmlFor="oldPassword"
                className=" text-custom-gray-800 font-medium text-base leading-full tracking-none"
              >
                {t("old-password")}
              </FormLabel>

              {/* Password text */}
              <FormControl>
                <div
                  className={`h-12 flex items-center border focus-within:ring-0 focus-within:ring-custom-blue-600 focus-within:border-custom-blue-600 ${
                    form.formState.errors.oldPassword ? "border-custom-red-600 " : ""
                  } `}
                >
                  <Input
                    autoComplete="current-password"
                    id="oldPassword"
                    type={showPassword.oldPassword ? "text" : "password"}
                    className="border-none focus-visible:ring-0"
                    placeholder="***********"
                    {...field}
                  />

                  {/* Button to toggle the show the confirm password */}
                  {showPassword.oldPassword ? (
                    <Eye
                      onClick={() => togglePassword("oldPassword")}
                      className={`relative cursor-pointer   text-custom-gray-500  ${
                        locale === "ar" ? "left-2.5" : "right-2.5"
                      }`}
                    />
                  ) : (
                    <EyeOff
                      onClick={() => togglePassword("oldPassword")}
                      className={`relative cursor-pointer   text-custom-gray-500  ${
                        locale === "ar" ? "left-2.5" : "right-2.5"
                      }`}
                    />
                  )}
                </div>
              </FormControl>
              {/* Error message */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* New password input  */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              {/* Password label */}
              <FormLabel
                htmlFor="password"
                className=" text-custom-gray-800 font-medium text-base leading-full tracking-none"
              >
                {t("new-pasword")}
              </FormLabel>

              {/* Password text */}
              <FormControl>
                <div
                  className={`h-12 flex items-center border focus-within:ring-0 focus-within:ring-custom-blue-600 focus-within:border-custom-blue-600 ${
                    form.formState.errors.password ? "border-custom-red-600 " : ""
                  } `}
                >
                  <Input
                    autoComplete="current-password"
                    id="password"
                    type={showPassword.password ? "text" : "password"}
                    className="border-none focus-visible:ring-0"
                    placeholder="***********"
                    {...field}
                  />

                  {/* Button to toggle the show  password */}
                  {showPassword.password ? (
                    <Eye
                      onClick={() => togglePassword("password")}
                      className={`relative cursor-pointer   text-custom-gray-500  ${
                        locale === "ar" ? "left-2.5" : "right-2.5"
                      }`}
                    />
                  ) : (
                    <EyeOff
                      onClick={() => togglePassword("password")}
                      className={`relative cursor-pointer   text-custom-gray-500  ${
                        locale === "ar" ? "left-2.5" : "right-2.5"
                      }`}
                    />
                  )}
                </div>
              </FormControl>
              {/* Error message */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* RePassword input  */}
        <FormField
          control={form.control}
          name="rePassword"
          render={({ field }) => (
            <FormItem>
              {/* Password label */}
              <FormLabel
                htmlFor="rePassword"
                className=" capitalize text-custom-gray-800 font-medium text-base leading-full tracking-none"
              >
                {t("confirm-new-password")}
              </FormLabel>
              {/* RePassword text */}
              <FormControl>
                <div
                  className={`h-12 flex items-center border focus-within:ring-0 focus-within:ring-custom-blue-600 focus-within:border-custom-blue-600 ${
                    form.formState.errors.rePassword ? "border-custom-red-600 " : ""
                  } `}
                >
                  <Input
                    autoComplete="current-password"
                    id="rePassword"
                    type={showPassword.rePassword ? "text" : "password"}
                    className="border-none focus-visible:ring-0"
                    placeholder="***********"
                    {...field}
                  />

                  {/* Icon to toggle the show the confirm password */}
                  {showPassword.rePassword ? (
                    <Eye
                      onClick={() => togglePassword("rePassword")}
                      className={`relative cursor-pointer   text-custom-gray-500  ${
                        locale === "ar" ? "left-2.5" : "right-2.5"
                      }`}
                    />
                  ) : (
                    <EyeOff
                      onClick={() => togglePassword("rePassword")}
                      className={`relative cursor-pointer   text-custom-gray-500  ${
                        locale === "ar" ? "left-2.5" : "right-2.5"
                      }`}
                    />
                  )}
                </div>
              </FormControl>
              {/* Error message */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Feedback message */}
        <FeedbackError error={error?.message} />

        {/* Submit */}
        <Button
          disabled={(form.formState.isSubmitted && !form.formState.isValid) || isPending}
          className=" w-full font-medium  text-base tracking-none leading-full h-12"
          type="submit"
        >
          {isPending
            ? t.rich("loading", {
                span: () => <Loader2Icon className="animate-spin" />,
              })
            : t("update-password")}
        </Button>
      </form>
    </Form>
  );
}
