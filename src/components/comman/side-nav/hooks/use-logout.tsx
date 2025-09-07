"use cleint";
import { logoutUser } from "@/lib/actions/logout.action";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function useLogout() {
  // Translation
  const t = useTranslations();

  const {
    error,
    isPending,
    mutate: logout,
  } = useMutation({
    mutationFn: async () => {
      // Start loading toast
      toast.loading(t("logging-out"), { id: "logout" });

      const res = await logoutUser();

      if ("code" in res && res.message === "Unauthrized") {
        await signOut({ redirect: false });
        window.location.replace("/login");
      }

      if ("code" in res) {
        console.log(res.message);
        throw new Error(res.message);
      }

      // Next auth sign out and coockies delation
      await signOut({ redirect: false });
    },

    onError: (err: ErrorResponse) => {
      toast.error(err?.message || t("something-went-wrong"), { id: "logout" });
    },
    onSuccess: () => {
      toast.success(t("logout-successfull"), { id: "logout" });
      window.location.replace("/login");
    },
  });

  return { error, isPending, logout };
}
