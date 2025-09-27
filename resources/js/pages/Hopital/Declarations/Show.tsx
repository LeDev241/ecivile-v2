import DocumentPreview from '@/components/DocumentPreview';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import HopitalLayout from '@/layouts/hopital-layout';
import { PageProps } from '@/types/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Download, Edit2, Send } from 'lucide-react';

export default function Show({ declaration }: PageProps) {
    // Fonction utilitaire pour vérifier si une valeur est un chemin de fichier valide
    const isDocumentProvided = (path) => {
        return path && typeof path === 'string' && path.trim() !== '';
    };

    // Envoyer a la mairie
    const { post, processing } = useForm({});
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('hopital.declarations.submit', declaration.id), {
            onSuccess: () => {
                console.log('Déclaration soumise avec succès.');
            },
            onError: (errors) => {
                const errorMessage = errors.error || "Une erreur est survenue lors de l'envoi.";
                console.error('Erreur lors de la soumission de la déclaration :', errorMessage);
            },
        });
    };

    return (
        <HopitalLayout>
            <Head title="Détails de la Déclaration" />
            <div className="p-4">
                <h1 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">Détails de la Déclaration</h1>

                <div className="min-h-[100vh] flex-1 space-y-6 overflow-hidden rounded-xl border border-sidebar-border/70 p-4 md:min-h-min dark:border-sidebar-border">
                    {/* Section Informations de l'enfant */}
                    <div className="space-y-4 border-b pb-4">
                        <div className="flex items-center justify-between">
                            <span className="text-lg font-semibold">Informations de l'enfant</span>{' '}
                            {declaration.statut === 'envoyee' && (
                                <span className="rounded-md bg-yellow-500 p-1 px-2 text-white">{declaration.statut}</span>
                            )}
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nom</Label>
                                <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">{declaration.nom_enfant}</p>
                            </div>
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Prénom</Label>
                                <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">{declaration.prenom_enfant}</p>
                            </div>
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Code NUIN</Label>
                                <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">{declaration.code_nuin}</p>
                            </div>
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date de naissance</Label>
                                <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    {declaration.date_naissance_formatted}
                                </p>
                            </div>
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sexe</Label>
                                <p className="mt-1 text-lg font-semibold text-gray-900 capitalize dark:text-gray-100">{declaration.sexe}</p>
                            </div>
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Lieu de naissance</Label>
                                <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">{declaration.lieu_naissance}</p>
                            </div>
                        </div>
                    </div>

                    {/* Section Informations du père */}
                    <div className="space-y-4 border-b pb-4">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Informations du père</h2>
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nom</Label>
                                <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">{declaration.nom_pere}</p>
                            </div>
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Prénom</Label>
                                <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">{declaration.prenom_pere}</p>
                            </div>
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Profession</Label>
                                <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">{declaration.profession_pere}</p>
                            </div>
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nationalité</Label>
                                <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">{declaration.nationalite_pere}</p>
                            </div>
                        </div>
                    </div>

                    {/* Section Informations de la mère */}
                    <div className="space-y-4 border-b pb-4">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Informations de la mère</h2>
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nom</Label>
                                <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">{declaration.nom_mere}</p>
                            </div>
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Prénom</Label>
                                <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">{declaration.prenom_mere}</p>
                            </div>
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Profession</Label>
                                <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">{declaration.profession_mere}</p>
                            </div>
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nationalité</Label>
                                <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">{declaration.nationalite_mere}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Adresse Eamil du parent</Label>
                        <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">{declaration.email_parent}</p>
                    </div>

                    {/* Section Documents justificatifs */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Documents justificatifs</h2>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Acte de naissance du père</Label>
                                {isDocumentProvided(declaration.acte_naissance_pere) ? (
                                    <div className="mt-2 flex items-center gap-3">
                                        {/* Bouton Télécharger */}
                                        <a
                                            href={`/storage/${declaration.acte_naissance_pere}`}
                                            target="_blank"
                                            className="inline-flex items-center justify-center rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                                        >
                                            <Download className="h-5 w-5" />
                                        </a>

                                        {/* Intégration de ton composant DocumentPreview */}

                                        <DocumentPreview path={declaration.acte_naissance_pere} label="Aperçu" />
                                    </div>
                                ) : (
                                    <p className="mt-1 text-gray-500 dark:text-gray-400">Non fourni</p>
                                )}
                            </div>
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Acte de naissance de la mère</Label>
                                {isDocumentProvided(declaration.acte_naissance_mere) ? (
                                    <div className="mt-2 flex items-center gap-3">
                                        {/* Bouton Télécharger */}
                                        <a
                                            href={`/storage/${declaration.acte_naissance_mere}`}
                                            target="_blank"
                                            className="inline-flex items-center justify-center rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                                        >
                                            <Download className="h-5 w-5" />
                                        </a>

                                        {/* Intégration de ton composant DocumentPreview */}
                                        <DocumentPreview path={declaration.acte_naissance_mere} label="Aperçu" />
                                    </div>
                                ) : (
                                    <p className="mt-1 text-gray-500 dark:text-gray-400">Non fourni</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Bouton pour modifier la déclaration */}
                    <div className="mt-8 flex justify-end gap-6">
                        {declaration.statut === 'brouillon' && (
                            <Button asChild>
                                <Link href={route('hopital.declarations.edit', declaration.id)}>
                                    <Edit2 className="mr-2 h-4 w-4" />
                                    Modifier la déclaration
                                </Link>
                            </Button>
                        )}

                        {declaration.statut === 'brouillon' && (
                            <div className="mb-4 flex justify-end">
                                <form onSubmit={handleSubmit}>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="flex items-center gap-2 bg-green-500 text-white hover:bg-green-600"
                                    >
                                        <Send className="h-4 w-4" /> Envoyer à la mairie
                                    </Button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </HopitalLayout>
    );
}
