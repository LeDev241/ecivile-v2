import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { LayoutGrid } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Paramètres de l'apparence",
        href: '/settings/appearance',
    },
];

const mainNavItems = [
    {
        title: 'Tableau de bord',
        href: route('dashboard'),
        icon: LayoutGrid,
    },

    {
        title: 'Mon profil',
        href: '/settings/profile',
        icon: null,
    },
    {
        title: 'Mot de passe',
        href: '/settings/password',
        icon: null,
    },
    {
        title: 'Apparence',
        href: '/settings/appearance',
        icon: null,
    },
];

export default function Appearance() {
    return (
        <AppLayout breadcrumbs={breadcrumbs} mainNavItems={mainNavItems}>
            <Head title="Appearance settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Paramètres de l'apparence" description="Mettre à jour les paramètres d'apparence de votre compte" />
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
