import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function Loading() {
    return (
        <div className="container mx-auto p-4 min-h-[80vh]">
            <h1 className="text-3xl font-bold mb-6 text-neutral-800 dark:text-neutral-200">Entradas BOE</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card className="bg-[#FF6B35] text-white">
                    <CardHeader>
                        <CardTitle>Progreso de Indexación</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <Skeleton className="h-8 w-32 bg-white/20" />
                                <Skeleton className="h-4 w-48 mt-2 bg-white/20" />
                                <Skeleton className="h-4 w-40 mt-2 bg-white/20" />
                            </div>
                            <Skeleton className="h-24 w-24 rounded-full bg-white/20" />
                        </div>
                        <Skeleton className="h-16 w-full mt-4 bg-white/20" />
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Donaciones</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-4 w-full mb-4" />
                        <Skeleton className="h-10 w-full mb-2" />
                        <Skeleton className="h-10 w-full" />
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Listado de Entradas</CardTitle>
                    <Skeleton className="h-10 w-[300px]" />
                </CardHeader>
                <CardContent>
                    <div className="h-[600px] flex items-center justify-center">
                        <Skeleton className="h-full w-full" />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}