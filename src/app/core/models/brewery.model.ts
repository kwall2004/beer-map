export interface Brewery {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}
