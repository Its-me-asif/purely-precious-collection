export type Settings = {
  announcement: string;
  phone: string;
  email: string;
  instagram: string;
  city: string;
  about: string;
};

export type Catalog = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  sort: number;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  catalogId: string;
  price: number;
  metal: string;
  description: string;
  details: string;
  images: string[];
  featured: boolean;
  available: boolean;
  createdAt: string;
  compareAt?: number;
  rating?: number;
  reviews?: number;
};

export type OrderItem = {
  productId: string;
  name: string;
  price: number;
  qty: number;
  image: string;
};

export type OrderStatus = "new" | "confirmed" | "closed";

export type Order = {
  id: string;
  reference: string;
  createdAt: string;
  name: string;
  phone: string;
  email: string;
  note: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
};

export type Message = {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  read: boolean;
};

export type DB = {
  settings: Settings;
  catalogs: Catalog[];
  products: Product[];
  orders: Order[];
  messages: Message[];
};
