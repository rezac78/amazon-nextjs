"use client";
import ProductCard from "@/components/common/ProductCard";
import {Button} from "@/components/ui/button";
import {ProductSliderItem} from "@/utils/types/types";
interface ProductCardProps {
 Data: ProductSliderItem[];
 Token: string;
 lang: string;
}
export default function FavoritePage({Data, Token, lang}: ProductCardProps) {
 if (Data.length === 0) {
  return (
   <div className="flex h-[50vh] w-1/2 mx-auto items-center justify-center bg-gray-100 mt-10">
    <div className="flex flex-col items-center gap-4">
     <p>{lang === "fa" ? "چیزی در لیست خرید موجود نیست" : "Nothing in your shopping list"}</p>
     <Button>{lang === "fa" ? "برو به فروشگاه" : "Go to Shop"}</Button>
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
