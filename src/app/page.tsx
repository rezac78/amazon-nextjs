import {fetchProductAll} from "@/utils/api/product/fetchProduct";
import HomePage from "../components/pages/home";
import {categories} from "@/utils/api/home/fetchhome";
import {getAuthToken} from "@/utils/checkCookies";
import {cookies} from "next/headers";

export default async function Home() {
 const token = await getAuthToken();
 const cookieStore = await cookies();

 const lang = cookieStore.get("lang")?.value || "fa";

 const categorie = await categories(lang);
 const NewProducts = await fetchProductAll({
  new: 1,
  sort: "name-asc",
  limit: 12,
 });
 return <HomePage isLogin={!!token} NewProducts={NewProducts} categorie={categorie} lang={lang} />;
}
