import { ImageWithFallback } from '@/components/ImageWithFallback';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, FileText, Shield } from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const features = [
        {
            icon: <FileText className="h-12 w-12 text-primary" />,
            title: 'Déclaration simplifiée',
            description: 'Remplissez votre déclaration de naissance en quelques minutes grâce à notre interface intuitive.',
        },
        {
            icon: <Shield className="h-12 w-12 text-primary" />,
            title: 'Sécurisé et conforme',
            description: 'Vos données sont protégées et notre système respecte toutes les réglementations en vigueur.',
        },
        {
            icon: <Clock className="h-12 w-12 text-primary" />,
            title: 'Disponible 24h/24',
            description: "Effectuez vos démarches à tout moment, depuis chez vous ou depuis n'importe où.",
        },

        {
            icon: <CheckCircle className="h-12 w-12 text-primary" />,
            title: 'Traitement rapide',
            description: "Votre dossier est traité rapidement par les services de l'état civil compétents.",
        },
    ];

    const steps = [
        {
            step: '1',
            title: 'Connexion',
            description: 'Connectez vous en quelques clics',
        },
        {
            step: '2',
            title: 'Remplissez le formulaire',
            description: 'Saisissez les informations de votre login',
        },
        {
            step: '3',
            title: 'Votre espace',
            description: 'Acceder à votre tableau de bord et vos fonctions',
        },
    ];

    return (
        <div className="min-h-screen bg-background">
            <Head title="Acceuil" />
            {/* Navigation */}
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
                            <span className="text-xl font-semibold text-primary">eCivile Gabon</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="hidden items-center space-x-6 text-sm text-gray-600 md:flex">
                                <a href="#features" className="underline transition-colors hover:text-black">
                                    Pourquoi nous choisir ?
                                </a>
                                <a href="#how-it-works" className="transition-colors hover:text-black">
                                    Comment ça marche
                                </a>
                                <Link href={route('contact')} className="transition-colors hover:text-black">
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
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                        >
                                            Se connecter
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Navigation */}
                    </div>
                </div>
            </motion.nav>

            {/* Hero Section avec image en fond */}
            <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
                {/* Image de fond */}
                <div className="absolute inset-0 z-0">
                    <ImageWithFallback src="/hero-image.jpg" alt="Famille heureuse avec nouveau-né" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>

                {/* Contenu hero */}
                <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="mx-auto max-w-4xl"
                    >
                        <h1 className="mb-6 text-4xl text-white lg:text-6xl">
                            Déclarez la naissance de votre enfant <span className="text-blue-300">en ligne</span>
                        </h1>
                        <p className="mx-auto mb-8 max-w-3xl text-xl text-white/90 lg:text-2xl">
                            Une plateforme sécurisée et simplifiée pour effectuer votre déclaration de naissance auprès des services de l'état civil,
                            disponible 24h/24.
                        </p>
                        <div className="flex flex-col justify-center gap-4 sm:flex-row">
                            {auth.user ? (
                                <Button variant="outline">
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-block rounded-sm px-5 py-1.5 text-sm leading-normal text-[#1b1b18] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                    >
                                        Retour au tableau de bord
                                    </Link>
                                </Button>
                            ) : (
                                <>
                                    <Button variant="outline">
                                        <Link
                                            href={route('login')}
                                            className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                        >
                                            Se connecter
                                        </Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Éléments décoratifs */}
                <div className="absolute bottom-10 left-10 h-24 w-24 rounded-full bg-blue-300/20 blur-xl"></div>
                <div className="absolute top-20 right-10 h-32 w-32 rounded-full bg-white/10 blur-xl"></div>

                {/* Indicateur de scroll */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 transform text-white/80"
                >
                    <div className="flex flex-col items-center space-y-2">
                        <span className="text-sm">Découvrir</span>
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white/60"
                        >
                            <div className="h-1 w-1 rounded-full bg-white/60"></div>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="bg-white py-20" id="features">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mb-16 text-center"
                    >
                        <h2 className="mb-4 text-3xl text-gray-900 lg:text-4xl">Pourquoi choisir notre plateforme ?</h2>
                        <p className="mx-auto max-w-2xl text-xl text-gray-600">
                            Une solution moderne et sécurisée pour simplifier vos démarches administratives
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="h-full p-6 text-center transition-shadow hover:shadow-lg">
                                    <CardContent className="space-y-4">
                                        <div className="flex justify-center">{feature.icon}</div>
                                        <h3 className="text-xl text-gray-900">{feature.title}</h3>
                                        <p className="text-gray-600">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="bg-gray-50 py-20" id="how-it-works">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mb-16 text-center"
                    >
                        <h2 className="mb-4 text-3xl text-gray-900 lg:text-4xl">Comment ça marche ?</h2>
                        <p className="text-xl text-gray-600">Trois étapes simples pour acceder vos fonctions</p>
                    </motion.div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                <div className="text-center">
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-semibold text-white">
                                        {step.step}
                                    </div>
                                    <h3 className="mb-2 text-xl text-gray-900">{step.title}</h3>
                                    <p className="text-gray-600">{step.description}</p>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className="absolute top-8 left-full -z-10 hidden h-0.5 w-full -translate-x-1/2 bg-gray-300 md:block"></div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-primary py-20 text-white">
                <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="mb-4 text-3xl lg:text-4xl">Prêt à déclarer votre enfant ?</h2>
                        <p className="mx-auto mb-8 max-w-2xl text-xl text-blue-100">
                            Rejoignez des milliers de familles qui ont fait confiance à notre plateforme pour leurs démarches de déclaration de
                            naissance.
                        </p>
                        <div className="flex flex-col justify-center gap-4 sm:flex-row">
                            <Button size="lg" variant="secondary" className="px-8 py-6 text-lg" asChild>
                                <Link href={'login'}>Commencer maintenant</Link>
                            </Button>
                            <Button variant="outline" className="border-white px-8 py-6 text-lg text-white hover:bg-white hover:text-primary" asChild>
                                <Link href={route('contact')}>Nous contacter</Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 py-12 text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                        <div>
                            <div className="mb-4 flex items-center space-x-2">
                                <span className="rounded-md bg-white p-1">
                                    <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
                                </span>

                                <span className="text-xl font-semibold">eCivile Gabon</span>
                            </div>
                            <p className="text-gray-400">La plateforme officielle pour vos déclarations de naissance en ligne.</p>
                        </div>
                        <div>
                            <h3 className="mb-4 text-lg">Services</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <a href="/declaration" className="transition-colors hover:text-white">
                                        Déclaration de naissance
                                    </a>
                                </li>
                                <li>
                                    <a href="/suivi" className="transition-colors hover:text-white">
                                        Suivi de dossier
                                    </a>
                                </li>
                                <li>
                                    <a href="/documents" className="transition-colors hover:text-white">
                                        Télécharger documents
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-4 text-lg">Support</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <a href="/aide" className="transition-colors hover:text-white">
                                        Centre d'aide
                                    </a>
                                </li>
                                <li>
                                    <a href="/contact" className="transition-colors hover:text-white">
                                        Nous contacter
                                    </a>
                                </li>
                                <li>
                                    <a href="/faq" className="transition-colors hover:text-white">
                                        FAQ
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-4 text-lg">Légal</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <a href="/mentions-legales" className="transition-colors hover:text-white">
                                        Mentions légales
                                    </a>
                                </li>
                                <li>
                                    <a href="/confidentialite" className="transition-colors hover:text-white">
                                        Confidentialité
                                    </a>
                                </li>
                                <li>
                                    <a href="/cgu" className="transition-colors hover:text-white">
                                        CGU
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400">
                        <p>&copy; 2025 eCivile Gabon.fr - Tous droits réservés</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
