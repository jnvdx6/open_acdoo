import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { SearchBar } from './SearchBar';
import Link from 'next/link';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { User, Building2, Briefcase, Search, ArrowRight, Database, BrainCircuit, Clock, Users, RefreshCw } from 'lucide-react';
import { SearchButton } from './SearchButton';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const PersonaCard = ({ persona }) => {
    const getInitials = (nombre, apellidos) => {
        const firstInitial = nombre ? nombre.charAt(0) : '';
        const lastInitial = apellidos ? apellidos.charAt(0) : '';
        return (firstInitial + lastInitial).toUpperCase();
    };

    return (
        <Card className="shadow-sm hover:shadow-md transition-all duration-200 dark:bg-neutral-800 dark:border-neutral-700">
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 pb-2">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center shrink-0">
                        {persona.foto ? (
                            <>
                                <Image
                                    src={persona.foto}
                                    alt={`Foto de ${persona.nombre}`}
                                    fill
                                    className="object-cover"
                                />
                                <div className="hidden absolute inset-0 items-center justify-center bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 text-base sm:text-lg font-semibold">
                                    {getInitials(persona.nombre, persona.apellidos)}
                                </div>
                            </>
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 text-base sm:text-lg font-semibold">
                                {getInitials(persona.nombre, persona.apellidos)}
                            </div>
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <CardTitle className="text-base sm:text-lg dark:text-white">
                            <Link
                                href={`/database/personas/${persona.id}`}
                                className="hover:text-[#FF6B35] transition-colors inline-flex items-center gap-2 truncate"
                            >
                                {persona.nombre} {persona.apellidos}
                            </Link>
                        </CardTitle>
                    </div>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto text-neutral-600 dark:text-neutral-300 hover:text-[#FF6B35] hover:border-[#FF6B35] transition-colors text-sm dark:border-neutral-600"
                >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Actualizar
                </Button>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {persona.cargo_actual && (
                        <div className="flex items-start gap-3">
                            <Building2 className="h-5 w-5 text-neutral-400 dark:text-neutral-500 mt-0.5 shrink-0" />
                            <div className="min-w-0">
                                <p className="font-medium text-sm text-neutral-600 dark:text-neutral-400">Cargo actual</p>
                                <p className="text-sm sm:text-base text-neutral-900 dark:text-white truncate">{persona.cargo_actual}</p>
                            </div>
                        </div>
                    )}
                    {persona.partido_politico && (
                        <div className="flex items-start gap-3">
                            <div className="h-5 w-5 rounded-full bg-[#FF6B35] mt-0.5 shrink-0" />
                            <div className="min-w-0">
                                <p className="font-medium text-sm text-neutral-600 dark:text-neutral-400">Partido político</p>
                                <p className="text-sm sm:text-base text-neutral-900 dark:text-white truncate">{persona.partido_politico}</p>
                            </div>
                        </div>
                    )}
                    {persona.profesion && (
                        <div className="flex items-start gap-3">
                            <Briefcase className="h-5 w-5 text-neutral-400 dark:text-neutral-500 mt-0.5 shrink-0" />
                            <div className="min-w-0">
                                <p className="font-medium text-sm text-neutral-600 dark:text-neutral-400">Profesión</p>
                                <p className="text-sm sm:text-base text-neutral-900 dark:text-white truncate">{persona.profesion}</p>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

const ResultsList = ({ results }) => (
    <div className="grid gap-4 sm:gap-6">
        {results.map(persona => (
            <PersonaCard key={persona.id} persona={persona} />
        ))}
    </div>
);

const ProcessInfoCard = () => (
    <div className="w-full max-w-4xl mx-auto mt-8">
        <Card className="bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 border-neutral-200 dark:border-neutral-700">
            <CardHeader className="space-y-2">
                <CardTitle className="text-xl sm:text-2xl text-neutral-900 dark:text-white">
                    Cómo funciona nuestra investigación
                </CardTitle>
                <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
                    Utilizamos tecnología avanzada para construir la base de datos más completa y transparente
                </p>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="mt-1 bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg shrink-0">
                                <Search className="h-5 w-5 text-[#FF6B35]" />
                            </div>
                            <div className="space-y-1 min-w-0">
                                <h3 className="font-semibold text-neutral-900 dark:text-white">Solicitud de investigación</h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                    Cuando encuentras una persona sin información, nuestro sistema registra automáticamente una solicitud de investigación
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="mt-1 bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg shrink-0">
                                <BrainCircuit className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="space-y-1 min-w-0">
                                <h3 className="font-semibold text-neutral-900 dark:text-white">Análisis con IA</h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                    Nuestros algoritmos de IA procesan múltiples fuentes de información para recopilar y verificar datos de forma objetiva
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="mt-1 bg-green-100 dark:bg-green-900/30 p-2 rounded-lg shrink-0">
                                <Database className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div className="space-y-1 min-w-0">
                                <h3 className="font-semibold text-neutral-900 dark:text-white">Base de datos en crecimiento</h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                    Cada investigación enriquece nuestra base de datos, creando un recurso colectivo cada vez más valioso
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="mt-1 bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg shrink-0">
                                <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div className="space-y-1 min-w-0">
                                <h3 className="font-semibold text-neutral-900 dark:text-white">Transparencia colectiva</h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                    Tu participación ayuda a construir una sociedad más transparente y mejor informada
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 sm:mt-8 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
                    <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-neutral-600 dark:text-neutral-400 shrink-0" />
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            Las investigaciones se procesan por orden de solicitud. El tiempo de procesamiento puede variar según la complejidad y disponibilidad de la información.
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
);

async function searchPersonas(searchTerm) {
    if (!searchTerm) return { data: [], count: 0 };

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data, error, count } = await supabase
        .from('personas')
        .select(`
            id,
            nombre,
            apellidos,
            cargo_actual,
            partido_politico,
            profesion,
            foto
        `, { count: 'exact' })
        .or(`nombre.ilike.%${searchTerm}%,apellidos.ilike.%${searchTerm}%`)
        .limit(10);

    if (error) throw error;
    return { data, count };
}

export default async function PersonasSearchPage({ searchParams }) {
    const searchTerm = searchParams.q || '';
    const { data: results, count } = await searchPersonas(searchTerm);

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
            <div className="container mx-auto px-4 py-6 sm:py-8 space-y-6 sm:space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
                            Búsqueda de Personas
                        </h1>
                        <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400">
                            Encuentra información sobre personas en nuestra base de datos
                        </p>
                    </div>
                    <Link
                        href="/database/personas"
                        className="inline-flex items-center text-[#FF6B35] hover:text-[#ff8555] transition-colors font-medium gap-2 text-sm sm:text-base"
                    >
                        Ver base de datos completa
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                <div className="w-full max-w-2xl mx-auto space-y-4 sm:space-y-6">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-neutral-400" />
                        </div>
                        <SearchBar
                            initialSearch={searchTerm}
                            className="w-full pl-10 h-10 sm:h-12 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg sm:rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-[#FF6B35] focus-within:border-[#FF6B35] transition-all duration-200"
                            placeholder="Busca por nombre o apellidos..."
                        />
                    </div>

                    {searchTerm && (
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                                <Badge variant="secondary" className="rounded-full bg-neutral-100 dark:bg-neutral-800">
                                    {count} resultados
                                </Badge>
                                <span>para "{searchTerm}"</span>
                            </div>
                            <SearchButton searchTerm={searchTerm} />
                        </div>
                    )}
                </div>

                {searchTerm && results.length > 0 ? (
                    <ResultsList results={results} />
                ) : searchTerm ? (
                    <div className="space-y-6">
                        <Alert variant="warning" className="bg-orange-50 dark:bg-orange-900/30 text-orange-900 dark:text-orange-200 border-orange-200 dark:border-orange-900/50">
                            <AlertDescription>
                                <p>No se encontraron resultados para "{searchTerm}"</p>
                            </AlertDescription>
                        </Alert>
                    </div>
                ) : (
                    <div className="text-center text-neutral-500 dark:text-neutral-400 py-8 sm:py-12">
                        <ProcessInfoCard />
                    </div>
                )}
            </div>
        </div>
    );
}