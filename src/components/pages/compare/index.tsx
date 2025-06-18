"use client";

import {Button} from "@/components/ui/button";
import TrashIcon from "@/public/icons/Trash";
import {removeAllCompareProducts, removeFromCompareProduct} from "@/utils/fetchProduct";
import {Product} from "@/utils/types/types";
import Image from "next/image";
import React, {useState} from "react";
import {toast} from "sonner";

export default function Compare({Data = [], Token}: {Data: Product[]; Token: string}) {
 const [products, setProducts] = useState(Data);

 const attributes = ["brand", "weight", "description"]; // حذف price و name از attributes
 const handleRemoveFromCompare = async (id: number) => {
  const success = await removeFromCompareProduct(id, Token);
  if (success) {
   setProducts((prev) => prev.filter((item) => item.id !== id));
  } else {
   toast.error("حذف از مقایسه ناموفق بود");
  }
 };

 const handleRemoveAll = async () => {
  const success = await removeAllCompareProducts(Token);
  if (success) {
   setProducts([]); // فقط خالی کردن استیت
  } else {
   toast.error("حذف همه ناموفق بود");
  }
 };
 return (
  <div className="container mx-auto px-2 md:px-4 py-8 text-center">
   {/* هدر */}
   <div className="flex items-center justify-between mb-6">
    <h1 className="text-2xl font-semibold">مقایسه محصولات</h1>
    <Button onClick={handleRemoveAll} variant="default" className="flex items-center gap-2">
     <TrashIcon /> حذف همه
    </Button>
   </div>
   {products.length === 0 ? (
    <p className="text-gray-500 text-sm mt-12">چیزی در لیست مقایسه نیست.</p>
   ) : (
    <div className="grid grid-cols-2 md:grid-cols-4 md:gap-2 text-center">
     {products.slice(0, 4).map((product, index) => (
      <div key={index} className="border-t md:border  odd:border-l p-2 md:p-4 md:rounded-lg">
       {/* تصویر و نام و قیمت */}
       <div className="relative aspect-square bg-gray-100 rounded-lg shadow-sm mb-4 mx-auto">
        {product.images?.[0]?.url ? (
         <Image src={product.images[0].url} alt={product.name} fill className="object-contain rounded-md" />
        ) : (
         <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">بدون تصویر</div>
        )}
        <button
         onClick={() => handleRemoveFromCompare(product.id)}
         className="absolute top-2 left-2 w-6 h-6 flex items-center justify-center bg-white border border-gray-300 text-sm rounded-full hover:bg-red-100 hover:text-red-600 shadow-sm transition"
        >
         ✖
        </button>
       </div>

       <div className="text-center text-sm text-gray-700 h-[60px]">
        <div className="text-xs mb-1">{product.name}</div>
        <div className="font-bold text-xs md:text-lg text-black">{product.price?.toLocaleString()} تومان</div>
       </div>

       {/* ویژگی‌ها */}
       <div className="mt-4">
        {attributes.map((attr) => (
         <div key={attr} className="mb-4">
          <div className="font-semibold text-sm text-gray-600 border-t pt-4 text-right md:pr-2">
           {attr === "brand" ? "برند" : attr === "weight" ? "وزن" : attr === "description" ? "توضیحات" : attr}
          </div>
          <div className="text-sm text-gray-700 text-justify leading-relaxed">
           {(product as never)[attr] ? (
            attr === "description" ? (
             <div
              className="text-justify md:leading-[2rem] text-xs md:text-md"
              dangerouslySetInnerHTML={{
               __html: (product as never)[attr],
              }}
             />
            ) : (
             (product as never)[attr]
            )
           ) : (
            <span className="text-gray-400">—</span>
           )}
          </div>
         </div>
        ))}
       </div>
      </div>
     ))}
    </div>
   )}
  </div>
 );
}
