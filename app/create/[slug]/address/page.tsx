"use client";
import { CreateAddressPage } from "@/app/actions";
import { CancelButtons } from "@/components/cancel-buttons";
import { SubmitButtons } from "@/components/submit-buttons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import useCountries from "@/lib/use-countries";
import dynamic from "next/dynamic";
import React from "react";
const LazyMap = dynamic(() => import("@/components/map"), {
  ssr: false,
  loading: () => <Skeleton className="h-[50vh] w-full" />,
});

export default function AddressPage({ params } = { params: { slug: "" } }) {
  const { getAllCountries } = useCountries();
  const [location, setLocation] = React.useState("");

  return (
    <div className="container w-full space-y-4">
      <div className=" flex items-center justify-center">
        <h1 className="text-3xl font-semibold tracking-tight transition-colors">
          Please enter your address.
        </h1>
      </div>

      <form
        className="flex items-center justify-center"
        action={CreateAddressPage}
      >
        <Input type="hidden" name="roomId" value={params.slug} />
        <Input type="hidden" name="countryValue" value={location} />
        <div className="w-full max-w-lg">
          <div className="mb-5">
            <Select required onValueChange={(value) => setLocation(value)}>
              <SelectTrigger className="p-3 border rounded-md">
                <SelectValue placeholder="Select a Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Country</SelectLabel>
                  {getAllCountries().map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.flag} {country.label} / {country.region}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <LazyMap locationValue={location} />
        </div>
        <div className="fixed w-full bottom-0 z-10 bg-white border-t h-20">
          <div className="flex items-center justify-between mx-auto px-5 lg:px-10 h-full">
            <Button variant="secondary" size="lg">
              Cancel
            </Button>
            <SubmitButtons />
          </div>
        </div>
        <CancelButtons />
      </form>
    </div>
  );
}
