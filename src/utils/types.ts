export interface Product {
 id: number;
 name: string;
 description: string;
 price: number;
 images: ProductImage[];
 videos?: ProductVideo[];
}
export interface ProductImage {
 url: string;
}

export interface ProductVideo {
 url: string;
}
