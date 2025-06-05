import { Skeleton } from "@/components/ui/skeleton";

export default function HomeCategorisSkeleton({ count = 4 }: { count?: number }) {
        return (
                <div className="flex gap-5">
                        {Array.from({ length: count }).map((_, index) => (
                                <Skeleton key={index} className="w-20 h-6 my-3" />
                        ))}
                </div>
        );
}
