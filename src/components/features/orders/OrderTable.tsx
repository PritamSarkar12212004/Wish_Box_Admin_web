import type { Order } from "../../../types";

interface OrderTableProps {
    orders: Order[];
}

const statusColors: Record<string, string> = {
    pending: "badge-warning",
    processing: "badge-info",
    shipped: "badge-info",
    delivered: "badge-success",
    cancelled: "badge-danger",
};

export default function OrderTable({ orders }: OrderTableProps) {
    return (
        <div className="glass-card overflow-hidden">
            <div style={{ overflowX: "auto" }}>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td style={{ fontWeight: 600, color: "var(--text-primary)" }}>{order.id}</td>
                                <td>
                                    <div>
                                        <div style={{ fontWeight: 500 }}>{order.customerName}</div>
                                        <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{order.customerEmail}</div>
                                    </div>
                                </td>
                                <td>{order.date}</td>
                                <td style={{ fontWeight: 600, color: "var(--text-primary)" }}>₹{order.total.toLocaleString("en-IN")}</td>
                                <td><span className={`badge ${statusColors[order.status]}`}>{order.status}</span></td>
                                <td>{order.paymentMethod}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
