import { HiOutlineCurrencyRupee, HiOutlineShoppingCart, HiOutlineCube, HiOutlineUserGroup } from "react-icons/hi";
import StatCard from "../components/ui/StatCard";
import RevenueChart from "../components/charts/RevenueChart";
import CategoryChart from "../components/charts/CategoryChart";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggel } from '../store/slice/loader/LoaderSlice'
import ApiDashBoardAnalitc from "../services/api/admin/analitcs/ApiDashBoardAnalitc";

const statusColors: Record<string, string> = {
    pending: "badge-warning",
    processing: "badge-info",
    shipped: "badge-info",
    delivered: "badge-success",
    cancelled: "badge-danger",
};

export default function DashboardPage() {
    const dispatch = useDispatch()
    const FetchData = () => {
        ApiDashBoardAnalitc({
            dispatch: dispatch
        })
    }
    const data = {
        categoryDistribution: useSelector((state: any) => state.DashBoardAnalitcs.categoryDistribution),
        last7DaysGraph: useSelector((state: any) => state.DashBoardAnalitcs.last7DaysGraph),
        recentOrders: useSelector((state: any) => state.DashBoardAnalitcs.recentOrders),
        summaryCards: useSelector((state: any) => state.DashBoardAnalitcs.summaryCards),
        topProducts: useSelector((state: any) => state.DashBoardAnalitcs.topProducts)
    }
    const categoryDistribution = data?.categoryDistribution || [];
    const transformedData = categoryDistribution.map((item: any) => ({
        name: item.category,
        value: item.percentage,
        color: item.color,
    }));

    useEffect(() => {
        dispatch(toggel())
        FetchData()
    }, [])
    return (
        <div className="dashboard-page" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: "16px",
                }}
            >
                <StatCard
                    label="Total Revenue"
                    value={data?.summaryCards?.totalRevenue}
                    change={`+${data?.summaryCards?.revenueGrowth}%`}
                    icon={HiOutlineCurrencyRupee}
                    variant="revenue"
                />
                <StatCard
                    label="Total Orders"
                    value={data?.summaryCards?.totalOrders}
                    change={`+${data?.summaryCards?.orderGrowth}%`}
                    icon={HiOutlineShoppingCart}
                    variant="orders"
                />
                <StatCard
                    label="Products"
                    value={data?.summaryCards?.totalProducts}
                    change={`+${0}%`}
                    icon={HiOutlineCube}
                    variant="products"
                />
                <StatCard
                    label="Customers"
                    value={data?.summaryCards?.totalCustomers}
                    change={`+${0}%`}
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
            >
                <RevenueChart data={data.last7DaysGraph} />
                <CategoryChart mainData={transformedData} />
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
                                {data?.recentOrders?.map((order: any) => (
                                    <tr key={order._id}>
                                        <td style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: "13px" }}>
                                            {order.orderId}
                                        </td>
                                        <td style={{ fontSize: "13px" }}>
                                            {order?.customer ? order.customer.name || order.customer : "na"}
                                        </td>
                                        <td style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>
                                            ₹{order.totalAmount}
                                        </td>
                                        <td>
                                            <span className={`badge ${statusColors[order.orderStatus] || ""}`}>
                                                {order.orderStatus}
                                            </span>
                                        </td>
                                    </tr>
                                )) || null}

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
                                {Array.isArray(data?.topProducts) && data.topProducts.length > 0 ? (
                                    data.topProducts.map((p: any) => (
                                        <tr key={p.product}>
                                            <td>
                                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                    <img
                                                        src={p?.image ? p.image : "na"}
                                                        alt={p?.product ? p.product : "na"}
                                                        style={{ width: "36px", height: "36px", borderRadius: "6px", objectFit: "cover" }}
                                                    />
                                                    <div>
                                                        <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)", maxWidth: "180px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                            {p.product}
                                                        </div>
                                                        <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                                                            {p?.category ? p.category : "Na"}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>{p.sales}</td>
                                            <td style={{ fontSize: "13px", fontWeight: 600, color: "var(--accent)" }}>₹{p.revenue.toLocaleString("en-IN")}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3} style={{ textAlign: "center", fontSize: "13px", color: "var(--text-muted)" }}>
                                            No top products yet
                                        </td>
                                    </tr>
                                )}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
