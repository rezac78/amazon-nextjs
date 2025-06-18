"use client";
import ProductCard from "@/components/common/ProductCard";
import {Button} from "@/components/ui/button";
import {ProductSliderItem} from "@/utils/types/types";
interface ProductCardProps {
 Data: ProductSliderItem[];
 Token: string;
}
export default function FavoritePage({Data, Token}: ProductCardProps) {
 if (Data.length === 0) {
  return (
   <div className="flex h-[50vh] w-1/2 mx-auto items-center justify-center bg-gray-100 mt-10">
    <div className="flex flex-col items-center gap-4">
     <p>چیزی در لیست خرید موجود نیست</p>
     <Button>برو به فروشگاه</Button>
    </div>
   </div>
  );
 }
 return (
  <div className="relative">
   <ProductCard products={Data} Token={Token} />
  </div>
 );
}
