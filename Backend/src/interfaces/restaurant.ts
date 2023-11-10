export interface ICreateRestaurant {
  name: string;
  location: string;
  rating: number;
  email: string;
  offers: string;
  images?: Images;
}

export interface IPatchRestaurant {
  name?: string;
  location?: string;
  rating?: number;
  email?: string;
  offers?: string;
  images?: Images;
}

export interface Restaurant {
  id: string;
  name: string;
  location: string;
  rating: number;
  email: string;
  offers: string;
  images?: string;
}

export interface Images {
  location: string;
}
