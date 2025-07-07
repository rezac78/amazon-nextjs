"use client";
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuRadioGroup,
 DropdownMenuRadioItem,
 DropdownMenuSeparator,
 DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import {useEffect, useMemo, useState} from "react";
import Link from "next/link";
import {Button} from "../../ui/button";
import MenuIcon from "@/public/icons/Menu";
import SearchIcon from "@/public/icons/Search";
import ShoppingCartIcon from "@/public/icons/ShoppingCart";
import {CategoryHome, Locale} from "@/utils/types/types";
import {useRouter} from "next/navigation";
import {useAuth} from "@/store/useAuth";
import {useCartCount} from "@/store/useCounter";
import HomeCategorisWrapper from "../homeCategoris/HomeCategorisWrapper";
interface HeaderProps {
 categorie: CategoryHome[];
 isLogin: boolean;
 locale: Locale[];
 lang: string;
}

export default function Header({isLogin, categorie, locale, lang}: HeaderProps) {
 const [language, setLanguage] = useState(lang);
 const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 const [loading, setLoading] = useState(false);
 const [searchText, setSearchText] = useState("");
 const router = useRouter();
 const {isLoggedIn} = useAuth();
 const cartCount = useCartCount((s) => s.cartCount);
 const changeLanguage = (lang: string) => {
  if (lang === language) return;
  setLanguage(lang);
  localStorage.setItem("lang", lang);
  document.cookie = `lang=${lang}; path=/`;
  window.location.reload();
 };
 useEffect(() => {
  const savedLang = localStorage.getItem("lang");
  if (savedLang) {
   setLanguage(savedLang);
  }
 }, []);
 const handleSearch = useMemo(() => {
  return () => {
   if (!searchText.trim()) return;
   setLoading(true);
   router.push(`/search?query=${encodeURIComponent(searchText)}&sort=price-desc&limit=12&mode=grid`);
   setTimeout(() => setLoading(false), 1500);
  };
 }, [searchText, router]);
 useEffect(() => {
  useAuth.getState().setLoggedIn(isLogin);
 }, [isLogin]);
 return (
  <header className="w-full bg-primary text-primary-foreground shadow-md">
   <div className="flex items-center justify-between px-4 py-2">
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
        {locale.map((option) => (
         <DropdownMenuRadioItem key={option.code} value={option.code}>
          {option.name}
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
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      placeholder={`${lang === "fa" ? "سرچ در محصولات ..." : "search products ..."}`}
      className="w-full px-4 py-2 ltr:rounded-l-md rtl:rounded-r-md bg-white text-black text-sm"
     />

     <Button
      loading={loading}
      variant="secondary"
      className="rtl:rounded-r-none ltr:rounded-l-none px-4"
      onClick={handleSearch}
     >
      <SearchIcon className="w-4 h-4" />
     </Button>
    </div>

    {/* Right Menu */}
    <div className="hidden md:flex items-center gap-6">
     {/* <Link href={"/compare"} className="relative flex flex-col items-center text-xs">
      <span className="font-bold">
       <CompareIcon />
      </span>
     </Link> */}
     {isLoggedIn ? (
      <Link href="/profile" className="text-xs">
       {`${lang === "fa" ? "پروفایل" : "profile"}`}
      </Link>
     ) : (
      <Link href="/auth/signin" className="text-xs">
       {`${lang === "fa" ? "ورود/ثبت نام" : "login/register"}`}
      </Link>
     )}
     <Link href={"/favorite"} className="relative flex flex-col items-center text-xs">
      <span className="font-bold">{`${lang === "fa" ? "موردعلاقه" : "favorite"}`}</span>
     </Link>
     <Link href={"/checkout/cart"} className="relative flex flex-col items-center">
      <ShoppingCartIcon className="w-5 h-5" />
      <span className="absolute top-[-6px] right-[-2px] bg-secondary text-black text-xs w-5 h-5 rounded-full flex items-center justify-center">
       {cartCount}
      </span>
      <span className="text-sm font-bold ml-1">{`${lang === "fa" ? "سبد خرید" : "cart"}`}</span>
     </Link>
    </div>
    <div className="md:hidden">
     <Button variant="ghost" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
      <MenuIcon className="w-5 h-5" />
     </Button>
    </div>
   </div>
   {mobileMenuOpen && (
    <div className="md:hidden px-4 pb-4 flex flex-col gap-3">
     <div className="flex">
      <input
       type="text"
       placeholder={`${lang === "fa" ? "سرچ در محصولات ..." : "search products ..."}`}
       className="w-full px-4 py-2 ltr:rounded-l-md rtl:rounded-r-md bg-white text-black text-sm"
       onClick={handleSearch}
       onChange={(e) => setSearchText(e.target.value)}
       onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <Button loading={loading} variant="secondary" className="rtl:rounded-r-none ltr:rounded-l-none px-4">
       <SearchIcon className="w-4 h-4" />
      </Button>
     </div>
     <div className="flex flex-col gap-2">
      {isLoggedIn ? (
       <Link href="/profile" className="text-xs">
        {`${lang === "fa" ? "پروفایل" : "profile"}`}
       </Link>
      ) : (
       <Link href="/auth/signin" className="text-xs">
        {`${lang === "fa" ? "ورود/ثبت نام" : "login/register"}`}
       </Link>
      )}
      <span className="text-xs font-bold">{`${lang === "fa" ? "موردعلاقه" : "favorite"}`}</span>
      <span className="text-xs font-bold">{`${lang === "fa" ? "سبد خرید" : "cart"}`}</span>
     </div>
     <span>{`${lang === "fa" ? "دسته بندی :" : "categories :"}`}</span>
     <HomeCategorisWrapper lang={lang} Data={categorie} useIn="HomeHeader" />
    </div>
   )}
   <div className="hidden md:block">
    <HomeCategorisWrapper lang={lang} Data={categorie} useIn="HomeHeader" />
   </div>
  </header>
 );
}
