import { HEADER_CONTENT_TYPE } from "@/lib/types/constant";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest, { params }: { params: { examId: string } }) {
  const { examId } = params;
  try {
    const token = await getToken({ req });

    const baseUrl = process.env.API;

    const res = await fetch(`${baseUrl}/exams/${examId}`, {
      method: "GET",
      headers: {
        token: token?.accessToken || "",
        ...HEADER_CONTENT_TYPE,
      },
    });

    const payload: ApiResponse<SingleExamResponse> = await res.json();

    return NextResponse.json(payload, { status: res.status });
  } catch (error) {
    console.error("Error in GET /exams/[examId]:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
