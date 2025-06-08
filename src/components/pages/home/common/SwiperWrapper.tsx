"use client";
import {useEffect, useRef, useState} from "react";
import dynamic from "next/dynamic";
import SwiperSkeleton from "@/components/common/SkeletonComponent/SwiperSkeleton";

const SwiperCommon = dynamic(() => import("../common/Swiper"), {
 ssr: false,
});

export default function SwiperWrapper() {
 const [showSwiper, setShowSwiper] = useState(false);
 const ref = useRef<HTMLDivElement>(null);

 useEffect(() => {
  const element = ref.current; // ✅ ذخیره فعلی مقدار ref

  if (!element) return;

  const observer = new IntersectionObserver(
   (entries, obs) => {
    if (entries[0].isIntersecting) {
     setShowSwiper(true);
     obs.disconnect(); // فقط یک‌بار اجرا شه
    }
   },
   {threshold: 0.1}
  );

  observer.observe(element);

  return () => {
   observer.unobserve(element); // ✅ از element استفاده کن، نه ref.current
  };
 }, []);

 return (
  <div ref={ref} className="h-96 md:h-[400px]">
   {showSwiper ? <SwiperCommon /> : <SwiperSkeleton />}
  </div>
 );
}
