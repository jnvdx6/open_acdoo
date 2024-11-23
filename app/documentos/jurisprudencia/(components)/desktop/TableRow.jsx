import React from 'react';
import { format } from 'date-fns';
import { 
    ExternalLink, 
    Building2,
    ChevronDown,
    Info,
    Calendar,
    User,
    Tags
} from 'lucide-react';
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MetricsGroup } from '../metrics/MetricsGroup';
import { DetailItem } from '../common/DetailItem';
import { ProgressBar } from '../metrics/ProgressBar';

const formatDate = (dateString) => {
    if (!dateString) return null;
    try {
        return format(new Date(dateString), "dd/MM/yyyy");
    } catch (error) {
        console.error('Error formatting date:', error);
        return null;
    }
};

const formatKeywords = (keywordsString) => {
    if (!keywordsString) return [];
    try {
        return JSON.parse(keywordsString);
    } catch (error) {
        console.error('Error parsing keywords:', error);
        return [];
    }
};

export const SentenceTableRow = ({ sentence, expanded, onToggleExpand }) => {
    const formattedDate = formatDate(sentence.fecha_sentencia);
    const keywords = formatKeywords(sentence.palabras_clave);
    
    return (
        <>
            <TableRow className="hover:bg-muted/50">
                <TableCell>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onToggleExpand}
                    >
                        <ChevronDown 
                            className={`h-4 w-4 transition-transform ${
                                expanded ? 'rotate-180' : ''
                            }`}
                        />
                    </Button>
                </TableCell>
                <TableCell className="font-mono text-xs">
                    {formattedDate || 'Fecha no disponible'}
                    {sentence.roj && (
                        <div className="text-xs text-muted-foreground mt-1">
                            {sentence.roj}
                        </div>
                    )}
                </TableCell>
                <TableCell>
                    <div className="space-y-1">
                        <div className="font-medium line-clamp-2">
                            {sentence.titulo || 'Sin título'}
                        </div>
                        {sentence.tribunal_responsable && (
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Building2 className="h-3 w-3" />
                                <span className="line-clamp-1">
                                    {sentence.tribunal_responsable}
                                </span>
                            </div>
                        )}
                    </div>
                </TableCell>
                <TableCell>
                    <MetricsGroup metrics={sentence} variant="compact" />
                </TableCell>
                <TableCell>
                    {keywords.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                            {keywords.slice(0, 3).map((tag, index) => (
                                <Badge 
                                    key={index} 
                                    variant="secondary"
                                    className="text-xs"
                                >
                                    {tag}
                                </Badge>
                            ))}
                            {keywords.length > 3 && (
                                <Badge 
                                    variant="outline" 
                                    className="text-xs"
                                >
                                    +{keywords.length - 3}
                                </Badge>
                            )}
                        </div>
                    )}
                </TableCell>
                <TableCell>
                    <div className="flex justify-end">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className="w-8 h-8 p-0"
                                >
                                    <Info className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-52">
                                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link 
                                        href={`/documentos/jurisprudencia/${sentence.id}`}
                                        className="cursor-pointer"
                                    >
                                        Ver detalles
                                    </Link>
                                </DropdownMenuItem>
                                {sentence.roj && (
                                    <DropdownMenuItem asChild>
                                        <a 
                                            href={`https://www.poderjudicial.es/search/documento/NN/${sentence.roj}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 cursor-pointer"
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                            Abrir original
                                        </a>
                                    </DropdownMenuItem>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </TableCell>
            </TableRow>
            {expanded && <ExpandedContent sentence={sentence} />}
        </>
    );
};

const ExpandedContent = ({ sentence }) => {
    const publicationDate = formatDate(sentence.fecha_publicacion);
    const keywords = formatKeywords(sentence.palabras_clave);

    return (
        <TableRow>
            <TableCell colSpan={6} className="p-4 bg-muted/30">
                <div className="rounded-lg p-4 space-y-6">
                    <div className="grid grid-cols-3 gap-6">
                        {/* Información Básica */}
                        <div className="space-y-3">
                            <h4 className="font-medium text-sm">Información Básica</h4>
                            <div className="space-y-2">
                                {publicationDate && (
                                    <DetailItem 
                                        icon={Calendar}
                                        label="Publicación"
                                        value={publicationDate}
                                    />
                                )}
                                {sentence.jurisdiccion && (
                                    <DetailItem 
                                        icon={Building2}
                                        label="Jurisdicción"
                                        value={sentence.jurisdiccion}
                                    />
                                )}
                                {sentence.ponente && (
                                    <DetailItem 
                                        icon={User}
                                        label="Ponente"
                                        value={sentence.ponente}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Métricas */}
                        <div className="space-y-3">
                            <h4 className="font-medium text-sm">Métricas de Calidad</h4>
                            <div className="space-y-3">
                                {sentence.kpi_coherencia && (
                                    <ProgressBar 
                                        label="Coherencia"
                                        value={sentence.kpi_coherencia}
                                    />
                                )}
                                {sentence.kpi_fundamentacion && (
                                    <ProgressBar 
                                        label="Fundamentación"
                                        value={sentence.kpi_fundamentacion}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Impacto */}
                        <div className="space-y-3">
                            <h4 className="font-medium text-sm">Impacto y Relevancia</h4>
                            <div className="space-y-2">
                                {sentence.kpi_impacto_social && (
                                    <DetailItem 
                                        label="Impacto Social"
                                        value={`${sentence.kpi_impacto_social}/10`}
                                    />
                                )}
                                {sentence.kpi_precedentes && (
                                    <DetailItem 
                                        label="Precedentes"
                                        value={`${sentence.kpi_precedentes}/10`}
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Palabras Clave Completas */}
                    {keywords.length > 0 && (
                        <div className="space-y-2">
                            <h4 className="font-medium text-sm flex items-center gap-2">
                                <Tags className="h-4 w-4" />
                                Palabras clave
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                                {keywords.map((tag, index) => (
                                    <Badge key={index} variant="secondary">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    <Button 
                        className="bg-[#FF6B35] hover:bg-[#FF6B35]/90"
                        asChild
                    >
                        <Link href={`/documentos/jurisprudencia/${sentence.id}`}>
                            Ver análisis completo
                        </Link>
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    );
};