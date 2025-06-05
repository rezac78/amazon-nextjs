import { GET_PRODUCT_QUERY } from "../graphql/productId/products";
import { PRODUCTS_QUERY } from "../graphql/queries/products";
import { Product } from "./types";
import { BASE_URL } from "./config";

export async function fetchProducts({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: PRODUCTS_QUERY,
        variables: { page, limit },
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
    return { data: [], pageInfo: { currentPage: 1, lastPage: 1 } };
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
        variables: { id },
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
