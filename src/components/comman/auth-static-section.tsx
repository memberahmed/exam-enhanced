import { Brain } from "lucide-react";
import { BookOpenCheck } from "lucide-react";
import { RectangleEllipsis } from "lucide-react";

import { useTranslations } from "next-intl";
import React from "react";
import ExamFolderIcon from "./folder-icon";

declare type AuthText = {
  id: number;
  title: string;
  text: string;
  icon: React.ComponentType;
};

const authText: AuthText[] = [
  {
    id: 1,
    title: "Tailored Diplomas",
    text: "auth-text-1",
    icon: Brain,
  },
  {
    id: 2,
    title: "Focused Exams",
    text: "auth-text-2",
    icon: BookOpenCheck,
  },
  {
    id: 3,
    title: "Smart Multi-Step Forms",
    text: "auth-text-3",
    icon: RectangleEllipsis,
  },
];

export default function AuthStaticSection() {
  const t = useTranslations();
  return (
    <div className="lg:min-h-screen space-y-10 flex flex-col justify-center items-center bg-gradient-to-b from-custom-blue-300 to-white">
      <div className="flex flex-col  p-6 sm:p-12 md:p-24 ">
        <ExamFolderIcon />

        <div className="h-tall:pt-[136px]  pt-10 flex-col flex items-center justify-center ">
          {" "}
          {/* Header */}
          <h2 className="font-bold pt-6 rtl:ps-2 pe-4 text-3xl leading-full tracking-none font-inter text-custom-blue-800 ">
            {t("empower-your-learning-jou")}
          </h2>
          {/* Text and icon */}
          <div className="felx flex-col space-y-9 pt-14">
            {authText.map((sec) => {
              const Icon = sec.icon;
              return (
                <div className="flex gap-2 sm:gap-3 md:gap-5" key={sec.id}>
                  {/* icon */}
                  <span className="border-[1.5px] border-custom-blue-600 flex items-center justify-center w-9 h-9 p-1 text-custom-blue-600">
                    <Icon />
                  </span>

                  {/* Titel and text */}
                  <div className="flex flex-col gap-y-1">
                    <h2 className="text-custom-blue-600 font-semibold ">{t(sec.title)}</h2>
                    <p className="text-custom-gray-700 leading-full tracking-none text-base font-normal font-GeistMono">
                      {t(sec.text)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
