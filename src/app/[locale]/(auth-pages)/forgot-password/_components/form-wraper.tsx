"use client";
import PasswordFormSkeleton from "@/components/sekeltons/form-sekelton";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useState } from "react";

const SendOTP = dynamic(() => import("./send-otp-form"), {
  loading: () => <PasswordFormSkeleton />,
});

const VerifyOTP = dynamic(() => import("./verify-otp-form"), {
  loading: () => <PasswordFormSkeleton />,
});

const ChangePassword = dynamic(() => import("./change-password-form"), {
  loading: () => <PasswordFormSkeleton />,
});

export default function FormWraper() {
  const t = useTranslations();

  const [step, setStep] = useState<CurrnetForgotPasswordForm>("sendOTP");
  const [email, setEmail] = useState("");
  switch (step) {
    case "sendOTP":
      return <SendOTP setEmail={setEmail} setStep={setStep} />;
    case "verifyOTP":
      return <VerifyOTP step={step} setStep={setStep} email={email} />;

    case "changePassword":
      return <ChangePassword email={email} step={step} setStep={setStep} />;

    default:
      return <div className="capitalize font-GeistMono text-3xl font-bold p-6">{t("something-went-wrong")}</div>;
  }
}
