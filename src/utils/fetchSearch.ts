export async function getCategoryAttributes(categoryId: string) {
 const res = await fetch(process.env.BASE_URL_API + `categories/attributes?category_id=${categoryId}`, {
  method: "GET",
  headers: {
   Accept: "application/json",
  },
 });

 if (!res.ok) {
  throw new Error("Failed to fetch category attributes");
 }

 const data = await res.json();
 return data;
}
export async function getProducts(params: Record<string, string>) {
 const queryString = new URLSearchParams(params).toString();

 const res = await fetch(process.env.BASE_URL_API + `products?${queryString}`, {
  method: "GET",
  headers: {
   Accept: "application/json",
  },
 });

 if (!res.ok) {
  throw new Error("Failed to fetch products");
 }

 const data = await res.json();
 return data;
}
