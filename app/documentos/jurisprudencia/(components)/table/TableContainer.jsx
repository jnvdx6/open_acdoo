'use client'

import React, { useState, useEffect, useCallback, useTransition } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { SentencesTable } from '../SentencesTable'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useDebounce } from 'use-debounce'
import { Loader2, Search, Filter, X } from 'lucide-react'
import { DateRangeSelector } from "./DateRangeSelector"

const ITEMS_PER_PAGE_OPTIONS = [
    { value: '10', label: '10 por página' },
    { value: '20', label: '20 por página' },
    { value: '50', label: '50 por página' },
    { value: '100', label: '100 por página' }
]

const SORT_OPTIONS = [
    { value: 'date-desc', label: 'Fecha (más reciente)' },
    { value: 'date-asc', label: 'Fecha (más antigua)' },
    { value: 'delito-desc', label: 'Prob. Delito (mayor)' },
    { value: 'delito-asc', label: 'Prob. Delito (menor)' },
    { value: 'complejidad-desc', label: 'Complejidad (mayor)' },
    { value: 'complejidad-asc', label: 'Complejidad (menor)' },
    { value: 'impacto-desc', label: 'Impacto Social (mayor)' },
    { value: 'impacto-asc', label: 'Impacto Social (menor)' }
]

const JURISDICTIONS = [
    { value: 'civil', label: 'Civil' },
    { value: 'penal', label: 'Penal' },
    { value: 'contencioso', label: 'Contencioso-Administrativo' },
    { value: 'social', label: 'Social' }
]

export function TableContainer({
    sentences,
    currentPage,
    totalPages,
    startDate,
    endDate,
    itemsPerPage,
    totalSentences,
    currentSentences,
    searchParams: initialSearchParams
}) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()

    // Estado
    const [isLoading, setIsLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState(initialSearchParams.search || '')
    const [debouncedSearch] = useDebounce(searchTerm, 300)
    const [showFilters, setShowFilters] = useState(false)

    const [filters, setFilters] = useState({
        analyzed: initialSearchParams.analyzed || 'all',
        delitoProbMin: initialSearchParams.delitoProbMin || '',
        delitoProbMax: initialSearchParams.delitoProbMax || '',
        evidenciaMin: initialSearchParams.evidenciaMin || '',
        evidenciaMax: initialSearchParams.evidenciaMax || '',
        complejidadMin: initialSearchParams.complejidadMin || '',
        complejidadMax: initialSearchParams.complejidadMax || '',
        sortBy: initialSearchParams.sortBy || 'date-desc',
        //itemsPerPage: itemsPerPage.toString(),
        jurisdiction: initialSearchParams.jurisdiction || 'all',
        category: initialSearchParams.category || 'all'
    })

    // Actualizar URL y refrescar datos
    const updateURL = useCallback((newParams) => {
        startTransition(() => {
            const params = new URLSearchParams(searchParams)

            if (newParams.page === undefined) {
                params.set('page', '1')
            }

            Object.entries(newParams).forEach(([key, value]) => {
                if (value) {
                    params.set(key, value.toString())
                } else {
                    params.delete(key)
                }
            })

            setIsLoading(true)
            router.push(`${pathname}?${params.toString()}`, { scroll: false })
        })
    }, [pathname, router, searchParams])

    // Manejar búsqueda
    useEffect(() => {
        if (debouncedSearch !== initialSearchParams.search) {
            updateURL({ search: debouncedSearch })
        }
    }, [debouncedSearch, updateURL, initialSearchParams.search])

    // Manejar cambios en filtros
    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }))
        const newParams = { ...filters, [key]: value }
        if (key === 'itemsPerPage') {
            newParams.page = 1
        }
        updateURL(newParams)
    }

    // Resetear filtros
    const handleResetFilters = () => {
        setSearchTerm('')
        setFilters({
            analyzed: 'all',
            delitoProbMin: '',
            delitoProbMax: '',
            evidenciaMin: '',
            evidenciaMax: '',
            complejidadMin: '',
            complejidadMax: '',
            sortBy: 'date-desc',
            itemsPerPage: '20',
            jurisdiction: 'all',
            category: 'all'
        })
        router.push(pathname)
    }

    // Resetear estado de carga
    useEffect(() => {
        if (!isPending) {
            setIsLoading(false)
        }
    }, [isPending, sentences])

    console.log(sentences)

    return (
        <Card>
            <CardHeader className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-start md:justify-between">
                    <div className='mb-2 md:mb-0' >
                        <CardTitle>Listado de Sentencias</CardTitle>
                        {startDate && endDate && (
                            <p className="text-sm text-muted-foreground mt-2">
                                {format(parseISO(startDate), "d 'de' MMMM", { locale: es })} -
                                {format(parseISO(endDate), "d 'de' MMMM, yyyy", { locale: es })}
                            </p>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <DateRangeSelector
                            startDate={startDate}
                            endDate={endDate}
                            onDateChange={(range) => {
                                if (range?.from && range?.to) {
                                    updateURL({
                                        startDate: format(range.from, 'yyyy-MM-dd'),
                                        endDate: format(range.to, 'yyyy-MM-dd'),
                                        page: 1
                                    })
                                }
                            }}
                        />
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <Filter className="h-4 w-4 mr-2" />
                            Filtros
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    {/* Barra de búsqueda */}
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar por título, ROJ, ECLI o contenido..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-8"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    updateURL({ search: searchTerm })
                                }
                            }}
                        />
                    </div>

                    {/* Filtros avanzados */}
                    {showFilters && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                            <Select
                                value={filters.analyzed}
                                onValueChange={(value) => handleFilterChange('analyzed', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Estado de análisis" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todas</SelectItem>
                                    <SelectItem value="analyzed">Analizadas</SelectItem>
                                    <SelectItem value="pending">Pendientes</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select
                                value={filters.jurisdiction}
                                onValueChange={(value) => handleFilterChange('jurisdiction', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Jurisdicción" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todas</SelectItem>
                                    {JURISDICTIONS.map(jurisdiction => (
                                        <SelectItem key={jurisdiction.value} value={jurisdiction.value}>
                                            {jurisdiction.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <div className="space-y-2">
                                <label className="text-sm">Prob. Delito (%)</label>
                                <div className="flex gap-2">
                                    <Input
                                        type="number"
                                        placeholder="Min"
                                        value={filters.delitoProbMin}
                                        onChange={(e) => handleFilterChange('delitoProbMin', e.target.value)}
                                        min="0"
                                        max="100"
                                    />
                                    <Input
                                        type="number"
                                        placeholder="Max"
                                        value={filters.delitoProbMax}
                                        onChange={(e) => handleFilterChange('delitoProbMax', e.target.value)}
                                        min="0"
                                        max="100"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm">Complejidad</label>
                                <div className="flex gap-2">
                                    <Input
                                        type="number"
                                        placeholder="Min"
                                        value={filters.complejidadMin}
                                        onChange={(e) => handleFilterChange('complejidadMin', e.target.value)}
                                        min="0"
                                        max="100"
                                    />
                                    <Input
                                        type="number"
                                        placeholder="Max"
                                        value={filters.complejidadMax}
                                        onChange={(e) => handleFilterChange('complejidadMax', e.target.value)}
                                        min="0"
                                        max="100"
                                    />
                                </div>
                            </div>

                            <Select
                                value={filters.sortBy}
                                onValueChange={(value) => handleFilterChange('sortBy', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Ordenar por" />
                                </SelectTrigger>
                                <SelectContent>
                                    {SORT_OPTIONS.map(option => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select
                                value={filters.itemsPerPage}
                                onValueChange={(value) => handleFilterChange('itemsPerPage', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Resultados por página" />
                                </SelectTrigger>
                                <SelectContent>
                                    {ITEMS_PER_PAGE_OPTIONS.map(option => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Button
                                variant="outline"
                                onClick={handleResetFilters}
                                className="w-full md:w-auto"
                            >
                                <X className="h-4 w-4 mr-2" />
                                Resetear filtros
                            </Button>
                        </div>
                    )}
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {(isLoading || isPending) ? (
                    <div className="w-full h-[200px] flex items-center justify-center">
                        <div className="flex flex-col items-center gap-2">
                            <Loader2 className="h-8 w-8 animate-spin" />
                            <p className="text-sm text-muted-foreground">
                                Cargando sentencias...
                            </p>
                        </div>
                    </div>
                ) : (
                    <SentencesTable
                        sentences={sentences}
                        isLoading={isLoading || isPending}
                        onSort={(key) => {
                            const currentSort = filters.sortBy?.split('-') || []
                            const direction = currentSort[1] === 'asc' ? 'desc' : 'asc'
                            handleFilterChange('sortBy', `${key}-${direction}`)
                        }}
                        sortConfig={{
                            key: filters.sortBy?.split('-')[0],
                            direction: filters.sortBy?.split('-')[1]
                        }}
                    />
                )}

                {/* Paginación */}
                <div className="flex items-center justify-between mt-4">
                    <p className="text-sm text-muted-foreground">
                        Mostrando {currentSentences} de {totalSentences} sentencias
                        {startDate && endDate && (
                            <span className="ml-1">
                                ({format(parseISO(startDate), "d MMM", { locale: es })} -
                                {format(parseISO(endDate), "d MMM, yyyy", { locale: es })})
                            </span>
                        )}
                    </p>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            disabled={currentPage === 1 || isLoading || isPending}
                            onClick={() => updateURL({ page: currentPage - 1 })}
                        >
                            {(isLoading || isPending) && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Anterior
                        </Button>

                        {/* Indicadores de página */}
                        <div className="flex items-center gap-1">
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                let pageNum
                                if (totalPages <= 5) {
                                    pageNum = i + 1
                                } else if (currentPage <= 3) {
                                    pageNum = i + 1
                                } else if (currentPage >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i
                                } else {
                                    pageNum = currentPage - 2 + i
                                }

                                return (
                                    <Button
                                        key={pageNum}
                                        variant={currentPage === pageNum ? "default" : "outline"}
                                        size="sm"
                                        disabled={isLoading || isPending}
                                        onClick={() => updateURL({ page: pageNum })}
                                    >
                                        {pageNum}
                                    </Button>
                                )
                            })}
                            {totalPages > 5 && currentPage < totalPages - 2 && (
                                <>
                                    <span className="mx-1">...</span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={isLoading || isPending}
                                        onClick={() => updateURL({ page: totalPages })}
                                    >
                                        {totalPages}
                                    </Button>
                                </>
                            )}
                        </div>

                        <Button
                            variant="outline"
                            disabled={currentPage === totalPages || isLoading || isPending}
                            onClick={() => updateURL({ page: currentPage + 1 })}
                        >
                            {(isLoading || isPending) && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Siguiente
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}