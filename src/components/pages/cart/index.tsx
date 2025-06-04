"use client";

import {useStore} from "@/store/useCounter";
import {Button} from "../../ui/button";
import ProductCard from "@/components/common/ProductCard";

export default function CartPage() {
 const {cart} = useStore();
 if (cart.length === 0) {
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
   <ProductCard products={cart} />
  </div>
 );
}
