import Search from "@/components/pages/search";
import {getAuthToken} from "@/utils/checkCookies";
import {getCategoryAttributes} from "@/utils/api/search/fetchSearch";

export default async function SearchPage() {
 const {data} = await getCategoryAttributes();
 const Token = await getAuthToken();

 return <Search Token={Token ?? ""} Data={data} />;
}
