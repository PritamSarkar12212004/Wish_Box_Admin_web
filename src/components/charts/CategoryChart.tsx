import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function CategoryChart({ mainData }: {
    mainData: any
}) {
    return (
        <div className="glass-card" style={{ padding: "20px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "16px" }}>
                Category Distribution
            </h3>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                <div style={{ width: "180px", height: "180px", flexShrink: 0 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={mainData}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={80}
                                dataKey="value"
                                stroke="none"
                                paddingAngle={2}
                            >
                                {mainData.map((entry, index) => (
                                    <Cell key={index} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    background: "var(--bg-secondary)",
                                    border: "1px solid var(--border)",
                                    borderRadius: "var(--radius-sm)",
                                    fontSize: "13px",
                                    color: "var(--text-primary)",
                                    boxShadow: "var(--shadow-md)",
                                }}
                                formatter={(value: number) => [`${value}%`, "Share"]}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div style={{ flex: 1, minWidth: "150px" }}>
                    {mainData.map((item, i) => (
                        <div
                            key={i}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "6px 0",
                                fontSize: "13px",
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <span style={{ width: "8px", height: "8px", borderRadius: "2px", background: item.color }} />
                                <span style={{ color: "var(--text-secondary)" }}>{item.name}</span>
                            </div>
                            <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{item.value}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
