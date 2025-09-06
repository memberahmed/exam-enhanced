"use server";

import getUserToken from "@/hooks/get-token";
import { HEADER_CONTENT_TYPE } from "../types/constant";

export type ProfileFrom = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type UpdateNewPassword = {
  oldPassword: string;
  password: string;
  rePassword: string;
};

export async function updateProfileData(profileForm: ProfileFrom) {
  const baseUrl = process.env.API;

  const token = await getUserToken();
  const res = await fetch(`${baseUrl}/auth/editProfile`, {
    method: "PUT",
    body: JSON.stringify(profileForm),
    headers: {
      token: token || "",
      ...HEADER_CONTENT_TYPE,
    },
  });
  const payload: ApiResponse<ProfileResponese> = await res.json();

  return payload;
}

export async function updatePassword(changePassword: UpdateNewPassword) {
  const token = await getUserToken();

  const baseUrl = process.env.API;

  const res = await fetch(`${baseUrl}/auth/changePassword`, {
    method: "PATCH",
    body: JSON.stringify(changePassword),
    headers: {
      token: token || "",
      ...HEADER_CONTENT_TYPE,
    },
  });

  const payload: ApiResponse<Omit<LoginResponse, "user">> = await res.json();

  return payload;
}

export async function deleteAccount() {
  const baseUrl = process.env.API;

  const token = await getUserToken();
  const res = await fetch(`${baseUrl}/auth/deleteMe`, {
    method: "DELETE",
    headers: {
      token: token || "",
      ...HEADER_CONTENT_TYPE,
    },
  });
  const payload: ApiResponse<{ message: "success" }> = await res.json();

  return payload;
}
