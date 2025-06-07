import {cookies} from "next/headers";
import {fetchProductAll} from "@/utils/fetchProduct";
import HomePage from "../components/pages/home";
import {categories} from "@/utils/fetchhome";

export default async function Home() {
 const cookieStore = await cookies();
 const token = cookieStore.get("access_token")?.value;
 //  const {data} = await fetchProducts({page: 1, limit: 12});
 const categorie = await categories();
 const NewProducts = await fetchProductAll({
  new: 1,
  sort: "name-asc",
  limit: 12,
 });

 return (
  <div className="container mx-auto">
   <HomePage isLogin={!!token} NewProducts={NewProducts} categorie={categorie} />
  </div>
 );
}
