import { Skeleton } from "@/components/ui/skeleton";

export default function SwiperSkeleton() {
  return (
    <div className="relative w-full h-96 md:h-[400px] overflow-hidden rounded-md">
      <Skeleton className="w-full h-full" />
    </div>
  );
}
