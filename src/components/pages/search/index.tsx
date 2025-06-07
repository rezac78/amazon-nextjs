"use client";

import {Button} from "@/components/ui/button";
import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {Slider} from "@/components/ui/slider";
import {Checkbox} from "@/components/ui/checkbox";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import GridIcon from "@/public/icons/Grid";
import ListIcon from "@/public/icons/List";
import ShoppingBagIcon from "@/public/icons/shopping-bag";
import {CategoryAttributeFilter} from "@/utils/types";
import {getProducts} from "@/utils/fetchSearch";
import {useRouter} from "next/navigation";
import ProductCard from "@/components/common/ProductCard";

interface SearchProps {
 Data: CategoryAttributeFilter[];
}
export default function Search({Data}: SearchProps) {
 const searchParams = useSearchParams();
 const query = searchParams.get("query") || "";
 const [viewMode, setViewMode] = useState("grid");
 const [limit] = useState(12);
 const [sort] = useState("price-desc");
 const [products, setProducts] = useState([]);

 useEffect(() => {
  const params: Record<string, string> = {
   query,
   sort,
   limit: limit.toString(),
   mode: viewMode,
   currency: "OMR",
  };
  const color = searchParams.get("color");
  const size = searchParams.get("size");
  const brand = searchParams.get("brand");
  const price = searchParams.get("price");
  if (color) params.color = color;
  if (size) params.size = size;
  if (brand) params.brand = brand;
  if (price) params.price = price;

  getProducts(params)
   .then((res) => setProducts(res.data || []))
   .catch((err) => console.error("Product fetch error:", err));
 }, [query, sort, limit, viewMode, searchParams]);

 const [priceRange, setPriceRange] = useState<[number, number]>([0, 999999999]);
 const router = useRouter();
 const updateFilter = (key: string, value: string) => {
  const current = new URLSearchParams(searchParams.toString());
  if (value) {
   current.set(key, value);
  } else {
   current.delete(key);
  }
  router.push(`/search?${current.toString()}`);
 };
 return (
  <div className="flex flex-col lg:flex-row container mx-auto px-4 py-6 gap-6">
   {/* Sidebar Filters */}
   <aside className="lg:w-1/4 w-full space-y-6">
    <h1 className="text-lg font-bold">
     نتایج جستجو برای: <span className="text-primary">{query}</span>
    </h1>

    <div className="flex justify-between border-b border-gray-100 pb-4">
     <h2 className="font-bold text-lg">فیلترها:</h2>
     <Button variant="ghost">پاک کردن همه</Button>
    </div>

    {Data.map((filter) => {
     if (filter.code === "price") {
      return (
       <div key={filter.id}>
        <Slider
         defaultValue={priceRange}
         min={0}
         max={999999999}
         step={100000}
         onValueChange={(val) => {
          setPriceRange([val[0], val[1] ?? val[0]]);
          updateFilter("price", `${val[0]},${val[1] ?? val[0]}`);
         }}
         value={priceRange}
         className="mb-2"
        />
        <div className="flex justify-between">
         <h3 className="font-semibold">{filter.name}</h3>
         <p className="text-sm">
          QAR {priceRange[0]} - QAR {priceRange[1]}
         </p>
        </div>
       </div>
      );
     }

     if (filter.type === "select") {
      return (
       <div key={filter.id}>
        <h3 className="font-semibold">{filter.name}</h3>
        {filter.options.map((option, i) => (
         <div className="flex items-center gap-2 py-1" key={i}>
          <Checkbox
           id={`${filter.code}-${option.id}`}
           checked={searchParams.get(filter.code) === String(option.id)}
           onCheckedChange={(checked) => {
            updateFilter(filter.code, checked ? String(option.id) : "");
           }}
          />
          <label htmlFor={`${filter.code}-${option.id}`}>{option.name ?? option}</label>
         </div>
        ))}
       </div>
      );
     }

     return null;
    })}
   </aside>

   {/* Main Section */}
   <main className="flex-1 space-y-4">
    {/* View & Sorting */}
    <div className="flex items-center justify-between">
     <Select onValueChange={(val) => updateFilter("sort", val)}>
      <SelectTrigger className="w-40">
       <SelectValue placeholder="گران‌ترین اول" />
      </SelectTrigger>
      <SelectContent>
       <SelectItem value="price-desc">گران‌ترین اول</SelectItem>
       <SelectItem value="price-asc">ارزان‌ترین اول</SelectItem>
      </SelectContent>
     </Select>
     <div className="flex items-center gap-2">
      <Select onValueChange={(val) => updateFilter("limit", val)}>
       <SelectTrigger className="w-24">
        <SelectValue placeholder={limit} />
       </SelectTrigger>
       <SelectContent>
        {[12, 24, 48].map((n) => (
         <SelectItem key={n} value={`${n}`}>
          {n}
         </SelectItem>
        ))}
       </SelectContent>
      </Select>
      <Button size="icon" variant={viewMode === "grid" ? "default" : "ghost"} onClick={() => setViewMode("grid")}>
       <GridIcon className="w-4 h-4" />{" "}
      </Button>
      <Button size="icon" variant={viewMode === "list" ? "default" : "ghost"} onClick={() => setViewMode("list")}>
       <ListIcon className="w-4 h-4" />
      </Button>
     </div>
    </div>
    {/* Products */}
    {products.length > 0 ? (
     <ProductCard homePage={true} products={products} />
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
