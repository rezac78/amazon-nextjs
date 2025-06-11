"use client";
import {useState} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {toast} from "sonner";
import {DeletedProfileAddress, ProfileAddressFetch, UpdateProfileAddress} from "@/utils/profile/proFileAddress";
import AddressList from "../common/AddressList";
import {Address} from "@/utils/types";
import {
 AlertDialog,
 AlertDialogAction,
 AlertDialogCancel,
 AlertDialogContent,
 AlertDialogDescription,
 AlertDialogFooter,
 AlertDialogHeader,
 AlertDialogTitle,
} from "@/components/ui/alert-dialog";
// Define AddressForm type
interface AddressForm {
 company_name: string;
 first_name: string;
 last_name: string;
 address: string;
 country: string;
 state: string;
 city: string;
 postcode: number;
 phone: string;
 email: string;
 vat_id: string;
}

export default function ProfileAddress({Token, Data}: {Token: string; Data: Address[]}) {
 const [addresses, setAddresses] = useState<Address[]>(Data || []);
 const initialDefaultAddressValues: AddressForm = {
  company_name: "",
  first_name: "",
  last_name: "",
  address: "",
  country: "",
  state: "",
  city: "",
  postcode: 0,
  phone: "",
  email: "",
  vat_id: "",
 };

 const [open, setOpen] = useState(false);
 const [loading, setLoading] = useState(false);
 const [editMode, setEditMode] = useState(false);
 const [editId, setEditId] = useState<number | null>(null);
 const [dataForm, setDataForm] = useState<AddressForm>(initialDefaultAddressValues);
 const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
 const [addressToDelete, setAddressToDelete] = useState<number | null>(null);
 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const {name, value} = e.target;
  setDataForm((prev) => ({...prev, [name]: value}));
 };

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
   setLoading(true);
   const formData: Address = {
    id: 0,
    company_name: dataForm.company_name,
    first_name: dataForm.first_name,
    last_name: dataForm.last_name,
    vat_id: dataForm.vat_id,
    address: dataForm.address,
    address1: dataForm.address,
    address2: "",
    country: dataForm.country,
    country_name: dataForm.country,
    state: dataForm.state,
    city: dataForm.city,
    postcode: dataForm.postcode,
    phone: dataForm.phone,
    email: dataForm.email,
    is_default: "0",
   };
   if (editMode && editId !== null) {
    const updatedAddress = await UpdateProfileAddress(editId, formData, Token);
    // Update the address in the state
    setAddresses((prev) =>
     prev.map((addr) =>
      addr.id === editId ? {...updatedAddress, country_name: updatedAddress.country_name || dataForm.country} : addr
     )
    );
    toast.success("آدرس با موفقیت ویرایش شد.");
   } else {
    const newAddress = await ProfileAddressFetch(formData, Token);
    // Add the new address to the state
    setAddresses((prev) => [...prev, {...newAddress, country_name: newAddress.country_name || dataForm.country}]);
    toast.success("آدرس جدید با موفقیت ذخیره شد.");
   }

   setOpen(false);
   setEditMode(false);
   setEditId(null);
   setDataForm(initialDefaultAddressValues);
  } catch (err) {
   toast.error("ذخیره آدرس با خطا مواجه شد.");
   console.error("Submit Error:", err);
  } finally {
   setLoading(false);
  }
 };
 const handleDelete = async (id: number) => {
  try {
   await DeletedProfileAddress(id, Token);
   setAddresses((prev) => prev.filter((addr) => addr.id !== id));
   toast.success("آدرس با موفقیت حذف شد.");
  } catch (err) {
   toast.error("حذف آدرس با خطا مواجه شد.");
   console.error("Delete Address Error:", err);
  }
 };

 const handleDeleteClick = (id: number) => {
  setAddressToDelete(id);
  setDeleteDialogOpen(true);
 };

 return (
  <>
   <div className="flex justify-between items-center mb-6">
    <h2 className="text-xl font-bold">آدرس‌ها</h2>
    <Button
     onClick={() => {
      setDataForm(initialDefaultAddressValues);
      setEditMode(false);
      setEditId(null);
      setOpen(true);
     }}
    >
     افزودن آدرس جدید
    </Button>
   </div>
   <AddressList
    addresses={addresses}
    onEdit={(item) => {
     setDataForm({
      company_name: item.company_name,
      first_name: item.first_name,
      last_name: item.last_name,
      address: item.address[0] || "",
      country: item.country_name,
      state: item.state,
      city: item.city,
      postcode: item.postcode,
      phone: item.phone,
      email: item.email,
      vat_id: item.vat_id,
     });
     setEditMode(true);
     setEditId(item.id);
     setOpen(true);
    }}
    onDelete={handleDeleteClick}
   />
   <Dialog
    open={open}
    onOpenChange={(val) => {
     setOpen(val);
     if (!val) {
      setEditMode(false);
      setEditId(null);
      setDataForm(initialDefaultAddressValues);
     }
    }}
   >
    <DialogContent className="h-[550px] bg-gray-100 overflow-auto">
     <DialogHeader className="flex items-start">
      <DialogTitle>{editMode ? "ویرایش آدرس" : "افزودن آدرس"}</DialogTitle>
     </DialogHeader>
     <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm">
      <div>
       <Label htmlFor="company_name">نام شرکت</Label>
       <Input name="company_name" className="my-2" value={dataForm.company_name} onChange={handleChange} />
      </div>
      <div>
       <Label htmlFor="first_name">نام</Label>
       <Input name="first_name" className="my-2" value={dataForm.first_name} onChange={handleChange} required />
      </div>
      <div>
       <Label htmlFor="last_name">نام خانوادگی</Label>
       <Input name="last_name" className="my-2" value={dataForm.last_name} onChange={handleChange} required />
      </div>
      <div className="sm:col-span-2">
       <Label htmlFor="address">آدرس کامل</Label>
       <Textarea
        name="address"
        className="my-2"
        rows={3}
        placeholder="مثال: خیابان ولیعصر، کوچه ۱۲، پلاک ۵"
        value={dataForm.address}
        onChange={handleChange}
        required
       />
      </div>
      <div>
       <Label htmlFor="country">کشور</Label>
       <Input name="country" className="my-2" value={dataForm.country} onChange={handleChange} required />
      </div>
      <div>
       <Label htmlFor="state">ایالت</Label>
       <Input name="state" className="my-2" value={dataForm.state} onChange={handleChange} required />
      </div>
      <div>
       <Label htmlFor="city">شهر</Label>
       <Input name="city" className="my-2" value={dataForm.city} onChange={handleChange} required />
      </div>
      <div>
       <Label htmlFor="postcode">کد پستی</Label>
       <Input name="postcode" className="my-2" value={dataForm.postcode} onChange={handleChange} required />
      </div>
      <div>
       <Label htmlFor="phone">تلفن</Label>
       <Input name="phone" className="my-2" value={dataForm.phone} onChange={handleChange} required />
      </div>
      <div>
       <Label htmlFor="email">ایمیل</Label>
       <Input name="email" className="my-2" value={dataForm.email} onChange={handleChange} type="email" required />
      </div>
      <div className="sm:col-span-2">
       <Label htmlFor="vat_id">شماره مالیاتی (VAT)</Label>
       <Input name="vat_id" className="my-2" value={dataForm.vat_id} onChange={handleChange} />
      </div>
      <div className="sm:col-span-2 flex justify-end pt-2">
       <Button type="submit" loading={loading}>
        ذخیره
       </Button>
      </div>
     </form>
    </DialogContent>
   </Dialog>
   <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
    <AlertDialogContent dir="ltr">
     <AlertDialogHeader>
      <AlertDialogTitle className="text-right">آیا مطمئن هستید؟</AlertDialogTitle>
      <AlertDialogDescription className="text-right">
       این عمل قابل بازگشت نیست. اطلاعات آن برای همیشه از پاک خواهد شد
      </AlertDialogDescription>
     </AlertDialogHeader>
     <AlertDialogFooter>
      <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>لغو</AlertDialogCancel>
      <AlertDialogAction
       onClick={() => {
        if (addressToDelete !== null) {
         handleDelete(addressToDelete);
         setDeleteDialogOpen(false);
        }
       }}
      >
       ادامه
      </AlertDialogAction>
     </AlertDialogFooter>
    </AlertDialogContent>
   </AlertDialog>
  </>
 );
}
