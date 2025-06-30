import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {CartItem} from "@/utils/types/cart";
import Image from "next/image";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import StarIcon from "@/public/icons/star";
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
       <div key={i} className="flex flex-col gap-2 p-2">
        <Card className="group relative flex flex-col justify-between w-[280px] h-[340px] bg-[#FFFFFF] border border-[#E8E8E8]">
         <CardHeader className="flex-1 w-full">
          <div className="w-[150px] h-[150px] relative mx-auto">
           <Image
            src={imageSrc}
            alt={e.name}
            width={150}
            height={150}
            sizes="(max-width: 768px) 100vw, 150px"
            className="object-contain"
            loading="lazy"
           />
          </div>
         </CardHeader>
         <CardContent className="flex-1">
          <CardTitle className="w-full text-[#4C4C4C] line-clamp-2 leading-relaxed text-[12px] min-h-[48px] font-medium">
           {e.name}
           <p className="text-xs text-gray-500">تعداد: ۲</p>
          </CardTitle>
         </CardContent>
         <CardFooter className="flex justify-between">
          <div className="flex item-center gap-1">
           <StarIcon className="text-[#E4E82E] w-3 h-3" />
           <span className="text-xs font-medium text-[#4C4C4C]">4.5</span>
          </div>
          {e.price && (
           <div className="flex items-center justify-end gap-1 mt-auto text-[#4C4C4C]">
            <span className="text-[14px] font-bold">{e.product.formatted_price}</span>
           </div>
          )}
         </CardFooter>
        </Card>
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