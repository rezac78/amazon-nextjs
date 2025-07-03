"use client";

import {Button} from "@/components/ui/button";
import StarIcon from "@/public/icons/star";
import {CommentSendProducts} from "@/utils/api/product/fetchProduct";
import {Product} from "@/utils/types/types";
import {useState} from "react";

export default function CommentsTab({product, ProductId, Token}: {product: Product; ProductId: number; Token: string}) {
 const [rating, setRating] = useState(0);
 const [title, setTitle] = useState("");
 const [comment, setComment] = useState("");
 const [attachments, setAttachments] = useState<File[]>([]);
 async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  const formData = new FormData();
  formData.append("title", title);
  formData.append("comment", comment);
  formData.append("rating", String(rating));
  attachments.forEach((file) => formData.append("attachments[]", file));

  try {
   await CommentSendProducts(ProductId, Token, formData);
   setTitle("");
   setComment("");
   setRating(0);
   setAttachments([]);
  } catch (err) {
   console.error("Error sending comment:", err);
  }
 }
 return (
  <div className="space-y-6 p-4">
   <div className="bg-gray-100 rounded-4 p-4 space-y-3">
    <form className="mb-6" onSubmit={handleSubmit}>
     <input
      type="text"
      placeholder="عنوان نظر"
      className="w-full p-2 border rounded mb-3 text-sm bg-white border-gray-200 "
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      required
     />
     <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 ">
      <label className="sr-only">نوشتن کامنت ....</label>
      <textarea
       id="comment"
       value={comment}
       onChange={(e) => setComment(e.target.value)}
       rows={6}
       className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none "
       placeholder="نوشتن نظر ..."
       required
      ></textarea>
     </div>
     <div className="flex items-center gap-2">
      <Button type="submit" className="">
       ارسال کامنت
      </Button>
      <input
       type="file"
       multiple
       onChange={(e) => setAttachments(Array.from(e.target.files || []))}
       className="text-sm"
      />
     </div>
    </form>
    <div className="flex items-center gap-1 text-gray-500 text-sm">
     {[1, 2, 3, 4, 5].map((n) => (
      <button key={n} type="button" onClick={() => setRating(n)} className="focus:outline-none cursor-pointer">
       <StarIcon className={n <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
      </button>
     ))}
     <span className="text-xs">{rating}/5</span>
    </div>
   </div>
   <div className="h-[365px] overflow-auto">
    {Array.isArray(product.reviews) &&
     product.reviews.map((e, i: number) => (
      <div key={i} className="border rounded p-4 space-y-2 text-sm mb-2">
       <div className="flex items-center gap-2 text-yellow-400">
        {[1, 2, 3, 4, 5].map((n) => (
         <StarIcon key={n} className={n <= e.rating ? "fill-yellow-400" : "text-gray-300"} />
        ))}
        <span className="text-xs text-gray-500">{`${e.rating}/5`}</span>
       </div>

       <p className="text-justify leading-relaxed text-gray-700">{e.comment}</p>

       <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{`${e.name} | ${new Date(e.createdAt).toLocaleDateString("fa-IR")}`}</span>
       </div>
      </div>
     ))}
   </div>
  </div>
 );
}
