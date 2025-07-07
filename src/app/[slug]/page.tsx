import CartSinglePage from "@/components/pages/cartSinglePage";
import {getAuthToken} from "@/utils/checkCookies";
import {cookies} from "next/headers";

export default async function CartSingle() {
 const Token = await getAuthToken();
 const cookieStore = await cookies();

 const lang = cookieStore.get("lang")?.value || "fa";
 return (
  <div className="container mx-auto">
   <CartSinglePage Token={Token ?? ""} lang={lang} />
  </div>
 );
}
