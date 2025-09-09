import "../globals.css";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Locales, routing } from "@/i18n/routing";
import Providers from "@/components/providers";
import { Inter } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { Toaster } from "sonner";
import SideNav from "@/components/comman/side-nav/side-nav";
import { getServerSession } from "next-auth";
import { authOption } from "@/auth";
import { ScrollArea } from "@/components/ui/scroll-area";
import Nvabreadcrumb from "@/components/custom/breadcrumb-nav/nav-breadcrumb";
import { getTranslations } from "next-intl/server";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
});

type Params = {
  params: {
    locale: Locales;
  };
};

export async function generateMetadata({ params }: Params) {
  const { locale } = params;
  const t = await getTranslations({ locale });

  return {
    title: t("website-title"),
    description: t("website-description"),
    keywords: t("wedsite-key-words"),
    authors: [{ name: "Exams App Team", url: "https://exam-enhanced.vercel.app" }],
    creator: "Exams App Team",
    publisher: "Exams App",
    metadataBase: new URL("https://exam-enhanced.vercel.app"),
    openGraph: {
      title: t("website-title"),
      description: t("website-description"),
      url: "https://exam-enhanced.vercel.app",
      siteName: t("website-title"),
      type: "website",
      locale,
      images: [
        {
          url: "/assets/images/logo.png",
          width: 1200,
          height: 630,
          alt: "Exams App Preview",
        },
      ],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    locale: Locales;
  };
}) {
  // Validate locale
  const { locale } = params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const session = await getServerSession(authOption);

  return (
    <html className={`${GeistMono.variable} ${inter.variable}`} lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className="2xl:container mx-auto">
        <Providers>
          <div className="flex flex-col md:flex-row">
            {/* Side Navigation */}
            {session && (
              <div className="md:w-4/12 lg:w-3/12 w-full">
                <SideNav />
              </div>
            )}

            {/* Main Content */}
            <ScrollArea
              className={`xl:h-screen max-h-screen ${!session?._id ? "w-full" : "md:w-8/12 lg:w-9/12 w-full "}`}
            >
              {/* Breadcrumb */}
              {session?._id && <Nvabreadcrumb />}

              {/* Children */}
              <div>{children}</div>
            </ScrollArea>
          </div>
        </Providers>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
