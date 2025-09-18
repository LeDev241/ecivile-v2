import StatCard from '@/components/StatCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import HopitalLayout from '@/layouts/hopital-layout';
import { BreadcrumbItem } from '@/types';
import { HopitalDashboardProps } from '@/types/types';
import { Head, Link } from '@inertiajs/react';
import { Eye, FolderPlus, Plus, Users } from 'lucide-react';

export default function HopitalDashboard({ declarationsCount, newDeclarationsCount, recentDeclarations, user }: HopitalDashboardProps) {
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

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `Tableau de bord - ${user.hopital?.nom}`,
            href: route('dashboard'),
        },
    ]

    return (
        <HopitalLayout breadcrumbs={breadcrumbs}>
            <Head title={`Tablea de bord - ${user.hopital?.nom}`}/>
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <StatCard
                        icon={FolderPlus}
                        title="Déclarations au total"
                        value={declarationsCount}
                        bgColor="bg-gradient-to-br from-indigo-500 to-blue-500"
                    />
                    <StatCard
                        icon={Users}
                        title="Nouvelles déclarations (7j)"
                        value={newDeclarationsCount}
                        bgColor="bg-gradient-to-br from-purple-500 to-indigo-500"
                    />
                </div>
                <div className="space-y-4 rounded-md border border-gray-200 p-4">
                    <h2 className="text-xl text-gray-500">Actions</h2>
                    <div className="grid grid-cols-1 space-x-2 sm:grid-cols-3">
                        <Link href={route('hopital.declarations.create')}>
                            <Button className="w-full">
                                <Plus size={5} /> Faire une déclararation
                            </Button>
                        </Link>
                        <Link href={route('hopital.declarations.index')}>
                            <Button variant="outline" className="w-full">
                                <FolderPlus size={5} /> Voir la liste
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="w-full">
                    <h2 className="mb-4 text-lg font-semibold text-gray-800">Déclarations récentes</h2>
                    <div className="relative overflow-auto rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
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
                                    recentDeclarations.map((declaration) => (
                                        <TableRow key={declaration.id}>
                                            <TableCell>{declaration.code_nuin}</TableCell>
                                            <TableCell>{declaration.nom_enfant}</TableCell>
                                            <TableCell>{declaration.date_naissance_formatted}</TableCell>
                                            <TableCell>{declaration.agent}</TableCell>
                                            <TableCell>{declaration.created_at_formatted}</TableCell>
                                            <TableCell>
                                                <Badge className={getBadgeColor(declaration.statut)}>{declaration.statut}</Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={route('hopital.declarations.show', declaration.id)}>
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
