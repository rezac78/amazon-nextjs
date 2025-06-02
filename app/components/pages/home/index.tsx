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
const cards = [
 {
  id: 1,
  lable: "Headphones",
  title: "Headphones Wireless",
  price: "$103.20",
  image: "/pages/home/headphone-5.webp",
  description:
   "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet ill",
 },
 {
  id: 2,
  lable: "Headphones",
  title: "Headphones Wireless",
  price: "$103.20",
  image: "/pages/home/headphone-5.webp",
  description:
   "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet ill",
 },
 {
  id: 3,
  lable: "Headphones",
  title: "Headphones Wireless",
  price: "$103.20",
  image: "/pages/home/headphone-5.webp",
  description:
   "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet ill",
 },
 {
  id: 4,
  lable: "Headphones",
  title: "Headphones Wireless",
  price: "$103.20",
  image: "/pages/home/headphone-5.webp",
  description:
   "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet ill",
 },
];
import {Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {HeartIcon, ShoppingBag} from "lucide-react";

function useHasMounted() {
 const [hasMounted, setHasMounted] = useState(false);
 useEffect(() => {
  setHasMounted(true);
 }, []);
 return hasMounted;
}

export default function HomePage() {
 const {t} = useTranslation();
 const hasMounted = useHasMounted();
 if (!hasMounted) return null;

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
   <div className="absolute top-96 w-full z-[999]">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-2 md:px-6">
     {cards.map((card) => (
      <Card key={card.id} className="relative flex flex-col justify-between bg-background border border-border">
       <CardHeader>
        <Image src={card.image} alt={card.title} width={700} height={700} className="w-60 h-60 mx-auto" />
        <hr className="pb-2 text-gray-200" />
        <span className="text-16px font-weight-demibold text-card-foreground">{card.lable}</span>
        <CardTitle>{card.title}</CardTitle>
        <span className="text-16px font-weight-demibold text-card-foreground">{card.price}</span>
        <CardDescription>{card.description}</CardDescription>
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
     ))}
    </div>
   </div>
  </div>
 );
}
