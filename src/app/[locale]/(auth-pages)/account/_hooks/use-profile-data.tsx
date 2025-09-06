import { ProfileFrom, updateProfileData } from "@/lib/actions/profile.action";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function useProfileData() {
  // Translations
  const t = useTranslations();

  const { update } = useSession();
  const {
    isPending,
    error,
    mutate: updateProfile,
  } = useMutation({
    mutationFn: async (profileForm: ProfileFrom) => {
      const payload = await updateProfileData(profileForm);
      if ("code" in payload) {
        throw new Error(payload.message);
      }
      return payload;
    },
    onSuccess: async (data) => {
      // Toast
      toast.success(t("profile-has-been-updated"));

      // Upadate user session
      await update({
        firstName: data?.user.firstName,
        lastName: data?.user.lastName,
        email: data?.user.email,
        phone: data?.user.phone,
      });
    },
  });

  return {
    isPending,
    error,
    updateProfile,
  };
}
