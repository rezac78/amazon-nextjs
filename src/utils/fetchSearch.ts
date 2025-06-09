export async function getCategoryAttributes() {
 try {
  const res = await fetch(`${process.env.BASE_URL_API}attributes?sort=id`, {
   method: "GET",
   headers: {
    Accept: "application/json",
   },
  });
  const data = await res.json();
  return data ?? [];
 } catch (error) {
  console.error("❌ getCategoryAttributes error:", error);
  return [];
 }
}

export async function getProducts(params: Record<string, string | number>) {
 try {
  const queryString = new URLSearchParams(
   Object.entries(params).reduce((acc, [key, val]) => {
    acc[key] = String(val);
    return acc;
   }, {} as Record<string, string>)
  ).toString();

  const res = await fetch(`${process.env.BASE_URL_API}products?${queryString}`, {
   method: "GET",
   headers: {
    Accept: "application/json",
   },
  });

  if (!res.ok) {
   const errorText = await res.text().catch(() => "");
   console.error("Fetch products error:", errorText);
   throw new Error("Failed to fetch products");
  }

  const data = await res.json();

  // فقط لیست محصولات
  return data?.data ?? [];
 } catch (err) {
  console.error("❌ getProducts error:", err);
  return [];
 }
}
