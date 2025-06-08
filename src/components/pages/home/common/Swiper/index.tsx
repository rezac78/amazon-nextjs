import {Swiper, SwiperSlide} from "swiper/react";
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
import Image from "next/image";

export default function SwiperCommon() {
 return (
  <Swiper
   modules={[Navigation, Autoplay]}
   navigation
   autoplay={{delay: 4000}}
   loop={true}
   className="mySwiper relative z-0"
  >
   {sliderItems.map((item,idx) => (
    <SwiperSlide key={item.id}>
     <div className="relative w-full h-96 md:h-[400px] overflow-hidden">
      <Image
       src={item.image}
       alt={item.title}
       width={1200}
       height={700}
       sizes="(max-width: 768px) 100vw, 1200px"
       loading={idx === 0 ? "eager" : "lazy"}
       className="w-full h-full"
       placeholder="blur"
       blurDataURL="/pages/home/download.png"
      />
     </div>
    </SwiperSlide>
   ))}
  </Swiper>
 );
}
