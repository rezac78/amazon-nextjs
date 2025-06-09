import CompareIcon from "@/public/icons/Compare";
import HeartIcon from "@/public/icons/Heart";
import ShareIcon from "@/public/icons/Share";
import {toast} from "sonner";

export default function ShareSection({
 onLike,
 isLiked,
 shareURL,
 AddToCompare,
}: {
 onLike?: () => void;
 isLiked?: boolean;
 shareURL: string;
 AddToCompare?: () => void;
}) {
 const handleShare = async () => {
  try {
   await navigator.clipboard.writeText(shareURL);
   toast.success("لینک محصول کپی شد");
  } catch (error) {
   toast.error("خطا در کپی کردن لینک");
   console.error("Clipboard copy failed:", error);
  }
 };
 return (
  <div className="flex flex-col gap-4 z-[999] mt-20 ml-2 cursor-pointer">
   <HeartIcon className={`hover:text-red-400 ${isLiked ? "text-red-500" : "text-gray-400"}`} onClick={onLike} />
   <ShareIcon onClick={handleShare} className="hover:text-blue-400" />
   <CompareIcon className="hover:text-gray-400" onClick={AddToCompare} />
  </div>
 );
}
