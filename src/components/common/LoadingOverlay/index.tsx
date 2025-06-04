"use client";

import LoaderIcon from "@/public/icons/Loader";

export default function LoadingOverlay() {
 return (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
   <LoaderIcon className="w-16 h-16 text-white animate-spin" />
  </div>
 );
}
