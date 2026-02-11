import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

const pageTitles: Record<string, string> = {
    "/": "Dashboard",
    "/products": "Products",
    "/orders": "Orders",
    "/collections": "Collections",
    "/customers": "Customers",
    "/analytics": "Analytics",
    "/settings": "Settings",
};

export default function AdminLayout() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const pageTitle = pageTitles[location.pathname] || "WishBox Admin";

    return (
        <div style={{ minHeight: "100vh" }}>
            <Sidebar
                collapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                mobileOpen={mobileOpen}
                onMobileClose={() => setMobileOpen(false)}
            />

            <div className={`main-content ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
                <TopBar
                    onMenuClick={() => setMobileOpen(!mobileOpen)}
                    pageTitle={pageTitle}
                />
                <main style={{ padding: "24px" }}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
