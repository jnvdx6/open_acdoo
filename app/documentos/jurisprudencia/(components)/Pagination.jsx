'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export const Pagination = ({ 
    currentPage, 
    totalPages, 
    filteredCount, 
    itemsPerPage, 
    setTableLoading 
}) => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const handlePageChange = (newPage) => {
        setTableLoading(true)
        
        const params = new URLSearchParams(searchParams)
        params.set('page', newPage.toString())
        
        // Usar router.replace en lugar de push para evitar entradas en el historial
        router.replace(`${pathname}?${params.toString()}`)
        
        // Forzar la revalidación de los datos
        router.refresh()
    }

    // Calcular rango de páginas a mostrar
    const getPageNumbers = () => {
        let pages = []
        if (totalPages <= 5) {
            pages = Array.from({ length: totalPages }, (_, i) => i + 1)
        } else if (currentPage <= 3) {
            pages = [1, 2, 3, 4, 5]
        } else if (currentPage >= totalPages - 2) {
            pages = Array.from({ length: 5 }, (_, i) => totalPages - 4 + i)
        } else {
            pages = Array.from({ length: 5 }, (_, i) => currentPage - 2 + i)
        }
        return pages
    }

    return (
        <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Mostrando {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredCount)} de {filteredCount} entradas
            </p>
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Anterior
                </Button>

                <div className="flex items-center gap-1">
                    {getPageNumbers().map((pageNum) => (
                        <Button
                            key={pageNum}
                            variant={currentPage === pageNum ? "default" : "outline"}
                            size="sm"
                            onClick={() => handlePageChange(pageNum)}
                            className="min-w-[40px]"
                        >
                            {pageNum}
                        </Button>
                    ))}
                </div>

                <Button
                    variant="outline"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Siguiente
                </Button>
            </div>
        </div>
    )
}