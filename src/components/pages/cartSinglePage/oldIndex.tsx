"use client";
import Image from "next/image";
import {Button} from "../../ui/button";
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from "../../ui/select";
import React, {useEffect, useState} from "react";
import Loading from "../../common/Loading";

import ProductSlider from "@/components/common/ProductSlider";
import {addToCompareProduct, fetchProductById, fetchProductLike, fetchWishlist} from "@/utils/api/product/fetchProduct";
import {Product} from "@/utils/types/types";
import BreadcrumbComponent from "@/components/common/Breadcrumb";
import ShareSection from "@/components/common/ShareSection";
import {toast} from "sonner";
import getColorCodeFromLabel from "@/utils/getColorCodeFromLabel";
import {CustomerCartAdd} from "@/utils/api/cart";
import {useCartCount} from "@/store/useCounter";
import BookingSection from "./common/booking";
import Downloadable from "./common/downloadable";
import {isSpecialPriceValid} from "@/utils/priceUtils";
import DiscountRibbon from "./discountRibbon";
import SpecialOfferBanner from "./common/SpecialOfferBanner";
import {type DateObject as DateObjectType} from "react-multi-date-picker";

export default function CartSinglePage({Token}: {Token: string}) {
 const [selectedImage, setSelectedImage] = useState<string>("");
 const [loadingLike, setLoadingLike] = useState<boolean>(false);
 const [product, setProduct] = useState<Product | null>(null);
 const [selectedDate, setSelectedDate] = useState<DateObjectType | null>(null);
 const [selectedSlot, setSelectedSlot] = useState<{date: string; slot: string | null} | null>(null);

 const [wishlisted, setWishlisted] = useState(false);
 const [selectedColor, setSelectedColor] = useState<string>("");
 const [selectedSize, setSelectedSize] = useState<string>("");
 const [productId, setProductId] = useState<number | null>(null);
 const [variantPrice, setVariantPrice] = useState<string | number>("");
 const [selectedQuantity, setSelectedQuantity] = useState<string>("1");
 const {increase} = useCartCount();
 const [selectedDownloadLink, setSelectedDownloadLink] = useState<number | null>(null);
 const colorOptions = product?.super_attributes?.find((attr) => attr.code === "color")?.options || [];
 const sizeOptions = product?.super_attributes?.find((attr) => attr.code === "size")?.options || [];
 useEffect(() => {
  if (selectedColor && selectedSize) {
   const variant = product?.variants?.find((v) => {
    return v?.attributes?.color === Number(selectedColor) && v?.attributes?.size === Number(selectedSize);
   });
   if (variant) {
    setVariantPrice(variant.formatted_price || variant.price);
   } else {
    setVariantPrice("");
   }
  }
 }, [selectedColor, selectedSize, product?.variants]);
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
 const handleAddToCompare = async () => {
  if (!product) return;
  const success = await addToCompareProduct(product.id, Token);
  if (!success) toast.error("افزودن به لیست مقایسه انجام نشد");
 };
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
   data["booking[note]"] = "bookingNote";
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

 console.log("product", product.booking);
 return (
  <>
   <BreadcrumbComponent Data={product} />
   <div className="flex flex-col md:flex-row gap-1">
    <div className="relative flex flex-col md:w-[35%] min-w-[35%] h-fit">
     {isSpecialPriceValid(product) && <SpecialOfferBanner product={product} />}
     <div className="flex">
      <ShareSection
       onLike={handleToggleWishlist}
       isLiked={wishlisted}
       shareURL={product.shareURL ?? ""}
       AddToCompare={handleAddToCompare}
       loadingLike={loadingLike}
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
     {/* <div className="text-yellow-500 font-medium text-sm">Amazon&apos;s Choice ✨</div>
     <div className="text-sm text-gray-500">No Import Charges & $46.96 Shipping to Azerbaijan. Delivery June 17–27</div> */}
     <div className="flex flex-col md:flex-row gap-4 items-center">
      {colorOptions.length > 0 && (
       <div>
        <p className="font-medium mb-2">
         رنگ: {colorOptions.find((opt) => String(opt.id) === selectedColor)?.label || "انتخاب نشده"}
        </p>
        <div className="flex gap-3 flex-wrap">
         {colorOptions.map((option) => (
          <button
           key={option.id}
           onClick={() => setSelectedColor(String(option.id))}
           className={`
                        w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                         selectedColor === String(option.id) ? "border-cyan-500" : "border-gray-300"
                        }`}
           style={{backgroundColor: getColorCodeFromLabel(option.label)}}
           title={option.label}
          >
           {selectedColor === String(option.id) && <span className="text-white text-xs">✓</span>}
          </button>
         ))}
        </div>
       </div>
      )}
      {sizeOptions.length > 0 && (
       <div>
        <label className="font-medium block mb-1">اندازه:</label>
        <Select onValueChange={setSelectedSize} value={selectedSize}>
         <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="انتخاب اندازه" />
         </SelectTrigger>
         <SelectContent>
          <SelectGroup>
           {sizeOptions.map((option) => (
            <SelectItem key={option.id} value={String(option.id)}>
             {option.label}
            </SelectItem>
           ))}
          </SelectGroup>
         </SelectContent>
        </Select>
       </div>
      )}
      {variantPrice && (
       <div className="text-xl font-bold text-green-600 mt-4 md:mt-0">قیمت انتخاب‌شده: {variantPrice}</div>
      )}
     </div>
     <div className="grid grid-cols-2 gap-4 text-sm border-t border-b py-4">
      {product.additionalData?.map((attribute) => {
       if (!attribute.value) return null;
       const valueToDisplay = String(attribute.value);
       const colorCode = attribute.code === "color" ? getColorCodeFromLabel(valueToDisplay) : "";
       return (
        <div key={attribute.id} className="flex items-center gap-2">
         <strong>{attribute.label}:</strong> {attribute.code !== "color" && valueToDisplay}
         {colorCode && (
          <div
           style={{width: "16px", height: "16px", borderRadius: "50%", backgroundColor: colorCode}}
           title={attribute.label}
          />
         )}
        </div>
       );
      })}
     </div>
     <div className="space-y-2 text-sm text-gray-700">
      <div className="!leading-[2.5rem] text-justify" dangerouslySetInnerHTML={{__html: product.description ?? ""}} />
     </div>
    </div>
    <div className="relative flex flex-col md:w-[19%] min-w-[19%] gap-4 border border-border rounded-2xl p-4 text-right h-fit">
     {isSpecialPriceValid(product) && <DiscountRibbon Data={product} />}
     <h1 className="text-2xl md:text-3xl font-semibold">
      {isSpecialPriceValid(product) ? (
       <div className="flex flex-col">
        <span className="line-through text-gray-500 ml-2">{product.priceHtml.formattedFinalPrice}</span>
        <span className="text-red-600">
         {typeof product.specialPrice === "number" ? (product.specialPrice * 100).toLocaleString("IR-fa") : ""}
        </span>
       </div>
      ) : (
       product.priceHtml.formattedFinalPrice
      )}
     </h1>
     <div className="flex flex-col gap-4 mt-4">
      <Select value={selectedQuantity} onValueChange={handleQuantityChange}>
       <SelectTrigger className="w-full">
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
      {product?.type !== "booking" &&
       (() => {
        const totalQty = product?.inventories?.reduce((sum, e) => sum + (e.qty ?? 0), 0) || 0;

        if (totalQty === 0) {
         return <p className="text-red-600 text-sm">متأسفانه این محصول موجود نیست</p>;
        }

        if (totalQty < 10) {
         return <p className="text-red-600 text-sm">فقط {totalQty} عدد از کالا موجود است</p>;
        }
        return null;
       })()}

      <Button
       disabled={
        (product.type === "downloadable" && (product.downloadableLinks?.length ?? 0) > 0 && !selectedDownloadLink) ||
        (product.type === "booking" && !selectedDate)
       }
       className="flex-1 flex items-center gap-2"
       onClick={handleAddToCart}
      >
       افزودن به سبد
      </Button>
     </div>
     {product.type === "downloadable" && (
      <Downloadable
       product={product}
       selectedDownloadLink={selectedDownloadLink}
       setSelectedDownloadLink={setSelectedDownloadLink}
      />
     )}
     {product.type === "booking" && (
      <BookingSection
       bookings={product}
       setSelectedDate={setSelectedDate}
       selectedDate={selectedDate}
       setSelectedSlot={setSelectedSlot}
       selectedSlot={selectedSlot}
      />
     )}
    </div>
   </div>
   {relatedProducts.length > 0 && <ProductSlider title="محصولات مرتبط" Data={relatedProducts} />}
   {upSells.length > 0 && <ProductSlider title="محصولات فروش بالا" Data={upSells} />}
   {crossSells.length > 0 && <ProductSlider title="محصولات فروش متقابل" Data={crossSells} />}
  </>
 );
}
