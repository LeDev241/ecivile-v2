import { type ElementType } from 'react';
import { PlaceholderPattern } from './ui/placeholder-pattern';

interface StatCardProps {
    icon: ElementType;
    title: string;
    value: number | string;
    bgColor: string;
}

export default function StatCard({ icon: Icon, title, value, bgColor }: StatCardProps) {
    return (
        <div className={`relative overflow-hidden rounded-xl shadow-sm border hover:shadow-md transition-shadow duration-300  aspect-video  border-sidebar-border/70 dark:border-sidebar-border ${bgColor}`}>
            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />

            <div className="absolute bg-gradient-to-br inset-0 flex flex-col items-center justify-center p-2">
                <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
                    <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex flex-col items-center gap-2">
                    <h3 className="mt-2 text-center text-xl font-bold text-white">{title}</h3>
                    <p className="text-xl font-extrabold text-white">{value}</p>
                </div>
            </div>
        </div>
    );
}
