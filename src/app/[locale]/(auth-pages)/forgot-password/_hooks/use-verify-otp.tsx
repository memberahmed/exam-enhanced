import { verifyOTPAction } from "@/lib/actions/forgot-password.action";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

type UseStepTwoProps = {
  setStep: SetForgotPasswordForm;
};
export default function useVerifyOTP({ setStep }: UseStepTwoProps) {
  const t = useTranslations();

  const {
    isPending,
    error,
    mutate: verifyOTP,
  } = useMutation({
    mutationFn: async (verifyOTP: VerifyOTPForm) => {
      const payload = await verifyOTPAction(verifyOTP);
      if ("code" in payload) {
        throw new Error(payload.message);
      }
    },
    onSuccess: () => {
      toast.success(t("otp-send"));

      setStep("changePassword");
    },
  });
  return { isPending, error, verifyOTP };
}
