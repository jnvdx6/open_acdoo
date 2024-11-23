'use client'

import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Accordion } from "@/components/ui/accordion"
import { GroupedEntries } from './GroupedEntries'
import { Skeleton } from "@/components/ui/skeleton"

export function BOETableAccordion({ groupedEntries, isLoading }) {
    if (isLoading) {
        return (
            <div className="w-full space-y-3">
                {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="w-full h-20" />
                ))}
            </div>
        )
    }

    return (
        <div className="w-full border rounded-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[120px]">Fecha</TableHead>
                        <TableHead className="w-[120px]">Código</TableHead>
                        <TableHead>Título</TableHead>
                        <TableHead className="w-[200px]">Análisis</TableHead>
                        <TableHead className="w-[200px]">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
            </Table>
            <Accordion type="multiple" className="w-full">
                {Object.entries(groupedEntries).map(([date, entries]) => (
                    <GroupedEntries key={date} date={date} entries={entries} />
                ))}
            </Accordion>
        </div>
    )
}