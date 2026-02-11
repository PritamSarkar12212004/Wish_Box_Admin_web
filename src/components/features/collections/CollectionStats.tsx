import { HiOutlineCollection, HiOutlineCheckCircle, HiOutlineEyeOff, HiOutlineTrendingUp } from "react-icons/hi";
import StatCard from "../../ui/StatCard";

interface CollectionStatsProps {
    stats: {
        total: number;
        active: number;
        hidden: number;
        totalProducts: number;
    };
}

export default function CollectionStats({ stats }: CollectionStatsProps) {
    return (
        <div className="stats-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
            marginBottom: "32px"
        }}>
            <StatCard
                label="Total Collections"
                value={stats.total}
                icon={HiOutlineCollection}
                variant="products"
                change="+2"
            />
            <StatCard
                label="Active Collections"
                value={stats.active}
                icon={HiOutlineCheckCircle}
                variant="revenue"
                change="+1"
            />
            <StatCard
                label="Hidden Collections"
                value={stats.hidden}
                icon={HiOutlineEyeOff}
                variant="orders"
                change="0"
            />
            <StatCard
                label="Products Linked"
                value={stats.totalProducts}
                icon={HiOutlineTrendingUp}
                variant="customers"
                change="+15"
            />
        </div>
    );
}
