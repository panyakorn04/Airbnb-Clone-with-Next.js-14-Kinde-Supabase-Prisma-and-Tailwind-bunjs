import Image from "next/image";
import Link from "next/link";
import React from "react";
import UserNavbar from "./user-navbar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { SearchModalComponent } from "../search";

type Props = {};

export default async function Navbar({}: Props) {
  return (
    <nav className="flex text-gray-700 items-center justify-between w-full p-2 border-b">
      <Link href="/">
        <Image
          src="/logo-airbnb-web.webp"
          alt="logo desktop"
          width={500}
          height={500}
          className="w-auto h-10 hidden lg:block"
        />
        <Image
          src="/logo-airbnb-mobile.webp"
          alt="logo mobile"
          width={500}
          height={500}
          className="w-auto h-10 block lg:hidden"
        />
      </Link>

      <SearchModalComponent />
      <UserNavbar />
    </nav>
  );
}
