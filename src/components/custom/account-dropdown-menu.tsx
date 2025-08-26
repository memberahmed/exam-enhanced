import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, UserRound } from "lucide-react";
import Logout from "../comman/side-nav/components/logout/logout";
import { useLocale, useTranslations } from "next-intl";
import { Locales } from "@/i18n/routing";

export default function AccountDorpdown() {
  //  Tranlsation
  const t = useTranslations();
  const locales = useLocale() as Locales;

  return (
    <DropdownMenu>
      {/* Trigger */}
      <DropdownMenuTrigger
        className="focus:border focus:border-custom-blue-600 focus-visible:ring-0 rounded-md"
        asChild
      >
        <Button className="w-1 mx-1 bg-inherit  shadow-none text-custom-gray-500 hover:bg-inherit hover:textellipsis hover:text-custom-blue-500">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>

      {/* Content */}
      <DropdownMenuContent className="w-64 bg-white rtl:mt-2 p-2" align={locales === "ar" ? "end" : "start"}>
        <DropdownMenuGroup>
          {/* Profile */}
          <DropdownMenuItem className="text-3.5 text-black font-GeistMono tracking-none leading-full h-12 p-4">
            <UserRound size={18} className="text-custom-gray-800 " />
            {t("profile")}
          </DropdownMenuItem>
        </DropdownMenuGroup>

        {/* Separator */}
        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem>
          <Logout />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
