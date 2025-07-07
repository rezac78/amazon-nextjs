import {CategoryHome} from "@/utils/types/types";
import Link from "next/link";
import Image from "next/image";
import {buildCategoryTree} from "@/utils/buildCategoryTree";
import React, {useRef, useState} from "react";
import ChevronDownIcon from "@/public/icons/ChevronDown";

interface HomeCategoriesProps {
 Data: CategoryHome[];
 useIn: string;
 lang: string;
}

export default React.memo(function HomeCategoris({Data, useIn, lang}: HomeCategoriesProps) {
 const treeData = buildCategoryTree(Data);
 const [openMenu, setOpenMenu] = useState<number | null>(null);
 const timeoutRef = useRef<NodeJS.Timeout | null>(null);
 const handleMouseEnter = (id: number) => {
  if (timeoutRef.current) clearTimeout(timeoutRef.current);
  setOpenMenu(id);
 };
 const handleMouseLeave = () => {
  timeoutRef.current = setTimeout(() => {
   setOpenMenu(null);
  }, 200);
 };
 return (
  <>
   {useIn === "HomeHeader" ? (
    <div className="flex gap-4 py-2 text-sm ">
     <ul className="flex flex-col font-medium   rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row">
      {treeData.map((category) => (
       <li
        key={category.id}
        className="relative"
        onMouseEnter={() => handleMouseEnter(category.id)}
        onMouseLeave={handleMouseLeave}
       >
        {category.children && category.children.length > 0 ? (
         <>
          <button className="flex items-center justify-between w-full py-2 text-white rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 md:w-auto">
           {category.name}
           <ChevronDownIcon className="w-4 h-4" />
          </button>
          {openMenu === category.id && (
           <div className="absolute z-40 bg-white rounded-lg shadow-sm w-44 mt-2">
            <ul className="py-2 text-sm text-gray-700">
             {category.children.map((child) => (
              <li key={child.id}>
               <Link
                href={`/main/${child.slug}?category_id=${child.id}`}
                className="block px-4 py-2 hover:bg-gray-100 hover:text-black "
               >
                {child.name}
               </Link>
              </li>
             ))}
            </ul>
           </div>
          )}
         </>
        ) : (
         <Link
          href={`/main/${category.slug}?category_id=${category.id}`}
          className="block  rounded-sm  md:border-0 text-white "
         >
          {category.name}
         </Link>
        )}
       </li>
      ))}
     </ul>
    </div>
   ) : useIn === "HomeMain" ? (
    <section className="py-10 px-4">
     <h2 className="text-xl md:text-2xl font-semibold text-center mb-8">
      {`${lang === "fa" ? "دسته‌بندی محصولات" : "Products Categorise"}`}{" "}
     </h2>
     <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-y-6 gap-x-2 justify-items-center">
      {treeData.map((cat, index) => (
       <Link
        href={`/main/${cat.slug}?category_id=${cat.id}`}
        key={index}
        className="flex flex-col items-center justify-center text-center space-y-2 group cursor-pointer"
       >
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-gray-100 shadow-md flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
         <Image
          src={
           cat?.logo?.large_image_url
            ? cat.logo.large_image_url.replace("/cache/large/", "/storage/")
            : cat?.logo?.large_image_url || "/defult.avif"
          }
          alt={cat.name}
          width={80}
          height={80}
          className="object-contain"
         />
        </div>
        <p className="text-xs md:text-sm font-medium">{cat.name}</p>
       </Link>
      ))}
     </div>
    </section>
   ) : null}
  </>
 );
});
