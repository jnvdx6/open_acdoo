// app/datos/page.js
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import {
    TrendingUp,
    Users,
    Building2,
    Landmark,
    PartyPopper,
    Vote,
    Euro,
    PersonStanding,
    Building,
    BarChart3,
    ArrowUpRight,
    ArrowDownRight,
    GraduationCap,
    Wind,
    FlaskConical
} from "lucide-react";
//import DataStats from './components/DataStats';
//import RankingCard from './components/RankingCard';
import MacroeconomicChart from './MacroeconomicChart';

const vibrantOrange = "#FF6B35";

async function fetchEurostatData() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/eurostat`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Failed to fetch Eurostat data');
    return res.json();
}

export default async function DataHomePage() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const eurostatData = await fetchEurostatData();

    // En una implementación real, estos datos vendrían de la base de datos
    const politicianRankings = {
        title: "Top Políticos",
        description: "Ranking de políticos según índices de transparencia y gestión",
        items: [
            { id: 1, name: "Ana García", rating: 8.5, party: "Partido A", trend: "up" },
            { id: 2, name: "Juan López", rating: 8.2, party: "Partido B", trend: "down" },
            { id: 3, name: "María Ruiz", rating: 8.0, party: "Partido C", trend: "up" },
        ]
    };

    const partyRankings = {
        title: "Top Partidos Políticos",
        description: "Ranking de partidos según índices de transparencia",
        items: [
            { id: 1, name: "Partido A", rating: 7.8, members: 50000, trend: "up" },
            { id: 2, name: "Partido B", rating: 7.5, members: 45000, trend: "down" },
            { id: 3, name: "Partido C", rating: 7.2, members: 40000, trend: "up" },
        ]
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">
                    Panel de Datos España
                </h1>
                <p className="text-neutral-600 dark:text-neutral-300">
                    Monitorización en tiempo real de indicadores económicos y sociales
                </p>
            </div>

            {/* Estadísticas Macroeconómicas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <DataStats
                    title="PIB"
                    value={eurostatData.gdp.value}
                    date={eurostatData.gdp.date}
                    type="gdp"
                    icon={<Euro className="h-4 w-4" />}
                />
                <DataStats
                    title="Deuda Pública"
                    value={eurostatData.debt.value}
                    date={eurostatData.debt.date}
                    type="debt"
                    icon={<Landmark className="h-4 w-4" />}
                />
                <DataStats
                    title="Desempleo"
                    value={eurostatData.unemployment.value}
                    date={eurostatData.unemployment.date}
                    type="unemployment"
                    icon={<PersonStanding className="h-4 w-4" />}
                />
                <DataStats
                    title="Inflación"
                    value={eurostatData.inflation.value}
                    date={eurostatData.inflation.date}
                    type="inflation"
                    icon={<TrendingUp className="h-4 w-4" />}
                />
                <DataStats
                    title="Desempleo Juvenil"
                    value={eurostatData.youthUnemployment.value}
                    date={eurostatData.youthUnemployment.date}
                    type="unemployment"
                    icon={<Users className="h-4 w-4" />}
                />
                <DataStats
                    title="Educación Terciaria"
                    value={eurostatData.tertiaryEducation.value}
                    date={eurostatData.tertiaryEducation.date}
                    type="education"
                    icon={<GraduationCap className="h-4 w-4" />}
                />
                <DataStats
                    title="Energía Renovable"
                    value={eurostatData.renewableEnergy.value}
                    date={eurostatData.renewableEnergy.date}
                    type="energy"
                    icon={<Wind className="h-4 w-4" />}
                />
                <DataStats
                    title="Gasto en I+D"
                    value={eurostatData.rdExpenditure.value}
                    date={eurostatData.rdExpenditure.date}
                    type="research"
                    icon={<FlaskConical className="h-4 w-4" />}
                />
            </div>

            {/* Gráfico Macroeconómico */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BarChart3 size={24} style={{ color: vibrantOrange }} />
                        Evolución Indicadores Macroeconómicos
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <MacroeconomicChart />
                </CardContent>
            </Card>

            {/* Rankings */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                <Link href="/datos/politicos">
                    <RankingCard
                        title={politicianRankings.title}
                        description={politicianRankings.description}
                        items={politicianRankings.items}
                        icon={<Users size={24} style={{ color: vibrantOrange }} />}
                    />
                </Link>

                <Link href="/datos/partidos">
                    <RankingCard
                        title={partyRankings.title}
                        description={partyRankings.description}
                        items={partyRankings.items}
                        icon={<PartyPopper size={24} style={{ color: vibrantOrange }} />}
                    />
                </Link>

                <Link href="/datos/instituciones">
                    <RankingCard
                        title="Top Instituciones"
                        description="Ranking de instituciones según índices de transparencia"
                        items={[
                            { id: 1, name: "Institución A", rating: 8.1, trend: "up" },
                            { id: 2, name: "Institución B", rating: 7.9, trend: "down" },
                            { id: 3, name: "Institución C", rating: 7.7, trend: "up" },
                        ]}
                        icon={<Building2 size={24} style={{ color: vibrantOrange }} />}
                    />
                </Link>
            </div>
        </div>
    );
}

function formatDate(dateString) {
    if (!dateString) {
        return 'Fecha no disponible';
    }

    try {
        if (dateString.includes('Q')) {
            const [year, quarter] = dateString.split('-Q');
            return `Q${quarter} ${year}`;
        }

        const date = new Date(dateString);

        if (isNaN(date.getTime())) {
            throw new Error('Fecha inválida');
        }

        if (dateString.length === 7) {
            return date.toLocaleString('default', { month: 'short', year: 'numeric' });
        } else {
            return date.toLocaleDateString();
        }
    } catch (error) {
        console.error('Error al formatear la fecha:', error);
        return 'Fecha inválida';
    }
}

function formatValue(value, type) {
    if (value == null) {
        return 'N/A';
    }

    try {
        const numValue = Number(value);
        switch (type) {
            case 'gdp':
                return `${(numValue / 1000).toFixed(2)}B€`;
            case 'debt':
                return `${(numValue * 100).toFixed(1)}% PIB`;
            case 'unemployment':
            case 'inflation':
                return `${numValue.toFixed(1)}%`;
            default:
                return numValue.toString();
        }
    } catch (error) {
        console.error('Error al formatear el valor:', error);
        return 'Valor inválido';
    }
}


// Actualiza el componente DataStats para mostrar la fecha del dato
function DataStats({ title, value, date, type, icon }) {
    const formattedValue = formatValue(value, type);
    const formattedDate = formatDate(date);

    return (
        <Card>
            <CardContent className="pt-4">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                            {title}
                        </p>
                        <h3 className="text-2xl font-bold mt-2">{formattedValue}</h3>
                    </div>
                    <div className="p-2 rounded-full bg-orange-100">
                        {icon}
                    </div>
                </div>
                <div className="mt-4">
                    <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                        Dato de: {formattedDate}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}

// components/RankingCard.js
function RankingCard({ title, description, items, icon }) {
    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    {icon}
                    {title}
                </CardTitle>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {items.map((item, index) => (
                        <li key={item.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-lg font-bold text-orange-500">#{index + 1}</span>
                                <div>
                                    <p className="font-medium">{item.name}</p>
                                    {item.party && (
                                        <p className="text-sm text-neutral-500">{item.party}</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold">{item.rating}</span>
                                {item.trend === 'up' ? (
                                    <ArrowUpRight className="h-4 w-4 text-green-600" />
                                ) : (
                                    <ArrowDownRight className="h-4 w-4 text-red-600" />
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}
