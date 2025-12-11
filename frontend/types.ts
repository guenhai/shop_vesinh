export enum Category {
  TOILET = 'Bồn cầu',
  LAVABO = 'Lavabo',
  SHOWER = 'Sen tắm',
  FAUCET = 'Vòi nước',
  ACCESSORY = 'Phụ kiện',
  COMBO = 'Combo'
}

export interface Product {
  id: string;
  name: string;
  code: string; // SKU
  price: number;
  originalPrice?: number; // For strikethrough comparison
  category: Category;
  description: string;
  image: string; // Main thumbnail (backward compatibility)
  images?: string[]; // Gallery images
  isPopular?: boolean;
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface FilterState {
  search: string;
  category: Category | 'All';
  minPrice: number;
  maxPrice: number;
  sort: 'asc' | 'desc' | 'popular';
}

export interface ShopConfig {
  name: string;
  phone: string;
  zaloId: string;
  address: string;
}