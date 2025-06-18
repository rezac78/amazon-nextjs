import {CategoryAttributeFilter} from "@/utils/types/types";
import SearchAndFilter from "@/components/common/FilterSide";

interface SearchProps {
 Data: CategoryAttributeFilter[];
 Token: string;
}

export default function Categories({Data, Token}: SearchProps) {
 return <SearchAndFilter data={Data} Token={Token} />;
}
