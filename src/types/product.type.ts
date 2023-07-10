import { CategoryType } from './category.type';

export interface ProductType {
  title: string;
  price: number;
  description: string;
  categoryId: number | string;
  images: string[];
}

export interface ProductItemType {
  id: number | string;
  price: number;
  title: string;
  description: string;
  category: CategoryType;
  images: string[];
  creationAt: string;
  updatedAt: string;
}

export interface CartItemType {
  id: number | string;
  price: number;
  title: string;
  description: string;
  category: CategoryType;
  images: string[];
  creationAt: string;
  updatedAt: string;
  quantity: number;
}
