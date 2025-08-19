import { useRouter } from "@/i18n/navigation";
import { changePasswordAction } from "@/lib/actions/forgot-password.action";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function useChangePassword() {
  const t = useTranslations();

  const router = useRouter();
  const {
    isPending,
    error,
    mutate: changePassword,
  } = useMutation({
    mutationFn: async (changePassword: ChangePasswordForm) => {
      const payload = await changePasswordAction(changePassword);
      if ("code" in payload) {
        throw new Error(payload?.message);
      }
    },
    onSuccess: () => {
      toast.success(t("new-password-has-been-set"));
      router.push("/login");
    },
  });
  return { isPending, error, changePassword };
}
