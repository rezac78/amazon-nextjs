"use client";

import {useState} from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Checkbox} from "@/components/ui/checkbox";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {registerCustomer} from "@/utils/api/auth/authUsers";
import {Button} from "@/components/ui/button";
export default function RegisterPage() {
 const [form, setForm] = useState({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  agreement: false,
 });

 const [errors, setErrors] = useState<Record<string, string>>({});
 const [loading, setLoading] = useState(false);

 const router = useRouter();

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const {name, value, type, checked} = e.target;
  setForm({
   ...form,
   [name]: type === "checkbox" ? checked : value,
  });
 };
 const validateForm = () => {
  const newErrors: Record<string, string> = {};

  if (!form.firstName.trim()) newErrors.firstName = "نام الزامی است.";
  if (!form.lastName.trim()) newErrors.lastName = "نام خانوادگی الزامی است.";
  if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "فرمت ایمیل معتبر نیست.";
  if (form.password.length < 6) newErrors.password = "رمز عبور باید حداقل ۶ کاراکتر باشد.";
  if (form.password !== form.passwordConfirmation) newErrors.passwordConfirmation = "رمز عبور و تکرار آن یکسان نیستند.";
  if (!form.agreement) newErrors.agreement = "لطفاً با قوانین و شرایط موافقت کنید.";

  return newErrors;
 };
 const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();
  const validationErrors = validateForm();
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length > 0) return;
  setLoading(true);
  try {
   const result = await registerCustomer({
    firstName: form.firstName,
    lastName: form.lastName,
    email: form.email,
    password: form.password,
    passwordConfirmation: form.passwordConfirmation,
    subscribedToNewsLetter: false,
    agreement: form.agreement,
   });
   if (result) {
    await fetch("/api/auth/set-token", {
     method: "POST",
     headers: {
      "Content-Type": "application/json",
     },
     body: JSON.stringify({token: result.accessToken}),
    });
    router.push("/auth/signup");
    toast.success(result.message || "ثبت‌نام موفق بود.");
   } else {
    toast.error(result?.message || "ثبت‌نام ناموفق بود.");
   }
   setLoading(false);
  } catch (err: unknown) {
   if (err instanceof Error) {
    toast.error(err.message || "خطا در ثبت‌نام.");
   } else {
    toast.error("خطای ناشناخته‌ای رخ داد.");
   }
  }
 };

 return (
  <div className="flex w-full  items-center justify-center bg-gray-100 p-4">
   <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col md:flex-row">
    <div className="text-black md:w-1/2  p-6 order-2 md:order-1">
     <h2 className="text-2xl font-semibold text-center mb-6">ثبت‌نام</h2>
     <form onSubmit={handleRegister} className="space-y-4">
      <div className="w-full flex gap-3">
       <div className="w-full">
        <Label className="block text-sm font-medium" htmlFor="firstName">
         نام
        </Label>
        <Input
         id="firstName"
         name="firstName"
         type="text"
         onChange={handleChange}
         value={form.firstName}
         className="w-full px-3 py-2 border rounded-md bg-gray-100 mt-2 text-black"
        />
        {errors.firstName && <p className="text-sm text-red-600 mt-1">{errors.firstName}</p>}
       </div>
       <div className="w-full">
        <Label className="block text-sm font-medium" htmlFor="lastName">
         نام خانوادگی
        </Label>
        <Input
         id="lastName"
         name="lastName"
         type="text"
         onChange={handleChange}
         value={form.lastName}
         className="bg-gray-100 mt-2 text-black"
        />
        {errors.lastName && <p className="text-sm text-red-600 mt-1">{errors.lastName}</p>}
       </div>
      </div>
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
      <div className="">
       <Label className="block text-sm font-medium" htmlFor="passwordConfirmation">
        تکرار رمز عبور
       </Label>
       <Input
        id="passwordConfirmation"
        name="passwordConfirmation"
        type="password"
        onChange={handleChange}
        value={form.passwordConfirmation}
        className="w-full px-3 py-2 border rounded-md bg-gray-100 mt-2 text-black"
       />
       {errors.passwordConfirmation && <p className="text-sm text-red-600 mt-1">{errors.passwordConfirmation}</p>}
      </div>
      <div className="flex gap-2">
       <Checkbox
        id="agreement"
        name="agreement"
        checked={form.agreement}
        onCheckedChange={(checked) =>
         setForm((prev) => ({
          ...prev,
          agreement: !!checked,
         }))
        }
       />
       <Label className="" htmlFor="agreement">
        با قوانین و شرایط موافقم
       </Label>
      </div>
      {errors.agreement && <p className="text-sm text-red-600 mt-1">{errors.agreement}</p>}
      <Button
       loading={loading}
       type="submit"
       className="w-full bg-gradient-to-br from-blue-300  to-blue-400  text-white py-2 rounded-md hover:bg-green-700 transition"
      >
       ثبت‌نام
      </Button>
     </form>
    </div>
    <div className="md:w-1/2 bg-gradient-to-br from-blue-300  to-blue-400 md:rounded-r-[60px] text-white p-8 flex flex-col justify-center items-center gap-4 order-1 md:order-2">
     <h2 className="text-2xl font-bold">سلام خوش آمدید!</h2>
     <div className="text-white border-white flex gap-1">
      قبلاً ثبت‌نام کرده‌اید؟
      <Link href="/auth/signup" className="text-gray-950">
       ورود به حساب
      </Link>
     </div>
    </div>
   </div>
  </div>
 );
}
