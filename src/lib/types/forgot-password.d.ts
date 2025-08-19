// Forms

declare type SendOTPForm = {
  email: string;
};

declare type VerifyOTPForm = {
  resetCode: string;
};

declare type ChangePasswordForm = {
  email: string;
  newPassword: string;
};

declare type SendOTPResponse = {
  message: "success";
  info: string;
};

declare type VerifyOTPResponse = {
  status: "Success";
};

declare type ChangePasswordResponse = {
  message: "success";
  token: string;
};

declare type CurrnetForgotPasswordForm = "sendOTP" | "verifyOTP" | "changePassword";

declare type SetForgotPasswordForm = React.Dispatch<React.SetStateAction<CurrnetForgotPasswordForm>>;

declare type SetEamil = React.Dispatch<React.SetStateAction<string>>;
