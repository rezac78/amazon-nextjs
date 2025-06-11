"use client";

import {useState} from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {loginCustomer} from "@/utils/authUsers";
import {useAuth} from "@/store/useAuth";
import {Button} from "@/components/ui/button";
export default function LoginPage() {
 const [form, setForm] = useState({
  email: "",
  password: "",
 });
 const router = useRouter();

 const [errors, setErrors] = useState<Record<string, string>>({});
 const [loading, setLoading] = useState(false);

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
  if (form.password.length < 6) newErrors.password = "رمز عبور باید حداقل ۶ کاراکتر باشد.";

  return newErrors;
 };
 const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();
  const validationErrors = validateForm();
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length > 0) return;
  setLoading(true);
  try {
   const result = await loginCustomer({
    email: form.email,
    password: form.password,
    device_name: "android",
   });
   if (result) {
    await fetch("/api/auth/set-token", {
     method: "POST",
     headers: {
      "Content-Type": "application/json",
     },
     body: JSON.stringify({token: result.token}),
    });
    useAuth.getState().setLoggedIn(true);
    router.push("/");
    toast.success(result.message || "ورود موفق بود.");
   } else {
    toast.error(result?.message || "ورود ناموفق بود.");
   }
   setLoading(false);
  } catch (err: unknown) {
   if (err instanceof Error) {
    toast.error(err.message || "خطا در ورود.");
   } else {
    toast.error("خطای ناشناخته‌ای رخ داد.");
   }
  }
 };

 return (
  <div className=" w-[550px] mx-auto flex items-center justify-center p-4">
   <div className="bg-primary/80 text-primary-foreground w-full rounded-xl shadow-md p-6">
    <h2 className="text-2xl font-semibold text-center mb-6">ورود کاربر</h2>
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
     <div className="">
      <Label className="block text-sm font-medium" htmlFor="password">
       رمز عبور
      </Label>
      <Input
       id="password"
       type="password"
       name="password"
       onChange={handleChange}
       value={form.password}
       className="w-full px-3 py-2 border rounded-md bg-gray-100 mt-2 text-black"
      />
      {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
     </div>
     {errors.agreement && <p className="text-sm text-red-600 mt-1">{errors.agreement}</p>}
     <Button
      loading={loading}
      type="submit"
      className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
     >
      ورود
     </Button>
    </form>

    <div className="mt-6 text-sm text-center text-gray-600">
     مشتری جدید ؟
     <Link href="/auth/signup" className="text-blue-600 hover:underline">
      حساب کاربری خود را ایجاد کنید
     </Link>
    </div>
    <div className="mt-6 text-sm text-center text-gray-600">
     <Link href="/auth/forgot-password" className="text-blue-600 hover:underline">
      رمز عبور فراموش کردید؟
     </Link>
    </div>
   </div>
  </div>
 );
}
