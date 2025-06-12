import Link from "next/link";
import {Card, CardAction, CardContent, CardHeader, CardTitle} from "../../ui/card";
import Image from "next/image";
import {ProductSliderItem} from "@/utils/types";
import {useStore} from "@/store/useCounter";
import HeartIcon from "@/public/icons/Heart";
import ShoppingBagIcon from "@/public/icons/ShoppingBag";
import {fetchProductLike} from "@/utils/fetchProduct";
import {toast} from "sonner";
import {useState} from "react";
import {usePathname} from "next/navigation";

interface ProductCardProps {
 products: ProductSliderItem[];
 homePage?: boolean;
 onWishlistToggle?: (productId: number, liked: boolean) => void;
 Token?: string;
}
export default function ProductCard({products, homePage, onWishlistToggle, Token}: ProductCardProps) {
 const {cart} = useStore();
 const [wishlistProducts, setWishlistProducts] = useState(products);
 const pathname = usePathname();
 const handleToggleWishlist = async (productId: number) => {
  if (!Token) return toast.warning("برای مدیریت علاقه‌مندی‌ها وارد شوید");

  const success = await fetchProductLike(productId, Token);
  if (success) {
   const product = wishlistProducts.find((p) => p.id === productId);
   const liked = !(product?.isInWishlist ?? false);

   setWishlistProducts((prev) =>
    prev.map((p) =>
     p.id === productId
      ? ({
         ...p,
         isInWishlist: liked,
         price: Number(p.price),
        } as ProductSliderItem)
      : p
    )
   );
   onWishlistToggle?.(productId, liked);
  } else {
   toast.error("خطا در تغییر وضعیت علاقه‌مندی");
  }
  if (pathname.slice(1) === "favorite") {
   setWishlistProducts((prev) => prev.filter((p) => p.id !== productId));
  }
 };

 return (
  <div className="my-10">
   <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2 md:px-6`}>
    {wishlistProducts.map((card) => {
     const isInCart = cart.some((item) => item.id === card.id);
     return (
      <Link
       onClick={() => {
        localStorage.setItem("lastProductId", String(card.id));
       }}
       href={`/${card.url_key}`}
       key={card.id}
       className=""
      >
       <Card
        className={`group relative flex flex-col justify-between bg-background border border-border min-h-[320px] h-[320px]`}
       >
        <CardHeader className="flex-1 w-full ">
         <div className="w-[150px] h-[150px] relative mx-auto">
          <Image
           src={
            card?.images?.[0]?.large_image_url
             ? card.images[0].large_image_url.replace("/cache/large/", "/storage/")
             : card?.images?.[0]?.url || "/defult.avif"
           }
           alt={card.name}
           width={250}
           height={250}
           sizes={`(max-width: 768px) 100vw, ${!homePage ? "150px" : "300px"}`}
           className="object-contain"
           loading="lazy"
          />
         </div>
        </CardHeader>
        <CardContent>
         <CardTitle className="line-clamp-2 leading-relaxed text-[16px] min-h-[48px]">{card.name}</CardTitle>
         {card.price && (
          <div className="flex items-center justify-end gap-1 text-card-foreground mt-1">
           <span className="text-[18px] font-bold">{card.price}</span>
           <span className="text-[14px] font-semibold">هزارتومان</span>
          </div>
         )}
        </CardContent>
        <CardAction
         className={`absolute ${
          !homePage ? "top-40" : "top-10"
         } right-4 flex flex-col border rounded-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white shadow-md`}
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
       </Card>
      </Link>
     );
    })}
   </div>
  </div>
 );
}
