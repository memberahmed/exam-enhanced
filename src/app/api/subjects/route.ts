import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Navigation
  const searchParams = req.nextUrl.searchParams;
  // JWT token
  const token = await getToken({ req });

  const baseUrl = process.env.API;

  const res = await fetch(`${baseUrl}/subjects?${searchParams.toString()}&limit=6`, {
    headers: {
      token: token?.accessToken || "",
    },
  });

  const payload: ApiResponse<PaginatedResponse<DiplomasResponse>> = await res.json();

  return NextResponse.json(payload, { status: res.status });
}
