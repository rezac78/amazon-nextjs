"use client";
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuRadioGroup,
 DropdownMenuRadioItem,
 DropdownMenuSeparator,
 DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import {useState} from "react";
import Link from "next/link";
import {Button} from "../../ui/button";
import {useStore} from "@/store/useCounter";
import MenuIcon from "@/public/icons/Menu";
import SearchIcon from "@/public/icons/Search";
import ShoppingCartIcon from "@/public/icons/ShoppingCart";
import dynamic from "next/dynamic";
import {CategoryHome} from "@/utils/types";
import HomeCategorisSkeleton from "../SkeletonComponent/homeCategoris";
import {useRouter} from "next/navigation";

const HomeCategoris = dynamic(() => import("../homeCategoris"), {
 ssr: false,
 loading: () => <HomeCategorisSkeleton count={4} />,
});

const options = [
 {value: "fa", label: "Fa"},
 {value: "en", label: "En"},
];

interface HeaderProps {
 isLogin: boolean;
 categorie: CategoryHome[];
}

export default function Header({isLogin, categorie}: HeaderProps) {
 const [language, setLanguage] = useState("fa");
 const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 const [searchText, setSearchText] = useState("");
 const router = useRouter();
 const changeLanguage = (lang: string) => {
  setLanguage(lang);
 };
 const {cart, favorites} = useStore();
 const handleSearch = () => {
  if (!searchText.trim()) return;
  router.push(`/search?query=${encodeURIComponent(searchText)}&sort=price-desc&limit=12&mode=grid`);
 };
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
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      placeholder="سرچ در محصولات ..."
      className="w-full px-4 py-2 ltr:rounded-l-md rtl:rounded-r-md bg-white text-black text-sm"
     />

     <Button variant="secondary" className="rtl:rounded-r-none ltr:rounded-l-none px-4" onClick={handleSearch}>
      <SearchIcon className="w-4 h-4" />
     </Button>
    </div>

    {/* Right Menu */}
    <div className="hidden md:flex items-center gap-6">
     {isLogin ? (
      <Link href={"/profile"} className="text-xs">
       <span className="block">پروفایل</span>
      </Link>
     ) : (
      <Link href={"/auth/signin"} className="text-xs">
       <span className="block">ورود/ثبت نام</span>
      </Link>
     )}
     <Link href={"/favorite"} className="relative flex flex-col items-center text-xs">
      <span className="font-bold">موردعلاقه</span>
      <span className="absolute -top-[12px] -right-[12px] bg-red-400 text-black text-xs w-4 h-4 rounded-full flex items-center justify-center">
       {favorites.length}
      </span>
     </Link>
     <Link href={"/cart"} className="relative flex flex-col items-center">
      <ShoppingCartIcon className="w-5 h-5" />
      <span className="absolute top-[-6px] right-[-2px] bg-secondary text-black text-xs w-5 h-5 rounded-full flex items-center justify-center">
       {cart.length}
      </span>
      <span className="text-sm font-bold ml-1">سبد خرید</span>
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
       placeholder="سرچ در محصولات ..."
       className="w-full px-4 py-2 ltr:rounded-l-md rtl:rounded-r-md bg-white text-black text-sm"
      />
      <Button variant="secondary" className="rtl:rounded-r-none ltr:rounded-l-none px-4">
       <SearchIcon className="w-4 h-4" />
      </Button>
     </div>
     <div className="flex flex-col gap-2">
      <span className="text-xs">ورود/ثبت نام</span>
      <span className="text-xs font-bold">موردعلاقه</span>
      <span className="text-xs font-bold">سبد خرید</span>
     </div>
    </div>
   )}
   <HomeCategoris Data={categorie} useIn="HomeHeader" />
  </header>
 );
}
