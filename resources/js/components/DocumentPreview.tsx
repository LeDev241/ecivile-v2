import { FileText, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Props {
    path?: string | null | File;
    label: string;
}

export default function DocumentPreview({ path, label }: Props) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // Si path est un File, créer un URL temporaire
    useEffect(() => {
        if (path instanceof File) {
            const url = URL.createObjectURL(path);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [path]);

    const openPreview = () => {
        if (path && typeof path === 'string') {
            setPreviewUrl(`/preview?path=${encodeURIComponent(path)}`);
        }
    };

    const closePreview = () => setPreviewUrl(null);

    const isProvided = path != null;

    return (
        <div className="mb-4">
            <p className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</p>

            {isProvided ? (
                <button
                    type="button"
                    onClick={openPreview}
                    className="mt-1 flex items-center gap-2 rounded-md bg-blue-50 px-3 py-1 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800 transition"
                >
                    <FileText className="h-4 w-4" />
                    <span>Voir le document</span>
                </button>
            ) : (
                <p className="mt-1 text-gray-500 dark:text-gray-400 italic">Non fourni</p>
            )}

            {/* Modale */}
            {previewUrl && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                    <div className="relative w-full max-w-5xl h-[90vh] bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden animate-fadeIn">
                        {/* Barre de titre */}
                        <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">{label}</h3>
                            <button
                                onClick={closePreview}
                                className="inline-flex items-center rounded-md bg-red-500/80 px-3 py-1 text-sm font-medium text-white hover:bg-red-600 transition"
                            >
                                <X className="mr-1 h-4 w-4" />
                                Fermer
                            </button>
                        </div>

                        {/* Contenu du document */}
                        <div className="h-full w-full">
                            <iframe
                                src={previewUrl}
                                className="h-full w-full"
                                title={`Aperçu - ${label}`}
                            />
                        </div>

                        <div className="absolute bottom-2 w-full text-center text-xs text-gray-600 dark:text-gray-400">
                            Si le document ne s’affiche pas, essayez de le télécharger depuis le navigateur.
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
