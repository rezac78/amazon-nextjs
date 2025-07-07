import {BASE_URL_API} from "@/config";

export async function categories(lang: string) {
 try {
  const response = await fetch(BASE_URL_API + `categories?locale=${lang}`, {
   method: "GET",
   headers: {
    "Content-Type": "application/json",
    "Accept-Language": `${lang}`,
   },
  });

  const resData = await response.json();

  if (!response.ok) {
   throw new Error(resData.message || "خطا در دریافت دسته‌بندی‌ها");
  }

  return resData.data || resData;
 } catch (err) {
  console.error("Categories Error:", err);
  throw err;
 }
}
export async function locales() {
 try {
  const response = await fetch(BASE_URL_API + `v1/locales`, {
   method: "GET",
   headers: {
    "Content-Type": "application/json",
   },
  });

  const resData = await response.json();

  if (!response.ok) {
   throw new Error(resData.message || "خطا در دریافت زبان");
  }

  return resData.data || resData;
 } catch (err) {
  console.error("locales Error:", err);
  throw err;
 }
}
