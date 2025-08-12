import { Brain } from "lucide-react";
import { BookOpenCheck } from "lucide-react";
import { RectangleEllipsis } from "lucide-react";

import { useTranslations } from "next-intl";
import React from "react";

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
    <div className=" lg:min-h-screen flex flex-col justify-center bg-gradient-to-b from-custom-blue-300 to-white p-14 md:p-24">
      <h1 className="font-bold text-3xl leading-full tracking-none font-inter text-custom-blue-800 mb-8 md:mb-[60px]">
        {t("empower-your-learning-jou")}
      </h1>
      <div>
        {authText.map((sec) => {
          const Icon = sec.icon;
          return (
            <div className="flex space-x-5" key={sec.id}>
              <span className="border-[1.5px] border-custom-blue-600 flex items-center justify-center w-9 h-9 rtl:ml-5 p-1 text-custom-blue-600">
                <Icon />
              </span>
              <div>
                <h2 className="text-custom-blue-600 font-semibold pb-[10px]">{t(sec.title)}</h2>
                <p className="mb-4 md:mb-9 text-custom-gray-700 leading-full tracking-none text-base font-normal font-GeistMono">
                  {t(sec.text)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
