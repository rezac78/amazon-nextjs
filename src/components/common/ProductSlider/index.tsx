"use client";
import Image from "next/image";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {Card, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {ProductRelatedProducts} from "@/utils/types";

interface ProductCardProps {
 Data: ProductRelatedProducts[];
}
export default function ProductSlider({Data}: ProductCardProps) {
 return (
  <div className="w-[85%] md:w-full my-10 border-t-1 border-gray-200">
   <h2 className="text-lg font-bold my-4">محصولات مرتبط</h2>
   <Carousel opts={{align: "start"}} className="w-full">
    <CarouselContent>
     {Data.map((product) => (
      <CarouselItem key={product.id} className="md:basis-1/3 lg:basis-1/5">
       <Link href={`/cart/${product.id}`} key={product.id} className="">
        <Card className="group relative flex flex-col justify-between bg-background border border-border min-h-[300px]">
         <CardHeader className="flex-1">
          <Image
           src={product?.images[0]?.url}
           alt={product.name}
           width={300}
           height={300}
           sizes="(max-width: 768px) 100vw, 300px"
           className="object-contain w-40 h-40 mx-auto"
          />

          <hr className="pb-2 text-gray-200" />
          <CardTitle>{product.name}</CardTitle>
          {product.price && (
           <div className="flex items-center justify-end gap-1 text-card-foreground">
            <span className="text-18px font-bold">{product.price}</span>
            <span className="text-14px font-semibold">هزارتومان</span>
           </div>
          )}
         </CardHeader>
         <CardFooter>
          <Button className="w-full">اضافه کردن به سبد</Button>
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
 );
}
