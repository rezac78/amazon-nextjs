import {Skeleton} from "@/components/ui/skeleton";

export default function HeaderSkeleton() {
 return (
  <header className="w-full bg-primary text-primary-foreground shadow-md">
   <div className="flex items-center justify-between px-4 py-2">
    {/* Logo and Language Switch */}
    <div className="flex items-center gap-4">
     <Skeleton className="w-24 h-6" /> {/* Logo */}
     <Skeleton className="w-16 h-8" /> {/* Language button */}
    </div>

    {/* Search Bar */}
    <div className="hidden md:flex flex-1 mx-4 gap-2">
     <Skeleton className="flex-1 h-10 rounded-md" />
     <Skeleton className="w-10 h-10 rounded-md" />
    </div>

    {/* Menu icons */}
    <div className="hidden md:flex items-center gap-6">
     <Skeleton className="w-12 h-6" />
     <Skeleton className="w-10 h-10 rounded-full" />
     <Skeleton className="w-16 h-6" />
    </div>

    {/* Mobile Menu Button */}
    <div className="md:hidden">
     <Skeleton className="w-8 h-8 rounded-md" />
    </div>
   </div>

   {/* Mobile Search Placeholder */}
   <div className="md:hidden px-4 pb-4 flex flex-col gap-3">
    <div className="flex gap-2">
     <Skeleton className="flex-1 h-10" />
     <Skeleton className="w-10 h-10" />
    </div>
    <div className="flex flex-col gap-2">
     <Skeleton className="w-24 h-4" />
     <Skeleton className="w-24 h-4" />
     <Skeleton className="w-24 h-4" />
    </div>
   </div>

   {/* Category Slider Skeleton */}
   <div className="px-4 py-2 flex gap-2 overflow-x-auto">
    {Array.from({length: 4}).map((_, i) => (
     <Skeleton key={i} className="w-20 h-8" />
    ))}
   </div>
  </header>
 );
}
