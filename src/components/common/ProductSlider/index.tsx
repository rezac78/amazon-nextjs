import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
const Card = dynamic(() => import("@/components/ui/card").then((mod) => mod.Card), {ssr: false});
const CardHeader = dynamic(() => import("@/components/ui/card").then((mod) => mod.CardHeader), {ssr: false});
const CardTitle = dynamic(() => import("@/components/ui/card").then((mod) => mod.CardTitle), {ssr: false});
import {buttonVariants} from "@/components/ui/button";
import {cn} from "lib/utils";
import {ProductSliderItem} from "@/utils/types/types";
import React from "react";
import {CardContent, CardFooter} from "@/components/ui/card";
import StarIcon from "@/public/icons/star";
const Carousel = dynamic(() => import("@/components/ui/carousel").then((mod) => mod.Carousel), {ssr: false});
const CarouselContent = dynamic(() => import("@/components/ui/carousel").then((mod) => mod.CarouselContent), {
 ssr: false,
});
const CarouselItem = dynamic(() => import("@/components/ui/carousel").then((mod) => mod.CarouselItem), {ssr: false});
const CarouselNext = dynamic(() => import("@/components/ui/carousel").then((mod) => mod.CarouselNext), {ssr: false});
const CarouselPrevious = dynamic(() => import("@/components/ui/carousel").then((mod) => mod.CarouselPrevious), {
 ssr: false,
});

interface ProductCardProps {
 Data: ProductSliderItem[];
 title: string;
 link?: string;
}

export default React.memo(function ProductSlider({Data, title, link}: ProductCardProps) {
 return (
  <div className="my-10 border-t-1 border-gray-200 py-10">
   <div className="flex justify-between mb-8">
    <h2 className="text-2xl font-bold text-center">{title}</h2>
    {link && (
     <Link href={link} className={cn(buttonVariants())}>
      نمایش همه
     </Link>
    )}
   </div>
   <div className="px-12 md:px-6">
    <Carousel opts={{align: "start"}} className="w-full">
     <CarouselContent>
      {[...Data, ...Data].map((product, i) => (
       <CarouselItem key={i}>
        <Link
         onClick={() => {
          localStorage.setItem("lastProductId", String(product.id));
         }}
         href={`/${product.url_key}`}
         className=""
        >
         <Card className="group relative flex flex-col justify-between w-[280px] h-[340px] bg-[#FFFFFF] border border-[#E8E8E8]">
          <CardHeader className="flex-1 w-full">
           <div className="w-[150px] h-[150px] relative mx-auto">
            <Image
             src={
              product?.images?.[0]?.large_image_url
               ? product.images[0].large_image_url.replace("/cache/large/", "/storage/")
               : product?.images?.[0]?.url || "/defult.avif"
             }
             alt={product.name}
             width={150}
             height={150}
             sizes="(max-width: 768px) 100vw, 150px"
             className="object-contain"
             loading="lazy"
            />
           </div>
          </CardHeader>
          <CardContent className="flex-1">
           <CardTitle className="w-full text-[#4C4C4C] line-clamp-2 leading-relaxed text-[12px] min-h-[48px] font-medium">
            {product.name}
           </CardTitle>
          </CardContent>
          <CardFooter className="flex justify-between">
           <div className="flex item-center gap-1">
            <StarIcon className="text-[#E4E82E] w-3 h-3" />
            <span className="text-xs font-medium text-[#4C4C4C]">4.5</span>
           </div>
           {product.price && (
            <div className="flex items-center justify-end gap-1 mt-auto text-[#4C4C4C]">
             <span className="text-[14px] font-bold">{product.price}</span>
             <span className="text-[14px] font-semibold">هزارتومان</span>
            </div>
           )}
          </CardFooter>
         </Card>
        </Link>
       </CarouselItem>
      ))}
     </CarouselContent>
     <CarouselPrevious />
     <CarouselNext />
    </Carousel>
   </div>
  </div>
 );
});
