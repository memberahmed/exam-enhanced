"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import FeedbackError from "@/components/comman/feedback-error";
import { parsePhoneNumber } from "react-phone-number-input";
import PhoneInput from "../../singup/_components/phone-input";
import useProfileData from "../_hooks/use-profile-data";
import { useDirection } from "@/lib/utils/get-dirrction.util";
import DeleteAccount from "./delete-account";
import { Loader2Icon } from "lucide-react";

type UserData = {
  userData: User;
};

export default function ProfileForm({ userData }: UserData) {
  //  Translations
  const t = useTranslations();

  // Hooks
  const dir = useDirection();
  const { isPending, error, updateProfile } = useProfileData();

  // Schema
  const FormSchema = z.object({
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

    phone: z.string({ error: t("phone-number-required") }).refine(
      (val) => {
        try {
          const phone = parsePhoneNumber(val);
          return phone?.isValid();
        } catch {
          return false;
        }
      },
      { message: t("phone-number-regex") }
    ),
  });

  // Forms
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: userData?.username,
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      email: userData?.email,
      phone: userData?.phone.startsWith("0") ? "+20" + userData?.phone.slice(1) : userData?.phone,
    },
  });

  // Fucntions
  function onSubmit(data: z.infer<typeof FormSchema>) {
    // Formt phone to a locale Egyptain phone number
    const phoneNumber = parsePhoneNumber(data.phone);
    const localNumber = phoneNumber?.country === "EG" ? "0" + phoneNumber.nationalNumber : phoneNumber?.nationalNumber;

    const payload = {
      ...data,
      phone: localNumber || "",
    };

    // Send data to back end
    updateProfile(payload);
  }

  return (
    <Form {...form}>
      <form
        dir={dir}
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-4 flex  flex-col  w-full max-w-[724px] justify-center h-medium:space-y-3 space-y-4"
      >
        {/* Firsts namd and last name  */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
          {/* FirstName input */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                {/* First name label */}
                <FormLabel
                  htmlFor="firstName"
                  className=" text-custom-gray-800 font-medium text-base leading-full tracking-none "
                >
                  {t("first-name-label")}
                </FormLabel>

                {/* First text input */}
                <FormControl>
                  <Input
                    id="firstName"
                    className={`h-[46px] rtl:me-3   ${
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
                  className=" text-custom-gray-800 font-medium text-base leading-full tracking-none "
                >
                  {t("last-name-label")}
                </FormLabel>

                {/* Last name text input */}
                <FormControl>
                  <Input
                    id="lastName"
                    className={`h-[46px]  ${
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
                className=" text-custom-gray-800 font-medium text-base leading-full tracking-none "
              >
                {t("user-name-label")}
              </FormLabel>

              {/* USer name text input */}
              <FormControl>
                <Input
                  id="username"
                  className={`h-[46px]  ${
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
                className=" text-custom-gray-800 font-medium text-base leading-full tracking-none "
              >
                {t("email-label")}
              </FormLabel>
              {/* Email text input */}
              <FormControl>
                <Input
                  id="email"
                  className={`h-[46px] ${
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
                className=" text-custom-gray-800 font-medium text-base leading-full tracking-none"
              >
                {t("phone-label")}
              </FormLabel>
              {/* Phone text input */}
              <FormControl>
                <PhoneInput
                  value={`${field.value}`}
                  id="phone"
                  onChange={(value) => {
                    if (!value) return field.onChange("");
                    const phoneNumber = parsePhoneNumber(value);
                    if (phoneNumber) {
                      field.onChange(phoneNumber.number); // ✅ يخزن E.164
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

        {/* Feedback message  from back end*/}
        <FeedbackError error={error?.message} />

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3.5 pt-4">
          {/* Delete account dialog trigger */}
          <DeleteAccount />

          {/* Submit */}
          <Button
            disabled={
              (form.formState.isSubmitted && !form.formState.isValid) ||
              !form.formState.isDirty ||
              (form.formState.isSubmitted && !form.formState.isDirty) ||
              isPending
            }
            className=" w-full font-medium text-base tracking-none capitalize leading-full h-[46px]"
            type="submit"
          >
            {isPending
              ? t.rich("loading", {
                  span: () => <Loader2Icon className="animate-spin" />,
                })
              : t("save-changes")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
