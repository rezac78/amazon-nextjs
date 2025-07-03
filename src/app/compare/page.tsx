import Compare from "@/components/pages/compare";
import {getAuthToken} from "@/utils/checkCookies";
import {fetchCompareProducts} from "@/utils/api/product/fetchProduct";

export default async function ComparePage() {
 const Token = (await getAuthToken()) ?? "";
 const compareList = await fetchCompareProducts(Token, 1, 10);

 return (
  <div className="container mx-auto">
   <Compare Token={Token || ""} Data={compareList} />
  </div>
 );
}
