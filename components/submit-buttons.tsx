"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Heart, Loader2 } from "lucide-react";
export function SubmitButtons() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button variant="secondary" type="button" disabled className="">
          <Loader2 className="animate-spin mr-2 size-4" />
          Loading...
        </Button>
      ) : (
        <Button type="submit" className="" size="lg">
          Save
        </Button>
      )}
    </>
  );
}

export function AddToFavoriteButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button
          variant="secondary"
          size="icon"
          type="button"
          disabled
          className=""
        >
          <Loader2 className="animate-spin size-4" />
        </Button>
      ) : (
        <Button
          type="submit"
          variant={"ghost"}
          className="bg-white"
          size="icon"
        >
          <Heart className=" text-gray-500 size-4" />
        </Button>
      )}
    </>
  );
}

export function DeleteToFavoriteButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button
          variant="secondary"
          size="icon"
          type="button"
          disabled
          className=""
        >
          <Loader2 className="animate-spin size-4" />
        </Button>
      ) : (
        <Button
          type="submit"
          variant={"ghost"}
          className="bg-red-100"
          size="icon"
        >
          <Heart className=" text-red-500 size-4" fill="#E21C49" />
        </Button>
      )}
    </>
  );
}

export function ReservationSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button className="w-full" disabled>
          <Loader2 className="w-4 h-4 animate-spin mr-2" /> Please wait...
        </Button>
      ) : (
        <Button className="w-full" type="submit">
          Make a Reservation!
        </Button>
      )}
    </>
  );
}
