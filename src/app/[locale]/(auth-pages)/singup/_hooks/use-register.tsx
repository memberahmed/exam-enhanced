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
      if ("code" in paylod) {
        throw new Error(paylod.message);
      }
      return paylod;
    },
    onMutate: () => {
      // Show toast immediately
      toast.loading(t("please-wait"), {
        id: "register",
      });
    },
    onSuccess: () => {
      toast.success(t("the-account-created"), { id: "register" });
      router.push("/login");
    },
    onError: (err) => {
      console.log(err);
      toast.dismiss("register");
    },
  });

  return { isPending, error, register };
}
