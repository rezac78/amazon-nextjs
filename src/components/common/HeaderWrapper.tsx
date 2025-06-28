// HeaderWrapper.tsx (Client Component)
"use client";

import {useEffect} from "react";
import {CustomerCartAll} from "@/utils/cart";
import {CategoryHome} from "@/utils/types/types";
import dynamic from "next/dynamic";
import HeaderSkeleton from "./SkeletonComponent/HeaderSkeleton";
import {useCartCount} from "@/store/useCounter";

const Header = dynamic(() => import("../common/Header"), {
 ssr: false,
 loading: () => <HeaderSkeleton />,
});

export default function HeaderWrapper({
 isLogin,
 categorie,
 token,
}: {
 isLogin: boolean;
 categorie: CategoryHome[];
 token: string;
}) {
 const setCount = useCartCount((s) => s.setCount);

 useEffect(() => {
  if (token && token.length > 10) {
   CustomerCartAll(token)
    .then((res) => {
     if (res?.items) {
      const totalQty = res.items.length;
      setCount(totalQty);
     }
    })
    .catch((e) => {
     console.warn("خطا در دریافت سبد خرید:", e);
    });
  }
 }, [token, setCount]);

 return <Header isLogin={isLogin} categorie={categorie} />;
}
