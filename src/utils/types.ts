export interface Product {
 id: number;
 name: string;
 description: string;
 price: number;
 images: ProductImage[];
 videos?: ProductVideo[];
 relatedProducts?: ProductRelatedProducts[];
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
export interface Category {
 id: number;
 name: string;
 slug?: string;
}
