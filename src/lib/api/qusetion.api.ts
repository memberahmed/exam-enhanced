import getUserToken from "@/hooks/get-token";
import { HEADER_CONTENT_TYPE } from "../types/constant";

export async function getQuestions(examId: string) {
  const baseUrl = process.env.API;

  try {
    const token = await getUserToken();
    const res = await fetch(`${baseUrl}/questions?exam=${examId}`, {
      method: "GET",
      headers: {
        ...HEADER_CONTENT_TYPE,
        token: token || "",
      },
    });
    const payload: ApiResponse<QuestionsResponse> = await res.json();
    if ("code" in payload) {
      return {
        code: payload.code,
        message: payload.message,
      };
    }

    return payload;
  } catch (err) {
    console.error("Error fetching question", err);
    return {
      code: 500,
      message: err instanceof Error ? err.message : "Some went wrong, try again later",
    };
  }
}
