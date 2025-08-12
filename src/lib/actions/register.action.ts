"use server";

import { HEADER_CONTENT_TYPE } from "../types/constant";

export type RegisterFormType = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
};

export async function registerActions(registerForm: RegisterFormType) {
  const baseUrl = process.env.API;

  const res = await fetch(`${baseUrl}/auth/signup`, {
    method: "POST",
    body: JSON.stringify(registerForm),
    headers: {
      ...HEADER_CONTENT_TYPE,
    },
  });

  const payLoad: ApiResponse<LoginResponse> = await res.json();

  return payLoad;
}
