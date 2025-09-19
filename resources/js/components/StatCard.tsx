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
        <div
            className={`relative overflow-hidden rounded-xl shadow-sm border hover:shadow-md transition-shadow duration-300 border-sidebar-border/70 dark:border-sidebar-border ${bgColor} flex flex-col justify-center items-center p-4 min-h-[150px] sm:min-h-[180px]`}
        >
            <PlaceholderPattern className="absolute inset-0 w-full h-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />

            <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm flex items-center justify-center">
                    <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex flex-col items-center gap-1 mt-2 max-w-[90%] text-center">
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-white break-words">{title}</h3>
                    <p className="text-lg sm:text-xl md:text-2xl font-semibold text-white truncate">{value}</p>
                </div>
            </div>
        </div>
    );
}
