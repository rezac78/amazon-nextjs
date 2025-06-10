"use client";

import {useState} from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {toast} from "sonner";
import {forgotPassword} from "@/utils/profile/proFileInfo/profile";
import Link from "next/link";
export default function ForgotPasswordPage() {
 const [form, setForm] = useState({
  email: "",
 });

 const [errors, setErrors] = useState<Record<string, string>>({});

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const {name, value, type, checked} = e.target;
  setForm({
   ...form,
   [name]: type === "checkbox" ? checked : value,
  });
 };
 const validateForm = () => {
  const newErrors: Record<string, string> = {};

  if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "فرمت ایمیل معتبر نیست.";

  return newErrors;
 };
 const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();
  const validationErrors = validateForm();
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length > 0) return;

  try {
   const result = await forgotPassword(form.email);
   if (result.success) {
    toast.success(result.message || "ایمیل بازیابی ارسال شد.");
   } else {
    toast.error(result.message || "خطا در ارسال ایمیل بازیابی.");
   }
  } catch (err: unknown) {
   if (err instanceof Error) {
    toast.error(err.message || "خطا در بازیابی رمز.");
   } else {
    toast.error("خطای ناشناخته‌ای رخ داد.");
   }
  }
 };

 return (
  <div className=" w-[550px] mx-auto flex items-center justify-center p-4">
   <div className="bg-primary/80 text-primary-foreground w-full rounded-xl shadow-md p-6">
    <h2 className="text-2xl font-semibold text-center mb-6">بازیابی رمز عبور</h2>
    <span>اگر رمز عبور خود را فراموش کرده‌اید، با وارد کردن آدرس ایمیل خود آن را بازیابی کنید.</span>
    <form onSubmit={handleRegister} className="space-y-4">
     <div className="">
      <Label className="block text-sm font-medium" htmlFor="email">
       ایمیل
      </Label>
      <Input
       id="email"
       name="email"
       type="email"
       onChange={handleChange}
       value={form.email}
       className="bg-gray-100 mt-2 text-black"
      />
      {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
     </div>
     {errors.agreement && <p className="text-sm text-red-600 mt-1">{errors.agreement}</p>}
     <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition">
      بازنشانی رمز عبور
     </button>
    </form>
    <div className="mt-6 text-sm text-center text-gray-600">
     بازگشت به صفحه ورود؟
     <Link href="/auth/signup" className="text-blue-600 hover:underline">
      ورود
     </Link>
    </div>
   </div>
  </div>
 );
}
