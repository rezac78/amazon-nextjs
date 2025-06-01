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
export default function HomePage() {
 return (
  <div className="">
   <Swiper modules={[Navigation, Autoplay]} navigation autoplay={{delay: 4000}} loop={true} className="mySwiper">
    {sliderItems.map((item) => (
     <SwiperSlide key={item.id}>
      <div className="relative w-full h-96 md:h-[600px] overflow-hidden">
       <Image src={item.image} alt={item.title} width={1200} height={700} className="w-full h-full " />
      </div>
     </SwiperSlide>
    ))}
   </Swiper>
  </div>
 );
}
