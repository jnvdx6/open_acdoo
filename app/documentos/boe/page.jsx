import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { TableContainer } from './(components)/table/TableContainer'
import { IndexCard } from './(components)/IndexCard'
import { DonationsCard } from './(components)/DonationsCard'
import { addDays, subDays, parseISO, format, isValid } from 'date-fns'

export default async function BOEEntriesList({ searchParams }) {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    
    // Get global stats first
    const [{ data: uniqueDaysCount }, { count: totalDocuments }] = await Promise.all([
        supabase.rpc('count_unique_dates'),
        supabase.from('entradas_boe').select('*', { count: 'exact', head: true })
    ])

    // Enhanced search params parsing with validation
    const currentPage = Math.max(1, Number(searchParams?.page) || 1)
    const daysPerPage = Math.min(30, Math.max(1, Number(searchParams?.daysPerPage) || 3))
    const search = searchParams?.search?.trim() || ''
    const analyzed = ['all', 'analyzed', 'pending'].includes(searchParams?.analyzed) 
        ? searchParams.analyzed 
        : 'all'
    const sortBy = searchParams?.sortBy || 'date-desc'
    
    // Validate numeric filters
    const numericFilters = {
        corruptionMin: Number(searchParams?.corruptionMin),
        corruptionMax: Number(searchParams?.corruptionMax),
        transparencyMin: Number(searchParams?.transparencyMin),
        transparencyMax: Number(searchParams?.transparencyMax)
    }

    Object.keys(numericFilters).forEach(key => {
        if (isNaN(numericFilters[key]) || numericFilters[key] < 0 || numericFilters[key] > 100) {
            delete numericFilters[key]
        }
    })
    
    // Get date range with validation
    let startDate = searchParams?.startDate
    let endDate = searchParams?.endDate
    let isInitialLoad = !startDate && !endDate

    // Get the latest and earliest dates from the database for initial load
    const [{ data: latestEntry }, { data: earliestEntry }] = await Promise.all([
        supabase
            .from('entradas_boe')
            .select('fecha_publicacion')
            .order('fecha_publicacion', { ascending: false })
            .limit(1)
            .single(),
        supabase
            .from('entradas_boe')
            .select('fecha_publicacion')
            .order('fecha_publicacion', { ascending: true })
            .limit(1)
            .single()
    ])

    if (!startDate || !endDate || !isValid(parseISO(startDate)) || !isValid(parseISO(endDate))) {
        if (latestEntry) {
            endDate = latestEntry.fecha_publicacion
            // Calculate the total range based on page and daysPerPage
            const totalDays = (currentPage - 1) * daysPerPage
            startDate = format(subDays(parseISO(endDate), totalDays + (daysPerPage - 1)), 'yyyy-MM-dd')
            endDate = format(subDays(parseISO(endDate), totalDays), 'yyyy-MM-dd')
        }
    } else {
        // When dates are provided, calculate the correct range for the current page
        const totalDateRange = parseISO(endDate).getTime() - parseISO(startDate).getTime()
        const totalDays = Math.ceil(totalDateRange / (1000 * 60 * 60 * 24)) + 1
        const totalPages = Math.ceil(totalDays / daysPerPage)
        
        // Adjust currentPage if it exceeds totalPages
        const validatedCurrentPage = Math.min(currentPage, totalPages)
        
        // Calculate the date range for the current page
        const daysToSubtract = (validatedCurrentPage - 1) * daysPerPage
        const rangeEndDate = subDays(parseISO(endDate), daysToSubtract)
        const rangeStartDate = subDays(rangeEndDate, daysPerPage - 1)
        
        startDate = format(rangeStartDate, 'yyyy-MM-dd')
        endDate = format(rangeEndDate, 'yyyy-MM-dd')
    }

    // Build optimized query for current page
    let query = supabase
        .from('entradas_boe')
        .select('id, codigo_boe, fecha_publicacion, titulo, probabilidad_corrupcion, kpi_transparencia, analyzed')
        .gte('fecha_publicacion', startDate)
        .lte('fecha_publicacion', endDate)

    // Build count query for filtered results
    let countQuery = supabase
        .from('entradas_boe')
        .select('*', { count: 'exact', head: true })

    // Apply filters to both queries
    if (search) {
        const searchFilter = `titulo.ilike.%${search}%,codigo_boe.ilike.%${search}%`
        query = query.or(searchFilter)
        countQuery = countQuery.or(searchFilter)
    }

    if (analyzed !== 'all') {
        query = query.eq('analyzed', analyzed === 'analyzed')
        countQuery = countQuery.eq('analyzed', analyzed === 'analyzed')
    }

    // Apply numeric filters to both queries
    Object.entries(numericFilters).forEach(([key, value]) => {
        if (value !== undefined) {
            const [field, operator] = key.match(/(.+?)(Min|Max)$/).slice(1)
            const column = field === 'corruption' ? 'probabilidad_corrupcion' : 'kpi_transparencia'
            const filterOperator = operator === 'Min' ? 'gte' : 'lte'
            query = query[filterOperator](column, value)
            countQuery = countQuery[filterOperator](column, value)
        }
    })

    // Apply date range to count query only if it's not the initial load
    if (!isInitialLoad) {
        countQuery = countQuery
            .gte('fecha_publicacion', searchParams?.startDate || startDate)
            .lte('fecha_publicacion', searchParams?.endDate || endDate)
    }

    // Apply sorting
    switch (sortBy) {
        case 'date-asc':
            query = query.order('fecha_publicacion', { ascending: true })
            break
        case 'corruption-desc':
            query = query.order('probabilidad_corrupcion', { ascending: false })
                        .order('fecha_publicacion', { ascending: false })
            break
        case 'corruption-asc':
            query = query.order('probabilidad_corrupcion', { ascending: true })
                        .order('fecha_publicacion', { ascending: false })
            break
        case 'transparency-desc':
            query = query.order('kpi_transparencia', { ascending: false })
                        .order('fecha_publicacion', { ascending: false })
            break
        case 'transparency-asc':
            query = query.order('kpi_transparencia', { ascending: true })
                        .order('fecha_publicacion', { ascending: false })
            break
        default:
            query = query.order('fecha_publicacion', { ascending: false })
    }

    // Execute queries efficiently
    const [{ data: entries, error }, { count: totalFilteredDocuments }] = await Promise.all([
        query,
        countQuery
    ])

    if (error) {
        console.error('Error fetching BOE entries:', error)
        return <div>Error al cargar las entradas del BOE</div>
    }

    // Group and sort entries efficiently
    const groupedEntries = entries.reduce((acc, entry) => {
        const date = entry.fecha_publicacion
        if (!acc[date]) {
            acc[date] = []
        }
        acc[date].push(entry)
        return acc
    }, {})

    // Sort entries within groups
    Object.keys(groupedEntries).forEach(date => {
        groupedEntries[date].sort((a, b) => {
            switch (sortBy) {
                case 'corruption-desc':
                    return b.probabilidad_corrupcion - a.probabilidad_corrupcion
                case 'corruption-asc':
                    return a.probabilidad_corrupcion - b.probabilidad_corrupcion
                case 'transparency-desc':
                    return b.kpi_transparencia - a.kpi_transparencia
                case 'transparency-asc':
                    return a.kpi_transparencia - b.kpi_transparencia
                default:
                    return 0
            }
        })
    })

    // Calculate total days and pages based on whether it's initial load or filtered
    let totalDays, totalPages
    if (isInitialLoad && latestEntry && earliestEntry) {
        totalDays = Math.ceil((parseISO(latestEntry.fecha_publicacion) - parseISO(earliestEntry.fecha_publicacion)) / (1000 * 60 * 60 * 24)) + 1
    } else {
        const fullStartDate = searchParams?.startDate || startDate
        const fullEndDate = searchParams?.endDate || format(parseISO(endDate), 'yyyy-MM-dd')
        totalDays = Math.ceil((parseISO(fullEndDate) - parseISO(fullStartDate)) / (1000 * 60 * 60 * 24)) + 1
    }
    totalPages = Math.ceil(totalDays / daysPerPage)

    return (
        <div className="container mx-auto p-4 min-h-[80vh]">
            <h1 className="text-3xl font-bold mb-6">Entradas BOE</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <IndexCard
                    uniqueDaysIndexed={uniqueDaysCount}
                    totalDocuments={totalDocuments}
                />
                <DonationsCard />
            </div>

            <TableContainer
                groupedEntries={groupedEntries}
                currentPage={currentPage}
                totalPages={totalPages}
                startDate={startDate}
                endDate={endDate}
                daysPerPage={daysPerPage}
                totalDocuments={totalFilteredDocuments}
                currentDocuments={entries.length}
                searchParams={{
                    search,
                    analyzed,
                    sortBy,
                    ...numericFilters
                }}
            />
        </div>
    )
}