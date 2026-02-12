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
                            <th>Join Date</th>
                            <th>Orders</th>
                            <th>Total Spent</th>
                            <th>Last Order</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((c: any) => {
                            return <tr key={c._id}>
                                <td>
                                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                        <div style={{ fontWeight: 600 }}>{c.name}</div>
                                    </div>
                                </td>
                                <td>
                                    <div style={{ fontSize: "13px" }}>{c.email}</div>
                                    <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{c.whatsappNumber}</div>
                                </td>
                                <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                                <td>{c.totalOrders}</td>
                                <td style={{ fontWeight: 600, color: "var(--text-primary)" }}>₹{c.totalSpent}</td>
                                <td>{c?.lastOrderDate ? c?.lastOrderDate : "na"}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
