import getUserToken from "@/hooks/get-token";
import { HEADER_CONTENT_TYPE } from "../types/constant";
import DiplomaCard from "@/app/[locale]/(home)/_components/diplomas-card";

export async function getDiplomas(page: number) {
  try {
    const baseUrl = process.env.API;
    const token = await getUserToken();

    const res = await fetch(`${baseUrl}/subjects?limit=6&page=${page}`, {
      method: "GET",
      headers: {
        ...HEADER_CONTENT_TYPE,
        token: token || "",
      },
      next: { revalidate: 60 * 60 },
    });

    const payload: ApiResponse<PaginatedResponse<DiplomasResponse>> = await res.json();

    // Error case
    if ("code" in payload) {
      return {
        code: payload.code,
        message: payload.message || "Unknown API error",
      };
    }

    //  Success
    return payload.subjects.map((subject, index) => <DiplomaCard key={subject._id} diploma={subject} index={index} />);
  } catch (err) {
    console.error("Error fetching diplomas:", err);
    return {
      code: 500,
      message: err instanceof Error ? err.message : "Failed fetching diplomas",
    };
  }
}
