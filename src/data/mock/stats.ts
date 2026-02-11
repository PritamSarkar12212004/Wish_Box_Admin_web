import type { DashboardStats, RevenueDataPoint, CategoryDataPoint } from "../../types";

export const mockDashboardStats: DashboardStats = {
  totalRevenue: 284750,
  totalOrders: 156,
  totalProducts: 12,
  totalCustomers: 8,
  revenueTrend: 12.5,
  ordersTrend: 8.3,
  productsTrend: 4.2,
  customersTrend: 15.7,
};

export const mockRevenueData: RevenueDataPoint[] = [
  { date: "Feb 4", revenue: 32400, orders: 18 },
  { date: "Feb 5", revenue: 28900, orders: 14 },
  { date: "Feb 6", revenue: 41200, orders: 22 },
  { date: "Feb 7", revenue: 38700, orders: 20 },
  { date: "Feb 8", revenue: 45600, orders: 26 },
  { date: "Feb 9", revenue: 52100, orders: 31 },
  { date: "Feb 10", revenue: 45850, orders: 25 },
];

export const mockCategoryData: CategoryDataPoint[] = [
  { name: "Party Garlands", value: 28, color: "#FF6B9D" },
  { name: "Paper Flowers", value: 22, color: "#4A90E2" },
  { name: "Birthday Decor", value: 15, color: "#48BB78" },
  { name: "Wedding Backdrops", value: 12, color: "#ED8936" },
  { name: "Festive Lanterns", value: 10, color: "#4299E1" },
  { name: "Decorative Fans", value: 8, color: "#9F7AEA" },
  { name: "Paper Streamers", value: 5, color: "#FC8181" },
];
