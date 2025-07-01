import {Product} from "@/utils/types/types";
import {useEffect, useState} from "react";

interface SpecialOfferBannerProps {
 product: Product;
}

export default function SpecialOfferBanner({product}: SpecialOfferBannerProps) {
 const [remainingTime, setRemainingTime] = useState("");
 const [showCountdown, setShowCountdown] = useState(false);

 useEffect(() => {
  if (!product.specialPriceTo) return;

  const now = new Date();
  const toDate = new Date(product.specialPriceTo);
  const timeDiff = toDate.getTime() - now.getTime();
  const oneDay = 24 * 60 * 60 * 1000;

  if (timeDiff <= oneDay && timeDiff > 0) {
   setShowCountdown(true);

   const interval = setInterval(() => {
    const newDiff = new Date(product.specialPriceTo as string).getTime() - new Date().getTime();

    if (newDiff <= 0) {
     clearInterval(interval);
     setRemainingTime("منقضی شد");
     return;
    }

    const hours = Math.floor((newDiff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((newDiff / (1000 * 60)) % 60);
    const seconds = Math.floor((newDiff / 1000) % 60);

    setRemainingTime(
     `${hours.toString().padStart(2, "0")} : ${minutes.toString().padStart(2, "0")} : ${seconds
      .toString()
      .padStart(2, "0")}`
    );
   }, 1000);

   return () => clearInterval(interval);
  }
 }, [product.specialPriceTo]);

 return (
  <div className="absolute top-0 left-0 w-full flex justify-between items-center p-2 z-[999] bg-red-300 border border-red-400 rounded-4 text-white">
   <span>پیشنهاد ویژه</span>
   <div className="text-xs">
    {showCountdown ? (
     <div style={{direction: "ltr"}}>{remainingTime}</div>
    ) : (
     <>تا تاریخ: {product.specialPriceTo && new Date(product.specialPriceTo).toLocaleDateString("fa-IR")}</>
    )}
   </div>
  </div>
 );
}
