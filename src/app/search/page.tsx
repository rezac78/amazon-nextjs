import Search from "@/components/pages/search";
import {getCategoryAttributes} from "@/utils/fetchSearch";

export default async function SearchPage() {
 const {data} = await getCategoryAttributes("0");

 return <Search Data={data} />;
}
