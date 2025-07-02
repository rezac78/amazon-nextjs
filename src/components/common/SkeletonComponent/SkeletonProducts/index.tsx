import {Skeleton} from "../../../ui/skeleton";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {Card, CardHeader} from "@/components/ui/card";

export default function SkeletonProducts({count = 4}: {count?: number}) {
 return (
  <div className="my-10 border-t-1 border-gray-200 py-10">
   <h2 className="text-2xl font-bold my-4 text-center"></h2>
   <div className="px-12 md:px-6 w-[380px] md:w-full">
    <Carousel opts={{align: "start"}} className="w-full">
     <CarouselContent>
      {Array.from({length: count}).map((_, i) => (
       <CarouselItem key={i} className="">
        <div className="p-0">
         <Card className="group relative flex flex-col justify-between bg-background border border-border w-[250px] min-h-[350px]">
          <CardHeader className="flex-1 items-center">
           <Skeleton className="w-40 h-40 mx-auto" />
           <Skeleton className="w-32 h-4 mt-4" />
           <Skeleton className="w-24 h-3 mt-2" />
          </CardHeader>
         </Card>
        </div>
       </CarouselItem>
      ))}
     </CarouselContent>
     <CarouselPrevious />
     <CarouselNext />
    </Carousel>
   </div>
  </div>
 );
}
