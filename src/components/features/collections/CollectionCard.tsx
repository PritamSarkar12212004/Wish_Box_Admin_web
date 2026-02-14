import { HiOutlineEye, HiOutlineEyeOff, HiOutlinePencil, HiOutlineTrash, HiOutlineCube, HiOutlineCollection } from "react-icons/hi";
import type { Collection } from "../../../types";

interface CollectionCardProps {
  collection: Collection;
  onEdit: (collection: Collection) => void;
  onToggleStatus: (id: number) => void;
  onDeleteRequest: (id: number) => void;
  deleteConfirm: number | null;
  onConfirmDelete: (id: number) => void;
  onCancelDelete: () => void;
}

export default function CollectionCard({
  collection,
  onEdit,
  onToggleStatus,
  onDeleteRequest,
  deleteConfirm,
  onConfirmDelete,
  onCancelDelete
}: CollectionCardProps) {
  return (
    <div
      className="collection-card"
      style={{
        backgroundColor: collection.bgColor,
        borderRadius: "16px",
        overflow: "hidden",
        border: `1px solid ${collection.accentColor}30`,
        transition: "transform 300ms ease, box-shadow 300ms ease"
      }}
    >
      <div style={{ position: "relative", height: "160px" }}>
        <img
          src={collection.img}
          alt={collection.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", top: "12px", right: "12px", display: "flex", gap: "8px" }}>
          <button
            onClick={() => onToggleStatus(collection.id)}
            style={{
              width: "32px", height: "32px", borderRadius: "50%", border: "none",
              backgroundColor: "white", color: collection.accentColor,
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}
          >
            {collection.status === 'active' ? <HiOutlineEye /> : <HiOutlineEyeOff />}
          </button>
          <button
            onClick={() => onEdit(collection)}
            style={{
              width: "32px", height: "32px", borderRadius: "50%", border: "none",
              backgroundColor: "white", color: "#3b82f6",
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}
          >
            <HiOutlinePencil />
          </button>
        </div>
      </div>

      <div style={{ padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#1e293b", margin: 0 }}>{collection.title}</h3>
          <span style={{
            fontSize: "12px", fontWeight: 600, padding: "2px 8px", borderRadius: "999px",
            backgroundColor: collection.status === 'active' ? "#10b98120" : "#f59e0b20",
            color: collection.status === 'active' ? "#10b981" : "#f59e0b"
          }}>
            {collection.status}
          </span>
        </div>
        <p style={{ fontSize: "14px", color: "#64748b", margin: "0 0 16px 0" }}>{collection.subtitle}</p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "12px", fontSize: "13px", color: "#475569" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <HiOutlineCube style={{ color: collection.accentColor }} />
              <span>{collection.productsCount} Products</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <HiOutlineCollection style={{ color: collection.accentColor }} />
              <span>{collection.category}</span>
            </div>
          </div>

          {deleteConfirm === collection.id ? (
            <div style={{ display: "flex", gap: "4px" }}>
              <button onClick={() => onConfirmDelete(collection.id)} style={{ padding: "4px 8px", backgroundColor: "#ef4444", color: "white", border: "none", borderRadius: "4px", fontSize: "10px", cursor: "pointer" }}>Delete</button>
              <button onClick={onCancelDelete} style={{ padding: "4px 8px", backgroundColor: "#e2e8f0", color: "#64748b", border: "none", borderRadius: "4px", fontSize: "10px", cursor: "pointer" }}>No</button>
            </div>
          ) : (
            <button
              onClick={() => onDeleteRequest(collection.id)}
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