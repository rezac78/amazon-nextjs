import {
 ADD_TO_COMPARE_MUTATION,
 LIST_COMPARE_QUERY,
 REMOVE_ALL_COMPARE_MUTATION,
 REMOVE_FROM_COMPARE_MUTATION,
} from "./../graphql/productLike/productLike";
import {PRODUCTS_QUERY} from "../graphql/queries/products";
import {Product} from "./types";
import {BASE_URL} from "./config";
import {toast} from "sonner";
import {BASE_URL_API} from "@/config";

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
  const response = await fetch(BASE_URL_API + `v1/products/${id}`, {
   method: "GET",
   headers: {
    "Content-Type": "application/json",
   },
  });
  if (!response.ok) {
   throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const result = await response.json();
  return result.data ?? null;
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

  const response = await fetch(BASE_URL_API + `v1/products?${queryString}`, {
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
  const response = await fetch(BASE_URL_API + `v1/customer/wishlist/${productId}`, {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
   },
   body: JSON.stringify({
    product_id: productId,
   }),
  });

  if (!response.ok) {
   throw new Error(`HTTP Error: ${response.status}`);
  }

  const result = await response.json();
  toast.success(result.message || "محصول با موفقیت به لیست علاقه‌مندی‌ها اضافه شد");
  if (result.errors) {
   console.error("GraphQL errors:", result.errors);
   return false;
  }

  return result.success ?? true;
 } catch (error) {
  console.error("Failed to add product to wishlist:", error);
  return false;
 }
}
export async function fetchProductLikeDelete(token: string): Promise<boolean> {
 try {
  const response = await fetch(BASE_URL_API + `v1/customer/wishlist/all`, {
   method: "DELETE",
   headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
   },
  });

  if (!response.ok) {
   throw new Error(`HTTP Error: ${response.status}`);
  }

  const result = await response.json();
  toast.success(result.message || "محصول با موفقیت از لیست علاقه‌مندی‌ها حذف شد");
  if (result.errors) {
   console.error("GraphQL errors:", result.errors);
   return false;
  }

  return result.success ?? true;
 } catch (error) {
  console.error("Failed to add product to wishlist:", error);
  return false;
 }
}
export async function fetchWishlist(token: string) {
 try {
  const response = await fetch(`${BASE_URL_API}v1/customer/wishlist`, {
   method: "GET",
   headers: {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
   },
  });

  const result = await response.json();

  if (result.errors) {
   console.error("GraphQL Error:", result.errors);
   return [];
  }
  const items = result.data ?? [];
  return items.map((item: {product: unknown}) => item.product);
 } catch (error) {
  console.error("Failed to fetch wishlist:", error);
  return [];
 }
}
export async function addToCompareProduct(productId: number, token?: string): Promise<boolean> {
 try {
  const response = await fetch(BASE_URL, {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token ? {Authorization: `${token}`} : {}),
   },
   body: JSON.stringify({
    query: ADD_TO_COMPARE_MUTATION,
    variables: {
     productId: productId.toString(),
    },
   }),
  });

  const result = await response.json();

  if (result.errors) {
   toast.error(result.errors?.[0]?.message || "خطا در افزودن به لیست مقایسه");
   console.error("GraphQL Error:", result.errors);
   return false;
  }

  toast.success(result.data?.addToCompare?.message || "به لیست مقایسه افزوده شد");
  return result.data?.addToCompare?.success ?? false;
 } catch (error) {
  toast.error("خطای اتصال به سرور");
  console.error("Failed to add product to compare list:", error);
  return false;
 }
}
export async function fetchCompareProducts(token: string, page: number = 1, first: number = 10) {
 try {
  const response = await fetch(BASE_URL, {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token ? {Authorization: `${token}`} : {}),
   },
   body: JSON.stringify({
    query: LIST_COMPARE_QUERY,
    variables: {
     page,
     first,
    },
   }),
  });

  const result = await response.json();

  if (result.errors) {
   console.error("GraphQL errors:", result.errors);
   return {
    data: [],
    paginatorInfo: {
     currentPage: 1,
     lastPage: 1,
     total: 0,
     hasMorePages: false,
    },
   };
  }

  const rawData = result.data.compareProducts?.data ?? [];
  const products = rawData
   .map((item: {product: Product | null}) => item.product)
   .filter((p: Product | null): p is Product => p !== null);

  return products;
 } catch (error) {
  console.error("Error fetching compare products:", error);
  return {
   data: [],
   paginatorInfo: {
    currentPage: 1,
    lastPage: 1,
    total: 0,
    hasMorePages: false,
   },
  };
 }
}
export async function removeFromCompareProduct(productId: number, token?: string): Promise<boolean> {
 try {
  const response = await fetch(BASE_URL, {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token ? {Authorization: `${token}`} : {}),
   },
   body: JSON.stringify({
    query: REMOVE_FROM_COMPARE_MUTATION,
    variables: {
     productId: productId.toString(),
    },
   }),
  });

  const result = await response.json();

  if (result.errors) {
   console.error("GraphQL errors:", result.errors);
   return false;
  }

  const status = result.data?.removeFromCompareProduct;
  if (status?.success) {
   toast.success(status.message || "محصول از مقایسه حذف شد");
  } else {
   toast.error(status?.message || "حذف از مقایسه موفق نبود");
  }

  return !!status?.success;
 } catch (error) {
  console.error("Error removing from compare list:", error);
  return false;
 }
}

export async function removeAllCompareProducts(token?: string): Promise<boolean> {
 try {
  const response = await fetch(BASE_URL, {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token ? {Authorization: `${token}`} : {}),
   },
   body: JSON.stringify({
    query: REMOVE_ALL_COMPARE_MUTATION,
   }),
  });

  const result = await response.json();
  const status = result.data?.removeAllCompareProducts;

  if (result.errors || !status?.success) {
   toast.error(status?.message || "حذف همه محصولات از مقایسه ناموفق بود");
   return false;
  }

  toast.success(status.message || "همه محصولات از مقایسه حذف شدند");
  return true;
 } catch (error) {
  console.error("Error removing all compare products:", error);
  toast.error("خطا در حذف همه محصولات از مقایسه");
  return false;
 }
}
