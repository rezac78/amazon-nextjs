"use client";
import {Button} from "@/components/ui/button";

export default function CartPage() {
 return (
  <div className="flex h-[50vh] w-1/2 mx-auto items-center justify-center bg-gray-100 mt-10">
   <div className="flex flex-col items-center gap-4">
    <p>چیزی در لیست خرید موجود نیست</p>
    <Button>برو به فروشگاه</Button>
   </div>
  </div>
 );
}
