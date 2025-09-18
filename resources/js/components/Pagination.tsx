import { router } from '@inertiajs/react';
import React from 'react';
import { Button } from './ui/button';

interface PaginationProps {
    pagination: {
        current_page: number;
        last_page: number;
        next_page_url: string | null;
        prev_page_url: string | null;
    };
    routeName: string;
    params?: Record<string, any>;
}

function getPageNumbers(current: number, last: number, delta = 2) {
    const pages: (number | '...')[] = [];
    const range = [];

    for (let i = Math.max(2, current - delta); i <= Math.min(last - 1, current + delta); i++) {
        range.push(i);
    }

    let l: number | undefined;
    pages.push(1);

    for (const i of range) {
        if (l && i - l > 1) {
            pages.push('...');
        }
        pages.push(i);
        l = i;
    }

    if (last > 1) {
        if (l && last - l > 1) {
            pages.push('...');
        }
        pages.push(last);
    }

    return pages;
}

const Pagination: React.FC<PaginationProps> = ({ pagination, routeName, params = {} }) => {
    const { current_page, last_page, next_page_url, prev_page_url } = pagination;

    if (last_page <= 1) return null;

    const goToPage = (page: number) => {
        router.get(route(routeName), { ...params, page }, { preserveState: true, replace: true });
    };

    return (
        <div className="flex items-center justify-end  gap-2 mt-4">
            <Button variant='outline'
                className={`px-3 py-1 rounded-md border transition-colors ${
                    !prev_page_url
                        ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => goToPage(current_page - 1)}
                disabled={!prev_page_url}
            >
                Précédent
            </Button>

            {getPageNumbers(current_page, last_page).map((p, idx) =>
                p === '...' ? (
                    <span key={idx} className="px-2 text-gray-500">
                        ...
                    </span>
                ) : (
                    <Button
                        variant='outline'
                        key={idx}
                        onClick={() => goToPage(p as number)}
                        className={`px-3 py-1 rounded-md border transition-colors ${
                            p === current_page
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        {p}
                    </Button>
                )
            )}

            <Button
                variant='outline'
                className={`px-3 py-1 rounded-md border transition-colors ${
                    !next_page_url
                        ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => goToPage(current_page + 1)}
                disabled={!next_page_url}
            >
                Suivant
            </Button>
        </div>
    );
};

export default Pagination;
