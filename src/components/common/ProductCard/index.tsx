import Link from "next/link";
import {Card, CardAction, CardFooter, CardHeader, CardTitle} from "../../ui/card";
import Image from "next/image";
import {HeartIcon, ShoppingBag} from "lucide-react";
import {Button} from "../../ui/button";
import {Product} from "@/utils/types";
import {useStore} from "@/store/useCounter";
interface ProductCardProps {
 products: Product[];
 homePage?: boolean;
}
export default function ProductCard({products, homePage}: ProductCardProps) {
 const {favorites, cart, addToFavorites, removeFromFavorites, addToCart, removeFromCart} = useStore();
 return (
  <div className="my-10">
   <div
    className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-2 md:px-6 ${
     homePage && "-mt-48"
    }  relative z-10`}
   >
    {products.map((card) => {
     const isFavorite = favorites.some((item) => item.id === card.id);
     const isInCart = cart.some((item) => item.id === card.id);

     return (
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
         <div
          onClick={(e) => {
           e.preventDefault();
           if (isFavorite) {
            removeFromFavorites(card.id);
           } else {
            addToFavorites(card);
           }
          }}
          className={`transition duration-300 ease-in-out transform hover:bg-secondary hover:text-white ${
           isFavorite ? "text-red-500" : "text-black"
          }`}
         >
          <HeartIcon className="m-2 cursor-pointer" />
         </div>
         <hr />
         <div
          onClick={(e) => {
           e.preventDefault();
           if (isInCart) {
            removeFromCart(card.id);
           } else {
            addToCart(card);
           }
          }}
          className={`transition duration-300 transform hover:bg-secondary hover:text-white ${
           isInCart ? "text-green-500" : "text-black"
          }`}
         >
          <ShoppingBag className="m-2 cursor-pointer" />
         </div>
        </CardAction>
        <CardFooter>
         <Button className="w-full">اضافه کردن به سبد</Button>
        </CardFooter>
       </Card>
      </Link>
     );
    })}
   </div>
  </div>
 );
}
