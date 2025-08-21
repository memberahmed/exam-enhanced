import { useRouter } from "@/i18n/navigation";
import { logoutUser } from "@/lib/actions/logout.action";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function useLogout() {
  // Translation
  const t = useTranslations();

  //  Navigation
  const router = useRouter();

  const {
    error,
    isPending,
    mutate: logout,
  } = useMutation({
    mutationFn: async () => {
      const res = await logoutUser();

      if ("code" in res) {
        throw new Error(res.message);
      }

      // Next auth sign out and coockies delation
      await signOut({ redirect: false });
    },
    onError: () => {
      //  Tosast for error
      toast.error(error?.message || t("something-went-wrong"));
    },
    onSuccess: () => {
      // Toast for success
      toast.success(t("logout-successfull"));

      // routing to login page
      router.push("/login");
    },
  });
  return { error, isPending, logout };
}
