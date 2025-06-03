"use client";
import {Button} from "@/components/ui/button";
import {useTranslation} from "react-i18next";

export default function CartPage() {
 const {t} = useTranslation();

 return (
  <div className="flex h-[50vh] w-1/2 mx-auto items-center justify-center bg-gray-100 mt-10">
   <div className="flex flex-col items-center gap-4">
    <p>{t("GoCartDesc")}</p>
    <Button >{t("GoShop")}</Button>
   </div>
  </div>
 );
}
