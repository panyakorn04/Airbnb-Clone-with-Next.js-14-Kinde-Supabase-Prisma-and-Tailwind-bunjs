import React from "react";
import { Menu } from "lucide-react";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { CreateAirbnbRoom } from "@/app/actions";
type Props = {};

export default async function UserNavbar({}: Props) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const CreateRoomWithId = CreateAirbnbRoom.bind(null, {
    authorId: user?.id as string,
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className=" rounded-full">
          <Menu size={24} className=" text-gray-600" />
          <Avatar className="h-8 w-auto">
            <AvatarImage
              src={user?.picture ?? "https://github.com/shadcn.png"}
              alt={user?.family_name ?? "User Picture"}
              className="object-cover"
            />
            <AvatarFallback className="w-8 h-auto">
              {user?.family_name?.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" sideOffset={5} align="end">
        {user ? (
          <>
            <DropdownMenuItem>
              <form action={CreateRoomWithId} className="w-full">
                <Button variant={"ghost"} type="submit" className="w-full">
                  Create Room
                </Button>
              </form>
            </DropdownMenuItem>
            <DropdownMenuItem className="h-full">
              <Button type="button" variant={"ghost"} className="w-full">
                <Link
                  href="/my-rooms"
                  className="w-full
               hover:text-gray-800 px-10
              "
                >
                  My Room
                </Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem className="h-full">
              <Button type="button" variant={"ghost"} className="w-full">
                <Link
                  href="/listings"
                  className="w-full
               hover:text-gray-800 px-10
              "
                >
                  Listings
                </Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button type="button" variant={"ghost"} className="w-full">
                <Link href="/favorites" className="w-full">
                  Favorites
                </Link>
              </Button>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Button type="button" variant={"ghost"} className="w-full">
                <Link href="/reservations" className="w-full">
                  Reservations
                </Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogoutLink className="w-full">
                <Button type="button" variant={"ghost"} className="w-full">
                  <p className="text-gray-600 w-full hover:text-gray-800">
                    Logout
                  </p>
                </Button>
              </LogoutLink>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem>
              <LoginLink className="w-full">
                <p className="text-gray-600 hover:text-gray-800">Login</p>
              </LoginLink>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <RegisterLink>
                <p className="text-gray-600 w-full hover:text-gray-800">
                  Register
                </p>
              </RegisterLink>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
