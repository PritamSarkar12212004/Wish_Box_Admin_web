import { IconType } from "react-icons";
import { HiArrowUp, HiArrowDown } from "react-icons/hi";

interface StatCardProps {
    label: string;
    value: string | number;
    icon: IconType;
    variant: "revenue" | "orders" | "products" | "customers";
    change: string;
}

export default function StatCard({ label, value, icon: Icon, variant, change }: StatCardProps) {
    const isPositive = !change.startsWith("-");

    return (
        <div className={`glass-card stat-card-${variant} animate-fade-in-up`} style={{ padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div>
                    <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "8px", fontWeight: 500 }}>
                        {label}
                    </p>
                    <p style={{ fontSize: "28px", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
                        {value}
                    </p>
                </div>
                <div
                    style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "var(--radius-md)",
                        background: "var(--bg-input)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "20px",
                    }}
                >
                    <Icon />
                </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "12px" }}>
                <span
                    className={`badge ${isPositive ? "badge-success" : "badge-danger"}`}
                    style={{ fontSize: "11px", padding: "2px 6px" }}
                >
                    {isPositive ? <HiArrowUp size={10} /> : <HiArrowDown size={10} />}
                    {change}
                </span>
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>vs last month</span>
            </div>
        </div>
    );
}
