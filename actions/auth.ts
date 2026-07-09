"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

import { registerUser, loginUser } from "@/services/auth.service";

type RegisterResult =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      message: string;
    };

type LoginResult =
  | {
      success: true;
      user: {
        id: string;
        role: "admin" | "mentor" | "user";
      };
    }
  | {
      success: false;
      message: string;
    };

export async function registerAction(
  formData: FormData,
): Promise<RegisterResult> {
  try {
    await registerUser({
      username: formData.get("username") as string,
      password: formData.get("password") as string,
      full_name: formData.get("full_name") as string,
      school_name: formData.get("school_name") as string,
      nickname: formData.get("nickname") as string,
      grade: formData.get("grade") as string,
      major: formData.get("major") as string,
    });

    return {
      success: true,
      message: "Registrasi berhasil.",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat registrasi.",
    };
  }
}

export async function loginAction(formData: FormData): Promise<LoginResult> {
  try {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const user = await loginUser(username, password);

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1d",
      },
    );

    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return {
      success: true,
      user: {
        id: user.id,
        role: user.role,
      },
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat login.",
    };
  }
}

export async function logoutAction() {
  (await cookies()).delete("token");

  return {
    success: true,
  };
}
