import { HiOutlineSearch, HiOutlineFilter, HiOutlineArrowUp } from "react-icons/hi";

interface ProductFiltersProps {
    search: string;
    onSearchChange: (value: string) => void;
    categoryFilter: string;
    onCategoryFilterChange: (value: string) => void;
    categories: string[];
    sortBy: string;
    onSortChange: (value: string) => void;
    viewMode: 'grid' | 'list';
    onViewModeChange: (mode: 'grid' | 'list') => void;
}

export default function ProductFilters({
    search,
    onSearchChange,
    categoryFilter,
    onCategoryFilterChange,
    categories,
    sortBy,
    onSortChange,
    viewMode,
    onViewModeChange
}: ProductFiltersProps) {
    return (
        <div style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "20px" }}>
                <div style={{ flex: 1 }}>
                    <div style={{ position: "relative" }}>
                        <HiOutlineSearch style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", width: "20px", height: "20px", color: "#94a3b8" }} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="input"
                            style={{ paddingLeft: "48px" }}
                        />
                    </div>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                    <div style={{ position: "relative" }}>
                        <HiOutlineFilter style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", width: "20px", height: "20px", color: "#94a3b8" }} />
                        <select
                            value={categoryFilter}
                            onChange={(e) => onCategoryFilterChange(e.target.value)}
                            className="input"
                            style={{ paddingLeft: "40px", width: "auto" }}
                        >
                            <option value="All">All Categories</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div style={{ position: "relative" }}>
                        <HiOutlineArrowUp style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", width: "20px", height: "20px", color: "#94a3b8" }} />
                        <select
                            value={sortBy}
                            onChange={(e) => onSortChange(e.target.value)}
                            className="input"
                            style={{ paddingLeft: "40px", width: "auto" }}
                        >
                            <option value="newest">Newest First</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="stock">Stock: High to Low</option>
                            <option value="sales">Top Selling</option>
                        </select>
                    </div>

                    <div style={{ display: "flex", backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", overflow: "hidden" }}>
                        <button
                            onClick={() => onViewModeChange('grid')}
                            style={{ padding: "12px 16px", border: "none", backgroundColor: viewMode === 'grid' ? "rgba(59, 130, 246, 0.1)" : "transparent", color: viewMode === 'grid' ? "#3b82f6" : "#64748b", cursor: "pointer" }}
                        >
                            Grid
                        </button>
                        <button
                            onClick={() => onViewModeChange('list')}
                            style={{ padding: "12px 16px", border: "none", backgroundColor: viewMode === 'list' ? "rgba(59, 130, 246, 0.1)" : "transparent", color: viewMode === 'list' ? "#3b82f6" : "#64748b", cursor: "pointer" }}
                        >
                            List
                        </button>
                    </div>
                </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {["All", ...categories.slice(0, 6)].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => onCategoryFilterChange(cat)}
                        style={{
                            padding: "8px 16px",
                            backgroundColor: categoryFilter === cat ? "#3b82f6" : "#ffffff",
                            border: "1px solid #e2e8f0",
                            borderRadius: "6px",
                            fontSize: "14px",
                            fontWeight: 500,
                            color: categoryFilter === cat ? "#ffffff" : "#64748b",
                            cursor: "pointer",
                            transition: "all 150ms ease"
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    );
}
