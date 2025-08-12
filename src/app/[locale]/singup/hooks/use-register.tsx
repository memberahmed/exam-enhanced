import { useRouter } from "@/i18n/navigation";
import { registerActions, RegisterFormType } from "@/lib/actions/register.action";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function useRegister() {
  const router = useRouter();
  const t = useTranslations();
  const {
    isPending,
    error,
    mutate: register,
  } = useMutation({
    mutationFn: async (registerForm: RegisterFormType) => {
      const paylod = await registerActions(registerForm);
      const toastId = toast.loading(t("loading"));
      console.log(paylod);
      if ("code" in paylod) {
        toast.dismiss(toastId);
        throw new Error(paylod.message);
      } else {
        toast.success("t('the-account-created')", {
          id: toastId,
        });
        router.push("/login");
      }
    },
  });

  return { isPending, error, register };
}
