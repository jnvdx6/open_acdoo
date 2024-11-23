import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    AlertTriangle,
    MessageSquare,
    Users,
    Building,
    Flag,
    BarChart,
    Bot,
    TrendingUp,
    Network,
    Clock
} from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import ShareButton from '@/components/ShareButton';

const vibrantOrange = "#FF6B35";

export default async function NewsDetailPage({ params: { id } }) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    // Fetch de la noticia desde la base de datos
    const { data: newsData, error } = await supabase
        .from('noticias_articulos')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching news:', error);
        // Aquí podrías renderizar un componente de error o redireccionar
        return <div>Error al cargar la noticia</div>;
    }

    if (!newsData) {
        // Manejar el caso de que no se encuentre la noticia
        return <div>Noticia no encontrada</div>;
    }

    // Aquí podrías hacer fetch de datos adicionales como noticias relacionadas o la línea de tiempo
    // Por ahora, usaremos datos de ejemplo para estos
    const relatedNews = [
        { id: '2', titulo: 'Oposición exige dimisiones por escándalo de corrupción', fecha: '2024-10-18' },
        { id: '3', titulo: 'Fiscalía abre investigación formal sobre sobornos en el Ayuntamiento', fecha: '2024-10-19' },
        { id: '4', titulo: 'Empresarios locales niegan implicación en trama corrupta', fecha: '2024-10-20' }
    ];

    const timeline = [
        { fecha: '2024-01-15', evento: 'Primeras sospechas de irregularidades en contratos públicos' },
        { fecha: '2024-03-22', evento: 'Denuncia anónima recibida por la Fiscalía' },
        { fecha: '2024-06-10', evento: 'Inicio de la investigación policial' },
        { fecha: '2024-10-17', evento: 'Publicación de evidencias implicando a funcionarios' }
    ];

    const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/noticias/${id}`;

    return (
        <div className="container mx-auto p-4 min-h-[80vh] space-y-4">
            <div className="flex justify-between items-center mb-4">
                <Link href="/noticias" passHref>
                    <Button variant="outline">Volver a todas las noticias</Button>
                </Link>
                <ShareButton shareUrl={shareUrl} />
            </div>
            {/* Encabezado de la noticia */}
            <div className="relative h-[400px] rounded-xl overflow-hidden">
                <Image
                    src={newsData.imagen || 'https://picsum.photos/seed/1/1200/600'}
                    alt={newsData.titulo}
                    layout="fill"
                    objectFit="cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-900 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                    <Badge className="mb-4 bg-orange-500">{newsData.categoria}</Badge>
                    <h1 className="text-4xl font-bold mb-2">{newsData.titulo}</h1>
                    <p className="text-xl mb-4">{newsData.descripcion}</p>
                    <div className="flex items-center space-x-4">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>AU</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{newsData.autor}</p>
                            <p className="text-sm opacity-75">{new Date(newsData.fecha_publicacion).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contenido principal, análisis de IA y chatbot */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Contenido de la noticia y chatbot */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="bg-white dark:bg-neutral-800">
                        <CardContent className="prose dark:prose-invert max-w-none pt-6">
                            <p>{newsData.contenido}</p>
                        </CardContent>
                    </Card>

                    {/* Chatbot */}
                    <Card className="bg-orange-50 dark:bg-neutral-800 border-2 border-orange-300">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
                                <Bot size={24} />
                                Chatbot de la Noticia
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4 text-neutral-700 dark:text-neutral-300">Interactúa con nuestro chatbot para obtener más información sobre esta noticia.</p>
                            <div className="bg-white dark:bg-neutral-700 p-4 rounded-lg mb-4 h-48 overflow-y-auto">
                                <p className="text-sm text-neutral-600 dark:text-neutral-300">Aquí aparecerán los mensajes del chat...</p>
                            </div>
                            <div className="flex gap-2">
                                <input type="text" placeholder="Escribe tu pregunta..." className="flex-grow p-2 rounded-lg border border-orange-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100" />
                                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                                    <MessageSquare className="mr-2" size={16} />
                                    Enviar
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Análisis de IA y widgets */}
                <div className="space-y-6">
                    {/* Análisis de IA mejorado */}
                    <Card className="bg-gradient-to-br dark:from-neutral-800 dark:to-neutral-700 border-2 border-orange-200 dark:border-orange-700">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-2xl text-orange-700 dark:text-orange-300">
                                <BarChart size={28} />
                                Análisis de IA
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="font-semibold mb-2 flex items-center gap-2 text-lg text-orange-700 dark:text-orange-300">
                                    <AlertTriangle size={20} />
                                    Riesgo de Corrupción
                                </h3>
                                <Badge variant="destructive" className="text-lg px-3 py-1 bg-orange-500">{newsData.riesgo_corrupcion}</Badge>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2 flex items-center gap-2 text-lg">
                                    <Users size={20} style={{ color: vibrantOrange }} />
                                    Personas Implicadas
                                </h3>
                                <ul className="space-y-2">
                                    {newsData.personas_implicadas && newsData.personas_implicadas.map((persona, index) => (
                                        <li key={index} className="bg-white dark:bg-neutral-800 p-2 rounded-lg shadow">
                                            <span className="font-semibold">{persona.nombre}</span> - {persona.cargo}
                                            <br />
                                            <span className="text-sm text-neutral-600 dark:text-neutral-400">{persona.implicacion}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2 flex items-center gap-2 text-lg">
                                    <Building size={20} style={{ color: vibrantOrange }} />
                                    Entidades Relacionadas
                                </h3>
                                <ul className="space-y-2">
                                    {newsData.entidades_mencionadas && newsData.entidades_mencionadas.map((entidad, index) => (
                                        <li key={index} className="bg-white dark:bg-neutral-800 p-2 rounded-lg shadow">
                                            <span className="font-semibold">{entidad.nombre}</span>
                                            <br />
                                            <span className="text-sm text-neutral-600 dark:text-neutral-400">{entidad.tipo}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2 flex items-center gap-2 text-lg">
                                    <Flag size={20} style={{ color: vibrantOrange }} />
                                    Indicadores Legales
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {newsData.indicadores_legales && newsData.indicadores_legales.map((indicador, index) => (
                                        <Badge key={index} variant="secondary" className="text-sm">{indicador}</Badge>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2 flex items-center gap-2 text-lg">
                                    <TrendingUp size={20} style={{ color: vibrantOrange }} />
                                    Impacto Estimado
                                </h3>
                                <p className="text-2xl font-bold text-red-600 dark:text-red-400">{newsData.impacto_estimado}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2 flex items-center gap-2 text-lg">
                                    <Network size={20} style={{ color: vibrantOrange }} />
                                    Red de Conexiones
                                </h3>
                                <p className="text-sm">{newsData.red_conexiones}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2 flex items-center gap-2 text-lg">
                                    <TrendingUp size={20} style={{ color: vibrantOrange }} />
                                    Tendencias Temporales
                                </h3>
                                <p className="text-sm">{newsData.tendencias_temporales}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Widget de noticias relacionadas */}
                    <Card className="bg-white dark:bg-neutral-800">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
                                <MessageSquare size={24} />
                                Noticias Relacionadas
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                {relatedNews.map((news, index) => (
                                    <li key={index} className="border-b border-orange-200 dark:border-neutral-700 pb-2 last:border-b-0">
                                        <Link href={`/noticias/${news.id}`} className="hover:text-orange-500 transition-colors">
                                            <h4 className="font-semibold text-neutral-800 dark:text-neutral-200">{news.titulo}</h4>
                                            <p className="text-sm text-neutral-600 dark:text-neutral-400">{news.fecha}</p>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Widget de línea de tiempo */}
                    <Card className="bg-white dark:bg-neutral-800">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
                                <Clock size={24} />
                                Línea de Tiempo del Caso
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                {timeline.map((event, index) => (
                                    <li key={index} className="flex items-start">
                                        <div className="bg-orange-500 rounded-full w-3 h-3 mt-1.5 mr-3 flex-shrink-0"></div>
                                        <div>
                                            <p className="font-semibold text-neutral-800 dark:text-neutral-200">{event.fecha}</p>
                                            <p className="text-sm text-neutral-600 dark:text-neutral-400">{event.evento}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}