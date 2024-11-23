import React from 'react';
import { format } from 'date-fns';
import { 
    ExternalLink, 
    Building2, 
    ChevronDown, 
    ChevronUp,
    Calendar,
    User,
    Tags,
    Lightbulb
} from 'lucide-react';
import {
    Card,
    CardContent,
    CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { MetricsGroup } from '../metrics/MetricsGroup';
import { DetailItem } from '../common/DetailItem';
import { ProgressBar } from '../metrics/ProgressBar';
import Link from 'next/link';

const formatDate = (dateString) => {
    if (!dateString) return null;
    try {
        return format(new Date(dateString), "dd/MM/yyyy");
    } catch (error) {
        console.error('Error formatting date:', error);
        return null;
    }
};

export const MobileSentenceCard = ({ sentence }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    // Safely parse palabras_clave
    const keywords = React.useMemo(() => {
        if (!sentence.palabras_clave) return [];
        try {
            return JSON.parse(sentence.palabras_clave);
        } catch (error) {
            console.error('Error parsing keywords:', error);
            return [];
        }
    }, [sentence.palabras_clave]);
    
    return (
        <Card className="w-full">
            <CardContent className="pt-4">
                <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                    <div className="space-y-3">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                            <div className="space-y-1 flex-1 mr-2">
                                <h3 className="font-medium line-clamp-2">{sentence.titulo || 'Sin título'}</h3>
                                {sentence.tribunal_responsable && (
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Building2 className="h-3 w-3" />
                                        <span className="line-clamp-1">{sentence.tribunal_responsable}</span>
                                    </div>
                                )}
                            </div>
                            <CollapsibleTrigger className="mt-1">
                                {isOpen ? (
                                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                )}
                            </CollapsibleTrigger>
                        </div>

                        {/* Basic Info */}
                        <div className="flex items-center justify-between text-sm">
                            {sentence.fecha_sentencia && (
                                <Badge variant="outline" className="font-mono">
                                    {formatDate(sentence.fecha_sentencia) || 'Fecha no disponible'}
                                </Badge>
                            )}
                            {sentence.roj && (
                                <Badge variant="secondary" className="font-mono">
                                    {sentence.roj}
                                </Badge>
                            )}
                        </div>

                        {/* Key Metrics */}
                        <MetricsGroup metrics={sentence} layout="row" />

                        {/* Extended Info */}
                        <CollapsibleContent className="space-y-4">
                            <Separator className="my-4" />
                            
                            {/* Detailed Info */}
                            <div className="space-y-3">
                                {sentence.fecha_publicacion && (
                                    <DetailItem 
                                        icon={Calendar}
                                        label="Fecha publicación"
                                        value={formatDate(sentence.fecha_publicacion) || 'Fecha no disponible'}
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

                            {/* Progress Metrics */}
                            {(sentence.kpi_coherencia || sentence.kpi_fundamentacion) && (
                                <>
                                    <Separator className="my-4" />
                                    <div className="space-y-3">
                                        {sentence.kpi_coherencia && (
                                            <ProgressBar 
                                                value={sentence.kpi_coherencia} 
                                                label="Coherencia"
                                            />
                                        )}
                                        {sentence.kpi_fundamentacion && (
                                            <ProgressBar 
                                                value={sentence.kpi_fundamentacion} 
                                                label="Fundamentación"
                                            />
                                        )}
                                    </div>
                                </>
                            )}

                            {/* Tags */}
                            {keywords.length > 0 && (
                                <>
                                    <Separator className="my-4" />
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Tags className="h-4 w-4" />
                                            <span>Palabras clave</span>
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {keywords.slice(0, 5).map((tag, index) => (
                                                <Badge key={index} variant="secondary">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </CollapsibleContent>
                    </div>
                </Collapsible>
            </CardContent>
            
            <CardFooter className="flex gap-2 p-4">
                {sentence.roj && (
                    <Button 
                        variant="outline" 
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
                )}
                <Button 
                    className="flex-1 bg-[#FF6B35] hover:bg-[#FF6B35]/90"
                    asChild
                >
                    <Link href={`/documentos/jurisprudencia/${sentence.id}`}>
                        Ver detalles
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
};