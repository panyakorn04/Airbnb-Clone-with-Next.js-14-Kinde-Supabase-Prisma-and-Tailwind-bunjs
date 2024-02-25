import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const { getUser } = getKindeServerSession();

  const me = await getUser();

  if (!me || me === null || !me.id) {
    throw new Error("Smoething went wrong, i am srorry....");
  }

  let dbUser = await prisma.user.findUnique({
    where: {
      id: me.id,
    },
  });

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        id: me.id,
        email: me.email ?? "",
        firstName: me.given_name ?? "",
        lastName: me.family_name ?? "",
        picture: me.picture ?? `https://avatars.vercel.sh/${me.given_name}`,
      },
    });
  }
  return NextResponse.redirect("http://localhost:3000");
}
