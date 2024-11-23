import React from 'react';
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { format, parseISO, startOfMonth, endOfMonth, subDays, subMonths } from 'date-fns'
import { es } from 'date-fns/locale'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from 'lucide-react'
import { cn } from "@/lib/utils"

const DATE_RANGES = [
    { label: 'Últimos 7 días', days: 7 },
    { label: 'Últimos 30 días', days: 30 },
    { label: 'Últimos 90 días', days: 90 },
    { label: 'Este mes', type: 'thisMonth' },
    { label: 'Mes anterior', type: 'lastMonth' },
]

export function DateRangeSelector({ 
    startDate, 
    endDate, 
    onDateChange 
}) {
    const handlePresetClick = (preset) => {
        const today = new Date()
        let newFrom, newTo

        if (preset.type === 'thisMonth') {
            newFrom = startOfMonth(today)
            newTo = endOfMonth(today)
        } else if (preset.type === 'lastMonth') {
            const lastMonth = subMonths(today, 1)
            newFrom = startOfMonth(lastMonth)
            newTo = endOfMonth(lastMonth)
        } else {
            newTo = today
            newFrom = subDays(today, preset.days)
        }

        onDateChange({
            from: newFrom,
            to: newTo
        })
    }

    const dateRange = {
        from: startDate ? parseISO(startDate) : null,
        to: endDate ? parseISO(endDate) : null
    }

    return (
        <div className="grid gap-2">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className={cn(
                            "justify-start text-left font-normal",
                            !dateRange.from && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.from ? (
                            dateRange.to ? (
                                <>
                                    {format(dateRange.from, "d MMM, yyyy", { locale: es })} -
                                    {format(dateRange.to, "d MMM, yyyy", { locale: es })}
                                </>
                            ) : (
                                format(dateRange.from, "d MMM, yyyy", { locale: es })
                            )
                        ) : (
                            <span>Seleccionar fechas</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <div className="space-y-3 p-3 border-b">
                        {DATE_RANGES.map((range) => (
                            <Button
                                key={range.label}
                                variant="ghost"
                                className="w-full justify-start text-left"
                                onClick={() => handlePresetClick(range)}
                            >
                                {range.label}
                            </Button>
                        ))}
                    </div>
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange.from}
                        selected={dateRange}
                        onSelect={onDateChange}
                        numberOfMonths={2}
                        locale={es}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}