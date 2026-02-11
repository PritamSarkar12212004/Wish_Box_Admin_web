export interface Collection {
  id: number;
  title: string;
  subtitle: string;
  bgColor: string;
  accentColor: string;
  img: string;
  productsCount: number;
  category: string;
  status: CollectionStatus;
  description?: string;
  featured?: boolean;
  createdAt?: string;
}

export type CollectionStatus = "active" | "hidden";
