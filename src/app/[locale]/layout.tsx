import "../globals.css";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Locales, routing } from "@/i18n/routing";
import Providers from "@/components/providers";
import { Inter } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locales }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html className={`${inter.variable} ${GeistMono.variable} `} lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body>
        <Providers>{children}</Providers>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
