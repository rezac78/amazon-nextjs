"use client";
import Image from "next/image";
import {Button} from "../../ui/button";
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from "../../ui/select";
import React, {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import Loading from "../../common/Loading";

import ProductSlider from "@/components/common/ProductSlider";
import {addToCompareProduct, fetchProductById, fetchProductLike} from "@/utils/fetchProduct";
import {Product} from "@/utils/types";
import BreadcrumbComponent from "@/components/common/Breadcrumb";
import ShareSection from "@/components/common/ShareSection";
import {toast} from "sonner";
export default function CartSinglePage({Token}: {Token: string}) {
 const {id} = useParams();
 const [selectedImage, setSelectedImage] = useState<string>("");
 const [product, setProduct] = useState<Product | null>(null);
 const [wishlisted, setWishlisted] = useState(false);
 useEffect(() => {
  if (id) {
   fetchProductById(Number(id)).then((res) => {
    setProduct(res);
    if (res?.isInWishlist) setWishlisted(true);
    if (res && res.images && res.images.length > 0 && res.images[0].url) {
     setSelectedImage(res.images[0].url ?? "");
    }
   });
  }
 }, [id]);
 if (!product) return <Loading />;
 const relatedProducts = product.relatedProducts ?? [];
 const upSells = product.upSells ?? [];
 const crossSells = product.crossSells ?? [];
 const handleToggleWishlist = async () => {
  if (!product) return;
  if (wishlisted) {
   setWishlisted(false);
   if (!Token) {
    toast.warning("برای حذف از لیست علاقه‌مندی‌ها وارد شوید");
    return;
   }
   await fetchProductLike(product.id, Token);
  } else {
   setWishlisted(true);
   if (!Token) {
    toast.warning("برای افزودن به لیست علاقه‌مندی‌ها وارد شوید");
    return;
   }
   await fetchProductLike(product.id, Token);
  }
 };
 const handleAddToCompare = async () => {
  if (!product) return;
  const success = await addToCompareProduct(product.id, Token);
  if (!success) {
   toast.error("افزودن به لیست مقایسه انجام نشد");
  }
 };
 return (
  <>
   <BreadcrumbComponent Data={product} />
   <div className="flex flex-col md:flex-row gap-1">
    <div className="flex flex-col md:w-[35%] min-w-[35%] h-fit">
     <div className="flex">
      <ShareSection
       onLike={handleToggleWishlist}
       isLiked={wishlisted}
       shareURL={product.shareURL}
       AddToCompare={handleAddToCompare}
      />
      <div className="relative w-[90%] h-[500px] aspect-[16/10] rounded-lg overflow-hidden">
       {selectedImage?.endsWith(".mp4") || selectedImage?.endsWith(".webm") ? (
        <video src={selectedImage} controls autoPlay className="w-full h-full object-contain" />
       ) : (
        <Image src={selectedImage} alt="Main Product" fill className="object-contain" />
       )}
      </div>
     </div>
     <div className="flex flex-row items-center w-full gap-2 overflow-y-auto max-h-[400px] pr-1 z-10">
      {product?.images?.map((img, index) => (
       <div
        key={index}
        className={`relative w-14 h-14 cursor-pointer border-2 rounded-md overflow-hidden ${
         selectedImage === img.url ? "border-blue-500" : "border-gray-200"
        }`}
        onMouseEnter={() => setSelectedImage(img.url ?? "")}
       >
        <Image src={img.url ?? ""} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
       </div>
      ))}
      {Array.isArray(product.videos) && product.videos.length > 0 && product.videos[0]?.url && (
       <div
        className={`relative w-14 h-14 cursor-pointer border-2 rounded-md overflow-hidden ${
         selectedImage === product.videos[0].url ? "border-blue-500" : "border-gray-200"
        }`}
        onMouseEnter={() => setSelectedImage(product.videos![0].url)}
       >
        <video src={product.videos[0].url} muted preload="metadata" className="object-cover w-full h-full" />
       </div>
      )}
     </div>
    </div>
    <div className="flex flex-grow flex-col gap-4">
     <h1 className="text-2xl md:text-3xl font-semibold">{product.name}</h1>
     <div className="text-yellow-500 font-medium text-sm">Amazon&apos;s Choice ✨</div>
     <div className="text-3xl font-bold">{product.price} هزارتومان</div>
     <div className="text-sm text-gray-500">No Import Charges & $46.96 Shipping to Azerbaijan. Delivery June 17–27</div>

     <div className="grid grid-cols-2 gap-4 text-sm border-t border-b py-4">
      <div>
       <strong>Brand:</strong> HP
      </div>
      <div>
       <strong>Model:</strong> 15-fa1082wm
      </div>
      <div>
       <strong>Screen Size:</strong> 15.6&quot;
      </div>
      <div>
       <strong>Color:</strong> Silver
      </div>
      <div>
       <strong>CPU:</strong> Intel Core i5-13420H
      </div>
      <div>
       <strong>GPU:</strong> NVIDIA RTX 4050 6GB
      </div>
      <div>
       <strong>RAM:</strong> 16GB DDR4
      </div>
      <div>
       <strong>Storage:</strong> 512GB SSD
      </div>
     </div>

     <div className="space-y-2 text-sm text-gray-700">
      <div className="!leading-[2.5rem] text-justify" dangerouslySetInnerHTML={{__html: product.description}} />
     </div>
    </div>
    <div className="flex flex-col md:w-[19%] min-w-[19%] gap-4 border border-border rounded-2xl p-4 text-right h-fit">
     <h1 className="text-2xl md:text-3xl font-semibold">500 هزار تومان</h1>
     <span>در این قسمت توضیحات کوتاه قرار میگیره</span>
     <div className="flex flex-col gap-4 mt-4">
      <Select>
       <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a fruit" />
       </SelectTrigger>
       <SelectContent>
        <SelectGroup>
         <SelectLabel>تعداد محصول</SelectLabel>
         <SelectItem value="apple">1</SelectItem>
         <SelectItem value="banana">2</SelectItem>
         <SelectItem value="blueberry">3</SelectItem>
         <SelectItem value="grapes">4</SelectItem>
         <SelectItem value="pineapple">5</SelectItem>
        </SelectGroup>
       </SelectContent>
      </Select>
      <Button className="flex-1 flex items-center gap-2">افزودن به سبد</Button>
      <Button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black">خرید</Button>
      <Button variant="outline" className="flex-1  hover:text-black">
       اضافه کردن به لیست
      </Button>
     </div>
    </div>
   </div>
   {relatedProducts.length > 0 && <ProductSlider title="محصولات مرتبط" Data={relatedProducts} />}
   {upSells.length > 0 && <ProductSlider title="محصولات فروش بالا" Data={upSells} />}
   {crossSells.length > 0 && <ProductSlider title="محصولات فروش متقابل" Data={crossSells} />}
  </>
 );
}
