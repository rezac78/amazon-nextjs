import {CustomerCartAll} from "@/utils/api/cart";
import CartPage from "../../../components/pages/cart";
import {getAuthToken} from "@/utils/checkCookies";
import {cookies} from "next/headers";

export default async function Cart() {
 const Token = await getAuthToken();
 const wishlistItems = await CustomerCartAll(Token ?? "");
 const cookieStore = await cookies();
 const lang = cookieStore.get("lang")?.value || "fa";
 return (
  <div className="container mx-auto">
   <CartPage Data={wishlistItems?.items ?? []} Token={Token ?? ""} lang={lang} />
  </div>
 );
}
