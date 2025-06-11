import Image from "next/image";

interface SlideProps {
 imageUrl: string;
 alt?: string;
}

export default function Slide({imageUrl, alt = "Slide Image"}: SlideProps) {
 return (
  <div className="w-full h-64 md:h-96 flex items-center justify-center overflow-hidden">
   <Image src={imageUrl} alt={alt} width={1200} height={600} className="object-cover w-full h-full" priority />
  </div>
 );
}
