"use client";

import {Button} from "../../ui/button";
import {CartItem} from "@/utils/types/cart";
import CartComponent from "@/components/common/cartComponent";
interface CartPageProps {
 Data: CartItem[];
 Token: string;
 lang: string;
}
export default function CartPage({Data, Token, lang}: CartPageProps) {
 if (Data.length === 0) {
  return (
   <div className="flex h-[50vh] w-1/2 mx-auto items-center justify-center bg-gray-100 mt-10">
    <div className="flex flex-col items-center gap-4">
     <p>{lang === "fa" ? "چیزی در لیست خرید موجود نیست" : "Your shopping list is empty"}</p>
     <Button>{lang === "fa" ? "برو به فروشگاه" : "Go to Shop"}</Button>
    </div>
   </div>
  );
 }
 return (
  <div className="relative">
   <CartComponent Data={Data} Token={Token ?? ""} />
  </div>
 );
}
