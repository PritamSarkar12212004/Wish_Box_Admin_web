export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  paymentMethod: string;
  date: string;
  address: string;
}

export interface OrderItem {
  productId: number;
  productTitle: string;
  quantity: number;
  price: number;
  img: string;
}

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";
