import {CustomerCartAll} from "@/utils/api/cart";
import {getAuthToken} from "@/utils/checkCookies";
import CheckoutPage from "@/components/pages/onePage";

export default async function OnePage() {
 const Token = await getAuthToken();
 const wishlistItems = await CustomerCartAll(Token ?? "");
 return (
  <div className="container mx-auto">
   <CheckoutPage Data={wishlistItems?.items ?? []} Token={Token ?? ""} />
  </div>
 );
}
