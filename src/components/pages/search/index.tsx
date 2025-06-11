import {CategoryAttributeFilter} from "@/utils/types";
import SearchAndFilter from "@/components/common/FilterSide";

interface SearchProps {
 Data: CategoryAttributeFilter[];
}

export default function Search({Data}: SearchProps) {
 return <SearchAndFilter data={Data ?? []} />;
}
