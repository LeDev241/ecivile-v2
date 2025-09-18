import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function HeaderApp({ auth }) {
    return (
        <>
            {/* Header */}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="relative z-50 border-b bg-white/95 shadow-sm backdrop-blur-sm"
            >
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo + Titre */}
                        <div className="flex items-center space-x-2">
                            <div className="rounded-md bg-blue-500 p-2">
                                <img src="/logo.svg" alt="Logo" className="h-7 w-7 text-white" />
                            </div>
                            <span className="text-xl font-semibold text-primary">eCivile</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="hidden items-center space-x-6 text-sm text-gray-600 md:flex">
                                <Link href={route('welcome') + '#features'} className="transition-colors hover:text-black">
                                    Pourquoi nous choisir ?
                                </Link>
                                <Link href={route('welcome') + '#how-it-works'} className="transition-colors hover:text-black">
                                    Comment ça marche
                                </Link>
                                <Link href={route('contact')} className="underline transition-colors hover:text-black">
                                    Nous contacter
                                </Link>
                            </div>
                            <div className="flex items-center gap-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                    >
                                        Tableau de bord
                                    </Link>
                                ) : (
                                    <Link
                                        href={route('login')}
                                        className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                    >
                                        Se connecter
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.nav>
        </>
    );
}
