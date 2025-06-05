export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: ProductImage[];
  videos?: ProductVideo[];
  relatedProducts?: ProductRelatedProducts[];
  upSells?: UpSellsProducts[];
  crossSells?: CrossSellsProducts[];
  categories?: Category[];
}
export interface ProductImage {
  url: string;
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
  logoUrl: string | null;
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
