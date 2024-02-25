"use client";

import React, { useState } from "react";
import { Calendar } from "./ui/calendar";
import { eachDayOfInterval } from "date-fns";

export function SelectCalender({
  reservations,
}: {
  reservations:
    | {
        startDate: Date;
        endDate: Date;
      }[]
    | undefined;
}) {
  const today = new Date();
  // check if the date is today or in the past
  const [data, setData] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  let disabledDates: Date[] = [];
  reservations?.forEach((reservationItem) => {
    const dateRange = eachDayOfInterval({
      start: new Date(reservationItem.startDate),
      end: new Date(reservationItem.endDate),
    });

    disabledDates = [...disabledDates, ...dateRange];
  });

  const minDate = (date: Date) => date < today;

  return (
    <>
      <input
        type="hidden"
        name="startDate"
        value={data[0].startDate.toISOString()}
      />
      <input
        type="hidden"
        name="endDate"
        value={data[0].endDate.toISOString()}
      />
      <Calendar
        mode="range"
        disabled={disabledDates}
        selected={{ from: data[0].startDate, to: data[0].endDate }}
        onSelect={
          (range) => {
            setData([
              {
                startDate: range?.from ?? new Date(),
                endDate: range?.to ?? new Date(),
                key: "selection",
              },
            ]);
          }
          // disabledDates={disabledDates}
        }
      />
    </>
  );
}
