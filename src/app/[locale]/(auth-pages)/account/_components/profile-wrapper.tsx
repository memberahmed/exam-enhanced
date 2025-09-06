"use client";

import { useState } from "react";
import AccountNav from "./account-side-nav";
import dynamic from "next/dynamic";
import PasswordFormSkeleton from "@/components/sekeltons/form-sekelton";
import { useDirection } from "@/lib/utils/get-dirrction.util";

const ProfileInfoForm = dynamic(() => import("./pofile-info-form"), {
  loading: () => <PasswordFormSkeleton />,
});

const ChangePasswordForm = dynamic(() => import("./update-passsaword-form"), {
  loading: () => <PasswordFormSkeleton />,
});

type UserData = {
  userData: User;
};

export default function ProfileWrapper({ userData }: UserData) {
  const [accountForm, setAccountForm] = useState<AccountForm>("profileInfo");
  const dir = useDirection();
  return (
    <div dir={dir} className="flex gap-5 flex-col md:flex-row">
      <div className="2xl:p-6 p-2 md:p-4 w-full md:w-4/12 2xl:w-3/12">
        <AccountNav setAccountForm={setAccountForm} acountForm={accountForm} />
      </div>

      <div className="w-full md:w-8/12 xl:w-9/12">
        {(() => {
          switch (accountForm) {
            case "profileInfo":
              return <ProfileInfoForm userData={userData} />;

            case "changePassword":
              return <ChangePasswordForm />;

            default:
              return <p>Not Found</p>;
          }
        })()}
      </div>
    </div>
  );
}
