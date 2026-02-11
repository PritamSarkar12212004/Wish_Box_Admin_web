export interface Product {
  id: number;
  title: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  category: string;
  tags: string[];
  img: string;
  decorationImg?: string;
  collectionId?: number;
  status: "active" | "draft";
  stock: number;
  sales: number;
  createdAt: string;
}

export type ProductStatus = "active" | "draft";
