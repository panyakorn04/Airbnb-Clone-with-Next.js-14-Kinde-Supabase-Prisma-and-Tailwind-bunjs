import { CategoryComponent } from "@/components/category";
import ListingCard from "@/components/listing-card";
import { NoItems } from "@/components/no-items";
import { SkeltonCard } from "@/components/skeleton-loading";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Suspense } from "react";
async function getData({
  searchParams,
  authorId,
}: {
  authorId?: string;
  searchParams?: {
    filter?: string;
  };
}) {
  const data = await prisma.room.findMany({
    where: {
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
      categoryName: searchParams?.filter ?? undefined,
    },
    select: {
      id: true,
      description: true,
      photo: true,
      country: true,
      price: true,
      favorites: {
        where: {
          authorId: authorId ?? undefined,
        },
      },
    },
  });
  return data;
}

export default function Home({
  searchParams,
}: {
  searchParams?: {
    filter?: string;
  };
}) {
  return (
    <main className=" min-h-[75vh] w-full container">
      <CategoryComponent />

      <Suspense key={searchParams?.filter} fallback={<SkeletonLoading />}>
        <ShowItems searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function ShowItems({
  searchParams,
}: {
  searchParams?: {
    filter?: string;
  };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData({ searchParams, authorId: user?.id });

  return (
    <>
      {data.length > 0 ? (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {data.map((item) => (
            <ListingCard
              key={item.id}
              id={item.id}
              description={item.description}
              photo={item.photo}
              country={item.country}
              price={item.price}
              authorId={user?.id}
              favoriteId={item.favorites[0]?.id}
              isFavorite={item.favorites.length > 0 ? true : false}
              pathName="/"
            />
          ))}
        </div>
      ) : (
        <NoItems
          title="No items found"
          description="No items found for this category"
        />
      )}
    </>
  );
}

function SkeletonLoading() {
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
      <SkeltonCard />
      <SkeltonCard />
      <SkeltonCard />
      <SkeltonCard />
    </div>
  );
}
