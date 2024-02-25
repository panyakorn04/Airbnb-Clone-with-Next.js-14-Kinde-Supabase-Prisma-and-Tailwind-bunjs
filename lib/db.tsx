import { PrismaClient } from "@prisma/client";

const primaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof primaClientSingleton>;
}
const prisma = globalThis.prisma ?? primaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}
