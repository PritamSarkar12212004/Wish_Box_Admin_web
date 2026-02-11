import Modal from "../../ui/Modal";
import ImageUpload from "../../ui/ImageUpload";
import { Collection } from "../../../types";

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    editingProduct: any;
    form: any;
    setForm: (form: any) => void;
    onSave: () => void;
    categories: string[];
    collections: Collection[];
}

export default function ProductModal({
    isOpen,
    onClose,
    editingProduct,
    form,
    setForm,
    onSave,
    categories,
    collections
}: ProductModalProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={editingProduct ? "Edit Product" : "Add New Product"}>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "20px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <ImageUpload
                        label="Main Product Image"
                        value={form.img}
                        onChange={(val) => setForm({ ...form, img: val })}
                    />
                    <ImageUpload
                        label="Decoration Image"
                        value={form.decorationImg}
                        onChange={(val) => setForm({ ...form, decorationImg: val })}
                        secondary
                    />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label className="label">Product Title</label>
                    <input name="title" value={form.title} onChange={handleChange} className="input" placeholder="e.g. Festival Garland" />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label className="label">Subtitle / Description</label>
                    <input name="subtitle" value={form.subtitle} onChange={handleChange} className="input" placeholder="Short description" />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <label className="label">Price (₹)</label>
                        <input name="price" type="number" value={form.price} onChange={handleChange} className="input" />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <label className="label">Original Price (₹)</label>
                        <input name="originalPrice" type="number" value={form.originalPrice} onChange={handleChange} className="input" />
                    </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <label className="label">Category</label>
                        <select name="category" value={form.category} onChange={handleChange} className="input">
                            <option value="">Select Category</option>
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <label className="label">Initial Stock</label>
                        <input name="stock" type="number" value={form.stock} onChange={handleChange} className="input" />
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label className="label">Collection (Optional)</label>
                    <select name="collectionId" value={form.collectionId} onChange={handleChange} className="input">
                        <option value="">No Collection</option>
                        {collections.map(col => <option key={col.id} value={col.id}>{col.title}</option>)}
                    </select>
                </div>

                <div style={{ marginTop: "12px", display: "flex", gap: "12px" }}>
                    <button onClick={onSave} className="btn-primary" style={{ flex: 1 }}>
                        {editingProduct ? "Update Product" : "Create Product"}
                    </button>
                    <button onClick={onClose} className="btn-ghost">Cancel</button>
                </div>
            </div>
        </Modal>
    );
}
