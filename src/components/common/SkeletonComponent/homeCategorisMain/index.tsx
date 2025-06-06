import { Skeleton } from "@/components/ui/skeleton";

export default function HomeCategorisMainSkeleton({ count = 4 }: { count?: number }) {
        return (
                <section className="py-10 px-4">
                        <h2 className="text-xl md:text-2xl font-semibold text-center mb-8">
                                خرید بر اساس دسته‌بندی
                        </h2>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-y-6 gap-x-2 justify-items-center">
                                {Array.from({ length: count }).map((_, index) => (
                                        <div
                                                key={index}
                                                className="flex flex-col items-center justify-center text-center space-y-2"
                                        >
                                                <Skeleton className="w-20 h-20 md:w-24 md:h-24 rounded-full" />
                                                <Skeleton className="w-16 h-4 md:w-20" />
                                        </div>
                                ))}
                        </div>
                </section>
        );
}
