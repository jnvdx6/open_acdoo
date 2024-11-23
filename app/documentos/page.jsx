import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, Gavel, Globe, Building2, FileText, LayoutGrid, Database, ChartBar, Landmark, Users, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const colorNaranja = "#FF6B35";

const DirectoryItem = ({ title, href, icon: Icon }) => (
    <a href={href} className="block">
        <Card className="hover:bg-orange-100 dark:hover:bg-orange-900 transition-colors">
            <CardContent className="flex items-center p-4">
                <div className="flex items-center">
                    <Icon className="mr-2 h-5 w-5" style={{ color: colorNaranja }} />
                    <span>{title}</span>
                </div>
            </CardContent>
        </Card>
    </a>
);

const DirectorySection = ({ title, items, icon: Icon }) => (
    <Card className="mb-6 border-t-4" style={{ borderColor: colorNaranja }}>
        <CardHeader>
            <CardTitle className="flex items-center text-xl">
                <Icon className="mr-2" style={{ color: colorNaranja }} />
                {title}
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item, index) => (
                    <DirectoryItem key={index} {...item} />
                ))}
            </div>
        </CardContent>
    </Card>
);

const DocumentDirectory = () => {
    const directories = [
        {
            title: "Boletines Oficiales",
            icon: FileText,
            items: [
                { title: "BOE", href: "/documentos/boe", icon: FileText },
                { title: "BORME", href: "/borme", icon: FileText },
                { title: "Diario Oficial de la UE", href: "/europa", icon: Globe },
                { title: "Boletines Autonómicos", href: "/autonomicos", icon: Building2 },
                { title: "Boletines Provinciales", href: "/provinciales", icon: Building2 },
            ]
        },
        {
            title: "Recursos Legales",
            icon: Gavel,
            items: [
                { title: "Legislación", href: "/buscar/legislacion.php", icon: Book },
                { title: "Tribunal Constitucional", href: "http://hj.tribunalconstitucional.es/", icon: Gavel },
                { title: "Jurisprudencia (CENDOJ)", href: "/documentos/jurisprudencia", icon: Gavel },
                { title: "Doctrina del Ministerio Fiscal", href: "/buscar/fiscalia.php", icon: Gavel },
                { title: "Derechos Fundamentales", href: "/legislacion/derechos_fundamentales.php", icon: Users },
                { title: "Dictámenes del Consejo de Estado", href: "/buscar/consejo_estado.php", icon: Landmark },
                { title: "Abogacía del Estado", href: "/buscar/abogacia_estado.php", icon: Building2 },
                { title: "Derecho de la Unión Europea", href: "/legislacion/union_europea.php", icon: Globe },
                { title: "Colección Histórica: Gazeta (1661-1959)", href: "/diario_gazeta/", icon: Book },
            ]
        },
        {
            title: "Estadísticas y Datos Públicos",
            icon: Database,
            items: [
                { title: "Eurostat", href: "https://ec.europa.eu/eurostat", icon: ChartBar },
                { title: "INE - Instituto Nacional de Estadística", href: "https://www.ine.es/", icon: ChartBar },
                { title: "Portal de Datos Abiertos de la UE", href: "https://data.europa.eu/es", icon: Database },
                { title: "Banco de España - Estadísticas", href: "https://www.bde.es/bde/es/estadis/", icon: Database },
                { title: "OECD Data", href: "https://data.oecd.org/", icon: Globe },
            ]
        }
    ];

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center" style={{ color: colorNaranja }}>Directorio de Documentos</h1>
            
            <Alert className="mb-6 border-l-4" style={{ borderLeftColor: colorNaranja }}>
                <Info className="h-4 w-4" style={{ color: colorNaranja }} />
                <AlertTitle>Acceso Completo</AlertTitle>
                <AlertDescription>
                    Tienes acceso a todas las fuentes documentales y recursos disponibles en el directorio.
                </AlertDescription>
            </Alert>

            <Tabs defaultValue="grid" className="mb-6">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="grid" className="data-[state=active]:bg-orange-200 data-[state=active]:text-orange-900">
                        <LayoutGrid className="mr-2" />Vista de Cuadrícula
                    </TabsTrigger>
                    <TabsTrigger value="list" className="data-[state=active]:bg-orange-200 data-[state=active]:text-orange-900">
                        <FileText className="mr-2" />Vista de Lista
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="grid">
                    {directories.map((directory, index) => (
                        <DirectorySection key={index} {...directory} />
                    ))}
                </TabsContent>
                <TabsContent value="list">
                    <Card className="p-6">
                        {directories.map((directory) => (
                            <div key={directory.title} className="mb-6">
                                <h3 className="text-lg font-semibold mb-2 flex items-center" style={{ color: colorNaranja }}>
                                    <directory.icon className="mr-2" />
                                    {directory.title}
                                </h3>
                                <ul>
                                    {directory.items.map((item, itemIndex) => (
                                        <li key={itemIndex} className="mb-2">
                                            <a 
                                                href={item.href}
                                                className="flex items-center hover:text-orange-600"
                                            >
                                                <item.icon 
                                                    className="mr-2 h-4 w-4"
                                                    style={{ color: colorNaranja }}
                                                />
                                                {item.title}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default DocumentDirectory;