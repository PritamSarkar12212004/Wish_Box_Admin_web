import { useState } from "react";
import { mockProducts, productCategories, mockCollections } from "../data";
import type { Product } from "../types";
import { HiOutlinePlus } from "react-icons/hi";

// Components
import ProductStats from "../components/features/products/ProductStats";
import ProductFilters from "../components/features/products/ProductFilters";
import ProductCard from "../components/features/products/ProductCard";
import ProductModal from "../components/features/products/ProductModal";

// Styles
import "./ProductsPage.css";

export default function ProductsPage() {
  const [products, setProducts] = useState(mockProducts);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');

  // Stats
  const stats = {
    total: products.length,
    active: products.filter(p => p.status === 'active').length,
    lowStock: products.filter(p => p.stock <= 10).length,
    totalSales: products.reduce((acc, p) => acc + p.sales, 0)
  };

  // Form state
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    price: "",
    originalPrice: "",
    category: "",
    img: "",
    decorationImg: "",
    stock: "100",
    status: "active" as const,
    collectionId: "",
  });

  const filtered = products
    .filter((p) => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        (p.subtitle && p.subtitle.toLowerCase().includes(search.toLowerCase()));
      const matchCategory = categoryFilter === "All" || p.category === categoryFilter;
      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'stock': return b.stock - a.stock;
        case 'sales': return b.sales - a.sales;
        default: return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  const openAddModal = () => {
    setEditingProduct(null);
    setForm({
      title: "",
      subtitle: "",
      price: "",
      originalPrice: "",
      category: "",
      img: "",
      decorationImg: "",
      stock: "100",
      status: "active" as const,
      collectionId: "",
    });
    setModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setForm({
      title: p.title,
      subtitle: p.subtitle || "",
      price: p.price.toString(),
      originalPrice: p.originalPrice.toString(),
      category: p.category,
      img: p.img,
      decorationImg: p.decorationImg || "",
      stock: p.stock.toString(),
      status: p.status,
      collectionId: p.collectionId?.toString() || "",
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    const productData: Product = {
      id: editingProduct ? editingProduct.id : Date.now(),
      title: form.title,
      subtitle: form.subtitle,
      price: parseInt(form.price) || 0,
      originalPrice: parseInt(form.originalPrice) || 0,
      category: form.category,
      tags: [form.category.toLowerCase()],
      img: form.img || "https://5.imimg.com/data5/IOS/Default/2025/9/541891653/JT/OP/BL/151524151/product-jpeg-500x500.jpeg",
      decorationImg: form.decorationImg || undefined,
      collectionId: form.collectionId ? Number(form.collectionId) : undefined,
      status: form.status,
      stock: parseInt(form.stock) || 0,
      sales: editingProduct ? editingProduct.sales : 0,
      createdAt: editingProduct ? editingProduct.createdAt : new Date().toISOString().split("T")[0],
    };

    if (editingProduct) {
      setProducts(products.map((p) => (p.id === editingProduct.id ? productData : p)));
    } else {
      setProducts([productData, ...products]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
    setDeleteConfirm(null);
  };

  const toggleStatus = (id: number) => {
    setProducts(products.map((p) =>
      p.id === id ? { ...p, status: p.status === "active" ? "draft" : "active" } : p
    ));
  };

  return (
    <div className="products-page">
      <div className="page-header">
        <div className="header-content">
          <div>
            <h1 className="page-title">Products Management</h1>
            <p className="page-subtitle">Manage your inventory and product listings</p>
          </div>
          <button onClick={openAddModal} className="btn-add-product">
            <HiOutlinePlus style={{ width: "20px", height: "20px", marginRight: "8px" }} />
            Add New Product
          </button>
        </div>

        <ProductStats stats={stats} />
      </div>

      <ProductFilters
        search={search} onSearchChange={setSearch}
        categoryFilter={categoryFilter} onCategoryFilterChange={setCategoryFilter}
        categories={productCategories}
        sortBy={sortBy} onSortChange={setSortBy}
        viewMode={viewMode} onViewModeChange={setViewMode}
      />

      <div className={viewMode === 'grid' ? "products-grid" : "products-list"}>
        {viewMode === 'grid' ? (
          filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
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
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(product => (
                  <tr key={product.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <img src={product.img} alt="" style={{ width: "40px", height: "40px", borderRadius: "8px", objectFit: "cover" }} />
                        <div>
                          <div style={{ fontWeight: 600 }}>{product.title}</div>
                          <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{product.subtitle}</div>
                        </div>
                      </div>
                    </td>
                    <td>{product.category}</td>
                    <td>₹{product.price}</td>
                    <td>{product.stock}</td>
                    <td><span className={`badge ${product.status === 'active' ? 'badge-success' : 'badge-warning'}`}>{product.status}</span></td>
                    <td>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button onClick={() => openEditModal(product)} className="btn-ghost" style={{ padding: "6px" }}><HiOutlinePlus /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        editingProduct={editingProduct}
        form={form}
        setForm={setForm}
        onSave={handleSave}
        categories={productCategories}
        collections={mockCollections}
      />
    </div>
  );
}