export interface IGroupSlots {
  groups: IGroup[];
}

export interface IGroup {
  feature_code: string;
  name: string;
  default: boolean;
  type: string;
  slots: ISlot[];
}

export interface ISlot {
  time: string;
  languages: any[];
  products: ISlotProduct[];
  tags: any[];
}

export interface ISlotProduct {
  holder_code_normalized: string;
  service_fee: ServiceFee;
  holder_code: string;
  name: string;
  type: string;
  default: boolean;
  product_id: string;
  min_buy: number;
  max_buy: number;
  availability: number;
  original_retail_price: OriginalRetailPrice;
  original_retail_price_without_service_fee: OriginalRetailPriceWithoutServiceFee;
  discount_amount: DiscountAmount;
  retail_price: RetailPrice;
  retail_price_without_service_fee: RetailPriceWithoutServiceFee;
  activity_uuid: string;
}

interface ServiceFee {
  currency: string;
  value: number;
  formatted_value: string;
  formatted_iso_value: string;
}

interface OriginalRetailPrice {
  currency: string;
  value: number;
  formatted_value: string;
  formatted_iso_value: string;
}

interface OriginalRetailPriceWithoutServiceFee {
  currency: string;
  value: number;
  formatted_value: string;
  formatted_iso_value: string;
}

interface DiscountAmount {
  currency: string;
  value: number;
  formatted_value: string;
  formatted_iso_value: string;
}

interface RetailPrice {
  currency: string;
  value: number;
  formatted_value: string;
  formatted_iso_value: string;
}

interface RetailPriceWithoutServiceFee {
  currency: string;
  value: number;
  formatted_value: string;
  formatted_iso_value: string;
}
