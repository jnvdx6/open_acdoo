import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import dynamic from 'next/dynamic'

const DynamicPieChart = dynamic(() => import('./DynamicPieChart'), { 
    ssr: false,
    loading: () => <div className="w-24 h-24 rounded-full animate-pulse bg-white/20" />
})

export function IndexCard({ uniqueDaysIndexed, totalDocuments }) {
    // Extraer el valor del array de uniqueDaysIndexed
    const safeUniqueDays = Array.isArray(uniqueDaysIndexed) && uniqueDaysIndexed[0]?.count
        ? uniqueDaysIndexed[0].count
        : 0;
    
    // Asegurarse de que totalDocuments sea un número
    const safeTotalDocs = Number(totalDocuments) || 0;

    // Calcular el porcentaje basado en días únicos
    const startDate = new Date('1960-01-01');
    const today = new Date();
    const totalDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    const indexPercentage = ((safeUniqueDays / totalDays) * 100).toFixed(2);

    const chartData = [
        { name: 'Indexado', value: parseFloat(indexPercentage) },
        { name: 'No Indexado', value: 100 - parseFloat(indexPercentage) }
    ];

    return (
        <Card className="bg-[#FF6B35] text-white">
            <CardHeader>
                <CardTitle>Progreso de Indexación</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-2xl font-bold mb-2">
                            {!isNaN(indexPercentage) ? `${indexPercentage}%` : '0%'}
                        </p>
                        <p className="text-sm">de días indexados desde 1960</p>
                        <p className="text-sm mt-2">
                            Total documentos: {safeTotalDocs.toLocaleString()}
                        </p>
                        <p className="text-sm">
                            Días indexados: {safeUniqueDays.toLocaleString()}
                        </p>
                    </div>
                    <div className="w-24 h-24">
                        <DynamicPieChart data={chartData} />
                    </div>
                </div>
                <p className="text-sm mt-4">
                    Como organización financiada de forma privada, nos esforzamos por 
                    indexar el mayor número de documentos posible con los recursos disponibles.
                </p>
            </CardContent>
        </Card>
    )
}