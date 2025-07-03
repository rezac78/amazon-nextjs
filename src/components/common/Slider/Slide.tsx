import Image from "next/image";
import React from "react";

interface SlideProps {
 imageUrl: string;
 alt?: string;
 index?: number;
}

export default React.memo(function Slide({imageUrl, index, alt = "Slide Image"}: SlideProps) {
 return (
  <div className="w-full h-[200px] md:h-[400px] relative flex items-center justify-center overflow-hidden">
   <Image src={imageUrl} alt={alt} fill priority={index === 0} sizes="(max-width: 768px) 100vw, 1200px" className="" />
  </div>
 );
});
