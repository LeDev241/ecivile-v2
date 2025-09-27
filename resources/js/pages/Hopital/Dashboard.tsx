import StatCard from '@/components/StatCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import HopitalLayout from '@/layouts/hopital-layout';
import { BreadcrumbItem } from '@/types';
import { HopitalDashboardProps } from '@/types/types';
import { Head, Link } from '@inertiajs/react';
import { ChartColumnBig, Eye, FolderPlus, Plus, Users } from 'lucide-react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

export default function HopitalDashboard({
  declarationsCount,
  newDeclarationsCount,
  recentDeclarations,
  bySex,
  mostActiveAgent,
  user,
}: HopitalDashboardProps) {
  const getBadgeColor = (statut: string) => {
    switch (statut) {
      case 'validee':
        return 'bg-green-500 text-white';
      case 'rejetee':
        return 'bg-red-500 text-white';
      case 'envoyee':
        return 'bg-yellow-500 text-white';
      default:
        return 'bg-blue-500 text-white';
    }
  };

  const breadcrumbs: BreadcrumbItem[] = [{ title: `Tableau de bord - ${user.hopital?.nom}`, href: route('dashboard') }];

  // Préparer données pour graphiques
  const bySexData = Object.entries(bySex).map(([key, value]) => ({
    name: key === 'masculin' ? 'Masculin' : 'Féminin',
    value,
  }));

  

  return (
    <HopitalLayout breadcrumbs={breadcrumbs}>
      <Head title={`Tableau de bord - ${user.hopital?.nom}`} />

      <div className="flex flex-col gap-6 p-4">
        <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <StatCard
            icon={FolderPlus}
            title="Total déclarations"
            value={declarationsCount}
            bgColor="bg-gradient-to-br from-indigo-500 to-blue-500 shadow-lg"
          />
          <StatCard
            icon={Users}
            title="Derniers 7 jours"
            value={newDeclarationsCount}
            bgColor="bg-gradient-to-br from-purple-500 to-indigo-500 shadow-lg"
          />
          <StatCard
            icon={Users}
            title="Agent le plus actif"
            value={mostActiveAgent || 'Aucun'}
            bgColor="bg-gradient-to-br from-green-500 to-teal-500 shadow-lg"
          />
        </div>

        {/* Graphiques */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-3 rounded-lg border p-4 shadow">
            <h3 className="mb-2 font-semibold">Actions</h3>
            <ResponsiveContainer width="100%" height={250}>
              <div className="flex flex-col justify-end gap-3">
                <Link
                  href={route('hopital.declarations.create')}
                  className="mt-1 flex items-center gap-2 rounded-md bg-blue-50 px-3 py-4 text-blue-700 transition hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800"
                >
                  <Plus className="h-4 w-4" />
                  <span>Nouvelle déclaration</span>
                </Link>
                <Link
                  href={route('hopital.declarations.index')}
                  className="mt-1 flex items-center gap-2 rounded-md bg-green-50 px-3 py-4 text-green-700 transition hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-800"
                >
                  <FolderPlus className="h-4 w-4" />
                  <span>Liste des déclarations</span>
                </Link>

                <Link
                  href={route('hopital.declarations.statistic')}
                  className="mt-1 flex items-center gap-2 rounded-md bg-gradient-to-br from-purple-500 to-indigo-500 px-3 py-4 text-white dark:bg-blue-900/30 dark:hover:bg-blue-800"
                >
                  <ChartColumnBig size={18} /> Statistiques
                </Link>
              </div>
            </ResponsiveContainer>
          </div>
          {/* Déclarations par sexe */}
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 font-semibold">Répartition par sexe</h3>
            {bySexData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={bySexData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {bySexData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500">Aucune donnée.</p>
            )}
          </div>
        </div>

        {/* Déclarations récentes */}
        <div className="w-full">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">Déclarations récentes</h2>
          <div className="relative overflow-auto rounded-xl border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code NUIN</TableHead>
                  <TableHead>Enfant</TableHead>
                  <TableHead>Date de naissance</TableHead>
                  <TableHead>Créé par l'agent</TableHead>
                  <TableHead>Déclaré le</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentDeclarations.length > 0 ? (
                  recentDeclarations.map((d) => (
                    <TableRow key={d.id}>
                      <TableCell>{d.code_nuin}</TableCell>
                      <TableCell>{d.nom_enfant}</TableCell>
                      <TableCell>{d.date_naissance_formatted}</TableCell>
                      <TableCell>{d.agent_hopital?.name || 'Inconnu'}</TableCell>
                      <TableCell>{d.created_at_formatted}</TableCell>
                      <TableCell>
                        <Badge className={getBadgeColor(d.statut)}>{d.statut}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="icon" asChild>
                          <Link href={route('hopital.declarations.show', d.id)}>
                            <Eye className="mr-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-gray-500">
                      Aucune déclaration récente.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </HopitalLayout>
  );
}
