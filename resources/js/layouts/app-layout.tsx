import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { NavGroup, type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import { type NavItem } from '@/types';


interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    mainNavItems?: NavItem[];
    footerNavItems?: NavItem[];
}

export default ({ children, breadcrumbs,mainNavItems = [],
    footerNavItems = [], ...props }: AppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} mainNavItems={mainNavItems} footerNavItems={footerNavItems} {...props}>
        {children}
    </AppLayoutTemplate>
);
