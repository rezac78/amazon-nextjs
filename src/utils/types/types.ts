export interface Product {
 downloadable_links?: DownloadableLink[];
 id: number;
 name: string;
 description?: string;
 price?: number;
 formatted_price?: number;
 isInWishlist: boolean;
 weight?: number;
 url_key?: string;
 super_attributes?: SuperAttribute[];
 variants?: ProductVariant[];
 images: ProductImage[];
 videos?: ProductVideo[];
 relatedProducts?: ProductRelatedProducts[];
 upSells?: UpSellsProducts[];
 crossSells?: CrossSellsProducts[];
 categories?: Category[];
}
export interface ProductImage {
 url?: string;
 large_image_url?: string;
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
export interface ProductRelatedProducts {
 id: number;
 url: string;
 images: ProductImage[];
 price: string;
 name: string;
 isInWishlist?: string;
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
 price?: number;
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
