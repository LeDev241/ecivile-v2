import ChartCard from '@/components/ChartCard';
import ReusableChart from '@/components/ReusableChart';
import StatCard from '@/components/StatCard';
import { Badge } from '@/components/ui/badge';
import MairieLayout from '@/layouts/mairie-Layout';
import { BreadcrumbItem } from '@/types';
import { StatisticProps } from '@/types/types';
import { Head } from '@inertiajs/react';
import { BarChart3, Calendar, Clock, FolderPlus, UserCheck } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Statistiques Mairie',
    href: route('dashboard'),
  },
];

export default function Statistic({ totalDeclarations, totalPending, byCreator, byYear, byMonth, byStatus }: StatisticProps) {
  const byCreatorData = Object.entries(byCreator).map(([key, value]) => ({
    name: key,
    value,
  }));

  const byYearData = Object.entries(byYear).map(([year, value]) => ({ name: year, value }));
  const byMonthData = Object.entries(byMonth).map(([month, value]) => ({ name: `Mois ${month}`, value }));
  const byStatusData = Object.entries(byStatus).map(([status, value]) => ({ name: status, value }));

  const mostActiveCreator = byCreatorData.length
    ? byCreatorData.reduce((prev, current) => (prev.value > current.value ? prev : current))
    : { name: 'Aucun', value: 0 };

  return (
    <MairieLayout breadcrumbs={breadcrumbs}>
      <Head title="Tableau de Bord - Statistiques Mairie" />

      <div className="flex flex-col gap-6 p-4">
        {/* Top Stats */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="En attente " value={totalPending.toLocaleString()} icon={Clock} bgColor="bg-yellow-600" />
          <StatCard title="Validées/Rejetées" value={totalDeclarations.toLocaleString()} icon={FolderPlus} bgColor="bg-blue-600" />
          <StatCard title="Agents actifs" value={mostActiveCreator.name} icon={UserCheck} bgColor="bg-purple-600" />
          <StatCard title="Années couvertes" value={Object.keys(byYear).length} icon={Calendar} bgColor="bg-green-600" />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {/* Répartition par statut */}
          <ChartCard title="Répartition par statut" subtitle="Validations / Rejets" icon={FolderPlus}>
            <ReusableChart type="pie" data={byStatusData} dataKey="value" nameKey="name" height={320} />
          </ChartCard>

          {/* Performance des agents */}
          <ChartCard title="Performance des agents" subtitle="Traitement des déclarations" icon={UserCheck}>
            <ReusableChart type="bar" data={byCreatorData} dataKey="value" xAxisKey="name" height={320} />
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {/* Déclarations par année */}
          <ChartCard title="Déclarations par année" subtitle="Évolution globale" icon={BarChart3}>
            <ReusableChart type="bar" data={byYearData} dataKey="value" xAxisKey="name" height={300} />
          </ChartCard>

          {/* Déclarations par mois */}
          <ChartCard title="Déclarations par mois (année en cours)" subtitle="Suivi récent" icon={Calendar}>
            <ReusableChart type="bar" data={byMonthData} dataKey="value" xAxisKey="name" height={300} />
          </ChartCard>
        </div>

        {/* Statuts détaillés */}
        <ChartCard title="Détails par statut" subtitle="Nombre de déclarations par statut" icon={FolderPlus}>
          <div className="flex flex-wrap gap-4">
            {byStatusData.map((item) => (
              <div key={item.name} className="flex w-52 items-center justify-between rounded-lg border bg-white p-3 shadow-sm">
                <span className="font-medium text-gray-800">{item.name}</span>
                <Badge
                  className={`rounded-full px-2 py-1 text-xs ${
                    item.name === 'validee'
                      ? 'bg-green-100 text-green-700'
                      : item.name === 'rejetee'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {item.value}
                </Badge>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </MairieLayout>
  );
}
