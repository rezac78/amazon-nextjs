"use client";

import React, {useEffect, useState} from "react";
import {CategoryHome, Product} from "@/utils/types/types";
import {fetchProductAll} from "@/utils/fetchProduct";

// UI Components
import Slider from "@/components/common/Slider/Slider";
import ProductSlider from "@/components/common/ProductSlider";
import HomeCategoris from "@/components/common/homeCategoris";

// Skeletons
import SwiperSkeleton from "@/components/common/SkeletonComponent/SwiperSkeleton";
import HomeCategorisMainSkeleton from "@/components/common/SkeletonComponent/homeCategorisMain";
import SkeletonProducts from "@/components/common/SkeletonComponent/SkeletonProducts";

// Hooks
import useHydration from "@/utils/seHydration";
import {useInView} from "react-intersection-observer";

interface HomePageProps {
 NewProducts: Product[];
 categorie: CategoryHome[];
 isLogin: boolean;
}

export default function HomePage({NewProducts, categorie}: HomePageProps) {
 const isHydrated = useHydration();

 // Featured products
 const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
 const [hasLoadedFeatured, setHasLoadedFeatured] = useState(false);
 const {ref: featuredRef, inView: featuredInView} = useInView({triggerOnce: true, threshold: 0.2});

 // All products
 const [allProducts, setAllProducts] = useState<Product[]>([]);
 const [hasLoadedAll, setHasLoadedAll] = useState(false);
 const {ref: allRef, inView: allInView} = useInView({triggerOnce: true, threshold: 0.2});

 // Fetch featured products
 useEffect(() => {
  if (featuredInView && !hasLoadedFeatured) {
   fetchProductAll({featured: 1, sort: "name-desc", limit: 12}).then((res) => {
    setFeaturedProducts(res);
    setHasLoadedFeatured(true);
   });
  }
 }, [featuredInView, hasLoadedFeatured]);

 // Fetch all products
 useEffect(() => {
  if (allInView && !hasLoadedAll) {
   fetchProductAll({sort: "name-desc", limit: 12}).then((res) => {
    setAllProducts(res);
    setHasLoadedAll(true);
   });
  }
 }, [allInView, hasLoadedAll]);

 // Static banner images
 const images = ["/pages/home/slide1.webp", "/pages/home/slide2.webp", "/pages/home/slide3.webp"];
 console.log(NewProducts);
 return (
  <div className="relative mt-6">
   <section className="w-full mx-auto my-10 px-4 ">
    {isHydrated ? <Slider images={images} interval={4000} /> : <SwiperSkeleton />}
   </section>
   <div className="container ">
    {isHydrated ? <HomeCategoris Data={categorie} useIn="HomeMain" /> : <HomeCategorisMainSkeleton count={6} />}
    {isHydrated ? (
     <ProductSlider title="محصولات جدید" Data={NewProducts} link="/search?new=1&sort=price-desc&limit=12&mode=grid" />
    ) : (
     <SkeletonProducts count={8} />
    )}
    <div ref={featuredRef}>
     {hasLoadedFeatured ? (
      <ProductSlider
       title="محصولات ویژه"
       Data={featuredProducts}
       link="/search?featured=1&sort=price-desc&limit=12&mode=grid"
      />
     ) : (
      <SkeletonProducts count={8} />
     )}
    </div>
    <div ref={allRef}>
     {hasLoadedAll ? (
      <ProductSlider title="همه محصولات" Data={allProducts} link="/search?sort=price-desc&limit=12&mode=grid" />
     ) : (
      <SkeletonProducts count={8} />
     )}
    </div>
   </div>
  </div>
 );
}
