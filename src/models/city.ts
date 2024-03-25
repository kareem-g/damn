export interface ICity {
  id: number;
  uuid: string;
  top: boolean;
  name: string;
  code: string;
  content: string;
  meta_description: string;
  meta_title: string;
  headline: string;
  more: string;
  weight: number;
  latitude: number;
  longitude: number;
  country: Country;
  cover_image_url: string;
  url: string;
  event_count: number;
  time_zone: string;
  list_count: number;
  venue_count: number;
  show_in_popular: boolean;
}

export interface Country {
  id: number;
  name: string;
  iso_code: string;
}
