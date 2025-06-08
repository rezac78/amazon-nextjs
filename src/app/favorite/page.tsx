import {getAuthToken} from "@/utils/checkCookies";
import FavoritePage from "../../components/pages/favorite";
import {fetchWishlist} from "@/utils/fetchProduct";

export default async function Favorite() {
 const Token = await getAuthToken();
 const wishlistItems = await fetchWishlist(Token ?? "");
 return (
  <div className="container mx-auto">
   <FavoritePage Token={Token ?? ""} Data={wishlistItems} />
  </div>
 );
}
