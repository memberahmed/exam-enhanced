import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

type LoginForm = {
  email: string;
  password: string;
};

export default function useLogin() {
  const searchParams = useSearchParams();

  const {
    isPending,
    error,
    mutate: login,
  } = useMutation({
    mutationFn: async (loginForm: LoginForm) => {
      const result = await signIn("credentials", {
        email: loginForm?.email,
        password: loginForm?.password,
        redirect: false,
      });

      const handleError = (message: string) => {
        throw new Error(message || "Something went wrong!");
      };

      const handleSuccess = () => {
        const callbackUrl = searchParams.get("callbackUrl") || "/";
        window.location.replace(callbackUrl);
      };

      // Error case
      if (result?.error) return handleError(result.error);

      // Success case
      if (result?.ok) return handleSuccess();

      // Defaulte case for unknwon Error
      handleError("Unexpected result!");
    },
  });

  return { isPending, error, login };
}
