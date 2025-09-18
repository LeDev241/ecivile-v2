import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';
import * as React from 'react';
import { toast } from 'sonner';

interface ShowModalProps {
    parent: { id: number; nom: string };
    routeName: string;
}



export function ShowModal({ parent, routeName}: ShowModalProps) {
    const [open, setOpen] = React.useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route(routeName, { [routeName.includes('mairies') ? 'mairie' : 'hopital']: parent.id }), {
            onSuccess: () => {
                toast.success('Agent créé avec succès !');
                reset();
                setOpen(false);
            },
            onError: () => toast.error('Erreur de validation.'),
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className='cursor-pointer'>Ajouter un agent</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Créer un agent pour {parent.nom}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="mt-2 space-y-4">
                    <div>
                        <Label htmlFor="name">Nom</Label>
                        <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <div>
                        <Label htmlFor="password">Mot de passe</Label>
                        <Input id="password" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} />
                        {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                    </div>

                    <div>
                        <Label htmlFor="password_confirmation">Confirmer le mot de passe</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                        />
                        {errors.password_confirmation && <p className="text-sm text-red-500">{errors.password_confirmation}</p>}
                    </div>

                    <div className="mt-4 flex justify-end gap-2">
                        <DialogClose asChild>
                            <Button variant="outline">Annuler</Button>
                        </DialogClose>
                        <Button type="submit" disabled={processing}>
                            <Save className="mr-2 h-4 w-4" /> Créer
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
