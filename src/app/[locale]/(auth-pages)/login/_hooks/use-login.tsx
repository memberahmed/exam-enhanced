import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

type LoginForm = {
  email: string;
  password: string;
};
export default function useLogin() {
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
      if (result?.ok) {
        window.location.href = "/";
      }
      if (result?.error) {
        throw new Error(result.error || "Something went wrong!");
      }
    },
  });
  return { isPending, error, login };
}
