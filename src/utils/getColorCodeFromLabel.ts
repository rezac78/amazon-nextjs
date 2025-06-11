function getColorCodeFromLabel(label: string): string {
 switch (label) {
  case "قرمز":
   return "#e53935";
  case "زرشکی":
   return "#8e0038";
  case "صورتی":
   return "#ec407a";
  case "سرخابی":
   return "#d81b60";
  case "گلبهی":
   return "#f8b195";
  case "نارنجی":
   return "#fb8c00";
  case "پرتقالی":
   return "#ff6f00";
  case "زرد":
   return "#fdd835";
  case "طلایی":
   return "#ffd700";
  case "لیمویی":
   return "#fff176";
  case "سبز":
   return "#43a047";
  case "سبز فسفری":
   return "#00e676";
  case "سبز زیتونی":
   return "#808000";
  case "سبز تیره":
   return "#1b5e20";
  case "فیروزه‌ای":
   return "#00bcd4";
  case "آبی":
   return "#1e88e5";
  case "آبی آسمانی":
   return "#4fc3f7";
  case "لاجوردی":
   return "#1565c0";
  case "آبی نفتی":
   return "#003f5c";
  case "نیلی":
   return "#3f51b5";
  case "بنفش":
   return "#8e24aa";
  case "بنفش تیره":
   return "#4a148c";
  case "یاسی":
   return "#ce93d8";
  case "ارغوانی":
   return "#ab47bc";
  case "قهوه‌ای":
   return "#795548";
  case "نسکافه‌ای":
   return "#a1887f";
  case "کرم":
   return "#f5f5dc";
  case "کاراملی":
   return "#b77b57";
  case "مشکی":
   return "#000000";
  case "سیاه":
   return "#212121";
  case "خاکستری":
   return "#9e9e9e";
  case "خاکستری تیره":
   return "#616161";
  case "خاکستری روشن":
   return "#cfd8dc";
  case "نقره‌ای":
   return "#c0c0c0";
  case "سفید":
   return "#ffffff";
  case "شیری":
   return "#fff8e1";
  case "آبی دریایی":
   return "#01579b";
  case "آبی کبود":
   return "#5c6bc0";
  case "برنز":
   return "#cd7f32";
  case "زغالی":
   return "#333333";
  default:
   return "#e0e0e0"; // رنگ پیش‌فرض برای نام‌های ناشناس
 }
}
export default getColorCodeFromLabel;
