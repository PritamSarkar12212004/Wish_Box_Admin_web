import { useState } from "react";
import { mockCollections } from "../data";
import type { Collection } from "../types";
import { HiOutlinePlus, HiOutlinePencil } from "react-icons/hi"; // 👈 added pencil icon

// Components
import CollectionFilters from "../components/features/collections/CollectionFilters";
import CollectionCard from "../components/features/collections/CollectionCard";
import CollectionModal from "../components/features/collections/CollectionModal";

// Styles
import "./CollectionsPage.css";
import Cloudanery from "../services/cloudanery/Cloudanery";

export default function CollectionsPage() {
  const [collections, setCollections] = useState(mockCollections);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Collection | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');

  const [imgUploadProgress, setImgUploadProgress] = useState(0)

  const categories = Array.from(new Set(collections.map(c => c.category)));

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
      description: "",
    });
    setModalOpen(true);
  };

  const handleSave = async() => {
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
    console.log(data)
   const  imgData= await Cloudanery({
      count: "single",
      file: data.img,
      onProgress: (p) => setImgUploadProgress(p)
    })
    console.log(imgUploadProgress)
    console.log(imgData)

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
      <div className="page-header mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Collections
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Group your products into curated collections
            </p>
          </div>

          {/* Right: Create Button */}
          <button
            onClick={openAddModal}
            style={{
              padding: 10
            }}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 
                 bg-gradient-to-r from-indigo-600 to-blue-500 
                 hover:from-indigo-700 hover:to-blue-600 
                 text-white font-medium text-sm rounded-full 
                 shadow-lg shadow-indigo-200/50 
                 hover:shadow-xl hover:shadow-indigo-300/50 
                 transition-all duration-200 ease-out 
                 hover:scale-[1.02] active:scale-[0.98]"
          >
            <HiOutlinePlus className="w-5 h-5" />
            Create Collection
          </button>
        </div>
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
                      {/* ✅ Fixed: now uses pencil icon instead of plus */}
                      <button onClick={() => openEditModal(c)} className="btn-ghost" style={{ padding: "6px" }}>
                        <HiOutlinePencil />
                      </button>
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