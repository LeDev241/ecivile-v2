import ConfirmDeleteButton from '@/components/ConfirmDeleteButton';
import Pagination from '@/components/Pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
import { Download, Edit2, Eye, Filter, LayoutGrid, TableIcon, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast, Toaster } from 'sonner';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function Index({ declarations, filters, flash }: IndexProps) {
  const [searchField, setSearchField] = useState(filters.field || 'nom_enfant');
  const [searchQuery, setSearchQuery] = useState(filters.query || '');
  const [statusFilter, setStatusFilter] = useState(filters.status || 'tous');
  const [view, setView] = useState<'table' | 'card'>('table');

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    router.get(
      route('hopital.declarations.index'),
      { field: searchField, query: debouncedSearchQuery, status: statusFilter },
      { preserveState: true, replace: true },
    );
  }, [debouncedSearchQuery, searchField, statusFilter]);

  useEffect(() => {
    if (flash?.success) toast.success(flash?.success);
    if (flash?.error) toast.error(flash?.error);
  }, [flash]);

  const { delete: destroy } = useForm();

  const handleDelete = (declarationId: number) => {
    destroy(route('hopital.declarations.destroy', declarationId), {
      preserveScroll: true,
      onSuccess: () => toast.success('Déclaration supprimée avec succès.'),
    });
  };

  const getBadgeColor = (statut: string) => {
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

      <div className="flex flex-col gap-4 p-4">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Liste des Déclarations</h1>

        {/* Filtres */}
        <div className="flex flex-col gap-4 sm:flex-row">
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
          {/* Switch Table / Cards */}
          <div className="flex justify-end gap-2">
            <Button variant={view === 'table' ? 'default' : 'outline'} size="icon" onClick={() => setView('table')}>
              <TableIcon className="h-4 w-4" />
            </Button>
            <Button variant={view === 'card' ? 'default' : 'outline'} size="icon" onClick={() => setView('card')}>
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Table */}
        {view === 'table' && (
          <div className="overflow-x-auto rounded-lg border  ">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code NUIN</TableHead>
                  <TableHead>Nom de l'enfant</TableHead>
                  <TableHead>Date de naissance</TableHead>
                  <TableHead>Enregistré par</TableHead>
                  <TableHead>Déclarer le</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {declarations.data.length > 0 ? (
                  declarations.data.map((declaration) => {
                    const canEditOrDelete = declaration.statut === 'brouillon';
                    const canDownload = declaration.statut === 'envoyee';
                    return (
                      <TableRow key={declaration.id}>
                        <TableCell>{declaration.code_nuin}</TableCell>
                        <TableCell>{declaration.nom_enfant}</TableCell>
                        <TableCell>{declaration.date_naissance_formatted}</TableCell>
                        <TableCell>{declaration.agent_hopital?.name || 'N/A'}</TableCell>
                        <TableCell>{declaration.created_at_formatted}</TableCell>
                        <TableCell>
                          <Badge className={getBadgeColor(declaration.statut)}>{declaration.statut}</Badge>
                        </TableCell>
                        <TableCell className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={route('hopital.declarations.show', declaration.id)}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          {canEditOrDelete ? (
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={route('hopital.declarations.edit', declaration.id)}>
                                <Edit2 className="h-4 w-4" />
                              </Link>
                            </Button>
                          ) : (
                            <Button variant="ghost" size="icon" disabled>
                              <Edit2 className="h-4 w-4 text-gray-400" />
                            </Button>
                          )}
                          {canEditOrDelete ? (
                            <ConfirmDeleteButton onConfirm={() => handleDelete(declaration.id)} />
                          ) : (
                            <Button variant="ghost" size="icon" disabled>
                              <Trash2 className="h-4 w-4 text-gray-400" />
                            </Button>
                          )}
                          {canDownload ? (
                            <Button variant="ghost" size="icon" asChild>
                              <a href={route('hopital.declarations.download', declaration.id)} target="_blank">
                                <Download className="h-4 w-4" />
                              </a>
                            </Button>
                          ) : (
                            <Button variant="ghost" size="icon" disabled>
                                <Download className="h-4 w-4 text-gray-400" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-gray-500 dark:text-gray-400">
                      Aucune déclaration trouvée.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Cards */}
        {view === 'card' && (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {declarations.data.length > 0 ? (
              declarations.data.map((declaration) => {
                const canEditOrDelete = declaration.statut === 'brouillon';
                const canDownload = declaration.statut === 'envoyee';
                return (
                  <Card key={declaration.id} className="shadow-sm">
                    <CardContent className="flex flex-col gap-2 p-4">
                      <h3 className="text-lg font-semibold">{declaration.nom_enfant}</h3>
                      <p className="text-sm text-gray-500">Code NUIN: {declaration.code_nuin}</p>
                      <p className="text-sm text-gray-500">Né le {declaration.date_naissance_formatted}</p>
                      <p className="text-sm text-gray-500">Enregistré par: {declaration.agent_hopital?.name || 'N/A'}</p>
                      <Badge className={getBadgeColor(declaration.statut)}>{declaration.statut}</Badge>

                      <div className="mt-2 flex justify-end gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={route('hopital.declarations.show', declaration.id)}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        {canEditOrDelete && (
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={route('hopital.declarations.edit', declaration.id)}>
                              <Edit2 className="h-4 w-4" />
                            </Link>
                          </Button>
                        )}
                        {canEditOrDelete && <ConfirmDeleteButton onConfirm={() => handleDelete(declaration.id)} />}
                        {canDownload ? (
                            <Button variant="ghost" size="icon" asChild>
                              <a href={route('hopital.declarations.download', declaration.id)} target="_blank">
                                <Download className="h-4 w-4" />
                              </a>
                            </Button>
                          ) : (
                            <Button variant="ghost" size="icon" disabled>
                                <Download className="h-4 w-4 text-gray-400" />
                            </Button>
                          )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <p className="col-span-full text-center text-gray-500 dark:text-gray-400">Aucune déclaration trouvée.</p>
            )}
          </div>
        )}

        <Pagination
          pagination={declarations}
          routeName="hopital.declarations.index"
          params={{ field: searchField, query: debouncedSearchQuery, status: statusFilter }}
        />

        <Toaster richColors position="bottom-left" />
      </div>
    </HopitalLayout>
  );
}
