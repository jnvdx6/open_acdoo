'use client'

import React from 'react'
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { GroupedEntries } from './GroupedEntries'

function TableRowSkeleton() {
    return (
        <TableRow className="hover:bg-transparent">
            <td className="p-2"><Skeleton className="h-6 w-24" /></td>
            <td className="p-2"><Skeleton className="h-6 w-32" /></td>
            <td className="p-2"><Skeleton className="h-6 w-96" /></td>
            <td className="p-2"><Skeleton className="h-6 w-24" /></td>
            <td className="p-2"><Skeleton className="h-6 w-24" /></td>
            <td className="p-2"><Skeleton className="h-6 w-24" /></td>
        </TableRow>
    )
}

export function BOETable({ groupedEntries, isLoading }) {
    return (
        <div className="relative">
            <div className={`transition-opacity duration-200 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-32">Fecha</TableHead>
                            <TableHead className="w-32">Código BOE</TableHead>
                            <TableHead>Título</TableHead>
                            <TableHead className="w-32">Prob. Corrupción</TableHead>
                            <TableHead className="w-32">KPI Transparencia</TableHead>
                            <TableHead className="w-20">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            Array(10).fill(null).map((_, i) => (
                                <TableRowSkeleton key={i} />
                            ))
                        ) : (
                            Object.entries(groupedEntries).map(([date, dateEntries]) => (
                                <GroupedEntries 
                                    key={date} 
                                    date={date} 
                                    entries={dateEntries} 
                                />
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                </div>
            )}
        </div>
    )
}
