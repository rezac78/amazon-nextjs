import ProfileFavorite from "@/components/pages/profile/ProfileFavorite";
import {getAuthToken} from "@/utils/checkCookies";
import {fetchWishlist} from "@/utils/api/product/fetchProduct";

export default async function FavoritePage() {
 const Token = await getAuthToken();
 const wishlistItems = await fetchWishlist(Token ?? "");
 return (
  <div className="container mx-auto">
   <ProfileFavorite Data={wishlistItems} Token={Token ?? ""} />
  </div>
 );
}
