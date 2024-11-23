'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { ExternalLink, AlertTriangle, CheckCircle, ChevronDown, ChevronRight, AlertCircle } from 'lucide-react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from 'next/link'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function GroupedEntries({ date, entries }) {
    const dateId = date.replace(/-/g, '')
    
    return (
        <AccordionItem value={dateId} className="border-none">
            <AccordionTrigger className="px-4 py-2 bg-muted/50 hover:bg-muted hover:no-underline data-[state=open]:bg-muted">
                <div className="flex items-center gap-2">
                    <span className="font-medium">
                        {format(new Date(date), "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
                    </span>
                    <span className="text-sm text-muted-foreground ml-2">
                        ({entries.length} entradas)
                    </span>
                </div>
            </AccordionTrigger>
            <AccordionContent>
                <div className="w-full">
                    <Table>
                        <TableBody>
                            {entries.map((entry) => (
                                <EntryRow key={entry.id} entry={entry} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </AccordionContent>
        </AccordionItem>
    )
}

function EntryRow({ entry }) {
    // Determinar el color del indicador de corrupción
    const getCorruptionColor = (probability) => {
        if (probability >= 75) return 'text-red-500'
        if (probability >= 50) return 'text-orange-500'
        if (probability >= 25) return 'text-yellow-500'
        return 'text-green-500'
    }

    // Determinar el color del KPI de transparencia
    const getTransparencyColor = (kpi) => {
        if (kpi <= 25) return 'text-red-500'
        if (kpi <= 50) return 'text-orange-500'
        if (kpi <= 75) return 'text-yellow-500'
        return 'text-green-500'
    }

    return (
        <TableRow>
            <TableCell className="font-mono text-xs">
                {entry.fecha_publicacion}
            </TableCell>
            <TableCell className="font-mono text-xs">
                {entry.codigo_boe}
            </TableCell>
            <TableCell className="max-w-xl truncate">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger className="text-left max-w-[15rem truncate]">
                            {entry.titulo}
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="max-w-xl">{entry.titulo}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </TableCell>
            <TableCell className='flex justify-between items-center gap-2' >
                {entry.analyzed ? (
                    <>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div className="flex items-center gap-2">
                                        <AlertTriangle 
                                            className={`h-5 w-5 ${getCorruptionColor(entry.probabilidad_corrupcion)}`}
                                        />
                                        <span>{entry.probabilidad_corrupcion * 100}%</span>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Probabilidad de corrupción: {entry.probabilidad_corrupcion}%</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div className="flex items-center gap-2 mt-1">
                                        <CheckCircle 
                                            className={`h-5 w-5 ${getTransparencyColor(entry.kpi_transparencia)}`}
                                        />
                                        <span>{entry.kpi_transparencia}%</span>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>KPI de Transparencia: {entry.kpi_transparencia}%</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </>
                ) : (
                    <div className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-400">No analizado</span>
                    </div>
                )}
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
                            href={`https://boe.es/diario_boe/txt.php?id=${entry.codigo_boe}`}
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
                        <Link href={`/documentos/boe/${entry.id}`}>
                            Ver detalles
                        </Link>
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    )
}