import { PrismaClient } from "@prisma/client";

// Le pasamos la URL directamente al constructor del cliente
const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

export const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const createUser = async (userData) => {
  return await prisma.user.create({
    data: userData,
  });
};
