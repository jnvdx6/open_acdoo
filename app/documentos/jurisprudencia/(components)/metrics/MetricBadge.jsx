import { Badge } from "@/components/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export const getMetricColor = (value, type) => {
    if (type === 'delito') {
        if (value >= 75) return 'bg-red-100 text-red-700 border-red-200';
        if (value >= 50) return 'bg-orange-100 text-orange-700 border-orange-200';
        if (value >= 25) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        return 'bg-green-100 text-green-700 border-green-200';
    } else if (type === 'evidencia') {
        if (value <= 25) return 'bg-red-100 text-red-700 border-red-200';
        if (value <= 50) return 'bg-orange-100 text-orange-700 border-orange-200';
        if (value <= 75) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        return 'bg-green-100 text-green-700 border-green-200';
    }
    return 'bg-blue-100 text-blue-700 border-blue-200';
};

export const MetricBadge = ({ 
    icon: Icon, 
    label, 
    value, 
    type, 
    showTooltip = true,
    variant = "default" 
}) => {
    const colorClass = getMetricColor(value, type);
    const isCompact = variant === "compact";
    
    const badge = (
        <Badge 
            variant="outline" 
            className={`flex items-center ${isCompact ? "h-6 px-1.5" : "gap-1.5"} ${colorClass}`}
        >
            {Icon && (
                <Icon className={isCompact ? "h-3 w-3" : "h-3.5 w-3.5"} />
            )}
            {label && !isCompact && (
                <span className="font-normal">{label}:</span>
            )}
            <span className={`font-medium ${isCompact ? "text-xs ml-0.5" : ""}`}>
                {Math.round(value)}%
            </span>
        </Badge>
    );

    if (!showTooltip) return badge;

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>{badge}</TooltipTrigger>
                <TooltipContent>
                    <p>{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};