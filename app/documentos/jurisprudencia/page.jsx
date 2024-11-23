import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { TableContainer } from './(components)/table/TableContainer'
import { StatsCard } from './(components)/Cards'
import { MetricsCard } from './(components)/Cards'
import { addDays, subDays, parseISO, format, isValid } from 'date-fns'
import AdvancedSearch from "./(components)/AdvancedSearch"

export default async function JudicialSentencesList({ searchParams }) {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    // Get global stats
    const [{ data: uniqueCasesCount }, { count: totalSentences }] = await Promise.all([
        supabase.rpc('count_unique_cases'),
        supabase.from('sentencias_judiciales').select('*', { count: 'exact', head: true })
    ])

    // Enhanced search params parsing with validation
    const currentPage = Math.max(1, Number(searchParams?.page) || 1)
    const itemsPerPage = Math.min(100, Math.max(10, Number(searchParams?.itemsPerPage) || 20))
    const search = searchParams?.search?.trim() || ''
    const analyzed = ['all', 'analyzed', 'pending'].includes(searchParams?.analyzed)
        ? searchParams.analyzed
        : 'all'
    const sortBy = searchParams?.sortBy || 'date-desc'
    const jurisdiction = searchParams?.jurisdiction || 'all'
    const category = searchParams?.category || 'all'

    // Validate numeric filters
    const numericFilters = {
        delitoProbMin: Number(searchParams?.delitoProbMin),
        delitoProbMax: Number(searchParams?.delitoProbMax),
        evidenciaMin: Number(searchParams?.evidenciaMin),
        evidenciaMax: Number(searchParams?.evidenciaMax),
        complejidadMin: Number(searchParams?.complejidadMin),
        complejidadMax: Number(searchParams?.complejidadMax),
        impactoSocialMin: Number(searchParams?.impactoSocialMin),
        impactoSocialMax: Number(searchParams?.impactoSocialMax)
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

    // Get the latest and earliest dates
    const [{ data: latestSentence }, { data: earliestSentence }] = await Promise.all([
        supabase
            .from('sentencias_judiciales')
            .select('fecha_sentencia')
            .order('fecha_sentencia', { ascending: false })
            .limit(1)
            .single(),
        supabase
            .from('sentencias_judiciales')
            .select('fecha_sentencia')
            .order('fecha_sentencia', { ascending: true })
            .limit(1)
            .single()
    ])

    if (!startDate || !endDate || !isValid(parseISO(startDate)) || !isValid(parseISO(endDate))) {
        if (latestSentence) {
            endDate = latestSentence.fecha_sentencia
            if (isInitialLoad) {
                // Por defecto mostrar el último mes
                startDate = format(subDays(parseISO(endDate), 30), 'yyyy-MM-dd')
            } else {
                // Calcular el rango basado en la página actual y elementos por página
                const offset = (currentPage - 1) * itemsPerPage
                // Obtener todas las fechas únicas ordenadas
                const { data: uniqueDates } = await supabase
                    .from('sentencias_judiciales')
                    .select('fecha_sentencia')
                    .order('fecha_sentencia', { ascending: false })
                    .limit(offset + itemsPerPage)

                if (uniqueDates && uniqueDates.length > 0) {
                    // Usar la fecha más antigua del conjunto actual
                    startDate = uniqueDates[Math.min(uniqueDates.length - 1, offset)].fecha_sentencia
                }
            }
        }
    }

    // Build optimized query for current page
    let query = supabase
        .from('sentencias_judiciales')
        .select(`
            id, 
            roj,
            ecli,
            fecha_sentencia,
            titulo,
            probabilidad_delito,
            kpi_evidencia,
            kpi_complejidad,
            kpi_impacto_social,
            tribunal_responsable,
            categoria,
            jurisdiccion,
            resultado_sentencia,
            analyzed
        `)
        .gte('fecha_sentencia', startDate)
        .lte('fecha_sentencia', endDate)
        .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1)

    // Build count query for filtered results
    let countQuery = supabase
        .from('sentencias_judiciales')
        .select('*', { count: 'exact', head: true })
        .gte('fecha_sentencia', startDate)
        .lte('fecha_sentencia', endDate)

    // Apply filters to both queries
    if (search) {
        const searchFilter = `titulo.ilike.%${search}%,roj.ilike.%${search}%,ecli.ilike.%${search}%`
        query = query.or(searchFilter)
        countQuery = countQuery.or(searchFilter)
    }

    if (analyzed !== 'all') {
        query = query.eq('analyzed', analyzed === 'analyzed')
        countQuery = countQuery.eq('analyzed', analyzed === 'analyzed')
    }

    if (jurisdiction !== 'all') {
        query = query.eq('jurisdiccion', jurisdiction)
        countQuery = countQuery.eq('jurisdiccion', jurisdiction)
    }

    if (category !== 'all') {
        query = query.eq('categoria', category)
        countQuery = countQuery.eq('categoria', category)
    }

    // Apply numeric filters
    Object.entries(numericFilters).forEach(([key, value]) => {
        if (value !== undefined) {
            const [field, operator] = key.match(/(.+?)(Min|Max)$/).slice(1)
            const columnMap = {
                delitoProb: 'probabilidad_delito',
                evidencia: 'kpi_evidencia',
                complejidad: 'kpi_complejidad',
                impactoSocial: 'kpi_impacto_social'
            }
            const column = columnMap[field]
            const filterOperator = operator === 'Min' ? 'gte' : 'lte'
            query = query[filterOperator](column, value)
            countQuery = countQuery[filterOperator](column, value)
        }
    })

    // Apply sorting
    const sortingOptions = {
        'date-desc': [['fecha_sentencia', { ascending: false }]],
        'date-asc': [['fecha_sentencia', { ascending: true }]],
        'delito-desc': [
            ['probabilidad_delito', { ascending: false }],
            ['fecha_sentencia', { ascending: false }]
        ],
        'complejidad-desc': [
            ['kpi_complejidad', { ascending: false }],
            ['fecha_sentencia', { ascending: false }]
        ],
        'impacto-desc': [
            ['kpi_impacto_social', { ascending: false }],
            ['fecha_sentencia', { ascending: false }]
        ]
    }

    if (sortingOptions[sortBy]) {
        sortingOptions[sortBy].forEach(([column, order]) => {
            query = query.order(column, order)
        })
    }

    // Execute queries
    const [{ data: sentences, error }, { count: totalFilteredSentences }] = await Promise.all([
        query,
        countQuery
    ])

    if (error) {
        console.error('Error fetching judicial sentences:', error)
        return <div>Error al cargar las sentencias judiciales</div>
    }

    // Calculate statistics for MetricsCard
    const stats = sentences.reduce((acc, sentence) => {
        acc.avgDelito += sentence.probabilidad_delito || 0
        acc.avgComplejidad += sentence.kpi_complejidad || 0
        acc.avgImpacto += sentence.kpi_impacto_social || 0
        acc.total += 1
        return acc
    }, { avgDelito: 0, avgComplejidad: 0, avgImpacto: 0, total: 0 })

    if (stats.total > 0) {
        stats.avgDelito = (stats.avgDelito / stats.total).toFixed(2)
        stats.avgComplejidad = (stats.avgComplejidad / stats.total).toFixed(2)
        stats.avgImpacto = (stats.avgImpacto / stats.total).toFixed(2)
    }

    return (
        <div className="container mx-auto p-4 min-h-[80vh]">
            <h1 className="text-3xl font-bold mb-6">Sentencias Judiciales</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <StatsCard
                    uniqueCasesCount={uniqueCasesCount}
                    totalSentences={totalSentences}
                    analyzedSentences={sentences.filter(s => s.analyzed).length}
                />
                <MetricsCard
                    avgProbabilidadDelito={stats.avgDelito}
                    avgComplejidad={stats.avgComplejidad}
                    avgImpactoSocial={stats.avgImpacto}
                />
            </div>

            <AdvancedSearch />

            <TableContainer
                sentences={sentences}
                currentPage={currentPage}
                totalPages={Math.ceil(totalFilteredSentences / itemsPerPage)}
                startDate={startDate}
                endDate={endDate}
                itemsPerPage={itemsPerPage}
                totalSentences={totalFilteredSentences}
                currentSentences={sentences.length}
                searchParams={{
                    search,
                    analyzed,
                    sortBy,
                    jurisdiction,
                    category,
                    ...numericFilters
                }}
            />
        </div>
    )
}