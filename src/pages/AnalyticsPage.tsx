import {
    AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { mockRevenueData, mockCategoryData, mockOrders } from "../data";

const monthlyData = [
    { month: "Sep", revenue: 42000, orders: 24 },
    { month: "Oct", revenue: 58000, orders: 32 },
    { month: "Nov", revenue: 72000, orders: 41 },
    { month: "Dec", revenue: 95000, orders: 56 },
    { month: "Jan", revenue: 81000, orders: 45 },
    { month: "Feb", revenue: 88000, orders: 48 },
];

const statusDistribution = [
    { status: "Delivered", count: mockOrders.filter((o) => o.status === "delivered").length, color: "#10B981" },
    { status: "Shipped", count: mockOrders.filter((o) => o.status === "shipped").length, color: "#3B82F6" },
    { status: "Processing", count: mockOrders.filter((o) => o.status === "processing").length, color: "#8B5CF6" },
    { status: "Pending", count: mockOrders.filter((o) => o.status === "pending").length, color: "#F59E0B" },
    { status: "Cancelled", count: mockOrders.filter((o) => o.status === "cancelled").length, color: "#EF4444" },
];

const tooltipStyle = {
    background: "var(--bg-secondary)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-sm)",
    fontSize: "13px",
    color: "var(--text-primary)",
    boxShadow: "var(--shadow-md)",
};

export default function AnalyticsPage() {
    const totalRevenue = monthlyData.reduce((s, d) => s + d.revenue, 0);
    const totalOrders = monthlyData.reduce((s, d) => s + d.orders, 0);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
                <h2 style={{ fontSize: "20px", fontWeight: 700, color: "var(--text-primary)" }}>Analytics</h2>
                <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>Business performance overview</p>
            </div>

            {/* Summary Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
                {[
                    { label: "6-Month Revenue", value: `₹${totalRevenue.toLocaleString("en-IN")}`, color: "var(--accent)" },
                    { label: "6-Month Orders", value: totalOrders.toString(), color: "var(--info)" },
                    { label: "Avg Monthly Revenue", value: `₹${Math.round(totalRevenue / 6).toLocaleString("en-IN")}`, color: "var(--success)" },
                    { label: "Avg Order Value", value: `₹${Math.round(totalRevenue / totalOrders).toLocaleString("en-IN")}`, color: "#A855F7" },
                ].map((s, i) => (
                    <div key={i} className="glass-card" style={{ padding: "16px" }}>
                        <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "4px" }}>{s.label}</p>
                        <p style={{ fontSize: "24px", fontWeight: 800, color: s.color }}>{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Charts Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="analytics-grid">
                <style>{`@media(max-width:900px){.analytics-grid{grid-template-columns:1fr!important}}`}</style>

                {/* Monthly Revenue */}
                <div className="glass-card" style={{ padding: "20px" }}>
                    <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "16px" }}>Monthly Revenue Trend</h3>
                    <div style={{ width: "100%", height: 260 }}>
                        <ResponsiveContainer>
                            <AreaChart data={monthlyData}>
                                <defs>
                                    <linearGradient id="monthRevGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                                <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${(v / 1000)}k`} />
                                <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`₹${v.toLocaleString("en-IN")}`, "Revenue"]} />
                                <Area type="monotone" dataKey="revenue" stroke="#F59E0B" strokeWidth={2} fill="url(#monthRevGrad)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Orders by Status */}
                <div className="glass-card" style={{ padding: "20px" }}>
                    <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "16px" }}>Orders by Status</h3>
                    <div style={{ width: "100%", height: 260 }}>
                        <ResponsiveContainer>
                            <BarChart data={statusDistribution}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                                <XAxis dataKey="status" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={tooltipStyle} />
                                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                                    {statusDistribution.map((entry, i) => (
                                        <Cell key={i} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Daily Revenue (Last 7 Days) */}
                <div className="glass-card" style={{ padding: "20px" }}>
                    <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "16px" }}>Daily Revenue (Last 7 Days)</h3>
                    <div style={{ width: "100%", height: 260 }}>
                        <ResponsiveContainer>
                            <BarChart data={mockRevenueData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                                <XAxis dataKey="date" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${(v / 1000)}k`} />
                                <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`₹${v.toLocaleString("en-IN")}`, "Revenue"]} />
                                <Bar dataKey="revenue" fill="#3B82F6" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Category Distribution */}
                <div className="glass-card" style={{ padding: "20px" }}>
                    <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "16px" }}>Category Sales Share</h3>
                    <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
                        <div style={{ width: "200px", height: "200px", flexShrink: 0 }}>
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie data={mockCategoryData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" stroke="none" paddingAngle={2}>
                                        {mockCategoryData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                                    </Pie>
                                    <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v}%`, "Share"]} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div style={{ flex: 1, minWidth: "150px" }}>
                            {mockCategoryData.map((item, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 0", fontSize: "13px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                        <span style={{ width: "8px", height: "8px", borderRadius: "2px", background: item.color }} />
                                        <span style={{ color: "var(--text-secondary)" }}>{item.name}</span>
                                    </div>
                                    <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
