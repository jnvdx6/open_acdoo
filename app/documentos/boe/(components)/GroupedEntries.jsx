"use client"
import { useState } from 'react';
import { TableCell, TableRow } from "@/components/ui/table"
import Link from 'next/link'
import { ChevronDown, ChevronRight } from 'lucide-react'

export default function GroupedEntries({ date, entries }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <TableRow className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <TableCell colSpan={6} className="font-bold">
                    <div className="flex items-center">
                        {isOpen ? <ChevronDown className="mr-2" /> : <ChevronRight className="mr-2" />}
                        {date} ({entries.length} entradas)
                    </div>
                </TableCell>
            </TableRow>
            {isOpen && entries.map((entry) => (
                <TableRow key={entry.id}>
                    <TableCell></TableCell>
                    <TableCell>{entry.codigo_boe}</TableCell>
                    <TableCell className='truncate max-w-[25rem]'>{entry.titulo}</TableCell>
                    <TableCell>{(entry.probabilidad_corrupcion * 100).toFixed(2)}%</TableCell>
                    <TableCell>{entry.kpi_transparencia}</TableCell>
                    <TableCell>
                        <Link href={`/documentos/boe/${entry.id}`} passHref>
                            <button className="bg-[#FF6B35] text-white hover:bg-[#FF8C35] px-4 py-2 rounded">
                                Ver detalles
                            </button>
                        </Link>
                    </TableCell>
                </TableRow>
            ))}
        </>
    )
}