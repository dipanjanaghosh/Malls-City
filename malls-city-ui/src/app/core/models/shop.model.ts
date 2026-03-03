export interface ShopItem {
  id: string;
  name: string;
  mallId: string;
  category: string;
  description: string;
  floor: string; // Changed to string to handle 'Ground', '1st', etc.
  address: string;
  contactNumber: string;
  img: string;
  rating: number;
}
