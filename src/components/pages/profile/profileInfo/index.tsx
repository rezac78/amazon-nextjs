"use client";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {useState} from "react";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import Image from "next/image";
import {ProfileCustomerUpdate} from "@/utils/profile/proFileInfo/profile";
import {toast} from "sonner";
import {CustomerInfo} from "@/utils/types";
interface ProfileProps {
 Token: string;
 Data: CustomerInfo;
}
interface FormErrors {
 first_name?: string;
 last_name?: string;
 email?: string;
 phone?: string;
 gender?: string;
 date_of_birth?: string;
 subscribed_to_news_letter?: boolean;
}
export default function ProfileInfo({Data, Token}: ProfileProps) {
 const [open, setOpen] = useState(false);
 const [errors, setErrors] = useState<FormErrors>({});
 const [formData, setFormData] = useState({
  first_name: Data.first_name || "",
  last_name: Data.last_name || "",
  gender: Data.gender || "",
  date_of_birth: Data.date_of_birth || "",
  phone: Data.phone || "",
  email: Data.email || "",
  current_password: "",
  new_password: "",
  new_password_confirmation: "",
  subscribed_to_news_letter: Data.subscribed_to_news_letter || false,
  image: null,
 });
 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const {name, value, type, checked, files} = e.target;
  setFormData((prev) => ({
   ...prev,
   [name]: type === "checkbox" ? checked : type === "file" ? files?.[0] : value,
  }));
 };

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const newErrors = {};
  const payload = new FormData();

  payload.append("_method", "PUT");
  payload.append("first_name", formData.first_name);
  payload.append("last_name", formData.last_name);
  payload.append("gender", formData.gender);
  payload.append("date_of_birth", formData.date_of_birth);
  payload.append("phone", formData.phone);
  payload.append("email", formData.email);

  if (formData.current_password) payload.append("current_password", formData.current_password);
  if (formData.new_password) payload.append("new_password", formData.new_password);
  if (formData.new_password_confirmation)
   payload.append("new_password_confirmation", formData.new_password_confirmation);
  if (formData.image) payload.append("image", formData.image);
  payload.append("subscribed_to_news_letter", formData.subscribed_to_news_letter ? "1" : "0");

  setErrors(newErrors);

  if (Object.keys(newErrors).length === 0) {
   // ارسال فرم
   try {
    await ProfileCustomerUpdate(payload, Token);
    toast.success("پروفایل با موفقیت به‌روزرسانی شد");
    setOpen(false);
   } catch (err) {
    console.error(err);
    toast.error("خطا در به‌روزرسانی پروفایل");
   }
  }
 };
 return (
  <>
   <div className="flex justify-between items-center mb-6">
    <h2 className="text-xl font-bold">پروفایل</h2>
    <Button onClick={() => setOpen(true)} variant={"default"} className="px-4 py-1 rounded-md border ">
     ویرایش
    </Button>
   </div>

   <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10 text-sm">
    <div>
     <p className="text-gray-500">نام</p>
     <p className="text-black">{Data.first_name}</p>
    </div>
    <div>
     <p className="text-gray-500">نام خانوادگی</p>
     <p className="text-black">{Data.last_name}</p>
    </div>
    <div className="sm:col-span-2">
     <p className="text-gray-500">ایمیل</p>
     <p className="text-black">{Data.email}</p>
    </div>
   </div>

   <div className="mt-8">
    {/* <button className="flex items-center gap-2 bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800">
     <TrashIcon />
     حذف پروفایل
    </button> */}
   </div>
   <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent className="h-[500px] bg-gray-100 overflow-auto">
     <DialogHeader className="flex items-start">
      <DialogTitle>ویرایش پروفایل</DialogTitle>
      <DialogDescription>لطفاً اطلاعات خود را به‌روزرسانی کنید.</DialogDescription>
     </DialogHeader>

     <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="flex flex-col gap-2">
       <label className="block mx-auto text-sm font-medium text-gray-700">تصویر پروفایل</label>

       <div className="flex flex-col items-center gap-4">
        {formData.image ? (
         <Image
          src={URL.createObjectURL(formData.image)}
          alt="پیش‌نمایش تصویر"
          className="w-16 h-16 rounded-full object-cover border"
         />
        ) : (
         <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 border">
          تصویر
         </div>
        )}

        <label className="relative cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm">
         انتخاب تصویر
         <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer"
         />
        </label>
       </div>

       {formData.image && <p className="text-xs text-gray-500 mt-1">فایل انتخاب‌شده: {formData.image.name}</p>}
      </div>
      <div>
       <Input
        name="first_name"
        className="my-2"
        value={formData.first_name}
        onChange={handleChange}
        formControl={{labelText: "نام"}}
       />
       {errors.first_name && <p className="text-red-600 text-xs mt-1">{errors.first_name}</p>}
      </div>
      <div className="">
       <Input
        name="last_name"
        className=" my-2"
        value={formData.last_name}
        onChange={handleChange}
        formControl={{labelText: "نام خانوادگی"}}
       />
       {errors.last_name && <p className="text-red-600 text-xs mt-1">{errors.last_name}</p>}
      </div>
      <div className="">
       <Input
        name="email"
        type="email"
        className=" my-2"
        value={formData.email}
        onChange={handleChange}
        formControl={{labelText: "ایمیل"}}
       />
       {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
      </div>
      <div className="">
       <Input
        name="phone"
        className="my-2"
        value={formData.phone}
        onChange={handleChange}
        formControl={{labelText: "تلفن"}}
       />
       {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
      </div>
      <div>
       <Label className="block text-sm font-medium text-gray-700 mb-2">جنسیت</Label>
       <RadioGroup
        value={formData.gender}
        onValueChange={(value) => setFormData({...formData, gender: value})}
        className="flex gap-4"
       >
        <div className="flex items-center space-x-2 ">
         <RadioGroupItem value="male" id="gender-male" />
         <Label htmlFor="gender-male">مرد</Label>
        </div>
        <div className="flex items-center space-x-2">
         <RadioGroupItem value="female" id="gender-female" />
         <Label htmlFor="gender-female">زن</Label>
        </div>
       </RadioGroup>
       {errors.gender && <p className="text-red-600 text-xs mt-1">{errors.gender}</p>}
      </div>
      <div className="">
       <label className="block text-sm font-medium text-gray-700 mb-1">تاریخ تولد</label>
       <DatePicker
        calendar={persian}
        locale={persian_fa}
        value={formData.date_of_birth}
        onChange={(date) =>
         setFormData((prev) => ({
          ...prev,
          date_of_birth: date?.toString() || "",
         }))
        }
        inputClass="w-full border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        format="YYYY/MM/DD"
        containerClassName="w-full"
        className="w-full"
        placeholder="تاریخ تولد را انتخاب کنید"
       />
       {errors.date_of_birth && <p className="text-red-600 text-xs mt-1">{errors.date_of_birth}</p>}
      </div>

      <Input
       name="current_password"
       type="password"
       className="my-2"
       value={formData.current_password}
       onChange={handleChange}
       formControl={{labelText: "رمز عبور فعلی"}}
      />
      <Input
       name="new_password"
       type="password"
       className="my-2"
       value={formData.new_password}
       onChange={handleChange}
       formControl={{labelText: "رمز عبور جدید"}}
      />
      <Input
       name="new_password_confirmation"
       type="password"
       className="my-2"
       value={formData.new_password_confirmation}
       onChange={handleChange}
       formControl={{labelText: "تأیید رمز جدید"}}
      />

      <div className="flex items-center gap-2">
       <input
        type="checkbox"
        name="subscribed_to_news_letter"
        checked={formData.subscribed_to_news_letter}
        onChange={handleChange}
       />
       <label>اشتراک در خبرنامه</label>
      </div>

      <div className="pt-4 flex justify-end">
       <Button type="submit">ذخیره تغییرات</Button>
      </div>
     </form>
    </DialogContent>
   </Dialog>
  </>
 );
}
