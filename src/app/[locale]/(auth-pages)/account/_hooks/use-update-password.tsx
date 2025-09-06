import { UpdateNewPassword, updatePassword } from "@/lib/actions/profile.action";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function useUpadatePassword() {
  // Translation
  const t = useTranslations();

  const {
    mutate: newPassword,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (form: UpdateNewPassword) => {
      const payload = await updatePassword(form);

      if ("code" in payload) {
        throw new Error(payload.message);
      }

      return payload;
    },
    onSuccess: () => {
      // Success toast
      toast.success(t("password-has-been-chaged"));

      // Redirecte to login and force reload
      setTimeout(async () => {
        await signOut();
        window.location.replace("/login");
      }, 2000);
    },
  });

  return { newPassword, error, isPending };
}
