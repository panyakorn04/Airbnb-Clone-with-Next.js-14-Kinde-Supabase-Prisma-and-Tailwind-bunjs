import React from "react";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { NoItems } from "@/components/no-items";
import ListingCard from "@/components/listing-card";

async function getData(authorId: string) {
  const data = await prisma.favorite.findMany({
    where: {
      authorId: authorId,
    },
    select: {
      room: {
        select: {
          id: true,
          photo: true,
          description: true,
          favorites: true,
          price: true,
          country: true,
        },
      },
    },
  });

  return data;
}

export default async function FavoritePage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return redirect("/");
  const data = await getData(user?.id);
  return (
    <section className="container mx-auto py-5 lg:py-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight"> You Favorites</h2>

      <div>
        {data?.length === 0 ? (
          <>
            <NoItems
              title="No items found"
              description="No items found for this favorites"
            />
          </>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
            {data?.map((item) => (
              <ListingCard
                key={item?.room?.id}
                id={item?.room?.id}
                photo={item?.room?.photo}
                description={item?.room?.description}
                favoriteId={item?.room?.favorites[0]?.id}
                price={item?.room?.price}
                country={item?.room?.country}
                isFavorite={
                  (item?.room?.favorites?.length as number) > 0 ? true : false
                }
                pathName="/favorites"
                authorId={user?.id}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
