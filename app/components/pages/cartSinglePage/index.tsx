"use client";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {
 Select,
 SelectContent,
 SelectGroup,
 SelectItem,
 SelectLabel,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select";
import {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import {fetchProductById} from "@/app/utils/fetchProduct";
import Loading from "../../common/Loading";
import {Product} from "@/app/utils/types";
export default function CartSinglePage() {
 const {id} = useParams();
 const [selectedImage, setSelectedImage] = useState<string>("");
 const [product, setProduct] = useState<Product | null>(null);

 useEffect(() => {
  if (id) {
   fetchProductById(Number(id)).then((res) => {
    console.log(res);
    setProduct(res);
    if (res && res.images && res.images.length > 0) {
     setSelectedImage(res.images[0].url);
    }
   });
  }
 }, [id]);
 if (!product) return <Loading />;
 return (
  <div className="p-4 grid grid-cols-1 lg:grid-cols-5 gap-4">
   {/* Right: Product Info */}
   <div className=" col-span-2 flex flex-row h-fit">
    <div className="flex flex-col items-center w-[15%] gap-2 overflow-y-auto max-h-[400px] pr-1 z-10">
     {/* تصاویر */}
     {product?.images?.map((img, index) => (
      <div
       key={index}
       className={`relative w-14 h-14 cursor-pointer border-2 rounded-md overflow-hidden ${
        selectedImage === img.url ? "border-blue-500" : "border-gray-200"
       }`}
       onMouseEnter={() => setSelectedImage(img.url)}
      >
       <Image src={img.url} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
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
    {/* Main image preview */}
    <div className="relative w-[85%] aspect-[16/10] rounded-lg overflow-hidden">
     {selectedImage?.endsWith(".mp4") || selectedImage?.endsWith(".webm") ? (
      <video src={selectedImage} controls autoPlay className="w-full h-full object-contain" />
     ) : (
      <Image src={selectedImage} alt="Main Product" fill className="object-contain" />
     )}
    </div>
   </div>
   {/* center: Product Info */}
   <div className="col-span-2 flex flex-col gap-4">
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
   {/* Left: Image Gallery */}
   <div className="col-span-1 flex flex-col gap-4 border border-border rounded-2xl p-4 text-right h-fit">
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
 );
}
