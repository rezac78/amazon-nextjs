"use client";

import {Button} from "@/components/ui/button";
import TrashIcon from "@/public/icons/Trash";
import {ProductSliderItem} from "@/utils/types/types";
import Image from "next/image";
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
import {useState} from "react";
import {toast} from "sonner";
import {fetchProductLike, fetchProductLikeDelete} from "@/utils/fetchProduct";
interface ProductCardProps {
 Data: ProductSliderItem[];
 Token: string;
}
export default function ProfileFavorite({Data, Token}: ProductCardProps) {
 const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
 const [deleteAllDialogOpen, setDeleteAllDialogOpen] = useState(false);
 const [favoriteToDelete, setFavoriteToDelete] = useState<number | null>(null);
 const [addresses, setAddresses] = useState<ProductSliderItem[]>(Data);

 const handleDelete = async (id: number) => {
  try {
   await fetchProductLike(id, Token);
   setAddresses((prev) => prev.filter((addr) => addr.id !== id));
   toast.success("آدرس با موفقیت حذف شد.");
  } catch (err) {
   toast.error("حذف آدرس با خطا مواجه شد.");
   console.error("Delete Address Error:", err);
  }
 };
 const handleDeleteAll = async () => {
  try {
   await fetchProductLikeDelete(Token);
   setAddresses([]);
   toast.success("همه آیتم‌ها با موفقیت حذف شدند.");
  } catch (err) {
   toast.error("حذف همه آیتم‌ها با خطا مواجه شد.");
   console.error("Delete All Error:", err);
  } finally {
   setDeleteAllDialogOpen(false);
  }
 };
 const handleDeleteClick = (id: number) => {
  setFavoriteToDelete(id);
  setDeleteDialogOpen(true);
 };
 return (
  <>
   <div className="flex justify-between items-center mb-10">
    <h2 className="text-xl font-bold">لیست علاقه‌مندی </h2>
    <Button onClick={() => setDeleteAllDialogOpen(true)}>حذف همه</Button>
   </div>
   {addresses.length === 0 ? (
    <div className="text-center ">هیچ آیتمی در لیست وجود ندارد</div>
   ) : (
    addresses.map((e, i) => (
     <div key={i} className="flex justify-between border-b py-10">
      <Image
       src={
        e?.images?.[0]?.large_image_url
         ? e.images[0].large_image_url.replace("/cache/large/", "/storage/")
         : e?.images?.[0]?.url || "/defult.avif"
       }
       width={120}
       height={120}
       className=""
       alt={e.name}
      />
      <div className="flex flex-col items-start w-8/12  gap-5">
       <span className="font-bold text-xl">{e.name}</span>
       <div className="flex items-center gap-3">
        +1-
        <Button>انتقال به سبد خرید</Button>
       </div>
      </div>
      <div className="flex flex-col gap-3">
       <div className="">{e.price}</div>
       <Button onClick={() => handleDeleteClick(e.id)} size={"sm"}>
        <TrashIcon />
       </Button>
      </div>
     </div>
    ))
   )}
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
        if (favoriteToDelete !== null) {
         handleDelete(favoriteToDelete);
         setDeleteDialogOpen(false);
        }
       }}
      >
       تایید
      </AlertDialogAction>
     </AlertDialogFooter>
    </AlertDialogContent>
   </AlertDialog>
   <AlertDialog open={deleteAllDialogOpen} onOpenChange={setDeleteAllDialogOpen}>
    <AlertDialogContent dir="ltr">
     <AlertDialogHeader>
      <AlertDialogTitle className="text-right">آیا مطمئن هستید؟</AlertDialogTitle>
      <AlertDialogDescription className="text-right">
       این عمل قابل بازگشت نیست. همه آیتم‌ها برای همیشه حذف خواهند شد.
      </AlertDialogDescription>
     </AlertDialogHeader>
     <AlertDialogFooter>
      <AlertDialogCancel onClick={() => setDeleteAllDialogOpen(false)}>لغو</AlertDialogCancel>
      <AlertDialogAction onClick={handleDeleteAll}>تأیید</AlertDialogAction>
     </AlertDialogFooter>
    </AlertDialogContent>
   </AlertDialog>
  </>
 );
}
