"use client";
import {Menu, Search, ShoppingCart} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuRadioGroup,
 DropdownMenuRadioItem,
 DropdownMenuSeparator,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import i18n from "@/app/i18n/client";
import Link from "next/link";

const options = [
 {value: "fa", label: "Fa"},
 {value: "en", label: "En"},
];

export default function Header() {
 const {t} = useTranslation();
 const [language, setLanguage] = useState(i18n.language || "en");
 const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

 const changeLanguage = (lang: string) => {
  setLanguage(lang);
  i18n.changeLanguage(lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
  localStorage.setItem("lang", lang);
 };

 return (
  <header className="w-full bg-primary text-primary-foreground shadow-md">
   <div className="flex items-center justify-between px-4 py-2">
    {/* Logo & Language */}
    <div className="flex items-center gap-4">
     <div className="text-xl font-extrabold">
      <Link href={"/"}>amazon</Link>
     </div>
     <DropdownMenu>
      <DropdownMenuTrigger asChild>
       <Button variant="outline">{language.toUpperCase()}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 bg-secondary text-secondary-foreground">
       <DropdownMenuSeparator />
       <DropdownMenuRadioGroup value={language} onValueChange={changeLanguage}>
        {options.map((option) => (
         <DropdownMenuRadioItem key={option.value} value={option.value}>
          {option.label}
         </DropdownMenuRadioItem>
        ))}
       </DropdownMenuRadioGroup>
      </DropdownMenuContent>
     </DropdownMenu>
    </div>

    {/* Search bar */}
    <div className="hidden md:flex flex-1 mx-4">
     <input
      type="text"
      placeholder={t("Search")}
      className="w-full px-4 py-2 ltr:rounded-l-md rtl:rounded-r-md bg-white text-black text-sm"
     />
     <Button variant="secondary" className="rtl:rounded-r-none ltr:rounded-l-none px-4">
      <Search className="w-4 h-4" />
     </Button>
    </div>

    {/* Right Menu */}
    <div className="hidden md:flex items-center gap-6">
     <div className="text-xs">
      <span className="block">{t("login&Register")}</span>
     </div>
     <Link href={"/favorite"} className="text-xs">
      <span className="font-bold">{t("Favorite")}</span>
     </Link>
     <div className="relative flex flex-col items-center">
      <ShoppingCart className="w-5 h-5" />
      <span className="absolute top-[-6px] right-[-2px] bg-secondary text-black text-xs w-5 h-5 rounded-full flex items-center justify-center">
       0
      </span>
      <span className="text-sm font-bold ml-1">{t("Cart")}</span>
     </div>
    </div>
    <div className="md:hidden">
     <Button variant="ghost" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
      <Menu className="w-5 h-5" />
     </Button>
    </div>
   </div>
   {mobileMenuOpen && (
    <div className="md:hidden px-4 pb-4 flex flex-col gap-3">
     <div className="flex">
      <input
       type="text"
       placeholder={t("Search")}
       className="w-full px-4 py-2 ltr:rounded-l-md rtl:rounded-r-md bg-white text-black text-sm"
      />
      <Button variant="secondary" className="rtl:rounded-r-none ltr:rounded-l-none px-4">
       <Search className="w-4 h-4" />
      </Button>
     </div>
     <div className="flex flex-col gap-2">
      <span className="text-xs">{t("login&Register")}</span>
      <span className="text-xs font-bold">{t("Favorite")}</span>
      <span className="text-xs font-bold">{t("Cart")}</span>
     </div>
    </div>
   )}
   <div className="bg-[#232f3e] text-sm px-4 py-2 flex items-center gap-6 overflow-x-auto whitespace-nowrap">
    <div className="flex items-center gap-1 cursor-pointer">
     <Menu className="w-4 h-4" /> <span>All</span>
    </div>
    <span className="cursor-pointer">Todays Deals</span>
    <span className="cursor-pointer">Customer Service</span>
    <span className="cursor-pointer">Registry</span>
    <span className="cursor-pointer">Gift Cards</span>
    <span className="cursor-pointer">Sell</span>
   </div>
  </header>
 );
}
