import { HEADER_CONTENT_TYPE } from "./../types/constant";
import getUserToken from "@/hooks/get-token";

export async function getProfileInfo() {
  const baseUrl = process.env.API;

  try {
    const token = await getUserToken();
    const res = await fetch(`${baseUrl}/auth/profileData`, {
      method: "GET",
      headers: {
        token: token || "",
        ...HEADER_CONTENT_TYPE,
      },
      cache: "no-store",
    });

    const payload: ApiResponse<ProfileResponese> = await res.json();

    if ("code" in payload) {
      return {
        message: payload.message,
        code: payload.code,
      };
    }

    return payload;
  } catch (error) {
    console.error("Porfile data error", error);
    return {
      code: 500,
      message: error instanceof Error ? error.message : "Faild getting profile data",
    };
  }
}
