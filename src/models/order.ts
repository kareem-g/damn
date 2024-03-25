export interface IOrder {
  identifier: string;
  uuid: string;
  date: string;
  status: string;
  trustpilot_url: string;
  customer: Customer;
  items: Item[];
  total_price: TotalPrice;
  discount_amount: DiscountAmount2;
  market: string;
  is_agency: boolean;
  is_paid: boolean;
  order_uuid: string;
  cart_uuid: string;
  createdAt: number;
}

export interface Customer {
  id: number;
  created_at: string;
  email: string;
  firstname: string;
  lastname: string;
}

export interface Item {
  uuid: string;
  cart_item_uuid: string;
  product: Product;
  quantity: number;
  retail_price_in_order_currency: RetailPriceInOrderCurrency;
  total_retail_price_in_order_currency: TotalRetailPriceInOrderCurrency;
  status: string;
  vouchers: any[];
  extra_customer_data: ExtraCustomerDaum[];
  is_error_status: boolean;
}

export interface Product {
  type: string;
  max_confirmation_time: string;
  price_tag: PriceTag;
  date: string;
  id: string;
  title: string;
  activity_uuid: string;
  api_url: string;
  url: string;
  cover_image_url: string;
  original_retail_price: OriginalRetailPrice;
  original_retail_price_without_service_fee: OriginalRetailPriceWithoutServiceFee;
  retail_price: RetailPrice;
  retail_price_without_service_fee: RetailPriceWithoutServiceFee;
  discount_amount: DiscountAmount;
  service_fee: ServiceFee;
  meeting_point: string;
  meeting_point_markdown: string;
  meeting_point_html: string;
}

export interface PriceTag {
  price_feature: string;
  ticket_holder: string;
  price_feature_code: string;
  ticket_holder_code: string;
}

export interface OriginalRetailPrice {
  currency: string;
  value: number;
  formatted_value: string;
  formatted_iso_value: string;
}

export interface OriginalRetailPriceWithoutServiceFee {
  currency: string;
  value: number;
  formatted_value: string;
  formatted_iso_value: string;
}

export interface RetailPrice {
  currency: string;
  value: number;
  formatted_value: string;
  formatted_iso_value: string;
}

export interface RetailPriceWithoutServiceFee {
  currency: string;
  value: number;
  formatted_value: string;
  formatted_iso_value: string;
}

export interface DiscountAmount {
  currency: string;
  value: number;
  formatted_value: string;
  formatted_iso_value: string;
}

export interface ServiceFee {
  currency: string;
  value: number;
  formatted_value: string;
  formatted_iso_value: string;
}

export interface RetailPriceInOrderCurrency {
  currency: string;
  value: number;
  formatted_value: string;
  formatted_iso_value: string;
}

export interface TotalRetailPriceInOrderCurrency {
  currency: string;
  value: number;
  formatted_value: string;
  formatted_iso_value: string;
}

export interface ExtraCustomerDaum {
  name: string;
  value: string;
}

export interface TotalPrice {
  currency: string;
  value: number;
  formatted_value: string;
  formatted_iso_value: string;
}

export interface DiscountAmount2 {
  currency: string;
  value: number;
  formatted_value: string;
  formatted_iso_value: string;
}
