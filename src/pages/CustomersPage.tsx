import { useState } from "react";
import { mockCustomers } from "../data";
import CustomerTable from "../components/features/customers/CustomerTable";
import { HiOutlineSearch, HiOutlineUserAdd } from "react-icons/hi";

export default function CustomersPage() {
    const [customers] = useState(mockCustomers);
    const [search, setSearch] = useState("");

    const filtered = customers.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="customers-page">
            <div className="page-header" style={{ marginBottom: "32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <h1 className="page-title">Customers</h1>
                    <p className="page-subtitle">View and manage your customer base</p>
                </div>
                <button className="btn-primary">
                    <HiOutlineUserAdd />
                    Add Customer
                </button>
            </div>

            <div style={{ marginBottom: "24px", position: "relative", maxWidth: "480px" }}>
                <HiOutlineSearch style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                <input
                    type="text"
                    placeholder="Search customers by name or email..."
                    className="input"
                    style={{ paddingLeft: "44px" }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <CustomerTable customers={filtered} />
        </div>
    );
}
