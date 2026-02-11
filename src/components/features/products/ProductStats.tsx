import { HiOutlineCube, HiOutlineCheckCircle, HiOutlineExclamationCircle, HiOutlineTrendingUp } from "react-icons/hi";
import StatCard from "../../ui/StatCard";

interface ProductStatsProps {
    stats: {
        total: number;
        active: number;
        lowStock: number;
        totalSales: number;
    };
}

export default function ProductStats({ stats }: ProductStatsProps) {
    return (
        <div className="stats-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
            marginBottom: "32px"
        }}>
            <StatCard
                label="Total Products"
                value={stats.total}
                icon={HiOutlineCube}
                variant="products"
                change="+12%"
            />
            <StatCard
                label="Active Products"
                value={stats.active}
                icon={HiOutlineCheckCircle}
                variant="revenue"
                change="+8%"
            />
            <StatCard
                label="Low Stock"
                value={stats.lowStock}
                icon={HiOutlineExclamationCircle}
                variant="orders"
                change="+3%"
            />
            <StatCard
                label="Total Sales"
                value={stats.totalSales}
                icon={HiOutlineTrendingUp}
                variant="customers"
                change="+24%"
            />
        </div>
    );
}
