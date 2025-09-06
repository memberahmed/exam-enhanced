import GoBack from "@/components/custom/questions/go-back";
import { UserRound } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { getProfileInfo } from "@/lib/api/profile.api";
import FeedbackError from "@/components/comman/feedback-error";
import ProfileWrapper from "./_components/profile-wrapper";
import { Locales } from "@/i18n/routing";

export default async function Page() {
  const t = await getTranslations();
  const locale = (await getLocale()) as Locales;

  let error: ErrorResponse | undefined;
  let userData: User | undefined;

  const profileData = await getProfileInfo();

  if ("code" in profileData) {
    error = profileData;
  } else {
    userData = profileData.user;
  }

  return (
    <main>
      <section className="space-y-4 p-2 sm:p-4 md:p-6 bg-custom-gray-50">
        <div dir={locale === "ar" ? "rtl" : "ltr"} className="flex items-center gap-2.5">
          <GoBack />
          <h1
            dir={locale === "ar" ? "rtl" : "ltr"}
            className="p-4 flex-1 flex items-center h-10 md:h-20 gap-x-4 font-inter font-semibold text-2xl md:text-3xl bg-custom-blue-600 text-white"
          >
            {t.rich("account-settings-and-icon", {
              span: () => (
                <UserRound className="text-2xl md:text-4xl lg:text-6xl w-6 h-6 md:w-10 md:h-10 lg:w-14 lg:h-14" />
              ),
            })}
          </h1>
        </div>
        {error && <FeedbackError error={error?.message} />}
        {userData && <ProfileWrapper userData={userData} />}
      </section>
    </main>
  );
}
