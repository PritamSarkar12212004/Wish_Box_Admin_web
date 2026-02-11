import { HiOutlineMenu, HiOutlineBell, HiOutlineSearch } from "react-icons/hi";

interface TopBarProps {
    onMenuClick: () => void;
    pageTitle: string;
}

export default function TopBar({ onMenuClick, pageTitle }: TopBarProps) {
    return (
        <header className="topbar">
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                {/* Mobile menu toggle */}
                <button
                    onClick={onMenuClick}
                    className="btn-ghost"
                    style={{
                        display: "none",
                        padding: "8px",
                        border: "none",
                    }}
                    id="mobile-menu-btn"
                >
                    <HiOutlineMenu size={22} />
                </button>
                <style>{`@media(max-width:768px){#mobile-menu-btn{display:flex!important}}`}</style>

                <h1
                    style={{
                        fontSize: "18px",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                    }}
                >
                    {pageTitle}
                </h1>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                {/* Search */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        background: "var(--bg-input)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-sm)",
                        padding: "6px 12px",
                        maxWidth: "220px",
                    }}
                >
                    <HiOutlineSearch size={16} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
                    <input
                        type="text"
                        placeholder="Search..."
                        style={{
                            background: "transparent",
                            border: "none",
                            outline: "none",
                            color: "var(--text-primary)",
                            fontSize: "13px",
                            width: "100%",
                            fontFamily: "inherit",
                        }}
                    />
                </div>

                {/* Notifications */}
                <button
                    className="btn-ghost"
                    style={{ padding: "8px", border: "none", position: "relative" }}
                >
                    <HiOutlineBell size={20} />
                    <span
                        style={{
                            position: "absolute",
                            top: "4px",
                            right: "4px",
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background: "var(--accent)",
                        }}
                    />
                </button>

                {/* Admin avatar */}
                <div
                    style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "50%",
                        background: "var(--accent)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        fontSize: "13px",
                        color: "#fff",
                        cursor: "pointer",
                    }}
                >
                    PS
                </div>
            </div>
        </header>
    );
}
