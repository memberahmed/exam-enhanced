"use server";

import getUserToken from "@/hooks/get-token";
import { HEADER_CONTENT_TYPE } from "../types/constant";

export async function getExamById(id: string) {
  try {
    const token = await getUserToken();
    const baseUrl = process.env.API;

    const res = await fetch(`${baseUrl}/exams/${id}`, {
      headers: {
        ...HEADER_CONTENT_TYPE,
        token: token || "",
      },
    });

    const payload: ApiResponse<{ message: "success"; exam: Exam }> = await res.json();

    if ("code" in payload) {
      return {
        code: payload.code,
        message: payload.message,
      };
    }

    return payload;
  } catch (err) {
    console.error("Error fetching exams:", err);
    return {
      code: 500,
      message: err instanceof Error ? err.message : "Failed fetching exams",
    };
  }
}
