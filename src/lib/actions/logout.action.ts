"use server";

import getUserToken from "@/hooks/get-token";
import { HEADER_CONTENT_TYPE } from "../types/constant";

export async function logoutUser() {
  const token = await getUserToken();

  const baseUrl = process.env.API;

  const res = await fetch(`${baseUrl}/auth/logout`, {
    method: "GET",
    headers: {
      ...HEADER_CONTENT_TYPE,
      token: token || "",
    },
  });

  const payload: ApiResponse<LogoutResponse> = await res.json();

  return payload;
}
