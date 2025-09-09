import { sendOTPAction } from "@/lib/actions/forgot-password.action";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

type UseresendendOTP = {
  setCanResend: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function useResendOTP({ setCanResend }: UseresendendOTP) {
  const t = useTranslations();

  const {
    isPending: resendPending,
    error: resendError,
    mutate: resendOTP,
  } = useMutation({
    mutationFn: async ({ email }: SendOTPForm) => {
      setCanResend(true);
      const payload = await sendOTPAction({ email });
      //  Error
      if ("code" in payload) {
        throw new Error(payload.message);
      }
    },
    onSuccess: () => {
      toast.success(t("otp-send"));
      setCanResend(false);
    },
    onError: () => {
      setCanResend(false);
    },
  });
  return { resendPending, resendError, resendOTP };
}
