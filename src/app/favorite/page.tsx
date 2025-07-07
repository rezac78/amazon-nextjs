import {getAuthToken} from "@/utils/checkCookies";
import FavoritePage from "../../components/pages/favorite";
import {fetchWishlist} from "@/utils/api/product/fetchProduct";
import {cookies} from "next/headers";

export default async function Favorite() {
 const Token = await getAuthToken();
 const wishlistItems = await fetchWishlist(Token ?? "");
 const cookieStore = await cookies();
 const lang = cookieStore.get("lang")?.value || "fa";
 return (
  <div className="container mx-auto">
   <FavoritePage Token={Token ?? ""} Data={wishlistItems} lang={lang} />
  </div>
 );
}
