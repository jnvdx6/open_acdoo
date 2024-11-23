// TableContainer.jsx
'use client'

import React, { useState, useEffect, useCallback, useTransition } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { format, parseISO, isValid, startOfMonth, endOfMonth, subMonths } from 'date-fns'
import { es } from 'date-fns/locale'
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { BOETableAccordion } from './BOETableAccordion'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useDebounce } from 'use-debounce'
import { Loader2, Search, Filter, X, CalendarIcon } from 'lucide-react'
import { DateRangeSelector } from "./DateRangeSelector"

const DAYS_PER_PAGE_OPTIONS = [
    { value: '1', label: '1 día por página' },
    { value: '3', label: '3 días por página' },
    { value: '5', label: '5 días por página' },
    { value: '7', label: '7 días por página' },
    { value: '15', label: '15 días por página' },
    { value: '30', label: '30 días por página' }
]

const SORT_OPTIONS = [
    { value: 'date-desc', label: 'Fecha (más reciente)' },
    { value: 'date-asc', label: 'Fecha (más antigua)' },
    { value: 'corruption-desc', label: 'Prob. Corrupción (mayor)' },
    { value: 'corruption-asc', label: 'Prob. Corrupción (menor)' },
    { value: 'transparency-desc', label: 'Transparencia (mayor)' },
    { value: 'transparency-asc', label: 'Transparencia (menor)' }
]

const DATE_RANGE_OPTIONS = [
    { value: 'last7', label: 'Últimos 7 días' },
    { value: 'last30', label: 'Últimos 30 días' },
    { value: 'last90', label: 'Últimos 90 días' },
    { value: 'thisMonth', label: 'Este mes' },
    { value: 'lastMonth', label: 'Mes anterior' },
    { value: 'custom', label: 'Personalizado' }
]

export function TableContainer({
    groupedEntries,
    currentPage,
    totalPages,
    startDate,
    endDate,
    daysPerPage,
    totalDocuments,
    currentDocuments,
    searchParams: initialSearchParams
}) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()

    // Enhanced state management
    const [isLoading, setIsLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState(initialSearchParams.search || '')
    const [debouncedSearch] = useDebounce(searchTerm, 300)
    const [showFilters, setShowFilters] = useState(false)
    const [dateRange, setDateRange] = useState('custom')
    const [customDateRange, setCustomDateRange] = useState({
        from: startDate ? parseISO(startDate) : null,
        to: endDate ? parseISO(endDate) : null
    })

    const [filters, setFilters] = useState({
        analyzed: initialSearchParams.analyzed || 'all',
        corruptionMin: initialSearchParams.corruptionMin || '',
        corruptionMax: initialSearchParams.corruptionMax || '',
        transparencyMin: initialSearchParams.transparencyMin || '',
        transparencyMax: initialSearchParams.transparencyMax || '',
        sortBy: initialSearchParams.sortBy || 'date-desc',
        daysPerPage: daysPerPage.toString()
    })

    // Date range handlers
    const handleDateRangeChange = useCallback((value) => {
        setDateRange(value)
        let newFrom, newTo

        const today = new Date()
        switch (value) {
            case 'last7':
                newFrom = subMonths(today, 7)
                newTo = today
                break
            case 'last30':
                newFrom = subMonths(today, 1)
                newTo = today
                break
            case 'last90':
                newFrom = subMonths(today, 3)
                newTo = today
                break
            case 'thisMonth':
                newFrom = startOfMonth(today)
                newTo = endOfMonth(today)
                break
            case 'lastMonth':
                const lastMonth = subMonths(today, 1)
                newFrom = startOfMonth(lastMonth)
                newTo = endOfMonth(lastMonth)
                break
            default:
                return // For custom, keep existing dates
        }

        setCustomDateRange({ from: newFrom, to: newTo })
        updateURL({
            startDate: format(newFrom, 'yyyy-MM-dd'),
            endDate: format(newTo, 'yyyy-MM-dd'),
            page: 1
        })
    }, [])

    // Update URL and refresh data
    const updateURL = useCallback((newParams) => {
        startTransition(() => {
            const params = new URLSearchParams(searchParams)

            // Reset page when filters change
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

    // Handle search input
    useEffect(() => {
        if (debouncedSearch !== initialSearchParams.search) {
            updateURL({ search: debouncedSearch })
        }
    }, [debouncedSearch, updateURL, initialSearchParams.search])

    // Handle filter changes
    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }))
        const newParams = { ...filters, [key]: value }
        if (key === 'daysPerPage') {
            newParams.page = 1
        }
        updateURL(newParams)
    }

    // Reset filters
    const handleResetFilters = () => {
        setSearchTerm('')
        setFilters({
            analyzed: 'all',
            corruptionMin: '',
            corruptionMax: '',
            transparencyMin: '',
            transparencyMax: '',
            sortBy: 'date-desc',
            daysPerPage: '3'
        })
        setDateRange('custom')
        setCustomDateRange({ from: null, to: null })
        router.push(pathname)
    }

    // Reset loading state
    useEffect(() => {
        if (!isPending) {
            setIsLoading(false)
        }
    }, [isPending, groupedEntries])

    return (
        <Card>
            <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Listado de Entradas</CardTitle>
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
                    {/* Search bar with enhanced functionality */}
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar por título, código BOE o contenido..."
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

                    {/* Advanced filters */}
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
                                    <SelectItem value="all">Todos</SelectItem>
                                    <SelectItem value="analyzed">Analizados</SelectItem>
                                    <SelectItem value="pending">Pendientes</SelectItem>
                                </SelectContent>
                            </Select>

                            <div className="space-y-2">
                                <label className="text-sm">Prob. Corrupción (%)</label>
                                <div className="flex gap-2">
                                    <Input
                                        type="number"
                                        placeholder="Min"
                                        value={filters.corruptionMin}
                                        onChange={(e) => handleFilterChange('corruptionMin', e.target.value)}
                                        min="0"
                                        max="100"
                                    />
                                    <Input
                                        type="number"
                                        placeholder="Max"
                                        value={filters.corruptionMax}
                                        onChange={(e) => handleFilterChange('corruptionMax', e.target.value)}
                                        min="0"
                                        max="100"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm">Transparencia (%)</label>
                                <div className="flex gap-2">
                                    <Input
                                        type="number"
                                        placeholder="Min"
                                        value={filters.transparencyMin}
                                        onChange={(e) => handleFilterChange('transparencyMin', e.target.value)}
                                        min="0"
                                        max="100"
                                    />
                                    <Input
                                        type="number"
                                        placeholder="Max"
                                        value={filters.transparencyMax}
                                        onChange={(e) => handleFilterChange('transparencyMax', e.target.value)}
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
                                value={filters.daysPerPage}
                                onValueChange={(value) => handleFilterChange('daysPerPage', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Días por página" />
                                </SelectTrigger>
                                <SelectContent>
                                    {DAYS_PER_PAGE_OPTIONS.map(option => (
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
                                Cargando documentos...
                            </p>
                        </div>
                    </div>
                ) : (
                    <BOETableAccordion
                        groupedEntries={groupedEntries}
                        isLoading={isLoading || isPending}
                    />
                )}

                {/* Enhanced Pagination with Loading States */}
                <div className="flex items-center justify-between mt-4">
                    <p className="text-sm text-muted-foreground">
                        Mostrando {Object.keys(groupedEntries).length} días con {currentDocuments} documentos
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

                        {/* Page indicators */}
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