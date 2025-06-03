"use client";

import {
 Pagination,
 PaginationContent,
 PaginationItem,
 PaginationLink,
 PaginationNext,
 PaginationPrevious,
} from "../../ui/pagination";

interface PageInfo {
 currentPage: number;
 lastPage: number;
}

interface PaginationComponentProps {
 page: number;
 setPage: React.Dispatch<React.SetStateAction<number>>;
 pageInfo: PageInfo;
}

export default function PaginationComponent({setPage, page, pageInfo}: PaginationComponentProps) {
 return (
  <>
   {pageInfo.lastPage > 1 && (
    <Pagination className="my-10">
     <PaginationContent>
      <PaginationItem>
       <PaginationPrevious
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        className={page <= 1 ? "pointer-events-none opacity-50" : ""}
        title="قبلی"
        dir="ltr"
       />
      </PaginationItem>

      {Array.from({length: pageInfo.lastPage}, (_, i) => i + 1).map((pg) => (
       <PaginationItem key={pg}>
        <PaginationLink
         href="#"
         isActive={pg === page}
         onClick={(e) => {
          e.preventDefault();
          setPage(pg);
         }}
        >
         {pg}
        </PaginationLink>
       </PaginationItem>
      ))}

      <PaginationItem>
       <PaginationNext
        dir="ltr"
        onClick={() => setPage((prev) => Math.min(prev + 1, pageInfo.lastPage))}
        className={page >= pageInfo.lastPage ? "pointer-events-none opacity-50" : ""}
        title="بعدی"
       />
      </PaginationItem>
     </PaginationContent>
    </Pagination>
   )}
  </>
 );
}
