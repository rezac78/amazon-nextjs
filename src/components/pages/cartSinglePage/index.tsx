"use client";
import Image from "next/image";
import {Button} from "../../ui/button";
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from "../../ui/select";
import React, {useEffect, useState} from "react";
import Loading from "../../common/Loading";

import ProductSlider from "@/components/common/ProductSlider";
import {fetchProductById, fetchProductLike, fetchWishlist} from "@/utils/api/product/fetchProduct";
import {Product} from "@/utils/types/types";
import BreadcrumbComponent from "@/components/common/Breadcrumb";
import ShareSection from "@/components/common/ShareSection";
import {toast} from "sonner";
import getColorCodeFromLabel from "@/utils/getColorCodeFromLabel";
import {CustomerCartAdd} from "@/utils/api/cart";
import {useCartCount} from "@/store/useCounter";
import {isSpecialPriceValid} from "@/utils/priceUtils";
import DiscountRibbon from "./discountRibbon";
import SpecialOfferBanner from "./common/SpecialOfferBanner";
import {type DateObject as DateObjectType} from "react-multi-date-picker";
import StarIcon from "@/public/icons/star";
import ProductTabs from "./common/ProductTabs";
import TechnicalSpecifications from "./common/technicalSpecifications ";

export default function CartSinglePage({Token}: {Token: string}) {
 const [selectedImage, setSelectedImage] = useState<string>("");
 const [loadingLike, setLoadingLike] = useState<boolean>(false);
 const [product, setProduct] = useState<Product | null>(null);
 const [selectedDate, setSelectedDate] = useState<DateObjectType | null>(null);
 const [selectedSlot, setSelectedSlot] = useState<{date: string; slot: string | null} | null>(null);

 const [wishlisted, setWishlisted] = useState(false);
 const [selectedColor, setSelectedColor] = useState<string>("");
 //  const [selectedSize, setSelectedSize] = useState<string>("");
 const [productId, setProductId] = useState<number | null>(null);
 //  const [variantPrice, setVariantPrice] = useState<string | number>("");
 const [selectedQuantity, setSelectedQuantity] = useState<string>("1");
 const {increase} = useCartCount();
 const [selectedDownloadLink, setSelectedDownloadLink] = useState<number | null>(null);
 //  const colorOptions = product?.super_attributes?.find((attr) => attr.code === "color")?.options || [];
 //  const sizeOptions = product?.super_attributes?.find((attr) => attr.code === "size")?.options || [];
 //  useEffect(() => {
 //   if (selectedColor && selectedSize) {
 //    const variant = product?.variants?.find((v) => {
 //     return v?.attributes?.color === Number(selectedColor) && v?.attributes?.size === Number(selectedSize);
 //    });
 //    if (variant) {
 //     setVariantPrice(variant.formatted_price || variant.price);
 //    } else {
 //     setVariantPrice("");
 //    }
 //   }
 //  }, [selectedColor, selectedSize, product?.variants]);
 useEffect(() => {
  const storedId = localStorage.getItem("lastProductId");
  if (storedId) {
   setProductId(Number(storedId));
  }
 }, []);
 useEffect(() => {
  if (productId) {
   (async () => {
    const res = await fetchProductById(productId);

    if (res) {
     setProduct(res);
     if (res?.images?.[0]?.url) setSelectedImage(res.images[0].url);
     if (Token) {
      try {
       setLoadingLike(true);
       const wishlistItems = await fetchWishlist(Token);
       const liked = wishlistItems.some((item: {id: number}) => item.id === res.id);
       setWishlisted(liked);
      } catch (err) {
       console.error("wishlist fetch error:", err);
      } finally {
       setLoadingLike(false);
      }
     }
    }
   })();
  }
 }, [Token, productId]);
 if (!product) return <Loading />;
 const relatedProducts = product.relatedProducts ?? [];
 const upSells = product.upSells ?? [];
 const crossSells = product.crossSells ?? [];
 const handleToggleWishlist = async () => {
  if (!product) return;
  if (!Token) {
   toast.warning("برای افزودن یا حذف از علاقه‌مندی‌ها وارد شوید");
   return;
  }
  setWishlisted(!wishlisted);
  await fetchProductLike(product.id, Token);
 };
 //  const handleAddToCompare = async () => {
 //   if (!product) return;
 //   const success = await addToCompareProduct(product.id, Token);
 //   if (!success) toast.error("افزودن به لیست مقایسه انجام نشد");
 //  };
 const handleQuantityChange = (value: string) => setSelectedQuantity(value);
 const handleAddToCart = async () => {
  if (!product) return;
  if (!Token) {
   toast.warning("ابتدا وارد حساب کاربری شوید");
   return;
  }
  type CartAddData = {
   is_buy_now: number;
   product_id: number;
   quantity: string;
   links?: number[];
   "booking[date]"?: string;
   "booking[slot]"?: string;
   "booking[note]"?: string;
  };

  const data: CartAddData = {
   is_buy_now: 0,
   product_id: product.id,
   quantity: selectedQuantity,
  };
  if (product.type === "downloadable") {
   if (!selectedDownloadLink) {
    toast.warning("یک گزینه دانلود را انتخاب کنید");
    return;
   }
   data.links = [selectedDownloadLink];
  }
  if (product.type === "booking") {
   if (!selectedDate || !selectedSlot) {
    toast.warning("لطفاً تاریخ و زمان رزرو را انتخاب کنید");
    return;
   }
   data["booking[date]"] = selectedSlot.date;
   if (selectedSlot.slot !== null) {
    data["booking[slot]"] = selectedSlot.slot;
   }
   data["booking[note]"] = "bookingNote"; // ← ارسال حتی اگر خالی باشد
  }

  try {
   await CustomerCartAdd(data, Token, String(product.id));
   increase(Number(selectedQuantity));
   toast.success("محصول با موفقیت به سبد خرید اضافه شد");
  } catch (error) {
   toast.error("خطا در اضافه کردن محصول به سبد خرید");
   console.error(error);
  }
 };
 const colorAttributes = product.additionalData?.filter((attr) => attr.code === "color");
 const otherAttributes = product.additionalData?.filter((attr) => attr.code !== "color" && attr.value);
 return (
  <>
   <BreadcrumbComponent Data={product} />
   <div className="container mx-auto p-4 border rounded-12 border-[#E8E8E8]">
    <div className="grid md:grid-cols-2 gap-8 ">
     <div className="relative border border-[#DDDDDD] p-4 rounded-14 ">
      <ShareSection
       onLike={handleToggleWishlist}
       isLiked={wishlisted}
       shareURL={product.shareURL ?? ""}
       loadingLike={loadingLike}
      />
      {isSpecialPriceValid(product) && <SpecialOfferBanner product={product} />}
      <div className="relative md:w-[372px] h-[420px] mx-auto ">
       {selectedImage?.endsWith(".mp4") || selectedImage?.endsWith(".webm") ? (
        <video src={selectedImage} controls autoPlay className="w-full h-full object-contain" />
       ) : (
        <Image src={selectedImage} alt="Main Product" fill className="object-contain" />
       )}
      </div>
      <div className="mt-4 overflow-x-auto">
       <div className="flex gap-2 w-[300px] md:w-max">
        {product?.images?.map((img, index) => (
         <div
          key={index}
          className={`relative w-20 md:w-24 h-20 md:h-24 shrink-0 cursor-pointer border-2 rounded-md ${
           selectedImage === img.url ? "border-blue-500" : "border-gray-200"
          }`}
          onMouseEnter={() => setSelectedImage(img.url ?? "")}
         >
          <Image src={img.url ?? ""} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
         </div>
        ))}
        {Array.isArray(product.videos) && product.videos.length > 0 && product.videos[0]?.url && (
         <div
          className={`relative w-20 md:w-24 h-20 md:h-24 shrink-0 cursor-pointer border-2 rounded-md ${
           selectedImage === product.videos[0].url ? "border-blue-500" : "border-gray-200"
          }`}
          onMouseEnter={() => setSelectedImage(product.videos![0].url)}
         >
          <video src={product.videos[0].url} muted preload="metadata" className="object-cover w-full h-full" />
         </div>
        )}
       </div>
      </div>
     </div>
     <div className="space-y-4 text-sm md:text-base ">
      <h1 className="text-md md:text-lg font-semibold text-right mb-6">{product.name}</h1>
      <div className="flex items-center gap-1">
       <StarIcon className="text-[#E4E82E] w-4 h-4" />
       <span className="font-medium text-xs text-[#808080]">{product.averageRating}</span>
       <span className="text-[#808080] font-medium text-xs">
        {Array.isArray(product.reviews) ? `( از مجموع ${product.reviews.length} نظر کاربران )` : ""}
       </span>
      </div>
      <div className="relative border border-[#DDDDDD] px-4 py-8 rounded-12 grid grid-cols-2 h-[480px]">
       {isSpecialPriceValid(product) && <DiscountRibbon Data={product} />}
       <div className="flex flex-col gap-6">
        <div>
         <h2 className="font-medium text-14px mb-1 text-[#4C4C4C]">انتخاب رنگ</h2>
         <div className="flex gap-2">
          {colorAttributes?.map((colorAttr) => {
           const colorCode = getColorCodeFromLabel(colorAttr.value);
           return (
            <div key={colorAttr.id} className="flex items-center gap-1 border border-[#E8E8E8] rounded-8 p-2">
             <button
              className={`w-4 h-4 rounded-full border ${
               selectedColor === colorAttr.value ? "ring-2 ring-blue-600" : ""
              }`}
              style={{backgroundColor: colorCode}}
              onClick={() => setSelectedColor(colorAttr.value)}
              title={colorAttr.value}
             />
             <div className="text-xs font-medium text-[#696969]">{colorAttr.value}</div>
            </div>
           );
          })}
         </div>
        </div>

        <div>
         <h2 className="font-medium text-14px mb-1 text-[#4C4C4C]">تعداد سفارش محصول</h2>
         <Select value={selectedQuantity} onValueChange={handleQuantityChange}>
          <SelectTrigger className="">
           <SelectValue placeholder="تعداد محصول" />
          </SelectTrigger>
          <SelectContent>
           <SelectGroup>
            <SelectLabel>تعداد محصول</SelectLabel>
            {["1", "2", "3", "4", "5"].map((num) => (
             <SelectItem key={num} value={num}>
              {num}
             </SelectItem>
            ))}
           </SelectGroup>
          </SelectContent>
         </Select>
         {(() => {
          const totalQty = product?.inventories?.reduce((sum, e) => sum + (e.qty ?? 0), 0) || 0;

          if (totalQty === 0) {
           return <p className="text-red-600 text-sm mt-3">متأسفانه این محصول موجود نیست</p>;
          }

          if (totalQty < 10) {
           return <p className="text-red-600 text-sm mt-3">فقط {totalQty} عدد از کالا موجود است</p>;
          }
          return null;
         })()}
        </div>
       </div>
       <div>
        <h2 className="font-bold mb-1">خصوصیات محصول</h2>
        <ul className="list-disc list-inside space-y-1">
         {otherAttributes?.map((attr) => (
          <li key={attr.id}>
           <strong>{attr.label}:</strong> {String(attr.value)}
          </li>
         ))}
        </ul>
       </div>
      </div>
      {/* قیمت */}
     </div>
    </div>
    <div className="bg-blue-50 p-4 rounded-12 space-y-2 w-full my-4">
     <div className="flex justify-between">
      <p className="text-sm">گارانتی ۱۸ ماهه توسعه توان تات (پرهام تک)</p>
      <h1 className="text-xl font-semibold">
       {isSpecialPriceValid(product) ? (
        <div className="flex flex-col">
         <span className="text-red-600">
          {typeof product.specialPrice === "number" ? (product.specialPrice * 100).toLocaleString("IR-fa") : ""}
         </span>
         <span className="line-through text-gray-500 ml-2">{product.priceHtml.formattedFinalPrice}</span>
        </div>
       ) : (
        product.priceHtml.formattedFinalPrice
       )}
      </h1>
     </div>
     <TechnicalSpecifications
      product={product}
      selectedDownloadLink={selectedDownloadLink}
      setSelectedDownloadLink={setSelectedDownloadLink}
      setSelectedDate={setSelectedDate}
      selectedDate={selectedDate}
      setSelectedSlot={setSelectedSlot}
      selectedSlot={selectedSlot}
     />
     <Button
      disabled={
       (product.type === "downloadable" && (product.downloadableLinks?.length ?? 0) > 0 && !selectedDownloadLink) ||
       (product.type === "booking" && !selectedDate)
      }
      className="flex-1 flex items-center gap-2 w-full"
      onClick={handleAddToCart}
     >
      افزودن به سبد
     </Button>
    </div>
   </div>
   <ProductTabs product={product} Token={Token} />
   {relatedProducts.length > 0 && <ProductSlider title="محصولات مرتبط" Data={relatedProducts} />}
   {upSells.length > 0 && <ProductSlider title="محصولات فروش بالا" Data={upSells} />}
   {crossSells.length > 0 && <ProductSlider title="محصولات فروش متقابل" Data={crossSells} />}
  </>
 );
}
