import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import type { RevenueDataPoint } from "../../types";

interface RevenueChartProps {
    data: RevenueDataPoint[];
}

export default function RevenueChart({ data }: RevenueChartProps) {
    return (
        <div className="glass-card" style={{ padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                <div>
                    <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)" }}>Revenue Overview</h3>
                    <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "2px" }}>Last 7 days</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "12px" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--text-secondary)" }}>
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent)" }}></span>
                        Revenue
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--text-secondary)" }}>
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#3B82F6" }}></span>
                        Orders
                    </span>
                </div>
            </div>
            <div style={{ width: "100%", height: 280 }}>
                <ResponsiveContainer>
                    <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                        <XAxis dataKey="date" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                        <Tooltip
                            contentStyle={{
                                background: "var(--bg-secondary)",
                                border: "1px solid var(--border)",
                                borderRadius: "var(--radius-sm)",
                                fontSize: "13px",
                                color: "var(--text-primary)",
                                boxShadow: "var(--shadow-md)",
                            }}
                            formatter={(value: number, name: string) => [
                                name === "revenue" ? `₹${value.toLocaleString("en-IN")}` : value,
                                name === "revenue" ? "Revenue" : "Orders",
                            ]}
                        />
                        <Area type="monotone" dataKey="revenue" stroke="#F59E0B" strokeWidth={2} fill="url(#colorRevenue)" />
                        <Area type="monotone" dataKey="orders" stroke="#3B82F6" strokeWidth={2} fill="url(#colorOrders)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
