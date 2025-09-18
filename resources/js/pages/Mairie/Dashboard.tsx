import StatCard from '@/components/StatCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import MairieLayout from '@/layouts/mairie-Layout';
import { type BreadcrumbItem } from '@/types';
import { MairieDashboardProps } from '@/types/types';
import { Head, Link } from '@inertiajs/react';
import { CircleCheckBig, CircleSlash2, Eye, FileClock } from 'lucide-react';

export default function MairieDashboard({ statusCounts, recentDeclarations, user }: MairieDashboardProps) {
    // Couleur des badges selon le statut
    const getBadgeColor = (statut: string) => {
        switch (statut) {
            case 'validee':
                return 'bg-green-500 text-white';
            case 'rejetee':
                return 'bg-red-500 text-white';
            case 'envoyee':
            default:
                return 'bg-yellow-500 text-white';
        }
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `Tableau de bord - ${user.mairie?.nom ?? 'Mairie'}`,
            href: route('dashboard'),
        },
    ];

    return (
        <MairieLayout breadcrumbs={breadcrumbs}>
            <Head title={`Tableau de bord de la ${user.mairie?.nom ?? 'Mairie'}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Cartes statistiques */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <StatCard
                        icon={FileClock}
                        title="En attente"
                        value={statusCounts.recues_en_attente}
                        bgColor="bg-gradient-to-br from-indigo-500 to-blue-500"
                    />
                    <StatCard
                        icon={CircleCheckBig}
                        title="Validées"
                        value={statusCounts.validees}
                        bgColor="bg-gradient-to-br from-green-500 to-emerald-500"
                    />
                    <StatCard
                        icon={CircleSlash2}
                        title="Rejetées"
                        value={statusCounts.rejetees}
                        bgColor="bg-gradient-to-br from-rose-500 to-red-500"
                    />
                </div>

                {/* Tableau des dernières déclarations */}
                <div className="mt-6 w-full">
                    <h2 className="mb-4 text-lg font-semibold text-gray-800">Dernières déclarations reçues</h2>
                    <div className="relative min-h-[200px] flex-1 overflow-auto rounded-xl border border-gray-200 bg-white dark:bg-gray-800">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Code NUIN</TableHead>
                                    <TableHead>Enfant</TableHead>
                                    <TableHead>Hôpital</TableHead>
                                    <TableHead>Statut</TableHead>
                                    <TableHead>Date de réception</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentDeclarations.length > 0 ? (
                                    recentDeclarations.map((declaration) => (
                                        <TableRow key={declaration.id}>
                                            <TableCell>{declaration.code_nuin}</TableCell>
                                            <TableCell>
                                                {declaration.nom_enfant} {declaration.prenom_enfant}
                                            </TableCell>
                                            <TableCell>{declaration.hopital}</TableCell>
                                            <TableCell>
                                                <Badge className={getBadgeColor(declaration.statut)}>
                                                    {declaration.statut !== 'envoyee' ? declaration.statut : 'en attente'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{declaration.created_at}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="sm" asChild>
                                                    <Link href={route('mairie.declarations.show', declaration.id)}>
                                                        <Eye className="mr-1 h-4 w-4" />
                                                    </Link>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center text-gray-500">
                                            Aucune déclaration récente.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </MairieLayout>
    );
}
