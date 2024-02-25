import useCountries from "@/lib/use-countries";
import Image from "next/image";
import Link from "next/link";
import React, { use } from "react";
import { AddToFavoriteButton, DeleteToFavoriteButton } from "./submit-buttons";
import { Input } from "./ui/input";
import { AddToFavorite, DeleteToFavorite } from "@/app/actions";

interface ListingCardProps {
  id?: string;
  description?: string | null;
  photo?: string | null;
  country?: string | null;
  price?: number | null;
  authorId?: string;
  favoriteId?: string;
  isFavorite?: boolean;
  pathName?: string;
}
export default function ListingCard({
  id,
  description,
  photo,
  country,
  price,
  authorId,
  favoriteId,
  isFavorite,
  pathName,
}: ListingCardProps) {
  const { getCountryByValue } = useCountries();
  const location = getCountryByValue(country as string);
  return (
    <div className="flex flex-col">
      <div className=" relative ">
        <Image
          src={`https://eykkgopntdatfbahomet.supabase.co/storage/v1/object/public/images/${photo}`}
          alt={description || "placeholder"}
          width={300}
          height={200}
          className="h-64 w-full object-cover rounded-md bg-slate-400"
        />

        {authorId && (
          <div className="z-10 absolute top-2 right-2">
            {isFavorite ? (
              <form action={DeleteToFavorite}>
                <Input type="hidden" name="favoriteId" value={favoriteId} />
                <Input type="hidden" name="authorId" value={authorId} />
                <Input type="hidden" name="pathName" value={pathName} />
                <DeleteToFavoriteButton />
              </form>
            ) : (
              <form action={AddToFavorite}>
                <Input type="hidden" name="roomId" value={id} />
                <Input type="hidden" name="authorId" value={authorId} />
                <Input type="hidden" name="pathName" value={pathName} />
                <AddToFavoriteButton />
              </form>
            )}
          </div>
        )}
      </div>
      <Link href={`/room/${id}`} className="mt-2">
        <h3 className="font-medium text-base">
          {location?.flag} {location?.label} / {location?.region}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {description}
        </p>
        <p className="pt-2 text-muted-foreground">
          <span className="font-medium text-black">${price}</span> / night
        </p>
      </Link>
    </div>
  );
}
