import Categories from "@/components/pages/categories";
import {getAuthToken} from "@/utils/checkCookies";
import {getCategoryAttributes} from "@/utils/api/search/fetchSearch";

export default async function CategoriesPage() {
 const {data} = await getCategoryAttributes();
 const Token = await getAuthToken();

 return (
  <div className="container mx-auto">
   <Categories Data={data} Token={Token ?? ""} />
  </div>
 );
}
