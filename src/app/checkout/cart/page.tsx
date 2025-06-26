import {CustomerCartAll} from "@/utils/cart";
import CartPage from "../../../components/pages/cart";
import {getAuthToken} from "@/utils/checkCookies";

export default async function Cart() {
 const Token = await getAuthToken();
 const wishlistItems = await CustomerCartAll(Token ?? "");
 return (
  <div className="container mx-auto">
   <CartPage Data={wishlistItems?.items ?? []} Token={Token ?? ""} />
  </div>
 );
}
