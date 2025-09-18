import HopitalLayout from '@/layouts/hopital-layout';
import { Head } from '@inertiajs/react';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface StatisticProps {
    overview: {
        totalDeclarations: number;
        averagePerDay: number;
        averagePerAgent: number;
        completionRate: number;
        qualityScore: number;
    };
    genderDistribution: {
        distribution: { label: string; code: number; count: number; percentage: number }[];
        total: number;
        sexRatio: number;
        diversityIndex: number;
    };
    agentPerformance: {
        agents: {
            name: string;
            totalDeclarations: number;
            percentage: number;
            averagePerDay: number;
            lastActivity: string;
        }[];
        totalAgents: number;
    };
    timeTrends: {
        timeline: { period: string; declarations: number; averagePerAgent: number }[];
        trend: string;
    };
    periodComparison: {
        current: number;
        previous: number;
        change: number;
        trend: string;
    };
    forecasting: {
        nextWeekPrediction: number;
        confidence: number;
        trend: string;
    };
    metadata: {
        generatedAt: string;
        filters: Record<string, any>;
    };
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD', '#FF6384'];

export default function Statistic({
    overview,
    genderDistribution,
    agentPerformance,
    timeTrends,
    periodComparison,
    forecasting,
    metadata,
}: StatisticProps) {
    return (
        <HopitalLayout>
            <Head title="Statistiques - Hôpital" />

            <div className="space-y-8 p-6">
                <h1 className="mb-4 text-2xl font-bold">Tableau de bord statistique</h1>

                {/* Aperçu général */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                    <Card title="Total déclarations" value={overview.totalDeclarations} />
                    <Card title="Moyenne/jour" value={overview.averagePerDay} />
                    <Card title="Moyenne/agent" value={overview.averagePerAgent} />
                    <Card title="Taux complétion" value={`${overview.completionRate}%`} />
                    <Card title="Qualité" value={overview.qualityScore} />
                </div>

                {/* Répartition par sexe */}
                <div className="rounded bg-white p-4 shadow">
                    <h2 className="mb-2 text-lg font-semibold">Répartition par sexe</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={genderDistribution.distribution.length ? genderDistribution.distribution : [{ label: 'Inconnu', count: 1 }]}
                                dataKey="count"
                                nameKey="label"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                            >
                                {genderDistribution.distribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>

                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Performance des agents */}
                <div className="rounded bg-white p-4 shadow">
                    <h2 className="mb-2 text-lg font-semibold">Performance des agents</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={agentPerformance.agents}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="totalDeclarations" fill="#8884d8" name="Déclarations" />
                            <Bar dataKey="averagePerDay" fill="#82ca9d" name="Moy./jour" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Tendances temporelles */}
                <div className="rounded bg-white p-4 shadow">
                    <h2 className="mb-2 text-lg font-semibold">Tendances temporelles</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={timeTrends.timeline}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="period" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="declarations" stroke="#8884d8" name="Déclarations" />
                            <Line type="monotone" dataKey="averagePerAgent" stroke="#82ca9d" name="Moy./agent" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Comparaison et prévisions */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Card
                        title="Comparaison période"
                        value={`${periodComparison.current} vs ${periodComparison.previous}`}
                        sub={`Évolution: ${periodComparison.change}% (${periodComparison.trend})`}
                    />
                    <Card
                        title="Prévisions semaine prochaine"
                        value={forecasting.nextWeekPrediction}
                        sub={`Confiance: ${forecasting.confidence}% (${forecasting.trend})`}
                    />
                </div>

                {/* Métadonnées */}
                <div className="mt-6 text-sm text-gray-500">
                    <p>Généré le : {new Date(metadata.generatedAt).toLocaleString()}</p>
                    <p>Filtres appliqués : {JSON.stringify(metadata.filters)}</p>
                </div>
            </div>
        </HopitalLayout>
    );
}

function Card({ title, value, sub }: { title: string; value: any; sub?: string }) {
    return (
        <div className="rounded bg-white p-4 text-center shadow">
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <p className="text-xl font-bold">{value}</p>
            {sub && <p className="text-xs text-gray-400">{sub}</p>}
        </div>
    );
}
