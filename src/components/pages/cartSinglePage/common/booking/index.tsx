import CalendarDaysIcon from "@/public/icons/CalendarDays";
import MapPinIcon from "@/public/icons/MapPin";
import BookingDaysSchedule from "../BookingDaysSchedule";
import SlotSelector from "../SlotSelector";
import {Product} from "@/utils/types/types";
import {type DateObject as DateObjectType} from "react-multi-date-picker";

type BookingSectionProps = {
 bookings: Product;
 selectedDate: DateObjectType | null;
 setSelectedDate: (val: DateObjectType | null) => void;
 selectedSlot: {date: string; slot: string | null} | null;
 setSelectedSlot: (val: {date: string; slot: string | null} | null) => void;
};

export default function BookingSection({
 bookings,
 selectedDate,
 setSelectedDate,
 selectedSlot,
 setSelectedSlot,
}: BookingSectionProps) {
 if (!Array.isArray(bookings.booking) || bookings.booking.length === 0) return null;
 return (
  <div className="space-y-6 mt-6">
   {bookings?.booking?.map(
    (booking, index) => (
     console.log("booking", booking),
     (
      <div key={booking.id || index} className="space-y-4">
       <div className="grid grid-cols-1 gap-4 text-sm">
        <div className="flex items-center gap-2">
         <MapPinIcon className="w-4 h-4 text-blue-600" />
         <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(booking.location ?? "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm"
         >
          <strong>مکان:</strong> {booking.location}
         </a>
        </div>
        <div className="flex items-center gap-2">
         <CalendarDaysIcon className="w-4 h-4 text-blue-600" />
         <span>
          <strong>مدت زمان اسلات:</strong> {booking.tableSlot?.duration ?? "-"} دقیقه
         </span>
        </div>

        <BookingDaysSchedule booking={booking} />

        <SlotSelector
         bookings={[booking]}
         selectedDate={selectedDate}
         setSelectedDate={setSelectedDate}
         value={selectedSlot}
         onChange={(val) => setSelectedSlot(val)}
         error={!selectedSlot ? "اسلات الزامی است" : ""}
        />

        {booking.defaultSlot && (
         <div>
          <strong>مدت زمان اسلات:</strong> {booking.defaultSlot.duration} دقیقه
         </div>
        )}
       </div>
      </div>
     )
    )
   )}
  </div>
 );
}
