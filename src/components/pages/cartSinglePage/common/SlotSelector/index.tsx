"use client";

import {BookingProduct} from "@/utils/types/types";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject, {type DateObject as DateObjectType} from "react-multi-date-picker";
import "react-multi-date-picker/styles/layouts/mobile.css";

interface SlotSelectorProps {
 bookings: BookingProduct[];
 selectedDate: DateObjectType | null;
 setSelectedDate: (val: DateObjectType | null) => void;
 value?: {date: string; slot: string | null} | null;
 onChange?: (val: {date: string; slot: string | null}) => void;
 error?: string;
}

export default function SlotSelector({
 bookings,
 selectedDate,
 setSelectedDate,
 onChange,
 value,
 error,
}: SlotSelectorProps) {
 const booking = bookings[0];
 const {tableSlot, availableFrom, availableTo} = booking || {};
 const {slots = []} = tableSlot || {};

 if (!availableFrom || !availableTo || slots.length === 0) return null;

 const from = new Date(availableFrom);
 const to = new Date(availableTo);

 const isWithinRange = (date: DateObjectType) => {
  const jsDate = date.toDate();
  return jsDate >= from && jsDate <= to;
 };

 const getDayName = (date: Date) => date.toLocaleDateString("en-US", {weekday: "long"});

 const isBefore15 = (timeStr: string) => {
  const [hour] = timeStr.split(":").map(Number);
  return hour < 15;
 };

 const getFilteredSlots = (date: DateObjectType) => {
  const jsDate = date.toDate();
  const day = getDayName(jsDate);
  if (day === "Friday") return [];
  return day === "Thursday" ? slots.filter((slot) => isBefore15(slot.to)) : slots;
 };

 const handleDateChange = (val: DateObjectType) => {
  setSelectedDate(val);
  onChange?.({
   date: val.toDate().toISOString().split("T")[0],
   slot: null,
  });
 };

 return (
  <div className="mt-4 space-y-3 text-sm">
   <div>
    <label className="block mb-1 font-medium">تاریخ رزرو</label>
    <DateObject
     value={selectedDate}
     onChange={handleDateChange}
     locale={persian_fa}
     calendar={persian}
     calendarPosition="bottom-right"
     inputClass="w-full px-3 py-2 border border-gray-300 rounded"
     numberOfMonths={1}
     mapDays={({date}) => {
      const jsDate = date.toDate();
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return jsDate < today ? {disabled: true, className: "opacity-40 cursor-not-allowed"} : {};
     }}
    />
   </div>

   {selectedDate && isWithinRange(selectedDate) ? (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
     {getFilteredSlots(selectedDate).map((slot, i) => {
      const dateStr = selectedDate.toDate().toISOString().split("T")[0];
      const [year, month, day] = dateStr.split("-").map(Number);
      const [fromHour, fromMin] = slot.from.split(":").map(Number);
      const [toHour, toMin] = slot.to.split(":").map(Number);

      const fromDate = new Date(year, month - 1, day, fromHour, fromMin);
      const toDate = new Date(year, month - 1, day, toHour, toMin);
      const slotValue = `${Math.floor(fromDate.getTime() / 1000)}-${Math.floor(toDate.getTime() / 1000)}`;

      const isSelected = value?.date === dateStr && value?.slot === slotValue;

      return (
       <button
        key={i}
        type="button"
        className={`px-2 py-1 border text-center rounded ${
         isSelected ? "bg-blue-600 text-white border-blue-600" : "bg-white border-gray-300 hover:bg-gray-100"
        }`}
        onClick={() =>
         onChange?.({
          date: dateStr,
          slot: slotValue,
         })
        }
       >
        {slot.to} - {slot.from}
       </button>
      );
     })}
    </div>
   ) : selectedDate ? (
    <div className="text-red-600 text-sm border border-red-200 bg-red-50 p-2 rounded">
     در این بازه اسلاتی موجود نیست
    </div>
   ) : null}

   {error && <p className="text-xs text-red-600">{error}</p>}
  </div>
 );
}
