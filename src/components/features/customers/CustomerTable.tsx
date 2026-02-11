import type { Customer } from "../../../types";

interface CustomerTableProps {
    customers: Customer[];
}

export default function CustomerTable({ customers }: CustomerTableProps) {
    return (
        <div className="glass-card overflow-hidden">
            <div style={{ overflowX: "auto" }}>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Email / Phone</th>
                            <th>Joined</th>
                            <th>Orders</th>
                            <th>Total Spent</th>
                            <th>Last Order</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((c) => (
                            <tr key={c.id}>
                                <td>
                                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                        <div style={{
                                            width: "32px", height: "32px", borderRadius: "50%",
                                            backgroundColor: "var(--accent-light)", color: "var(--accent)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            fontWeight: 600, fontSize: "12px"
                                        }}>
                                            {c.avatar}
                                        </div>
                                        <div style={{ fontWeight: 600 }}>{c.name}</div>
                                    </div>
                                </td>
                                <td>
                                    <div style={{ fontSize: "13px" }}>{c.email}</div>
                                    <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{c.phone}</div>
                                </td>
                                <td>{c.joinedAt}</td>
                                <td>{c.totalOrders}</td>
                                <td style={{ fontWeight: 600, color: "var(--text-primary)" }}>₹{c.totalSpent.toLocaleString("en-IN")}</td>
                                <td>{c.lastOrderDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
