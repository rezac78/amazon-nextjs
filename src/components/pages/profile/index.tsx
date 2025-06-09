"use client";

import {useRouter} from "next/navigation";
import {logoutCustomer} from "@/utils/authUsers";
import {useState} from "react";
import {toast} from "sonner";
// import {UserIcon, MapPin, Calendar, Download, Star, Heart, Trash2, Edit} from "lucide-react";

interface ProfileProps {
 Token: string;
}

export default function Profile({Token}: ProfileProps) {
 const [profile] = useState({
  firstName: "Reza",
  lastName: "adcdac",
  gender: "-",
  birthdate: "-",
  email: "admin@admin.com",
 });
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
  <div className="flex flex-col lg:flex-row gap-6 container mx-auto p-4">
   {/* Sidebar */}
   <aside className="lg:w-1/4 w-full bg-white shadow-md rounded-xl p-4">
    <div className="text-center mb-4">
     <div className="rounded-lg border p-4">
      <p className="font-bold text-xl">Hello! {profile.firstName}</p>
      <p className="text-gray-600 text-sm">{profile.email}</p>
     </div>
    </div>
    <ul className="space-y-2 text-sm">
     <li className="flex items-center gap-2 p-2 rounded-lg bg-gray-100">
      {/* <UserIcon size={18} /> */}
      پروفایل
     </li>
     <li className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
      {/* <MapPin size={18} /> */}
      آدرس
     </li>
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

   {/* Profile Info */}
   <section className="flex-1 bg-white shadow-md rounded-xl p-6">
    <div className="flex justify-between items-center mb-6">
     <h2 className="text-xl font-bold">پروفایل</h2>
     <button className="px-4 py-1 rounded-md border hover:bg-gray-100">ویرایش</button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10 text-sm">
     <div>
      <p className="text-gray-500">نام</p>
      <p className="text-black">{profile.firstName}</p>
     </div>
     <div>
      <p className="text-gray-500">نام خانوادگی</p>
      <p className="text-black">{profile.lastName}</p>
     </div>
     <div>
      <p className="text-gray-500">جنسیت</p>
      <p className="text-black">{profile.gender}</p>
     </div>
     <div>
      <p className="text-gray-500">تاریخ تولد</p>
      <p className="text-black">{profile.birthdate}</p>
     </div>
     <div className="sm:col-span-2">
      <p className="text-gray-500">ایمیل</p>
      <p className="text-black">{profile.email}</p>
     </div>
    </div>

    <div className="mt-8">
     <button className="flex items-center gap-2 bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800">
      {/* <Trash2 size={18} /> */}
      حذف پروفایل
     </button>
    </div>
   </section>
  </div>
 );
}
