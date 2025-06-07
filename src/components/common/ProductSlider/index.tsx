"use client";
import Image from "next/image";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {cn} from "lib/utils";
import { ProductSliderItem } from "@/utils/types";

interface ProductCardProps {
 Data: ProductSliderItem[];
 title: string;
 link?: string;
}
export default function ProductSlider({Data, title, link}: ProductCardProps) {
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
      {Data.map((product) => (
       <CarouselItem key={product.id} className="">
        <Link href={`/${product.id}`} key={product.id} className="p-0">
         <Card className="group relative flex flex-col justify-between bg-background border border-border w-[250px] min-h-[350px]">
          <CardHeader className="flex-1">
           <Image
            src={
             product?.images?.[0]?.large_image_url
              ? product.images[0].large_image_url.replace("/cache/large/", "/storage/")
              : product?.images?.[0]?.url || "/default.avif"
            }
            alt={product.name}
            width={150}
            height={150}
            sizes="(max-width: 768px) 100vw, 150px"
            className="object-contain w-[150px] h-[150px] mx-auto"
           />

           <CardTitle>{product.name}</CardTitle>
           {product.price && (
            <div className="flex items-center justify-end gap-1 text-card-foreground">
             <span className="text-18px font-bold">{product.price}</span>
             <span className="text-14px font-semibold">هزارتومان</span>
            </div>
           )}
          </CardHeader>
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
}
