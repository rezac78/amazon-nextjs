"use client";
import ProductCardSkeleton from "../../common/SkeletonComponent/ProductCard";
import dynamic from "next/dynamic";
import { CategoryHome, Product } from "@/utils/types";
import SwiperSkeleton from "@/components/common/SkeletonComponent/SwiperSkeleton";
import HomeCategorisMainSkeleton from "@/components/common/SkeletonComponent/homeCategorisMain";
const ProductCard = dynamic(() => import("@/components/common/ProductCard"), {
        ssr: false,
        loading: () => <ProductCardSkeleton homePage={true} count={8} />,
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
        data: Product[];
        categorie: CategoryHome[];
        isLogin: boolean
}
export default function HomePage({ data, categorie }: HomePageProps) {
        return (
                <div className="relative mt-6">
                        <SwiperCommon />
                        <HomeCategoris Data={categorie} useIn="HomeMain" />
                        <ProductCard homePage={true} products={data} />
                        {/* <PaginationComponent setPage={setPage} page={page} pageInfo={localPageInfo} /> */}
                </div>
        );
}
