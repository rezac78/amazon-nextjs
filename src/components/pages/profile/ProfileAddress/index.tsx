"use client"
import {useState} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea"; // اگر نداری بسازش
import {toast} from "sonner";
import {ProfileAddressFetch} from "@/utils/profile/proFileAddress";

export default function ProfileAddress({Token}: {Token: string}) {
 const [open, setOpen] = useState(false);
 const [Data, setData] = useState({
  company_name: "Webkul",
  first_name: "John",
  last_name: "Doe",
  address: "5230, N Lincoln Ave",
  country: "US",
  state: "CA",
  city: "Oakland",
  postcode: "94606",
  phone: "9876543210",
  email: "admin@example.com",
  vat_id: "INV01234567891",
 });

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const {name, value} = e.target;
  setData((prev) => ({...prev, [name]: value}));
 };

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formattedData = {
   ...Data,
   address: [Data.address], // تبدیل به آرایه
  };

  try {
   await ProfileAddressFetch(formattedData, Token);
   toast.success("آدرس با موفقیت ذخیره شد.");
   setOpen(false);
  } catch (err) {
   toast.error("ذخیره آدرس با خطا مواجه شد.");
   console.error(err);
  }
 };

 return (
  <>
   <div className="flex justify-between items-center mb-6">
    <h2 className="text-xl font-bold">آدرس‌ها</h2>
    <Button onClick={() => setOpen(true)}>افزودن آدرس جدید</Button>
   </div>

   <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent className="h-[550px] bg-gray-100 overflow-auto">
     <DialogHeader className="flex items-start">
      <DialogTitle>افزودن آدرس</DialogTitle>
     </DialogHeader>
     <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm">
      <div>
       <Label htmlFor="company_name">نام شرکت</Label>
       <Input name="company_name" className="my-2" value={Data.company_name} onChange={handleChange} />
      </div>
      <div>
       <Label htmlFor="first_name">نام</Label>
       <Input name="first_name" className="my-2" value={Data.first_name} onChange={handleChange} />
      </div>
      <div>
       <Label htmlFor="last_name">نام خانوادگی</Label>
       <Input name="last_name" className="my-2" value={Data.last_name} onChange={handleChange} />
      </div>
      <div className="sm:col-span-2">
       <Label htmlFor="address">آدرس کامل</Label>
       <Textarea
        name="address"
        className="my-2"
        rows={3}
        value={Data.address}
        onChange={handleChange}
        placeholder="مثال: خیابان ولیعصر، کوچه ۱۲، پلاک ۵"
       />
      </div>
      <div>
       <Label htmlFor="country">کشور</Label>
       <Input name="country" className="my-2" value={Data.country} onChange={handleChange} />
      </div>
      <div>
       <Label htmlFor="state">ایالت</Label>
       <Input name="state" className="my-2" value={Data.state} onChange={handleChange} />
      </div>
      <div>
       <Label htmlFor="city">شهر</Label>
       <Input name="city" className="my-2" value={Data.city} onChange={handleChange} />
      </div>
      <div>
       <Label htmlFor="postcode">کد پستی</Label>
       <Input name="postcode" className="my-2" value={Data.postcode} onChange={handleChange} />
      </div>
      <div>
       <Label htmlFor="phone">تلفن</Label>
       <Input name="phone" className="my-2" value={Data.phone} onChange={handleChange} />
      </div>
      <div>
       <Label htmlFor="email">ایمیل</Label>
       <Input name="email" className="my-2" value={Data.email} onChange={handleChange} />
      </div>
      <div className="sm:col-span-2">
       <Label htmlFor="vat_id">شماره مالیاتی (VAT)</Label>
       <Input name="vat_id" className="my-2" value={Data.vat_id} onChange={handleChange} />
      </div>

      <div className="sm:col-span-2 flex justify-end pt-2">
       <Button type="submit">ذخیره</Button>
      </div>
     </form>
    </DialogContent>
   </Dialog>
  </>
 );
}
