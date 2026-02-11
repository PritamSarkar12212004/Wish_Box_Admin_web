import Modal from "../../ui/Modal";
import ImageUpload from "../../ui/ImageUpload";
import { useState } from "react";

interface CollectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    editing: any;
    form: any;
    setForm: (form: any) => void;
    onSave: () => void;
}

const colorPalettes = [
    { bgColor: "#FFE8F0", accentColor: "#FF6B9D" }, // Pink
    { bgColor: "#F0F7FF", accentColor: "#4A90E2" }, // Blue
    { bgColor: "#F0FFF4", accentColor: "#48BB78" }, // Green
    { bgColor: "#FFF7E6", accentColor: "#ED8936" }, // Orange
    { bgColor: "#E6F7FF", accentColor: "#4299E1" }, // Light Blue
    { bgColor: "#F9F0FF", accentColor: "#9F7AEA" }, // Purple
    { bgColor: "#FFF0F3", accentColor: "#FC8181" }, // Coral
    { bgColor: "#F0FFF8", accentColor: "#38B2AC" }, // Teal
    { bgColor: "#FFF5F7", accentColor: "#F56565" }, // Red
    { bgColor: "#EBF8FF", accentColor: "#3182CE" }, // Dark Blue
    { bgColor: "#F0FFF4", accentColor: "#38A169" }, // Dark Green
    { bgColor: "#FFFAF0", accentColor: "#D69E2E" }, // Gold
];

export default function CollectionModal({
    isOpen,
    onClose,
    editing,
    form,
    setForm,
    onSave
}: CollectionModalProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={editing ? "Edit Collection" : "Create New Collection"}>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "20px" }}>
                <ImageUpload
                    label="Collection Banner Image"
                    value={form.img}
                    onChange={(val) => setForm({ ...form, img: val })}
                />

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label className="label">Collection Title</label>
                    <input name="title" value={form.title} onChange={handleChange} className="input" placeholder="e.g. Festival Specials" />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label className="label">Subtitle / Hook</label>
                    <input name="subtitle" value={form.subtitle} onChange={handleChange} className="input" placeholder="e.g. Premium Handmade Decor" />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label className="label">Category</label>
                    <input name="category" value={form.category} onChange={handleChange} className="input" placeholder="e.g. Party" />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label className="label">Description (Optional)</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="input"
                        style={{ minHeight: "80px", resize: "vertical" }}
                        placeholder="Tell us more about this collection..."
                    />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <label className="label">Theme Colors</label>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "8px" }}>
                        {colorPalettes.map((p, idx) => (
                            <button
                                key={idx}
                                onClick={() => setForm({ ...form, bgColor: p.bgColor, accentColor: p.accentColor })}
                                style={{
                                    height: "32px",
                                    borderRadius: "6px",
                                    backgroundColor: p.bgColor,
                                    border: form.bgColor === p.bgColor ? `2px solid ${p.accentColor}` : "1px solid #e2e8f0",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: p.accentColor }} />
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ marginTop: "12px", display: "flex", gap: "12px" }}>
                    <button onClick={onSave} className="btn-primary" style={{ flex: 1, backgroundColor: form.accentColor, color: "white" }}>
                        {editing ? "Update Collection" : "Create Collection"}
                    </button>
                    <button onClick={onClose} className="btn-ghost">Cancel</button>
                </div>
            </div>
        </Modal>
    );
}
