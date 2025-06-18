import {BASE_URL_API} from "@/config";
import {toast} from "sonner";

export async function CustomerCartAdd(
 Data: {is_buy_now?: number; product_id?: number; quantity?: string},
 Token: string,
 productId: string
) {
 try {
  const response = await fetch(`${BASE_URL_API}v1/customer/cart/add/${productId}`, {
   method: "POST",
   headers: {
    accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${Token}`,
   },
   body: JSON.stringify(Data),
  });

  const resData = await response.json();
  toast.warning(resData.message);
  if (resData.errors) throw resData.errors[0];
  return resData.data;
 } catch (err) {
  console.error("Address Submit Error:", err);
  throw err;
 }
}
export async function CustomerCartAll(Token: string) {
 try {
  const response = await fetch(BASE_URL_API + "v1/customer/cart", {
   method: "GET",
   headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${Token}`,
   },
  });

  const resData = await response.json();
  if (resData.errors) {
   throw resData.errors[0];
  }

  return resData.data;
 } catch (err) {
  console.error("Logout Error:", err);
  throw err;
 }
}

export async function CustomerCartPUT(Data: {qty: Record<number, number>}, Token: string) {
 try {
  const response = await fetch(`${BASE_URL_API}v1/customer/cart/update`, {
   method: "PUT",
   headers: {
    accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${Token}`,
   },
   body: JSON.stringify(Data),
  });

  const resData = await response.json();
  toast.warning(resData.message);
  if (resData.errors) throw resData.errors[0];
  return resData.data;
 } catch (err) {
  console.error("Address Submit Error:", err);
  throw err;
 }
}
export async function CustomerCartDeleted(
 Data: {is_buy_now?: number; product_id?: number; quantity?: string},
 Token: string,
 productId: string
) {
 try {
  const response = await fetch(`${BASE_URL_API}v1/customer/cart/remove/${productId}`, {
   method: "DELETE",
   headers: {
    accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${Token}`,
   },
   body: JSON.stringify(Data),
  });

  const resData = await response.json();
  toast.warning(resData.message);
  if (resData.errors) throw resData.errors[0];
  return resData.data;
 } catch (err) {
  console.error("Address Submit Error:", err);
  throw err;
 }
}
export async function CustomerCartDeletedAll(Token: string) {
 try {
  const response = await fetch(`${BASE_URL_API}v1/customer/cart/remove`, {
   method: "DELETE",
   headers: {
    accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${Token}`,
   },
  });

  const resData = await response.json();
  toast.warning(resData.message);
  if (resData.errors) throw resData.errors[0];
  return resData.data;
 } catch (err) {
  console.error("Address Submit Error:", err);
  throw err;
 }
}
export async function CustomerCartMoveWishlist(Token: string, productId: string) {
 try {
  const response = await fetch(`${BASE_URL_API}v1/customer/cart/move-to-wishlist/${productId}`, {
   method: "POST",
   headers: {
    accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${Token}`,
   },
  });

  const resData = await response.json();
  toast.warning(resData.message);
  if (resData.errors) throw resData.errors[0];
  return resData.data;
 } catch (err) {
  console.error("Address Submit Error:", err);
  throw err;
 }
}
