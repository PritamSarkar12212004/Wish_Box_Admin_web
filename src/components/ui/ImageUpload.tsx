import { useState, useEffect } from "react";
import { HiOutlineCloudUpload, HiOutlinePhotograph, HiOutlineX } from "react-icons/hi";

interface ImageUploadProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    secondary?: boolean;
}

export default function ImageUpload({ label, value, onChange, secondary = false }: ImageUploadProps) {
    const [dragging, setDragging] = useState(false);
    const [preview, setPreview] = useState(value || null);

    useEffect(() => {
        setPreview(value);
    }, [value]);

    const handleFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target?.result as string;
            onChange(result);
            setPreview(result);
        };
        reader.readAsDataURL(file);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        if (e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const uploadAreaStyle: React.CSSProperties = {
        height: "150px",
        border: dragging ? "2px solid #3b82f6" : preview ? "2px solid #e2e8f0" : "2px dashed #e2e8f0",
        borderRadius: "12px",
        backgroundColor: dragging ? "#eff6ff" : preview ? "#ffffff" : "#f8fafc",
        cursor: "pointer",
        transition: "all 300ms ease",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <label style={{ fontSize: "14px", fontWeight: 600, color: "#334155", display: "flex", alignItems: "center", gap: "4px" }}>
                    <HiOutlinePhotograph style={{ width: "16px", height: "16px" }} />
                    {label}
                </label>
                <span style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    padding: "2px 8px",
                    borderRadius: "999px",
                    backgroundColor: secondary ? "rgba(245, 158, 11, 0.1)" : "rgba(16, 185, 129, 0.1)",
                    color: secondary ? "#f59e0b" : "#10b981"
                }}>
                    {secondary ? 'Optional' : 'Required'}
                </span>
            </div>

            <div
                style={uploadAreaStyle}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById(`file-${label}`)?.click()}
            >
                <input
                    id={`file-${label}`}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFile(file);
                    }}
                />

                {preview ? (
                    <>
                        <img
                            src={preview}
                            alt="Preview"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                transition: "transform 300ms ease"
                            }}
                        />
                        <div style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
                            opacity: 0,
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent: "center",
                            padding: "16px",
                            transition: "opacity 300ms ease"
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "white", fontSize: "14px" }}>
                                <div style={{ backgroundColor: "white", padding: "8px", borderRadius: "50%", color: "#334155" }}>
                                    <HiOutlineCloudUpload style={{ width: "16px", height: "16px" }} />
                                </div>
                                <span>Change image</span>
                            </div>
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onChange("");
                                setPreview(null);
                            }}
                            style={{
                                position: "absolute",
                                top: "8px",
                                right: "8px",
                                width: "32px",
                                height: "32px",
                                borderRadius: "50%",
                                backgroundColor: "white",
                                border: "none",
                                color: "#ef4444",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                                zIndex: 10
                            }}
                        >
                            <HiOutlineX style={{ width: "16px", height: "16px" }} />
                        </button>
                    </>
                ) : (
                    <div style={{ textAlign: "center", padding: "20px" }}>
                        <div style={{
                            width: "56px",
                            height: "56px",
                            borderRadius: "50%",
                            backgroundColor: "#e2e8f0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 16px",
                            color: "#3b82f6"
                        }}>
                            <HiOutlineCloudUpload style={{ width: "24px", height: "24px" }} />
                        </div>
                        <p style={{ fontSize: "14px", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                            Drop or click to upload
                        </p>
                        <p style={{ fontSize: "12px", color: "#64748b" }}>
                            PNG, JPG, WEBP up to 5MB
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
