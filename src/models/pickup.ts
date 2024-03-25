export interface IPickupPoint {
  uuid: string;
  type: string;
  name: string;
  latitude: number;
  longitude: number;
  tags: Tag[];
}

export interface Tag {
  id: string;
  type: string;
}
