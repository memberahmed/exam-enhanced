"use client";

import { LogOut } from "lucide-react";
import useLogout from "../../hooks/use-logout";
import { useTranslations } from "next-intl";

export default function Logout() {
  // Translation
  const t = useTranslations();

  // Hooks
  const { logout } = useLogout();

  return (
    <div
      onClick={() => logout()}
      className="text-3.5 p-2 w-full cursor-pointer flex items-center focus-visible:text-custom-red-600 text-custom-red-500  tracking-none leading-full h-12 gap-x-2"
    >
      <LogOut size={18} className="text-custom-red-400" />
      {/* Logout span */}
      <span>{t("log-out")}</span>
    </div>
  );
}
