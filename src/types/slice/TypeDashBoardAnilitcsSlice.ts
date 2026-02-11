type CategoryDistributionItem = {
  category: string;
  percentage: number;
};

type Last7DaysGraphItem = {
  date: string;
  label: string;
  revenue: number;
  orders: number;
  description: string;
};

type RecentOrderItem = {
  _id: string;
  orderId: string;
  customer: any | null;
  totalAmount: number;
  orderStatus: string;
};

type SummaryCards = {
  orderGrowth: number;
  revenueGrowth: number;
  totalCustomers: number;
  totalOrders: number;
  totalProducts: number;
  totalRevenue: number;
};

type TopProductItem = {
  _id: string;
  revenue: number;
  sales: number;
};

// Full Dashboard state type
export type TypeDashBoardAnilitcsSlice = {
  categoryDistribution: CategoryDistributionItem[] | null;
  last7DaysGraph: Last7DaysGraphItem[] | null;
  recentOrders: RecentOrderItem[] | null;
  summaryCards: SummaryCards | null;
  topProducts: TopProductItem[] | null;
};
