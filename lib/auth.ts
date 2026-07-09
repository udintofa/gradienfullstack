// src/lib/auth.ts

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export type UserPayload = {
  id: string;
  role: "admin" | "mentor" | "user";
};

export async function getCurrentUser() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
  } catch {
    return null;
  }
}

import { getMe } from "@/services/auth.service";

export async function getMeFromCookie() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    return await getMe(payload.userId);
  } catch {
    return null;
  }
}
