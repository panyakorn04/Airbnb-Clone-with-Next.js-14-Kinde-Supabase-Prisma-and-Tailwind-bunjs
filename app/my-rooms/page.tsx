import ListingCard from "@/components/listing-card";
import { NoItems } from "@/components/no-items";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
async function getData(authorId: string) {
  const data = await prisma.room.findMany({
    where: {
      authorId: authorId,
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
    },
    select: {
      id: true,
      country: true,
      photo: true,
      description: true,
      price: true,
      favorites: {
        where: {
          authorId: authorId,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function MyRooms() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }
  const data = await getData(user.id);

  return (
    <section className="container mx-auto py-5 lg:py-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight"> You Rooms</h2>

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
            {data?.map((item: any) => (
              <ListingCard
                key={item?.id}
                id={item?.id}
                photo={item?.photo}
                description={item?.description}
                favoriteId={item?.favorites[0]?.id}
                price={item?.price}
                country={item?.country}
                isFavorite={
                  (item?.favorites?.length as number) > 0 ? true : false
                }
                pathName="/my-rooms"
                authorId={user?.id}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
