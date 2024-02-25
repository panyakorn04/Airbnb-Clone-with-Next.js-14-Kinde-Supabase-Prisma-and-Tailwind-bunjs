import SubmitButtons from "@/components/submit-buttons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader } from "@/components/ui/card";
import { Counter } from "@/components/counter";
import { CancelButtons } from "@/components/cancel-buttons";
import { CreateDescriptionPage } from "@/app/actions";

export default function DescriptionPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div className="container pb-10">
      <div className=" flex items-center justify-center">
        <h1 className="text-3xl font-semibold tracking-tight transition-colors">
          Please describe your room as good as you can.
        </h1>
      </div>
      <form
        action={CreateDescriptionPage}
        className="my-10 flex items-center flex-col justify-center gap-y-4"
      >
        <Input type="hidden" name="roomId" value={params.slug} />
        <div className="w-full max-w-md">
          <Label>Title</Label>
          <Input
            type="text"
            required
            name="name"
            placeholder="title"
            className=" p-3 border rounded-md"
          />
        </div>
        <div className="w-full max-w-md">
          <Label>Description</Label>
          <Textarea
            name="description"
            placeholder="Description"
            className=" p-3 border rounded-md "
            required
          />
        </div>
        <div className="w-full max-w-md">
          <Label>Price</Label>
          <Input
            required
            type="number"
            name="price"
            placeholder="Price"
            className=" p-3 border rounded-md"
            min={10}
          />
        </div>
        <div className="w-full max-w-md">
          <Label>Image</Label>
          <Input
            type="file"
            name="image"
            placeholder="image"
            required
            className=" p-3 border rounded-md"
          />
        </div>
        <Card className="w-full max-w-md">
          <CardHeader className="flex flex-col gap-y-5">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h3 className="underline font-medium">Guests</h3>
                <p className="text-muted-foreground text-sm">
                  How many guests do you want?
                </p>
              </div>
              <Counter name="guests" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h3 className="underline font-medium">Bedroom</h3>
                <p className="text-muted-foreground text-sm">
                  How many rooms do you have?
                </p>
              </div>
              <Counter name="bedroom" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h3 className="underline font-medium">Bathroom</h3>
                <p className="text-muted-foreground text-sm">
                  How many bathrooms do you have?
                </p>
              </div>
              <Counter name="bathroom" />
            </div>
          </CardHeader>
        </Card>
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
