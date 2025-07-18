"use client";

import React, {useEffect, useState} from "react";
import {CategoryHome, Product} from "@/utils/types/types";
import {fetchProductAll} from "@/utils/api/product/fetchProduct";
import Slider from "@/components/common/Slider/Slider";
import ProductSlider from "@/components/common/ProductSlider";
import HomeCategoris from "@/components/common/homeCategoris";
import SwiperSkeleton from "@/components/common/SkeletonComponent/SwiperSkeleton";
import HomeCategorisMainSkeleton from "@/components/common/SkeletonComponent/homeCategorisMain";
import SkeletonProducts from "@/components/common/SkeletonComponent/SkeletonProducts";
import useHydration from "@/utils/seHydration";
import {useInView} from "react-intersection-observer";

interface HomePageProps {
 NewProducts: Product[];
 categorie: CategoryHome[];
 isLogin: boolean;
 lang: string;
}

export default function HomePage({NewProducts, categorie, lang}: HomePageProps) {
 const isHydrated = useHydration();
 const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
 const [hasLoadedFeatured, setHasLoadedFeatured] = useState(false);
 const {ref: featuredRef, inView: featuredInView} = useInView({triggerOnce: true, threshold: 0.2});
 const [allProducts, setAllProducts] = useState<Product[]>([]);
 const [hasLoadedAll, setHasLoadedAll] = useState(false);
 const {ref: allRef, inView: allInView} = useInView({triggerOnce: true, threshold: 0.2});
 useEffect(() => {
  if (featuredInView && !hasLoadedFeatured) {
   fetchProductAll({featured: 1, sort: "name-desc", limit: 12}).then((res) => {
    setFeaturedProducts(res);
    setHasLoadedFeatured(true);
   });
  }
 }, [featuredInView, hasLoadedFeatured]);
 useEffect(() => {
  if (allInView && !hasLoadedAll) {
   fetchProductAll({sort: "name-desc", limit: 12}).then((res) => {
    setAllProducts(res);
    setHasLoadedAll(true);
   });
  }
 }, [allInView, hasLoadedAll]);
 const images = ["/pages/home/slide1.webp", "/pages/home/slide2.webp", "/pages/home/slide3.webp"];
 return (
  <div className="relative flex flex-col w-full">
   <section className="w-full">{isHydrated ? <Slider images={images} interval={4000} /> : <SwiperSkeleton />}</section>
   <div className="container mx-auto">
    {isHydrated ? (
     <HomeCategoris Data={categorie} useIn="HomeMain" lang={lang} />
    ) : (
     <HomeCategorisMainSkeleton count={6} />
    )}
    {isHydrated ? (
     <ProductSlider
      title={`${lang === "fa" ? "محصولات جدید" : "new Products"}`}
      Data={NewProducts}
      link="/search?new=1&sort=price-desc&limit=12&mode=grid"
      lang={lang}
     />
    ) : (
     <SkeletonProducts count={8} />
    )}
    <div ref={featuredRef}>
     {hasLoadedFeatured ? (
      <ProductSlider
       title={`${lang === "fa" ? "محصولات ویژه" : "special Products"}`}
       Data={featuredProducts}
       link="/search?featured=1&sort=price-desc&limit=12&mode=grid"
       lang={lang}
      />
     ) : (
      <SkeletonProducts count={8} />
     )}
    </div>
    <div ref={allRef}>
     {hasLoadedAll ? (
      <ProductSlider
       title={`${lang === "fa" ? "همه محصولات" : "all Products"}`}
       Data={allProducts}
       link="/search?sort=price-desc&limit=12&mode=grid"
       lang={lang}
      />
     ) : (
      <SkeletonProducts count={8} />
     )}
    </div>
   </div>
  </div>
 );
}
