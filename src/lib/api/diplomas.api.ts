import getUserToken from "@/hooks/get-token";
import { HEADER_CONTENT_TYPE } from "../types/constant";

export async function getDiplomas() {
  try {
    const baseUrl = process.env.API;
    const token = await getUserToken();

    const res = await fetch(`${baseUrl}/subjects?limit=6&page=3`, {
      method: "GET",
      headers: {
        ...HEADER_CONTENT_TYPE,
        token: token || "",
      },
    });

    const payload: ApiResponse<PaginatedResponse<DiplomasResponse>> = await res.json();
    return payload;
  } catch (err) {
    console.error("Error fetching diplomas:", err);
    return err as ErrorResponse;
  }
}
