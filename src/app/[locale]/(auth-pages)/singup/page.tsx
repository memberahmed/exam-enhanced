import AuthStaticSection from "@/components/comman/auth-static-section";
import RgisterForm from "./_components/register-form";
import { Locales } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Singup() {
  const locale = useLocale() as Locales;

  return (
    <main>
      <section className="grid grid-cols-1 lg:grid-cols-2 ">
        <AuthStaticSection />

        <div className="flex  flex-col justify-center items-center ">
          <ScrollArea dir={locale === "ar" ? "rtl" : "ltr"} className="h-screen p-5 ">
            <RgisterForm />
          </ScrollArea>
        </div>
      </section>
    </main>
  );
}
