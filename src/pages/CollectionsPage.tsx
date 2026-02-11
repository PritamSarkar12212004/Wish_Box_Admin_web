import { useState } from "react";
import { mockCollections } from "../data";
import type { Collection } from "../types";
import { HiOutlinePlus } from "react-icons/hi";

// Components
import CollectionStats from "../components/features/collections/CollectionStats";
import CollectionFilters from "../components/features/collections/CollectionFilters";
import CollectionCard from "../components/features/collections/CollectionCard";
import CollectionModal from "../components/features/collections/CollectionModal";

// Styles
import "./CollectionsPage.css";

export default function CollectionsPage() {
  const [collections, setCollections] = useState(mockCollections);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Collection | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');

  const categories = Array.from(new Set(collections.map(c => c.category)));

  const stats = {
    total: collections.length,
    active: collections.filter(c => c.status === 'active').length,
    hidden: collections.filter(c => c.status === 'hidden').length,
    totalProducts: collections.reduce((acc, c) => acc + c.productsCount, 0)
  };

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    bgColor: "#FFE8F0",
    accentColor: "#FF6B9D",
    img: "",
    category: "",
    description: "",
  });

  const filtered = collections
    .filter(c => {
      const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.category.toLowerCase().includes(search.toLowerCase());
      const matchCategory = categoryFilter === "All" || c.category === categoryFilter;
      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'az': return a.title.localeCompare(b.title);
        case 'za': return b.title.localeCompare(a.title);
        case 'products': return b.productsCount - a.productsCount;
        default: return b.id - a.id;
      }
    });

  const openAddModal = () => {
    setEditing(null);
    setForm({
      title: "",
      subtitle: "",
      bgColor: "#FFE8F0",
      accentColor: "#FF6B9D",
      img: "",
      category: "",
      description: "",
    });
    setModalOpen(true);
  };

  const openEditModal = (c: Collection) => {
    setEditing(c);
    setForm({
      title: c.title,
      subtitle: c.subtitle,
      bgColor: c.bgColor,
      accentColor: c.accentColor,
      img: c.img,
      category: c.category,
      description: "", // Mock data doesn't have description in type yet
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    const data: Collection = {
      id: editing ? editing.id : Date.now(),
      title: form.title,
      subtitle: form.subtitle,
      bgColor: form.bgColor,
      accentColor: form.accentColor,
      img: form.img || "https://5.imimg.com/data5/IOS/Default/2025/9/541891653/JT/OP/BL/151524151/product-jpeg-500x500.jpeg",
      productsCount: editing ? editing.productsCount : 0,
      category: form.category,
      status: editing ? editing.status : "active",
    };

    if (editing) {
      setCollections(collections.map(c => c.id === editing.id ? data : c));
    } else {
      setCollections([data, ...collections]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: number) => {
    setCollections(collections.filter(c => c.id !== id));
    setDeleteConfirm(null);
  };

  const toggleStatus = (id: number) => {
    setCollections(collections.map(c =>
      c.id === id ? { ...c, status: c.status === 'active' ? 'hidden' : 'active' } : c
    ));
  };

  return (
    <div className="collections-page">
      <div className="page-header">
        <div className="header-content">
          <div>
            <h1 className="page-title">Collections</h1>
            <p className="page-subtitle">Group your products into curated collections</p>
          </div>
          <button onClick={openAddModal} className="btn-add-product">
            <HiOutlinePlus style={{ width: "20px", height: "20px", marginRight: "8px" }} />
            Create Collection
          </button>
        </div>

        <CollectionStats stats={stats} />
      </div>

      <CollectionFilters
        search={search} onSearchChange={setSearch}
        categoryFilter={categoryFilter} onCategoryFilterChange={setCategoryFilter}
        categories={categories}
        sortBy={sortBy} onSortChange={setSortBy}
        viewMode={viewMode} onViewModeChange={setViewMode}
      />

      <div className={viewMode === 'grid' ? "collections-grid" : "collections-list"}>
        {viewMode === 'grid' ? (
          filtered.map(c => (
            <CollectionCard
              key={c.id}
              collection={c}
              onEdit={openEditModal}
              onToggleStatus={toggleStatus}
              onDeleteRequest={setDeleteConfirm}
              deleteConfirm={deleteConfirm}
              onConfirmDelete={handleDelete}
              onCancelDelete={() => setDeleteConfirm(null)}
            />
          ))
        ) : (
          <div className="glass-card overflow-hidden">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Collection</th>
                  <th>Category</th>
                  <th>Products</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(c => (
                  <tr key={c.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <img src={c.img} alt="" style={{ width: "40px", height: "40px", borderRadius: "8px", objectFit: "cover" }} />
                        <div>
                          <div style={{ fontWeight: 600 }}>{c.title}</div>
                          <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{c.subtitle}</div>
                        </div>
                      </div>
                    </td>
                    <td>{c.category}</td>
                    <td>{c.productsCount}</td>
                    <td><span className={`badge ${c.status === 'active' ? 'badge-success' : 'badge-warning'}`}>{c.status}</span></td>
                    <td>
                      <button onClick={() => openEditModal(c)} className="btn-ghost" style={{ padding: "6px" }}><HiOutlinePlus /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <CollectionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        editing={editing}
        form={form}
        setForm={setForm}
        onSave={handleSave}
      />
    </div>
  );
}