import {CategoryHome} from "@/utils/types";
import {
 NavigationMenu,
 NavigationMenuContent,
 NavigationMenuItem,
 NavigationMenuLink,
 NavigationMenuList,
 NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import Image from "next/image";

interface HomeCategoriesProps {
 Data: CategoryHome[];
 useIn: string;
}

export default function HomeCategoris({Data, useIn}: HomeCategoriesProps) {
 return (
  <>
   {useIn === "HomeHeader" ? (
    <NavigationMenu viewport={false} className="text-white bg-transparent px-2 py-1 relative z-20">
     <NavigationMenuList className="gap-2">
      {Data.map((category) => (
       <NavigationMenuItem key={category.id}>
        {category.children && category.children.length > 0 ? (
         <>
          <NavigationMenuTrigger className="bg-transparent text-white hover:underline px-2 py-1">
           {category.name}
          </NavigationMenuTrigger>
          <NavigationMenuContent dir="rtl" className="bg-white text-black shadow-md border  rounded-md mt-1 ">
           <ul className="grid w-[200px] gap-2 p-2 text-sm ">
            {category.children.map((child) => (
             <li key={child.id}>
              <NavigationMenuLink asChild>
               <Link href={`/category/${child.slug}`} className="block hover:text-black hover:bg-transparent">
                {child.name}
               </Link>
              </NavigationMenuLink>
             </li>
            ))}
           </ul>
          </NavigationMenuContent>
         </>
        ) : (
         <NavigationMenuLink asChild>
          <Link href={`/category/${category.slug}`} className="px-2 py-1 text-sm hover:underline hover:bg-transparent">
           {category.name}
          </Link>
         </NavigationMenuLink>
        )}
       </NavigationMenuItem>
      ))}
     </NavigationMenuList>
    </NavigationMenu>
   ) : useIn === "HomeMain" ? (
    <section className="py-10 px-4">
     <h2 className="text-xl md:text-2xl font-semibold text-center mb-8">خرید بر اساس دسته‌بندی</h2>
     <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-y-6 gap-x-2 justify-items-center">
      {Data.map((cat, index) => (
       <div
        key={index}
        className="flex flex-col items-center justify-center text-center space-y-2 group cursor-pointer"
       >
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-gray-100 shadow-md flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
         <Image src={cat.logoUrl ?? ""} alt={cat.name} width={80} height={80} className="object-contain" />
        </div>
        <p className="text-xs md:text-sm font-medium">{cat.name}</p>
       </div>
      ))}
     </div>
    </section>
   ) : null}
  </>
 );
}
