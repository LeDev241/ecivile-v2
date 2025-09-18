import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type NavItem } from '@/types';
import { BookOpen, Folder, Hospital, Landmark, LayoutGrid, Plus } from 'lucide-react';
import { ReactNode } from 'react';

// Breadcrumbs par défaut pour l'admin
const defaultBreadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tableau de bord Admin',
        href: route('dashboard'),
    },
];

// Navigation principale de l’admin
const mainNavItems: NavItem[] = [
    {
        title: 'Tableau de bord',
        href: route('dashboard'),
        icon: LayoutGrid,
    },
    {
        title: 'Nouvelle mairie',
        href: route('admin.mairies.create'),
        icon: Plus,
    },
    {
        title: 'Gestion des mairies',
        href: route('admin.mairies.index'),
        icon: Landmark,
    },
    {
        title: 'Nouvel hôpital',
        href: route('admin.hopitaux.create'),
        icon: Plus,
    },
    {
        title: 'Gestion des hôpitaux',
        href: route('admin.hopitaux.index'),
        icon: Hospital,
    },
];

// Footer de l’admin
const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: '#',
        icon: Folder,
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

export default function AdminLayout({ children, breadcrumbs }: AdminLayoutProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs ?? defaultBreadcrumbs} mainNavItems={mainNavItems} footerNavItems={footerNavItems}>
            {children}
        </AppLayout>
    );
}
