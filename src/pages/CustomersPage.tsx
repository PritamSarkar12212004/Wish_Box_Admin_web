import { useEffect, useState } from "react";
import CustomerTable from "../components/features/customers/CustomerTable";
import { HiOutlineSearch } from "react-icons/hi";
import ApiCustomarData from "../services/api/admin/customer/ApiCustomarData";
import { useDispatch, useSelector } from "react-redux";
import { toggel } from "../store/slice/loader/LoaderSlice";

export default function CustomersPage() {
    const [search, setSearch] = useState("");
    const data = {
        customerData: useSelector((state: any) => state.CustomerSlice.customers),
        customerSummaryData: useSelector((state: any) => state.CustomerSlice.summary)
    }
    const filtered = data?.customerData
        ? data.customerData.filter((c: any) => {
            const nameMatch = c.name?.toLowerCase().includes(search.toLowerCase());
            const emailMatch = c.email
                ? c.email.toLowerCase().includes(search.toLowerCase())
                : false;

            return nameMatch || emailMatch;
        })
        : [];

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(toggel());
        ApiCustomarData({
            dispatch
        })
    }, [])
    return (
        <div className="customers-page">
            <div className="page-header" style={{ marginBottom: "32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <h1 className="page-title">Customers</h1>
                    <p className="page-subtitle">View and manage your customer base</p>
                </div>
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
            {
                data?.customerData ? <CustomerTable customers={filtered} /> : null
            }
        </div>
    );
}
