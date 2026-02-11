import { useState } from "react";
import { mockOrders } from "../data";
import OrderTable from "../components/features/orders/OrderTable";
import { HiOutlineSearch, HiOutlineFilter } from "react-icons/hi";

export default function OrdersPage() {
    const [orders, setOrders] = useState(mockOrders);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const filtered = orders.filter(o => {
        const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) ||
            o.customerName.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === "All" || o.status === statusFilter.toLowerCase();
        return matchSearch && matchStatus;
    });

    return (
        <div className="orders-page">
            <div className="page-header" style={{ marginBottom: "32px" }}>
                <h1 className="page-title">Orders Management</h1>
                <p className="page-subtitle">Track and manage customer orders</p>
            </div>

            <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
                <div style={{ flex: 1, position: "relative" }}>
                    <HiOutlineSearch style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                    <input
                        type="text"
                        placeholder="Search by Order ID or Customer Name..."
                        className="input"
                        style={{ paddingLeft: "44px" }}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div style={{ position: "relative" }}>
                    <HiOutlineFilter style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                    <select
                        className="input"
                        style={{ paddingLeft: "36px", width: "180px" }}
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option>All Status</option>
                        <option>Pending</option>
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                    </select>
                </div>
            </div>

            <OrderTable orders={filtered} />
        </div>
    );
}
