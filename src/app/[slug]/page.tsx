import CartSinglePage from "@/components/pages/cartSinglePage";
import {getAuthToken} from "@/utils/checkCookies";

export default async function CartSingle() {
 const Token = await getAuthToken();
 return (
  <div className="container mx-auto">
   <CartSinglePage Token={Token ?? ""} />
  </div>
 );
}
