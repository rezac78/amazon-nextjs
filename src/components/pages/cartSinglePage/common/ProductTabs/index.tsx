"use client";

import {useState} from "react";

import {Product} from "@/utils/types/types";
import CommentsTab from "../comments";

export default function ProductTabs({product, Token, lang}: {product: Product; Token: string; lang: string}) {
 const tabs = lang === "fa" ? ["توضیحات", "نظرات کاربران"] : ["Description", "User Reviews"];
 const [activeTab, setActiveTab] = useState(lang === "fa" ? "توضیحات" : "Description");
 return (
  <div className="w-full mx-auto space-y-6 border border-[#E8E8E8] rounded-12 my-6 min-h-[600px]">
   <div className="flex flex-wrap border-b text-sm font-medium">
    {tabs.map((tab) => (
     <button
      key={tab}
      onClick={() => setActiveTab(tab)}
      className={`py-2 px-4 border-b-2 ${
       activeTab === tab ? "border-blue-600 text-blue-600" : "border-transparent text-gray-600 hover:text-blue-600"
      }`}
     >
      {tab}
     </button>
    ))}
   </div>
   {activeTab === (lang === "fa" ? "نظرات کاربران" : "User Reviews") && (
    <CommentsTab product={product} ProductId={product.id} Token={Token} lang={lang} />
   )}
   {activeTab === (lang === "fa" ? "توضیحات" : "Description") && (
    <div className="text-gray-600 px-4">
     <div className="space-y-2 text-sm text-gray-700 overflow-auto h-[700px]">
      <div className="!leading-[2.5rem] text-justify" dangerouslySetInnerHTML={{__html: product.description ?? ""}} />
     </div>
    </div>
   )}
  </div>
 );
}
