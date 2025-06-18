"use client";
import AddressIcon from "@/public/icons/Address";
import CalendarIcon from "@/public/icons/Calendar";
import HeartIcon from "@/public/icons/Heart";
import LogOutIcon from "@/public/icons/LogOut";
import UsersIcon from "@/public/icons/Users";
import {useAuth} from "@/store/useAuth";
import {logoutCustomer} from "@/utils/authUsers";
import {CustomerInfo} from "@/utils/types/types";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {toast} from "sonner";
interface ProfileLayoutProps {
 ProfileInfoData: CustomerInfo;
 Token: string;
}
export default function ProfileLayoutComponent({ProfileInfoData, Token}: ProfileLayoutProps) {
 const router = useRouter();
 const [loading, setLoading] = useState(false);
 const handleLogout = async () => {
  setLoading(true);
  try {
   const result = await logoutCustomer(Token);
   if (result) {
    await fetch("/api/auth/remove-token", {method: "POST"});
    toast.success(result || "خروج موفق بود.");
    useAuth.getState().setLoggedIn(false);
    router.push("/auth/signin");
   } else {
    toast.error(result || "خروج با خطا مواجه شد.");
   }
   setLoading(false);
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
    <Link href={"/profile/calendar"}>
     <li className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
      <CalendarIcon />
      سفارش‌ها
     </li>
    </Link>
    <Link href={"/profile/favorite"}>
     <li className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
      <HeartIcon />
      لیست علاقه‌مندی‌ها
     </li>
    </Link>
    <li onClick={handleLogout} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
     <LogOutIcon />
     {!loading ? (
      "خروج"
     ) : (
      <svg
       className="animate-spin h-4 w-4 mr-2 text-current"
       xmlns="http://www.w3.org/2000/svg"
       fill="none"
       viewBox="0 0 24 24"
      >
       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
      </svg>
     )}
    </li>
   </ul>
  </aside>
 );
}
