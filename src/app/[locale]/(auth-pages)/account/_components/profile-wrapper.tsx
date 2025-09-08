"use client";

import { useEffect, useState } from "react";
import AccountNav from "./account-side-nav";
import dynamic from "next/dynamic";
import PasswordFormSkeleton from "@/components/sekeltons/form-sekelton";
import { useDirection } from "@/lib/utils/get-dirrction.util";
import { useLocale, useTranslations } from "next-intl";
import type { Locales } from "@/i18n/routing";
import { Sidebar, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMobile } from "../_hooks/use-is-modile";

const ProfileInfoForm = dynamic(() => import("./pofile-info-form"), {
  loading: () => <PasswordFormSkeleton />,
});

const ChangePasswordForm = dynamic(() => import("./update-passsaword-form"), {
  loading: () => <PasswordFormSkeleton />,
});

type UserData = {
  userData: User;
};

export default function EnhancedProfileWrapper({ userData }: UserData) {
  const t = useTranslations();
  const locale = useLocale() as Locales;
  const [accountForm, setAccountForm] = useState<AccountForm>("profileInfo");
  const dir = useDirection();
  const isMobile = useMobile();
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar when switching to desktop
  useEffect(() => {
    if (!isMobile && isOpen) {
      setIsOpen(false);
    }
  }, [isMobile, isOpen]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobile, isOpen]);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <div dir={dir} className="flex gap-5 relative md:flex-row ">
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className={`fixed top-4 ${
            locale !== "ar" ? "right-4" : "left-4"
          } z-50 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border md:hidden`}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Sidebar size={24} />}
        </button>
      )}

      {/* Overlay */}
      {isMobile && (
        <div
          className={cn(
            "fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 md:hidden",
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          // Base styles
          "bg-white dark:bg-gray-900 z-40 flex flex-col",
          // Mobile styles
          "md:hidden fixed top-0 h-full w-80 max-w-[85vw] p-4",
          "transform transition-transform duration-300 ease-in-out",
          // Desktop styles
          "md:relative md:block md:w-4/12 2xl:w-3/12 md:h-auto md:p-6 md:transform-none",
          // Direction-based positioning and animation
          dir === "rtl"
            ? cn("right-0 md:right-auto", isOpen ? "translate-x-0" : "translate-x-full")
            : cn("left-0 md:left-auto", isOpen ? "translate-x-0" : "-translate-x-full")
        )}
      >
        {/* Mobile Header */}
        {isMobile && (
          <div className="flex items-center justify-between mb-6 pb-4 border-b">
            <h2 className="text-lg font-semibold">{t("account-settings")}</h2>
            <button
              onClick={closeSidebar}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
        )}

        <AccountNav setAccountForm={setAccountForm} acountForm={accountForm} />
      </div>

      {/* Main Content */}
      <div className="flex-1  p-4 ">
        <div className="max-w-4xl mx-auto">
          {(() => {
            switch (accountForm) {
              case "profileInfo":
                return <ProfileInfoForm userData={userData} />;
              case "changePassword":
                return <ChangePasswordForm />;
              default:
                return (
                  <div className="text-center py-8">
                    <p className="text-custom-red-600">Page not found</p>
                  </div>
                );
            }
          })()}
        </div>
      </div>
    </div>
  );
}
