export interface Product {
 id: number;
 name: string;
 type: string;
 parentId?: number;
 url?: string;
 url_key?: string;
 attributeFamilyId?: number;
 averageRating?: number;
 productNumber?: string;
 shortDescription?: string;
 description?: string;
 urlKey?: string;
 shareURL?: string;
 new?: boolean;
 featured?: boolean;
 status?: boolean;
 guestCheckout?: boolean;
 visibleIndividually?: boolean;
 metaTitle?: string;
 metaKeywords?: string;
 metaDescription?: string;
 price?: number;
 formatted_price?: number;
 specialPrice?: number;
 specialPriceFrom?: string | Date;
 specialPriceTo?: string | Date;
 weight?: number;
 createdAt?: string;
 updatedAt?: string;
 priceHtml: {
  formattedFinalPrice: string;
 };
 images: ProductImage[];
 reviews: ProductReviewSummary | ProductReviews[];
 videos?: ProductVideo[];
 additionalData?: AdditionalAttribute[];
 inventories?: {qty?: number}[];

 downloadableLinks?: DownloadableLink[];
 downloadableSamples?: DownloadableSample[];

 booking?: BookingProduct;

 crossSells?: RelatedProduct[];
 upSells?: RelatedProduct[];
 relatedProducts?: RelatedProduct[];

 super_attributes?: SuperAttribute[];
 variants?: ProductVariant[];

 categories?: Category[];

 isInWishlist?: boolean; // optional client-side data
}
export interface RelatedProduct {
 id: number;
 name: string;
 urlKey: string;
 images: ProductImage[];
 reviews: ProductReviewSummary | ProductReviews[];
 price: number;
}
export interface AdditionalAttribute {
 id: number;
 label: string;
 code: string;
 value: string;
}
export interface DownloadableLink {
 id: number;
 title: string;
 price: number;
}
export interface Slot {
 id: number;
 day: string;
 from: string; // "13:00"
 to: string; // "14:00"
}
export interface DownloadableSample {
 formatted_price?: string;
 price: number;
 id: number;
 url?: string;
 fileUrl?: string;
 file?: string;
 fileName?: string;
}
export interface BookingProduct {
 id: number;
 type: string;
 qty?: number;
 location?: string;
 showLocation?: boolean;
 availableEveryWeek?: boolean;
 availableFrom?: string;
 availableTo?: string;
 productId: number;

 tableSlot?: {
  id: number;
  priceType?: string;
  guestLimit?: number;
  duration?: number;
  breakTime?: number;
  preventSchedulingBefore?: number;
  sameSlotAllDays?: boolean;
  bookingProductId: number;
  slots: {
   id: number;
   day: string;
   from: string;
   to: string;
  }[];
 };

 defaultSlot?: {
  id: number;
  bookingType: string;
  duration: number;
  breakTime?: number;
 };

 appointmentSlot?: {
  id: number;
  duration: number;
 };

 eventTickets?: {
  id: number;
  price: number;
 }[];

 rentalSlot?: {
  id: number;
  rentingType: string;
 };
}
export interface ProductImage {
 url?: string;
 large_image_url?: string;
}
export interface ProductReviews {
 id: number;
 name?: string;
 comment?: string;
 title?: string;
 rating: number;
 createdAt: string;
 average_rating?: number;
}
export interface ProductVariant {
 id: number;
 price: number | string;
 formatted_price?: string;
 attributes: {
  [key: string]: number;
 };
}
export interface SuperAttributeOption {
 id: number;
 admin_name: string;
 label: string;
 swatch_value?: string | null;
}

export interface SuperAttribute {
 id: number;
 name: string;
 admin_name: string;
 code: string;
 options: SuperAttributeOption[];
}

export interface ProductVideo {
 url: string;
}
export interface ProductReviewSummary {
 average_rating: string;
 percentage: string; // JSON string
 total: number;
 total_rating: number;
}
export interface ProductRelatedProducts {
 id: number;
 url?: string;
 urlKey?: string;
 images: ProductImage[];
 reviews: ProductReviewSummary | ProductReviews[];
 price?: number;
 name: string;
 isInWishlist?: boolean;
 url_key?: string;
}
export interface UpSellsProducts {
 id: number;
 url: string;
 images: ProductImage[];
 price: string;
 name: string;
}
export interface CrossSellsProducts {
 id: number;
 url: string;
 images: ProductImage[];
 price: string;
 name: string;
}
export interface Category {
 id: number;
 name: string;
 slug?: string;
}
export interface CategoryHome {
 id: number;
 parent_id: number | null;
 name: string;
 slug: string;
 description: string;
 logo: ProductImage;
 bannerUrl: string | null;
 position: number | null;
 metaTitle: string | null;
 metaDescription: string | null;
 metaKeywords: string | null;
 children?: ChildCategory[];
}

export interface ChildCategory {
 id: number;
 name: string;
 slug: string;
}
export type FilterType = "price" | "select";

export interface CategoryAttributeFilter {
 id: number;
 code: string;
 name: string;
 type: FilterType;
 options: FilterOption[]; // empty array for price
}
export interface FilterOption {
 id: number;
 admin_name: string;
}
export type ProductSliderItem = Product | ProductRelatedProducts;
export interface CustomerInfo {
 id: number;
 first_name: string;
 last_name: string;
 email: string;
 gender: string;
 phone: string;
 status: string;
 subscribed_to_news_letter: string;
 date_of_birth?: string;
 image: string;
 notes: string;
}
export interface Address {
 id: number;
 first_name: string;
 last_name: string;
 company_name: string;
 vat_id: string;
 address1: string;
 address2: string;
 address: string;
 country: string;
 country_name: string;
 state: string;
 city: string;
 postcode: number;
 phone: string;
 email: string;
 is_default: string;
}
export interface ProductAttribute {
 id: number;
 code: string;
 label: string;
 value: string | number;
 admin_name: string;
}
export interface DownloadableLink {
 formatted_price?: number;
 price: number;
 id: number;
 file_url?: string | null;
 sample_url?: string | null;
 sample_download_url?: string | null;
 sample_type: "file" | "url"; // نوع فایل یا لینک
 file_name?: string | null;
 title: string;
 type: "file" | "url"; // نوع لینک
 created_at: string;
 updated_at: string;
}
