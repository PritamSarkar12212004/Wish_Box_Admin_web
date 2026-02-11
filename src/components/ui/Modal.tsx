import type { ReactNode } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    fullScreen?: boolean;
}

export default function Modal({ isOpen, onClose, title, children, fullScreen = false }: ModalProps) {
    if (!isOpen) return null;

    const modalStyles: React.CSSProperties = fullScreen ? {
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        maxWidth: "none",
        maxHeight: "none",
        borderRadius: 0,
        display: "flex",
        flexDirection: "column",
        background: "var(--bg-secondary)",
        zIndex: 101,
    } : {};

    return (
        <div className="modal-overlay" style={fullScreen ? { padding: 0 } : {}} onClick={onClose}>
            <div
                className={`modal-content ${!fullScreen ? "animate-fade-in-up" : ""}`}
                style={modalStyles}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div
                    style={{
                        padding: fullScreen ? "16px 24px" : "20px 24px",
                        borderBottom: "1px solid var(--border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        background: fullScreen ? "var(--bg-secondary)" : "transparent",
                        position: fullScreen ? "sticky" : "relative",
                        top: 0,
                        zIndex: 10,
                    }}
                >
                    <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--text-primary)" }}>{title}</h2>
                    <button
                        onClick={onClose}
                        style={{
                            background: "var(--bg-input)",
                            border: "none",
                            color: "var(--text-muted)",
                            cursor: "pointer",
                            fontSize: "18px",
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.2s",
                        }}
                        onMouseOver={(e) => e.currentTarget.style.color = "var(--danger)"}
                        onMouseOut={(e) => e.currentTarget.style.color = "var(--text-muted)"}
                    >
                        ✕
                    </button>
                </div>
                {/* Body */}
                <div style={{
                    padding: fullScreen ? "32px" : "24px",
                    overflowY: "auto",
                    flex: 1,
                    maxWidth: fullScreen ? "1000px" : "none",
                    margin: fullScreen ? "0 auto" : "0",
                    width: "100%",
                }}>
                    {children}
                </div>
            </div>
        </div>
    );
}
