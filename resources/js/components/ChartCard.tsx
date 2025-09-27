import React from 'react';

interface ChartCardProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    icon?: React.ElementType;
}

export default function ChartCard({ title, subtitle, children, icon: Icon }: ChartCardProps) {
    return (
        <div className="overflow-hidden rounded-xl border shadow-sm transition-shadow duration-300 hover:shadow-md">
            <div className="border-b   px-6 py-4">
                <div className="flex items-center space-x-3">
                    {Icon && (
                        <div className="rounded-lg bg-blue-100 p-2">
                            <Icon className="h-5 w-5 text-blue-600" />
                        </div>
                    )}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
                        {subtitle && <p className="mt-1 text-sm text-gray-600">{subtitle}</p>}
                    </div>
                </div>
            </div>
            <div className="p-6">{children}</div>
        </div>
    );
}
