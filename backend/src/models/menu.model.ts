export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
  isSpecial?: boolean;
  imageUrl?: string;
}

export interface MenuUpdateRequest {
  price?: number;
  available?: boolean;
  isSpecial?: boolean;
}