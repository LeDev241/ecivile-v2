import ChartCard from '@/components/ChartCard';
import StatCard from '@/components/StatCard';
import HopitalLayout from '@/layouts/hopital-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { FolderPlus, TrendingUp, UserCheck, Users } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface StatisticProps {
    totalDeclarations: number;
    bySex: Record<string, number>;
    byCreator: Record<string, number>;
}

const MODERN_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
                <p className="font-medium text-gray-900">{label}</p>
                <p className="font-semibold text-blue-600">
                    {payload[0].value} déclaration{payload[0].value > 1 ? 's' : ''}
                </p>
            </div>
        );
    }
    return null;
};

const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Statistiques des Déclarations',
            href: route('dashboard'),
        },
    ]


export default function Statistic({ totalDeclarations, bySex, byCreator }: StatisticProps) {
    const bySexData = Object.entries(bySex).map(([key, value]) => ({
        name: key === 'M' ? 'Masculin' : key === 'F' ? 'Féminin' : key,
        value,
        percentage: ((value / totalDeclarations) * 100).toFixed(1),
    }));

    const byCreatorData = Object.entries(byCreator).map(([key, value]) => ({
        name: key,
        value,
        percentage: ((value / totalDeclarations) * 100).toFixed(1),
    }));

    // Statistiques dérivées
    const mostActiveCreator = byCreatorData.reduce((prev, current) => (prev.value > current.value ? prev : current));

    return (
        <HopitalLayout breadcrumbs={breadcrumbs}>
            <Head title="Tableau de Bord - Statistiques des Déclarations" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="mb-6 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard title="Total des déclarations" value={totalDeclarations.toLocaleString()} icon={FolderPlus} bgColor="bg-blue-600" />
                    <StatCard title="Agents actifs" value={Object.keys(byCreator).length} icon={UserCheck} bgColor="bg-purple-600" />
                    <StatCard title="Agent le plus actif" value={mostActiveCreator.value} icon={TrendingUp} bgColor="bg-orange-600" />
                </div>

                {/* Graphiques */}
                <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
                    {/* Graphique par sexe -*/}
                    <ChartCard title="Répartition par genre" subtitle={`${bySexData.length} catégories identifiées`} icon={Users}>
                        <ResponsiveContainer width="100%" height={350}>
                            <PieChart>
                                <Pie
                                    data={bySexData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={120}
                                    paddingAngle={2}
                                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                                    labelLine={false}
                                >
                                    {bySexData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={MODERN_COLORS[index % MODERN_COLORS.length]}
                                            className="transition-opacity duration-200 hover:opacity-80"
                                        />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                                <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    {/* Graphique par créateur - Version Bar Chart */}
                    <ChartCard title="Performance par agent" subtitle={`${byCreatorData.length} agents contributeurs`} icon={UserCheck}>
                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={byCreatorData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} interval={0} fontSize={12} />
                                <YAxis stroke="#666" />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar
                                    dataKey="value"
                                    fill="url(#colorGradient)"
                                    radius={[4, 4, 0, 0]}
                                    className="transition-opacity duration-200 hover:opacity-80"
                                >
                                    {byCreatorData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={MODERN_COLORS[index % MODERN_COLORS.length]} />
                                    ))}
                                </Bar>
                                <defs>
                                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                                    </linearGradient>
                                </defs>
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>

                {/* Tableau récapitulatif */}
                <div className="mt-4">
                    <ChartCard title="Récapitulatif détaillé" subtitle="Vue d'ensemble des performances">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                            {/* Tableau par genre */}
                            <div>
                                <h4 className="mb-4 text-sm font-semibold tracking-wide text-gray-900 uppercase">Répartition par genre</h4>
                                <div className="space-y-3">
                                    {bySexData.map((item, index) => (
                                        <div key={item.name} className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                                            <div className="flex items-center space-x-3">
                                                <div
                                                    className="h-4 w-4 rounded-full"
                                                    style={{ backgroundColor: MODERN_COLORS[index % MODERN_COLORS.length] }}
                                                />
                                                <span className="font-medium text-gray-900">{item.name}</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="font-bold text-gray-900">{item.value}</span>
                                                <span className="ml-2 text-sm text-gray-600">({item.percentage}%)</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Top 5 agents */}
                            <div>
                                <h4 className="mb-4 text-sm font-semibold tracking-wide text-gray-900 uppercase">
                                    Top agents (par nombre de déclarations)
                                </h4>
                                <div className="space-y-3">
                                    {byCreatorData
                                        .sort((a, b) => b.value - a.value)
                                        .slice(0, 5)
                                        .map((item, index) => (
                                            <div key={item.name} className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                                                <div className="flex items-center space-x-3">
                                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                                                        {index + 1}
                                                    </div>
                                                    <span className="font-medium text-gray-900">{item.name}</span>
                                                </div>
                                                <div className="text-right">
                                                    <span className="font-bold text-gray-900">{item.value}</span>
                                                    <span className="ml-2 text-sm text-gray-600">({item.percentage}%)</span>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </ChartCard>
                </div>
            </div>
        </HopitalLayout>
    );
}
