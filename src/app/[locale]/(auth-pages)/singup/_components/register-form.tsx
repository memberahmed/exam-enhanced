"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import FeedbackError from "@/components/comman/feedback-error";
import PhoneInput from "./phone-input";
import { parsePhoneNumber } from "react-phone-number-input";
import useRegister from "../_hooks/use-register";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Locales } from "@/i18n/routing";
import ToggleLang from "@/components/comman/toggle-lang";

export default function RgisterForm() {
  //  Translations
  const t = useTranslations();
  const locale = useLocale() as Locales;
  // Hooks
  const { isPending, error, register } = useRegister();

  // States
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  // Schema
  const FormSchema = z
    .object({
      username: z
        .string({ error: t("user-name-required") })
        .min(1, { error: t("user-name-required") })
        .min(2, { error: t("user-name-min") })
        .max(30, { error: t("userName-min") }),
      firstName: z
        .string({ error: t("first-name-required") })
        .min(1, { error: t("first-name-required") })
        .min(2, { error: t("first-name-min") })
        .max(30, { error: t("first-name-max") }),
      lastName: z
        .string({ error: t("last-name-required") })
        .min(1, { error: t("last-name-required") })
        .min(2, { error: t("last-name-min") })
        .max(30, { error: t("last-name-max") }),
      email: z.email({ error: t("email-required") }),
      password: z
        .string({ error: t("password-required") })
        .min(1, { error: t("password-required") })
        .regex(/[a-zA-Z]/, t("english-letters-only"))
        .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
          error: t("password-regex"),
        })
        .max(30, { error: t("password-max") }),
      rePassword: z.string({ error: t("password-confirm-required") }).min(1, { error: t("password-confirm-required") }),
      phone: z
        .string({ error: t("phone-number-required") })
        .min(1, { error: t("phone-number-required") })
        .regex(/^01[0125][0-9]{8}$/, { error: t("phone-number-regex") }),
    })
    .refine((data) => data.password === data.rePassword, {
      error: t("password-confirm-not-match"),
      path: ["rePassword"],
    });

  // Forms
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  // Fucntions
  function onSubmit(data: z.infer<typeof FormSchema>) {
    register(data);
  }

  return (
    <ScrollArea
      dir={locale === "ar" ? "rtl" : "ltr"}
      className=" px-5 flex justify-center items-center h-[calc(100vh-75px)] "
    >
      {/* Toggle Lacoale */}
      <ToggleLang />

      {/* Register form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="p-4  flex mt-2 flex-col w-full max-w-[454px] justify-center h-medium:space-y-3 space-y-4"
        >
          {/* Form tietle */}
          <h1 className=" text-custom-gray-800 font-inter font-bold md:text-2xl leading-full tracking-none">
            {t("create-account")}
          </h1>

          {/* Firsts namd and last name  */}
          <div className="flex flex-col  md:flex-row  md:space-x-3">
            {/* FirstName input */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  {/* First name label */}
                  <FormLabel
                    htmlFor="firstName"
                    className="font-GeistMono text-custom-gray-800 font-medium text-base leading-full tracking-none "
                  >
                    {t("first-name-label")}
                  </FormLabel>

                  {/* First text input */}
                  <FormControl>
                    <Input
                      id="firstName"
                      className={`h-medium:h-8 rtl:me-3  md:w-[221px] ${
                        form.formState.errors.firstName ? "border-custom-red-600 focus-visible:ring-0" : ""
                      }`}
                      autoComplete="given-name"
                      placeholder="Ahmed"
                      {...field}
                    />
                  </FormControl>

                  {/* Error message */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Last name input */}
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  {/* Last name label */}
                  <FormLabel
                    htmlFor="lastName"
                    className="font-GeistMono text-custom-gray-800 font-medium text-base leading-full tracking-none "
                  >
                    {t("last-name-label")}
                  </FormLabel>

                  {/* Last name text input */}
                  <FormControl>
                    <Input
                      id="lastName"
                      className={`h-medium:h-8 md:w-[221px] ${
                        form.formState.errors.lastName ? "border-custom-red-600 focus-visible:ring-0" : ""
                      }`}
                      autoComplete="family-name"
                      placeholder="Hassan"
                      {...field}
                    />
                  </FormControl>

                  {/* Error message */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* UserName input  */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                {/* Last name label */}
                <FormLabel
                  htmlFor="username"
                  className="font-GeistMono text-custom-gray-800 font-medium text-base leading-full tracking-none "
                >
                  {t("user-name-label")}
                </FormLabel>
                {/* Last name text input */}
                <FormControl>
                  <Input
                    id="username"
                    className={`h-medium:h-8  ${
                      form.formState.errors.username ? "border-custom-red-600 focus-visible:ring-0" : ""
                    }`}
                    autoComplete="family-name"
                    placeholder="Hamed95"
                    {...field}
                  />
                </FormControl>
                {/* Error message */}
                <FormMessage />
              </FormItem>
            )}
          />

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
                    className={`h-medium:h-8 ${
                      form.formState.errors.email ? "border-custom-red-600 focus-visible:ring-0" : ""
                    }`}
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

          {/* Phone input  */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                {/* Password label */}
                <FormLabel
                  htmlFor="phone"
                  className="font-GeistMono text-custom-gray-800 font-medium text-base leading-full tracking-none"
                >
                  {t("phone-label")}
                </FormLabel>
                {/* Phone text input */}
                <FormControl>
                  <PhoneInput
                    id="phone"
                    onChange={(value) => {
                      if (!value) return field.onChange("");
                      const phoneNumber = parsePhoneNumber(value);
                      if (phoneNumber) {
                        // In casae the back end acceptes the internatoinal number make onChane = {field.onChange}
                        const localNumber =
                          phoneNumber.country === "EG" ? "0" + phoneNumber.nationalNumber : phoneNumber.nationalNumber;

                        field.onChange(localNumber);
                      } else {
                        field.onChange("");
                      }
                    }}
                    international
                    className={`${
                      form.formState.errors.phone ? "border-custom-red-600 border focus-visible:ring-0" : ""
                    }`}
                    defaultCountry="EG"
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
                    className={`h-medium:h-8 flex items-center border focus-within:ring-0 focus-within:ring-custom-blue-600 focus-within:border-custom-blue-600 ${
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

                    {/* Button to toggle the show the confirm password */}
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

          {/* RePassword input  */}
          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                {/* Password label */}
                <FormLabel
                  htmlFor="rePassword"
                  className=" font-GeistMono text-custom-gray-800 font-medium text-base leading-full tracking-none"
                >
                  {t("confirm-password-label")}
                </FormLabel>
                {/* RePassword text */}
                <FormControl>
                  <div
                    className={`h-medium:h-8 flex items-center border focus-within:ring-0 focus-within:ring-custom-blue-600 focus-within:border-custom-blue-600 ${
                      form.formState.errors.rePassword ? "border-custom-red-600 " : ""
                    } `}
                  >
                    <Input
                      autoComplete="current-password"
                      id="rePassword"
                      type={showRePassword ? "text" : "password"}
                      className="border-none focus-visible:ring-0"
                      placeholder="***********"
                      {...field}
                    />

                    {/* Icon to toggle the show the confirm password */}
                    {!showRePassword ? (
                      <Eye
                        onClick={() => setShowRePassword(!showRePassword)}
                        className="cursor-pointer text-custom-gray-500 relative ltr:right-2 rtl:left-2"
                      />
                    ) : (
                      <EyeOff
                        onClick={() => setShowRePassword(!showRePassword)}
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
            className="h-medium:h-8 w-full font-medium font-GeistMono text-base tracking-none leading-full h-12"
            type="submit"
          >
            {isPending ? t("loading") : t("signup")}
          </Button>

          {/* Have an account link */}
          <p className="self-center font-GeistMono text-custom-gray-500 leading-full tracking-none pt-5 h-medium:pt-2">
            {t.rich("already-have-an-account", {
              link: (v) => (
                <Link className="text-custom-blue-600" href={"/login"}>
                  {v}
                </Link>
              ),
            })}
          </p>
        </form>
      </Form>
    </ScrollArea>
  );
}
