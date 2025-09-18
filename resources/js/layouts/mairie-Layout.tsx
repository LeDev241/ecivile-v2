import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type NavItem } from '@/types';
import { BookOpen, ChartColumnBig, LayoutGrid, List } from 'lucide-react';
import { ReactNode } from 'react';

// Breadcrumbs par défaut pour l'admin
const defaultBreadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tableau de bord',
        href: route('dashboard'),
    },
];

const mainNavItems: NavItem[] = [
    {
        title: 'Tableau de bord',
        href: route('mairie.dashboard'),
        icon: LayoutGrid,
    },
    {
        title: 'Liste des déclarations',
        href: route('mairie.declarations.index', { statut: 'envoyee' }),
        icon: List,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Statistique',
        href: '#',
        icon: ChartColumnBig,
    },
    {
        title: 'Documentation',
        href: '#',
        icon: BookOpen,
    },
];

interface AdminLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function MairieLayout({ children, breadcrumbs }: AdminLayoutProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs ?? defaultBreadcrumbs} mainNavItems={mainNavItems} footerNavItems={footerNavItems}>
            {children}
        </AppLayout>
    );
}
