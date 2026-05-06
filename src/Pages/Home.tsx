import { PieChart } from "../Component/PieChart";
import { useSubscriptions } from "../hooks/useSubscriptions";

export function Home() {
    const { data, loading, error } = useSubscriptions();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const contracts = data?.subscriptions ?? [];

    const active = contracts.filter(c => c.status === "ACTIVE").length;
    const paused = contracts.filter(c => c.status === "PAUSED").length;
    const cancelled = contracts.filter(c => c.status === "CANCELLED").length;

    const stats = [
        { label: "Total", value: contracts.length },
        { label: "Active", value: active },
        { label: "Paused", value: paused },
        { label: "Cancelled", value: cancelled },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
                    >
                        <p className="text-sm text-gray-500">{stat.label}</p>
                        <h2 className="text-2xl font-bold text-gray-800 mt-2">
                            {stat.value}
                        </h2>
                    </div>
                ))}
            </div>
            <div className="bg-white rounded-2xl shadow p-6 mt-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Subscription Overview
                </h2>

                <PieChart
                    active={active}
                    paused={paused}
                    cancelled={cancelled}
                />
            </div>
        </div>
    );
}