import Combobox, { nationalites, villesGabon } from '@/components/NationalitySelect';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import HopitalLayout from '@/layouts/hopital-layout';
import { Head, useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';

// Fonction pour générer un code NUIN
const generateNuins = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Fonctions de formatage
const formatNom = (value : string) => value.toUpperCase();

const formatPrenom = (value : string) =>
    value
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');

export default function Index() {
    const { data, setData, post, processing, errors } = useForm({
        // Infos de l'enfant
        nom_enfant: '',
        prenom_enfant: '',
        code_nuin: generateNuins(),
        date_naissance: '',
        sexe: 'masculin',
        lieu_naissance: '',

        // Infos du père
        nom_pere: '',
        prenom_pere: '',
        profession_pere: '',
        nationalite_pere: '',

        // Infos de la mère
        nom_mere: '',
        prenom_mere: '',
        profession_mere: '',
        nationalite_mere: '',
        email_parent: '',

        // Fichiers
        acte_naissance_pere: null,
        acte_naissance_mere: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('hopital.declarations.store'));
    };

    return (
        <HopitalLayout>
            <Head title="Faire une déclration" />
            <div className="p-4">
                <h1 className="mb-4 text-lg font-semibold text-gray-800">Créer une Déclaration de Naissance</h1>

                <form
                    onSubmit={submit}
                    className="min-h-[100vh] flex-1 space-y-6 overflow-hidden rounded-xl border border-sidebar-border/70 p-4 md:min-h-min dark:border-sidebar-border"
                >
                    {/* Section Enfant */}
                    <div className="space-y-4 border-b pb-4">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Informations de l'enfant</h2>
                        <div className="flex flex-col gap-4">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <Label htmlFor="nom_enfant">Nom de l'enfant</Label>
                                    <Input
                                        id="nom_enfant"
                                        type="text"
                                        value={data.nom_enfant}
                                        onChange={(e) => setData('nom_enfant', formatNom(e.target.value))}
                                        className="mt-1 block w-full"
                                    />
                                    {errors.nom_enfant && <div className="mt-1 text-sm text-red-500">{errors.nom_enfant}</div>}
                                </div>
                                <div>
                                    <Label htmlFor="prenom_enfant">Prénom de l'enfant</Label>
                                    <Input
                                        id="prenom_enfant"
                                        type="text"
                                        value={data.prenom_enfant}
                                        onChange={(e) => setData('prenom_enfant', formatPrenom(e.target.value))}
                                        className="mt-1 block w-full"
                                    />
                                    {errors.prenom_enfant && <div className="mt-1 text-sm text-red-500">{errors.prenom_enfant}</div>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <Label htmlFor="code_nuin">Code NUIN</Label>
                                    <Input
                                        id="code_nuin"
                                        type="text"
                                        value={data.code_nuin}
                                        readOnly
                                        className="mt-1 block w-full cursor-not-allowed bg-gray-100 dark:bg-gray-700"
                                    />
                                    {errors.code_nuin && <div className="mt-1 text-sm text-red-500">{errors.code_nuin}</div>}
                                </div>
                                <div>
                                    <Label htmlFor="date_naissance">Date de naissance</Label>
                                    <Input
                                        id="date_naissance"
                                        type="date"
                                        value={data.date_naissance}
                                        onChange={(e) => setData('date_naissance', e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                    {errors.date_naissance && <div className="mt-1 text-sm text-red-500">{errors.date_naissance}</div>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div className="col-span-1 md:col-span-2 lg:col-span-3">
                                    <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sexe</Label>
                                    <RadioGroup
                                        defaultValue={data.sexe}
                                        onValueChange={(value) => setData('sexe', value)}
                                        className="mt-2 flex space-x-4"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="masculin" id="sexe-m" />
                                            <Label htmlFor="sexe-m">Masculin</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="feminin" id="sexe-f" />
                                            <Label htmlFor="sexe-f">Féminin</Label>
                                        </div>
                                    </RadioGroup>
                                    {errors.sexe && <div className="mt-1 text-sm text-red-500">{errors.sexe}</div>}
                                </div>
                                <div className="col-span-1 md:col-span-2">
                                    <Label htmlFor="lieu_naissance">Lieu de naissance</Label>

                                    <Combobox
                                        options={villesGabon}
                                        value={data.lieu_naissance || ''}
                                        onChange={(value) => setData('lieu_naissance', value)}
                                        placeholder="Lieu de naissance"
                                    />

                                    {errors.lieu_naissance && <div className="mt-1 text-sm text-red-500">{errors.lieu_naissance}</div>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section Père */}
                    <div className="space-y-4 border-b pb-4">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Informations du père</h2>
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            <div>
                                <Label htmlFor="nom_pere">Nom du père</Label>
                                <Input
                                    id="nom_pere"
                                    type="text"
                                    value={data.nom_pere}
                                    onChange={(e) => setData('nom_pere', formatNom(e.target.value))}
                                    className="mt-1 block w-full"
                                />
                                {errors.nom_pere && <div className="mt-1 text-sm text-red-500">{errors.nom_pere}</div>}
                            </div>
                            <div>
                                <Label htmlFor="prenom_pere">Prénom du père</Label>
                                <Input
                                    id="prenom_pere"
                                    type="text"
                                    value={data.prenom_pere}
                                    onChange={(e) => setData('prenom_pere', formatPrenom(e.target.value))}
                                    className="mt-1 block w-full"
                                />
                                {errors.prenom_pere && <div className="mt-1 text-sm text-red-500">{errors.prenom_pere}</div>}
                            </div>
                            <div>
                                <Label htmlFor="profession_pere">Profession du père</Label>
                                <Input
                                    id="profession_pere"
                                    type="text"
                                    value={data.profession_pere}
                                    onChange={(e) => setData('profession_pere', e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                {errors.profession_pere && <div className="mt-1 text-sm text-red-500">{errors.profession_pere}</div>}
                            </div>
                            <div>
                                <Label htmlFor="nationalite_pere">Nationalité du père</Label>

                                <Combobox
                                    options={nationalites}
                                    value={data.nationalite_pere || ''}
                                    onChange={(value) => setData('nationalite_pere', value)}
                                    placeholder="Sélectionner une nationalité"
                                />
                                {errors.nationalite_pere && <div className="mt-1 text-sm text-red-500">{errors.nationalite_pere}</div>}
                            </div>
                        </div>
                    </div>

                    {/* Section Mère */}
                    <div className="space-y-4 border-b pb-4">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Informations de la mère</h2>
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            <div>
                                <Label htmlFor="nom_mere">Nom de la mère</Label>
                                <Input
                                    id="nom_mere"
                                    type="text"
                                    value={data.nom_mere}
                                    onChange={(e) => setData('nom_mere', formatNom(e.target.value))}
                                    className="mt-1 block w-full"
                                />
                                {errors.nom_mere && <div className="mt-1 text-sm text-red-500">{errors.nom_mere}</div>}
                            </div>
                            <div>
                                <Label htmlFor="prenom_mere">Prénom de la mère</Label>
                                <Input
                                    id="prenom_mere"
                                    type="text"
                                    value={data.prenom_mere}
                                    onChange={(e) => setData('prenom_mere', formatPrenom(e.target.value))}
                                    className="mt-1 block w-full"
                                />
                                {errors.prenom_mere && <div className="mt-1 text-sm text-red-500">{errors.prenom_mere}</div>}
                            </div>
                            <div>
                                <Label htmlFor="profession_mere">Profession de la mère</Label>
                                <Input
                                    id="profession_mere"
                                    type="text"
                                    value={data.profession_mere}
                                    onChange={(e) => setData('profession_mere', e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                {errors.profession_mere && <div className="mt-1 text-sm text-red-500">{errors.profession_mere}</div>}
                            </div>
                            <div>
                                <Label htmlFor="nationalite_mere">Nationalité de la mère</Label>
                                <Combobox
                                    options={nationalites}
                                    value={data.nationalite_mere || ''}
                                    onChange={(value) => setData('nationalite_mere', value)}
                                    placeholder="Sélectionner une nationalité"
                                />
                                {errors.nationalite_mere && <div className="mt-1 text-sm text-red-500">{errors.nationalite_mere}</div>}
                            </div>
                        </div>
                    </div>

                    {/* Ajout du champ pour l'e-mail ici */}
                    <div className="lg:col-span-2">
                        <Label htmlFor="email_parent">Adresse e-mail d'un parent (pour les notifications)</Label>
                        <Input
                            id="email_parent"
                            type="email"
                            value={data.email_parent}
                            onChange={(e) => setData('email_parent', e.target.value)}
                            className="mt-1 block w-full"
                            placeholder="entrez l'adresse email"
                        />
                        {errors.email_parent && <div className="mt-1 text-sm text-red-500">{errors.email_parent}</div>}
                    </div>

                    {/* Section Fichiers */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Documents justificatifs</h2>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <Label htmlFor="acte_naissance_pere">Acte de naissance du père</Label>
                                <Input
                                    id="acte_naissance_pere"
                                    type="file"
                                    onChange={(e) => setData('acte_naissance_pere', e.target.files[0])}
                                    className="mt-1 block w-full file:mr-4 file:rounded-full file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-gray-700 hover:file:bg-gray-200"
                                />
                                {errors.acte_naissance_pere && <div className="mt-1 text-sm text-red-500">{errors.acte_naissance_pere}</div>}
                            </div>
                            <div>
                                <Label htmlFor="acte_naissance_mere">Acte de naissance de la mère</Label>
                                <Input
                                    id="acte_naissance_mere"
                                    type="file"
                                    onChange={(e) => setData('acte_naissance_mere', e.target.files[0])}
                                    className="mt-1 block w-full file:mr-4 file:rounded-full file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-gray-700 hover:file:bg-gray-200"
                                />
                                {errors.acte_naissance_mere && <div className="mt-1 text-sm text-red-500">{errors.acte_naissance_mere}</div>}
                            </div>
                        </div>
                    </div>

                    <Button type="submit" disabled={processing} className="w-full md:w-auto">
                        <Save className="mr-2 h-4 w-4" />
                        Enregistrer la Déclaration
                    </Button>
                </form>
            </div>
        </HopitalLayout>
    );
}
