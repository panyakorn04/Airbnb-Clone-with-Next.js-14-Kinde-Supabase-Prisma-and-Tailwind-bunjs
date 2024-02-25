"use server";
import prisma from "@/lib/db";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function CreateAirbnbRoom({ authorId }: { authorId: string }) {
  const room = await prisma.room.findFirst({
    where: {
      authorId: authorId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  if (room === null) {
    const room = await prisma.room.create({
      data: {
        authorId: authorId,
      },
    });
    return redirect(`/create/${room.id}/structure`);
  } else if (
    !room.addedCategory &&
    !room.addedDescription &&
    !room.addedLocation
  ) {
    return redirect(`/create/${room.id}/structure`);
  } else if (!room.addedCategory && !room.addedDescription) {
    return redirect(`/create/${room.id}/description`);
  } else if (
    room.addedCategory &&
    room.addedDescription &&
    !room.addedLocation
  ) {
    return redirect(`/create/${room.id}/address`);
  } else if (
    room.addedCategory &&
    room.addedDescription &&
    room.addedLocation
  ) {
    const data = await prisma.room.create({
      data: {
        authorId: authorId,
      },
    });
    return redirect(`/create/${data.id}/structure`);
  }
}

export async function CreateCategoryPage(formData: FormData) {
  const roomId = formData.get("roomId") as string;
  const categoryName = formData.get("categoryName") as string;
  const data = await prisma.room.update({
    where: {
      id: roomId,
    },
    data: {
      addedCategory: true,
      categoryName: categoryName,
    },
  });
  return redirect(`/create/${data.id}/description`);
}

export async function CreateDescriptionPage(formData: FormData) {
  const roomId = formData.get("roomId") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") as string;
  const imageFile = formData.get("image") as File;
  const guestNumber = formData.get("guests") as string;
  const bedroomNumber = formData.get("bedroom") as string;
  const bathroomNumber = formData.get("bathroom") as string;
  const { data: imageUrl } = await supabase.storage
    .from("images")
    .upload(`${imageFile.name}-${new Date()}`, imageFile, {
      cacheControl: "2592000",
      contentType: "image/png",
    });

  const data = await prisma.room.update({
    where: {
      id: roomId,
    },
    data: {
      addedDescription: true,
      name: name,
      description: description,
      price: parseInt(price),
      photo: imageUrl?.path,
      guests: guestNumber,
      bedrooms: bedroomNumber,
      bathrooms: bathroomNumber,
    },
  });
  return redirect(`/create/${data.id}/address`);
}

export async function CreateAddressPage(formData: FormData) {
  const roomId = formData.get("roomId") as string;
  const countryValue = formData.get("countryValue") as string;
  const data = await prisma.room.update({
    where: {
      id: roomId,
    },
    data: {
      addedLocation: true,
      country: countryValue,
    },
  });
  return redirect(`/`);
}

export async function AddToFavorite(formData: FormData) {
  const roomId = formData.get("roomId") as string;
  const authorId = formData.get("authorId") as string;
  const pathName = formData.get("pathName") as string;
  const data = await prisma.favorite.create({
    data: {
      roomId: roomId,
      authorId: authorId,
    },
  });
  revalidatePath(pathName);
}

export async function DeleteToFavorite(formData: FormData) {
  const favoriteId = formData.get("favoriteId") as string;
  const authorId = formData.get("authorId") as string;
  const pathName = formData.get("pathName") as string;

  const data = await prisma.favorite.delete({
    where: {
      id: favoriteId,
      authorId: authorId,
    },
  });
  revalidatePath(pathName);
}

export async function CreateReservation(formData: FormData) {
  const authorId = formData.get("authorId") as string;
  const roomId = formData.get("roomId") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;

  const data = await prisma.reservation.create({
    data: {
      authorId: authorId,
      endDate: endDate,
      startDate: startDate,
      roomId: roomId,
    },
  });

  return redirect("/");
}
