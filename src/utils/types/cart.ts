export interface CartItem {
 id: number;
 cart_id: number;
 is_buy_now: number;
 product_id: number;
 quantity: number;
 name: string;
 sku: string;
 type: string;
 price: string;
 total: string;
 tax_amount: string;
 tax_percent: string;
 discount_amount: string;
 discount_percent: string;
 custom_price: string | null;
 base_price: string;
 base_total: string;
 base_tax_amount: string;
 base_discount_amount: string;
 base_total_weight: string;
 total_weight: string;
 weight: string;
 created_at: string;
 updated_at: string;
 coupon_code: string | null;

 formatted_base_price: string;
 formatted_base_total: string;
 formatted_base_tax_amount: string;
 formatted_base_discount_amount: string;
 formatted_custom_price: string;
 formatted_discount_amount: string;
 formatted_price: string;
 formatted_tax_amount: string;
 formatted_total: string;

 additional: {
  links: number[];
  bundle_options?: Record<string, number[]>;
  bundle_option_qty?: Record<string, number>;
  super_attribute?: Record<string, number>;
  selected_configurable_option?: number;
 };

 product: {
  base_image: ProductImage[];
  id: number;
  sku: string;
  type: string;
  name: string;
  url_key: string;
 };

 child: unknown | null;
}
export interface ProductImage {
 url?: string;
 large_image_url?: string;
}
