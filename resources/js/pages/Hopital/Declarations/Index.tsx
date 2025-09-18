import ConfirmDeleteButton from '@/components/ConfirmDeleteButton';
import Pagination from '@/components/Pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import HopitalLayout from '@/layouts/hopital-layout';
import { IndexProps } from '@/types/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Download, Edit2, Eye, Filter, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast, Toaster } from 'sonner';

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}

export default function Index({ declarations, filters, flash }: IndexProps) {
    const [searchField, setSearchField] = useState(filters.field || 'nom_enfant');
    const [searchQuery, setSearchQuery] = useState(filters.query || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || 'tous');

    // Utilisation d'un debounce pour la recherche automatique
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    // Effet de bord pour déclencher la recherche et les filtres
    useEffect(() => {
        router.get(
            route('hopital.declarations.index'),
            {
                field: searchField,
                query: debouncedSearchQuery,
                status: statusFilter,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    }, [debouncedSearchQuery, searchField, statusFilter]);

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash?.success);
        }
        if (flash?.error) {
            toast.error(flash?.error);
        }
    }, [flash]);

    const { delete: destroy } = useForm();

    const handleDelete = (declarationId : number) => {
        destroy(route('hopital.declarations.destroy', declarationId), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Déclaration supprimée avec succès.');
            },
        });
    };

    const getBadgeColor = (statut : string) => {
        switch (statut) {
            case 'validee':
                return 'bg-green-500 text-white';
            case 'rejetee':
                return 'bg-red-500 text-white';
            case 'envoyee':
                return 'bg-yellow-500 text-white';
            case 'brouillon':
                return 'bg-blue-500 text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    };

    return (
        <HopitalLayout>
            <Head title="Liste des déclarations" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Liste des Déclarations</h1>

                <div className="mb-4 flex flex-col gap-4 sm:flex-row">
                    {/* Formulaire de recherche */}
                    <div className="flex flex-1 flex-col gap-2 sm:flex-row">
                        <Select value={searchField} onValueChange={setSearchField}>
                            <SelectTrigger className="sm:w-[180px]">
                                <SelectValue placeholder="Rechercher par..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="nom_enfant">Nom</SelectItem>
                                <SelectItem value="code_nuin">Code NUIN</SelectItem>
                            </SelectContent>
                        </Select>
                        <Input
                            type="text"
                            placeholder="Entrez votre recherche..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-1"
                        />
                    </div>

                    {/* Bouton de filtre par statut */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="w-full sm:w-auto">
                                <Filter className="mr-2 h-4 w-4" /> Filtrer par statut
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Statut</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup value={statusFilter} onValueChange={setStatusFilter}>
                                <DropdownMenuRadioItem value="tous">Tous</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="envoyee">Envoyée</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="validee">Validée</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="rejetee">Rejetée</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="overflow-x-auto rounded-lg border bg-white dark:bg-gray-800">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Code NUIN</TableHead>
                                <TableHead>Nom de l'enfant</TableHead>
                                <TableHead>Date de naissance</TableHead>
                                <TableHead>Enregistré par</TableHead>
                                <TableHead>Date de création</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {declarations.data.length > 0 ? (
                                declarations.data.map((declaration) => {
                                    const canEditOrDelete = ['brouillon'].includes(declaration.statut);

                                    return (
                                        <TableRow key={declaration.id}>
                                            <TableCell>{declaration.code_nuin}</TableCell>
                                            <TableCell>{declaration.nom_enfant}</TableCell>
                                            <TableCell>
                                                {new Date(declaration.date_naissance).toLocaleDateString('fr-FR', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </TableCell>
                                            <TableCell>{declaration.agent_hopital ? declaration.agent_hopital.name : 'N/A'}</TableCell>
                                            <TableCell>{new Date(declaration.created_at).toLocaleDateString()}</TableCell>
                                            <TableCell>
                                                <Badge className={getBadgeColor(declaration.statut)}>{declaration.statut}</Badge>
                                            </TableCell>
                                            <TableCell className="flex items-center justify-end space-x-2 text-right">
                                                <Button variant="ghost" size="sm" asChild>
                                                    <Link href={route('hopital.declarations.show', declaration.id)}>
                                                        <Eye className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                {canEditOrDelete ? (
                                                    <Button variant="ghost" size="sm" asChild>
                                                        <Link href={route('hopital.declarations.edit', declaration.id)}>
                                                            <Edit2 className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="cursor-not-allowed p-2 text-gray-400"
                                                        title="Cette déclaration ne peut plus être modifiée."
                                                    >
                                                        <Edit2 className="h-4 w-4" />
                                                    </Button>
                                                )}
                                                {canEditOrDelete ? (
                                                    <ConfirmDeleteButton onConfirm={() => handleDelete(declaration.id)} />
                                                ) : (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="cursor-not-allowed p-2 text-gray-400"
                                                        title="Cette déclaration ne peut plus être supprimée."
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                )}
                                                <Button variant="ghost" size="sm" asChild>
                                                    <a href={route('hopital.declarations.download', declaration.id)} target="_blank">
                                                        <Download className="h-4 w-4" />
                                                    </a>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center text-gray-500 dark:text-gray-400">
                                        Aucune déclaration de naissance n'a été trouvée.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <Pagination
                    pagination={declarations}
                    routeName="hopital.declarations.index"
                    params={{
                        field: searchField,
                        query: debouncedSearchQuery,
                        status: statusFilter,
                    }}
                />

                <Toaster richColors position="bottom-left" />
            </div>
        </HopitalLayout>
    );
}
