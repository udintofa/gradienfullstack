import { prisma } from "@/lib/prisma";
import { hashPassword, comparePassword } from "@/utils/hash";
import { v4 as uuidv4 } from "uuid";

export async function registerUser(data: {
  username: string;
  password: string;
  full_name: string;
  school_name: string;
  nickname: string;
  grade: string;
  major: string;
}) {
  const existing = await prisma.users.findUnique({
    where: {
      username: data.username,
    },
  });

  if (existing) {
    throw new Error("Username sudah digunakan");
  }

  const passwordHash = await hashPassword(data.password);

  await prisma.users.create({
    data: {
      id: uuidv4(),
      username: data.username,
      password_hash: passwordHash,
      full_name: data.full_name,
      school_name: data.school_name,
      nickname: data.nickname,
      grade: parseInt(data.grade),
      major: data.major,
      role: "user",
    },
  });
}

// export async function loginUser(username: string, password: string) {
//   const user = await prisma.users.findUnique({
//     where: {
//       username,
//     },
//     select: {
//       id: true,
//       password_hash: true,
//       role: true,
//     },
//   });

//   if (!user) {
//     throw new Error("Username atau password salah");
//   }

//   const isMatch = await comparePassword(password, user.password_hash);

//   if (!isMatch) {
//     throw new Error("Username atau password salah");
//   }

//   return user;
// }

export async function loginUser(username: string, password: string) {
  const user = await prisma.users.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      password_hash: true,
      role: true,
    },
  });

  if (!user) {
    throw new Error("Username atau password salah");
  }

  const isMatch = await comparePassword(password, user.password_hash);

  if (!isMatch) {
    throw new Error("Username atau password salah");
  }

  return user;
}

export async function getMe(userId: string) {
  return prisma.users.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      username: true,
      full_name: true,
      school_name: true,
      nickname: true,
      grade: true,
      major: true,
      role: true,
    },
  });
}
