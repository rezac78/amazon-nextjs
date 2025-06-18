import {CategoryAttributeFilter} from "@/utils/types/types";
import SearchAndFilter from "@/components/common/FilterSide";

interface SearchProps {
 Data: CategoryAttributeFilter[];
 Token: string;
}

export default function Search({Data, Token}: SearchProps) {
 return <SearchAndFilter Token={Token ?? ""} data={Data ?? []} />;
}
