"use client";

import {Product} from "@/utils/types/types";
import BookingSection from "../booking";
import {Dispatch, SetStateAction} from "react";
import Downloadable from "../downloadable";
import {type DateObject as DateObjectType} from "react-multi-date-picker";

interface TechnicalSpecificationsProps {
 product: Product;
 selectedDownloadLink: number | null;
 setSelectedDownloadLink: Dispatch<SetStateAction<number | null>>;
 selectedDate: DateObjectType | null;
 setSelectedDate: (val: DateObjectType | null) => void;
 selectedSlot: {date: string; slot: string | null} | null;
 setSelectedSlot: Dispatch<SetStateAction<{date: string; slot: string | null} | null>>;
}
export default function TechnicalSpecifications({
 product,
 selectedDownloadLink,
 setSelectedDownloadLink,
 setSelectedDate,
 selectedDate,
 setSelectedSlot,
 selectedSlot,
}: TechnicalSpecificationsProps) {
 return (
  <div className="">
   {product.type === "downloadable" && (
    <Downloadable
     product={product}
     selectedDownloadLink={selectedDownloadLink}
     setSelectedDownloadLink={setSelectedDownloadLink}
    />
   )}
   {product.type === "booking" && (
    <BookingSection
     bookings={product}
     setSelectedDate={setSelectedDate}
     selectedDate={selectedDate}
     setSelectedSlot={setSelectedSlot}
     selectedSlot={selectedSlot}
    />
   )}
  </div>
 );
}
