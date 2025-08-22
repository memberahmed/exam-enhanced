"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Spinner from "../sppiner";
import AccountDorpdown from "../../custom/account-dropdown-menu";
import { useState } from "react";
import { Menu } from "lucide-react";

type Link = {
  name: string;
  path: string;
};

const links: Link[] = [
  { name: "diplomas", path: "/" },
  { name: "account-settings", path: "/account-settings" },
];

export default function SideNav() {
  //  Tarnslation
  const t = useTranslations();

  // Navgation
  const pathname = usePathname();

  // Hooks
  const { data, status } = useSession();

  // States
  const [toggleNav, setToggleNav] = useState(false);
  return (
    <nav className="bg-custom-blue-50 space-y-5 md:min-h-screen flex flex-col border-r p-5 md:p-10">
      {/* Logo image */}
      <div className="flex justify-between md:mb-14 mb-6 items-center ">
        <div className="relative w-48 h-9 ">
          <Image fill className="h-full w-full object-cover" src="/assets/images/logo.png" alt="" />
        </div>

        {/* Phone toggle icon */}
        <Menu size={35} onClick={() => setToggleNav(!toggleNav)} className="cursor-pointer md:hidden" />
      </div>

      {/* Links and Dropdown (Toggled Together) */}
      <div className={`${toggleNav ? "flex" : "hidden"} md:flex flex-col flex-1`}>
        {/* Links */}
        <div className="flex flex-col space-y-2 h-full justify-between">
          {/* Links map */}
          {links.map((link) => (
            <Link
              className={cn(
                `${
                  pathname === link.path
                    ? "bg-custom-blue-100 border border-custom-blue-500 text-custom-blue-500"
                    : "text-custom-gray-500"
                } text-base leading-full tracking-none font-GeistMono p-4 hover:bg-inherit hover:text-custom-blue-500 transition-colors duration-300`
              )}
              key={link.path}
              href={link.path}
            >
              {t(link.name)}
            </Link>
          ))}
        </div>

        {/* Profile (Avatar + Dropdown) */}
        <div className="md:mt-auto flex xl:gap-x-3 gap-y-2 flex-col xl:flex-row">
          {/* Profile Image */}
          <Avatar className="size-14 border  border-custom-blue-600 rounded-none">
            <AvatarImage src="/assets/images/avatar.png" alt="Hallie Richards" />
            <AvatarFallback className="text-xs">
              <Spinner />
            </AvatarFallback>
          </Avatar>

          {/* Profile Info + Dropdown */}
          <div className=" flex justify-between items-center">
            {/* user first Name and Email */}
            <div className="space-y-1">
              {/* user First name */}
              <h3 className="text-custom-blue-600 font-GeistMono text-base leading-full tracking-none font-medium">
                {status === "loading" ? <Spinner /> : data?.firstName}
              </h3>

              {/* User email */}
              <h4 className="text-custom-gray-500 font-GeistMono text-[14px] leading-full tracking-none font-normal whitespace-normal break-all">
                {status === "loading" ? <Spinner /> : data?.email}
              </h4>
            </div>

            {/* Dropdown Menu for profile and logout */}
            <AccountDorpdown />
          </div>
        </div>
      </div>
    </nav>
  );
}
