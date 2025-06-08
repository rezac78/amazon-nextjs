import Link from "next/link";
import {Card, CardAction, CardFooter, CardHeader, CardTitle} from "../../ui/card";
import Image from "next/image";
import {Button} from "../../ui/button";
import {ProductSliderItem} from "@/utils/types";
import {useStore} from "@/store/useCounter";
import HeartIcon from "@/public/icons/Heart";
import ShoppingBagIcon from "@/public/icons/ShoppingBag";
import {removeProductFromWishlist} from "@/utils/fetchProduct";
import {toast} from "sonner";
import {useState} from "react";
interface ProductCardProps {
 products: ProductSliderItem[];
 homePage?: boolean;
 Token?: string;
}
export default function ProductCard({products, homePage, Token}: ProductCardProps) {
 const {cart} = useStore();
 const [wishlistProducts, setWishlistProducts] = useState(products);
 const handleToggleWishlist = async (productId: number) => {
  if (!Token) return toast.warning("برای مدیریت علاقه‌مندی‌ها وارد شوید");

  const success = await removeProductFromWishlist(productId, Token);
  if (success) {
   setWishlistProducts((prev) => prev.filter((p) => p.id !== productId));
  } else {
   toast.error("خطا در حذف از لیست علاقه‌مندی‌ها");
  }
 };
 return (
  <div className="my-10">
   <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-2 md:px-6 ${homePage && ""}`}>
    {wishlistProducts.map((card) => {
     const isInCart = cart.some((item) => item.id === card.id);
     return (
      <Link href={`/${card.id}`} key={card.id} className="">
       <Card
        className={`group relative flex flex-col justify-between bg-background border border-border ${
         !homePage ? "min-h-[420px]" : "min-h-[250px]"
        } `}
       >
        <CardHeader className="flex-1">
         <Image
          src={
           card?.images?.[0]?.large_image_url
            ? card.images[0].large_image_url.replace("/cache/large/", "/storage/")
            : card?.images?.[0]?.url || "/default.avif"
          }
          alt={card.name}
          width={!homePage ? 150 : 300}
          height={!homePage ? 150 : 300}
          sizes={`(max-width: 768px) 100vw, ${!homePage ? "300px" : "150px"}`}
          className={`object-contain ${!homePage ? "w-52 h-52" : "w-36 h-36"} mx-auto`}
         />
         {!homePage && <hr className="pb-2 text-gray-200" />}
         <CardTitle>{card.name}</CardTitle>
         {card.price && (
          <div className="flex items-center justify-end gap-1 text-card-foreground">
           <span className="text-18px font-bold">{card.price}</span>
           <span className="text-14px font-semibold">هزارتومان</span>
          </div>
         )}
        </CardHeader>
        <CardAction
         className={`absolute ${
          !homePage ? "top-40" : "top-10"
         } right-4 flex flex-col border rounded-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        >
         <div
          onClick={(e) => {
           e.preventDefault();
           handleToggleWishlist(card.id);
          }}
          className={`transition duration-300 ease-in-out transform hover:bg-secondary hover:text-white ${
           card.isInWishlist ? "text-red-500" : "text-black"
          }`}
         >
          <HeartIcon className="m-2 cursor-pointer" />
         </div>
         <hr />
         <div
          className={`transition duration-300 transform hover:bg-secondary hover:text-white ${
           isInCart ? "text-green-500" : "text-black"
          }`}
         >
          <ShoppingBagIcon className="m-2 cursor-pointer" />
         </div>
        </CardAction>
        {!homePage && (
         <CardFooter>
          <Button className="w-full">اضافه کردن به سبد</Button>
         </CardFooter>
        )}
       </Card>
      </Link>
     );
    })}
   </div>
  </div>
 );
}
