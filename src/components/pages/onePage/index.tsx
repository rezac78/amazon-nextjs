import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {CartItem} from "@/utils/types/cart";
import Image from "next/image";
interface CartPageProps {
 Data: CartItem[];
 Token: string;
}
export default function CheckoutPage({Data}: CartPageProps) {
 return (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 lg:p-8">
   {/* Left - Order Summary */}
   <div className="flex flex-col gap-6 col-span-2">
    <h2 className="text-xl font-semibold">اطلاعات پرداخت و آدرس</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
     <div>
      <Label htmlFor="company">نام شرکت</Label>
      <Input id="company" placeholder="مثلاً دیجی‌کالا" />
     </div>
     <div>
      <Label htmlFor="firstName">نام</Label>
      <Input id="firstName" placeholder="مثلاً زهرا" />
     </div>
     <div>
      <Label htmlFor="lastName">نام خانوادگی</Label>
      <Input id="lastName" placeholder="مثلاً میربک" />
     </div>
     <div className="sm:col-span-2">
      <Label htmlFor="email">ایمیل</Label>
      <Input id="email" placeholder="مثلاً example@mail.com" type="email" />
     </div>
     <div className="sm:col-span-2">
      <Label htmlFor="address">آدرس خیابان</Label>
      <Input id="address" placeholder="خیابان ولیعصر، پلاک ۱۲۳" />
     </div>
     <div>
      <Label htmlFor="country">کشور</Label>
      <Input id="country" placeholder="ایران" />
     </div>
     <div>
      <Label htmlFor="state">استان</Label>
      <Input id="state" placeholder="تهران" />
     </div>
     <div>
      <Label htmlFor="city">شهر</Label>
      <Input id="city" placeholder="تهران" />
     </div>
     <div>
      <Label htmlFor="postal">کد پستی</Label>
      <Input id="postal" placeholder="۱۲۳۴۵۶۷۸۹۰" />
     </div>
     <div className="sm:col-span-2">
      <Label htmlFor="phone">شماره تلفن</Label>
      <Input id="phone" placeholder="۰۹۱۲۳۴۵۶۷۸۹" />
     </div>
    </div>

    <div className="flex items-center gap-2">
     <Checkbox id="saveAddress" />
     <Label htmlFor="saveAddress" className="text-sm">
      ذخیره در دفتر آدرس من
     </Label>
    </div>
   </div>
   <div className="flex flex-col gap-6 col-span-1">
    <h2 className="text-xl font-semibold">خلاصه سبد خرید</h2>

    {/* Product Summary */}
    <div className="flex gap-2 overflow-auto">
     {Data.map((e, i) => {
      const imageSrc =
       e.product.images[0]?.large_image_url?.replace("/cache/large/", "/storage/") ||
       e.product.images[0]?.url ||
       "/default.avif";
      return (
       <div key={i} className="flex flex-col gap-4 border rounded-xl p-4">
        <div className="flex flex-col gap-4 items-center">
         <Image src={imageSrc} alt={e.name} width={120} height={120} className="w-20 h-20 rounded-lg object-cover" />
         <div className="flex-1">
          <p className="font-medium text-justify text-sm w-40">{e.name}</p>
          <p className="text-xs text-gray-500">تعداد: ۲</p>
         </div>
         <div className="font-semibold">{e.product.formatted_price}</div>
        </div>
       </div>
      );
     })}
    </div>
    <div className="border rounded-xl p-4 text-sm space-y-2">
     <div className="flex justify-between">
      <span>جمع جزء</span>
      <span>۵۰۰٬۰۰۰ ﷼</span>
     </div>
     <div className="flex justify-between">
      <span>تخفیف</span>
      <span>-۵۰٬۰۰۰ ﷼</span>
     </div>
     <div className="flex justify-between">
      <span>هزینه ارسال</span>
      <span>۳۰٬۰۰۰ ﷼</span>
     </div>
     <div className="flex justify-between border-t pt-2">
      <span>مالیات</span>
      <span>۱۰٬۰۰۰ ﷼</span>
     </div>
     <div className="flex justify-between font-bold text-base border-t pt-2">
      <span>مجموع کل</span>
      <span>۴۹۰٬۰۰۰ ﷼</span>
     </div>
    </div>
   </div>
   <Button className="w-full mt-4">ذخیره</Button>
  </div>
 );
}
