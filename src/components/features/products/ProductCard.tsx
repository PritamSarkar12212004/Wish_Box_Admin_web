import { HiOutlineEye, HiOutlineEyeOff, HiOutlinePencil, HiOutlineCube, HiOutlineTrendingUp, HiOutlineTag, HiOutlineTrash } from "react-icons/hi";
import type { Product } from "../../../types";

interface ProductCardProps {
    product: Product;
    onEdit: (product: Product) => void;
    onToggleStatus: (id: number) => void;
    onDeleteRequest: (id: number) => void;
    deleteConfirm: number | null;
    onConfirmDelete: (id: number) => void;
    onCancelDelete: () => void;
}

export default function ProductCard({
    product,
    onEdit,
    onToggleStatus,
    onDeleteRequest,
    deleteConfirm,
    onConfirmDelete,
    onCancelDelete
}: ProductCardProps) {
    const discount = Math.round((1 - product.price / product.originalPrice) * 100);

    return (
        <div className="product-card" style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            transition: "transform 300ms ease, box-shadow 300ms ease"
        }}>
            <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                <img
                    src={product.img}
                    alt={product.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div style={{ position: "absolute", top: "12px", right: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
                    <button
                        onClick={() => onToggleStatus(product.id)}
                        style={{
                            width: "32px", height: "32px", borderRadius: "50%", border: "none",
                            backdropFilter: "blur(8px)",
                            backgroundColor: product.status === 'active' ? "rgba(16, 185, 129, 0.2)" : "rgba(245, 158, 11, 0.2)",
                            color: product.status === 'active' ? "#10b981" : "#f59e0b",
                            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"
                        }}
                    >
                        {product.status === 'active' ? <HiOutlineEye /> : <HiOutlineEyeOff />}
                    </button>
                    <button
                        onClick={() => onEdit(product)}
                        style={{
                            width: "32px", height: "32px", borderRadius: "50%", border: "none",
                            backdropFilter: "blur(8px)", backgroundColor: "rgba(59, 130, 246, 0.2)",
                            color: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"
                        }}
                    >
                        <HiOutlinePencil />
                    </button>
                </div>
                {product.stock <= 10 && (
                    <div style={{
                        position: "absolute", top: "12px", left: "12px", padding: "4px 12px",
                        backgroundColor: "#ef4444", color: "white", fontSize: "12px", fontWeight: 700, borderRadius: "999px"
                    }}>
                        Low Stock
                    </div>
                )}
            </div>

            <div style={{ padding: "20px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px" }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1e293b", margin: "0 0 4px 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {product.title}
                        </h3>
                        <p style={{ fontSize: "14px", color: "#64748b", margin: 0, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                            {product.subtitle}
                        </p>
                    </div>
                    <span style={{
                        padding: "4px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: 600,
                        backgroundColor: product.status === 'active' ? "rgba(16, 185, 129, 0.1)" : "rgba(245, 158, 11, 0.1)",
                        color: product.status === 'active' ? "#10b981" : "#f59e0b",
                        marginLeft: "8px"
                    }}>
                        {product.status}
                    </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <span style={{ fontSize: "20px", fontWeight: 700, color: "#1e293b" }}>₹{product.price.toLocaleString('en-IN')}</span>
                            <span style={{ fontSize: "14px", color: "#94a3b8", textDecoration: "line-through" }}>₹{product.originalPrice.toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <HiOutlineCube style={{ color: "#94a3b8" }} />
                        <span style={{ fontSize: "14px", fontWeight: 500, color: product.stock > 10 ? "#10b981" : "#ef4444" }}>{product.stock} in stock</span>
                    </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", gap: "12px", fontSize: "12px", color: "#64748b" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            <HiOutlineTrendingUp />
                            <span>{product.sales} sold</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            <HiOutlineTag />
                            <span>{product.category}</span>
                        </div>
                    </div>

                    {deleteConfirm === product.id ? (
                        <div style={{ display: "flex", gap: "4px" }}>
                            <button onClick={() => onConfirmDelete(product.id)} style={{ padding: "4px 8px", backgroundColor: "#ef4444", color: "white", border: "none", borderRadius: "4px", fontSize: "10px", cursor: "pointer" }}>Delete</button>
                            <button onClick={onCancelDelete} style={{ padding: "4px 8px", backgroundColor: "#e2e8f0", color: "#64748b", border: "none", borderRadius: "4px", fontSize: "10px", cursor: "pointer" }}>No</button>
                        </div>
                    ) : (
                        <button
                            onClick={() => onDeleteRequest(product.id)}
                            style={{
                                width: "32px", height: "32px", borderRadius: "50%", border: "none", backgroundColor: "rgba(239, 68, 68, 0.1)", color: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"
                            }}
                        >
                            <HiOutlineTrash />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
