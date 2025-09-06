"use client";
import { CircleX } from "lucide-react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

declare type FeedbackErrorProps = {
  error?: string;
};

export default function FeedbackError({ error }: FeedbackErrorProps) {
  const t = useTranslations();

  if (!error) return null;
  return (
    <div>
      <div className="relative flex  items-center justify-center text-custom-red-600 font-GeistMono text-base min-h-10 border border-custom-red-600 bg-custom-red-50">
        <p className="text-custom-red-600 text-[14px] p-2">{error}</p>
        <span className="absolute bg-white left-1/2 -translate-x-1/2 -translate-y-1/2 top-0">
          <CircleX />
        </span>
      </div>

      <div>
        {" "}
        {error.split(" ").includes("token") && (
          <div className="flex justify-center items-center p-4 gap-4">
            <p>
              {t.rich("wedsite-rest", {
                span: (v) => <span className="text-custom-red-500">{v}</span>,
              })}
            </p>

            <Button
              onClick={async () => {
                await signOut();
                window.location.replace("/");
              }}
            >
              {t("rest")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
