import { NavLink, useLocation } from "react-router-dom";
import {
    HiOutlineHome,
    HiOutlineShoppingBag,
    HiOutlineClipboardList,
    HiOutlineColorSwatch,
    HiOutlineUsers,
    HiOutlineChartBar,
    HiOutlineChevronLeft,
    HiOutlineChevronRight,
} from "react-icons/hi";

interface SidebarProps {
    collapsed: boolean;
    onToggle: () => void;
    mobileOpen: boolean;
    onMobileClose: () => void;
}

const navItems = [
    { path: "/", icon: HiOutlineHome, label: "Dashboard" },
    { path: "/products", icon: HiOutlineShoppingBag, label: "Products" },
    { path: "/orders", icon: HiOutlineClipboardList, label: "Orders" },
    { path: "/collections", icon: HiOutlineColorSwatch, label: "Collections" },
    { path: "/customers", icon: HiOutlineUsers, label: "Customers" },
    { path: "/analytics", icon: HiOutlineChartBar, label: "Analytics" },
];

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
    const location = useLocation();

    return (
        <>
            {/* Mobile overlay */}
            {mobileOpen && (
                <div className="mobile-overlay" onClick={onMobileClose} />
            )}

            <aside className={`sidebar ${collapsed ? "collapsed" : ""} ${mobileOpen ? "mobile-open" : ""}`}>
                {/* Logo */}
                <div
                    style={{
                        padding: collapsed ? "20px 12px" : "20px 20px",
                        borderBottom: "1px solid var(--border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: collapsed ? "center" : "space-between",
                        minHeight: "64px",
                    }}
                >
                    {!collapsed && (
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <div
                                style={{
                                    width: "32px",
                                    height: "32px",
                                    borderRadius: "8px",
                                    background: "var(--accent)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: 800,
                                    fontSize: "14px",
                                    color: "#fff",
                                }}
                            >
                                W
                            </div>
                            <span style={{ fontWeight: 700, fontSize: "16px", color: "var(--text-primary)" }}>
                                WishBox
                            </span>
                            <span
                                style={{
                                    fontSize: "10px",
                                    padding: "2px 6px",
                                    borderRadius: "4px",
                                    background: "var(--accent-light)",
                                    color: "var(--accent)",
                                    fontWeight: 600,
                                }}
                            >
                                ADMIN
                            </span>
                        </div>
                    )}
                    {collapsed && (
                        <div
                            style={{
                                width: "36px",
                                height: "36px",
                                borderRadius: "8px",
                                background: "var(--accent)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: 800,
                                fontSize: "16px",
                                color: "#fff",
                            }}
                        >
                            W
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <nav style={{ flex: 1, padding: "12px 0", overflowY: "auto" }}>
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={onMobileClose}
                                className={`sidebar-nav-item ${isActive ? "active" : ""}`}
                                style={{
                                    justifyContent: collapsed ? "center" : "flex-start",
                                    padding: collapsed ? "12px" : "10px 16px",
                                }}
                            >
                                <span className="icon">
                                    <item.icon size={20} />
                                </span>
                                {!collapsed && <span>{item.label}</span>}
                            </NavLink>
                        );
                    })}
                </nav>

                {/* Collapse toggle — desktop only */}
                <div
                    style={{
                        padding: "12px",
                        borderTop: "1px solid var(--border)",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <button
                        onClick={onToggle}
                        className="btn-ghost"
                        style={{
                            width: collapsed ? "40px" : "100%",
                            justifyContent: "center",
                            padding: "8px",
                            border: "none",
                        }}
                    >
                        {collapsed ? <HiOutlineChevronRight size={18} /> : <HiOutlineChevronLeft size={18} />}
                        {!collapsed && <span style={{ fontSize: "13px" }}>Collapse</span>}
                    </button>
                </div>
            </aside>
        </>
    );
}
