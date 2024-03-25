import {IBookingType} from './enums/BookingType';
import {OrderBoxElement} from './enums/OrderBoxElement.enum';

export interface ITour {
  slug_id: string;
  max_confirmation_time: string;
  cutoff_time: string;
  booking_type: IBookingType;
  uuid: string;
  city: City;
  title: string;
  relevance: number;
  highlights: string[];
  included: string[];
  not_included: string[];
  where_text: string;
  emergency_phone_number: string;
  relevance_venue: number;
  must_see: boolean;
  last_chance: boolean;
  top_seller: boolean;
  voucher_access_usage: string;
  temporary: boolean;
  description: string;
  about: string;
  meeting_point: string;
  duration_range: DurationRange;
  validity: string;
  has_price_info_on_date: boolean;
  open: boolean;
  ticket_not_included: boolean;
  likely_to_sell_out: boolean;
  special_offer: boolean;
  exclusive: boolean;
  best_price: boolean;
  daily: boolean;
  languages: Feature[];
  group_size: any[];
  food: any[];
  services: Feature[];
  features: Feature[];
  is_available_today: boolean;
  is_available_tomorrow: boolean;
  cover_image_url: string;
  service_fee: OriginalRetailPrice;
  retail_price: OriginalRetailPrice;
  retail_price_without_service_fee: OriginalRetailPrice;
  original_retail_price_without_service_fee: OriginalRetailPrice;
  original_retail_price: OriginalRetailPrice;
  discount: number;
  categories: Category[];
  reviews_number: number;
  reviews_avg: number;
  reviews_aggregated_info: {[key: string]: number};
  url: string;
  flavours: any[];
  verticals: Vertical[];
  supplier: Supplier;
  giftable: boolean;
  buy_multiplier: number;
  ticket: boolean;
  venues: IVenue[];
  free_cancellation: boolean;
  order_box_elements: OrderBoxElement[];
  sold_out: boolean;
}

export interface IVenue {
  id: number;
  name: string;
  meta_title: string;
  meta_description: string;
  headline: string;
  latitude: number;
  longitude: number;
  description: string;
  address: string;
  cover_image_url: string;
  url: string;
}

export interface Category {
  id: number;
  name: string;
  level: string;
  code: string;
  event_image_url: string;
  cover_image_url: string;
  url: string;
  parent_id?: number;
}

export interface City {
  id: number;
  name: string;
  country: Country;
  cover_image_url: string;
  url: string;
  time_zone: string;
  latitude: number;
  longitude: number;
}

export interface Country {
  id: number;
  name: string;
  iso_code: string;
}

export interface DurationRange {
  min: string;
  max: string;
}

export interface Feature {
  code: string;
  name: string;
}

export interface OriginalRetailPrice {
  currency: string;
  value: number;
  formatted_value: string;
  formatted_iso_value: string;
}

export interface Supplier {
  uuid: string;
}

export interface Vertical {
  id: number;
  name: string;
  active: boolean;
  code: string;
  slug: string;
  url: string;
  meta_title: string;
  meta_description: string;
  cover_image_url: string;
  relevance: number;
}

export interface ITourMedia {
  id: string;
  title: string;
  url: string;
  type: string;
  is_cover: boolean;
}
