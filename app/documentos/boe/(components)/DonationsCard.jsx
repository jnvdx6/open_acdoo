import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from 'lucide-react'

export function DonationsCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Donaciones</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                    Ayúdanos a mantener nuestra independencia y continuar nuestra labor.
                </p>
                <Button 
                    variant="outline" 
                    className="mb-2 w-full justify-between text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                    Transferencia Bancaria
                    <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
                <Button 
                    variant="outline" 
                    className="w-full justify-between text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                    Donar con Crypto
                    <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
            </CardContent>
        </Card>
    )
}