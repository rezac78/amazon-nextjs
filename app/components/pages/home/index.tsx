"use client";
import Image from "next/image";
import {Navigation, Autoplay} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";

const sliderItems = [
 {
  id: 1,
  image: "/pages/home/slide1.webp",
  title: "محصول اول",
  description: "توضیح کوتاه درباره محصول اول",
 },
 {
  id: 2,
  image: "/pages/home/slide2.webp",
  title: "محصول دوم",
  description: "توضیحی درباره محصول دوم که خیلی جالبه!",
 },
 {
  id: 3,
  image: "/pages/home/slide3.webp",
  title: "محصول سوم",
  description: "اطلاعات مفید درباره محصول سوم",
 },
];
import {Card, CardAction, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {useTranslation} from "react-i18next";
import {HeartIcon, ShoppingBag} from "lucide-react";
import {useEffect, useState} from "react";
import PaginationComponent from "../../common/Pagination";
import Link from "next/link";
import ProductCardSkeleton from "../../common/ProductCardSkeleton";
import {fetchProducts} from "@/app/utils/fetchProduct";
import {Product} from "@/app/utils/types";

export default function HomePage() {
 const {t} = useTranslation();
 const [products, setProducts] = useState<Product[]>([]);
 const [loading, setLoading] = useState(true);
 const [page, setPage] = useState(1);
 const [limit] = useState(12);
 const [pageInfo, setPageInfo] = useState<{currentPage: number; lastPage: number}>({
  currentPage: 1,
  lastPage: 1,
 });
 useEffect(() => {
  fetchProducts({page, limit}).then(({data, pageInfo}) => {
   setProducts(data);
   setPageInfo(pageInfo);
   setLoading(false);
  });
 }, [page, limit]);

 if (loading) return <ProductCardSkeleton count={8} />;
 return (
  <div className="relative">
   <Swiper modules={[Navigation, Autoplay]} navigation autoplay={{delay: 4000}} loop={true} className="mySwiper">
    {sliderItems.map((item) => (
     <SwiperSlide key={item.id}>
      <div className="relative w-full h-96 md:h-[600px] overflow-hidden">
       <Image src={item.image} alt={item.title} width={1200} height={700} className="w-full h-full " />
      </div>
     </SwiperSlide>
    ))}
   </Swiper>
   <div className="my-10">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-2 md:px-6">
     {products.map((card) => (
      <Link href={`cart/${card.id}`} key={card.id} className="">
       <Card className="relative flex flex-col justify-between bg-background border border-border min-h-[420px]">
        <CardHeader className="flex-1">
         <Image
          src={card?.images[0]?.url}
          alt={card.name}
          width={700}
          height={700}
          className="w-52 h-52 object-contain mx-auto"
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
        <CardAction className="absolute top-40 right-4 flex flex-col  border rounded-4">
         <div className="transition duration-300 ease-in-out transform hover:bg-secondary rounded">
          <HeartIcon className="m-2" />
         </div>
         <hr />
         <div className="transition duration-300 ease-in-out transform hover:bg-secondary rounded">
          <ShoppingBag className="m-2" />
         </div>
        </CardAction>
        <CardFooter>
         <Button className="w-full">{t("addcart")}</Button>
        </CardFooter>
       </Card>
      </Link>
     ))}
    </div>
   </div>
   <PaginationComponent setPage={setPage} page={page} pageInfo={pageInfo} />
  </div>
 );
}
