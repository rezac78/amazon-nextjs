import axios from "axios";
import {GET_PRODUCT_QUERY} from "../graphql/productId/products";
import {PRODUCTS_QUERY} from "../graphql/queries/products";
import { Product } from "./types";

export async function fetchProducts({page, limit}: {page: number; limit: number}) {
 try {
  const response = await axios.post(
   "/api/proxy/graphql",
   {
    query: PRODUCTS_QUERY,
    variables: {page, limit},
   },
   {
    headers: {
     "Content-Type": "application/json",
     Authorization: `Bearer YOUR_TOKEN_HERE`, // توکن معتبر
    },
   }
  );

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
  const response = await axios.post(
   "/api/proxy/graphql",
   {
    query: GET_PRODUCT_QUERY,
    variables: {id},
   },
   {
    headers: {
     "Content-Type": "application/json",
     Authorization: `Bearer YOUR_TOKEN_HERE`, // توکن معتبر
    },
   }
  );

  return response.data.data.product;
 } catch (error) {
  console.error("Failed to fetch product:", error);
  return null;
 }
}
