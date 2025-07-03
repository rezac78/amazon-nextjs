import {BASE_URL_API} from "@/config";

export async function categories() {
 try {
  const response = await fetch(BASE_URL_API + `categories`, {
   method: "GET",
   headers: {
    "Content-Type": "application/json",
   },
  });

  const resData = await response.json();

  if (!response.ok) {
   throw new Error(resData.message || "خطا در دریافت دسته‌بندی‌ها");
  }

  return resData.data || resData; // بسته به ساختار خروجی
 } catch (err) {
  console.error("Categories Error:", err);
  throw err;
 }
}
