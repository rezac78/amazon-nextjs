"use client";
import {useState} from "react";
import CalendarDaysIcon from "@/public/icons/CalendarDays";
import {Slot} from "@/utils/types/types";

type Booking = {
 tableSlot?: {
  slots?: Slot[];
 };
 availableFrom?: string;
 availableTo?: string;
};

export default function BookingDaysSchedule({booking}: {booking: Booking}) {
 const [showAllDays, setShowAllDays] = useState(false);

 const {tableSlot, availableFrom, availableTo} = booking || {};
 const {slots = []} = tableSlot || {};

 if (!availableFrom || !availableTo || !Array.isArray(slots) || slots.length === 0) return null;

 const getAllDates = (from: string, to: string): string[] => {
  const start = new Date(from);
  const end = new Date(to);
  const dates: string[] = [];

  const current = new Date(start);
  while (current <= end) {
   dates.push(current.toISOString().split("T")[0]); // YYYY-MM-DD
   current.setDate(current.getDate() + 1);
  }

  return dates;
 };

 const allDates = getAllDates(availableFrom, availableTo);

 const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const dayName = date.toLocaleDateString("fa-IR", {weekday: "long"});
  return `${dayName}`;
 };

 const getDayName = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("en-US", {weekday: "long"});
 };

 const isBefore15 = (timeStr: string) => {
  const [hour] = timeStr.split(":").map(Number);
  return hour < 15;
 };

 return (
  <div className="mt-1 border border-gray-200 rounded-lg overflow-hidden text-sm">
   <button
    className="w-full px-4 py-2 bg-blue-100 text-blue-800 font-semibold flex justify-between items-center"
    onClick={() => setShowAllDays(!showAllDays)}
   >
    <span>نمایش برای همه روزها</span>
    <span>{showAllDays ? "▲" : "▼"}</span>
   </button>

   {showAllDays && (
    <div className="divide-y divide-gray-200">
     {allDates.map((date, idx) => {
      const dayName = getDayName(date);
      if (dayName === "Friday") return null;

      // Filter Thursday slots
      const filteredSlots = dayName === "Thursday" ? slots.filter((slot: Slot) => isBefore15(slot.to)) : slots;

      if (filteredSlots.length === 0) return null;

      return (
       <div key={idx} className="px-4 py-3 flex justify-between">
        <div className="font-semibold text-blue-700 flex items-start  gap-2">
         <CalendarDaysIcon className="w-4 h-4 text-blue-600" />
         {formatDate(date)}
        </div>
        <ul className="space-y-1">
         {filteredSlots.map((slot: Slot, i: number) => (
          <li key={i}>
           <span className="text-gray-700">
            {slot.to} - {slot.from}
           </span>
          </li>
         ))}
        </ul>
       </div>
      );
     })}
    </div>
   )}
  </div>
 );
}
