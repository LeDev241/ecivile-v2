import ConfirmDeleteButton from '@/components/ConfirmDeleteButton';
import { ShowModal } from '@/components/showModal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminLayout from '@/layouts/admin-layout';
import { Head, useForm } from '@inertiajs/react';
import { LayoutGrid, TableIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast, Toaster } from 'sonner';

export default function Show({ hopital, agents, flash }) {
    const { delete: destroy } = useForm();
    const [view, setView] = useState<'table' | 'card'>('table');

    const handleDeleteAgent = (agentId) => {
        destroy(
            route('admin.hopitaux.agents.destroy', {
                hopital: hopital.id,
                agent: agentId,
            }),
        );
    };

    useEffect(() => {
        if (flash.success) toast.success(flash.success);
        if (flash.error) toast.error(flash.error);
    }, [flash]);

    return (
        <AdminLayout>
            <Head title={`Détails de ${hopital.nom}`} />

            <div className="container mx-auto px-4">
                <h1 className="mmb-2 text-xl font-semibold text-gray-900 dark:text-white">Détails : {hopital.nom}</h1>

                <div className="relative mb-8 flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 p-4 md:min-h-min dark:border-sidebar-border">
                    <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">Informations Générales</h2>
                    <Separator className="my-2" />
                    <div className="grid gap-2 sm:grid-cols-2">
                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Nom :</strong> {hopital.nom}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Telephone :</strong> {hopital.telephone_principal}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Email :</strong> {hopital.email}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Type d'établissement :</strong> {hopital.type_etablissement}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Mairie de rattachement :</strong> {hopital.mairie?.nom || 'N/A'}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                            <strong>Adresse :</strong> {hopital.adresse_complete}
                        </p>
                    </div>
                    <div className="flex flex-col text-gray-700 dark:text-gray-300">
                        <h3 className="text-gray-700">Description :</h3>
                        <p>{hopital.description_courte || 'N/A'}</p>
                    </div>
                </div>

                <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Agents de l'hôpital</h2>
                    <div className="flex flex-wrap gap-2">
                        <Button variant={view === 'table' ? 'default' : 'outline'} size="icon" onClick={() => setView('table')}>
                            <TableIcon className="h-4 w-4" />
                        </Button>
                        <Button variant={view === 'card' ? 'default' : 'outline'} size="icon" onClick={() => setView('card')}>
                            <LayoutGrid className="h-4 w-4" />
                        </Button>
                        <Button asChild>
                            <ShowModal parent={hopital} routeName="admin.hopitaux.agents.store" />
                        </Button>
                    </div>
                </div>

                {/* Vue tableau */}
                {view === 'table' && (
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nom</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {agents.length > 0 ? (
                                    agents.map((agent) => (
                                        <TableRow key={agent.id}>
                                            <TableCell>{agent.name}</TableCell>
                                            <TableCell>{agent.email}</TableCell>
                                            <TableCell className="text-right">
                                                <ConfirmDeleteButton onConfirm={() => handleDeleteAgent(agent.id)} />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center text-gray-500 dark:text-gray-400">
                                            Aucun agent n'a été trouvé.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                )}

                {/* Vue cartes */}
                {view === 'card' && (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {agents.length > 0 ? (
                            agents.map((agent) => (
                                <Card key={agent.id} className="shadow-sm">
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold">{agent.name}</h3>
                                        <p className="text-gray-500">{agent.email}</p>
                                        <div className="mt-2 flex justify-end">
                                            <ConfirmDeleteButton onConfirm={() => handleDeleteAgent(agent.id)} />
                                        </div>
                                    </div>
                                </Card>
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-500 dark:text-gray-400">Aucun agent n'a été trouvé.</p>
                        )}
                    </div>
                )}
            </div>
            <Toaster richColors position="bottom-left" />
        </AdminLayout>
    );
}
