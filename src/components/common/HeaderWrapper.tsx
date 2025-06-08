"use client";

import dynamic from "next/dynamic";
import {CategoryHome} from "@/utils/types";
import HeaderSkeleton from "./SkeletonComponent/HeaderSkeleton";

const Header = dynamic(() => import("../common/Header"), {
 ssr: false,
 loading: () => <HeaderSkeleton/>,
});

export default function HeaderWrapper({isLogin, categorie}: {isLogin: boolean; categorie: CategoryHome[]}) {
 return <Header isLogin={isLogin} categorie={categorie} />;
}
