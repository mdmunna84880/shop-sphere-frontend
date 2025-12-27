import type { IconType } from "react-icons";

export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export interface FeatureItemProps {
  icon: IconType;
  title: string;
  subtitle: string;
}

export type ProductCategory = string;