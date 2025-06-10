"use client";
import AddressIcon from "@/public/icons/Address";
import UsersIcon from "@/public/icons/Users";
import {logoutCustomer} from "@/utils/authUsers";
import {CustomerInfo} from "@/utils/types";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
interface ProfileLayoutProps {
 ProfileInfoData: CustomerInfo;
 Token: string;
}
export default function ProfileLayoutComponent({ProfileInfoData, Token}: ProfileLayoutProps) {
 const router = useRouter();

 const handleLogout = async () => {
  try {
   const result = await logoutCustomer(Token);
   if (result) {
    await fetch("/api/auth/remove-token", {method: "POST"});
    toast.success(result || "خروج موفق بود.");
    router.push("/auth/signin");
   } else {
    toast.error(result || "خروج با خطا مواجه شد.");
   }
  } catch (err: unknown) {
   if (err instanceof Error) {
    toast.error(err.message || "خطا در خروج.");
   } else {
    toast.error("خطای ناشناخته‌ای رخ داد.");
   }
  }
 };
 return (
  <aside className="lg:w-1/4 w-full bg-white shadow-md rounded-xl p-4">
   <div className="text-center mb-4">
    <div className="rounded-lg border p-4">
     <p className="font-bold text-xl">سلام! {ProfileInfoData.first_name}</p>
     <p className="text-gray-600 text-sm">{ProfileInfoData.email}</p>
    </div>
   </div>
   <ul className="space-y-2 text-sm">
    <Link href={"/profile"}>
     <li className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer`}>
      <UsersIcon />
      پروفایل
     </li>
    </Link>
    <Link href={"/profile/address"}>
     <li className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer`}>
      <AddressIcon /> آدرس‌ها
     </li>
    </Link>
    <li className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
     {/* <Calendar size={18} /> */}
     سفارش‌ها
    </li>
    <li className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
     {/* <Download size={18} /> */}
     محصولات قابل دانلود
    </li>
    <li className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
     {/* <Star size={18} /> */}
     نظرات
    </li>
    <li className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
     {/* <Heart size={18} /> */}
     لیست علاقه‌مندی‌ها
    </li>
    <li onClick={handleLogout} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
     {/* <Heart size={18} /> */}
     خروج
    </li>
   </ul>
  </aside>
 );
}
