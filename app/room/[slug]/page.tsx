import { CreateReservation } from "@/app/actions";
import { CategoryShowItem } from "@/components/category-show-item";
import { RoomMap } from "@/components/room-map";
import { SelectCalender } from "@/components/select-calender";
import { ReservationSubmitButton } from "@/components/submit-buttons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/db";
import useCountries from "@/lib/use-countries";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";

async function getData(roomId: string) {
  const data = await prisma.room.findFirst({
    where: {
      id: roomId,
    },
    select: {
      id: true,
      name: true,
      guests: true,
      country: true,
      photo: true,
      categoryName: true,
      description: true,
      bedrooms: true,
      bathrooms: true,
      price: true,
      reservations: {
        where: {
          roomId: roomId,
        },
      },
      author: {
        select: {
          picture: true,
          firstName: true,
        },
      },
    },
  });
  return data;
}

export default async function RoomDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getData(params?.slug);
  const { getCountryByValue } = useCountries();

  const country = getCountryByValue(data?.country as string);
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  console.log(country);
  return (
    <div className="w-[75%] mx-auto mt-10 mb-12">
      <h1 className="font-medium text-2xl mb-5">{data?.name}</h1>
      <div className="relative h-[550px]">
        <Image
          alt="Image of Home"
          src={`https://eykkgopntdatfbahomet.supabase.co/storage/v1/object/public/images/${data?.photo}`}
          width={500}
          height={500}
          className="rounded-lg h-full object-cover w-full"
        />
      </div>
      <div className="flex justify-between gap-x-24 mt-8">
        <div className="w-2/3">
          <h3 className="text-xl font-medium">
            {country?.flag} {country?.label} / {country?.region}
          </h3>
          <div className="flex gap-x-2 text-muted-foreground">
            <p>{data?.guests} Guests</p> * <p>{data?.bedrooms} Bedrooms</p> *{" "}
            {data?.bathrooms} Bathrooms
          </div>

          <div className="flex items-center mt-6">
            <Avatar>
              <AvatarImage
                src={
                  data?.author?.picture ??
                  "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                }
                alt="User Profile"
                className="w-11 h-11 rounded-full"
              />
              <AvatarFallback>
                {data?.author?.firstName.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col ml-4">
              <h3 className="font-medium">
                Hosted by {data?.author?.firstName}
              </h3>
              <p className="text-sm text-muted-foreground">Host since 2015</p>
            </div>
          </div>
          <Separator className="my-7" />
          <CategoryShowItem categoryName={data?.categoryName as string} />
          <Separator className="my-7" />
          <p className="text-muted-foreground">{data?.description}</p>
          <Separator className="my-7" />
          <RoomMap locationValue={country?.value as string} />
        </div>

        <form action={CreateReservation}>
          <input type="hidden" name="roomId" value={params?.slug} />
          <input type="hidden" name="authorId" value={user?.id} />

          <SelectCalender reservations={data?.reservations} />

          {user?.id ? (
            <ReservationSubmitButton />
          ) : (
            <Button className="w-full" asChild>
              <Link href="/api/auth/login">Make a Reservation</Link>
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
