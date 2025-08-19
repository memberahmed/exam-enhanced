import { MoveLeft } from "lucide-react";

type MoveBackProps = {
  step: CurrnetForgotPasswordForm;
  setStep: SetForgotPasswordForm;
};

export default function MoveBack({ setStep, step }: MoveBackProps) {
  const handlCurrentStep = () => {
    switch (step) {
      case "verifyOTP":
        setStep("sendOTP");
        break;
      case "changePassword":
        setStep("verifyOTP");
        break;
    }
  };

  return (
    <>
      <MoveLeft
        size={40}
        className="cursor-pointer rtl:rotate-180 text-base p-2 mb-10 border border-custom-gray-200"
        onClick={handlCurrentStep}
      />
    </>
  );
}
