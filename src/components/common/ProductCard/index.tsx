import Link from "next/link";
import {Card, CardAction, CardFooter, CardHeader, CardTitle} from "../../ui/card";
import Image from "next/image";
import {HeartIcon, ShoppingBag} from "lucide-react";
import {Button} from "../../ui/button";
import {Product} from "utils/types";
interface ProductCardProps {
 products: Product[];
}
export default function ProductCard({products}: ProductCardProps) {
 return (
  <div className="my-10">
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-2 md:px-6 -mt-48 relative z-10">
    {products.map((card) => (
     <Link href={`cart/${card.id}`} key={card.id} className="">
      <Card className="group relative flex flex-col justify-between bg-background border border-border min-h-[420px]">
       <CardHeader className="flex-1">
        <Image
         src={card?.images[0]?.url}
         alt={card.name}
         width={300}
         height={300}
         sizes="(max-width: 768px) 100vw, 300px"
         className="object-contain w-52 h-52 mx-auto"
        />

        <hr className="pb-2 text-gray-200" />
        <CardTitle>{card.name}</CardTitle>
        {card.price && (
         <div className="flex items-center justify-end gap-1 text-card-foreground">
          <span className="text-18px font-bold">{card.price}</span>
          <span className="text-14px font-semibold">هزارتومان</span>
         </div>
        )}
       </CardHeader>
       <CardAction className="absolute top-40 right-4 flex flex-col border rounded-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="transition duration-300 ease-in-out transform hover:bg-secondary">
         <HeartIcon className="m-2" />
        </div>
        <hr />
        <div className="transition duration-300 ease-in-out transform hover:bg-secondary">
         <ShoppingBag className="m-2" />
        </div>
       </CardAction>
       <CardFooter>
        <Button className="w-full">اضافه کردن به سبد</Button>
       </CardFooter>
      </Card>
     </Link>
    ))}
   </div>
  </div>
 );
}
