import {fetchProductAll} from "@/utils/fetchProduct";
import HomePage from "../components/pages/home";
import {categories} from "@/utils/fetchhome";
import { getAuthToken } from "@/utils/checkCookies";

export default async function Home() {
 const token = await getAuthToken();
 const categorie = await categories();
 const NewProducts = await fetchProductAll({
  new: 1,
  sort: "name-asc",
  limit: 12,
 });
 return (
  <div className="mx-auto">
   <HomePage isLogin={!!token} NewProducts={NewProducts} categorie={categorie} />
  </div>
 );
}
