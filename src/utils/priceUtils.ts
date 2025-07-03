// utils/priceUtils.ts
import {Product} from "./types/types";
export function isSpecialPriceValid(product: Product): boolean {
 const {specialPrice, specialPriceFrom, specialPriceTo} = product;

 if (typeof specialPrice !== "number" || !specialPriceFrom || !specialPriceTo) {
  return false;
 }

 const now = new Date();
 const from = new Date(specialPriceFrom);
 const to = new Date(specialPriceTo);

 return now >= from && now <= to;
}
export function getDiscountPercent(product: Product): string {
 const original = product.price ?? 0;
 const special = product.specialPrice ?? 0;
 if (!original || !special || special >= original) return "0%";
 const percent = ((original - special) / original) * 100;
 const rounded = Math.round(percent);
 return `${rounded.toLocaleString("fa-IR")}٪`;
}
