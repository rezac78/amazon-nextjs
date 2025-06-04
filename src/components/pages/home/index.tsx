"use client";
import Image from "next/image";
import {Navigation, Autoplay} from "swiper/modules";

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
import {useEffect, useState} from "react";
import ProductCardSkeleton from "../../common/ProductCardSkeleton";
import dynamic from "next/dynamic";
import {Swiper, SwiperSlide} from "swiper/react";
import {Product} from "@/utils/types";
import {fetchProducts} from "@/utils/fetchProduct";
const ProductCard = dynamic(() => import("@/components/common/ProductCard"), { ssr: false });
const PaginationComponent = dynamic(() => import("../../common/Pagination"), {ssr: false});

interface HomePageProps {
 data: Product[];
 pageInfo: {
  currentPage: number;
  lastPage: number;
 };
}
export default function HomePage({data, pageInfo}: HomePageProps) {
 const [products, setProducts] = useState<Product[]>(data);
 const [loading, setLoading] = useState(false);
 const [page, setPage] = useState(pageInfo.currentPage);
 const [localPageInfo, setLocalPageInfo] = useState(pageInfo);
 useEffect(() => {
  if (page !== pageInfo.currentPage) {
   setLoading(true);
   fetchProducts({page, limit: 12}).then(({data, pageInfo}) => {
    setProducts(data);
    setLocalPageInfo(pageInfo);
    setLoading(false);
   });
  }
 }, [page, pageInfo.currentPage]);
 if (loading) return <ProductCardSkeleton count={8} />;
 return (
  <div className="relative">
   <Swiper
    modules={[Navigation, Autoplay]}
    navigation
    autoplay={{delay: 4000}}
    loop={true}
    className="mySwiper relative z-0"
   >
    {sliderItems.map((item, idx) => (
     <SwiperSlide key={item.id}>
      <div className="relative w-full h-96 md:h-[600px] overflow-hidden">
       <Image
        src={item.image}
        alt={item.title}
        width={1200}
        height={700}
        sizes="(max-width: 768px) 100vw, 1200px"
        priority={idx === 0}
        loading={idx === 0 ? "eager" : "lazy"}
        className="w-full h-full object-cover"
       />
      </div>
     </SwiperSlide>
    ))}
   </Swiper>
   <ProductCard homePage={true} products={products} />
   <PaginationComponent setPage={setPage} page={page} pageInfo={localPageInfo} />
  </div>
 );
}
