import { useEffect, useState } from "react";
import OrderTable from "../components/features/orders/OrderTable";
import { HiOutlineSearch, HiOutlineFilter } from "react-icons/hi";
import ApiGetOrderDetilies from "../services/api/admin/order/ApiGetOrderDetilies";
import { useDispatch, useSelector } from "react-redux";
import { toggel } from "../store/slice/loader/LoaderSlice";
import { Order } from "../types";

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    console.log(orders)
    const filtered = orders.filter(o => {
        const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) ||
            o.customerName.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === "All" || o.status === statusFilter.toLowerCase();
        return matchSearch && matchStatus;
    });
    const dispatch = useDispatch()

    const data = {
        OrderDetiles: useSelector((state: any) => state.OrderSlice.ordersDetiles),
        OrderSummary: useSelector((state: any) => state.OrderSlice.Ordersummary)
    }
    console.log(data)
    useEffect(() => {
        dispatch(toggel())
        ApiGetOrderDetilies({
            dispatch: dispatch
        })
    }, [])
    useEffect(() => {
        if (data?.OrderDetiles?.length) {
            const formattedOrders = data.OrderDetiles.map((order: any) => ({
                id: order.orderId,
                customerName: order.shippingAddress?.fullName || "N/A",
                customerEmail: order.shippingAddress?.phone || "N/A",

                items: order.items.map((item: any, index: number) => ({
                    productId: index,
                    productTitle: item.title,
                    quantity: item.quantity,
                    price: item.price,
                    img: item.image?.url
                })),

                total: order.totalAmount,
                status: order.orderStatus,
                paymentMethod: order.payment?.paymentGateway,
                date: new Date(order.createdAt).toISOString().split("T")[0],

                address: `
                ${order.shippingAddress?.addressLine1},
                ${order.shippingAddress?.city},
                ${order.shippingAddress?.state},
                ${order.shippingAddress?.pincode}
            `
            }));
            setOrders(formattedOrders);
        }
    }, [data.OrderDetiles]);


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
