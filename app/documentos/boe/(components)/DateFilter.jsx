'use client'

import React from 'react'
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Calendar as CalendarIcon, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useTransition } from 'react'

export const DateFilter = ({ startDate, endDate }) => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()
    
    const [date, setDate] = React.useState({ 
        from: startDate ? new Date(startDate) : undefined,
        to: endDate ? new Date(endDate) : undefined
    })

    const handleSelect = (newDate) => {
        setDate(newDate)
        if (newDate?.from && newDate?.to) {
            startTransition(() => {
                const params = new URLSearchParams(searchParams)
                params.set('startDate', newDate.from.toISOString().split('T')[0])
                params.set('endDate', newDate.to.toISOString().split('T')[0])
                params.set('page', '1')
                router.push(`${pathname}?${params.toString()}`)
            })
        }
    }

    return (
        <div className={cn("grid gap-2")}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                        disabled={isPending}
                    >
                        {isPending ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <CalendarIcon className="mr-2 h-4 w-4" />
                        )}
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "dd/MM/yyyy", { locale: es })} -{" "}
                                    {format(date.to, "dd/MM/yyyy", { locale: es })}
                                </>
                            ) : (
                                format(date.from, "dd/MM/yyyy", { locale: es })
                            )
                        ) : (
                            <span>Seleccionar fechas</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={handleSelect}
                        numberOfMonths={2}
                        locale={es}
                        disabled={isPending}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}