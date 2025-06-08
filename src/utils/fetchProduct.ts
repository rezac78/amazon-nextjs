import {GET_PRODUCT_QUERY} from "../graphql/productId/products";
import {PRODUCTS_QUERY} from "../graphql/queries/products";
import {Product} from "./types";
import {BASE_URL} from "./config";
import {
 ADD_TO_WISHLIST_MUTATION,
 GET_WISHLIST_QUERY,
 REMOVE_FROM_WISHLIST_MUTATION,
} from "@/graphql/productLike/productLike";
import {toast} from "sonner";

export async function fetchProducts({page, limit}: {page: number; limit: number}) {
 try {
  const response = await fetch(BASE_URL, {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${token}`,
   },
   body: JSON.stringify({
    query: PRODUCTS_QUERY,
    variables: {page, limit},
   }),
  });
  if (!response.ok) {
   throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const result = await response.json();
  return {
   data: result.data?.products?.data || [],
   pageInfo: result.data?.products?.paginatorInfo || {
    currentPage: 1,
    lastPage: 1,
   },
  };
 } catch (error) {
  console.error("Failed to fetch products:", error);
  return {data: [], pageInfo: {currentPage: 1, lastPage: 1}};
 }
}
export async function fetchProductById(id: number): Promise<Product | null> {
 try {
  const response = await fetch(BASE_URL, {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${token}`,
   },
   body: JSON.stringify({
    query: GET_PRODUCT_QUERY,
    variables: {id},
   }),
  });
  if (!response.ok) {
   throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const result = await response.json();
  return result.data?.product ?? null;
 } catch (error) {
  console.error("Failed to fetch product:", error);
  return null;
 }
}
export async function fetchProductAll(params: Record<string, string | number>): Promise<Product[]> {
 try {
  const queryString = new URLSearchParams(
   Object.entries(params).reduce((acc, [key, val]) => {
    acc[key] = String(val);
    return acc;
   }, {} as Record<string, string>)
  ).toString();

  const response = await fetch(process.env.BASE_URL_API + `products?${queryString}`, {
   method: "GET",
   headers: {
    Accept: "application/json",
   },
  });

  if (!response.ok) {
   throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const result = await response.json();
  return result.data || [];
 } catch (error) {
  console.error("Failed to fetch products:", error);
  return [];
 }
}
export async function fetchProductLike(productId: number, token: string): Promise<boolean> {
 try {
  const response = await fetch(BASE_URL, {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `${token}`,
   },
   body: JSON.stringify({
    query: ADD_TO_WISHLIST_MUTATION,
    variables: {
     productId: productId.toString(),
    },
   }),
  });

  if (!response.ok) {
   throw new Error(`HTTP Error: ${response.status}`);
  }

  const result = await response.json();
  toast.success(result.data.addToWishlist.message);
  if (result.errors) {
   console.error("GraphQL errors:", result.errors);
   return false;
  }

  return result.data?.addToWishlist?.success ?? false;
 } catch (error) {
  console.error("Failed to add product to wishlist:", error);
  return false;
 }
}
export async function removeProductFromWishlist(productId: number, token: string): Promise<boolean> {
 try {
  const response = await fetch(BASE_URL, {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `${token}`,
   },
   body: JSON.stringify({
    query: REMOVE_FROM_WISHLIST_MUTATION,
    variables: {
     productId: productId.toString(),
    },
   }),
  });

  const result = await response.json();
  toast.success(result.data.removeFromWishlist.message);

  if (result.errors) {
   console.error("GraphQL errors:", result.errors);
   return false;
  }

  return result.data?.removeFromWishlist?.success ?? false;
 } catch (error) {
  console.error("Failed to remove product from wishlist:", error);
  return false;
 }
}
export async function fetchWishlist(token: string) {
 try {
  const response = await fetch(BASE_URL, {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
    Authorization: `${token}`,
   },
   body: JSON.stringify({
    query: GET_WISHLIST_QUERY,
   }),
  });

  const result = await response.json();

  if (result.errors) {
   console.error("GraphQL Error:", result.errors);
   return [];
  }
  const items = result.data?.wishlists?.data ?? [];
  return items.map((item: {product: unknown}) => item.product);
 } catch (error) {
  console.error("Failed to fetch wishlist:", error);
  return [];
 }
}
