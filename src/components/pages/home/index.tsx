"use client";
import dynamic from "next/dynamic";
import {CategoryHome, Product} from "@/utils/types";
import SwiperSkeleton from "@/components/common/SkeletonComponent/SwiperSkeleton";
import HomeCategorisMainSkeleton from "@/components/common/SkeletonComponent/homeCategorisMain";
import SkeletonProducts from "@/components/common/SkeletonComponent/SkeletonProducts";
import React, {useRef, useState, useEffect} from "react";
import {fetchProductAll} from "@/utils/fetchProduct";
const ProductSlider = dynamic(() => import("@/components/common/ProductSlider"), {
 ssr: false,
 loading: () => <SkeletonProducts count={8} />,
});
const HomeCategoris = dynamic(() => import("@/components/common/homeCategoris"), {
 ssr: false,
 loading: () => <HomeCategorisMainSkeleton count={8} />,
});
const SwiperCommon = dynamic(() => import("./common/Swiper"), {
 ssr: false,
 loading: () => <SwiperSkeleton />,
});
interface HomePageProps {
 NewProducts: Product[];
 categorie: CategoryHome[];
 isLogin: boolean;
}

export default function HomePage({NewProducts, categorie}: HomePageProps) {
 const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
 const [isLoadingFeatured, setIsLoadingFeatured] = useState(false);
 const [hasLoadedFeatured, setHasLoadedFeatured] = useState(false);
 const featuredProductsRef = useRef<HTMLDivElement | null>(null);

 const [allProducts, setAllProducts] = useState<Product[]>([]);
 const [isLoadingAll, setIsLoadingAll] = useState(false);
 const [hasLoadedAll, setHasLoadedAll] = useState(false);
 const allProductsRef = useRef<HTMLDivElement | null>(null);
 useEffect(() => {
  const element = featuredProductsRef.current;

  const observer = new IntersectionObserver(
   (entries) => {
    if (entries[0].isIntersecting && !hasLoadedFeatured && !isLoadingFeatured) {
     setIsLoadingFeatured(true);
     fetchProductAll({
      featured: 1,
      sort: "name-desc",
      limit: 12,
     })
      .then((res) => {
       setFeaturedProducts(res);
       setHasLoadedFeatured(true);
      })
      .finally(() => {
       setIsLoadingFeatured(false);
      });
    }
   },
   {threshold: 0.2}
  );

  if (element) {
   observer.observe(element);
  }

  return () => {
   if (element) {
    observer.unobserve(element);
   }
  };
 }, [hasLoadedFeatured, isLoadingFeatured]);

 useEffect(() => {
  const element = allProductsRef.current;

  const observer = new IntersectionObserver(
   (entries) => {
    if (entries[0].isIntersecting && !hasLoadedAll && !isLoadingAll) {
     setIsLoadingAll(true);
     fetchProductAll({
      sort: "name-desc",
      limit: 12,
     })
      .then((res) => {
       setAllProducts(res);
       setHasLoadedAll(true);
      })
      .finally(() => {
       setIsLoadingAll(false);
      });
    }
   },
   {threshold: 0.2}
  );

  if (element) {
   observer.observe(element);
  }

  return () => {
   if (element) {
    observer.unobserve(element);
   }
  };
 }, [hasLoadedAll, isLoadingAll]);

 return (
  <div className="relative mt-6">
   <SwiperCommon />
   <HomeCategoris Data={categorie} useIn="HomeMain" />
   {/* <div className="border rounded-12 pt-4 border-border text-center my-10">
    <h2 className="font-bold text-3xl">محصولات جدید </h2>
    <ProductCard homePage={true} products={NewProducts} />
   </div> */}
   <ProductSlider title="محصولات جدید" Data={NewProducts} link="/search?new=1&sort=price-desc&limit=12&mode=grid" />
   {/* <PaginationComponent setPage={setPage} page={page} pageInfo={localPageInfo} /> */}
   <div ref={featuredProductsRef}>
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
   <div ref={allProductsRef}>
    {hasLoadedFeatured ? (
     <ProductSlider title="همه محصولات" Data={allProducts} link="/search?sort=price-desc&limit=12&mode=grid" />
    ) : (
     <SkeletonProducts count={8} />
    )}
   </div>
  </div>
 );
}
