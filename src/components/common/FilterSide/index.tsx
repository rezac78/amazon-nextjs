"use client";

import {Button} from "@/components/ui/button";
import {Slider} from "@/components/ui/slider";
import {Checkbox} from "@/components/ui/checkbox";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import GridIcon from "@/public/icons/Grid";
import ListIcon from "@/public/icons/List";
import ShoppingBagIcon from "@/public/icons/shopping-bag";
import ProductCard from "@/components/common/ProductCard";
import {CategoryAttributeFilter, ProductSliderItem} from "@/utils/types";
import {getProducts} from "@/utils/fetchSearch";
import {useSearchParams, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import ProductCardSkeleton from "../SkeletonComponent/ProductCard";
import {fetchWishlist} from "@/utils/fetchProduct";

interface SearchAndFilterProps {
 data: CategoryAttributeFilter[];
 showHeading?: boolean;
 Token: string;
}

export default function SearchAndFilter({data, Token, showHeading = true}: SearchAndFilterProps) {
 const searchParams = useSearchParams();
 const query = searchParams.get("query") || "";
 const router = useRouter();
 const [viewMode] = useState(searchParams.get("mode") || "grid");
 const [products, setProducts] = useState<ProductSliderItem[]>([]);
 const [loading, setLoading] = useState(false);
 const [priceRange, setPriceRange] = useState<[number, number]>(() => {
  const priceParam = searchParams.get("price");
  if (priceParam && priceParam.includes(",")) {
   const [min, max] = priceParam.split(",").map(Number);
   return [min, max];
  }
  return [0, 999999999];
 });
 useEffect(() => {
  const currentParams = new URLSearchParams(searchParams.toString());
  const params: Record<string, string> = {};
  currentParams.forEach((value, key) => {
   params[key] = value;
  });

  const fetchAndSetProducts = async () => {
   try {
    setLoading(true);
    const res = await getProducts(params);
    let fetchedProducts = res.data || [];

    if (Token) {
     const wishlistItems = await fetchWishlist(Token);
     const wishlistIds = new Set(wishlistItems.map((item: {id: unknown}) => item.id));

     fetchedProducts = fetchedProducts.map((product: {id: unknown}) => ({
      ...product,
      isInWishlist: wishlistIds.has(product.id),
     }));
    }

    setProducts(fetchedProducts);
   } catch (err) {
    console.error("Product fetch error:", err);
   } finally {
    setLoading(false);
   }
  };

  fetchAndSetProducts();
 }, [Token, searchParams]);
 const handleWishlistToggle = (productId: number, liked: boolean) => {
  setProducts((prev) =>
   prev.map((p) =>
    p.id === productId
     ? {
        ...p,
        isInWishlist: liked,
        price: typeof p.price === "string" ? Number(p.price) : p.price, // اطمینان از تبدیل به عدد
       }
     : p
   )
  );
 };
 const updateFilter = (key: string, value: string) => {
  const current = new URLSearchParams(searchParams.toString());
  if (value) current.set(key, value);
  else current.delete(key);
  router.push(`?${current.toString()}`);
 };
 const toggleMultiFilter = (key: string, value: string) => {
  const current = new URLSearchParams(searchParams.toString());
  const existing = current.get(key)?.split(",").filter(Boolean) || [];

  const newValues = existing.includes(value)
   ? existing.filter((v) => v !== value) // حذف گزینه
   : [...existing, value]; // افزودن گزینه

  if (newValues.length > 0) {
   current.set(key, newValues.join(","));
  } else {
   current.delete(key);
  }

  router.push(`?${current.toString()}`);
 };

 return (
  <div className="flex flex-col lg:flex-row container mx-auto px-4 py-6 gap-6">
   <aside className="lg:w-1/4 w-full space-y-6">
    {showHeading && (
     <h1 className="text-lg font-bold">
      نتایج جستجو برای: <span className="text-primary">{query}</span>
     </h1>
    )}
    <div className="flex justify-between border-b border-gray-100 pb-4">
     <h2 className="font-bold text-lg">فیلترها:</h2>
     <Button variant="ghost" onClick={() => router.push("?")}>
      پاک کردن همه
     </Button>
    </div>
    <div>
     <Slider
      value={priceRange}
      min={0}
      max={999999999}
      step={100000}
      onValueChange={(val) => {
       setPriceRange([val[0], val[1] ?? val[0]]);
       updateFilter("price", `${val[0]},${val[1] ?? val[0]}`);
      }}
      className="mb-2"
     />
     <div className="flex justify-between">
      <h3 className="font-semibold">قیمت</h3>
      <p className="text-sm">
       QAR {priceRange[0]} - QAR {priceRange[1]}
      </p>
     </div>
    </div>
    {data?.map((filter) => {
     if (filter.type === "select") {
      return (
       <div key={filter.id}>
        <h3 className="font-semibold">{filter.name}</h3>
        {filter.options.map((option, i) => {
         const selectedValues = searchParams.get(filter.code)?.split(",") || [];
         return (
          <div className="flex items-center gap-2 py-1" key={i}>
           <Checkbox
            id={`${option.id}`}
            checked={selectedValues.includes(String(option.id))}
            onCheckedChange={() => toggleMultiFilter(filter.code, String(option.id))}
           />
           <label htmlFor={`${option.id}`}>{option.admin_name ?? ""}</label>
          </div>
         );
        })}
       </div>
      );
     }
     return null;
    })}
   </aside>

   <main className="flex-1 space-y-4">
    <div className="flex items-center justify-between">
     <Select onValueChange={(val) => updateFilter("sort", val)}>
      <SelectTrigger className="w-40">
       <SelectValue placeholder={searchParams.get("sort") || "گران‌ترین اول"} />
      </SelectTrigger>
      <SelectContent>
       <SelectItem value="price-desc">گران‌ترین اول</SelectItem>
       <SelectItem value="price-asc">ارزان‌ترین اول</SelectItem>
      </SelectContent>
     </Select>
     <div className="flex items-center gap-2">
      <Select onValueChange={(val) => updateFilter("limit", val)}>
       <SelectTrigger className="w-24">
        <SelectValue placeholder={searchParams.get("limit") || "12"} />
       </SelectTrigger>
       <SelectContent>
        {[12, 24, 48].map((n) => (
         <SelectItem key={n} value={`${n}`}>
          {n}
         </SelectItem>
        ))}
       </SelectContent>
      </Select>
      <Button
       size="icon"
       variant={viewMode === "grid" ? "default" : "ghost"}
       onClick={() => updateFilter("mode", "grid")}
      >
       <GridIcon className="w-4 h-4" />
      </Button>
      <Button
       size="icon"
       variant={viewMode === "list" ? "default" : "ghost"}
       onClick={() => updateFilter("mode", "list")}
      >
       <ListIcon className="w-4 h-4" />
      </Button>
     </div>
    </div>

    {loading ? (
     <div className="text-center py-20 text-gray-500 text-sm animate-pulse">
      <ProductCardSkeleton count={8} />
     </div>
    ) : products.length > 0 ? (
     <ProductCard Token={Token} homePage={true} products={products} onWishlistToggle={handleWishlistToggle} />
    ) : (
     <div className="text-center text-gray-500 py-20">
      <ShoppingBagIcon className="w-32 h-32 mx-auto" />
      <p className="mt-4">در این دسته بندی محصولی موجود نمی‌باشد</p>
     </div>
    )}
   </main>
  </div>
 );
}
