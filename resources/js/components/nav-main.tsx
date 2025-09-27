import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
  const page = usePage();
  return (
    <>
      {items.map((item) => {
        // Si c'est un NavGroup (il a des sous-items)
        if ('items' in item && Array.isArray(item.items)) {
          return (
            <SidebarGroup key={item.title} className="px-2 py-0">
              <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
              <SidebarMenu>
                {item.items.map((sub) => (
                  <SidebarMenuItem key={sub.title}>
                    <SidebarMenuButton asChild isActive={page.url.startsWith(sub.href)} tooltip={{ children: sub.title }}>
                      <Link href={sub.href} prefetch>
                        {sub.icon && <sub.icon />}
                        <span>{sub.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          );
        }

        // Sinon c'est un item simple
        return (
          <SidebarGroup key={item.title} className="px-2 py-0">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={page.url.startsWith(item.href)} tooltip={{ children: item.title }}>
                  <Link href={item.href} prefetch>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        );
      })}
    </>
  );
}
