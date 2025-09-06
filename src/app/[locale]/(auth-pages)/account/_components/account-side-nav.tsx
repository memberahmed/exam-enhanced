import Logout from "@/components/comman/side-nav/components/logout/logout";
import { CircleUser, Lock } from "lucide-react";
import { useTranslations } from "next-intl";

type AccountNavProps = {
  acountForm: AccountForm;
  setAccountForm: SetProfileForm;
};

export default function AccountNav({ setAccountForm, acountForm }: AccountNavProps) {
  const t = useTranslations();

  return (
    <nav className="w-full flex flex-col justify-between h-full md:min-h-[calc(100vh-200px)] bg-white p-6">
      <div className="flex flex-col space-y-2.5">
        <p
          onClick={() => setAccountForm("profileInfo")}
          className={`${
            acountForm === "profileInfo" ? "bg-custom-blue-100 text-custom-blue-600" : "text-custom-gray-600"
          } cursor-pointer py-2.5 px-4 gap-2.5 flex items-center `}
        >
          {t.rich("profile-and-icon", {
            span: () => <CircleUser />,
          })}
        </p>
        <p
          className={`${
            acountForm === "changePassword" ? "bg-custom-blue-100 text-custom-blue-600" : "text-custom-gray-600"
          } cursor-pointer py-2.5 px-4 gap-2.5 flex items-center `}
          onClick={() => setAccountForm("changePassword")}
        >
          {t.rich("change-password-and-icon", {
            span: () => <Lock />,
          })}
        </p>
      </div>

      <div className="bg-red-50">
        <Logout />
      </div>
    </nav>
  );
}
