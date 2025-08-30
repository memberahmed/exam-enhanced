import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";
import { checkQuestoinsForm } from "../questions-list";
import { checkQuestions } from "@/lib/actions/check-questions-action";

export default function useCheckQuestions() {
  const queryClient = useQueryClient();

  const {
    isPending,
    error,
    mutate: sendQuestions,
  } = useMutation({
    mutationFn: async (form: z.infer<typeof checkQuestoinsForm>) => {
      const payload = await checkQuestions(form);

      // Error case
      if ("code" in payload) {
        throw new Error(payload.message || "Something went wrong, please try again");
      }

      // Payled
      return payload;
    },
    onSuccess: (payload) => {
      // Set payload response in cashe
      queryClient.setQueryData(["check-questions"], payload);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return { isPending, error, sendQuestions };
}
