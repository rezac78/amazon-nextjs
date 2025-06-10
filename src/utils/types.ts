export interface Product {
 id: number;
 name: string;
 description: string;
 price: number;
 isInWishlist: boolean;
 weight?: number;
 shareURL: string;
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
 name: string;
 slug: string;
 description: string;
 logo_url: string | null;
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
