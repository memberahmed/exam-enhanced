"use server";

import { HEADER_CONTENT_TYPE } from "../types/constant";

export async function sendOTPAction(firstStepForm: SendOTPForm) {
  const baseUrl = process.env.API;
  const res = await fetch(`${baseUrl}/auth/forgotPassword`, {
    method: "POST",
    body: JSON.stringify(firstStepForm),
    headers: {
      ...HEADER_CONTENT_TYPE,
    },
  });
  const payload: ApiResponse<SendOTPResponse> = await res.json();
  return payload;
}

export async function verifyOTPAction(stepTwoForm: VerifyOTPForm) {
  const baseUrl = process.env.API;
  const res = await fetch(`${baseUrl}/auth/verifyResetCode`, {
    method: "POST",
    body: JSON.stringify(stepTwoForm),
    headers: {
      ...HEADER_CONTENT_TYPE,
    },
  });
  const payload: ApiResponse<VerifyOTPResponse> = await res.json();
  return payload;
}

export async function changePasswordAction(stepThree: ChangePasswordForm) {
  const baseUrl = process.env.API;
  const res = await fetch(`${baseUrl}/auth/resetPassword`, {
    method: "PUT",
    body: JSON.stringify(stepThree),
    headers: {
      ...HEADER_CONTENT_TYPE,
    },
  });
  const payload: ApiResponse<ChangePasswordResponse> = await res.json();
  return payload;
}
