import { deleteAccount } from "@/lib/actions/profile.action";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

export default function useDeleteAccount() {
  const {
    mutate: deleteUserAccount,
    isPending,
    error,
  } = useMutation({
    mutationFn: async () => {
      const payload = await deleteAccount();
      if ("code" in payload) {
        throw new Error(payload.message);
      }

      return payload;
    },
    onSuccess: async () => {
      toast.success("Account deleted successfully");
      await signOut();
      setTimeout(() => {
        window.location.replace("/login");
      }, 2000);
    },
  });
  return { deleteUserAccount, isPending, error };
}
