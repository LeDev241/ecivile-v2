import StatCard from '@/components/StatCard';
import { Button } from '@/components/ui/button';
import AdminLayout from '@/layouts/admin-layout';
import { AdminPageProps } from '@/types/types';
import { Head, Link } from '@inertiajs/react';
import { CircleUserIcon, Hospital, Landmark, MapPin, Plus } from 'lucide-react';



export default function Dashboard({ mairiesCount, hopitauxCount, usersCount, recentEntities }: AdminPageProps) {
    return (
        <AdminLayout>
            <Head title="Dashboard Admin" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <StatCard icon={Landmark} title="Mairies" value={mairiesCount} bgColor="bg-blue-500" />
                    <StatCard icon={Hospital} title="Hopitaux" value={hopitauxCount} bgColor="bg-yellow-500" />
                    <StatCard icon={CircleUserIcon} title="Utilisateurs" value={usersCount} bgColor="bg-green-500" />
                </div>

                <div className="h-auto overflow-hidden rounded-xl border border-sidebar-border/70 p-4 md:min-h-min dark:border-sidebar-border">
                    <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">Faire une action</h3>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        <Link href={route('admin.mairies.create')}>
                            <Button className="w-full">
                                <Plus />
                                Créer une nouvelle mairies
                            </Button>
                        </Link>
                        <Link href={route('admin.mairies.index')}>
                            <Button className="w-full border dark:border-white" variant="ghost">
                                <Plus />
                                Gestionnaire des mairies
                            </Button>
                        </Link>
                        <Link href={route('admin.hopitaux.create')}>
                            <Button className="w-full">
                                <Plus />
                                Créer un nouvel hopital
                            </Button>
                        </Link>
                        <Link href={route('admin.hopitaux.index')}>
                            <Button className="w-full border dark:border-white" variant="ghost">
                                <Plus />
                                Gestionnaire des hopitaux
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 p-4 md:min-h-min dark:border-sidebar-border">
                    <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">Entités récentes</h3>
                    <ul>
                        {recentEntities.length > 0 ? (
                            recentEntities.map((entity, index) => (
                                <li key={index} className="py-4">
                                    <div className="flex items-center justify-between">
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{entity.nom}</p>
                                            <p className="flex items-baseline gap-1 truncate text-sm text-gray-500">
                                                <MapPin size={14} />
                                                {entity.adresse_complete || 'N/A'}
                                            </p>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            <p className="text-right text-sm text-gray-500">{entity.type}</p>
                                            <p className="text-right text-xs text-gray-400">{entity.created_at}</p>
                                        </div>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li className="py-4 text-center text-sm text-gray-500">Aucun élément créé pour le moment</li>
                        )}
                    </ul>
                </div>
            </div>
        </AdminLayout>
    );
}
