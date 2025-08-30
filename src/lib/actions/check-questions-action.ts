"use server";

import { checkQuestoinsForm } from "@/components/custom/questions/questions-list";
import getUserToken from "@/hooks/get-token";
import z from "zod";
import { HEADER_CONTENT_TYPE } from "../types/constant";

export async function checkQuestions(questions: z.infer<typeof checkQuestoinsForm>) {
  const baseUrl = process.env.API;

  const token = await getUserToken();
  const res = await fetch(`${baseUrl}/questions/check`, {
    method: "POST",
    body: JSON.stringify(questions),
    headers: {
      ...HEADER_CONTENT_TYPE,
      token: token || "",
    },
  });
  const payload: ApiResponse<checkQuestionsReponse> = await res.json();

  return payload;
}
