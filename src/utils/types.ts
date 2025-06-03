export interface Product {
 id: number;
 name: string;
 description: string;
 price: number;
 images: ProductImage[];
 videos?: ProductVideo[];
 relatedProducts?: ProductRelatedProducts[];
}
export interface ProductImage {
 url: string;
}

export interface ProductVideo {
 url: string;
}
export interface ProductRelatedProducts {
 url: string;
 images: ProductImage[];
 price: string;
 name: string;
}
