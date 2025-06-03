"use client";
import Image from "next/image";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {useRef} from "react";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card"


const products = [
 {
  id: 1,
  name: "ASUS TUF Gaming A15",
  image: "/pages/home/headphone-5.webp",
  price: "$599.99",
  rating: 4.5,
  reviewCount: 346,
  discount: "-14%",
  oldPrice: "$699.99",
  tag: "Amazon's Choice",
 },
 {
  id: 2,
  name: "ASUS TUF Gaming A15",
  image: "/pages/home/headphone-5.webp",
  price: "$599.99",
  rating: 4.5,
  reviewCount: 346,
  discount: "-14%",
  oldPrice: "$699.99",
  tag: "Amazon's Choice",
 },
 {
  id: 3,
  name: "ASUS TUF Gaming A15",
  image: "/pages/home/headphone-5.webp",
  price: "$599.99",
  rating: 4.5,
  reviewCount: 346,
  discount: "-14%",
  oldPrice: "$699.99",
  tag: "Amazon's Choice",
 },
 {
  id: 4,
  name: "ASUS TUF Gaming A15",
  image: "/pages/home/headphone-5.webp",
  price: "$599.99",
  rating: 4.5,
  reviewCount: 346,
  discount: "-14%",
  oldPrice: "$699.99",
  tag: "Amazon's Choice",
 },
 {
  id: 5,
  name: "ASUS TUF Gaming A15",
  image: "/pages/home/headphone-5.webp",
  price: "$599.99",
  rating: 4.5,
  reviewCount: 346,
  discount: "-14%",
  oldPrice: "$699.99",
  tag: "Amazon's Choice",
 },
 {
  id: 6,
  name: "ASUS TUF Gaming A15",
  image: "/pages/home/headphone-5.webp",
  price: "$599.99",
  rating: 4.5,
  reviewCount: 346,
  discount: "-14%",
  oldPrice: "$699.99",
  tag: "Amazon's Choice",
 },
 {
  id: 7,
  name: "ASUS TUF Gaming A15",
  image: "/pages/home/headphone-5.webp",
  price: "$599.99",
  rating: 4.5,
  reviewCount: 346,
  discount: "-14%",
  oldPrice: "$699.99",
  tag: "Amazon's Choice",
 },
 {
  id: 8,
  name: "ASUS TUF Gaming A15",
  image: "/pages/home/headphone-5.webp",
  price: "$599.99",
  rating: 4.5,
  reviewCount: 346,
  discount: "-14%",
  oldPrice: "$699.99",
  tag: "Amazon's Choice",
 },
];

export default function ProductSlider() {
 const sliderRef = useRef<HTMLDivElement>(null);

 const scroll = (direction: "left" | "right") => {
  if (sliderRef.current) {
   const scrollAmount = direction === "left" ? -300 : 300;
   sliderRef.current.scrollBy({left: scrollAmount, behavior: "smooth"});
  }
 };

 return (
  <div className="relative w-full px-4">
   <div className="flex items-center justify-between mb-4">
    <h2 className="text-lg font-bold">محصولات مرتبط</h2>
    <span className="text-sm text-muted-foreground">Page 1 of 4</span>
   </div>
   <Carousel className="w-full max-w-xs">
    <CarouselContent>
     {Array.from({length: 5}).map((_, index) => (
      <CarouselItem key={index}>
       <div className="p-1">
        <Card>
         <CardContent className="flex aspect-square items-center justify-center p-6">
          <span className="text-4xl font-semibold">{index + 1}</span>
         </CardContent>
        </Card>
       </div>
      </CarouselItem>
     ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
   </Carousel>
  </div>
 );
}
