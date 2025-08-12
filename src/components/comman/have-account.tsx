import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function HaveAccount() {
  const t = useTranslations();
  return (
    <p className="self-center font-GeistMono text-custom-gray-500 leading-full tracking-none pt-5 h-medium:pt-2">
      {t.rich("forgot-password-link", {
        link: (v) => (
          <Link href={"/forgot-password"} className="text-custom-blue-600 text-[14px]">
            {v}
          </Link>
        ),
      })}
    </p>
  );
}
