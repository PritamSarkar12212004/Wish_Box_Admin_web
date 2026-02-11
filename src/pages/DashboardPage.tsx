import { HiOutlineCurrencyRupee, HiOutlineShoppingCart, HiOutlineCube, HiOutlineUserGroup } from "react-icons/hi";
import StatCard from "../components/ui/StatCard";
import RevenueChart from "../components/charts/RevenueChart";
import CategoryChart from "../components/charts/CategoryChart";
import { mockDashboardStats, mockRevenueData, mockCategoryData, mockOrders, mockProducts } from "../data";

const statusColors: Record<string, string> = {
    pending: "badge-warning",
    processing: "badge-info",
    shipped: "badge-info",
    delivered: "badge-success",
    cancelled: "badge-danger",
};

export default function DashboardPage() {
    const stats = mockDashboardStats;
    const recentOrders = mockOrders.slice(0, 5);
    const topProducts = [...mockProducts].sort((a, b) => b.sales - a.sales).slice(0, 5);

    return (
        <div className="dashboard-page" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Stats Grid */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: "16px",
                }}
            >
                <StatCard
                    label="Total Revenue"
                    value={`₹${stats.totalRevenue.toLocaleString("en-IN")}`}
                    change={`+${stats.revenueTrend}%`}
                    icon={HiOutlineCurrencyRupee}
                    variant="revenue"
                />
                <StatCard
                    label="Total Orders"
                    value={stats.totalOrders.toString()}
                    change={`+${stats.ordersTrend}%`}
                    icon={HiOutlineShoppingCart}
                    variant="orders"
                />
                <StatCard
                    label="Products"
                    value={stats.totalProducts.toString()}
                    change={`+${stats.productsTrend}%`}
                    icon={HiOutlineCube}
                    variant="products"
                />
                <StatCard
                    label="Customers"
                    value={stats.totalCustomers.toString()}
                    change={`+${stats.customersTrend}%`}
                    icon={HiOutlineUserGroup}
                    variant="customers"
                />
            </div>

            {/* Charts row */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 380px",
                    gap: "16px",
                }}
                className="charts-row"
            >
                <RevenueChart data={mockRevenueData} />
                <CategoryChart data={mockCategoryData} />
            </div>
            <style>{`@media(max-width:1024px){.charts-row{grid-template-columns:1fr!important}}`}</style>

            {/* Tables row */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                }}
                className="tables-row"
            >
                <style>{`@media(max-width:900px){.tables-row{grid-template-columns:1fr!important}}`}</style>

                {/* Recent Orders */}
                <div className="glass-card" style={{ overflow: "hidden" }}>
                    <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)" }}>Recent Orders</h3>
                        <a href="/orders" style={{ fontSize: "12px", color: "var(--accent)", textDecoration: "none" }}>View all →</a>
                    </div>
                    <div style={{ overflowX: "auto" }}>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order) => (
                                    <tr key={order.id}>
                                        <td style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: "13px" }}>{order.id}</td>
                                        <td style={{ fontSize: "13px" }}>{order.customerName}</td>
                                        <td style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>₹{order.total.toLocaleString("en-IN")}</td>
                                        <td><span className={`badge ${statusColors[order.status] || ""}`}>{order.status}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Top Products */}
                <div className="glass-card" style={{ overflow: "hidden" }}>
                    <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)" }}>Top Products</h3>
                        <a href="/products" style={{ fontSize: "12px", color: "var(--accent)", textDecoration: "none" }}>View all →</a>
                    </div>
                    <div style={{ overflowX: "auto" }}>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Sales</th>
                                    <th>Revenue</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topProducts.map((p) => (
                                    <tr key={p.id}>
                                        <td>
                                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                <img src={p.img} alt={p.title} style={{ width: "36px", height: "36px", borderRadius: "6px", objectFit: "cover" }} />
                                                <div>
                                                    <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)", maxWidth: "180px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                        {p.title}
                                                    </div>
                                                    <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{p.category}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>{p.sales}</td>
                                        <td style={{ fontSize: "13px", fontWeight: 600, color: "var(--accent)" }}>₹{(p.sales * p.price).toLocaleString("en-IN")}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
