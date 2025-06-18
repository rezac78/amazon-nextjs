import {
 Breadcrumb,
 BreadcrumbItem,
 BreadcrumbLink,
 BreadcrumbList,
 BreadcrumbPage,
 BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import {Product} from "@/utils/types/types";
interface BreadcrumbComponentProps {
 Data: Product;
}
export default function BreadcrumbComponent({Data}: BreadcrumbComponentProps) {
 const categories = Data.categories ?? [];

 return (
  <Breadcrumb className="my-4">
   <BreadcrumbList>
    <BreadcrumbItem>
     <BreadcrumbLink href="/">خانه</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />

    {categories.map((category, index) => (
     <React.Fragment key={category.id}>
      <BreadcrumbItem>
       <BreadcrumbLink href={`/category/${category.slug || category.id}`}>{category.name}</BreadcrumbLink>
      </BreadcrumbItem>
      {index < categories.length - 1 && <BreadcrumbSeparator />}
     </React.Fragment>
    ))}

    <BreadcrumbItem>
     <BreadcrumbPage>{Data.name}</BreadcrumbPage>
    </BreadcrumbItem>
   </BreadcrumbList>
  </Breadcrumb>
 );
}
