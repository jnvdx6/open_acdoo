import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { ExternalLink, AlertTriangle, Scale, Building2, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Componente para vista móvil de una sentencia
const MobileSentenceCard = ({ sentence }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    const getDelitoColor = (probability) => {
        if (probability >= 75) return 'text-red-500 bg-red-50';
        if (probability >= 50) return 'text-orange-500 bg-orange-50';
        if (probability >= 25) return 'text-yellow-500 bg-yellow-50';
        return 'text-green-500 bg-green-50';
    };

    const getEvidenciaColor = (kpi) => {
        if (kpi <= 25) return 'text-red-500';
        if (kpi <= 50) return 'text-orange-500';
        if (kpi <= 75) return 'text-yellow-500';
        return 'text-green-500';
    };

    return (
        <Card className="p-4 space-y-3">
            <div className="flex items-start justify-between">
                <div>
                    <div className="text-sm font-medium line-clamp-2">{sentence.titulo}</div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <Building2 className="h-3 w-3" />
                        <span className="line-clamp-1">{sentence.tribunal_responsable}</span>
                    </div>
                </div>
                <CollapsibleTrigger 
                    onClick={() => setIsOpen(!isOpen)}
                    className="mt-1"
                >
                    {isOpen ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                </CollapsibleTrigger>
            </div>

            <div className="flex items-center justify-between text-xs">
                <div className="font-mono">
                    {format(new Date(sentence.fecha_sentencia), "dd/MM/yyyy")}
                </div>
                <div className="font-mono text-muted-foreground">{sentence.roj}</div>
            </div>

            <CollapsibleContent className="space-y-3">
                <div className="flex items-center gap-4 pt-2">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <div className={`flex items-center gap-2 px-2 py-1 rounded-md ${getDelitoColor(sentence.probabilidad_delito)}`}>
                                    <AlertTriangle className="h-4 w-4" />
                                    <span className="text-sm">{Math.round(sentence.probabilidad_delito)}%</span>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Probabilidad de delito</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="flex items-center gap-2">
                                    <Scale className={`h-4 w-4 ${getEvidenciaColor(sentence.kpi_evidencia)}`} />
                                    <span className="text-sm">{sentence.kpi_evidencia}%</span>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>KPI de Evidencia</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>

                <div className="flex items-center gap-2 pt-2">
                    <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-1"
                        asChild
                    >
                        <a 
                            href={`https://www.poderjudicial.es/search/documento/NN/${sentence.roj}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2"
                        >
                            <ExternalLink className="h-4 w-4" />
                            <span>Ver original</span>
                        </a>
                    </Button>
                    <Button 
                        size="sm"
                        className="flex-1 bg-[#FF6B35] hover:bg-[#FF6B35]/90"
                        asChild
                    >
                        <Link href={`/documentos/jurisprudencia/${sentence.id}`}>
                            Ver detalles
                        </Link>
                    </Button>
                </div>
            </CollapsibleContent>
        </Card>
    );
};

// Componente de tabla desktop
const DesktopSentenceRow = ({ sentence }) => {
    const getDelitoColor = (probability) => {
        if (probability >= 75) return 'text-red-500';
        if (probability >= 50) return 'text-orange-500';
        if (probability >= 25) return 'text-yellow-500';
        return 'text-green-500';
    };

    const getEvidenciaColor = (kpi) => {
        if (kpi <= 25) return 'text-red-500';
        if (kpi <= 50) return 'text-orange-500';
        if (kpi <= 75) return 'text-yellow-500';
        return 'text-green-500';
    };

    return (
        <TableRow className="hover:bg-muted/50">
            <TableCell className="font-mono text-xs">
                {format(new Date(sentence.fecha_sentencia), "dd/MM/yyyy")}
            </TableCell>
            <TableCell>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger className="text-left">
                            <div className="max-w-[400px] line-clamp-2">
                                {sentence.titulo}
                            </div>
                            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                <Building2 className="h-4 w-4" />
                                <span className="line-clamp-1">{sentence.tribunal_responsable}</span>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="max-w-xl">{sentence.titulo}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </TableCell>
            <TableCell>
                <div className="flex items-center gap-4">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <div className={`flex items-center gap-2 px-2 py-1 rounded-md ${getDelitoColor(sentence.probabilidad_delito)} bg-opacity-10`}>
                                    <AlertTriangle className="h-4 w-4" />
                                    <span>{Math.round(sentence.probabilidad_delito)}%</span>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Probabilidad de delito</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="flex items-center gap-2">
                                    <Scale className={`h-4 w-4 ${getEvidenciaColor(sentence.kpi_evidencia)}`} />
                                    <span>{sentence.kpi_evidencia}%</span>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>KPI de Evidencia</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </TableCell>
            <TableCell>
                <div className="flex items-center gap-2">
                    <Button 
                        variant="ghost" 
                        size="sm"
                        className="hover:bg-transparent"
                        asChild
                    >
                        <a 
                            href={`https://www.poderjudicial.es/search/documento/NN/${sentence.roj}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <ExternalLink className="h-4 w-4" />
                        </a>
                    </Button>
                    <Button 
                        size="sm"
                        className="bg-[#FF6B35] hover:bg-[#FF6B35]/90"
                        asChild
                    >
                        <Link href={`/documentos/jurisprudencia/${sentence.id}`}>
                            Ver detalles
                        </Link>
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    );
};

// Componente principal
export function SentencesTable({ sentences, isLoading }) {
    if (isLoading) {
        return (
            <div className="w-full space-y-3">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-full h-20 bg-muted animate-pulse rounded-md" />
                ))}
            </div>
        );
    }

    // Vista móvil
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
        return (
            <div className="space-y-4">
                {sentences.map((sentence) => (
                    <Collapsible key={sentence.id}>
                        <MobileSentenceCard sentence={sentence} />
                    </Collapsible>
                ))}
            </div>
        );
    }

    // Vista desktop
    return (
        <div className="w-full border rounded-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Fecha</TableHead>
                        <TableHead>Título / Tribunal</TableHead>
                        <TableHead className="w-[250px]">Análisis</TableHead>
                        <TableHead className="w-[150px]">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sentences.map((sentence) => (
                        <DesktopSentenceRow key={sentence.id} sentence={sentence} />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default SentencesTable;