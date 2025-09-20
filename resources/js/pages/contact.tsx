import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SharedData } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';

export default function Welcome({ auth } : SharedData) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        message: '',
    });

    const [isSent, setIsSent] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('contact.submit'), {
            onSuccess: () => {
                setIsSent(true);
                reset();
            },
        });
    };

    return (
        <div className="min-h-screen bg-background">
            <Head title="Contact" />
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
                                <Link href={route('home') + '#features'} className="transition-colors hover:text-black">
                                    Pourquoi nous choisir ?
                                </Link>
                                <a href={route('home') + '#how-it-works'} className="transition-colors hover:text-black">
                                    Comment ça marche
                                </a>
                                <Link href={route('contact')} className="text:black underline transition-colors hover:text-black">
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

            {/* Hero Section pour la page de contact */}
            <section className="bg-gray-50 p-8 sm:p-20 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 md:text-5xl dark:text-gray-50">Contactez-nous</h1>
                        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">Nous sommes là pour répondre à toutes vos questions.</p>
                    </motion.div>
                </div>

                {/* Formulaire de contact et informations */}
                <div className="mt-8 rounded-sm bg-white py-20 shadow dark:bg-gray-950">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-12 md:grid-cols-2">
                            {/* Formulaire de contact */}
                            <motion.div
                                initial={{ x: -50, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="space-y-6"
                            >
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Envoyez-nous un message</h2>
                                {isSent && (
                                    <div className="rounded-md bg-green-50 p-4 text-green-700 dark:bg-green-900/20 dark:text-green-300">
                                        Votre message a bien été envoyé !
                                    </div>
                                )}
                                <form onSubmit={submit} className="space-y-6">
                                    <div>
                                        <Label htmlFor="name">Votre nom</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="mt-1"
                                        />
                                        {errors.name && <div className="mt-1 text-sm text-red-500">{errors.name}</div>}
                                    </div>
                                    <div>
                                        <Label htmlFor="email">Votre email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="mt-1"
                                        />
                                        {errors.email && <div className="mt-1 text-sm text-red-500">{errors.email}</div>}
                                    </div>
                                    <div>
                                        <Label htmlFor="message">Votre message</Label>
                                        <Textarea
                                            id="message"
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            className="mt-1"
                                            rows={4}
                                        />
                                        {errors.message && <div className="mt-1 text-sm text-red-500">{errors.message}</div>}
                                    </div>
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Envoi en cours...' : 'Envoyer le message'}
                                    </Button>
                                </form>
                            </motion.div>
                            {/* Informations de contact */}
                            <motion.div
                                initial={{ x: 50, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="space-y-8"
                            >
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Nos coordonnées</h2>
                                <div className="space-y-6">
                                    <Card className="p-4 transition-shadow hover:shadow">
                                        <CardContent className="flex items-start space-x-4 p-0">
                                            <Mail className="mt-1 h-6 w-6 shrink-0 text-primary" />
                                            <div>
                                                <h3 className="text-xl font-semibold">Email</h3>
                                                <p className="text-gray-600 dark:text-gray-300">support@ecivile.gouv.ga</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className="p-4 transition-shadow hover:shadow">
                                        <CardContent className="flex items-start space-x-4 p-0">
                                            <Phone className="mt-1 h-6 w-6 shrink-0 text-primary" />
                                            <div>
                                                <h3 className="text-xl font-semibold">Téléphone</h3>
                                                <p className="text-gray-600 dark:text-gray-300">+241 11 22 33 44</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className="p-4 transition-shadow hover:shadow">
                                        <CardContent className="flex items-start space-x-4 p-0">
                                            <MapPin className="mt-1 h-6 w-6 shrink-0 text-primary" />
                                            <div>
                                                <h3 className="text-xl font-semibold">Adresse</h3>
                                                <p className="text-gray-600 dark:text-gray-300">123 Rue de la Liberté, Libreville, Gabon</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </motion.div>
                        </div>
                    </div>
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
                                    <a href="#" className="transition-colors hover:text-white">
                                        Déclaration de naissance
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="transition-colors hover:text-white">
                                        Suivi de dossier
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="transition-colors hover:text-white">
                                        Télécharger documents
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-4 text-lg">Support</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <a href="#" className="transition-colors hover:text-white">
                                        Centre d'aide
                                    </a>
                                </li>
                                <li>
                                    <a href="/contact" className="transition-colors hover:text-white">
                                        Nous contacter
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="transition-colors hover:text-white">
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
