import { Skeleton } from "../../../ui/skeleton";

export default function ProductCardSkeleton({ count = 4, homePage = false }: { count?: number, homePage?: boolean }) {
        return (
                <div
                        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-2 md:px-6 mt-10 ${homePage && ""
                                }`}
                >                        {Array.from({ length: count }).map((_, i) => (
                        <div
                                key={i}
                                className="flex flex-col justify-between bg-background border border-border rounded-md p-4 min-h-[420px]"
                        >
                                <div className="flex-1 space-y-4">
                                        <Skeleton className="w-52 h-52 mx-auto rounded-md" />
                                        <Skeleton className="h-4 w-3/4 mx-auto" />
                                        <Skeleton className="h-4 w-1/2 mx-auto" />
                                </div>

                                <div className="pt-4">
                                        <Skeleton className="h-10 w-full rounded" />
                                </div>
                        </div>
                ))}
                </div>
        );
}
