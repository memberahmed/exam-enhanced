import { sendOTPAction } from "@/lib/actions/forgot-password.action";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

type UseSendOTP = {
  setStep: SetForgotPasswordForm;
  setEmail: SetEamil;
};
export default function useSendOTP({ setStep, setEmail }: UseSendOTP) {
  const t = useTranslations();

  const {
    isPending,
    error,
    mutate: sendOTP,
  } = useMutation({
    mutationFn: async (sendOTP: SendOTPForm) => {
      const payload = await sendOTPAction(sendOTP);
      if ("code" in payload) {
        throw new Error(payload.message);
      }
      setEmail(sendOTP.email);
    },
    onSuccess: () => {
      toast.success(t("otp-send"));

      setStep("verifyOTP");
    },
  });
  return { isPending, error, sendOTP };
}
