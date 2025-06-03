import axios from "axios";
import {GET_PRODUCT_QUERY} from "../graphql/productId/products";
import {PRODUCTS_QUERY} from "../graphql/queries/products";
import {Product} from "./types";
const isServer = typeof window === "undefined";
const BASE_URL = isServer
 ? "https://back-api.eleqra.ir/graphql" // سرور
 : "/api/proxy/graphql"; // کلاینت
export async function fetchProducts({page, limit}: {page: number; limit: number}) {
 try {
  const response = await axios.post(BASE_URL, {
   query: PRODUCTS_QUERY,
   variables: {page, limit},
  });
  return {
   data: response.data.data.products.data,
   pageInfo: response.data.data.products.paginatorInfo,
  };
 } catch (error) {
  console.error("Failed to fetch products:", error);
  return {data: [], pageInfo: {currentPage: 1, lastPage: 1}};
 }
}
export async function fetchProductById(id: number): Promise<Product | null> {
 try {
  const response = await axios.post(BASE_URL, {
   query: GET_PRODUCT_QUERY,
   variables: {id},
  });

  return response.data.data.product;
 } catch (error) {
  console.error("Failed to fetch product:", error);
  return null;
 }
}
