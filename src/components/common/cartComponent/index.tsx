"use client";

import {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {Button} from "../../ui/button";
import {CartItem} from "@/utils/types/cart";
import {CustomerCartDeleted, CustomerCartDeletedAll, CustomerCartMoveWishlist, CustomerCartPUT} from "@/utils/cart";
import {toast} from "sonner";

interface CartPageProps {
 Data: CartItem[];
 Token: string;
}

export default function CartComponent({Data, Token}: CartPageProps) {
 const [coupon, setCoupon] = useState("");

 const tax = 0;
 const shipping = 0;
 const coupon_discount = 0;
 const [quantities, setQuantities] = useState<Record<number, number>>(
  Object.fromEntries(Data.map((item) => [item.id, item.quantity]))
 );
 const [committedQuantities, setCommittedQuantities] = useState<Record<number, number>>(
  Object.fromEntries(Data.map((item) => [item.id, item.quantity]))
 );
 const subtotal = Data.reduce(
  (acc, item) => acc + parseFloat(item.price) * (committedQuantities[item.id] ?? item.quantity),
  0
 );
 const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
 const total = subtotal - coupon_discount + tax + shipping;
 const [cartItems, setCartItems] = useState<CartItem[]>(Data);

 const hasItems = Data.length > 0;

 const onUpdateQty = (id: number, newQty: number) => {
  if (newQty < 1) return;
  setQuantities((prev) => ({...prev, [id]: newQty}));
 };

 const onRemoveItem = async (productId: number) => {
  try {
   await CustomerCartDeleted({product_id: productId}, Token, productId.toString());
   setQuantities((prev) => {
    const updated = {...prev};
    delete updated[productId];
    return updated;
   });

   setCommittedQuantities((prev) => {
    const updated = {...prev};
    delete updated[productId];
    return updated;
   });

   setCartItems((prev) => prev.filter((item) => item.id !== productId));
  } catch (err) {
   console.error("Remove error", err);

   toast.error("خطا در حذف آیتم از سبد خرید");
  }
 };
 const toggleSelected = (id: number) => {
  setSelectedItems((prev) => {
   const updated = new Set(prev);
   if (updated.has(id)) {
    updated.delete(id);
   } else {
    updated.add(id);
   }
   return updated;
  });
 };

 const onApplyCoupon = (code: string) => {
  console.log("Apply coupon", code);
  // apply coupon logic here
 };

 const onCheckout = () => {
  console.log("Proceed to checkout");
  // redirect to checkout
 };
 const handleRemoveSelected = async () => {
  await CustomerCartDeletedAll(Token);
  setCartItems([]);
 };

 const handleMoveToWishlist = async () => {
  const ids = Array.from(selectedItems);

  try {
   for (const id of ids) {
    await CustomerCartMoveWishlist(Token, id.toString());
    setQuantities((prev) => {
     const updated = {...prev};
     delete updated[id];
     return updated;
    });

    setCommittedQuantities((prev) => {
     const updated = {...prev};
     delete updated[id];
     return updated;
    });

    setCartItems((prev) => prev.filter((item) => item.id !== id));
   }

   toast.success("موارد با موفقیت به لیست علاقه‌مندی‌ها منتقل شدند");
   setSelectedItems(new Set());
  } catch (err) {
   console.error("Remove error", err);
   toast.error("خطا در انتقال به لیست علاقه‌مندی‌ها");
  }
 };

 const onUpdateCart = async () => {
  const payload = {
   qty: quantities,
  };

  try {
   const res = await CustomerCartPUT(payload, Token);
   if (res.errors) throw res.errors[0];
   setCommittedQuantities({...quantities});
  } catch (err) {
   console.error("Update cart error", err);
   toast.error("خطا در به‌روزرسانی سبد خرید");
  }
 };

 const Totals = () => (
  <div className="flex flex-col gap-3 text-sm w-full md:w-[35%] lg:w-[30%] border border-border/40 rounded-2xl p-6 rtl text-right">
   <h2 className="text-lg font-semibold mb-4">خلاصه سبد خرید</h2>
   <div className="flex items-center justify-between">
    <span>جمع جزء</span>
    <span>{subtotal.toLocaleString()} ﷼</span>
   </div>
   <div className="flex items-center justify-between">
    <span>
     تخفیف کد تخفیف
     <button className="text-blue-600 hover:underline mr-2" onClick={() => onApplyCoupon(coupon)}>
      اعمال کد تخفیف
     </button>
    </span>
    <span>-{coupon_discount.toLocaleString()} ﷼</span>
   </div>
   <div className="flex items-center justify-between">
    <span>هزینه ارسال</span>
    <span>{shipping.toLocaleString()} ﷼</span>
   </div>
   <div className="flex items-center justify-between">
    <span>مالیات</span>
    <span>{tax.toLocaleString()} ﷼</span>
   </div>
   <div className="flex items-center justify-between font-bold text-lg border-t pt-4 mt-2">
    <span>مجموع کل</span>
    <span>{total.toLocaleString()} ﷼</span>
   </div>
   <input
    type="text"
    placeholder="کد تخفیف"
    value={coupon}
    onChange={(e) => setCoupon(e.target.value)}
    className="border rounded-md p-2 mt-4 text-right w-full"
   />
   <Button onClick={onCheckout} className="mt-6 w-full bg-primary-900 text-white">
    ادامه به تسویه حساب
   </Button>
  </div>
 );

 const ItemRow = ({item}: {item: CartItem}) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4 border-b border-border/40">
   <input
    type="checkbox"
    className="accent-primary-600 sm:order-1 order-2"
    checked={selectedItems.has(item.id)}
    onChange={() => toggleSelected(item.id)}
   />
   <div className="w-24 h-24 relative sm:order-2 order-1">
    <Image
     src={
      item.product.base_image?.[0]?.large_image_url
       ? item.product.base_image[0].large_image_url.replace("/cache/large/", "/storage/")
       : item.product.base_image?.[0]?.url || "/defult.avif"
     }
     alt={item.name}
     fill
     className="object-contain rounded-md"
    />
   </div>
   <div className="flex-1 flex flex-col gap-2 sm:order-3 order-3">
    <Link href={`/${item.product?.url_key}`} className="font-medium hover:text-primary-700">
     {item.name}
    </Link>
    <div className="font-semibold whitespace-nowrap">
     {(parseFloat(item.price) * committedQuantities[item.id]).toLocaleString()} ﷼
    </div>

    <details className="cursor-pointer select-none">
     <summary className="text-xs text-gray-600">مشاهده جزییات</summary>
     <div className="text-xs text-gray-500 mt-2 leading-6">اطلاعات تکمیلی محصول در اینجا</div>
    </details>
   </div>
   <div className="flex items-center gap-2 sm:order-4 order-4 rtl">
    <Button
     className="w-8 h-8 border rounded"
     onClick={() => onUpdateQty(item.id, quantities[item.id] - 1)}
     disabled={quantities[item.id] <= 1}
    >
     -
    </Button>
    <span className="min-w-[2ch] text-center">{quantities[item.id]}</span>
    <Button className="w-8 h-8 border rounded" onClick={() => onUpdateQty(item.id, quantities[item.id] + 1)}>
     +
    </Button>
   </div>

   <button onClick={() => onRemoveItem(item.id)} className="text-red-600 hover:underline text-xs sm:order-6 order-5">
    حذف
   </button>
  </div>
 );

 return (
  <div className="container mx-auto px-3 md:px-6 py-8 rtl" dir="rtl">
   <nav className="text-sm mb-6 text-gray-600">
    <Link href="/" className="hover:underline">
     خانه
    </Link>
    <span className="mx-2">/</span>
    <span className="text-gray-800 font-medium">سبد خرید</span>
   </nav>

   <h1 className="sr-only">سبد خرید</h1>

   {hasItems ? (
    <div className="flex flex-col md:flex-row gap-8">
     <div className="flex-1 w-full border border-border/40 rounded-2xl p-4 overflow-x-auto">
      <div className="flex items-center justify-between mb-4">
       <span className="font-medium">{selectedItems.size} مورد انتخاب شده</span>

       {selectedItems.size > 0 && (
        <div className="flex gap-2">
         <Button size="sm" variant="outline" onClick={() => handleRemoveSelected()}>
          حذف
         </Button>
         <Button size="sm" variant="outline" onClick={() => handleMoveToWishlist()}>
          انتقال به لیست علاقه‌مندی‌ها
         </Button>
        </div>
       )}
      </div>

      {cartItems.map((item) => (
       <ItemRow key={item.id} item={item} />
      ))}

      <div className="flex justify-end mt-6">
       <Button variant="ghost" onClick={onUpdateCart} size="sm">
        به‌روزرسانی سبد خرید
       </Button>
       <Button variant="ghost" onClick={() => (location.href = "/products")}>
        ادامه خرید
       </Button>
      </div>
     </div>

     <Totals />
    </div>
   ) : (
    <div className="text-center py-24 text-gray-500">سبد خرید شما خالی است.</div>
   )}
  </div>
 );
}
