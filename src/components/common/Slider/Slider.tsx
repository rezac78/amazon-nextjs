"use client";

import {useEffect, useState, useRef, useCallback} from "react";
import Slide from "./Slide";
import ChevronLeftIcon from "@/public/icons/ChevronLeft";
import ChevronRightIcon from "@/public/icons/ChevronRight";
import {Button} from "@/components/ui/button";

interface SliderProps {
 images: string[];
 interval?: number;
}

export default function Slider({images, interval = 5000}: SliderProps) {
 const [current, setCurrent] = useState(0);
 const timeoutRef = useRef<NodeJS.Timeout | null>(null);

 const prevSlide = () => {
  setCurrent((prev) => (prev - 1 + images.length) % images.length);
 };

 const nextSlide = useCallback(() => {
  setCurrent((prev) => (prev + 1) % images.length);
 }, [images.length]);

 useEffect(() => {
  if (!interval) return;
  timeoutRef.current = setTimeout(() => nextSlide(), interval);
  return () => {
   if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };
 }, [current, interval, nextSlide]);

 return (
  <div className="relative w-full overflow-hidden h-64 md:h-96 rounded-xl">
   <div className="relative w-full h-full">
    {images.map((img, index) => (
     <div
      key={index}
      className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out transform 
       ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
     >
      <Slide imageUrl={img} />
     </div>
    ))}
   </div>

   {/* Controls */}
   <div className="absolute inset-0 z-20 flex justify-between items-center px-4">
    <Button
     variant="ghost"
     size="icon"
     className="bg-white/70 hover:bg-white text-black rounded-full shadow"
     onClick={nextSlide}
    >
     <ChevronRightIcon className="w-6 h-6" />
    </Button>
    <Button
     variant="ghost"
     size="icon"
     className="bg-white/70 hover:bg-white text-black rounded-full shadow"
     onClick={prevSlide}
    >
     <ChevronLeftIcon className="w-6 h-6" />
    </Button>
   </div>

   {/* Dots */}
   <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 flex gap-2">
    {images.map((_, i) => (
     <button
      key={i}
      onClick={() => setCurrent(i)}
      className={`w-2.5 h-2.5 rounded-full ${i === current ? "bg-white" : "bg-white/40"}`}
     />
    ))}
   </div>
  </div>
 );
}
